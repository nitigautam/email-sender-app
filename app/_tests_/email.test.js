const request = require('supertest');
const app = require('../index');

// Mock nodemailer
jest.mock('nodemailer');
const nodemailer = require('nodemailer');
nodemailer.createTransport.mockReturnValue({
  sendMail: jest.fn().mockResolvedValue('Email sent'),
});

describe('POST /send-email', () => {
  it('should return success message', async () => {
    const res = await request(app).post('/send-email').send({
      to: 'test@example.com',
      subject: 'Test',
      text: 'Hello!',
    });
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Email sent successfully!');
  });
});
