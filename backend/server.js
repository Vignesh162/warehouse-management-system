import dotenv from "dotenv";
// load env variables
dotenv.config();

import Fastify from 'fastify'
import mongodbPluggin from "./plugins/mongodb.js"
import productRoutes from './routes/product.js'
import jwtPlugin from "./plugins/jwt.js";
import userRoutes from './routes/users.js';

/**
 * @type {import('fastify').FastifyInstance} Instance of Fastify
 */
const fastify = Fastify({
  logger: true
})


// register mongodb database pluggin
await fastify.register(mongodbPluggin);

// register jwt pluggin
await fastify.register(jwtPlugin);  

// register user routes
fastify.register(userRoutes,{prefix:"/users"});

// register product routes
fastify.register(productRoutes,{prefix:"/products"});

fastify.listen({ port: process.env.PORT || 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})