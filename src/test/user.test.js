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

    it('should get all users', async () => {
        const users = await userRepository.getAll();
        expect(users).to.be.an("array");
        expect(users.length).to.be.greaterThan(0);
        expect(users[0].first_name).to.be.a("string");
        expect(users[0].last_name).to.be.a("string");
        expect(users[0].age).to.be.a("number");
        expect(users[0].email).to.be.a("string");
        expect(users[0].role).to.be.a("string");
        expect(users[0].password).to.be.a("string");
        expect(users[0].password).to.be.equal("123456");
    })

    let userId;
    let userEmail;

    it('should create a user', async () => {

        const newUser = {
            first_name: 'Jose Manuel',
            last_name: 'Alonso Serafin',
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

    it('should update a user', async () => {

        const updatedUser = {
            first_name: 'Estefania Alicia',
            last_name: 'Santarelli Perez',
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


    after(async () => {
        await userRepository.deleteOne(userId);
        mongoose.disconnect();
    })

    // afterEach(async () => {
    //     console.log('Executed after each test');
    // })

})