import axios from "axios";
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_TEMPERAMENT = "GET_TEMPERAMENT";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"
export const FILTER_BY_CREATED = "FILTER_BY_CREATED"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const GET_DOG_NAME = "GET_DOG_NAME"
export const POST_DOG = "POST_DOG"
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT"
export const GET_DETAIL = "GET_DETAIL"
export const GET_CLEAN = "GET_CLEAN"
export const SET_LOADING = "SET_LOADING"
export const ERROR = "ERROR"
export const DELETE_DOG = "DELETE_DOG"

export function getAllDogs() {
  return async function (dispatch) {
    let dogs = await axios.get("http://localhost:3001/dogs");
    return dispatch({
        type: GET_ALL_DOGS,
        payload: dogs.data
    })
  }
}

export function getTemperament() {
  return async function(dispatch){
    let temp = await axios.get("http://localhost:3001/temperaments")
    return dispatch({
      type: GET_TEMPERAMENT,
      payload: temp.data
    })
  }
}

export function postDog(payload){ //toda la data para crear el dog
  return async function(dispatch){
    let resp = await axios.post("http://localhost:3001/dogs" , payload)
      console.log(resp)
      return resp
  }
}

export function getDogName(name) {
  console.log(name)
  return async function (dispatch) {
    try {
      let dogName = await axios.get(`http://localhost:3001/dogs?name=${name}`)
      return dispatch({
        type: GET_DOG_NAME,
        payload: dogName.data 
      })
      
    } catch (error) {
     alert('Dog Not Found')
    }
  }
}

export function filterDogsbyTemperament(payload){
  console.log(payload)
  return {
      type: FILTER_BY_TEMPERAMENT,
      payload
  }
};

export function filterCreated(payload) {
  return{
    type: FILTER_BY_CREATED,
    payload
  }
}

export function orderByName(payload) {
  console.log(payload)
  return {
    type: ORDER_BY_NAME,
    payload
  }
  
}

export function orderByWeight(payload){
  return {
    type: ORDER_BY_WEIGHT,
    payload
  }
}

export function getDetail(id) {
  return async function(dispatch) {
    try {
      let info = await axios.get(`http://localhost:3001/dogs/${id}`)
      return dispatch({
        type: GET_DETAIL,
        payload: info.data
      })
    } catch (error) {
      alert(error) //PROBAR!!
    }
  }
}

export function getClean() {
  return{
      type: GET_CLEAN,
      payload: []
  }
}

// export function setLoading() {
//   return {
//      type: SET_LOADING 
//     };
// };
// export function setError() {
//   return {
//      type: ERROR
//   };
// };

// export function deleteDog(id){
// return async function(dispatch){
//   try {
//     await axios.delete(`http://localhost:3001/delete/${id}`)
//     return dispatch({
//       type: DELETE_DOG
//     })
//   } catch (error) {
//     return dispatch({
//       type: ERROR,
// });
//   }
// }
// }