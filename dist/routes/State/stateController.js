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
exports.getStatesByEnviroment = exports.updateState = void 0;
const db_1 = require("../../db");
const updateState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_state = Number(req.params.id_state);
        const rows = yield db_1.prisma.state.update({
            where: {
                id_state
            },
            data: {
                cantity: yield db_1.prisma.task.count({
                    where: {
                        state: {
                            id_state
                        }
                    }
                })
            }
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.updateState = updateState;
const getStatesByEnviroment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fk_enviro = Number(req.params.fk_enviro);
        const rows = yield db_1.prisma.state.findMany({
            where: {
                fk_enviroment: fk_enviro
            }
        });
        res.json(rows);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
exports.getStatesByEnviroment = getStatesByEnviroment;
//# sourceMappingURL=stateController.js.map