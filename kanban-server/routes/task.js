const  router = require('express').Router()
const TaskController = require('../controllers/taskController')
const {authorize} = require('../middlewares/auth')

router.get('/', TaskController.fetchTask)

router.post('/', TaskController.addTask)

router.use('/:id',authorize)

router.put('/:id', TaskController.editTask)

router.patch('/:id', TaskController.changeRole)

router.delete('/:id', TaskController.deleteTask)



module.exports = router