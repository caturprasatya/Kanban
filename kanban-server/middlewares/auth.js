const verifyToken = require('../helpers/verfyToken')
const {User, Task} = require('../models')

const authenticate = (req, res , next) =>{
    try {
        let { access_token } = req.headers
        let decoded = verifyToken(access_token)
        
        if (decoded) {
            User
                .findByPk(decoded.id)
                .then(user =>{
                    req.currentUser = {id:decoded.id, email:decoded.email}
                    next()
                })
                .catch(err => {    
                    next({
                        code : 401,
                        message : 'Unauthorized'
                    })
                })
        } else {
            next({
                code : 401,
                message : 'Unauthorized'
            })
        }
        
    } catch (error) {
        next({
            code : 401,
            message : 'Invalid Token'
        })
    }
}

const authorize = (req, res , next) =>{
    let { id } = req.params
    let userId = req.currentUser.id
    console.log(id, userId);

    Task    
        .findByPk(id)
        .then(task =>{
            if (task.userId === userId) {
                console.log('ini masuk auth');
                next()
            } 
            else {
                next({
                    code : 404,
                    message : 'Todo not found'
                })
            } 
        })
        .catch(err =>{
            console.log(err);
            next({
                code : 500,
                message : 'INternal server error di auth'
            })
        })
}

module.exports = {authenticate,authorize}