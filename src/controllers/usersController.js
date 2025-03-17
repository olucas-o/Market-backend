import userService from '../services/userService.js';
import { loginService } from '../services/authService.js';


async function createUserController (req, res) {
    const newUser = req.body;
    try {
        const token = await userService.createUserService(newUser);
        res.status(201).send({token});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

async function findAllUsersController(req, res) {
    try {
        const users = await userService.findAllUsersService();
        res.send({ users });
    } catch (e) {
        res.status(400).send(e.message);
    }
};

async function findUserByIdController(req, res) {
     const { id } = req.params;
    try {
        const user = await userService.findUserByIdService(id);
        res.send({ user });
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).send({ error: 'User not found' });
        }
    }
};

async function updateUserController(req, res) {
    const { id } = req.params;
    const newUser = req.body;
    try{
        const user = await userService.updateUserServise(newUser, id)
        res.send({user})
    } catch (e){
        res.status(400).send( e.message );
    }
};

async function deleteUserContreller(req, res) {
    const { id } = req.params;
    try{
        const message = await userService.deleteUserService(id)
        res.send({ message })
    }catch(e){
        res.status(400).send( e.message );
    }
};

async function loginController(req,res) {
    const {email, password} = req.body
    try{
        const token = await loginService(email, password)
        res.status(201).send({token});
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

export default {
    createUserController,
    findAllUsersController,
    findUserByIdController,
    updateUserController,
    deleteUserContreller,
    loginController
};
