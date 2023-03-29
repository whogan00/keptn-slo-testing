import http from 'k6/http';
import { sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  stages: [
    { duration: '1m', target: 2 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: '3m', target: 3 }, // stay at 100 users for 10 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://keptn-golang.default.svc.cluster.local';

export default function () {
  http.get(`${BASE_URL}/`);
  http.get(`${BASE_URL}/delay/${randomIntBetween(1, 5)}`)
  http.get(`${BASE_URL}/flights/sfb-cha`)
  http.get(`${BASE_URL}/flights/cha-sfb`)

  sleep(1);
};
