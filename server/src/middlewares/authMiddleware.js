const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authToken = async (req, res, next) => {
    

    try {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(token == null){
            //return res.status(401)
            res.status(400).send({
                status: "failed",
                message: "Something went wrong"
            })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN});

        req.userId = verified.id;

        next();
        
    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "failed",
            message: "Something went wrong"
        })
    }
}