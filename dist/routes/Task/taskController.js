"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeIds = exports.updateStateFkTask = exports.updateTask = exports.deleteTask = exports.createTask = exports.getTasksByEnviromentAndState = exports.getTasksByEnviroment = void 0;
const db_1 = require("../../db");
const pg_1 = require("pg");
const getTasksByEnviroment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_enviro = Number(req.params.id_enviro);
        const rows = yield db_1.prisma.task.findMany({
            where: {
                enviroment: {
                    id_enviro
                }
            }
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.getTasksByEnviroment = getTasksByEnviroment;
const getTasksByEnviromentAndState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_state = Number(req.params.id_state);
        const enviro_name = req.params.enviro_name;
        const rows = yield db_1.prisma.task.findMany({
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
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.getTasksByEnviromentAndState = getTasksByEnviromentAndState;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const rows = yield db_1.prisma.task.create({
            data
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createTask = createTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_task = Number(req.params.id_task);
        yield db_1.prisma.task.delete({
            where: {
                id_task
            }
        });
        res.send({
            completed: true
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_task = Number(req.params.id_task);
        const description = req.params.description;
        const rows = yield db_1.prisma.task.update({
            where: {
                id_task
            },
            data: {
                description
            }
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.updateTask = updateTask;
const updateStateFkTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_task = Number(req.params.id_task);
        const fk_state = Number(req.params.fk_state);
        const rows = yield db_1.prisma.task.update({
            where: {
                id_task
            },
            data: {
                fk_state
            }
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.updateStateFkTask = updateStateFkTask;
const exchangeIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = new pg_1.Pool({
            connectionString: process.env.DB_CONNECTION
        });
        pool.connect();
        const originTask = Number(req.params.originTask);
        const destinationTask = Number(req.params.destinationTask);
        yield pool.query(`BEGIN;
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
        COMMIT;`);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.exchangeIds = exchangeIds;
//# sourceMappingURL=taskController.js.map