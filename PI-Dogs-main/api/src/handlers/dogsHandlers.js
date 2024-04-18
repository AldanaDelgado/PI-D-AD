const getAllDogs=require('../controllers/dogControllers/getDogs');
const getDogByName = require('../controllers/dogControllers/getDogByName');
const createDog=require('../controllers/dogControllers/createDog');
const {dogsIDyAPI,dogsIDyDB}=require('../controllers/dogControllers/getDogById')

const getDogsHandler = async (req,res) =>{
    const {name} = req.query;

    try {

        const dog=name? await getDogByName(name) : await getAllDogs(); 
        
        res.status(200).json(dog);
        
    } catch (error) {
        res.status(400).send({error:error.message});
    };
};
 
const getDogsIdHandler = async (req,res) =>{
    const {id} = req.params;

    try {
        const data= isNaN(id)? await dogsIDyDB(id):await dogsIDyAPI(id); 
        res.status(200).json(data);
    } catch (error) {
        return res.status(400).send({error:error.message});
    };
};
 
const postDogHandler = async (req,res) =>{   
    console.log(req.body)
    const {name,image,temperament,life_span,weight_min,weight_max,height_min,height_max}=req.body;
 
    try {
        const newDog=await createDog(name,image,temperament,life_span,weight_min,weight_max,height_min,height_max);
        
        res.status(200).json(newDog);

    } catch (error) {
        return res.status(400).json({error:error.message});
    };
};
 
module.exports={
    getDogsHandler,
    getDogsIdHandler,
    postDogHandler
}