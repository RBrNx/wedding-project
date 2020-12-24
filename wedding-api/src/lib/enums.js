const QuestionType = Object.freeze({
  ATTENDANCE: 'ATTENDANCE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TEXT: 'TEXT',
});

const QuestionResponseType = Object.freeze({
  INDIVIDUAL: 'INDIVIDUAL',
  HOUSEHOLD: 'HOUSEHOLD',
});

const AttendanceStatus = Object.freeze({
  AWAITING_RSVP: 'AWAITING_RSVP',
  ATTENDING: 'ATTENDING',
  NOT_ATTENDING: 'NOT_ATTENDING',
});

const InvitationType = Object.freeze({
  DAYTIME: 'DAYTIME',
  EVENING: 'EVENING',
});

const UserRole = Object.freeze({
  GUEST: 'GUEST',
  ADMIN: 'ADMIN',
});

export { QuestionType, QuestionResponseType, AttendanceStatus, InvitationType, UserRole };
