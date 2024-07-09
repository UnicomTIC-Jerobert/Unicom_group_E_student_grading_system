document.addEventListener('DOMContentLoaded', () => {

	const searchButton = document.getElementById('searchButton');
	const searchStudentInput = document.getElementById('searchStudent');

	const studentDetailsDiv = document.getElementById('studentDetails');
	const studentNameHeading = document.getElementById('studentName');
	const mandatorySubjectsList = document.getElementById('mandatorySubjectsList');
	const basketSubjectsList = document.getElementById('basketSubjectsList');
	const messageDiv = document.getElementById('message');

	searchButton.addEventListener('click', () => {

    	const username = searchStudentInput.value.trim();
    	if (username) {

        	const users = JSON.parse(localStorage.getItem('users')) || [];
        	const user = users.find(user => user.username === username);

        	if (user && user.subjects) {
            	studentNameHeading.textContent = `Grades for ${username}`;
            	mandatorySubjectsList.innerHTML = '';
            	basketSubjectsList.innerHTML = '';

            	user.subjects.mandatory.forEach(subject => {

                	const li = document.createElement('li');	// <li></li>
                	li.innerHTML = `<label>${subject} : </label> <input type="number" name="${subject}" min="0" max="100" required>`;
                	mandatorySubjectsList.appendChild(li);
            	});

            	for (const basket in user.subjects.basket) {
                	const li = document.createElement('li');
                	li.innerHTML = `${user.subjects.basket[basket]}: <input type="number" name="${user.subjects.basket[basket]}" min="0" max="100" required>`;
                	basketSubjectsList.appendChild(li);
            	}

            	studentDetailsDiv.classList.remove('hidden');
            	messageDiv.textContent = '';
        	} else {
            	messageDiv.textContent = 'Student not found or no subjects selected.';
            	studentDetailsDiv.classList.add('hidden');
        	}
    	} else {
        	messageDiv.textContent = 'Please enter a username.';
        	studentDetailsDiv.classList.add('hidden');
    	}

	});

	document.getElementById('gradeEntryForm').addEventListener('submit', function(e) {
    	e.preventDefault();
    	const username = searchStudentInput.value.trim();
    	if (username) {
        	const users = JSON.parse(localStorage.getItem('users')) || [];
        	const userIndex = users.findIndex(user => user.username === username);
        	if (userIndex !== -1) {
            	const formData = new FormData(e.target);
            	const grades = {};
            	for (const [subject, grade] of formData.entries()) {
                	grades[subject] = grade;
            	}
            	users[userIndex].grades = grades;
            	localStorage.setItem('users', JSON.stringify(users));
            	messageDiv.textContent = 'Grades submitted successfully.';
            	studentDetailsDiv.classList.add('hidden');
            	e.target.reset();
        	} else {
            	messageDiv.textContent = 'Student not found.';
        	}
    	} else {
        	messageDiv.textContent = 'Please enter a username.';
    	}
	});
});
