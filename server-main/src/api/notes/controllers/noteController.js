import NoteService from '../services/noteService';

const getNoteHandler = async (req, res) => {
  const { user, note_id } = req.query;
  const note = await NoteService.getNote(user, note_id);
  return res.status(200).json({
    success: true,
    data: note,
  });
};

const createNoteHandler = async (req, res) => {
  const requestPayload = req.body;
  const newlyCreatedNote = await NoteService.createNote(requestPayload);
  return res.status(200).json({
    success: true,
    data: {
      data: newlyCreatedNote,
    },
  });
};

const notesController = {
  getNoteHandler,
  createNoteHandler,
};

export default notesController;
