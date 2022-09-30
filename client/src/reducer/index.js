import {
  GET_ALL_DOGS,
  GET_TEMPERAMENT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_CREATED,
  ORDER_BY_NAME,
  GET_DOG_NAME,
  POST_DOG,
  ORDER_BY_WEIGHT,
  GET_DETAIL,
  GET_CLEAN,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  dogDetail: [],
  temperaments: [], 
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case GET_TEMPERAMENT:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMPERAMENT:
      // eslint-disable-next-line array-callback-return
      const filterBytemp = state.allDogs.filter((e) => {
        if (typeof e.temperament === "string") {
          return e.temperament.includes(action.payload);
        }
        if (Array.isArray(e.temperaments)) {
          let temp = e.temperaments.map((e) => e.name);
          return temp.includes(action.payload);
        }
      });
      return {
        ...state,
        dogs: filterBytemp,
      };
    case POST_DOG: // no hace nada porque lo estoy creando en una ruta nueva
      return {
        //pero necesito tener este case en el reducer
        ...state,
      };
    case FILTER_BY_CREATED:
      const allDogs = state.allDogs; //!!vuelvo a cambiar probando sort de ruta, sino vuelvo a dogs
      const createFilter =
        action.payload === "dataBase"
          ? allDogs.filter((d) => d.createDb)
          : allDogs.filter((d) => !d.createDb);
      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogs : createFilter
      };
    case ORDER_BY_NAME:
      const sorted =
        action.payload === "ascendente"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: sorted,
      };
    case GET_DOG_NAME:
      return {
        ...state,
        dogs: action.payload,
      };
    case ORDER_BY_WEIGHT:
      const sortedWeight =
        action.payload === "weightMin"
          ? state.dogs.sort((a, b) => {
              if (parseInt(a.weightMin) < parseInt(b.weightMin)) return -1; // si el peso de a es menor que el de b, a va antes que b
              if (parseInt(a.weightMin) > parseInt(b.weightMin)) return 1; // si el peso de a es mayor que el de b, a va despues que b
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (parseInt(a.weightMin) > parseInt(b.weightMin)) return -1; // si el peso de a es mayor que el de b, a va antes que b
              if (parseInt(a.weightMin) < parseInt(b.weightMin)) return 1; // si el peso de a es menor que el de b, a va despues que b
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };
    case GET_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case GET_CLEAN:
      return {
        ...state,
        dogDetail: action.payload,
      };

    // case DELETE_DOG:
    //     return{
    //       ...state
    //     }
    default:
      return {
        ...state,
      };
  }
  
}

export default rootReducer;
