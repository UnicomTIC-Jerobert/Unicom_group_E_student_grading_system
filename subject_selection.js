const subjects = {
    mandatory: ['Math', 'Science', 'English', 'History', 'Geography', 'PE'],
    basket: {
        Basket1: ['Art', 'Music', 'Drama'],
        Basket2: ['Biology', 'Chemistry', 'Physics'],
        Basket3: ['Economics', 'Business Studies', 'Accounting']
    }
};

document.addEventListener('DOMContentLoaded', () => {

    // List mandory subject
    const mandatorySubjectsUl = document.getElementById('mandatorySubjects');
    subjects.mandatory.forEach(subject => {
        const li = document.createElement('li');
        li.textContent = subject;
        mandatorySubjectsUl.appendChild(li);
    });

    const basketSubjectsDiv = document.getElementById('basketSubjects');
    for (const basket in subjects.basket) {
        const select = document.createElement('select');
        select.id = basket;
        select.required = true;

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = `Select ${basket}`; // string interpolation
        select.appendChild(defaultOption);

        subjects.basket[basket].forEach(subject => {
            const option = document.createElement('option');
            option.value = subject;
            option.textContent = subject;
            select.appendChild(option);
        });

        basketSubjectsDiv.appendChild(select);
    }

    document.getElementById('subjectSelectionForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const basketSelections = {};
        for (const basket in subjects.basket) {
            const selection = document.getElementById(basket).value;
            if (!selection) {
                document.getElementById('message').textContent = 'Please select all basket subjects.';
                return;
            }
            basketSelections[basket] = selection;
        }

        const username = sessionStorage.getItem('loggedInUser');
        let users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(user => user.username === username);
        if (userIndex !== -1) {
            users[userIndex].subjects = {
                mandatory: subjects.mandatory,
                basket: basketSelections
            };
            localStorage.setItem('users', JSON.stringify(users));
            document.getElementById('message').textContent = 'Subjects selected successfully.';
            setTimeout(() => {
                window.location.href = 'display_grades.html';
            }, 1000);
        }
    });

});
