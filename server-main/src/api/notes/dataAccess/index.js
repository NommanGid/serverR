import mysqlClient from '../../../config/databaseClient';
import { AlreadyExistsError, InternalServerError } from '../../../helpers/errors';
import { loadSqlQueries } from '../../../helpers/utilities';

const findNote = async ({ user, noteId }) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/notes/queries' });
    const requestInput = [user, noteId];
    const [queryResult] = await database.query(queries.findNote, requestInput);
    const noteDoesNotExist = !queryResult.length || queryResult.length === 0;
    const note = queryResult[0];
    return noteDoesNotExist ? null : Object.freeze(note);
  } catch (error) {
    throw error;
  }
};

const createNote = async (note) => {
  try {
    const database = await mysqlClient.connectToDatabase();
    const queries = await loadSqlQueries({ sqlFolder: 'api/notes/queries' });
    const noteAlreadyExists = await findNote({ user: note.user, noteId: note.id });
    if (noteAlreadyExists) {
      throw new AlreadyExistsError('Note already exists');
    }
    const requestInput = Object.values(note);
    const [queryResult] = await database.query(queries.createNote, requestInput);
    const requestWasSuccessful = queryResult.affectedRows > 0;
    if (!requestWasSuccessful) {
      throw new InternalServerError('Your request could not be processed due to an unexpected error');
    }
    const newlyCreatedNote = await findNote({ user: note.user, noteId: note.id });
    return newlyCreatedNote;
  } catch (error) {
    throw error;
  }
};

const notesRepository = {
  createNote,
  findNote,
};

export default notesRepository;
