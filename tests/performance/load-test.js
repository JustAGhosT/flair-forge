import { check, sleep } from 'k6'
import http from 'k6/http'
import { Rate } from 'k6/metrics'

// Custom metrics
const errorRate = new Rate('errors')

// Test configuration
const stages = __ENV.CI
  ? [
      { duration: '10s', target: 1 },
      { duration: '10s', target: 0 },
    ]
  : [
      { duration: '2m', target: 10 }, // Ramp up to 10 users
      { duration: '5m', target: 10 }, // Stay at 10 users
      { duration: '2m', target: 50 }, // Ramp up to 50 users
      { duration: '5m', target: 50 }, // Stay at 50 users
      { duration: '2m', target: 0 },  // Ramp down to 0 users
    ]

export const options = {
  stages,
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests must complete below 2s
    http_req_failed: ['rate<0.1'],     // Error rate must be less than 10%
    errors: ['rate<0.1'],              // Custom error rate
  },
}

// Main test function
export default function() {
  const baseUrl = __ENV.BASE_URL
  const apiBaseUrl = __ENV.API_BASE_URL

  if (!baseUrl) {
    console.log('Skipping performance request: BASE_URL is not configured')
    return
  }
  
  const appResponse = http.get(baseUrl)
  check(appResponse, {
    'app status is 200': (r) => r.status === 200,
    'app response time < 1000ms': (r) => r.timings.duration < 1000,
  }) || errorRate.add(1)

  sleep(1)

  if (apiBaseUrl) {
    const templatesResponse = http.get(`${apiBaseUrl}/api/templates`)
    check(templatesResponse, {
      'templates status is 200': (r) => r.status === 200,
      'templates response time < 1000ms': (r) => r.timings.duration < 1000,
    }) || errorRate.add(1)
  }

  sleep(1)
}

// Setup function (runs once before the test)
export function setup() {
  const baseUrl = __ENV.BASE_URL

  if (!baseUrl) {
    console.log('Skipping performance setup: BASE_URL is not configured')
    return
  }
  
  // Verify the app is accessible before ramping load.
  const healthCheck = http.get(baseUrl)
  
  if (healthCheck.status !== 200) {
    throw new Error(`App health check failed: ${healthCheck.status}`)
  }
  
  console.log('Performance test setup completed')
  return { baseUrl }
}

// Teardown function (runs once after the test)
export function teardown(data) {
  console.log('Performance test completed')
}
