const router = require('express').Router()
const UserController = require('../controllers/userController')
const ApiController = require('../controllers/apiController')


router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.post('/googlelogin', ApiController.googleLogin)



module.exports = router