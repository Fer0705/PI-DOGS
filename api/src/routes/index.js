const { Router } = require("express");
// const Dog = require("../models/Dog");
// const Temperament  = require("../models/Dog");
const { Dog, Temperament } = require("../db")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { API_KEY } = process.env;
const axios = require('axios');
const { Op } = require("sequelize");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getInfoApi = async () => {
  const urlApi = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
  );
  const infoApi = await urlApi.data.map((r) => {
    return {
      id: r.id,
      name: r.name,
      weightMin: r.weight.metric.slice(0, 2).trim(),
      weightMax: r.weight.metric.slice(4).trim(),
      heightMin: r.height.metric.slice(0, 2).trim(),
      heightMax: r.height.metric.slice(4).trim(),
      life_span: r.life_span,
      image: r.image.url,
      temperament: r.temperament 
    };
  });
  
  return infoApi;
};





const getDbInfo = async () => {
  return await Dog.findAll({
    //busco todo de la DB
    include: {
      //incluyendo
      model: Temperament, //el modelo temperament
      attributes: ["name"], //-> traeme solo este atributo y NO todo lo que contiene el modelo
      through: {
        attributes: [], // mediante el atributo name (id lo trae por default)
      },
    },
  });
};

const getAlldogs = async () => {
  const apiInfo = await getInfoApi();
  const dbInfo = await getDbInfo();
  const completeInfo = [...apiInfo, ...dbInfo]; //apiInfo.concat(dbInfo)

  return completeInfo;
};


const getTemperament = async () => {
  const api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  const allTemperament = await api.data
    .map((temp) => {
      return temp.temperament;
    }) //["curioso", "jugueton", "docil"] ["docil, jugue...,  "]
    .join() //unilo con la condicion de separlos con coma
    .split(",");

  const temps = [];

  allTemperament.map((c) => {
    if (!temps.includes(c.trim()) && c) {
      temps.push(c.trim());
    }
  });

  temps.map(async (d) => {
    await Temperament.findOrCreate({
      where: {
        name: d,  
      },
    });
  });
};



router.get('/dogs', async (req, res) => { 
  const { name } = req.query
  let allDogs = await getAlldogs(); //espero el resultado de esta funcion que es la que me trae TODOS los dogs
  
  if(name){
   let nameDog = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase())) //await demas
   nameDog.length ? 
   res.status(200).send(nameDog):
   res.status(404).send("The breed you are looking for could not be found, please try another.");
  }
  else{
   res.status(200).send(allDogs);
  }
  // const { name } = req.query
  // try {
  //   let allDogs = await getAlldogs(); 
  //   if(name){
  //     try {
  //       let nameDog = allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
  //       res.status(200).send(nameDog)
  //     } catch (error) {
  //       res.status(404).send("The breed you are looking for could not be found, please try another")
  //     }
  //   }else{
  //       res.status(200).send(allDogs);
  //     }
    
  // } catch (error) {
  //   res.status(404).json(error)
  // }


// const { name } = req.query
// let allDogs = await getAlldogs();

// try {
//   // SI MI DB ESTA LLENA NO HAGO NADA
//   let arr = await Dog.findAll();
//   // SI NO TENGO DATOS EN MI DB, LOS CREO
//   if(!arr.length) await Dog.bulkCreate(allDogs)
// } catch (error) {
//   console.log(error)
// }
// // SI TENGO NOMBRE
// if(name){
//   try {
//     let dog = await Dog.findAll({
//       where:{
//         name:{
//           [Op.iLike]: `%${name}%` // matchea substring - es case sensitive(ignora mayusculas)
//         }
//       }
//     })
//     return res.json(dog)
//   } catch (error) {
//     res.json(error)
//     console.log(error)
//   }
// }
  
 })


router.get('/dogs/:idRaza', async (req, res) => { 
  const { idRaza } = req.params
  const DogsTotal = await getAlldogs();
  try {
    if(!idRaza){
      res.status(404).send("id could not be found")     
    }else{
      const dogIdRaza = DogsTotal.find(i => i.id.toString() === idRaza)
      res.status(200).json(dogIdRaza)
    }
  } catch (error) {
    res.status(404).send(error)  
  }
})

router.post('/dogs', async (req,res) => {
  // const { name, heightMin, heightMax, weightMin, weightMax, life_span, image, temperament, createDb} = req.body;
  // const dogCreate = await Dog.create({name, heightMin, heightMax, weightMin ,weightMax, life_span, image, createDb})
  // const temp = await Temperament.findAll({
  //   where: {
  //     name: temperament
  // }})
  // //console.log(temp)
  // dogCreate.addTemperament(temp)
  // res.send("successful creation")
  const { name, heightMin, heightMax, weightMin, weightMax, life_span, image, temperament, createDb} = req.body;

  if(!name || !heightMin || !heightMax || !weightMin || !weightMax || !life_span || !image || !temperament){
    res.status(400).send("Missing required data")
  }else{

    try {
      const dogCreate = await Dog.create({name, heightMin, heightMax, weightMin ,weightMax, life_span, image, createDb})
      const temp = await Temperament.findAll({
           where: {
             name: temperament
         }})
     dogCreate.addTemperament(temp)
     res.send("successful creation")
    } catch (error) {
      res.status(400).json(error)
    }
  }


})

router.get('/temperaments', async (req, res) => {
await getTemperament()
const allTemperament = await Temperament.findAll()
const nameTemp = await allTemperament.map(t => t.name)
res.status(200).json(nameTemp)
console.log(nameTemp)
})

// router.get('/temperaments' , async (req, res) => {
//   try {
//     await getTemperament()
//     const allTemperament = await Temperament.findAll()
//     const nameTemp = await allTemperament.map(t => t.name) 
//     res.status(200).json(nameTemp)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// })



router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
      const dog = await Dog.findByPk(id);
      if(!dog){
          res.status(404).send("dog not available");
      } else {
          await dog.destroy();
          res.status(200).send("Dog removed");
      }
  } catch (error) {
      res.status(400).json(error)
  }
})

module.exports = router;



























































































































































































































































































































































































































































