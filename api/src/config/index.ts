import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config();

export default {
	port: process.env.PORT || 8000,
	logs: {
		level: process.env.LOG_LEVEL,
	},
	endpointPrefix: process.env.ENDPOINT_PREFIX || 'api',
};
