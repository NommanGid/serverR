import config from '../config/appConfig';
import { ForbiddenError } from '../helpers/errors';

const corsMiddleware = (req, res, next) => {
  if (config.server.isInDevMode) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, User-Agent, Content-Type, Accept, Authorization, If-Modified-Since, Cache-Control, Referer',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return next();
  }
  const allowedOrigins = ['https://www.credet.app', ,];
  const origin = req.headers.origin;
  if (!allowedOrigins.includes(origin)) {
    return next(new ForbiddenError('Request denied'));
  }
  res.setHeader('Access-Control-Allow-Headers', server.allowedHeaders.join(', '));
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', origin);
  next();
};

export default corsMiddleware;
