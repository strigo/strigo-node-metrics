/*
 * Initialize a hot-shots client.
 */
const statsdClient = require('hot-shots');

const STATSD_HOST = '127.0.0.1';
const STATSD_PORT = 8125;
const CONTAINER_HOSTNAME = process.env.HOSTNAME;
const { NOMAD_ALLOC_ID } = process.env;

function setupStatsdClient({
  svc, env, host = STATSD_HOST, port = STATSD_PORT, log,
}) {
  if (!svc) {
    throw new Error('Must provide a service name');
  }

  const globalTags = { env };

  // If we don't add these conditionals, these tags will be set
  // with an `undefined` value, which is wasteful.
  if (CONTAINER_HOSTNAME) {
    globalTags.container_hostname = CONTAINER_HOSTNAME;
  }

  if (NOMAD_ALLOC_ID) {
    globalTags.nomad_alloc_id = NOMAD_ALLOC_ID;
  }

  if (log) {
    log.info(`Initializing statsd client for service ${svc} @ ${STATSD_HOST}:${STATSD_PORT}...`);
  }

  const client = new statsdClient.StatsD(
    {
      host,
      port,
      prefix: `${svc}_`,
      globalTags,
      telegraf: true,
    },
  );

  return client;
}

module.exports = {
  setupStatsdClient,
};
