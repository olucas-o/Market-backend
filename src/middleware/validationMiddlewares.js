import { IdSchema } from "../schemas/idSchema.js";

const validate = (schema)=> async (req, res, next)=>{
    try{
        await schema.parse(req.body);
        next()
    }catch(e){
        res.status(400).json({error: e.errors})
    }
};

const validateId = (req, res, next)=>{
    try{
        IdSchema.parse({Id: +req.params.id});
        next();
    }catch(e){
        res.status(400).send({error: e.errors})
    }
};

export {
    validate,
    validateId
};