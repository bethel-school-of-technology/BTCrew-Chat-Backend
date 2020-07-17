const jwt = require('jsonwebtoken');
const models = require('../models/index');
const bcrypt = require('bcryptjs');

var authService = {
    signUser: function(user){
        const token = jwt.sign (
            {
                Username: user.Username,
                UserId: user.UserId
            },
            'secretkey',
            {
                expiresIn: '2h'
            }
        );
        return token;
    },
    verifyUser: function (token) {
        try {
            let decoded = jwt.verify(token, 'secretkey');
            return models.users.findByPk(decoded.UserId);
        }catch (err){
            console.log(err);
            return null;
        }
    },
    hashPassword: function(plainTextPassword){
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    }
}

module.exports = authService;