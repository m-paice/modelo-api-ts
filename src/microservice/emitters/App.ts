import eventEmitters from '../../services/eventEmitters';

import { CREATED, UPDATED } from '../../resource/BaseResource';

export default class App {
  async onStart() {
    // user
    eventEmitters.on(`usuario.${CREATED}`, (data) => {
      console.log(data);
    });
    eventEmitters.on(`usuario.${UPDATED}`, (data) => {
      console.log(data);
    });
  }

  async onDeath() {
    eventEmitters.removeAllListeners();
  }
}
