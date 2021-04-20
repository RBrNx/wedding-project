import SunIcon from 'library/components/SunIcon';
import MoonIcon from 'library/components/MoonIcon';

const GuestResponse = Object.freeze({
  AWAITING_RSVP: { text: 'Awaiting RSVP', color: '#2991cc' },
  ATTENDING: { text: 'Attending', color: '#04b84a' },
  NOT_ATTENDING: { text: 'Not Attending', color: '#966fd6' },
});

const InvitationType = Object.freeze({
  DAYTIME: { text: 'Daytime', icon: SunIcon },
  EVENING: { text: 'Evening', icon: MoonIcon },
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

export { GuestResponse, InvitationType, Theme, AlertType };
