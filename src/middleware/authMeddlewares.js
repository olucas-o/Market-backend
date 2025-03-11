import "dotenv/config";
import jwt from "jsonwebtoken";
import usersService from "../services/userService.js";

export function authMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization;
    
    if (!tokenHeader) {
    return res.status(401).send({ message: "No Token" });
    }
    
    const parts = tokenHeader.split(" ");
    
    if (parts.length !== 2) {
    return res.status(401).send({ message: "Bad formatado" });
    }
    
    const [scheme, token] = parts;
    
    if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Bad Token" });
    }
    
    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {

        if (err) {
        return res.status(401).send({ message: "Invalid token!"});
        }
        
        const user = await usersService.findUserByIdService(decoded.Id);
        
        if (!user) {
        return res.status(401).send({ message: "Invalid token!" });
        }
        
        req.userId = user.id;
        
        return next();
    
        });
        
    }