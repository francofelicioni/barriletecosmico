import { expect } from 'chai';
import supertest, { agent } from 'supertest';
import envConfig from '../config/envConfig.js';


describe('Product Test Repository', () => {

    let cookie;
    before(async () => {
        const loginUser = {
            email: "test@test.com",
            password: "12345678",
        };

        const { headers } = await requester.post("/api/sessions/login").send(loginUser);

        const cookieResult = headers["set-cookie"][0];

        cookie = {
            name: cookieResult.split("=")[0],
            value: cookieResult.split("=")[1],
        };
    });

    let productId;

    it('[POST] /api/products Should get all products', async () => {
        const newProduct = {
            title: "Test Product",
            description: "This a test product",
            price: 300,
            thumbnail: ["http://www.google.com/img"],
            code: "ABC123",
            stock: 50,
            category: "Books",
        }

        const { status, _body, ok } = await requester
            .post("/api/products")
            .send(newProduct)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

        productId = _body.payload._id;

        expect(status).to.be.equal(201);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("Test Product");
        expect(_body.payload.category).to.be.equal("Books");
    });

    it("[GET] /api/products/:pid  This endpoint should return a product", async () => {
        const { status, _body, ok } = await requester.get(`/api/products/${productId}`);

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("Test Product");
    });

    it("[GET] /api/products/ This endpoint should return all products", async () => {
        const { status, _body, ok } = await requester.get(`/api/products`);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.products.docs).to.be.an("array");
    });

    it("[PUT] /api/products/:pid This endpoint should update a product", async () => {
        const updateData = {
            title: "test update",
            description: "product test update",
        };

        const { status, _body, ok } = await requester
            .put(`/api/products/${productId}`)
            .send(updateData)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);

        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
        expect(_body.payload.title).to.be.equal("test update");
        expect(_body.payload.description).to.be.equal("product test update");
    });

    it("[DELETE] /api/products/:pid This endpoint should delete a product", async () => {
        const { status, _body, ok } = await requester
            .delete(`/api/products/${productId}`)
            .set("Cookie", [`${cookie.name}=${cookie.value}`]);
        expect(status).to.be.equal(200);
        expect(ok).to.be.equal(true);
    });

})

