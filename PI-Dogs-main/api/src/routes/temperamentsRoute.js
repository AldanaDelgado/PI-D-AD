const {Router}=require('express');

const getTemperaments=require('../handlers/temperamentsHandlers');

const temperaments=Router();

temperaments.get('/',getTemperaments);

module.exports=temperaments;