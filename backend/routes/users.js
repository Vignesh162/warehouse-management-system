import { login, createUser } from "../controllers/auth.js";
import { LoginSchema, RegisterSchema } from "../schemas/auth.js";
export default function userRoutes(fastify,options,done){
    
    fastify.post("/login",{
        schema: LoginSchema,
        handler: login
    });

    fastify.post("/register",{
        schema: RegisterSchema,
        handler:createUser
    });
    done();
}