import library from '../../../helpers/libraries';
import asyncHandler from '../../../middleware/asyncHandler';
import notesController from '../controllers/noteController';

const router = library.expressFramework.Router();

/**
 * Get a specific note endpoint (GET /get-note)
 */
router.get('/get-note', asyncHandler(notesController.getNoteHandler));

/**
 * Create a new note endpoint (POST /create-note)
 */
router.post('/create-note', asyncHandler(notesController.createNoteHandler));

const notesRoutes = {
  router,
};

export default notesRoutes;
