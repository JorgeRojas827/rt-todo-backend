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

        await prisma.state.createMany({
            data: [
                { name: 'Sin estado', bkgColor: 'rgba(217, 217, 217, 0.43', fk_enviroment:rows.id_enviro },
                { name: 'Por hacer', bkgColor: 'rgba(255, 128, 128, 0.43', fk_enviroment:rows.id_enviro },
                { name: 'En progreso', bkgColor: 'rgba(255, 235, 128, 0.43', fk_enviroment:rows.id_enviro },
                { name: 'Completado', bkgColor: 'rgba(162, 255, 177, 0.39', fk_enviroment:rows.id_enviro },
            ]
        })

        res.json(rows);
    } catch (err) {
        res.status(400).send(err)
    }
}

export const updateEnviroment = async (req: Request, res: Response) => {
    try {
        const id_enviro = Number(req.params.id_enviro);
        const enviro_name = req.params.enviro_name;

        const rows: enviroment = await prisma.enviroment.update({
            where: {
                id_enviro
            },
            data: {
                enviro_name
            }
        })
        
        res.json(rows);
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getEnviromentByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.params.email;

        const rows: enviroment[] = await prisma.enviroment.findMany({
            where: {member: {
                email
            }}
        })

        res.send(rows);
    } catch (err) {
        console.log(err);
    }
}