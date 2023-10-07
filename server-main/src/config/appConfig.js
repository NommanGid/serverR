import library from '../helpers/libraries';
library.dotenv.config();

const ONE_DAY = 24 * 60 * 60 * 1000;
const THIRTY_SECONDS = 30 * 1000;
const TEN_SECONDS = 10;
const THREE_MINUTES = 180 * 1000;
const FIVE_SECONDS = 5 * 1000;
const FIFTEEN_MINUTES = Date.now() + 15 * 60 * 1000;

const config = {
  mysql: {
    developmentDb: {
      host: process.env.MYSQL_DB_URL,
      user: process.env.MYSQL_DB_USER,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      waitForConnections: true,
      connectionLimit: process.env.APP_ENV === 'development' ? 3 : process.env.MYSQL_DB_POOL_LIMIT,
      queueLimit: 0,
    },
    productionDb: process.env.DATABASE_URL,
  },

  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    environment: process.env.APP_ENV,
    isInDevMode: process.env.APP_ENV === 'development',
  },
  oAuth: {
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    passwordResetLinkSecret: process.env.JWT_PASSWORD_RESET_SECRET,
    accessTokenExpiration: '30s', // 15m
    refreshTokenExpiration: '5m', // 90d or 3 months
    cookieMaxAge: TEN_SECONDS,
  },
  encryption: {
    secret: process.env.DATA_ENCRYPTION_SECRET,
  },
  authentication: {
    loginRetryWindow: THREE_MINUTES,
    loginAttemptsPerWindow: 5,
    verificationCodeExpiration: FIFTEEN_MINUTES,
  },
  emailAuthentication: {
    user: process.env.EMAIL_AUTHENTICATION_USER,
    password: process.env.EMAIL_AUTHENTICATION_PASSWORD,
  },
  sms: {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTHENTICATION_TOKEN,
      sender: process.env.TWILIO_SENDING_PHONE_NUMBER,
    },
  },
  api: {
    version: process.env.API_VERSION,
    requests: {
      retryWindow: FIVE_SECONDS,
      attemptsPerWindow: 5,
    },
  },
  ipInfo: {
    accessToken: process.env.IPINFO_ACCESS_TOKEN,
  },
};

export default config;
