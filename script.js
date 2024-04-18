const myLibrary = [
    { title: "Harry Potter", author: "J. K. Rowling", pages: 607, status: "Read" },
    { title: "The Hobbit", author: "J. R. R. Tolkien", pages: 372, status: "Not Read" },
    { title: "Dream of the Red Chamber", author: "Cao Xueqin", pages: 352, status: "Read" },
];
const bookContainer = document.querySelector("#book-container");

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const newBook = new Book(title, author, pages, status);
    myLibrary.push(newBook);
}

function createBookCard(title, author, pages, status) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = title;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement("p");
    bookAuthor.textContent = `By: ${author}`;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.textContent = `Pages: ${pages}`;
    bookCard.appendChild(bookPages);

    const bookStatus = document.createElement("p");
    bookStatus.textContent = `Status: ${status}`;
    bookCard.appendChild(bookStatus);

    return bookCard;
}

function displayBookCard() {
    for (const book of myLibrary) {
        bookContainer.appendChild(createBookCard(book["title"], book["author"], book["pages"], book["status"]));
    }
}

function addBook() {
    const addBookDialog = document.querySelector("#add-book-dialog");
    const showDialog = document.querySelector("#add-book-btn");
    const closeDialog = document.querySelector("#cancel-add-book-btn");
    showDialog.addEventListener("click", () => {
        addBookDialog.showModal();
    });

    closeDialog.addEventListener("click", (e) => {
        e.preventDefault();
        addBookDialog.close();
    });
}

displayBookCard();
addBook();