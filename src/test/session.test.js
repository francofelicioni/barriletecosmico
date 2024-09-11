import mongoose from 'mongoose';
import { expect } from 'chai';
import envConfig from '../config/envConfig.js';
import supertest from 'supertest';
import { userModel } from '../persistence/mongo/models/user.model.js';

mongoose.connect(envConfig.MONGO_URL);
const requester = supertest(`http://localhost:${envConfig.PORT}`);

describe('Session Test Repository', () => {

    it('[POST] /api/sessions/register Should create a user', async () => {

        const newUser = {
            first_name: 'Kevin',
            last_name: 'Kimberly',
            age: 35,
            email: 'test@test.com',
            password: '12345678',
            role: 'admin'
        }

        const { status, _body, ok } = await requester
            .post("/api/sessions/register")
            .send(newUser);

        expect(status).to.be.equal(201);
        expect(ok).to.be.equal(true);
        expect(_body.status).to.be.equal("success");
        expect(_body.message).to.be.equal("User created");
    });

    let cookie;

    it('[POST] /api/sessions/login Should login a user', async () => {
        const user = {
            email: 'test@test.com',
            password: '12345678'
        }

        const { status, _body, ok, headers } = await requester
            .post('/api/sessions/login')
            .send(user)

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.status).to.be.equal("success");
    });

    it("[GET] /api/session/current  Should get current user info", async () => {
        const { status, _body, ok } = await requester
            .get("/api/sessions/current")
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

        expect(ok).to.be.equal(true);
        expect(status).to.be.equal(200);
        expect(_body.payload.email).to.be.equal("test@test.com");
        expect(_body.payload.role).to.be.equal("admin");
    });


    after(async () => {
        await userModel.deleteOne({ email: 'test@test.com' });
        mongoose.disconnect();
    })
})
