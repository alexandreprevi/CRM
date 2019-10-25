class ContactList {
  constructor() {
    this.contacts = [];
    this.contactDetails = [];
    this.contact_id = 0;
  }

  addContact(companyName, companyWeb, companyAddress, personName, personTel, personEmail) {
    this.contact_id++;
    var contact = new ContactItem(companyName, companyWeb, companyAddress, personName, personTel, personEmail, this.contact_id);
    this.contacts.push(contact);
    this.render();
  }

  // fill contact list to contact area
  render() {
    var list = document.getElementById("contacts_area");
    list.innerHTML = "";
    let sortedcontactlist = this.contacts.sort(compare); //sort object in array function compare located at the end of code

    for (let currentContact of sortedcontactlist) {
      var new_contactName = document.createElement("p");
      new_contactName.id = "new_contactName-" + currentContact.id;
      new_contactName.class = "new_contactName";
      new_contactName.innerHTML = currentContact.companyName + " - " + currentContact.personName;

      list.appendChild(new_contactName);

      //add click EventListener to each item on the contact list, when click on it, will show details of that contact
      new_contactName.addEventListener('click', function() {
        for (let index = 0; index < sortedcontactlist.length; index++) {
          for (let prop in sortedcontactlist[index]) {
            if (currentContact.id == sortedcontactlist[index][prop]) {
              showDetails(index); //showDetails function is located at the end of code
            }
          }
        }
      });
    }
  }

  // fill details of contact to contact_page area
  render2(contact_index) {
    var contact_page = document.getElementById("contact_page");
    contact_page.innerHTML = "";

    var newContactDiv = document.createElement("div");
    newContactDiv.id = "newContact-" + contact_index;

    var contactPageDiv = document.createElement("div");
    contactPageDiv.id = "contactPage-" + contact_index;
    var new_companyName = document.createElement("p");
    new_companyName.id = "new_companyName-" + contact_index;
    var new_companyWeb = document.createElement("p");
    new_companyWeb.id = "new_companyWeb-" + contact_index;
    var new_companyAddress = document.createElement("p");
    new_companyAddress.id = "new_companyAddress-" + contact_index;
    var new_personName = document.createElement("p");
    new_personName.id = "new_personName-" + contact_index;
    var new_personTel = document.createElement("p");
    new_personTel.id = "new_personTel-" + contact_index;
    var new_personEmail = document.createElement("p");
    new_personEmail.id = "new_personEmail-" + contact_index;

    new_companyName.innerHTML = "Company Name: " + this.contacts[contact_index].companyName;
    new_companyWeb.innerHTML = "Company Website: " + this.contacts[contact_index].companyWeb;
    new_companyAddress.innerHTML = "Company Address: " + this.contacts[contact_index].companyAddress;
    new_personName.innerHTML = "Contact's name: " + this.contacts[contact_index].personName;
    new_personTel.innerHTML = "Contact's PhoneNumber: " + this.contacts[contact_index].personTel;
    new_personEmail.innerHTML = "Contact's Email: " + this.contacts[contact_index].personEmail;

    newContactDiv.appendChild(new_companyName);
    newContactDiv.appendChild(new_personName);
    newContactDiv.appendChild(new_companyWeb);
    newContactDiv.appendChild(new_personTel);
    newContactDiv.appendChild(new_companyAddress);
    newContactDiv.appendChild(new_personEmail);

    contact_page.appendChild(newContactDiv);
  }
}

class ContactItem {
  constructor(companyName = "", companyWeb = "", companyAddress = "", personName = "", personTel = "", personEmail = "", id) {
    this.companyName = companyName;
    this.companyWeb = companyWeb;
    this.companyAddress = companyAddress;
    this.personName = personName;
    this.personTel = personTel;
    this.personEmail = personEmail;
    this.id = id;
  }
}

var contact_list = new ContactList();
document.addEventListener("DOMContentLoaded", function(event) {
  var addNewContact = document.getElementById("addNewContact");
  document.getElementById("btn_addContact").addEventListener("click", function(e) {
    addNewContact.style.display = "inline";
  });

  document.getElementById("btn_addContact_confirm").addEventListener("click", function(e) {
    var company_name = document.getElementById("company_name").value;
    var company_web = document.getElementById("company_web").value;
    var company_address = document.getElementById("company_address").value;
    var person_name = document.getElementById("person_name").value;
    var person_tel = document.getElementById("person_tel").value;
    var person_email = document.getElementById("person_email").value;
    addNewContact.style.display = "none";
    contact_list.addContact(company_name, company_web, company_address, person_name, person_tel, person_email);
  });
});

// this function is to sort contact list alphabetically, will call this function inside render();
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const companyA = a.companyName.toUpperCase();
  const companyB = b.companyName.toUpperCase();
  let comparison = 0;
  if (companyA > companyB) {
    comparison = 1;
  } else if (companyA < companyB) {
    comparison = -1;
  }
  return comparison;
}

// this function is to show details of contact on the contact-list, will call this function inside render()
function showDetails(contactId) {
  contact_list.render2(contactId);
}
