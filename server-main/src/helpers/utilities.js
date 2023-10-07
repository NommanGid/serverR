import library from './libraries';
import path from 'path';

export function generateToken({ lengthOfToken }) {
  const cryptoGeneratedString = library.crypto.randomBytes(22).toString('hex');
  const characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789${cryptoGeneratedString}`;
  let len = characters.length;
  var token = '';
  for (let i = 0; i < lengthOfToken; i++) {
    token += characters.charAt(Math.floor(Math.random() * len));
  }
  return token;
}

export function generateOtpCode() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const firstChar = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  let remainingDigits = '';
  for (let i = 0; i < 4; i++) {
    remainingDigits += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  const otpCode = `${firstChar}-${remainingDigits}`;
  return otpCode;
}

export async function loadSqlQueries({ sqlFolder }) {
  const filePath = path.join(process.cwd(), 'src', sqlFolder);
  const files = await library.fsPromises.readdir(filePath, { withFileTypes: true });
  const sqlFiles = files.filter((f) => f.isFile() && f.name.endsWith('.sql')).map((f) => f.name);
  const queries = {};
  for (const sqlFile of sqlFiles) {
    const query = await library.fsPromises.readFile(path.join(filePath, sqlFile), { encoding: 'utf-8' });
    queries[sqlFile.replace('.sql', '')] = query;
  }
  return queries;
}

export async function loadEmailTemplates({ templatesFolder }) {
  const filePath = path.join(process.cwd(), 'src', templatesFolder);
  const files = await library.fsPromises.readdir(filePath, { withFileTypes: true });
  const htmlFiles = files.filter((f) => f.isFile() && f.name.endsWith('.html')).map((f) => f.name);
  const templates = {};
  for (const htmlFile of htmlFiles) {
    const query = await library.fsPromises.readFile(path.join(filePath, htmlFile), { encoding: 'utf-8' });
    templates[htmlFile.replace('.html', '')] = query;
  }
  return templates;
}

export function replaceHtmlPlaceholdersWithDynamicValues({ html, context }) {
  if (!context || Object.keys(context).length === 0) {
    return html;
  }
  let result = html;
  for (const key in context) {
    const placeholder = `{{${key}}}`;
    const value = context[key];
    result = result.replace(new RegExp(placeholder, 'g'), value);
  }
  return result;
}

export async function sendEmail({ recipient, template, subject, dynamicValues }) {
  try {
    const emailTransporter = library.nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailAuthentication.user,
        pass: config.emailAuthentication.password,
      },
    });
    const emailTemplate = replaceHtmlPlaceholdersWithDynamicValues({
      html: template,
      context: dynamicValues,
    });
    const mail = {
      from: config.emailAuthentication.user,
      to: recipient,
      subject: subject,
      html: emailTemplate,
    };
    return await emailTransporter.sendMail(mail);
  } catch (error) {
    throw error;
  }
}

export function capitalize(word) {
  if (!word) return null;
  const words = word.split(' ');
  const capitalizeWords = words.map(capitalizeFirstLetters);
  function capitalizeFirstLetters(element) {
    return element.charAt(0).toLocaleUpperCase() + element.slice(1).toLowerCase();
  }
  const capitalizedWord = capitalizeWords.join(' ');
  return capitalizedWord;
}

export const sanitize = (string) => {
  if (!string) return null;
  const specialCharacters = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '!': '&#x21;',
  };
  const regex = /[&<>"'`=!/]/gi;
  return string.replace(regex, (match) => specialCharacters[match]);
};

export function generateHash(string) {
  try {
    if (!string) {
      return null;
    }
    const appIsInDevMode = config.server.isInDevMode;
    if (appIsInDevMode) {
      const salt = library.bcrypt.genSaltSync(10);
      const hashedstring = library.bcrypt.hashSync(string, salt);
      return hashedstring;
    }
    const salt = library.bcrypt.genSaltSync(13);
    const hashedstring = library.bcrypt.hashSync(string, salt);
    return hashedstring;
  } catch (error) {
    throw error;
  }
}

export async function compareHash(string, hashedString) {
  try {
    return await library.bcrypt.compare(string, hashedString);
  } catch (error) {
    throw error;
  }
}

export function standardizeDate(date) {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-CA');
}
