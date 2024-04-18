const axios=require('axios');
const {Dog, Temperament}= require('../../db');
const {API_KEY} = process.env;


const getDogsFromDB = async()=>{
    const dogsDB=await Dog.findAll({
        include:{
            model:Temperament,
            attributes:['name'],
            through:{attributes:[]}
        }
    });

    return dogsDB;
}

const getAllDogs=async()=>{
    let [resDB, resAPI]=await Promise.all([getDogsFromDB(),getDogsFromAPI()]);

    resDB=resDB?.map(el=>el.toJSON());

    let getAllDogs=[...resDB,...resAPI];
    return getAllDogs;
}


const getDogsFromAPI = async () => {
    try {
        const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        console.log("Datos completos de la API:", data);

        const dogsAPI = data.map((el) => {
            console.log("Datos de un perro de la API:", el);
            return {
                id: el.id,
                name: el.name,
                image: el.image?.url || `https://cdn2.thedogapi.com/images/${el.reference_image_id}.jpg` || '',
                temperament: el.temperament,
                life_span: el.life_span,
                weight_min: el.weight.metric.split(' - ')[0],
                weight_max: el.weight.metric.split(' - ')[1],
                height_min: el.height.metric.split(' - ')[0],
                height_max: el.height.metric.split(' - ')[1]
            };
        });

        return dogsAPI;
    } catch (error) {
        //errores  solicitud API
        console.error("Error al obtener datos de la API de perros:", error);
        return [];
    }
};

module.exports=getAllDogs;