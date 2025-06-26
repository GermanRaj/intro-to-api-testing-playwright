import 'dotenv/config' // или dotenv.config()
import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoginDto } from './dto/login-dto'
import { orderDto } from './dto/order-dto'

const serviceURL = 'https://backend.tallinn-learning.ee/'
const loginPath = 'login/student'
const orderPath = 'orders'

const jwtPattern = /^eyJhb[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/

test('login with correct data, verify auth token and presence of valid token returns code 200', async ({
  request,
}) => {
  const requestBody = LoginDto.createLoginWithCorrectData()

  console.log('Login request body:', requestBody)

  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: requestBody,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  expect(response.status()).toBe(StatusCodes.OK)
  const responseBody = await response.text()
  console.log('response body:', responseBody)
  const jwtValue = responseBody
  console.log('JWT:', jwtValue)
  expect(jwtValue).toMatch(jwtPattern)
})

test('login with incorrect data and verify response code 401', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithIncorrectData()
  console.log('requestBody:', requestBody)
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  const responseBody = await response.text()

  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  expect(responseBody).toBe('')
})

test('login and create order', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  const jwt = await response.text()
  const orderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: orderDto.createOrderWithRandomData(),
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  const orderResponseBody = await orderResponse.json()
  console.log('orderResponse status:', orderResponse.status())
  console.log('orderResponse:', orderResponseBody)
  expect.soft(orderResponse.status()).toBe(StatusCodes.OK)
  expect.soft(orderResponseBody.status).toBe('OPEN')
  expect.soft(orderResponseBody.id).toBeDefined()
})

test('login with GET  HTTP method returns 405 Status', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  console.log('requestBody:', requestBody)
  const response = await request.get(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  const responseBody = await response.text()

  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('login with PUT HTTPS method returns 405 Status', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  console.log('requestBody:', requestBody)
  const response = await request.put(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  const responseBody = await response.json()

  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('login with DELETE HTTPS method returns 405 Status', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  console.log('requestBody:', requestBody)
  const response = await request.delete(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  const responseBody = await response.text()

  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('login with PATCH  HTTPS method returns 405 Status', async ({ request }) => {
  const requestBody = LoginDto.createLoginWithCorrectData()
  console.log('requestBody:', requestBody)
  const response = await request.patch(`${serviceURL}${loginPath}`, {
    data: requestBody,
  })
  const responseBody = await response.text()

  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.METHOD_NOT_ALLOWED)
})

test('Login with empty body data returns message Unathorized', async ({ request }) => {
  const emptyBody = {}
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: emptyBody,
  })

  const responseBody = await response.text()
  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  expect(responseBody).toBe('')
})

test('Login with Incorrect body returns message Unathorized', async ({ request }) => {
  const emptyBody = { username: 'oleg', password: '123456789' }
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: emptyBody,
  })

  const responseBody = await response.text()
  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  expect.soft(responseBody).toBe('')
})

test('Login with Null body  returns message Unathorized', async ({ request }) => {
  const emptyBody = { username: null, password: null }
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: emptyBody,
  })

  const responseBody = await response.text()
  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
  expect.soft(responseBody).toBe('')
})

test('Login with Symbols in body returns message Unathorized', async ({ request }) => {
  const emptyBody = { username: '!@#', password: '@@%@' }
  const response = await request.post(`${serviceURL}${loginPath}`, {
    data: emptyBody,
  })

  const responseBody = await response.text()
  console.log('response code:', response.status())
  console.log('response body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.UNAUTHORIZED)
})

test('Authorization and get order by ID', async ({ request }) => {
  const authorization = LoginDto.createLoginWithCorrectData()
  const loginResponse = await request.post(`${serviceURL}${loginPath}`, {
    data: authorization,
  })
  expect(loginResponse.status()).toBe(StatusCodes.OK)
  const jwt = await loginResponse.text()

  const newOrderData = orderDto.createOrderWithRandomData()
  const createOrderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: newOrderData,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  expect(createOrderResponse.status()).toBe(StatusCodes.OK)
  const createdOrder = await createOrderResponse.json()
  const orderId = createdOrder.id
  console.log('Created order ID:', orderId)

  const getOrderResponse = await request.get(`${serviceURL}${orderPath}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  expect.soft(getOrderResponse.status()).toBe(StatusCodes.OK)
  const foundOrder = await getOrderResponse.json()
  expect.soft(foundOrder.id).toBe(orderId)
  expect.soft(foundOrder.status).toBe('OPEN')
  console.log('Found order:', foundOrder)
})

test('Authorization and delete order By ID', async ({ request }) => {
  const authorization = LoginDto.createLoginWithCorrectData()
  const loginResponse = await request.post(`${serviceURL}${loginPath}`, {
    data: authorization,
  })
  expect.soft(loginResponse.status()).toBe(StatusCodes.OK)
  const jwt = await loginResponse.text()

  const newOrderData = orderDto.createOrderWithRandomData()
  const createOrderResponse = await request.post(`${serviceURL}${orderPath}`, {
    data: newOrderData,
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect.soft(createOrderResponse.status()).toBe(StatusCodes.OK)

  const createdOrder = await createOrderResponse.json()
  const orderId = createdOrder.id
  console.log('Created order ID:', orderId)

  const deleteOrderResponse = await request.delete(`${serviceURL}${orderPath}/${orderId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })
  expect(deleteOrderResponse.status()).toBe(StatusCodes.OK)

  const deletedOrder = await deleteOrderResponse.json()
  console.log('Deleted Orders response:', deleteOrderResponse)
  console.log('Is this order Deleted? :', deletedOrder)
})
