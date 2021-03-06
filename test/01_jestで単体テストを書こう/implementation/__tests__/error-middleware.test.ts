import {UnauthorizedError} from 'express-jwt'
import { mockReq, mockRes } from 'sinon-express-mock';
import errorMiddleware from '../error-middleware'

test('responds with 401 for express-jwt UnauthorizedError', () => {
  const req = mockReq({});
  const res: any = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }
  const next = jest.fn()
  const error = new UnauthorizedError('fake_code', {
    message: 'Fake Error Message',
  })
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(401)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    code: error.code,
    message: error.message,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})

test('calls next if headersSent is true', () => {
  const req = mockReq({});
  const response: object = {
    json: jest.fn(() => response),
    status: jest.fn(() => response),
    headersSent: true,
  };
  const res = mockRes(response)
  const next = jest.fn()
  const error = new Error('blah')
  errorMiddleware(error, req, res, next)
  expect(next).toHaveBeenCalledWith(error)
  expect(res.status).not.toHaveBeenCalled()
  expect(res.json).not.toHaveBeenCalled()
})

test('responds with 500 and the error object', () => {
  const req = mockReq({});
  const res: any = {
    json: jest.fn(() => res),
    status: jest.fn(() => res),
  }
  const next = jest.fn()
  const error = new Error('blah')
  errorMiddleware(error, req, res, next)
  expect(next).not.toHaveBeenCalled()
  expect(res.status).toHaveBeenCalledWith(500)
  expect(res.status).toHaveBeenCalledTimes(1)
  expect(res.json).toHaveBeenCalledWith({
    message: error.message,
    stack: error.stack,
  })
  expect(res.json).toHaveBeenCalledTimes(1)
})