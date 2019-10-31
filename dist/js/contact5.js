class ContactList {
  constructor() {
    this.contacts = [];
    this.contactDetails = [];
    this.contact_id = 0;
  }

  addContact(companyName, companyWeb, companyAddress, firstName,lastName, tel, email) {
    this.contact_id++;
    var contact = new ContactItem(companyName, companyWeb, companyAddress, firstName,lastName, tel, email,this.contact_id);
    this.contacts.push(contact);
    this.render();
  }


  // fill contact list to contact area
  render() {
    var contactList = document.getElementById("contacts_area");
    contactList.innerHTML = "";
    let sortedcontactlist = this.contacts.sort(compare); //sort object in array function compare located at the end of code

    for (let currentContact of sortedcontactlist) {
      var contactName = document.createElement("p");
      contactName.id = "contactName-" + currentContact.id;
      contactName.class = "contactName";
      contactName.innerHTML = currentContact.companyName + " - " + currentContact.firstName +" " +currentContact.lastName;

      contactList.appendChild(contactName);

      //add click EventListener to each item on the contact list, when click on it, will show details of that contact
      contactName.addEventListener('click', function() {
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
    var contactPage = document.getElementById("contact_page");
    contactPage.innerHTML = "";

    var buttonBack = document.createElement("button");
    buttonBack.id = "buttonBack-" + contact_index;
     var buttonEdit = document.createElement("button");
     buttonEdit.id = "buttonEdit-" + contact_index;
     var buttonDelete = document.createElement("button");
     buttonDelete.id = "buttonDelete-" + contact_index;

     buttonBack.innerHTML="&LT;Contacts"
     buttonEdit.innerHTML="Edit";
     buttonDelete.innerHTML="Delete";

     buttonBack.addEventListener("click",function(){
       contact_page.style.display="none";
       contacts_area.style.display="inline-block";
     });

     /* =====doesn't work as I wanted
     buttonEdit.addEventListener("click",function(){
       contact_page.style.display="none";
       addNewContact.style.display = "inline";
       document.getElementById(company_name).value=this.contacts[contact_index].companyName;
       document.getElementById(company_web).value=this.contacts[contact_index].companyWeb;
       document.getElementById(company_address).value=this.contacts[contact_index].companyAddress;
       document.getElementById(first_name).value=this.contacts[contact_index].firstName;
       document.getElementById(last_name).value=this.contacts[contact_index].lastName;
       document.getElementById(tel).value=this.contacts[contact_index].tel;
       document.getElementById(email).value=this.contacts[contact_index].email;
     });
  */
      //var contactDetails = document.getElementById("contactDetails");
      //contactDetails.innerHTML = "";

      var contactDiv = document.createElement("div");
      contactDiv.id = "contact-" + contact_index;

      var companyName = document.createElement("p");
      companyName.id = "companyName-" + contact_index;
      var companyWeb = document.createElement("p");
      companyWeb.id = "companyWeb-" + contact_index;
      var companyAddress = document.createElement("p");
      companyAddress.id = "companyAddress-" + contact_index;
      var firstName = document.createElement("p");
      firstName.id = "firstName-" + contact_index;
      var lastName = document.createElement("p");
      lastName.id = "lastName-" + contact_index;
      var tel = document.createElement("p");
      tel.id = "tel-" + contact_index;
      var email = document.createElement("p");
      email.id = "email-" + contact_index;

      companyName.innerHTML = "Company Name: " + this.contacts[contact_index].companyName;
      companyWeb.innerHTML = "Company Website: " + this.contacts[contact_index].companyWeb;
      companyAddress.innerHTML = "Company Address: " + this.contacts[contact_index].companyAddress;
      firstName.innerHTML = "First name: " + this.contacts[contact_index].firstName;
      lastName.innerHTML = "Last name: " + this.contacts[contact_index].lastName;
      tel.innerHTML = "PhoneNumber: " + this.contacts[contact_index].tel;
      email.innerHTML = " Email: " + this.contacts[contact_index].email;

      contactDiv.appendChild(companyName);
      contactDiv.appendChild(companyWeb);
      contactDiv.appendChild(companyAddress);
      contactDiv.appendChild(firstName);
      contactDiv.appendChild(lastName);
      contactDiv.appendChild(tel);
      contactDiv.appendChild(email);

      contactPage.appendChild(buttonBack);
      contactPage.appendChild(buttonEdit);
      contactPage.appendChild(buttonDelete);

      contactPage.appendChild(contactDiv);
  }
}

class ContactItem {
  constructor(companyName = "", companyWeb = "", companyAddress = "", firstName = "",lastName = "", tel = "", email = "", id) {
    this.companyName = companyName;
    this.companyWeb = companyWeb;
    this.companyAddress = companyAddress;
    this.firstName = firstName;
    this.lastName =lastName;
    this.tel = tel;
    this.email = email;
    this.id = id;
  }
}

var contact_list = new ContactList();
var addNewContact = document.getElementById("addNewContact");
var contacts_area = document.getElementById("contacts_area");
var contact_page = document.getElementById("contact_page");

document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById("btn_addContact").addEventListener("click", function(e) {
    addNewContact.style.display = "inline";
  });

  document.getElementById("btn_addContact_confirm").addEventListener("click", function(e) {
    var company_name = document.getElementById("company_name").value;
    var company_web = document.getElementById("company_web").value;
    var company_address = document.getElementById("company_address").value;
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("email").value;
    addNewContact.style.display = "none";
    contact_list.addContact(company_name, company_web, company_address, first_name, last_name, tel, email);
    additem();
  });
  document.getElementById("btn_addContact_cancel").addEventListener("click", function(e) {
    addNewContact.style.display = "none";
  });
});

// MockiAPI
$.get("http://5daef5cbf2946f001481d066.mockapi.io/contacts", function(data){
   for (let contact of data){
       contact_list.contacts.push(contact);
   }
   contact_list.render();
});

function additem(){
    $.ajax({
  method: "POST",
  url: "http://5daef5cbf2946f001481d066.mockapi.io/contacts",
  data: {
  companyName: document.getElementById("company_name").value,
  companyWeb: document.getElementById("company_web").value,
  companyAddress: document.getElementById("company_address").value,
  firstName:document.getElementById("first_name").value,
  lastName: document.getElementById("last_name").value,
  tel:  document.getElementById("tel").value,
  email: document.getElementById("email").value
  }
})
  .done(function( msg ) {
    console.log( msg );
  });
}



// this function is to sort contact list alphabetically, will call this function inside render();
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const companyA = (a.companyName.toUpperCase()+" - "+a.firstName.toUpperCase() +a.lastName.toUpperCase());
  const companyB = (b.companyName.toUpperCase()+" - "+b.firstName.toUpperCase() +b.lastName.toUpperCase());
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
  contacts_area.style.display = "none";
  contact_page.style.display="inline";
}

// contact list page -search funtion
document.getElementById("searchbar").addEventListener("keyup", search_contact);
function search_contact() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementById("contacts_area")

    for (let i = 0; i <x.children.length; i++) {
        if (!x.children[i].innerHTML.toLowerCase().includes(input)) {
            x.children[i].style.display="none";
        }
        else {
            x.children[i].style.display="inline";
        }
    }
}
