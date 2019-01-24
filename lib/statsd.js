/*
 * Initialize an appmetrics-statsd client. Once this is imported
 * anywhere in the application, metrics will be emitted.
 * Additionally, a node-statsd client is exposed.
 */

const os = require('os');
const statsdClient = require('appmetrics-statsd');

const STATSD_HOST = process.env.STATSD_HOST || '127.0.0.1';
const STATSD_PORT = process.env.STATSD_PORT || 8125;
const STATSD_PREFIX = process.env.STATSD_PREFIX;
const STRIGO_ENV = process.env.STRIGO_ENV || os.hostname();

// TODO: use our logger here instead
console.log('Initializing appmetrics-statsd client...', { host: STATSD_HOST, port: STATSD_PORT });

module.exports = (serviceName) => {
  const prefix = (STATSD_PREFIX || serviceName) + '_';

  return statsdClient.StatsD('', STATSD_HOST, STATSD_PORT, prefix, `,env=${STRIGO_ENV}`);
}
