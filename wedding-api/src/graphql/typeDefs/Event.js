import { gql } from 'apollo-server-lambda';

const UnauthenticatedSchema = gql`
  type Event {
    _id: ID!
    name: String!
    date: Date!
  }

  type User {
    _id: ID!
    eventId: ID!
    firstName: String!
    lastName: String!
    email: EmailAddress
  }

  type CreateEventPayload {
    event: Event!
    admin: User!
  }

  type CreateEventResponse implements MutationResponse {
    success: Boolean!
    message: String
    payload: CreateEventPayload
  }

  input CreateAdminInput {
    firstName: String!
    lastName: String!
    email: EmailAddress!
    password: String!
    eventId: String
  }

  input CreateEventInput {
    name: String!
    date: Date!
    admin: CreateAdminInput!
  }

  extend type Mutation {
    createEvent(input: CreateEventInput!): CreateEventResponse
  }
`;

const AuthenticatedSchema = gql`
  type Address {
    town: String!
    country: String!
    postcode: String!
  }

  type Location {
    latitude: Float!
    longitude: Float!
  }

  type Venue {
    name: String!
    address: Address!
    email: EmailAddress!
    phone: PhoneNumber!
    location: Location!
    image: URL
  }

  type ScheduleItem {
    time: LocalTime!
    name: String!
  }

  type MenuChoice {
    name: String!
    description: String!
  }

  type MenuCourse {
    name: String!
    choices: [MenuChoice]!
    info: String
  }

  type Event {
    _id: ID!
    name: String!
    date: Date!
    venue: Venue
    schedule: [ScheduleItem]
    menu: [MenuCourse]
  }

  type AddVenueDetailsResponse implements MutationResponse {
    success: Boolean!
    message: String
    payload: Event
  }

  input AddressInput {
    town: String!
    country: String!
    postcode: String!
  }

  input LocationInput {
    latitude: Float!
    longitude: Float!
  }

  input AddVenueDetailsInput {
    name: String
    address: AddressInput
    email: EmailAddress
    phone: PhoneNumber
    location: LocationInput
  }

  extend type Query {
    getEventInfo: Event
  }
  extend type Mutation {
    addVenueDetails(input: AddVenueDetailsInput!): AddVenueDetailsResponse
  }
`;

export default { UnauthenticatedSchema, AuthenticatedSchema };
