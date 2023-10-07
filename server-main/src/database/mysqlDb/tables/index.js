import notesTable from './notesTable';
import usersTable from './usersTable';

const initializeSQLTables = async () => {
  await usersTable();
  await notesTable();
};

export default initializeSQLTables;
