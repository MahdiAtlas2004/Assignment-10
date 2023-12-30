function addContact() {
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var textarea = document.getElementById('textarea').value;
    if (name && email) {
        var contact = {
            name: name,
            lastName: lastName,
            email: email,
            phone: phone,
            textarea: textarea,
            createdAt: new Date().getTime()
        };
        var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        displayContacts();
        clearInputFields();
    } else {
        alert('Please enter both name and email');
    }
}

function displayContacts() {
    var contactList = document.querySelector('.contact');
    contactList.innerHTML = '';
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    contacts.sort((a, b) => a.createdAt - b.createdAt);
    contacts.forEach(function (contact, index) {
        var contactDiv = document.createElement('div');
        contactDiv.className = 'item';

        contactDiv.innerHTML = `
            <div class="line">
                <span class="before">First Name: </span>
                <span class="fn">${contact.name}</span>
                <hr>
            </div>
            <div class="line">
                <span class="before">Last Name: </span>
                <span class="ln">${contact.lastName}</span>
                <hr>
            </div>
            <div class="line">
                <span class="before">Phone Number: </span>
                <span class="ph">${contact.phone}</span>
                <hr>
            </div>
            <div class="line">
                <span class="before">Email: </span>
                <span class="em">${contact.email}</span>
                <hr>
            </div>
            <div class="line message">
                <span class="before beforemess">Message: </span>
                <span class="mess">${contact.textarea}</span>
                <hr>
            </div>
            <div class="line buttons">
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})">Delete</button>
                <hr>
            </div>
        `;

        contactList.appendChild(contactDiv);
    });
}

function editContact(index) {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var contact = contacts[index];

    var contactDivs = document.getElementsByClassName('item');
    var editedContactDiv = contactDivs[index];
    editedContactDiv.innerHTML = `
        <div class="line">
            <span class="before">First Name: </span>
            <input type="text" class="fn" value="${contact.name}">
            <hr>
        </div>
        <div class="line">
            <span class="before">Last Name: </span>
            <input type="text" class="ln" value="${contact.lastName}">
            <hr>
        </div>
        <div class="line">
            <span class="before">Phone Number: </span>
            <input type="text" class="ph" value="${contact.phone}">
            <hr>
        </div>
        <div class="line">
            <span class="before">Email: </span>
            <input type="text" class="em" value="${contact.email}">
            <hr>
        </div>
        <div class="line message">
            <span class="before beforemess">Message: </span>
            <textarea class="mess">${contact.textarea}</textarea>
            <hr>
        </div>
        <div class="line buttons">
            <button onclick="saveEditedContact(${index})">Save</button>
            <button onclick="cancelEdit()">Cancel</button>
            <hr>
        </div>
    `;
}

function saveEditedContact(index) {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    var editedName = document.querySelector('.fn').value;
    var editedLastName = document.querySelector('.ln').value;
    var editedEmail = document.querySelector('.em').value;
    var editedPhone = document.querySelector('.ph').value;
    var editedTextarea = document.querySelector('.mess').value;

    if (editedName && editedEmail) {
        // Update the contact details in the array
        contacts[index].name = editedName;
        contacts[index].lastName = editedLastName;
        contacts[index].email = editedEmail;
        contacts[index].phone = editedPhone;
        contacts[index].textarea = editedTextarea;

        // Update the local storage
        localStorage.setItem('contacts', JSON.stringify(contacts));

        displayContacts();
        clearInputFields();
    } else {
        alert('Please enter both name and email');
    }
}

function cancelEdit() {
    displayContacts();

    clearInputFields();
}

function deleteContact(index) {
    var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
}