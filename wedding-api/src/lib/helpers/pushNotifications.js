import { Expo } from 'expo-server-sdk';
import { connectToDatabase } from '../database';
import { UserRole } from '../enums';

const expo = new Expo();

const sendPushNotification = async (eventId, messages) => {
  const db = await connectToDatabase();
  const PushNotificationModel = db.model('PushNotification');

  const chunks = expo.chunkPushNotifications(messages);
  const ticketChunks = await Promise.all(chunks.map(chunk => expo.sendPushNotificationsAsync(chunk)));
  const tickets = ticketChunks.flat();

  const [firstMessage] = messages;

  const notification = new PushNotificationModel({
    eventId,
    recipients: messages.map(message => message.to),
    title: firstMessage.title,
    body: firstMessage.body,
    ...(firstMessage.data && { data: JSON.stringify(firstMessage.data) }),
    receipts: tickets,
  });

  await notification.save();
};

const sendNotificationToAdmins = async (eventId, notification = {}) => {
  const db = await connectToDatabase();
  const UserModel = db.model('User');

  const admins = await UserModel.find({ eventId, role: UserRole.ADMIN, pushNotificationToken: { $ne: null } });
  const pushTokens = admins.map(admin => admin.pushNotificationToken);

  const { title, body, data } = notification;

  // Create the messages that you want to send to clients
  const messages = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const pushToken of pushTokens) {
    // Check that all push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      // eslint-disable-next-line no-continue
      continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
      to: pushToken,
      title,
      body,
      data,
    });
  }

  await sendPushNotification(eventId, messages);
};

export { sendNotificationToAdmins };
