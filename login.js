function encryptPassword(password) {
    return btoa(password);
}

// Login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = encryptPassword(document.getElementById('password').value);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        sessionStorage.setItem('loggedInUser', username);
        sessionStorage.setItem('userRole', user.role);
        if (user.role === 'student') {
            window.location.href = 'subject_selection.html';
        } else if (user.role === 'teacher') {
            window.location.href = 'grading.html';
        } else if (user.role === 'staff') {
            window.location.href = 'report_generation.html';
        }
    } else {
        document.getElementById('message').textContent = 'Invalid username or password.';
    }
});

