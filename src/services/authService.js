import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateJWT(Id) {
    return jwt.sign({ Id }, 
    process.env.SECRET_JWT,
    { expiresIn : 86400 });
}

export {generateJWT};