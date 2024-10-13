import { api } from "../../lib/api";

export const bookService = {
  // Método para buscar todos os livros
  async getAllBooks() {
    try {
      const response = await api.get("/books");
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao buscar os livros:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível buscar os livros.");
    }
  },

  // Método para buscar um livro por ID
  async getBookById(bookId) {
    try {
      const response = await api.get(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao buscar o livro de ID ${bookId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(`Não foi possível buscar o livro de ID ${bookId}.`);
    }
  },

  // Método para criar um novo livro
  async createBook(bookData) {
    try {
      const response = await api.post("/books", bookData);
      return response.data;
    } catch (error) {
      console.error(
        "Erro ao criar o livro:",
        error.response ? error.response.data : error
      );
      throw new Error("Não foi possível criar o livro.");
    }
  },

  // Método para atualizar um livro existente
  async updateBook(bookId, bookData) {
    try {
      const response = await api.put(`/books/${bookId}`, bookData);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao atualizar o livro de ID ${bookId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(`Não foi possível atualizar o livro de ID ${bookId}.`);
    }
  },

  // Método para deletar um livro
  async deleteBook(bookId) {
    try {
      const response = await api.delete(`/books/${bookId}`);
      return response.data;
    } catch (error) {
      console.error(
        `Erro ao deletar o livro de ID ${bookId}:`,
        error.response ? error.response.data : error
      );
      throw new Error(`Não foi possível deletar o livro de ID ${bookId}.`);
    }
  },
};
