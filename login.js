// Assuming users data is shared or passed here from user creation
const users = JSON.parse(localStorage.getItem('users')) || [
    
];

function encryptPassword(password) {
    return btoa(password);
}

// Login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    let username = document.getElementById('loginUsername').value;
    let password = encryptPassword(document.getElementById('loginPassword').value);

    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById('loginMessage').textContent = "";
        if (user.role === 'student') {
            alert("Redirecting to student page...");
           // window.location.href = 'subject_selection.html';
        } else if (user.role === 'teacher') {
            alert("Redirecting to teacher page...");
            // Implement redirection or further actions for teacher
        } else if (user.role === 'staff') {
            alert("Redirecting to staff page...");
            // Implement redirection or further actions for staff
        }
    } else {
        document.getElementById('loginMessage').textContent = "Invalid username or password.";
    }
});
