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
exports.getEnviromentByEmail = exports.updateEnviroment = exports.createEnviroment = void 0;
const db_1 = require("../../db");
const createEnviroment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { enviro_name, fk_member } = req.body;
        const rows = yield db_1.prisma.enviroment.create({
            data: {
                enviro_name,
                fk_member
            }
        });
        yield db_1.prisma.state.createMany({
            data: [
                { name: 'Sin estado', bkgColor: 'rgba(217, 217, 217, 0.43', fk_enviroment: rows.id_enviro },
                { name: 'Por hacer', bkgColor: 'rgba(255, 128, 128, 0.43', fk_enviroment: rows.id_enviro },
                { name: 'En progreso', bkgColor: 'rgba(255, 235, 128, 0.43', fk_enviroment: rows.id_enviro },
                { name: 'Completado', bkgColor: 'rgba(162, 255, 177, 0.39', fk_enviroment: rows.id_enviro },
            ]
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.createEnviroment = createEnviroment;
const updateEnviroment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_enviro = Number(req.params.id_enviro);
        const enviro_name = req.params.enviro_name;
        const rows = yield db_1.prisma.enviroment.update({
            where: {
                id_enviro
            },
            data: {
                enviro_name
            }
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.updateEnviroment = updateEnviroment;
const getEnviromentByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        const rows = yield db_1.prisma.enviroment.findMany({
            where: { member: {
                    email
                } }
        });
        res.send(rows);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getEnviromentByEmail = getEnviromentByEmail;
//# sourceMappingURL=enviromentController.js.map