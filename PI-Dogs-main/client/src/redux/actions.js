import axios from "axios";
import { GET_TEMPS, GET_DOGS, GET_BY_NAME, GET_DETAIL, POST_DOG, CLEAR_DETAIL, APPLY_FILTERS_AND_ORDER,POST_DOG_FAILURE } from "./action.types";

export function getDogs(){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs/`);
            
            dispatch({
                type: GET_DOGS,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching dogs:", error);
        }
    }
};

export function getByName(name){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs/?name=${name}`);
            
            dispatch({
                type: GET_BY_NAME,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching dogs by name:", error);
            alert(`Error: ${error.message}`);
        }
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:3001/dogs/${id}`);
            
            dispatch({
                type: GET_DETAIL,
                payload: response.data
            });
        } catch (error) {
            console.error(`Error fetching dog details for ID ${id}:`, error);
        }
    }
}

export function clearDetail(){
    return{
        type: CLEAR_DETAIL
    }
}

export function getTemperament() {
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/temperaments`);
            
            dispatch({
                type: GET_TEMPS,
                payload: response.data
            });
        } catch (error) {
            console.error("Error fetching temperaments:", error);
        }
    };
}

export const postDog = (newDog) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:3001/dogs', newDog);
        
        dispatch({
            type: POST_DOG,
            payload: response.data
        });

        window.alert("New dog added successfully!");
    } catch (error) {
        console.error("Error adding new dog:", error);
        dispatch({
            type: POST_DOG_FAILURE,
            payload: error.message 
        });
        window.alert("Failed to add new dog. Please try again.");
    }
};

export function filterAndOrder(filtersAndOrder){
    return {
        type:APPLY_FILTERS_AND_ORDER,
        payload:filtersAndOrder
    };
};


