import { StatsD } from 'hot-shots';

declare namespace strigoNodeMetrics {
  type NodeMetricsOptions = {
    svc: string;
    env: string;
    host?: string;
    port?: number;
    log: any;
  }

  function setupStatsdClient(metricsOptions: NodeMetricsOptions): StatsD;
}

export = strigoNodeMetrics;