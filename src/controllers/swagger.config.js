
import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../dirname.js"

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "E-commerce API Documentation",
            version: "1.0.1",
            description: "E-commerce API Documentation with Swagger UI",
        },
    },
    apis:[`${__dirname}/src/docs/**/*.yaml`]
}

export const specs = swaggerJSDoc(swaggerOptions);