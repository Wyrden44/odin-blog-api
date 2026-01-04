import bcrypt from "bcrypt";
import prisma from "../lib/prisma.ts";
import { signToken } from "../lib/jwt.js";

export const signup = async (req, res) => {
    const {username, password} = req.body;
    
    
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username: username,
            hashedPassword: hashedPassword
        }
    });

    res.json({ id: user.id });
}

export const login = async (req, res) => {
    const {username, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    });

    if (!user) {
        return res.status(401).send("User not Found");
    }

    const valid = await bcrypt.compare(password, user.hashedPassword);

    if (!valid) {
        return res.status(401).send("Invalid Password");
    }

    // token
    const token = signToken({ id: user.id, username: user.username});

    res.json({ token });
}