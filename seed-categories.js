const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    const categories = await prisma.category.findMany();
    console.log('Current categories:', categories);

    if (categories.length === 0) {
      console.log('No categories found. Seeding initial categories...');
      const initialCategories = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Design', 'Health'];
      for (const name of initialCategories) {
        await prisma.category.create({ data: { name } });
      }
      const updatedCategories = await prisma.category.findMany();
      console.log('Seeded categories:', updatedCategories);
    } else {
      console.log('Categories already exist.');
    }
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
