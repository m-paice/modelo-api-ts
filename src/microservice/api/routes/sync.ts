import { Router } from 'express';

import usersResource from '../../../resource/Users';

// middleware
import auth, { IRequest } from '../../../middleware/auth';

import { promiseHandler } from '../../../utils/routing';

const controller = {
  generatePath: promiseHandler((req: IRequest) => {
    const { serviceId } = req;

    return usersResource.generatePath({ serviceId });
  }),

  connect: promiseHandler((req: IRequest) => {
    const { serviceId } = req;

    return usersResource.connect({ serviceId });
  }),

  disconnect: promiseHandler((req: IRequest) => {
    const { serviceId } = req;

    return usersResource.disconnect({ serviceId });
  }),

  authenticate: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { phoneNumber } = req.body;

    return usersResource.authenticate({ serviceId, phoneNumber });
  }),

  verifyCode: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { code } = req.body;

    return usersResource.verifyCode({ serviceId, code });
  }),

  getMe: promiseHandler((req: IRequest) => {
    const { serviceId } = req;

    return usersResource.getMe({ serviceId });
  }),

  getChats: promiseHandler((req: IRequest) => {
    const { serviceId } = req;

    return usersResource.getChats({ serviceId });
  }),

  getContacts: promiseHandler((req: IRequest) => {
    const { serviceId } = req;

    return usersResource.getContacts({ serviceId });
  }),

  createPrivateChat: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { userId } = req.body;

    return usersResource.createPrivateChat({ serviceId, userId });
  }),

  sendMessageText: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { chatId, messageText } = req.body;

    return usersResource.sendMessageText({ serviceId, chatId, messageText });
  }),

  sendMessagePhoto: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { chatId, photo, caption } = req.body;

    return usersResource.sendMessagePhoto({
      serviceId,
      chatId,
      photo,
      caption,
    });
  }),

  sendMessageVideo: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { chatId, video, size, caption } = req.body;

    return usersResource.sendMessageVideo({
      serviceId,
      chatId,
      video,
      size,
      caption,
    });
  }),

  sendMessageAudio: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { chatId, audio, duration, title, caption } = req.body;

    return usersResource.sendMessageAudio({
      serviceId,
      chatId,
      audio,
      duration,
      title,
      caption,
    });
  }),

  sendMessageDocument: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { chatId, document, caption } = req.body;

    return usersResource.sendMessageDocument({
      serviceId,
      chatId,
      document,
      caption,
    });
  }),

  getMessagesFromChatId: promiseHandler((req: IRequest) => {
    const { serviceId } = req;
    const { chatId } = req.body;

    return usersResource.getMessagesFromChatId({ serviceId, chatId });
  }),
};

const router = Router();

router.post('/generate-path', auth, controller.generatePath);
router.post('/connect', auth, controller.connect);
router.post('/disconnect', auth, controller.disconnect);
router.post('/', auth, controller.authenticate);
router.post('/verify-code', auth, controller.verifyCode);
router.post('/get-me', auth, controller.getMe);
router.post('/get-chats', auth, controller.getChats);
router.post('/get-contacts', auth, controller.getContacts);
router.post('/create-private-chat', auth, controller.createPrivateChat);
router.post('/send-message-text', auth, controller.sendMessageText);
router.post('/send-message-photo', auth, controller.sendMessagePhoto);
router.post('/send-message-video', auth, controller.sendMessageVideo);
router.post('/send-message-audio', auth, controller.sendMessageAudio);
router.post('/send-message-document', auth, controller.sendMessageDocument);
router.post(
  '/get-message-from-chatId/:chatId',
  auth,
  controller.getMessagesFromChatId
);

export default router;
