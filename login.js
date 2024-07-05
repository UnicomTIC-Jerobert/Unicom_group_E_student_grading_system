function encryptPassword(password) {
    return btoa(password);
}

// Adding Event Listener to LoginForm
document.getElementById('loginForm').addEventListener('submit', submitLoginForm);

function submitLoginForm(e) {
    e.preventDefault();

    // getting values from form
    const username = document.getElementById('loginUsername').value;
    const password = encryptPassword(document.getElementById('loginPassword').value);

    // Retrive user from alresdy saved users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((user)=>findUser(user));


    function findUser(user){
        return user.username === username && user.password === password
    }

    if (foundUser) {
        sessionStorage.setItem('loggedInUser', username);
        sessionStorage.setItem('userRole', foundUser.role);

        // redirect to appropriate pages according to user
        if (foundUser.role === 'student') {
            window.location.href = 'subject_selection.html';
        } else if (foundUser.role === 'teacher') {
            window.location.href = 'grading.html';
        } else if (foundUser.role === 'staff') {
            window.location.href = 'report_generation.html';
        }
    } else {
        document.getElementById('loginMessage').textContent = 'Invalid username or password.';
    }
}

