const {User} = require('../models')
const compareToken = require('../helpers/generateToken')
const {comparePassword} = require('../helpers/bcrypt')

class UserController{

    static test (req, res ,next) {
        res.send('GOOOD')
    }

    static register (req, res ,next) {
        let {fullname ,email, password} = req.body
        let newUser = {fullname ,email, password}
        
        User
            .create(newUser)
            .then(user =>{
                res.status(201).json(user)
            })
            .catch(err =>{
                res.status(500).json(err)
                next({
                    code : 500,
                    message : err
                })
            })
    }

    static login (req, res ,next) {
       let {email, password} = req.body
       
        User
            .findOne({where : { email }})
            .then(user =>{
                let compare = comparePassword(password, user.password)
                
                if (user.id && compare) {
                    let access_token = compareToken({id:user.id, email:user.email}, process.env.SECRET)

                    res.status(200).json({access_token, name:user.fullname})
                } else {
                    res.status(401).json({mesage : 'Invalid email or password'})
                    next({
                        code: 401 ,
                        message : 'Invalid email or password' 
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
                next({
                    code: 500,
                    message : err
                })
            })
    }
}

module.exports = UserController