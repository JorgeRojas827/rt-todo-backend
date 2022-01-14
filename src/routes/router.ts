import { Router } from 'express';
import { createTask, getTasksByEnviromentAndState, getTasksByEnviroment, exchangeIds, deleteTask, updateTask, updateStateFkTask } from './Task/taskController';
import { createEnviroment, getEnviromentByEmail, updateEnviroment } from './Enviroment/enviromentController';
import { createMember, loginMember } from './Member/memberController';
import { getStatesByEnviroment, updateState } from './State/stateController';

const router = Router();
// Tasks
router.get('/tasks/:id_enviro', getTasksByEnviroment);
router.get('/tasks/:enviro_name/:id_state', getTasksByEnviromentAndState);
router.patch('/tasks/update/:id_task/:description', updateTask);
router.patch('/tasks/updateIds/:originTask/:destinationTask', exchangeIds);
router.patch('/tasks/updateStateFk/:id_task/:fk_state', updateStateFkTask);
router.delete('/tasks/delete/:id_task', deleteTask);
router.post('/tasks/create', createTask);

// Enviroments
router.post('/enviroments/create', createEnviroment);
router.get('/enviroments/:email', getEnviromentByEmail);
router.patch('/enviroments/update/:id_enviro/:enviro_name', updateEnviroment);

// Member
router.post('/member/create', createMember);
router.get('/login/:email', loginMember);

// State
router.get('/state/:fk_enviro', getStatesByEnviroment);
router.patch('/state/update/:id_state', updateState);

export default router;