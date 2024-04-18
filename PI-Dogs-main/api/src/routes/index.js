const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dog =require('./dogsRoute.js');
const temperaments=require('./temperamentsRoute.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dog);
router.use('/temperaments', temperaments);

module.exports = router;
