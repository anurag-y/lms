document.addEventListener('DOMContentLoaded', function () {
  const editNameButton = document.getElementById("editNameButton");
  const userDetailsContainer = document.getElementById("userDetails");
  var userDataElement = document.getElementById('user-data');

  const displayUserDetails = async () => {
    var userDataElement = document.getElementById('user-data');
    var userEmail = userDataElement.getAttribute('data-user-email');

    // Fetch user details with this email from the database
    const response = await fetch(`/profile/${userEmail}`);
    const user = await response.json();

    userDetailsContainer.innerHTML = `
      <h2>Hello, ${user.user.name}!</h2>
      <h3>Email: ${user.user.email}</h3>
      <h3>Issued Books:</h3>
      <ul>
        ${await Promise.all(user.user.issuedBooks.map(async book => {
          const issueDate = new Date(book.issueDate);
          const dueDate = new Date(issueDate);
          dueDate.setDate(issueDate.getDate() + 15); // Adding 15 days to the issue date
          const currentDate = new Date();

          const daysLate = Math.max(0, Math.floor((currentDate - dueDate) / (1000 * 60 * 60 * 24)));
          const fine = daysLate * 2; // ₹2 per day fine

          const bookResponse = await fetch(`/userbooks/${book.bookID}`);
          const bookData = await bookResponse.json();
          const bookName = bookData.title;


          return `
            <li>
              Book: ${bookName}<br>
              ID: ${book.bookID}<br>
              Issued On: ${issueDate.toDateString()}<br>
              Due Date: ${dueDate.toDateString()}<br>
              Returned: ${book.returned ? "Yes" : "No"}<br>
              Fine: ₹${book.returned && daysLate > 0 ? fine : 0}<br>
              ${!book.returned ? `<button onclick="returnBook('${book.bookID}')">Return Book</button><br>` : ''}
              
            </li>
          `;
        }))}
      </ul>
    `;
  }

  const updateUsername = async (email, name) => {
    const response = await fetch(`/profile/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, name }),
    });

    const data = await response.json();
    displayUserDetails();
  }

  // Function to handle returning a book
  const returnBook = async (bookID) => {
    var userEmail = userDataElement.getAttribute('data-user-email');
    // Implement your logic to mark the book as returned in the backend
    // For example, you can make a fetch request to update the book status
    // After returning, refresh the user details display
    // Example: await fetch(`/profile/return-book/${userEmail}/${bookID}`);
    displayUserDetails();
  }

  editNameButton.addEventListener("click", function () {
    const newName = prompt("Enter your new name:");
    var userEmail = userDataElement.getAttribute('data-user-email');

    if (newName) {
      updateUsername(userEmail, newName);
    }
  });

  // Display user details on page load
  displayUserDetails();
});
