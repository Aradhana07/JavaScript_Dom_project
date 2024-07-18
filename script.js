document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // dynamically add the row and button
    const renderTable = () => {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = studentTable.insertRow();
            row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteStudent(${index})"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            `;
        });
    };

    // validate the user input field using regex

    const validateInputs = (id, name, email, contact) => {
        const idPattern = /^\d+$/;
        const namePattern = /^[a-zA-Z\s]+$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const contactPattern = /^\d+$/;

        if (!idPattern.test(id)) {
            alert("Student ID must be a number.");
            return false;
        }
        if (!namePattern.test(name)) {
            alert("Student Name must contain only characters.");
            return false;
        }
        if (!emailPattern.test(email)) {
            alert("Invalid email format.");
            return false;
        }
        if (!contactPattern.test(contact)) {
            alert("Contact Number must be a number.");
            return false;
        }
        return true;
    };

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const studentId = document.getElementById('studentId').value.trim();
        const studentName = document.getElementById('studentName').value.trim();
        const studentEmail = document.getElementById('studentEmail').value.trim();
        const studentContact = document.getElementById('studentContact').value.trim();

        //use of localstorage to store data
        if (validateInputs(studentId, studentName, studentEmail, studentContact)) {
            const newStudent = { id: studentId, name: studentName, email: studentEmail, contact: studentContact };
            students.push(newStudent);
            localStorage.setItem('students', JSON.stringify(students));
            renderTable();
            studentForm.reset();
        }
    });

    // reset button allow to edit the data of input
    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById('studentId').value = student.id;
        document.getElementById('studentName').value = student.name;
        document.getElementById('studentEmail').value = student.email;
        document.getElementById('studentContact').value = student.contact;

        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    // delet button using localstorage
    window.deleteStudent = (index) => {
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    };

    renderTable();
});
