import library from './helpers/libraries';
import path from 'path';
import {
  contentSecurityPolicyMiddleware,
  expectCTMiddleware,
  featurePolicyMiddleware,
  xFrameOptionMiddleware,
} from './middleware/securityHeaders';
import corsMiddleware from './middleware/cors';
import handleUnspecifiedRouteRequests from './middleware/handleUnidentifiedRoutes';
import requestLimiter from './middleware/rateLimiter';
import errorHandler from './middleware/errorHandler';
import asyncHandler from './middleware/asyncHandler';
import NoteFactory from './api/notes/factories/note';
import notesRoutes from './api/notes/routes';
import notesRepository from './api/notes/dataAccess';

export default async function createApplication(webserver) {
  // Security headers
  webserver.disable('x-powered-by');
  webserver.disable('server');
  webserver.disable('etag');
  webserver.disable('x-xss-protection');
  webserver.set('x-dns-prefetch-control', 'off');
  webserver.use(library.helmet());
  webserver.use(xFrameOptionMiddleware);
  webserver.use(contentSecurityPolicyMiddleware);
  webserver.use(expectCTMiddleware);
  webserver.use(featurePolicyMiddleware);
  webserver.use(corsMiddleware);
  webserver.set('trust proxy', true);

  // Other express middleware
  webserver.use(library.expressFramework.urlencoded({ extended: true }));
  webserver.use(library.expressFramework.json({ limit: '50mb' }));
  webserver.use(library.compression());
  webserver.use(library.cookieParser());
  webserver.use(library.expressFramework.static(path.join(process.cwd(), 'src', 'public')));
  webserver.set('views', path.join(process.cwd(), 'src', 'views'));
  const TEN_MEGABYTES_MAX_SIZE = 10 * 1024 * 1024;
  webserver.use(
    library.fileUploader({
      limits: {
        fileSize: TEN_MEGABYTES_MAX_SIZE,
      },
      abortOnLimit: true,
      tempFileDir: path.join(process.cwd(), 'src', 'uploads'),
    }),
  );

  webserver.use(requestLimiter);

  // API homepage
  webserver.get('/', (req, res) => {
    res.status(200).json({
      success: true,
      data: {
        message: 'BuddyAI - your docs and study group turbocharged by AI',
      },
    });
  });

  webserver.post('/v1/test/create-note', (req, res) => {
    const requestPayload = req.body;
    const note = NoteFactory.createNote(requestPayload);
    // const note = await notesRepository.createNote(requestPayload);
    return res.status(200).json({
      success: true,
      data: note,
    });
  });

  // All notes APIs are mounted here
  webserver.use('/v1', notesRoutes.router);

  // Handle requests to unspecified routes
  webserver.all('*', handleUnspecifiedRouteRequests);
  webserver.use(errorHandler);

  return webserver;
}
