const client = require('./lib/statsd');

const isNotEmpty = (obj) => obj && Object.getOwnPropertyNames(obj).length;

function keyValuesToString(keyValues) {
  return Object.keys(keyValues)
    .reduce((r, k) => r.concat(`${k}=${keyValues[k]}`), [])
    .join(',');
}

module.exports = {
  init(serviceName) {
    this.statsd = client(serviceName);
    return this.statsd;
  },

  timing(metric, startTime, keyValues = {}) {
    const latency = +new Date() - startTime;
    const realMetric = isNotEmpty(keyValues) ? `${metric},${keyValuesToString(keyValues)}` : metric;
    this.statsd.timing(realMetric, latency);
  },

  gauge(metric, gaugeValue, keyValues = {}) {
    const realMetric = isNotEmpty(keyValues) ? `${metric},${keyValuesToString(keyValues)}` : metric;
    this.statsd.gauge(realMetric, gaugeValue);
  },

  increment(metric, keyValues = {}, incrementValue = 1) {
    const realMetric = isNotEmpty(keyValues) ? `${metric},${keyValuesToString(keyValues)}` : metric;
    this.statsd.increment(realMetric, incrementValue);
  },
};
