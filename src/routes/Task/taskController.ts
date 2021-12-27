import { Request, Response } from "express";
import { prisma } from '../../db';
import { task } from '@prisma/client';

export const getTasksByEnviroment = async (req: Request, res: Response) => {
    try {
        const enviro_name = req.params.enviro_name;

        const rows: task[] = await prisma.task.findMany({
            where: {
                enviroment: {
                    enviro_name
                }
            }
        })
        res.json(rows);
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getTasksByEnviromentAndState = async (req: Request, res: Response) => {
    try {
        const id_state = Number(req.params.id_state);
        const enviro_name = req.params.enviro_name;

        const rows: task[] = await prisma.task.findMany({
            where: {
                enviroment: {
                    enviro_name
                },
                AND: {
                    state: {
                        id_state
                    }
                }
            }
        })
        
        res.json(rows);
    } catch (err) {
        res.status(400).send(err)
    }
}

// export const getTasksByState = async (req: Request, res: Response) => {
//     try {
//         const id_state = Number(req.params.id_state);

//         const rows: task[] = await prisma.task.findMany({
//             where: {
//                 state: {
//                     id_state
//                 }
//             }
//         })

//         res.json(rows)
//     } catch (err) {
//         res.status(400).send(err)
//     }
// }

export const createTask = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const rows = await prisma.task.create({
            data
        })

        res.json(rows)
    } catch (err) {
        res.status(400).send(err);
    }
}

