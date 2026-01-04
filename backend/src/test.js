import {prisma} from "./lib/prisma.ts"

async function test() {
    const queryRes = await prisma.user.findMany();

    console.log(queryRes);
}

test()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })