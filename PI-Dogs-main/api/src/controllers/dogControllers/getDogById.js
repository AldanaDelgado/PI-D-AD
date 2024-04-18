const { Dog, Temperament } = require('../../db');
const getAllDogs = require('./getDogs');


const dogsIDyDB = async (id) => {
    let dogDB = await Dog.findByPk(id, {
        include: {
            model: Temperament,
            attributes: ['name'],
            through: { attributes: [] }
        }
    });
    if (!dogDB) throw Error(`No se han encontrado perros en la DB con ese id ${id}`);
    return dogDB;
};


const dogsIDyAPI=async(id)=>{
    let allDogs=await getAllDogs();
    let dogID=allDogs.find(el=>el.id===Number(id));
    if(!dogID)throw Error(`No se han encontrado perros en la API con el id ${id}`);

    return dogID;
}

module.exports = { dogsIDyAPI, dogsIDyDB };


