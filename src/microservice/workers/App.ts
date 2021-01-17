import Schedule from 'node-schedule';

import BoletoJob from './jobs/Boleto';
import PagamentoJob from './jobs/Pagamento';
import Job from './interfaces/Job';

export default class App {
  protected jobs: [string, Job][] = [
    ['*/5 * * * * *', new BoletoJob()],
    ['* * * * 5 *', new PagamentoJob()],
  ];

  protected runningJobs: Schedule.Job[];

  async onStart() {
    this.runningJobs = this.jobs.map(([rule, job]) =>
      Schedule.scheduleJob(rule, () => job.handle().catch((error) => error))
    );
  }

  async onDeath() {
    this.runningJobs.forEach((job) => Schedule.cancelJob(job));
  }
}
