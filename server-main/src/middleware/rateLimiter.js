import config from '../config/appConfig';
import libraries from '../helpers/libraries';

const requestLimiter = libraries.rateLimit({
  windowMs: config.api.requests.retryWindow,
  max: config.api.requests.attemptsPerWindow,
  message: {
    error: {
      code: 'too_many_requests',
      message: 'Too many requests, please try again later.',
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default requestLimiter;
