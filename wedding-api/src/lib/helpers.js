import crypto from 'crypto';
import { connectToDatabase } from './database';
const mapEnumValues = enumObj => {
  return Object.keys(enumObj).map(key => key);
};

const stripNonAlphaChars = string => {
  // Strip Apostrophies, Spaces and Hypenss
  return string.replace(/\s+/g, '').replace(/'+/g, '').replace(/-+/g, '');
};

const generatePassword = (
  length = 15,
  wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$',
) => {
  return Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map(x => wishlist[x % wishlist.length])
    .join('');
};

const generateTemporaryCredentials = async ({ firstName, lastName }) => {
  const db = await connectToDatabase();
  const TempLoginDetailsModel = db.model('TempLoginDetails');

  const forename = stripNonAlphaChars(firstName);
  const surname = stripNonAlphaChars(lastName);
  let username = `${forename}${surname}`.toLowerCase();
  const password = generatePassword();

  const usernameCount = await TempLoginDetailsModel.countDocuments({ username: { $regex: `^${username}` } });
  if (usernameCount > 0) username += usernameCount;

  return {
    username,
    password,
  };
};

export { mapEnumValues, stripNonAlphaChars, generateTemporaryCredentials };
