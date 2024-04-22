const myLibrary = [
    { title: "Harry Potter", author: "J. K. Rowling", pages: 607, status: "Read" },
    { title: "The Hobbit", author: "J. R. R. Tolkien", pages: 372, status: "Not Read" },
    { title: "Dream of the Red Chamber", author: "Cao Xueqin", pages: 352, status: "Read" },
];

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

function createBookCard(title, author, pages, status, bookId) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.setAttribute("data-book-id", bookId);

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
    bookStatus.textContent = `Status: `;
    bookCard.appendChild(bookStatus);

    const bookStatusToggler = document.createElement("button");
    if (status === "Read") {
        bookStatusToggler.classList.add("book-status-toggler", "cursor", "transform-scale", status.toLowerCase());
    } else {
        bookStatusToggler.classList.add("book-status-toggler", "cursor", "transform-scale");
    }
    bookStatusToggler.textContent = `${status}`;
    bookStatus.appendChild(bookStatusToggler);

    const removeBookIcon = document.createElement("button");
    removeBookIcon.classList.add("remove-book-icon", "cursor", "transform-scale");
    removeBookIcon.textContent = "x";
    bookCard.appendChild(removeBookIcon);

    return bookCard;
}

function toggleReadStatus() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.addEventListener("click", (e) => {
        const isBookStatusToggler = e.target.classList.contains("book-status-toggler");
        if (isBookStatusToggler) {
            const bookId = e.target.parentElement.parentElement.dataset.bookId;
            const toggler = e.target.classList.toggle("read");
            let readStatus = toggler ? myLibrary[bookId]["status"] = "Read" : myLibrary[bookId]["status"] = "Not Read";
            e.target.textContent = readStatus;
        }
    });
}

function removeBookIconCard() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.addEventListener("click", (e) => {
        const isRemoveBookIcon = e.target.classList.contains("remove-book-icon");
        if (isRemoveBookIcon) {
            const bookId = e.target.parentElement.dataset.bookId;
            myLibrary.splice(bookId, 1);
            displayBookCard();
        }
    });
}

function displayBookCard() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.textContent = "";
    for (const book of myLibrary) {
        const bookId = myLibrary.indexOf(book);
        bookContainer.appendChild(createBookCard(book["title"], book["author"], book["pages"], book["status"], bookId));
    }
}

function addBook() {
    const addBookDialog = document.querySelector("#add-book-dialog");
    const showDialog = document.querySelector("#add-book-btn");
    const closeDialog = document.querySelector("#cancel-add-book-btn");
    const closeDialogIcon = document.querySelector("#dialog-header-close");
    const confirmAddBook = document.querySelector("#confirm-add-book-btn");
    showDialog.addEventListener("click", () => {
        addBookDialog.showModal();
    });

    closeDialog.addEventListener("click", (e) => {
        e.preventDefault();
        addBookDialog.close();
    });

    closeDialogIcon.addEventListener("click", (e) => {
        e.preventDefault();
        addBookDialog.close();
    });

    confirmAddBook.addEventListener("click", (e) => {
        const isFormValid = document.querySelector("#add-book-form").checkValidity();
        if (isFormValid) {
            e.preventDefault();
            const bookTitle = document.querySelector("#book-title").value;
            const bookAuthor = document.querySelector("#book-author").value;
            const bookPages = document.querySelector("#book-pages").value;
            const bookStatus = document.querySelector("#book-read-status");
            if (bookStatus.checked) {
                bookStatus.value = "Read";
            } else {
                bookStatus.value = "Not read";
            }
            addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus.value);
            displayBookCard();
            addBookDialog.close();
        }
    });
}

displayBookCard();
addBook();
removeBookIconCard();
toggleReadStatus();