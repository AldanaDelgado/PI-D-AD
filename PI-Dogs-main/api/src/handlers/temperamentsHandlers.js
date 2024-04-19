const getTemperaments = require("../controllers/temperamentControllers/getTemperaments");

const getAllTemperaments = async (req, res) =>{
    try {
        const temps = await getTemperaments();
        return  res.status(200).json(temps);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}
module.exports = getAllTemperaments;