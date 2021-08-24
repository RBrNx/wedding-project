import {
  DateResolver,
  TimeResolver,
  DateTimeResolver,
  EmailAddressResolver,
  URLResolver,
  PhoneNumberResolver,
  LocalTimeResolver,
} from 'graphql-scalars';

export default {
  Date: DateResolver,
  Time: TimeResolver,
  LocalTime: LocalTimeResolver,
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
