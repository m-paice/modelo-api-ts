import eventEmitters from '../../services/eventEmitters';

import { CREATED, UPDATED } from '../../resource/BaseResource';

import nodemailer from '../../services/nodemailer';

export default class App {
  async onStart() {
    // user
    eventEmitters.on(`usuario.${CREATED}`, (data) => {
      const sendEmail = async () =>
        nodemailer({
          to: data.email,
          subject: 'welcome',
          message:
            'Bem-vindo a plataforma Credas. Fique por dentro de todo sua atividade financeira',
        });

      sendEmail();
    });
    eventEmitters.on(`usuario.${UPDATED}`, (data) => {
      console.log(data);
    });
  }

  async onDeath() {
    eventEmitters.removeAllListeners();
  }
}
