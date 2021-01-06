import crypto from 'crypto';
import AWS from 'aws-sdk';
import { connectToDatabase } from '../database';
import { stripNonAlphaChars } from '../helpers';

const { COGNITO_USER_POOL_ID, COGNITO_APP_CLIENT_ID } = process.env;

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

const createCognitoUser = async ({ userId, username, password }) => {
  const cognitoProvider = new AWS.CognitoIdentityServiceProvider();
  const { User: user } = await cognitoProvider
    .adminCreateUser({
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: userId,
      UserAttributes: [
        {
          Name: 'preferred_username',
          Value: username,
        },
      ],
      MessageAction: 'SUPPRESS',
    })
    .promise();

  if (!user) return null;

  await cognitoProvider
    .adminSetUserPassword({
      UserPoolId: COGNITO_USER_POOL_ID,
      Username: userId,
      Password: password,
      Permanent: true,
    })
    .promise();

  return user;
};

const createCognitoAdminUser = async ({ userId, email, password }) => {
  const cognitoProvider = new AWS.CognitoIdentityServiceProvider();
  const user = await cognitoProvider
    .signUp({
      ClientId: COGNITO_APP_CLIENT_ID,
      Username: userId,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    })
    .promise();

  return user;
};

const getUserFromRequest = async requestContext => {
  const authProviderRegex = new RegExp(/([\w-]+_[0-9a-zA-Z]+)|([0-9a-zA-Z-]{36})/g);

  const { cognitoAuthenticationProvider } = requestContext.identity;
  const [, , cognitoUserId] = cognitoAuthenticationProvider.match(authProviderRegex);

  const db = await connectToDatabase();
  const UserModel = db.model('User');

  const user = await UserModel.findOne({ cognitoUserId }).exec();

  return user;
};

export { generateTemporaryCredentials, createCognitoUser, createCognitoAdminUser, getUserFromRequest };
