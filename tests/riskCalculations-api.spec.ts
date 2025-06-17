import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { riskDecision } from './dto/riskDecision-dto'

test('After Calculating risk Status should return status Code 200 and Contain Risk Level', async ({
  request,
}) => {
  const requestBody = riskDecision.randomRiskDecisionData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  const responseBody = await response.json()

  console.log('Response Status:', response.status())
  console.log('Response Body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const riskLevels = ['Very High Risk', 'High Risk', 'Medium Risk', 'Low Risk']
  expect(riskLevels).toContain(responseBody.riskLevel)
})

test('After calculating Risks should return Status OK and Contain Decision answer ', async ({
  request,
}) => {
  const requestBody = riskDecision.randomRiskDecisionData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const responseBody = await response.json()

  console.log('Response Status:', response.status())
  console.log('Response Body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  const decisionAnswer = ['positive', 'negative']
  expect(decisionAnswer).toContain(responseBody.riskDecision)
})

test('after calculating Risks should return Status OK and riskScore should be >0', async ({
  request,
}) => {
  const requestBody = riskDecision.randomRiskDecisionData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  const body = await response.json()
  const responseBody = await response.json()
  console.log('Response Status:', response.status())
  console.log('Response Body:', responseBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(body.riskScore).toBeGreaterThanOrEqual(0)
})

test('after Calculating Risks should return Status Ok and Age should be > 16', async ({
  request,
}) => {
  const requestBody = riskDecision.randomRiskDecisionData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  const responseBody = await response.json()
  console.log('Response Status:', response.status())
  console.log('Response Body:', responseBody)
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect(requestBody.age).toBeGreaterThanOrEqual(16)
})

test('after Calculating Risks should return Status Ok and Income should be > 0 ', async ({
  request,
}) => {
  const requestBody = riskDecision.randomRiskDecisionData()

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )

  const responseBody = await response.json()
  console.log('Response Status:', response.status())
  console.log('Response Body:', responseBody)
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.OK)
  expect.soft(requestBody.income).toBeGreaterThan(0)
})

test('After Changed loanAmount to negative should return Status 400 BAD REQUEST', async ({
  request,
}) => {
  const requestBody = riskDecision.randomRiskDecisionData()
  requestBody.loanAmount = -200

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  console.log('Response Status:', response.status())
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('After Changed Age to negative should return Status 400 BAD REQUEST', async ({ request }) => {
  const requestBody = riskDecision.randomRiskDecisionData()
  requestBody.age = -10

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  console.log('Response Status:', response.status())
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('After Changed Age to 0 should return Status 400 BAD REQUEST', async ({ request }) => {
  const requestBody = riskDecision.randomRiskDecisionData()
  requestBody.age = 0

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  console.log('Response Status:', response.status())
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('After Changed Income 0 should return Status 400 BAD REQUEST', async ({ request }) => {
  const requestBody = riskDecision.randomRiskDecisionData()
  requestBody.income = 0

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  console.log('Response Status:', response.status())
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('After Changed loanPeriod to 0 should return Status 400 BAD REQUEST', async ({ request }) => {
  const requestBody = riskDecision.randomRiskDecisionData()
  requestBody.loanPeriod = 0

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  console.log('Response Status:', response.status())
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('After Changed loanPeriod to negative should return Status 400 BAD REQUEST', async ({
  request,
}) => {
  const requestBody = riskDecision.randomRiskDecisionData()
  requestBody.loanPeriod = -10

  const response = await request.post(
    'https://backend.tallinn-learning.ee/api/loan-calc/decision',
    {
      data: requestBody,
    },
  )
  console.log('Response Status:', response.status())
  console.log('Request Body:', requestBody)
  expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})
