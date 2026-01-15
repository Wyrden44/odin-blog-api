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
        return res.status(401).json({errors: [{field: "username", msg: "User not Found"}]});
    }

    const valid = await bcrypt.compare(password, user.hashedPassword);

    if (!valid) {
        return res.status(401).json({errors: [{field: "password", msg: "Invalid Password"}]});
    }

    // token
    const token = signToken({ id: user.id, username: user.username, role: user.role });

    res.json({ token });
}

export const adminLogin = async (req, res) => {
    const {password} = req.body;

    const admin = await prisma.user.findUnique({
        where: {
            username: "admin",
        }
    });

    const valid = await bcrypt.compare(password, admin.hashedPassword);

    if (!valid) {
        return res.status(401).json({errors: ["Invalid Password"]});
    }

    const token = signToken({id: admin.id, username: admin.username, role: admin.role });

    res.json({token});
}