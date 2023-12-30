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

        // Update the class names to match your HTML
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