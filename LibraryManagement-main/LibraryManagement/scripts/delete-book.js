function loadBookInfo() {
    const bookId = parseInt(localStorage.getItem('bookToDeleteId'));

    if (!bookId) {
        alert('No book selected for deletion');
        window.location.href = 'index.html';
        return;
    }

    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = books.find(b => b.id === bookId);

    if (!book) {
        alert('Book not found');
        window.location.href = 'index.html';
        return;
    }

    // Display book info on the screen
    $('#infoTitle').text(book.title);
    $('#infoId').text(book.id);
}

function confirmDelete() {
    const bookId = parseInt(localStorage.getItem('bookToDeleteId'));
    let books = JSON.parse(localStorage.getItem('books')) || [];

    // Filter out the book to delete
    books = books.filter(b => b.id !== bookId);

    localStorage.setItem('books', JSON.stringify(books));
    localStorage.removeItem('bookToDeleteId'); // Clean up the ID we set earlier

    alert('Book deleted successfully!');
    window.location.href = 'index.html';
}

$(document).on('DOMContentLoaded', function() {
    loadBookInfo();

    const deleteBtn = $('#confirmDeleteBtn');
    if (deleteBtn) {
        deleteBtn.on('click', confirmDelete);
    }
});