function loadBookData() {
    const bookId = parseInt(localStorage.getItem('bookToEditId'));

    if (!bookId) {
        alert('No book selected for editing');
        window.location.href = 'index.html';
        return;
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id === bookId);

    console.log('Loaded book for editing:', book);

    if (!book) {
        alert('Book not found');
        window.location.href = 'index.html';
        return;
    }

    // Populate the form with book data
    $('#bookTitle').val(book.title);
    $('#bookId').val(book.id);
    $('#bookAuthor').val(book.details.author);
    $('#bookGenre').val(book.details.genre);
    $('#publishedYear').val(book.details.year);
}

function updateBook(event) {
    event.preventDefault();

    const bookId = parseInt(localStorage.getItem('bookToEditId'));
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1) {
        alert('Book not found');
        window.location.href = 'index.html';
        return;
    }

    // Capture the existing status so we don't accidentally overwrite it
    const currentStatus = books[bookIndex].status || 'Available';

    // Update book data
    books[bookIndex] = {
        title: $('#bookTitle').val(),
        id: bookId, // Keep the same ID
        details: {
            author: $('#bookAuthor').val(),
            genre: $('#bookGenre').val(),
            year: $('#publishedYear').val()
        },
        status: currentStatus 
    };

    localStorage.setItem('books', JSON.stringify(books));
    localStorage.removeItem('bookToEditId'); // Clean up

    alert('Book updated successfully!');
    window.location.href = 'index.html';
}

$(document).on('DOMContentLoaded', function() {
    console.log('Edit Book page loaded');
    loadBookData();
    console.log('Book data loaded into form');

    const form = $('#editBookForm');
    if (form) {
        form.on('submit', updateBook);
    }
});