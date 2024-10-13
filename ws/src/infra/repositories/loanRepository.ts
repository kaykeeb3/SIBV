import prisma from "@/infra/prisma/client";
import { Loan } from "@/domain/entities/loanEntity";

type LoanInput = {
  name: string;
  seriesCourse: string;
  startDate: Date;
  returnDate: Date;
  bookId: number;
};

export class LoanRepository {
  async createLoan(data: LoanInput): Promise<Loan> {
    const loan = await prisma.loan.create({
      data: {
        name: data.name,
        seriesCourse: data.seriesCourse,
        startDate: data.startDate,
        returnDate: data.returnDate,
        bookId: data.bookId,
      },
    });
    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }

  async getAllLoans(): Promise<Loan[]> {
    const loans = await prisma.loan.findMany();
    return loans.map(
      (loan) =>
        new Loan(
          loan.id,
          loan.name,
          loan.seriesCourse,
          loan.startDate,
          loan.returnDate,
          loan.returned,
          loan.bookId
        )
    );
  }

  async getLoanById(id: number): Promise<Loan> {
    const loan = await prisma.loan.findUnique({ where: { id } });
    if (!loan) throw new Error("Loan not found");
    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }

  async updateLoan(id: number, data: Partial<LoanInput>): Promise<Loan> {
    const loan = await prisma.loan.update({ where: { id }, data });
    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }

  async deleteLoan(id: number): Promise<Loan> {
    const loan = await prisma.loan.delete({ where: { id } });
    return new Loan(
      loan.id,
      loan.name,
      loan.seriesCourse,
      loan.startDate,
      loan.returnDate,
      loan.returned,
      loan.bookId
    );
  }
}
