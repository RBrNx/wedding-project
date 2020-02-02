const schema = `
  type Query {
    getAllSubmissions(): [Submission]!
  }

  type Submission {
    uniqueCode: String!
    guests: [Guest]!
  }

  type Guest {
    name: String!
    emailAddress: String!
    rsvp: Boolean!
  }

  schema {
    query: Query
  }
`;

export { schema };
