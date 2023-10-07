import mysqlClient from '../../../config/databaseClient';
import { loadSqlQueries } from '../../../helpers/utilities';

const usersTable = async () => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const schema = await loadSqlQueries({ sqlFolder: 'database/mysqlDb/schema' });
    await database.query(schema.user);
    console.log(`Table "users" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "users" already exists`);
      return;
    }
    throw error;
  }
};

export default usersTable;
