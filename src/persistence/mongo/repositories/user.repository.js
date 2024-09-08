
import { userModel } from "../models/user.model.js";

const getAll = async () => {
    const users = await userModel.find();
    return users;
}

const getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
}

const getByEmail = async (email) => {
    const user = await userModel.findOne({email});
    return user;
}

const create = async (data) => {
    const newUser = await userModel.create(data);
    return newUser;
}

const update = async (id, data) => {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, { new: true });
    return updatedUser;
}

const deleteOne = async (id) => {
    const deletedUser = await userModel.deleteOne({ _id: id });

    if (deletedUser.deletedCount === 0) {
        return { message: 'User not found', success: false };
    }

    return { message: 'User deleted', success: true };
}

export default {
    getAll,
    getById,
    getByEmail,
    create,
    update,
    deleteOne
}

