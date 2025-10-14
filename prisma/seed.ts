import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const address1 = await prisma.address.create({
    data: { street: "123 Main St", city: "Springfield", country: "USA" },
  })
  const address2 = await prisma.address.create({
    data: { street: "789 Oak St", city: "Capital City", country: "USA" },
  })
  const address3 = await prisma.address.create({
    data: { street: "789 Oak St", city: "Capital City", country: "USA" },
  })

  await prisma.user.createMany({
    data: [
      { name: "John Doe", age: 30, addressId: address1.id },
      { name: "Jane Smith", age: 25, addressId: address2.id },
      { name: "Alice Johnson", age: 28, addressId: address3.id },
    ],
  })

  await prisma.store.createMany({
    data: [
      {name: "Store A", addressId: address1.id},
      {name: "Store B", addressId: address2.id},
      {name: "Store C", addressId: address3.id},
    ]
  })

  console.log("Seeding completed.");
}

main()