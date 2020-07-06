import SHA256 from 'crypto-js/sha256';
import HmacSHA256 from 'crypto-js/hmac-sha256';

const AWS_SHA_256 = 'AWS4-HMAC-SHA256';
const AWS4_REQUEST = 'aws4_request';
const AWS4 = 'AWS4';
const X_AMZ_DATE = 'x-amz-date';
const X_AMZ_SECURITY_TOKEN = 'x-amz-security-token';
const HOST = 'host';
const AUTHORIZATION = 'Authorization';

export const hash = value => SHA256(value).toString();

export const hmac = (secret, value) => HmacSHA256(value, secret, { asBytes: true }).toString();

export const buildCanonicalUri = uri => encodeURI(uri);

export const buildCanonicalQueryString = queryParams => {
  let canonicalQueryString = '';
  const queryParamKeys = Object.keys(queryParams).sort();

  if (!queryParamKeys.length) return '';

  queryParamKeys.forEach(key => {
    canonicalQueryString += `${key}=${encodeURIComponent(queryParams[key])}&`;
  });

  return canonicalQueryString.slice(0, -1);
};

export const buildCanonicalHeaders = headers => {
  let canonicalHeaders = '';
  const headerKeys = Object.keys(headers).sort();

  headerKeys.forEach(key => {
    canonicalHeaders += `${key.toLowerCase()}:${headers[key]}\n`;
  });

  return canonicalHeaders;
};

export const buildCanonicalSignedHeaders = headers => {
  const headerKeys = Object.keys(headers).sort();

  return headerKeys.join(';');
};

export const buildCanonicalRequest = (method, path, queryParams, headers, payload) => {
  return `${method}\n${buildCanonicalUri(path)}\n${buildCanonicalQueryString(queryParams)}\n${buildCanonicalHeaders(
    headers,
  )}\n${buildCanonicalSignedHeaders(headers)}\n${hash(payload)}`;
};

export const buildCredentialScope = (datetime, region, service) => {
  return `${datetime.substr(0, 8)}/${region}/${service}/${AWS4_REQUEST}`;
};

export const buildStringToSign = (datetime, credentialScope, hashedCanonicalRequest) => {
  return `${AWS_SHA_256}\n${datetime}\n${credentialScope}\n${hashedCanonicalRequest}`;
};

export const calculateSigningKey = (secretKey, datetime, region, service) => {
  const hashedDate = hmac(AWS4 + secretKey, datetime);
  const hashedRegion = hmac(hashedDate, region);
  const hashedService = hmac(hashedRegion, service);
  const signingKey = hmac(hashedService, AWS4_REQUEST);

  return signingKey;
};

export const buildAuthorizationHeader = (accessKey, credentialScope, headers, signature) => {
  return `${AWS_SHA_256} Credential=${accessKey}/${credentialScope}, SignedHeaders=${buildCanonicalSignedHeaders(headers)}, Signature=${signature}`;
};

/* CREATE CLIENT */
const sigV4Client = {};
sigV4Client.newClient = config => {
  const extractHostname = url => {
    const { hostname } = new URL(url);

    return hostname;
  };

  const awsSigV4Client = {};
  if (config.accessKey === undefined || config.secretKey === undefined) {
    return awsSigV4Client;
  }
  awsSigV4Client.accessKey = config.accessKey;
  awsSigV4Client.secretKey = config.secretKey;
  awsSigV4Client.sessionToken = config.sessionToken;
  awsSigV4Client.serviceName = config.serviceName || 'execute-api';
  awsSigV4Client.region = config.region || 'us-east-1';
  awsSigV4Client.defaultAcceptType = config.defaultAcceptType || 'application/json';
  awsSigV4Client.defaultContentType = config.defaultContentType || 'application/json';

  const invokeUrl = config.endpoint;
  const endpoint = /(^https?:\/\/[^/]+)/g.exec(invokeUrl)[1];
  const pathComponent = invokeUrl.substring(endpoint.length);

  awsSigV4Client.endpoint = endpoint;
  awsSigV4Client.pathComponent = pathComponent;

  awsSigV4Client.signRequest = request => {
    const verb = request.method.toUpperCase();
    const path = awsSigV4Client.pathComponent + request.path;
    const queryParams = { ...request.queryParams };
    const headers = { ...request.headers };
    const { body } = request;

    // If the user has not specified an override for Content type the use default
    // if (headers['Content-Type'] === undefined) {
    //   headers['Content-Type'] = awsSigV4Client.defaultContentType;
    // }

    // If the user has not specified an override for Accept type the use default
    // if (headers['Accept'] === undefined) {
    //   headers['Accept'] = awsSigV4Client.defaultAcceptType;
    // }

    // let body = typeof body === 'string' ? `${request.body}` : { ...request.body };
    // override request body and set to empty when signing GET requests
    // if (request.body === undefined || verb === 'GET') {
    //   body = '';
    // } else {
    //   body = JSON.stringify(body);
    // }

    // If there is no body remove the content-type header so it is not
    // included in SigV4 calculation
    // if (body === '' || body === undefined || body === null) {
    //   delete headers['Content-Type'];
    // }

    const datetime = new Date()
      .toISOString()
      .replace(/\.\d{3}Z$/, 'Z')
      .replace(/[:-]|\.\d{3}/g, '');
    headers[X_AMZ_DATE] = datetime;
    headers[HOST] = extractHostname(awsSigV4Client.endpoint);

    const canonicalRequest = buildCanonicalRequest(verb, path, queryParams, headers, body);
    const hashedCanonicalRequest = hash(canonicalRequest);
    const credentialScope = buildCredentialScope(datetime, awsSigV4Client.region, awsSigV4Client.serviceName);
    const stringToSign = buildStringToSign(datetime, credentialScope, hashedCanonicalRequest);
    const signingKey = calculateSigningKey(awsSigV4Client.secretKey, datetime, awsSigV4Client.region, awsSigV4Client.serviceName);
    const signature = hmac(signingKey, stringToSign);
    headers[AUTHORIZATION] = buildAuthorizationHeader(awsSigV4Client.accessKey, credentialScope, headers, signature);
    if (awsSigV4Client.sessionToken !== undefined && awsSigV4Client.sessionToken !== '') {
      headers[X_AMZ_SECURITY_TOKEN] = awsSigV4Client.sessionToken;
    }
    delete headers[HOST];

    let url = awsSigV4Client.endpoint + path;
    const queryString = buildCanonicalQueryString(queryParams);
    if (queryString !== '') {
      url += `?${queryString}`;
    }

    // Need to re-attach Content-Type if it is not specified at this point
    // if (headers['Content-Type'] === undefined) {
    //   headers['Content-Type'] = awsSigV4Client.defaultContentType;
    // }

    // console.log({ canonicalRequest, stringToSign });
    // console.log({ path, myPath: request.path });

    return {
      headers,
      url,
    };
  };

  return awsSigV4Client;
};

export default sigV4Client;
