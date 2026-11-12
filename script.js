
let patients = JSON.parse(
    localStorage.getItem("patients")
) || [];

const form = document.getElementById("patientForm");

// SAVE PATIENT DATA
function savePatients() {
    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );
}

// CREATE AND UPDATE
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const patient = {
        patientId: document.getElementById("patientId").value.trim(),
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        bloodGroup: document.getElementById("bloodGroup").value
    };

    const editIndex =
        document.getElementById("editIndex").value;

    if (editIndex === "") {

        // CREATE OPERATION
        const exists = patients.some(p =>
            p.patientId.toLowerCase() ===
            patient.patientId.toLowerCase()
        );

        if (exists) {
            alert("Patient ID already exists!");
            return;
        }

        patients.push(patient);
        alert("Patient added successfully!");

    } else {

        // UPDATE OPERATION
        const index = Number(editIndex);

        const duplicate = patients.some((p, i) =>
            i !== index &&
            p.patientId.toLowerCase() ===
            patient.patientId.toLowerCase()
        );

        if (duplicate) {
            alert("Patient ID already exists!");
            return;
        }

        patients[index] = patient;
        alert("Patient updated successfully!");
    }

    savePatients();
    resetForm();
    displayPatients();
});

// READ OPERATION
function displayPatients() {

    const patientList =
        document.getElementById("patientList");

    const search =
        document.getElementById("search")
        .value.toLowerCase();

    patientList.innerHTML = "";

    patients.forEach((patient, index) => {

        const searchableText =
            Object.values(patient).join(" ").toLowerCase();

        if (!searchableText.includes(search)) {
            return;
        }

        const row = document.createElement("tr");

        const values = [
            patient.patientId,
            patient.name,
            patient.age,
            patient.gender,
            patient.phone,
            patient.bloodGroup
        ];

        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.onclick = () => editPatient(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.onclick = () => deletePatient(index);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);
        patientList.appendChild(row);
    });
}

// UPDATE OPERATION - LOAD PATIENT DATA
function editPatient(index) {

    const patient = patients[index];

    document.getElementById("patientId").value =
        patient.patientId;

    document.getElementById("name").value =
        patient.name;

    document.getElementById("age").value =
        patient.age;

    document.getElementById("gender").value =
        patient.gender;

    document.getElementById("phone").value =
        patient.phone;

    document.getElementById("bloodGroup").value =
        patient.bloodGroup;

    document.getElementById("editIndex").value = index;

    document.getElementById("formTitle").textContent =
        "Update Patient Details";

    document.getElementById("submitBtn").textContent =
        "Update Patient";

    document.getElementById("cancelBtn").hidden = false;

    window.scrollTo(0, 0);
}

// DELETE OPERATION
function deletePatient(index) {

    if (confirm("Are you sure you want to delete this patient?")) {

        patients.splice(index, 1);

        savePatients();
        displayPatients();

        alert("Patient deleted successfully!");
    }
}

// RESET FORM
function resetForm() {

    form.reset();

    document.getElementById("editIndex").value = "";

    document.getElementById("formTitle").textContent =
        "Add New Patient";

    document.getElementById("submitBtn").textContent =
        "Add Patient";

    document.getElementById("cancelBtn").hidden = true;
}

// DISPLAY EXISTING PATIENTS
displayPatients();
