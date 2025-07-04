import { expect, test } from '@playwright/test'
import { ApiClient } from './api-client'
import { StatusCodes } from 'http-status-codes'

test('login and create order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
})

test('Succesful login and delete existing order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const response = await apiClient.deleteOrder(orderId)
  const responseBody = await response.ok()
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(responseBody).toBeTruthy()
})

test('Succesful login and delete non existing order with api client', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = 999999
  console.log('orderId:', orderId)
  const response = await apiClient.deleteOrder(orderId)
  expect(response.status()).toBe(StatusCodes.OK)
})

test('Succesfull Autorization, create order and get order by ID', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const getOrder = await apiClient.getOrder(orderId)
  expect.soft(getOrder.status()).toBe(StatusCodes.OK)
})

test('Succesfull Autorization, create order and delete order by ID', async ({ request }) => {
  const apiClient = await ApiClient.getInstance(request)
  const orderId = await apiClient.createOrderAndReturnOrderId()
  console.log('orderId:', orderId)
  const deleteOrder = await apiClient.deleteOrder(orderId)
  expect.soft(deleteOrder.status()).toBe(StatusCodes.OK)
})
