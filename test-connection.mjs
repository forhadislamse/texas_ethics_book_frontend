import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "mongodb+srv://texas_ethics_book_server:texas_ethics_book_server@cluster0.1jwqqxu.mongodb.net/texas_ethics_book_server?appName=Cluster0"
    }
  }
});

async function test() {
  try {
    await prisma.$connect();
    console.log('SUCCESS: Connected to MongoDB!');
    const result = await prisma.user.findMany({ take: 1 });
    console.log('Result:', JSON.stringify(result));
  } catch (e) {
    console.log('ERROR:', e.message);
    console.log('Full error:', JSON.stringify(e, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

test();