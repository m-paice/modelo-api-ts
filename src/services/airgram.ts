import { Airgram } from 'airgram';
import path from 'path';

class AirgramService {
  private APP_ID = 2777355;

  private APP_HASH = '29b2b381fe97b06648a7cd6ebd69a13b';

  private airgram: Airgram = null;

  constructor(serviceId: string) {
    this.connect({ serviceId });

    this.webhookGetMessages();

    // this.disconnect({ serviceId });
  }

  connect(data: { serviceId: string }) {
    const { serviceId } = data;

    // TODO: permitir appId e appHash ser modificado

    const airgram = new Airgram({
      apiId: this.APP_ID,
      apiHash: this.APP_HASH,
      command: path.resolve('src', 'tdlib', serviceId, 'build', 'libtdjson.so'),
      logVerbosityLevel: 2,
    });

    // TODO:  verificar se existe um numero sincronizado na instancia atual

    this.airgram = airgram;

    return airgram;
  }

  async disconnect(data: { serviceId: string }) {
    const { serviceId } = data;

    await this.airgram.api.logOut();

    return this.connect({
      serviceId,
    });
  }

  async authenticate(data: { phoneNumber: string }) {
    const { phoneNumber } = data;

    // TODO: verificar quando o numero não é valido
    return this.airgram.api.setAuthenticationPhoneNumber({
      phoneNumber,
      settings: {
        _: 'phoneNumberAuthenticationSettings',
        isCurrentPhoneNumber: true,
      },
    });
  }

  async verifyCode(data: { code: string }) {
    const { code } = data;

    // TODO: verificar quando o codigo não é valido
    return this.airgram.api.checkAuthenticationCode({
      code,
    });
  }

  async getMe() {
    const { response } = await this.airgram.api.getMe();

    return response;
  }

  async getChats() {
    const data: any = await this.airgram.api.getChats({
      chatList: {
        _: 'chatListMain',
      },
      offsetOrder: '9223372036854775807',
      limit: 50,
    });

    const response = await Promise.all(
      data.response.chatIds.map(async (chatId) => {
        const chat: any = await this.airgram.api.getChat({
          chatId,
        });

        const user: any = await this.airgram.api.getUser({
          userId: chat.response.lastMessage.sender.userId,
        });

        return {
          id: chat.response.id,
          title: chat.response.title,
          unreadCount: chat.response.unreadCount,
          lastMessage: {
            user: {
              id: chat.response.lastMessage.sender.userId,
              firstName: user.response.firstName,
              lastName: user.response.lastName,
              username: user.response.username,
              phoneNumber: user.response.phoneNumber,
              status: {
                type: user.response.status._,
                wasOnline: user.response.status.wasOnline,
              },
            },
            content: chat.response.lastMessage.content,
          },
        };
      })
    );

    return response;
  }

  async getContacts() {
    const data: any = await this.airgram.api.getContacts();

    const response = await Promise.all(
      data.response.userIds.map(async (userId) => {
        const user = await this.airgram.api.getUser({
          userId,
        });

        const profilePhoto = await this.airgram.api.getUserProfilePhotos({
          userId,
          limit: 1,
        });

        return {
          user: user.response,
          profilePhoto: profilePhoto.response,
        };
      })
    );

    return response;
  }

  async createPrivateChat(data: { userId: number }) {
    const { userId } = data;

    const { response } = await this.airgram.api.createPrivateChat({
      userId,
    });

    return response;
  }

  async sendMessageText(data: { chatId: number; messageText: string }) {
    const { chatId, messageText } = data;

    const { response } = await this.airgram.api.sendMessage({
      chatId,
      inputMessageContent: {
        _: 'inputMessageText',
        text: {
          _: 'formattedText',
          text: messageText,
        },
      },
    });

    return response;
  }

  async sendMessagePhoto(data: {
    chatId: number;
    photo: any;
    caption?: {
      text?: string;
    };
  }) {
    const { chatId, photo, caption } = data;

    const { response } = await this.airgram.api.sendMessage({
      chatId,
      inputMessageContent: {
        _: 'inputMessagePhoto',
        photo: {
          _: 'inputFileLocal',
          path: photo.path,
        },
        ...(caption.text && {
          caption: {
            _: 'formattedText',
            text: caption.text,
          },
        }),
      },
    });

    return response;
  }

  async sendMessageVideo(data: {
    chatId: number;
    video: any;
    size: { width; height };
    caption: { text };
  }) {
    const {
      chatId,
      video,
      size: { width, height },
      caption: { text },
    } = data;

    const { response } = await this.airgram.api.sendMessage({
      chatId,
      inputMessageContent: {
        _: 'inputMessageVideo',
        width,
        height,
        video: {
          _: 'inputFileLocal',
          path: video.path,
        },
        caption: {
          _: 'formattedText',
          text,
        },
      },
    });

    return response;
  }

  async sendMessageAudio(data: {
    chatId: number;
    audio: any;
    duration: number;
    title: string;
    caption: {
      text: string;
    };
  }) {
    const {
      chatId,
      audio,
      duration,
      title,
      caption: { text },
    } = data;

    const { response } = await this.airgram.api.sendMessage({
      chatId,
      inputMessageContent: {
        _: 'inputMessageAudio',
        audio: {
          _: 'inputFileLocal',
          path: audio.path,
        },
        duration,
        title,
        caption: {
          _: 'formattedText',
          text,
        },
      },
    });

    return response;
  }

  async sendMessageDocument(data: {
    chatId: number;
    document: any;
    caption: {
      text: string;
    };
  }) {
    const {
      chatId,
      document,
      caption: { text },
    } = data;

    const { response } = await this.airgram.api.sendMessage({
      chatId,
      inputMessageContent: {
        _: 'inputMessageDocument',
        document: {
          _: 'inputFileLocal',
          path: document.path,
        },
        caption: {
          _: 'formattedText',
          text,
        },
      },
    });

    return response;
  }

  async getMessagesFromChatId(data: { chatId: number }) {
    const { chatId } = data;

    const { response } = await this.airgram.api.getMessages({
      chatId,
    });

    return response;
  }

  async webhookGetMessages() {
    const auths = await this.authRepository.find();
    console.log(JSON.stringify(auths, null, 2));

    return this.airgram.on('updateNewMessage', (data) => {
      console.log(JSON.stringify(data, null, 2));
      return data;
    });
  }
}

export default AirgramService;
