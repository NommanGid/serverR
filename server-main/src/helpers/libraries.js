import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import fetch from 'node-fetch';
import expressFramework from 'express';
import helmet from 'helmet';
import fileUploader from 'express-fileupload';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const library = {
  mysql,
  fetch,
  expressFramework,
  dotenv,
  helmet,
  fileUploader,
  compression,
  cookieParser,
  nodemailer,
  rateLimit,
  path,
  fsPromises,
  fs,
  crypto,
  bcrypt,
};

export default library;
