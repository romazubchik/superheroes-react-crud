const { Router } = require('express'); 
const controller = require('./controller');

const router = Router();

router.get('/', controller.getSuperheroes);
router.get('/:id', controller.getSuperheroesById);
router.post('/', controller.addSuperheroes);
router.delete('/:id', controller.deleteSuperhero);
router.put('/:id', controller.updateSuperhero);

module.exports = router;