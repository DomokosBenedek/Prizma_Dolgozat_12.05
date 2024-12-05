import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
    let help:string[] = ["wood", "metal", "plastic", "other"]; 
    
  for (let i = 0; i < 15; i++) {
    const free = Math.random() < 0.25;
    await prisma.child.create({
      data: {
        name: faker.person.fullName(),
        adress: faker.location.country()+" "+faker.location.city()+" "+faker.location.street()+" "+faker.location.buildingNumber(),
        good: faker.datatype.boolean()
      }
    })
  }
  for (let i = 0; i < 50; i++) {
    await prisma.toy.create({
      data: {
        name: faker.commerce.productName(),
        material: help[Math.floor(Math.random() * help.length)],
        weight: faker.number.float({min: 0, max: 10}),
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })