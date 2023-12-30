function addContact(){
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