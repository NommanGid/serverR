import { MissingFieldError, ValidationError } from '../../../helpers/errors';

const validateNoteCreation = (user, content) => {
  if (!user || user.trim() === '') {
    throw new MissingFieldError('The user (i.e. email) associated with this note');
  }
  const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailIsValid = emailValidator.test(user);
  if (!emailIsValid) {
    throw new ValidationError('Invalid user or email');
  }
  if (!content) {
    throw new MissingFieldError('Note content required');
  }
};

export default validateNoteCreation;
