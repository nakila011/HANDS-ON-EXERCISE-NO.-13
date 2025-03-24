const form = document.getElementById("recordForm");
const tableBody = document.querySelector("#recordTable tbody");
const btnClear = document.getElementById("btnClear");
const btnClearRecords = document.getElementById("btnClearRecords");
const btnSave = document.getElementById("btnSave");
const sortSelect = document.getElementById("sortSelect");

let records = JSON.parse(localStorage.getItem("records")) || [];


function renderTable() {
    tableBody.innerHTML = "";
    
    records.forEach((record, index) => {
        const row = document.createElement("tr");
        
        row.innerHTML = `
            <td>${record.firstName}</td>
            <td>${record.middleName}</td>
            <td>${record.lastName}</td>
            <td>${record.age}</td>
            <td>
                <button onclick="editRecord(${index})">Edit</button>
                <button onclick="deleteRecord(${index})">Delete</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const age = document.getElementById("age").value.trim();

    if (!firstName || !lastName || !age) {
        alert("Please fill in all required fields!");
        return;
    }

  
    const index = form.dataset.index;
    if (index) {
        records[index] = { firstName, middleName, lastName, age };
        delete form.dataset.index;
    } else {
        
        records.push({ firstName, middleName, lastName, age });
    }

    form.reset();
    renderTable();
});


function editRecord(index) {
    const record = records[index];

    document.getElementById("firstName").value = record.firstName;
    document.getElementById("middleName").value = record.middleName;
    document.getElementById("lastName").value = record.lastName;
    document.getElementById("age").value = record.age;

    form.dataset.index = index;  
}


function deleteRecord(index) {
    if (confirm("Are you sure you want to delete this record?")) {
        records.splice(index, 1);
        renderTable();
    }
}


btnClear.addEventListener("click", () => {
    form.reset();
    delete form.dataset.index; 
});


btnClearRecords.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all records?")) {
        records = [];
        renderTable();
    }
});


btnSave.addEventListener("click", () => {
    localStorage.setItem("records", JSON.stringify(records));
    alert("Records saved to local storage!");
});


sortSelect.addEventListener("change", () => {
    const [key, direction] = sortSelect.value.split("-");

    records.sort((a, b) => {
        if (direction === "asc") {
            return a[key].localeCompare(b[key]);
        } else {
            return b[key].localeCompare(a[key]);
        }
    });

    renderTable();
});


window.addEventListener("load", renderTable);
