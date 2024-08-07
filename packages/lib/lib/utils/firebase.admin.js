import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

// Firebase 설정
const app = initializeApp({
  credential: applicationDefault(),
});

// FCM(Firebase Cloud Messaging) 생성
const fcm = getMessaging(app);

export const sendMessage = async (message) => {
  try {
    const response = await fcm.send(message);
    console.log(`Successfully sent message: ${response}`);
  } catch (error) {
    console.error(`Error sending message: ${error}`);
  }
};

export const sendMessages = async (messages) => {
  try {
    const response = await fcm.sendEach(messages);
    console.log(`Successfully sent message: ${response}`);
  } catch (error) {
    console.error(`Error sending message: ${error}`);
  }
};
