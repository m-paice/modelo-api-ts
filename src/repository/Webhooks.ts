import Webhook, { WebhooksInstace } from '../models/Webhooks';
import BaseRepository from './BaseRepository';

class WebhookRepository extends BaseRepository<WebhooksInstace> {
  constructor() {
    super(Webhook);
  }
}

export default new WebhookRepository();
