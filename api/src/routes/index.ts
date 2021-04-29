import { Router } from 'express';
import hotels from './hotels.route';

const routes = Router();

routes.use('/hotels', hotels);

/**
 * @tutorial
 * Aquí se regitran las rutas de la api, y permite añadir nuevas rutas facilemente. Algunos ejejmplos:
 * routes.use('/auth', auth);
 * routes.use('/user', user);
 * routes.use('/booking', booking);
 */

export default routes;
