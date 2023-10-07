import { capitalize, generateHash, generateToken, sanitize } from '../../../helpers/utilities';

const createUser = ({ email, password, first_name, middle_name = null, last_name, univeristy = null }) => {
  validateUserCreation(email, password, first_name, last_name, univeristy);
  const sanitizedPassword = sanitize(password.trim());
  const hashedPassword = generateHash(sanitizedPassword);
  return Object.freeze({
    id: `user_${generateToken({ lengthOfToken: 32 })}`,
    email: email.trim().toLowerCase(),
    password: hashedPassword,
    firstName: capitalize(first_name.trim()),
    middleName: middle_name ?? null,
    lastName: capitalize(last_name.trim()),
    univeristy: capitalize(univeristy.trim()),
    createAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
};

const UserFactory = {
  createUser,
};

export default UserFactory;
