import { createBucket, uploadObject } from "../../aws/aws-s3";
import { Request, Response } from "express";
import { prisma } from '../../db';
import { task } from '@prisma/client';
import { Pool } from 'pg';

export const getTasksByEnviroment = async (req: Request, res: Response) => {
    try {
        const id_enviro = Number(req.params.id_enviro);

        const rows: task[] = await prisma.task.findMany({
            where: {
                enviroment: {
                    id_enviro
                }
            }
        })
        res.json(rows);
    } catch (err) {
        res.status(400).send(err)
    }
}


export const generateTaskBucket = async (req: Request, res: Response) => {
    try {
        const { fecha, fk_enviro } = req.body;

        const datos: task[] = await prisma.task.findMany({
            where: {
                state: {
                    name: 'Por hacer',
                    AND: {
                        fk_enviroment: fk_enviro
                    }
                }, 
            }
        })
        await createBucket();
        setTimeout(async () => {
            await uploadObject(fecha, datos);
        }, 3000)
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

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const id_task = Number(req.params.id_task);
        
        await prisma.task.delete({
            where: {
                id_task
            }
        })

        res.send({
            completed: true
        })
    } catch (err) {
        res.status(400).send(err)
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const id_task = Number(req.params.id_task);
        const description = req.params.description;

        const rows: task = await prisma.task.update({
            where: {
                id_task
            },
            data: {
                description
            }
        })

        res.json(rows)
    } catch (err) {
        res.status(400).send(err);
    }
}

export const updateStateFkTask = async (req: Request, res: Response) => {
    try {
        const id_task = Number(req.params.id_task);
        const fk_state = Number(req.params.fk_state);

        const rows: task = await prisma.task.update({
            where: {
                id_task
            },
            data: {
                fk_state
            }
        })

        res.json(rows)
    } catch (err) {
        res.status(400).send(err);
    }
}

export const exchangeIds = async (req: Request, res: Response) => {
    try {
        const pool = new Pool({
            connectionString: process.env.DATABASE_URL
        });
        pool.connect();

        const originTask = Number(req.params.originTask);
        const destinationTask = Number(req.params.destinationTask);
        
        await pool.query(`BEGIN;
        SET session_replication_role='replica';
        
        UPDATE public.task 
        SET id_task = -id_task 
        WHERE id_task in (${originTask}, ${destinationTask});
        
        UPDATE public.task
        SET id_task = CASE id_task WHEN ${-originTask} THEN ${destinationTask}
                         WHEN ${-destinationTask} THEN ${originTask}
                         END
        WHERE id_task in (${-originTask}, ${-destinationTask});
        
        SET session_replication_role='origin';
        COMMIT;`)

    } catch (err) {
        res.status(400).send(err);
    }
}
