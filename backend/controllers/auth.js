import bcrypt from "bcrypt";

/**
 * Summary: Function For User Login.
 * It is an controller which takes username & password for authentication & returns a JWT Token which is valid for 24 hours. The password is stored in hashed formed using BCRYPT 
 * @since 1.0.0 
 * */
export const login = async (req, reply) => {
    const { username, password } = req.body;
    try {
        const user = await req.server.mongo.db.collection("users").findOne({ username });

        if (!user) {
            return reply.code(401).send({
                message: "Invalid email or password"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return reply.code(401).send({
                message: "Invalid email or password"
            });
        }

        // Generate JWT
        const token = req.server.jwt.sign({
            id: user._id,
            username: user.username
        },{
            expiresIn:"24h"
        });

        return reply.send({ token, message:"Logged In Sucessfully"});
    } catch (err) {
        return reply.code(500).send({
            message: err.message
        });
    }
};

/**
 * Summary: Function For User Registration.
 * It is an controller which takes name, username & password for authentication & returns a JWT Token which is valid for 24 hours. Username should be unique, The password should have minimum length of 6 and maximum length of 12, containing atleast 1 uppercase, 1 lowercase, and 1 speacial character.Paswword is stored in hashed form (using BCRYPT) in the database. 
 * @since 1.0.0
 */
export const createUser = async (req, reply) => {
    const { name, username, password } = req.body;

    try {
        const collection = req.server.mongo.db.collection("users");

        const existingUser = await collection.findOne({ username });

        if (existingUser) {
            return reply.code(409).send({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS) || 10
        );

        const result = await collection.insertOne({
            name,
            username,
            password: hashedPassword
        });

        const token = req.server.jwt.sign({
            id: result.insertedId,
            username
        },{
            expiresIn:"24h"
        });

        return reply.code(201).send({
            message: "User created successfully",
            token,
            user: {
                id: result.insertedId,
                name,
                username
            }
        });

    } catch (err) {
        return reply.code(500).send({
            message: err.message
        });
    }
};