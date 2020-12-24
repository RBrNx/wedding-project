import { DateResolver, TimeResolver, DateTimeResolver, EmailAddressResolver, URLResolver } from 'graphql-scalars';

export default {
  Date: DateResolver,
  Time: TimeResolver,
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  URL: URLResolver,
};
