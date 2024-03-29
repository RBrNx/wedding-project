import SunIcon from 'library/components/SunIcon';
import MoonIcon from 'library/components/MoonIcon';

const GuestResponse = Object.freeze({
  AWAITING_RSVP: { text: 'Awaiting RSVP', color: '#2991cc' },
  ATTENDING: { text: 'Attending', color: '#04b84a' },
  NOT_ATTENDING: { text: 'Not Attending', color: '#966fd6' },
});

const QuestionType = Object.freeze({
  ATTENDANCE: { text: 'Attendance', color: '#AFF8DB', value: 'ATTENDANCE' },
  MULTIPLE_CHOICE: { text: 'Multiple Choice', color: '#FFABAB', value: 'MULTIPLE_CHOICE' },
  TEXT: { text: 'Text', color: '#B28DFF', value: 'TEXT' },
  SONG_REQUEST: { text: 'Song Request', color: '#ACE7FF', value: 'SONG_REQUEST' },
});

const InvitationType = Object.freeze({
  DAYTIME: { text: 'Daytime', color: '#BFFCC6', icon: SunIcon },
  EVENING: { text: 'Evening', color: '#F6A6FF', icon: MoonIcon },
});

const Theme = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
  AUTO: 'system',
});

const AlertType = Object.freeze({
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
});

const QuestionGuestType = Object.freeze({
  DAYTIME: { text: 'Daytime Only', color: '#BFFCC6', value: 'DAYTIME' },
  EVENING: { text: 'Evening Only', color: '#F6A6FF', value: 'EVENING' },
  BOTH: { text: 'All Guests', color: '#85E3FF', value: 'BOTH' },
});

export { GuestResponse, QuestionType, InvitationType, Theme, AlertType, QuestionGuestType };
