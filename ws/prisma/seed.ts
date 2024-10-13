import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criar usuários
  const existingUsers = await prisma.user.findMany();

  if (existingUsers.length === 0) {
    await prisma.user.createMany({
      data: [
        {
          name: "Admin User",
          institution: "Example Institution",
          limit: 100,
          role: Role.ADMIN,
          email: "admin@example.com",
          password: "hashedpassword123",
          phone: "123456789",
          profilePicture: "profile-pic-url",
        },
        {
          name: "Regular User",
          institution: "Example Institution",
          limit: 50,
          role: Role.USER,
          email: "user@example.com",
          password: "hashedpassword123",
          phone: "987654321",
        },
      ],
    });
  }

  // Criar livros
  const existingBooks = await prisma.book.findMany();

  if (existingBooks.length === 0) {
    await prisma.book.createMany({
      data: [
        {
          name: "The Great Gatsby",
          number: 1,
          author: "F. Scott Fitzgerald",
          gender: "Fiction",
          quantity: 10,
        },
        {
          name: "1984",
          number: 2,
          author: "George Orwell",
          gender: "Dystopian",
          quantity: 5,
        },
        {
          name: "To Kill a Mockingbird",
          number: 3,
          author: "Harper Lee",
          gender: "Fiction",
          quantity: 7,
        },
      ],
    });
  }

  // Criar equipamentos
  const existingEquipments = await prisma.equipment.findMany();

  if (existingEquipments.length === 0) {
    await prisma.equipment.createMany({
      data: [
        {
          name: "Projector",
          type: "AV",
          quantity: 3,
        },
        {
          name: "Laptop",
          type: "Computing",
          quantity: 10,
        },
        {
          name: "Whiteboard",
          type: "Office",
          quantity: 5,
        },
      ],
    });
  }

  // Obter IDs dos equipamentos criados
  const allEquipment = await prisma.equipment.findMany();

  // Criar agendamentos
  await prisma.schedule.createMany({
    data: [
      {
        name: "Weekly Meeting",
        quantity: 10,
        startDate: new Date("2024-10-01T10:00:00Z"),
        returnDate: new Date("2024-10-01T12:00:00Z"),
        weekDay: "Monday",
        equipmentId: allEquipment[0].id, // Usando o primeiro equipamento
        type: "Meeting",
        returned: false,
      },
      {
        name: "Classroom Booking",
        quantity: 20,
        startDate: new Date("2024-10-02T09:00:00Z"),
        returnDate: new Date("2024-10-02T11:00:00Z"),
        weekDay: "Tuesday",
        equipmentId: allEquipment[1].id, // Usando o segundo equipamento
        type: "Class",
        returned: false,
      },
    ],
  });

  // Criar empréstimos
  await prisma.loan.createMany({
    data: [
      {
        name: "John Doe",
        seriesCourse: "Course 101",
        startDate: new Date("2024-09-01T10:00:00Z"),
        returnDate: new Date("2024-09-15T10:00:00Z"),
        returned: false,
        bookId: 1, // Usando ID do primeiro livro
      },
      {
        name: "Jane Smith",
        seriesCourse: "Course 102",
        startDate: new Date("2024-09-05T10:00:00Z"),
        returnDate: new Date("2024-09-20T10:00:00Z"),
        returned: false,
        bookId: 2, // Usando ID do segundo livro
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
