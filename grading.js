document.addEventListener('DOMContentLoaded', () => {
    const students = JSON.parse(localStorage.getItem('users')) || {};
    const studentSelect = document.getElementById('studentSelect');
    const subjectGradesDiv = document.getElementById('subjectGrades');

    // Populate student dropdown
    Object.keys(students).forEach(student => {
        const option = document.createElement('option');
        option.value = student;
        option.textContent = student;
        studentSelect.appendChild(option);
    });

    // Event listener for student selection
    studentSelect.addEventListener('change', () => {
        subjectGradesDiv.innerHTML = '';
        const selectedStudent = studentSelect.value;
        if (students[selectedStudent]) {
            const subjects = [...students[selectedStudent].mandatorySubjects, ...Object.values(students[selectedStudent].selectedSubjects)];
            subjects.forEach(subject => {
                const label = document.createElement('label');
                label.textContent = subject;
                const input = document.createElement('input');
                input.type = 'number';
                input.name = subject;
                input.min = 0;
                input.max = 100;
                subjectGradesDiv.appendChild(label);
                subjectGradesDiv.appendChild(input);
                subjectGradesDiv.appendChild(document.createElement('br'));
            });
        }
    });

    // Handle form submission
    document.getElementById('gradingForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const selectedStudent = studentSelect.value;
        const grades = {};
        subjectGradesDiv.querySelectorAll('input').forEach(input => {
            grades[input.name] = input.value;
        });
        if (students[selectedStudent]) {
            students[selectedStudent].grades = grades;
            localStorage.setItem('students', JSON.stringify(students));
            alert('Grades submitted successfully!');
        } else {
            alert('Error: Student not found.');
        }
    });
});

