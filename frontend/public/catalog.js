document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('book-list');

    // Function to fetch and display available books
    const displayBooks = async () => {
        bookList.innerHTML = '';

        const response = await fetch('/books');
        const books = await response.json();

        const tableBody = document.getElementById('book-list');
        books.forEach(book => {
            const row = tableBody.insertRow();

            const uniqueCodeCell = row.insertCell();
            uniqueCodeCell.textContent = book.uniqueCode;         

            const titleCell = row.insertCell();
            titleCell.textContent = book.title;

            const authorsCell = row.insertCell();
            authorsCell.textContent = book.authors.join(', ');

            const statusCell = row.insertCell();
            statusCell.textContent = book.available ? 'Available' : 'Not Available';
            const actionsCell = row.insertCell();
            const borrowButton = document.createElement('button');
            borrowButton.textContent = 'Borrow';
            // borrowButton.addEventListener('click', async () => {
            //     const response = await fetch(`/books/${book._id}`, {
            //         method: 'DELETE'
            //     });

            //     if (response.ok) {
            //         displayBooks(); // Refresh the list after deletion
            //     }
            // });
            actionsCell.appendChild(borrowButton);
        });
        
    };


    // Initial display of available books
    displayBooks();
});