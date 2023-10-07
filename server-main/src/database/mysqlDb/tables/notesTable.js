import mysqlClient from '../../../config/databaseClient';
import { loadSqlQueries } from '../../../helpers/utilities';

const notesTable = async () => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const schema = await loadSqlQueries({ sqlFolder: 'database/mysqlDb/schema' });
    await database.query(schema.note);
    console.log(`Table "notes" created`);
    return;
  } catch (error) {
    const tableAlreadyExists = error.code === 'ER_TABLE_EXISTS_ERROR';
    if (tableAlreadyExists) {
      console.log(`Table "notes" already exists`);
      return;
    }
    throw error;
  }
};

export default notesTable;
