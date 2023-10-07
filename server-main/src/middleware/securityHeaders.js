import { generateToken } from '../helpers/utilities';

export const xFrameOptionMiddleware = (req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
};

export const expectCTMiddleware = (req, res, next) => {
  const TWENTY_FOUR_HRS = 86400;
  res.setHeader('Expect-CT', 'enforce', `max-age=${TWENTY_FOUR_HRS}`);
  next();
};

export const contentSecurityPolicyMiddleware = (req, res, next) => {
  const nonce = generateToken({ lengthOfToken: 130 });
  res.setHeader('Content-Security-Policy', `script-src 'self' 'nonce-${nonce}'`);
  res.locals.nonce = nonce;
  next();
};

export const featurePolicyMiddleware = (req, res, next) => {
  const unallowedFeatures = "accelerometer 'none'; microphone 'none'; usb 'none';";
  res.setHeader('Feature-Policy', unallowedFeatures);
  next();
};
