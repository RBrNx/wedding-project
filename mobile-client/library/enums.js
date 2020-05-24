import SunIcon from '../components/SVG/SunIcon';
import MoonIcon from '../components/SVG/MoonIcon';

const GuestResponseEnum = Object.freeze({
  AWAITING_RSVP: { text: 'Awaiting RSVP', color: '#2991cc' },
  ATTENDING: { text: 'Attending', color: '#04b84a' },
  NOT_ATTENDING: { text: 'Not Attending', color: '#966fd6' },
});

const InvitationTypeEnum = Object.freeze({ DAYTIME: { text: 'Daytime', icon: SunIcon }, EVENING: { text: 'Evening', icon: MoonIcon } });

export { GuestResponseEnum, InvitationTypeEnum };
