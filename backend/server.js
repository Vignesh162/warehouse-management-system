import dotenv from "dotenv";
// load env variables
dotenv.config();

import Fastify from 'fastify'
import mongodbPluggin from "./plugins/mongodb.js"
import fastifyCors from "@fastify/cors";
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import productRoutes from './routes/product.js'
import jwtPlugin from "./plugins/jwt.js";
import userRoutes from './routes/users.js';
import transactionRoutes from "./routes/transactions.js";

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})

// Register the plugin with your configuration
await fastify.register(fastifyCors, {
    // Configuration options go here
    origin: '*',
    //   origin: 'https://yourfrontend.com',
    //   methods: ['GET', 'POST', 'PUT', 'DELETE']
});


// 1. Register the Swagger specification generator
await fastify.register(swagger, {
    openapi: {
        info: {
            title: 'My Fastify API',
            description: 'Automatically generated OpenAPI documentation',
            version: '1.0.0'
        },
        servers: [{ url: `http://localhost:${process.env.PORT}` }]
    }
});

// 2. Register the UI plugin to serve the interactive dashboard
await fastify.register(swaggerUi, {
    routePrefix: '/documentation', // Access via http://localhost:5000/documentation
    uiConfig: {
        docExpansion: 'full',
        deepLinking: false
    }
});

// register mongodb database pluggin
await fastify.register(mongodbPluggin);

// register jwt pluggin
await fastify.register(jwtPlugin);  

// register user routes
fastify.register(userRoutes,{prefix:"/api/users"});

// register product routes
fastify.register(productRoutes,{prefix:"/api/products"});

// register transaction routes
fastify.register(transactionRoutes,{prefix:"/api/transactions"})

fastify.listen({ port: process.env.PORT || 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})