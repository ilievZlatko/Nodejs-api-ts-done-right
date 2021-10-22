import { Express, Request, Response } from 'express';

// Controllers
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from './controller/product.controller';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from './controller/session.controller';
import { createUserHandler } from './controller/user.controller';

// Schemas
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from './schema/product.schema';
import { createSessionSchema } from './schema/session.shcema';
import { createUserSchema } from './schema/user.schema';

// Middlewares
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';

// Routes
function routes(app: Express) {
	app.get('/healthcheck', (_: Request, res: Response) => res.sendStatus(200));

	app.post('/api/users', validateResource(createUserSchema), createUserHandler);

	app.post('/api/sessions', validateResource(createSessionSchema), createUserSessionHandler);

	app.get('/api/sessions', requireUser, getUserSessionsHandler);

	app.delete('/api/sessions', requireUser, deleteSessionHandler);

	app.post('/api/products', [requireUser, validateResource(createProductSchema)], createProductHandler);

	app.put('/api/products/:productId', [requireUser, validateResource(updateProductSchema)], updateProductHandler);

	app.get('/api/products/:productId', validateResource(getProductSchema), getProductHandler);

	app.delete('/api/products/:productId', [requireUser, validateResource(deleteProductSchema)], deleteProductHandler);
}

export default routes;
