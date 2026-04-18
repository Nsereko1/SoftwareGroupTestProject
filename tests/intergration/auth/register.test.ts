// tests/integration/auth/register.test.ts
import request from 'supertest';
import { createNextServer } from '@/lib/test/server'; // hypothetical helper

describe('POST /api/auth/register', () => {
  it('should return 201 on valid registration', async () => {
    const res = await request(app).post('/api/auth/register').send({
      email: 'test@example.com',
      password: 'Secret123',
    });
    expect(res.status).toBe(201);
  });
});