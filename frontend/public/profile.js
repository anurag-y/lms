document.addEventListener('DOMContentLoaded', function () {
  const editNameButton = document.getElementById("editNameButton");
  const userDetailsContainer = document.getElementById("userDetails");

  // const user = {
  //   name: "John Doe",
  //   email: "john@example.com",
  //   issuedBooks: [
  //     { bookID: "B123", issueDate: "2023-08-10", returned: true },
  //     { bookID: "B456", issueDate: "2023-08-11", returned: false },
  //   ],
  // };

  const displayUserDetails = async()=>{
    var userDataElement = document.getElementById('user-data');
    var userEmail = userDataElement.getAttribute('data-user-email');
    // fetch user details with this email from database
    const response = await fetch(`/profile/${userEmail}`);    
    const user = await response.json();
    console.log(user);

    userDetailsContainer.innerHTML = `
      <h2>Hello, ${user.user.name}!</h2>
      <h3>Email: ${user.user.email}</h3>
      <h3>Issued Books:</h3>
      <ul>
        ${user.user.issuedBooks.map(book => `
          <li>
            Book ID: ${book.bookID}<br>
            Issue Date: ${book.issueDate}<br>
            Returned: ${book.returned ? "Yes" : "No"}
          </li>
        `).join("")}
      </ul>
    `;
  } 
  displayUserDetails();

  editNameButton.addEventListener("click", function() {
    const newName = prompt("Enter your new name:");
    if (newName) {
      user.name = newName;
      displayUserDetails();
    }
  });
  
});
  