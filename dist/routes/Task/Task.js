"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("./taskController");
const router = (0, express_1.Router)();
router.get('/tasks', taskController_1.getTasks);
exports.default = router;
//# sourceMappingURL=Task.js.map