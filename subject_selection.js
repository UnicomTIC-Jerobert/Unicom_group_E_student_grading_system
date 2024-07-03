// Array to store students data
let students = [
    {
        id: 'ut2345',
        subjects: ['Maths', 'Rts']
    }
];
let mandatorySubjects = ["Math", "Science", "History", "Geography", "English", "PE", "Tamil"];

// Function to display compulsory subjects
function displayCompulsorySubjects() {
    let compulsorySubjectsList = document.getElementById('compulsorySubjects');
    console.log(compulsorySubjectsList)
    compulsorySubjectsList.innerHTML = ""; // Clear the list first

    mandatorySubjects.forEach(createLi);

    function createLi(subject) {
        let listItem = document.createElement('li'); //<li></li>
        listItem.textContent = subject; // <li>Maths</li>
        compulsorySubjectsList.appendChild(listItem);
    }

    // mandatorySubjects.forEach(function (subject){
    //     let listItem = document.createElement('li'); //<li></li>
    //     listItem.textContent = subject; // <li>Maths</li>
    //     compulsorySubjectsList.appendChild(listItem);
    // });



    // mandatorySubjects.forEach(subject => {
    //     let listItem = document.createElement('li');
    //     listItem.textContent = subject;
    //     compulsorySubjectsList.appendChild(listItem);
    // });
}

// Subject selection function
function selectSubjects(studentId, basket1, basket2, basket3) {
    let selectedSubjects = [basket1, basket2, basket3].concat(mandatorySubjects);
    
    let student = students.find(student => student.id === studentId);
    if (student) {
        student.subjects = selectedSubjects;
    } else {
        students.push({ id: studentId, subjects: selectedSubjects });
    }

    return "Subjects selected successfully";
}

// Form submission event handler
document.getElementById('subjectForm').addEventListener('submit', submitForm);

// Display compulsory subjects on page load
document.addEventListener('DOMContentLoaded', displayCompulsorySubjects);


function submitForm(event) {

    event.preventDefault(); // Prevent form from submitting the default way
    console.log(event.target)
    // Get form values
    let studentId = document.getElementById('studentId').value;
    let basket1 = document.getElementById('basket1').value;
    let basket2 = document.getElementById('basket2').value;
    let basket3 = document.getElementById('basket3').value;

    // Select subjects and display message
    let message = selectSubjects(studentId, basket1, basket2, basket3);
    document.getElementById('message').textContent = message;

    // Clear the form
    event.target.reset();
    console.log(students)
}

