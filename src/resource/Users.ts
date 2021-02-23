import jwt from 'jsonwebtoken';
import path from 'path';

import usersRepository from '../repository/Users';
import { UsersInstance } from '../models/Users';
import BaseResource from './BaseResource';

// utils
import copyFolderRecursiveSync from '../utils/copyFolderRecursiveSync';

import AirgramService from '../services/airgram';

export class UsersResource extends BaseResource<UsersInstance> {
  private VERIFY_TOKEN = process.env.VERIFY_TOKEN;

  private map: { [key: string]: AirgramService } = {};

  constructor() {
    super(usersRepository);
  }

  async createUserAndToken(data: { serviceId: string; webhookUrl: string }) {
    const { serviceId, webhookUrl } = data;

    await this.create({
      serviceId,
      webhookUrl,
    });

    const token = await this.generateToken({ serviceId });

    return { token };
  }

  async generateToken(data: { serviceId: string }) {
    const { serviceId } = data;

    return jwt.sign({ serviceId }, this.VERIFY_TOKEN);
  }

  async generatePath(data: {
    serviceId: string;
    appId?: number;
    appHash?: string;
  }) {
    const { serviceId } = data;

    await copyFolderRecursiveSync(
      path.resolve('src', 'tdlib', 'td'),
      path.resolve('src', 'tdlib', serviceId)
    );

    return true;
  }

  async synchronize() {
    const services = await this.findMany({});
    return Promise.all(
      services.map(async (service) => {
        this.map[service.serviceId] = new AirgramService(service.serviceId);
      })
    );
  }

  connect(data: { serviceId: string }) {
    const { serviceId } = data;

    if (!this.map[serviceId]) {
      this.map[serviceId] = new AirgramService(serviceId);

      return true;
    }

    return true;
  }

  async disconnect(data: { serviceId: string }) {
    const { serviceId } = data;

    return this.map[serviceId].disconnect({
      serviceId,
    });
  }

  async authenticate(data: { serviceId: string; phoneNumber: string }) {
    const { serviceId, phoneNumber } = data;

    return this.map[serviceId].authenticate({
      phoneNumber,
    });
  }

  async verifyCode(data: { serviceId: string; code: string }) {
    const { serviceId, code } = data;

    return this.map[serviceId].verifyCode({ code });
  }

  async getMe(data: { serviceId }) {
    const { serviceId } = data;

    return this.map[serviceId].getMe();
  }

  async getChats(data: { serviceId: string }) {
    const { serviceId } = data;

    return this.map[serviceId].getChats();
  }

  async getContacts(data: { serviceId: string }) {
    const { serviceId } = data;

    return this.map[serviceId].getContacts();
  }

  async createPrivateChat(data: { serviceId: string; userId: number }) {
    const { serviceId, userId } = data;

    return this.map[serviceId].createPrivateChat({
      userId,
    });
  }

  async sendMessageText(data: {
    serviceId: string;
    chatId: number;
    messageText: string;
  }) {
    const { serviceId, chatId, messageText } = data;

    return this.map[serviceId].sendMessageText({
      chatId,
      messageText,
    });
  }

  async sendMessagePhoto(data: {
    serviceId: string;
    chatId: number;
    photo: any;

    caption?: {
      text?: string;
    };
  }) {
    const { serviceId, chatId, photo, caption } = data;

    return this.map[serviceId].sendMessagePhoto({
      chatId,
      photo,
      caption,
    });
  }

  async sendMessageVideo(data: {
    serviceId: string;
    chatId: number;
    video: any;
    size: { width; height };
    caption: { text };
  }) {
    const {
      serviceId,
      chatId,
      video,
      size: { width, height },
      caption: { text },
    } = data;

    return this.map[serviceId].sendMessageVideo({
      chatId,
      video,
      size: {
        width,
        height,
      },
      caption: {
        text,
      },
    });
  }

  async sendMessageAudio(data: {
    serviceId: string;
    chatId: number;
    audio: any;
    duration: number;
    title: string;
    caption: {
      text: string;
    };
  }) {
    const {
      serviceId,
      chatId,
      audio,
      duration,
      title,
      caption: { text },
    } = data;

    return this.map[serviceId].sendMessageAudio({
      chatId,
      audio,
      duration,
      title,
      caption: {
        text,
      },
    });
  }

  async sendMessageDocument(data: {
    serviceId: string;
    chatId: number;
    document: any;
    caption: {
      text: string;
    };
  }) {
    const {
      serviceId,
      chatId,
      document,
      caption: { text },
    } = data;

    return this.map[serviceId].sendMessageDocument({
      chatId,
      document,
      caption: {
        text,
      },
    });
  }

  async getMessagesFromChatId(data: { serviceId: string; chatId: number }) {
    const { serviceId, chatId } = data;

    return this.map[serviceId].getMessagesFromChatId({
      chatId,
    });
  }
}

export default new UsersResource();
