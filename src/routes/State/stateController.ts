import { Request, Response } from 'express';
import { state } from '@prisma/client';
import { prisma } from '../../db';

export const updateState = async (req: Request, res: Response) => {
    try {
        const id_state = Number(req.params.id_state);

        const rows: state = await prisma.state.update({
            where: {
                id_state
            },
            data: {
                cantity: await prisma.task.count({
                    where: {
                        state: {
                            id_state
                        }
                    }
                })
            }
        })
        res.json(rows);
    } catch (err) {
        res.status(400).send(err)
    }
}

export const getStates = async (_: Request, res: Response) => {
    try {
        const rows: state[] = await prisma.state.findMany();
        res.json(rows);
    } catch (err) {
        res.status(400).send(err);
    }
}