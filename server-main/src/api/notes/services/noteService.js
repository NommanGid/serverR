import { BadRequestError } from '../../../helpers/errors';
import notesRepository from '../dataAccess';
import NoteFactory from '../factories/note';

const getNote = async (user, noteId) => {
  try {
    if (!user) {
      throw new BadRequestError('Email address is required in order to access note');
    }
    if (!noteId) {
      throw new BadRequestError(`Please provide the id of the note you're trying to access`);
    }
    const note = await notesRepository.findNote({ user, noteId });
    return note;
  } catch (error) {
    throw error;
  }
};

const createNote = async (note) => {
  try {
    const noteCreatedByFactory = NoteFactory.createNote(note);
    const newlyCreatedNote = await notesRepository.createNote(noteCreatedByFactory);
    return newlyCreatedNote;
  } catch (error) {
    throw error;
  }
};

const NoteService = {
  getNote,
  createNote,
};

export default NoteService;
