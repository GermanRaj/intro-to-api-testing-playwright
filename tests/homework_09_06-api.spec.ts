import { expect, test } from '@playwright/test'

import { StatusCodes } from 'http-status-codes'

//PUT

test('put order with correct data and ID 1  should recieve 200 OK', async ({ request }) => {
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
  expect(response.status()).toBe(StatusCodes.OK)
})

test('put order with correct data and ID 10 should recieve 200 OK', async ({ request }) => {
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
    api_key: '1234567891234561',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/10', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

test('put order with 0 Id should return 400 BAD Request', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'adrian',
    customerPhone: '+371222222',
    comment: 'hello world',
    id: 1,
  }
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/0', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('put order with missing ID  should return 400 BAD Request', async ({ request }) => {
  const requestBody = {
    status: 'OPEN',
    courierId: 1,
    customerName: 'adrian',
    customerPhone: '+371222222',
    comment: 'hello world',
    id: 1,
  }
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('put order with 11 Id should return 400 BAD Request', async ({ request }) => {
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
    api_key: '1234567891234561',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/11', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('put order with 5 Id should return 200 BAD OK', async ({ request }) => {
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
    api_key: '1234567891234561',
  }
  const response = await request.put('https://backend.tallinn-learning.ee/test-orders/5', {
    data: requestBody,
    headers: requestHeaders,
  })
  console.log('response status:', response.status())
  console.log('response body:', await response.json())
  expect(response.status()).toBe(StatusCodes.OK)
})

// DELETE

test('delete order with 1 ID  should receive code 204', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/1', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with 10 ID  should receive code 204', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/10', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with 5 ID  should receive code 204', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/5', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.NO_CONTENT)
})

test('delete order with 0 ID  should receive code 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/0', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('delete order with 11 ID  should receive code 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/11', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('delete order with no ID  should receive code 405', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('delete order with ID = String  should receive code 400', async ({ request }) => {
  const requestHeaders = {
    api_key: '1234567891234561',
  }
  const response = await request.delete('https://backend.tallinn-learning.ee/test-orders/aa', {
    headers: requestHeaders,
  })
  expect(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

// GET

test('Get order with correct parameters username and password - answer 200 OK', async ({
  request,
}) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=Germans&password=asd',
  )
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Get order with no parameters username and password - Internal Server Errorr ', async ({
  request,
}) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders')
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Get order with only 1 parameter  username - Internal Server Errorr ', async ({ request }) => {
  const response = await request.get(
    'https://backend.tallinn-learning.ee/test-orders?username=Germans',
  )
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Get order with only 1 parameter password - Internal Server Errorr ', async ({ request }) => {
  const response = await request.get('https://backend.tallinn-learning.ee/test-orders?password=asd')
  expect(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})
