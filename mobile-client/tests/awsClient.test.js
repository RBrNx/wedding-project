import awsSigV4Client from '../utils/awsClient';

const fakeAccessKey = 'ASIAWXW4R5NWN4CD3436';
const fakeSecretKey = 'zfq4t13xhfKdIlNkWpjU/4pns/wtAQk3NnGwwgVb';
const fakeSessionToken =
  'IQoJb3JpZ2luX2VjEL7//////////wEaCWV1LXdlc3QtMiJHMEUCIQDEOqnNcrOnns53BX2eojFfnaiB24xHgOe0BLnABYPDUQIgLzpytsdGoIU2weguyiRXeLQlDxzAKpzdiTXJUEQCIg4qygUIRxABGgw0NjMyNDUyNzM5NjQiDFO7+VOqpR3coVY0JiqnBXvhFVAz5QVdqoAbbjPK4jheK1Qu/f2/pPaR/FnxyHgiCtxpPzQbZBNXwsHQbvtDPtS8FI2MxNYPhNjFCcgTa0jf/Ro7BHYNtyViBh6CCog4FfJQCAHibQ3ohhskgnf53ngPIp3DVVgmt1HcyIeJzBizh3/11t8EODgO5c6yc7H+lXkZDcdeYsohaLt7sf/Ept08D3BTuB9gOvUNOMv/MTh6Ut9pjB/Zap1jirwLVqZU1Ivt/Gu4wai/AMC+xeoo9EJ9pkQDQ24fY8WY4wYNW1WE2darCwwUOSH5uFDjCtnBayUWV8FcpRxCI3MCxXU6yqRn2BxDnIiGcYTrPDzI1Z0AzRgTcV8/wEUAIbe17Ya/PZHbl3sEwyiE38GAgr7DKjShSoPPPpIELDPtIe6l6EyxJMDby/sMMKGBUkyoRLJldzlX4rjhFAEEQxNCJhpyvVMFEQlciHFzMPescH5nkHujGkVDM1kTa9UvznM8cA6s5onFrArc1AGc4WQU2jfGxdS1b5nT0zrF3rhjONvK+gkyrlcf80GjrAYggrV68cNkoZqeWw9zLEhnlFAIQqDMvwUCc28fmjPAC9QOrlzXyxq1YVyTxa+t3ec1TVK84s2dZpwu3L9MpJzl5lLdppIqjQ+o4X/3qTj+zrxCb1/6Bg8FtilXgcnDkWPhxTXcAdDwEcuS4OS/9UICVJvF/jF6XCIk1Bq3cRhMCNtBa9YfC276Dn5W32VfiHc09BOJzUElJMzVb+f3GiKfEPT6hhPL5XECy8R0emIopfGfUxFqzVodlBmU0q+TRI72/GY+H0GvZvh5v38uULm6bYL0e/jwy8g4C8QBQTB7QMRwpnLLBMv1wfRrBXg0Ghp4pSiPnknol8QJur8ZoR0sTYGurhtJMhE2+iUko9Iwicy99wU6zQKt/SJW70ucMnXkPg5KKGNFH4MTiQDfgxcKfOVdiJUN7RxO3BOETgSGnndhgjRiM7tCvBsx8bz+meCHEoGwH3nSzT9gqXU3uveuhaMPS1UUDf+lYWLuQMYIRXNBgO4rXfx6pedbGV4Bv6Jb5cYZEYUp/E/ECBlFn1jltkezwjP0x6GH26duiejH5efCWzRKqTHJu+4vijwv3zskRwhBPp6BiuYJy5Hc6LmJWlRFFkqGVistKZR2nTq7qPnhPlMxOK5VQUqcehGafj+o3U+BWa/griKPHvvX9hVV1XLOFthlLF+cEJN1HKqIjJ7/U5BQsg3SBu/IKlxquVL4TAh7OCItXJ/v2n18Du6ZiEfvAqbxQ5CWJW089T8J/7Bbbl0C+ztAW63LsJUKhmC1suY6XXnzGHddKqJfTWrXGV3VxFSI4lFPpnvwEnpuWBKPeis=';
const endpoint = 'https://xiey9y60ej.execute-api.eu-west-2.amazonaws.com/dev/api';
const region = 'eu-west-2';

const awsClient = awsSigV4Client.newClient({
  accessKey: fakeAccessKey,
  secretKey: fakeSecretKey,
  sessionToken: fakeSessionToken,
  region,
  endpoint,
});

test('awsClient is returned with config', () => {
  expect(awsClient).toMatchObject({
    accessKey: fakeAccessKey,
    secretKey: fakeSecretKey,
    sessionToken: fakeSessionToken,
    region,
    endpoint: 'https://xiey9y60ej.execute-api.eu-west-2.amazonaws.com',
    pathComponent: '/dev/api',
  });
});

test('signed POST request has the right headers', () => {
  const requestHeaders = { accept: '*/*', 'content-type': 'application/json' };
  const dateAsString = new Date()
    .toISOString()
    .replace(/\.\d{3}Z$/, 'Z')
    .replace(/[:-]|\.\d{3}/g, '');

  const signedRequest = awsClient.signRequest({
    method: 'POST',
    path: '',
    headers: requestHeaders,
    body: 'test',
  });

  expect(signedRequest.headers).toMatchObject({
    Authorization: `AWS4-HMAC-SHA256 Credential=${fakeAccessKey}/${dateAsString.substr(0, 8)}/${region}/execute-api/aws4_request, SignedHeaders=accept;content-type;host;x-amz-date, Signature=${}`,
    'x-amz-date': dateAsString,
    'x-amz-security-token': fakeSessionToken,
    ...requestHeaders,
  });
});