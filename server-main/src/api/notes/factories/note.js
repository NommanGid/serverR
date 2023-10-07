import { generateToken } from '../../../helpers/utilities';
import validateNoteCreation from '../validators/noteCreationValidation';

const createNote = (note) => {
  const { user, content } = note;
  validateNoteCreation(user, content);
  return Object.freeze({
    id: `note_${generateToken({ lengthOfToken: 32 })}`,
    user: user.trim().toLowerCase(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

const NoteFactory = {
  createNote,
};

export default NoteFactory;
