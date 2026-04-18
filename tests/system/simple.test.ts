import { prisma } from '@/lib/prisma'

describe('System: Database Connection', () => {
  it('should connect to database and perform operations', async () => {
    // Create a test user
    const user = await prisma.user.create({
      data: {
        email: 'system@example.com',
        password: 'hashedpassword',
        name: 'System Test',
      },
    })
    
    expect(user.id).toBeDefined()
    expect(user.email).toBe('system@example.com')
    
    // Read the user
    const found = await prisma.user.findUnique({
      where: { email: 'system@example.com' },
    })
    expect(found).not.toBeNull()
    expect(found?.name).toBe('System Test')
    
    // Update the user
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { name: 'Updated System Test' },
    })
    expect(updated.name).toBe('Updated System Test')
    
    // Delete the user
    await prisma.user.delete({ where: { id: user.id } })
    const deleted = await prisma.user.findUnique({
      where: { id: user.id },
    })
    expect(deleted).toBeNull()
  })
})
