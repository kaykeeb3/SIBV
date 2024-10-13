import { BookRepository } from "@/infra/repositories/bookRepository";
import { Book } from "@/domain/entities/bookEntity";
import prisma from "@/infra/prisma/client";

// Mock do módulo prisma
jest.mock("@/infra/prisma/client", () => ({
  book: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

const mockBookData = {
  id: 1,
  name: "Test Book",
  author: "Test Author",
  number: 2222,
  quantity: 10,
  gender: "Fiction",
};

const mockBook = new Book(
  mockBookData.id,
  mockBookData.name,
  mockBookData.number,
  mockBookData.author,
  mockBookData.gender,
  mockBookData.quantity
);

describe("Book Repository", () => {
  let bookRepository: BookRepository;

  beforeEach(() => {
    bookRepository = new BookRepository();
    jest.clearAllMocks();
  });

  it("should create a book", async () => {
    (prisma.book.create as jest.Mock).mockResolvedValue(mockBookData);

    const result = await bookRepository.createBook({
      name: mockBookData.name,
      author: mockBookData.author,
      number: mockBookData.number,
      quantity: mockBookData.quantity,
      gender: mockBookData.gender,
    });

    expect(prisma.book.create).toHaveBeenCalledWith({
      data: {
        name: mockBookData.name,
        author: mockBookData.author,
        number: mockBookData.number,
        quantity: mockBookData.quantity,
        gender: mockBookData.gender,
      },
    });
    expect(result).toEqual(mockBook);
  });

  it("should get all books", async () => {
    (prisma.book.findMany as jest.Mock).mockResolvedValue([mockBookData]);

    const result = await bookRepository.getAllBooks();

    expect(prisma.book.findMany).toHaveBeenCalled();
    expect(result).toEqual([mockBook]);
  });

  it("should get a book by id", async () => {
    (prisma.book.findUnique as jest.Mock).mockResolvedValue(mockBookData);

    const result = await bookRepository.getBookById(1);

    expect(prisma.book.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockBook);
  });

  it("should update a book partially", async () => {
    const updatedData = { quantity: 15 };
    const updatedBookData = { ...mockBookData, ...updatedData };
    const updatedBook = new Book(
      updatedBookData.id,
      updatedBookData.name,
      updatedBookData.number,
      updatedBookData.author,
      updatedBookData.gender,
      updatedBookData.quantity
    );

    (prisma.book.update as jest.Mock).mockResolvedValue(updatedBookData);

    const result = await bookRepository.updateBook(1, updatedData);

    expect(prisma.book.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedData,
    });
    expect(result).toEqual(updatedBook);
  });

  it("should delete a book", async () => {
    (prisma.book.delete as jest.Mock).mockResolvedValue(mockBookData);

    const result = await bookRepository.deleteBook(1);

    expect(prisma.book.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockBook);
  });
});
