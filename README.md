# strigo-node-metrics

A NodeJS metrics instrumentation library for Strigo.

This is a very light abstraction on top of hot-shots, which provides not only a statsd client, but also emits additional process level metrics. See [hot-shots](https://github.com/brightcove/hot-shots) for reference.


## Installation

Add `"@strigo/node-metrics": "strigo/strigo-node-metrics.git#TAG"` to your `package.json`.


## Usage

```javascript
import { setupStatsdClient } from '@strigo/node-metrics;

// Initialize client for specific service (will add a statsd tag service=sam to each metric).
// This returns an unabstracted hot-shots client.
statsd = setupStatsdClient({ svc: SERVICE_NAME, env: 'prod' port: 8125 });

statsd.increment('http_requests_total', { org_name });
```


## Metrics

Metrics are emitted in Etsy's [statsd](https://github.com/etsy/statsd) format, with the addition of tags (dimensions).

### Configuration

`setupStatsdClient` receives the following in an object:

* `svc` -> The name of the service to add as a prefix.
* `env` -> The environment in which the process is running.
* `host` -> The host to emit metrics to (defaults to `127.0.0.1`).
* `port` -> The port to emit metrics to (defaults to `8125`).
* `log` -> The node logger instance. 

### Built-in Labels

* `env` is appended as a label to each metrics (as `env=env`).
* `container_hostname` is appended as a label to each metrics (as `container_hostname=HOSTNAME`) if running inside a container.
* `nomad_alloc_id` is appended as a label to each metrics (as `nomad_alloc_id=NOMAD_ALLOC_ID`) if running inside a container.

Note that `container_hostname` is not configurable. When not running inside a container, its value will be null.

### Example Output

* Counter -> `http_requests_total,x=1,env=prod:1|c`
* Timer -> `http_request_duration_ms,env=prod:120|ms`
* Gauge -> `my_gauge,env=prod:15|g`

## Manual Test

You can see if metrics are being emitted by running the client and listening on localhost 8125 UDP.

On Unix: `nc -ul -p STATSD_PORT`.

On OS X: `nc -ul STATSD_PORT`.

You can run `node ./test/manual.js` to run the aforementioned example.
