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


            // filtros

                if(origin==='DB'){
                    
                    filteredAndOrderedDogs=filteredAndOrderedDogs.filter((dog)=>isNaN(dog.id))
                }else if(origin==='API'){
                   
                    filteredAndOrderedDogs=filteredAndOrderedDogs.filter((dog)=>!isNaN(dog.id))
                }

                // filtrar temperamentos
                if (temperament !== 'All') {
                    filteredAndOrderedDogs = filteredAndOrderedDogs.filter(dog => {
                      // API
                      if (dog.temperament) {

                        const temperaments = dog.temperament.split(',').map(t => t.trim());
                        
                        return temperaments.includes(temperament);
                      }
                      //DB
                      if (dog.temperaments) {
                        
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

                    const weightA = Number(a.weight_min) || 0;
                    const weightB = Number(b.weight_min) || 0;

                  if (weightA !== weightB) {
                    if (orderByWeight === 'weightDesc') {
                      return weightB - weightA;
                    } else if (orderByWeight === 'weightAsc') {
                      return weightA - weightB;
                    }
                  } else {

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

