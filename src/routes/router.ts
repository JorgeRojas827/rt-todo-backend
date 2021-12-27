import { Router } from 'express';
import { createTask, getTasksByEnviromentAndState, getTasksByEnviroment } from './Task/taskController';
import { createEnviroment, getEnviromentByUser } from './Enviroment/enviromentController';
import { createMember, loginMember } from './Member/memberController';
import { getStates, updateState } from './State/stateController';

const router = Router();
// Tasks
router.get('/tasks/:enviro_name', getTasksByEnviroment);
// router.get('/tasks/:id_state', getTasksByState);
router.get('/tasks/:enviro_name/:id_state', getTasksByEnviromentAndState)
router.post('/tasks/create', createTask);

// Enviroments
router.post('/enviroments/create', createEnviroment);
router.get('/enviroments/:username', getEnviromentByUser);

// Member
router.post('/member/create', createMember);
router.get('/login/:email', loginMember);

// State
router.get('/state', getStates);
router.patch('/state/update/:id_state', updateState);

export default router;