import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  console.log('Connecting to database...');
  await prisma.$connect();

  try {
    // 1. Check if 'category' column exists on the 'portfolios' table
    console.log("Checking columns on 'portfolios' table...");
    const columns: any[] = await prisma.$queryRawUnsafe(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'portfolios' AND column_name = 'category'
    `);

    const hasOldCategoryColumn = columns.length > 0;
    console.log(`Old 'category' column exists: ${hasOldCategoryColumn}`);

    // 2. Fetch portfolios
    const portfolios = await prisma.portfolio.findMany();
    console.log(`Found ${portfolios.length} portfolios in the database.`);

    let oldCategoriesMap: Record<string, string> = {};

    if (hasOldCategoryColumn) {
      console.log("Reading raw 'category' values from PostgreSQL...");
      const rawPortfolios: any[] = await prisma.$queryRawUnsafe(`
        SELECT id, category FROM portfolios
      `);
      for (const item of rawPortfolios) {
        if (item.category) {
          oldCategoriesMap[item.id] = item.category;
        }
      }
    }

    // 3. Migrate each portfolio
    for (const portfolio of portfolios) {
      let categoryName = oldCategoriesMap[portfolio.id] || 'Uncategorized';
      
      console.log(`Migrating portfolio "${portfolio.title}" (ID: ${portfolio.id}) with category name: "${categoryName}"`);

      // Find or create Category
      let categoryRecord = await prisma.portfolioCategory.findUnique({
        where: { name: categoryName }
      });

      if (!categoryRecord) {
        categoryRecord = await prisma.portfolioCategory.create({
          data: { name: categoryName }
        });
        console.log(`Created new category: "${categoryName}"`);
      }

      // Update portfolio's categoryId
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data: { categoryId: categoryRecord.id }
      });
      console.log(`Successfully linked to Category ID: ${categoryRecord.id}`);
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
