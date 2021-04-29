import cors from 'cors';
import helmet from 'helmet';
import { Application, NextFunction, Request, Response, json, urlencoded } from 'express';
import { ValidationError } from 'class-validator';
import { isCelebrateError } from 'celebrate';
import { ErrorHandler, handleError } from '../helpers/ErrorHandler';
import routes from '../routes';
import Logger from '../helpers/Logger';
import config from '../config';

export default (app: Application): void => {
	// Health Check endpoints
	app.get('/status', (req, res) => {
		res.status(200).end();
	});
	app.head('/status', (req, res) => {
		res.status(200).end();
	});
	app.enable('trust proxy');

	// Enable Cross Origin Resource Sharing to all origins by default
	app.use(cors());

	// Use Helmet to secure the app by setting various HTTP headers
	app.use(helmet());
	app.disable('x-powered-by');

	// Middleware that transforms the raw string of req.body into json
	app.use(json());

	// parse urlencoded request body
	app.use(urlencoded({ extended: true }));

	// Load API routes
	app.use(`/${config.endpointPrefix}`, routes);

	/// Error handlers
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		//error de celebrate, formato de datos entrantes
		if (isCelebrateError(err)) {
			Logger.error('Error: %o', err);
			res.status(400).json({ error: 'Invalid data' }).end();
		} else if (err instanceof Array && err[0] instanceof ValidationError) {
			const messageArr: Array<string> = [];
			let e: ValidationError;
			for (e of err) {
				Object.values(e.constraints).map((msg: string) => {
					messageArr.push(msg);
				});
			}
			Logger.error('Error: %o', messageArr);
			res.status(400).json({ errors: messageArr }).end();
		} else {
			next(err);
		}
	});

	app.use((err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		Logger.error('Error: %o', err.message);
		handleError(err, res);
	});
};
