import { member } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from '../../db';

export const createMember = async (req: Request, res: Response) => {
    try {
        const { username, email, picture }: member = req.body;

        const rows: member = await prisma.member.create({
            data: {
                username,
                picture,
                email
            }
        })

        res.json(rows);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const loginMember = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;

        const rows: member[] = await prisma.member.findMany({
            where: { email }
        })

        res.send(rows); 
    } catch (error) {
        res.status(400).send(error)
    }
}