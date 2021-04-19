const jwt = require('jsonwebtoken')

const compareToken = (payload) =>{
    return jwt.sign(payload, process.env.SECRET)
}

module.exports = compareToken