import { PrismaClient } from '../generated/prisma';

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export async function createContact(data: {
  name: string;
  email: string;
  organization?: string;
  role: string;
  province: string;
  volume?: string;
  message?: string;
}) {
  return prisma.contact.create({
    data: {
      ...data,
      role: data.role as any // Cast to UserRole enum
    }
  });
}

export async function getContact(id: string) {
  return prisma.contact.findUnique({
    where: { id }
  });
}

export async function listContacts(options: {
  skip?: number;
  take?: number;
  status?: string;
} = {}) {
  return prisma.contact.findMany({
    where: options.status ? { status: options.status } : undefined,
    skip: options.skip,
    take: options.take,
    orderBy: { createdAt: 'desc' }
  });
}

export async function updateContactStatus(id: string, status: string) {
  return prisma.contact.update({
    where: { id },
    data: { status }
  });
}