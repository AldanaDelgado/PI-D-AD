import {GET_DOGS,GET_BY_NAME, GET_DETAIL, CLEAR_DETAIL, GET_TEMPS,  POST_DOG, APPLY_FILTERS_AND_ORDER} from "./action.types";

let initialState = {
    allDogs:[], 
    dogs:[], 
    dogTemps: [], 
    dogDetails: {}, 
    newDog: {},
};

function rootReducer(state =initialState,action){
    switch(action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs:action.payload,
                allDogs:action.payload
            };
        case GET_BY_NAME:
            return{
                ...state,
                dogs: action.payload,
            }
        case GET_DETAIL:
            return{
                ...state,
                dogDetails: action.payload,
            }
        case CLEAR_DETAIL:
            return{
                ...state,
                dogDetails:{}
            }
        case GET_TEMPS:
            return{
                ...state,
                dogTemps: action.payload
            }
        case POST_DOG:
            return{ 
                ...state,
                newDog: action.payload
            }
            
            case APPLY_FILTERS_AND_ORDER:
            const { temperament, origin, orderByName, orderByWeight } = action.payload;
            let filteredAndOrderedDogs = [...state.allDogs];    
            //Para aplicar tambien a los perrros buscados por la search se debe cambiar al estado dogs, 
            //pero necesitaria encontrar una forma de renderizar que los filtros solo se estan aplicando a los resultados de la busqueda

            //Aplicacion de filtros
                //Para filtrar por origen
                if(origin==='DB'){
                    //Los dogs en la DB tienen un id de tipo UUID, por lo que no son numericos
                    filteredAndOrderedDogs=filteredAndOrderedDogs.filter((dog)=>isNaN(dog.id))
                }else if(origin==='API'){
                    //Los dogs de la API tienen un id numericos
                    filteredAndOrderedDogs=filteredAndOrderedDogs.filter((dog)=>!isNaN(dog.id))
                }

                //Para filtrar por temperamentos
                if (temperament !== 'All') {
                    filteredAndOrderedDogs = filteredAndOrderedDogs.filter(dog => {
                      //Para los perros de la API
                      if (dog.temperament) {
                        //Dividimos la cadena de temperamentos y eliminamos los espacios en blanco
                        const temperaments = dog.temperament.split(',').map(t => t.trim());
                        // verificamos si el temperamento del perro coincide exactamente con el valor del payload
                        return temperaments.includes(temperament);
                      }
                      //Para los perros de la base de datos
                      if (dog.temperaments) {
                        //Usamos el método some() para verificar si al menos uno de los objetos en dog.temperaments tiene un nombre que coincide con filters.temperament
                        return dog.temperaments.some(temp => temp.name === temperament);
                      }
                      return false;
                    });
                }

            //Aplicacion de ordenamientos
            if (orderByName === 'nameAsc') {
                filteredAndOrderedDogs.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
              } else if (orderByName === 'nameDesc') {
                filteredAndOrderedDogs.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
              } else if (orderByWeight === 'weightAsc' || orderByWeight === 'weightDesc') {
                filteredAndOrderedDogs.sort(function(a, b) {
                    // Primero ordenamos por peso mínimo, si los pesos mínimos no son iguales, los vamos ordenando
                  
                    const weightA = Number(a.weight_min) || 0;
                    const weightB = Number(b.weight_min) || 0;

                  if (weightA !== weightB) {
                    if (orderByWeight === 'weightDesc') {
                      return weightB - weightA;
                    } else if (orderByWeight === 'weightAsc') {
                      return weightA - weightB;
                    }
                  } else {
                    // Si los pesos mínimos son iguales, recurrimos a ordenarlos por el peso máximo
                    const maxWeightA = Number(a.weight_max) || 0;
                    const maxWeightB = Number(b.weight_max) || 0;

                    if (maxWeightA !== maxWeightB) {
                      if (orderByWeight === 'weightDesc') {
                        return maxWeightB - maxWeightA;
                      } else if (orderByWeight === 'weightAsc') {
                        return maxWeightA - maxWeightB;
                      }
                    }
                  }
                  return 0;
                });
            }
            return{
                ...state,
                dogs: filteredAndOrderedDogs,
            };
        
        default:
            return state;
    }
};

export default rootReducer;

