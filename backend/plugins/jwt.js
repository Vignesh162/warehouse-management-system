import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";

// jwt plugin
async function jwtPlugin(fastify) {
    await fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECRET
    });
    // add decorater to fastify
    fastify.decorate("authenticate", async (request, reply) => {
        try {
            await request.jwtVerify();
        } catch (err) {
            return reply.code(401).send({
                message: "Unauthorized"
            });
        }
    });
}

export default fp(jwtPlugin);