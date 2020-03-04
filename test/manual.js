const { setupStatsdClient } = require('./../');

// Initialize client for specific service (will add a statsd tag service=strigo_app to each metric).
// This returns an unabstracted hot-shots client.
const statsd = setupStatsdClient({ svc: 'strigo_app', env: 'prod', port: 8125 });

// Counter => (metricName, kvPairs (default = {}), increment (default = 1))
statsd.increment('http_requests_total', { tag: 'value' });


statsd.close();
