const users = JSON.parse(localStorage.getItem('users')) || [];

// Function to simulate password encryption (for demonstration purposes)
function encryptPassword(password) {
    return btoa(password); // Simple encryption using base64 encoding
}

// User Creation
document.getElementById('userCreationForm').addEventListener('submit', function (event) {

    event.preventDefault();

    let username = document.getElementById('createUsername').value;
    let password = encryptPassword(document.getElementById('createPassword').value);
    let role = document.getElementById('userRole').value;

    // Check if username already exists
    if (users.find(user => user.username === username)) {
        document.getElementById('creationMessage').textContent = "Username already exists.";
        return;
    }


    users.push({ username, password, role });
    localStorage.setItem('users',JSON.stringify(users));

    document.getElementById('creationMessage').textContent = "User created successfully!";
    document.getElementById('userCreationForm').reset();

});


