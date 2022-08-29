/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */
;
(function (global) {
    var Contact = function (first_name, last_name, phone, email) {
        return new Contact.init(first_name, last_name, phone, email);
    };

    Contact.prototype = {
        //default functions
        data: [
            //add data here
        ],
        searchResults: [

        ],
        addNewContact: function (first_name, last_name, phone, email) {
            this.data.push({
                first_name: first_name,
                last_name: last_name,
                phone: phone,
                email: email
            });
            return this;
        },
        save: function () {
            //save to local storage. This isn't hugely necessary

        },
        returnAll: function () {
            return this.data;
        },
        displayData: function () {
            this.log(this.data);
            return this;
        },
        log: function (data) {
            console.log(data);
            return this;
        },
        search: function (searchTerm) {
            if (this.data.length) {
                for (var i = 0; i < this.data.length; i++) {
                    if (this.data[i].name.toLowerCase() === searchTerm.toLowerCase()) {
                        console.error(this.data[i]);
                        this.searchResults.push(this.data[i]);
                    }
                }

                return this.searchResults;
            } else {
                console.log("There are no results");
            }
            return this;
        },
        lastResults: function () {
            return this.searchResults;
        }
    };

    Contact.init = function (first_name, last_name, phone, email) {
        var self = this;
        //set up the address book
        if (first_name || last_name || phone || email) {
            self.addNewContact(first_name || "", last_name || "", phone || "", email || "");
        }

    };

    Contact.init.prototype = Contact.prototype;

    global.Contact = $ab = Contact;
})(window);

if (!window.contactList) {
    window.contactList = $ab();
}

var form = document.getElementById('new_add');
form.addEventListener('submit', function () {
    if (!window.contactList) {
        window.contactList = $ab(form.first_name.value, form.last_name.value, form.phone.value, form.email.value);
    } else {
        contactList.addNewContact(form.first_name.value, form.last_name.value, form.phone.value, form.email.value);
    }

    form.first_name.value = '';
    form.last_name.value = '';
    form.phone.value = '';
    form.email.value = '';

    event.preventDefault();
});

var searchForm = document.getElementById('search_contact');
searchForm.addEventListener('submit', function () {
    var results;
    if (results !== undefined) {
        results = null;
    }
    if (!window.contactList) {
        window.contactList = $ab();
    } else {
        results = contactList.search(searchForm.search.value);
    }
    document.getElementById('result').innerHTML = '';
    if (results.length > 0) {

        for (var i = 0; i < results.length; i++) {
            document.getElementById('result').innerHTML += '<p>First Name:' + results[i].first_name + '<br>Last Name:' + results[i].last_name + '<br>Phone:' + results[i].phone + '<br>Email:' + results[i].email + '</p>';
        }
    } else {
        document.getElementById('result').innerHTML += '<p>There are no results for this name</p>';
    }
    event.preventDefault();
});

document.getElementById('show_contacts').addEventListener('click', function () {
    if (window.contactList) {
        document.getElementById('contacts_display').innerHTML = '';
        var contacts = contactList.returnAll();
        console.log(contacts);
        if (contacts.length > 0) {
            for (var i = 0; i < contacts.length; i++) {
                document.getElementById('contacts_display').innerHTML += '<p>First Name:' + contacts[i].first_name + 'Last Name:' + contacts[i].last_name + '<br>Phone:' + contacts[i].phone + '<br>Email:' + contacts[i].email + '</p>';
            }
        } else {
            document.getElementById('contacts_display').innerHTML += '<dp>You have no contacts.</p>';
        }
    }
    document.getElementById('contacts_display').style.display = 'inline';

    document.getElementById('search-list').style.display = 'none';
    document.getElementById('contact-list').style.display = 'none';
});

document.getElementById('search').addEventListener('click', function () {
    document.getElementById('contact_list').style.display = 'none';
    document.getElementById('search_list').style.display = 'inline';
    document.getElementById('contacts_display').style.display = 'none';
});

document.getElementById('new').addEventListener('click', function () {
    document.getElementById('contacts_display').style.display = 'none';
    document.getElementById('search_list').style.display = 'none';
    document.getElementById('contact_list').style.display = 'inline';
});



