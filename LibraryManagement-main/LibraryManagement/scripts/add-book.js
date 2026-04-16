function generateBookId() {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const existingIds = books.map(b => b.id);

    let newId;
    do {
        newId = Math.floor(Math.random() * 15000) + 1; // Random number between 1 and 15000
    } while (existingIds.includes(newId));

    return newId;
}

function saveBookInfo(event){

    event.preventDefault(); // Prevent form submission

    let $bookTitle = $('#bookTitle').val();
    let bookID = generateBookId(); // Auto-generate book ID
    let $bookAuthor = $('#bookAuthor').val();
    let $bookGenre = $('#bookGenre').val();
    let $publishedYear = $('#publishedYear').val();

    console.log('Book Title:', $bookTitle);

    let newBook = {
        title: $bookTitle,
        id: bookID,
        details: {
            author: $bookAuthor,
            genre: $bookGenre,
            year: $publishedYear
        },
        status: 'Available' // Default status for new books
    };

    let books = JSON.parse(localStorage.getItem('books')) || [];
    books.push(newBook);
    localStorage.setItem('books', JSON.stringify(books));

    console.log('New Book Object:', newBook);

    alert('Book information saved successfully!');
    window.location.href = 'index.html';
}