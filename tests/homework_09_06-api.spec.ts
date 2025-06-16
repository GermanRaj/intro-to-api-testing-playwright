import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

test('put order with correct data should recieve 200 OK', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'adrian',
    customerPhone: '+371222222',
    comment: 'hello world',
    id: 1,
  }
  const requestHeaders = {
    api_key: '1234567891234562',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/1', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  console.log('response headers:', await response.headers())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('put order with invalid api_key should return 401 Unauthorize', async ({ request }) => {
  // prepare request body
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'adrian',
    customerPhone: '+3712222222',
    comment: 'hello world',
    id: 0,
  }
  const requestHeaders = {
    api_key: '12345678912345612',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/2', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  console.log('response headers:', response.headers())
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})
