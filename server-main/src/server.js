import createApplication from './app';
import config from './config/appConfig';
import database from './database';
import library from './helpers/libraries';

const startServer = async () => {
  try {
    const expressFramework = library.expressFramework();
    const application = await createApplication(expressFramework);
    const server = application
      .listen(config.server.port, async () => {
        await database.initializeDatabaseTables();
        console.log(`Server running at ${config.server.host}`);
      })
      .on('error', (error) => {
        console.error(error);
        process.exit(1);
      });

    process.on('unhandledRejection', (error) => {
      console.log(`Server error: ${error}`);
    });

    const signalInterruptionOrTermination = config.server.isInDevMode ? 'SIGINT' : 'SIGTERM';
    process.on(signalInterruptionOrTermination, () => {
      console.log('SIGINT received...');
      console.log('server is starting cleanup');
      server.close(() => {
        console.log('Server is now closed...');
        process.exit(0);
      });
    });
  } catch (error) {
    throw error;
  }
};

startServer();
