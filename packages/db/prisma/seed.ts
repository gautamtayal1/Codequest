import prisma from "../src/index.js";

async function main() {
  const languages = [
    {
      id: 1,
      name: 'Javascript',
      judge0Id: 63
    },
    {
      id: 2,
      name: 'C++',
      judge0Id: 54
    }
  ]
  for (const language of languages) {
    await prisma.language.upsert({
      where: { id: language.id },
      create: language,
      update: {},
    });
    console.log(`Seeded language: ${language.name}`);
  }
  
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error while seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });