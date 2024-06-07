import { userModel } from "../models/user.model.js";

const getUsers = async () => {
    const users = await userModel.find();
    return users;
};

const getUserById = async id => {
    const user = await userModel.findById(id);
    return user;
};

const getUserByEmail = async email => {
    const user = await userModel.findOne(email);
    return user;
};

const createUser = async (data) => {
    const newUser = await userModel.create(data);
    return newUser;
};

const updateUserById = async (id, data) => {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
};

const deleteUserById = async (id) => {
    const deletedUser = await userModel.deleteOne({ _id: id });
    if (!deletedUser) {
        throw new Error(`user not found with id ${id}`);
    }

    return { message: 'user deleted', success: true };
};

export default {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUserById,
    deleteUserById
}