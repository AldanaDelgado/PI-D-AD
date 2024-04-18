const {Router}=require('express');
const {getDogsHandler,getDogsIdHandler,postDogHandler}=require('../handlers/dogsHandlers');
const dog = Router();

dog.get('/',getDogsHandler);
dog.get('/:id',getDogsIdHandler);
dog.post('/', postDogHandler);

module.exports= dog;