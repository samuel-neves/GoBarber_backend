import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();

const sesionsController = new SessionsController();

sessionsRouter.post('/', sesionsController.create);

export default sessionsRouter;
