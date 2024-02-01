import { Book } from "../components/Book";

export const BOOKS: Book[] = [
  {
    codISBM: 9780545010221,
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    dateOfPublication: new Date("1997-06-26").toLocaleDateString(),
    genre: "Fantasy",
  },
  {
    codISBM: 9780061120084,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    dateOfPublication: new Date("1960-07-11").toLocaleDateString(),
    genre: "Fiction",
  },
  {
    codISBM: 9780743273565,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    dateOfPublication: new Date("1925-04-10").toLocaleDateString(),
    genre: "Classic",
  },
  {
    codISBM: 9780140283334,
    title: "1984",
    author: "George Orwell",
    dateOfPublication: new Date("1949-06-08").toLocaleDateString(),
    genre: "Dystopian",
  },
  {
    codISBM: 9780062315007,
    title: "The Fault in Our Stars",
    author: "John Green",
    dateOfPublication: new Date("2012-01-10").toLocaleDateString(),
    genre: "Young Adult",
  },
  {
    codISBM: 9788804486629,
    title: "I promessi sposi",
    author: "Alessandro Manzoni",
    dateOfPublication: new Date("1827-07-15").toLocaleDateString(),
    genre: "Romanzo storico",
  },
  {
    codISBM: 9788806149565,
    title: "Gomorra",
    author: "Roberto Saviano",
    dateOfPublication: new Date("2006-11-01").toLocaleDateString(),
    genre: "Saggio",
  },
];
