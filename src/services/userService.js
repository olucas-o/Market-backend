import userRepository from '../repositories/userRepository.js';
import bcrypt from 'bcrypt';
import {generateJWT} from '../services/authService.js';

async function createUserService(newUser) {
    const foundUser = await userRepository.findUserByEmailRepository(newUser.email);
    if (foundUser) {
        throw new Error("User already exists");
    };
    const passHash = await bcrypt.hash(newUser.password, 10);
    const user = await userRepository.createUserRepository({...newUser, password: passHash});
    const token = generateJWT(user.id);
    return token;
};


async function findAllUsersService() {
    const users = await userRepository.findAllUserRepository();
    return users;
}

async function findUserByIdService(id) {
    const user = await userRepository.findUserByIdRepository(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

async function updateUserServise (newUser, userId) {
    const user = await userRepository.findUserByIdRepository(userId);
    if(!user) throw new Error("User not exist");
    if(newUser.password){
        newUser.password = await bcrypt.hash(newUser.password, 10)
    }
    const userUpdated = userRepository.updateUserRepository(userId, newUser)
    return  userUpdated
}

async function deleteUserService(userId) {
    const user = await userRepository.findUserByIdRepository(userId);
    if(!user) throw new Error("User not exist");
    const {message} = await userRepository.deleteUserByIDRepository(userId);
    return message;
}

export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserServise,
    deleteUserService
};