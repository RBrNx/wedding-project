const hello = (args, context) => {
  return 'Your GraphQL API is now LIVE!🎈 ';
};

const getAllGuests = (args, context) => {
  return ['Hello', 'There'];
};

export default {
  Query: {
    hello,
    getAllGuests,
  },
};
