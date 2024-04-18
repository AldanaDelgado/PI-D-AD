const axios=require('axios');
const {Temperament}=require('../../db');
const { API_KEY } = process.env;

const getTemperaments=async()=>{
    

    const temperamentsDB= await Temperament.findAll();


    const allTemperamentsNames=temperamentsDB.map(el=>el.name);  

    if(temperamentsDB.length===0){

        const dogsAPI=await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const temps=await dogsAPI.data.map(el=>{
            return {
                temperament:el.temperament
            }});

        const arrayTemps=temps.map(el=>el.temperament).join(', ').split(', ');
        

        let temperamentos = []
        arrayTemps.forEach(element=>{
            if(!temperamentos.includes(element)){
                temperamentos.push(element);
            };
        });


        temperamentos.sort().shift();
        temperamentos.map((tem) => {
            Temperament.findOrCreate({
                where:{name:tem},
                defaults:{name:tem}
            });
        });

        return temperamentsDB;
    };

    return allTemperamentsNames;
}

module.exports=getTemperaments;