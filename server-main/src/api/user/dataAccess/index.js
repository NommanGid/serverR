import mysqlClient from '../../../config/databaseClient';
import { AlreadyExistsError, InternalServerError } from '../../../helpers/errors';
import { loadSqlQueries } from '../../../helpers/utilities';

const findUser = async (email) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/notes/queries' });
    const requestInput = [email];
    const [queryResult] = await database.query(queries.findUser, requestInput);
    const userDoesNotExist = !queryResult.length || queryResult.length === 0;
    const user = queryResult[0];
    return userDoesNotExist ? null : Object.freeze(user);
  } catch (error) {
    throw error;
  }
};

const createUser = async (user) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/notes/queries' });
    const userAlreadyExists = await findNote(user.email);
    if (userAlreadyExists) {
      throw new AlreadyExistsError('Note already exists');
    }
    const requestInput = Object.values;
    const [queryResult] = await database.query(queries.createNote, requestInput);
    const requestWasSuccessful = queryResult.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Your request could not be processed due to an unexpected error');
    }
    const newlyCreatedUser = await findNote(user.email);
    return Object.freeze(newlyCreatedUser);
  } catch (error) {}
};

const userRepository = {
  createUser,
  findUser,
};

export default userRepository;
