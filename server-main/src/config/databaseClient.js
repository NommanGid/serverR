import library from '../helpers/libraries';
import config from './appConfig';

const databaseConnection = async () => {
  let pool = null;

  // Close database connection pool
  const closePool = async () => {
    try {
      await pool.end();
      pool = null;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  // Establish a new database connection
  const getConnection = async () => {
    try {
      if (pool) {
        return pool;
      }
      pool = library.mysql.createPool(config.mysql.developmentDb);
      pool.on('error', async (error) => {
        console.error(error.message);
        await closePool();
        return;
      });
      const connection = await pool.getConnection();
      connection.release();
      return connection;
    } catch (error) {
      pool = null;
      console.error(error.message);
      throw error;
    }
  };

  const query = async (sql, values) => {
    const connection = await getConnection();
    try {
      const [results] = await connection.query(sql, values);
      connection.release();
      return [results];
    } catch (error) {
      connection.release();
      throw error;
    }
  };

  return {
    query,
  };
};

const mysqlClient = {
  connectToDatabase: databaseConnection,
};

export default mysqlClient;
