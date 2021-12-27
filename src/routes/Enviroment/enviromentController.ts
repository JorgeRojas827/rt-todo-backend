import { enviroment } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from '../../db';

export const createEnviroment = async (req: Request, res: Response) => {
    try {
        const { enviro_name, fk_member } = req.body;

        const rows: enviroment = await prisma.enviroment.create({
            data: {
                enviro_name,
                fk_member
            }
        })

        res.json(rows);
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getEnviromentByUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;

        const rows: enviroment[] = await prisma.enviroment.findMany({
            where: {member: {
                username
            }}
        })

        res.send(rows);
    } catch (err) {
        console.log(err);
    }
}