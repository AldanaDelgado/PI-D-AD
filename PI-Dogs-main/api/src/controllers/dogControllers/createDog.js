const { Op } = require('sequelize');
const { Dog, Temperament } = require('../../db');

const createDog = async (name, image, temperament, life_span, weight_min, weight_max, height_min,height_max) => {
  if (!name || !image || !temperament || !life_span || !weight_max || !weight_min ||!height_min||!height_max) {
    throw new Error(`Faltan datos!, por favor intentalo nuevamente`);
  }

  const existingDog = await Dog.findOne({
    where: { name: { [Op.iLike]: `${name}` } }
  });
  if (existingDog) {
    throw new Error(`El perro ${name} ya fue creado, su id es ${existingDog.id}. Intenta con otro`);
  }

  const newDog = await Dog.create({
    name,
    image,
    life_span,
    weight_min,
    weight_max,
    height_min,
    height_max,
    temperament
  });

  const temperamentObj = await Temperament.findOne({
    where: { name: temperament }
  });

  if (!temperamentObj) {
    throw new Error(`El temperamento ${temperament} no fue encontrado en la base de datos.`);
  }

  await newDog.addTemperament([temperamentObj]);

  return Dog.findByPk(newDog.id, {
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  });
};

module.exports = createDog;
