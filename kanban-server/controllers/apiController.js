const {OAuth2Client} = require('google-auth-library');
const { User } = require('../models')
const compareToken = require('../helpers/generateToken')

class ApiController {
    static googleLogin(req, res, next){
        // console.log(req.body);
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email 
        let password 
        let fullname
        // console.log(client);

        client
            .verifyIdToken({
                idToken : req.body.googleToken,
                audience: process.env.CLIENT_ID,
            })
            .then(ticket =>{
                const payload = ticket.getPayload();
                // console.log(payload);

                // console.log('cekkk');

                email = payload.email
                fullname = payload.name
                password = new Date().toString()

                return User.findOne({where : {email}})
            })
            .then(user =>{
                if (user) {

                    const access_token = compareToken({ id: user.id, email: user.email })
                    res.status(200).json({access_token})
                    
                } else {
                    return User.create({
                        email,
                        fullname,
                        password
                    })
                }
            })
            .then(generateUser =>{
                
                const access_token = compareToken({ id: generateUser.id , email:generateUser.email })
                res.status(201).json({access_token})
            })
            .catch(err =>{
                console.log(err);
                next({code : 401, message : err})
            })


    }
}

module.exports = ApiController