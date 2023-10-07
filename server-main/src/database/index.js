import initializeSQLTables from './mysqlDb/tables';

const initializeDatabaseTables = async () => {
  await initializeSQLTables();
};

const database = {
  initializeDatabaseTables,
};

export default database;
