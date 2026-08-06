import { login, createUser } from "../controllers/auth.js";

export default function userRoutes(fastify,options,done){
    fastify.post("/login",login);
    fastify.post("/register",createUser);
    done();
}