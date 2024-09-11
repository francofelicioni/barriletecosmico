import mongoose from "mongoose";
import envConfig from "../config/envConfig.js";
import userRepository from "../persistence/mongo/repositories/user.repository.js";
import { expect } from "chai";


mongoose.connect(envConfig.MONGO_URL);

describe('User Repository', () => {

    // before(async () => {
    //     console.log('Executed before all tests');
    // })

    // beforeEach(async () => {
    //     console.log('Executed before each test');
    // })

    it('[GET] api/users should get all users', async () => {
        const users = await userRepository.getAll();
        console.log(users)
        expect(users).to.be.an("array");
    })

    let userId;
    let userEmail;

    it('should create a user', async () => {

        const newUser = {
            first_name: 'Kevin Serafin',
            last_name: 'Kimberly',
            age: 35,
            email: 'rCqg6@example.com',
            password: '123456',
            role: 'admin'
        }

        const createdUser = await userRepository.create(newUser);
        userId = createdUser._id;
        userEmail = createdUser.email;

        expect(newUser.first_name).to.be.a("string");
        expect(newUser.last_name).to.be.a("string");
        expect(newUser.age).to.be.a("number");
        expect(newUser.email).to.be.a("string");
        expect(newUser.role).to.be.a("string");
        expect(newUser.password).to.be.a("string");
        expect(newUser.password).to.be.equal("123456");
    })

    it('should get a user by id', async () => {
        const user = await userRepository.getByEmail(userEmail);
        expect(user).to.be.an("object");
        expect(user.first_name).to.be.a("string");
        expect(user.last_name).to.be.a("string");
        expect(user.age).to.be.a("number");
        expect(user.email).to.be.a("string");
        expect(user.role).to.be.a("string");
        expect(user.password).to.be.a("string");
        expect(user.password).to.be.equal("123456");
        expect(user.email).to.be.equal(userEmail);
    })

    it('should get a user by id', async () => {
        const user = await userRepository.getByEmail(userEmail);
        expect(user).to.be.an("object");
        expect(user.first_name).to.be.a("string");
        expect(user.last_name).to.be.a("string");
        expect(user.age).to.be.a("number");
        expect(user.email).to.be.a("string");
        expect(user.role).to.be.a("string");
        expect(user.password).to.be.a("string");
        expect(user.password).to.be.equal("123456");
        expect(user.email).to.be.equal(userEmail);
    })

    it('should update a user', async () => {

        const updatedUser = {
            first_name: 'John',
            last_name: 'Doe',
            age: 35,
            email: 'rCqg6@example.com',
            password: '123456',
            role: 'admin'
        }

        const user = await userRepository.update(userId, updatedUser);
        expect(user).to.be.an("object");
        expect(user.first_name).to.be.a("string");
        expect(user.last_name).to.be.a("string");
        expect(user.age).to.be.a("number");
        expect(user.email).to.be.a("string");
        expect(user.role).to.be.a("string");
        expect(user.password).to.be.a("string");
        expect(user.password).to.be.equal("123456");
        expect(user.email).to.be.equal(userEmail);
    })

    it('should delete a user', async () => {
        const user = await userRepository.deleteOne(userId);
        expect(user.message).to.be.equal('User deleted')
        expect(user.success).to.be.equal(true)
    })


    // Executed after each test');
    after(async () => {
        await userRepository.deleteOne(userId);
        mongoose.disconnect();
    })
})