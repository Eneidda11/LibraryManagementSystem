function fetchBooksFromLocalStorage(){
   const books = JSON.parse(localStorage.getItem('books')) || [];
   const tableBody = $('#tableBody');

   // Clear the table body
   tableBody.html('');

   if (books.length === 0) {
       tableBody.html(`
           <tr>
        <td colspan="6" class="text-center text-muted py-5">
            <div class="fs-1 mb-2">💨</div>
            <h5 class="fw-bold">Your library is currently a desert.</h5>
            <p>Even the tumbleweeds are bored. Add a book before we turn into a parking lot! 🌵</p>
        </td>
    </tr>
       `);
       return;
   }

   // Display each book
   books.forEach((book) => {
       // A little styling logic for the status
       const statusClass = book.status === 'Available' ? 'text-success' : 'text-warning';

       const row = `
           <tr>
               <td>${book.title} (${book.id})</td>
               <td>${book.details.author}</td>
               <td>${book.details.genre}</td>
               <td>${book.details.year}</td>
               <td class="${statusClass}"><strong>${book.status}</strong></td>
               <td>
                   <button class="btn btn-sm btn-warning me-1" onclick="editBook(${book.id})">Edit</button>
                   <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
               </td>
           </tr>
       `;
       tableBody.append(row);
   });
}

function editBook(bookId) {
    localStorage.setItem('bookToEditId', bookId);
    window.location.href = 'edit-book.html';
}

function deleteBook(bookId) {
    localStorage.setItem('bookToDeleteId', bookId);
    window.location.href = 'delete-book.html';
}

$(document).on('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    
    fetchBooksFromLocalStorage(); // Fetch books on page load

    // Added logic for the "Clear All" button
    $('#clearAllBtn').on('click', function() {
        if(confirm('Are you sure you want to delete all books? This cannot be undone.')) {
            localStorage.removeItem('books');
            fetchBooksFromLocalStorage();
        }
    });
});