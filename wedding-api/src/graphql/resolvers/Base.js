import {
  DateResolver,
  TimeResolver,
  DateTimeResolver,
  EmailAddressResolver,
  URLResolver,
  PhoneNumberResolver,
} from 'graphql-scalars';

export default {
  Date: DateResolver,
  Time: TimeResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  PhoneNumber: PhoneNumberResolver,
  URL: URLResolver,
  MutationResponse: {
    __resolveType() {
      return null;
    },
  },
};
