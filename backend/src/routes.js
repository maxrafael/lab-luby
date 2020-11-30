import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import FollowerController from './app/controllers/FollowerController';
import RepositoryController from './app/controllers/RepositoryController';
import StarController from './app/controllers/StarController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

/* Login route, criação da sessão */
routes.post('/sessions', SessionController.store);

/* Middleware de autenticação */
routes.use(authMiddleware);

/* Avatar do usuário */
routes.post('/files', upload.single('file'), FileController.store);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/users/:id/follow', FollowerController.store);
routes.delete('/users/:id/follow', FollowerController.delete);

routes.get('/repositories', RepositoryController.index);
routes.post('/repositories', RepositoryController.store);
routes.delete('/repositories/:id', RepositoryController.delete);
routes.put('/repositories/:id', RepositoryController.update);

routes.post('/repositories/:id/star', StarController.store);
routes.delete('/repositories/:id/star', StarController.delete);

export default routes;
