const router = require('express').Router()
const UserRouter = require('./user')
const TaskRouter = require('./task')
const TaskController = require('../controllers/taskController')
const { authenticate, authorize} = require('../middlewares/auth')



router.use('/user', UserRouter)


router.use(authenticate)


router.use('/tasks', TaskRouter)


module.exports = router