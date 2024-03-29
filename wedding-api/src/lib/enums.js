const QuestionType = Object.freeze({
  ATTENDANCE: 'ATTENDANCE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  TEXT: 'TEXT',
  SONG_REQUEST: 'SONG_REQUEST',
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

const QuestionGuestType = Object.freeze({
  DAYTIME: 'DAYTIME',
  EVENING: 'EVENING',
  BOTH: 'BOTH',
});

export { QuestionType, QuestionResponseType, AttendanceStatus, InvitationType, UserRole, QuestionGuestType };
