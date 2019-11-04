class Calendar {
  constructor() {
    this.events = [];
    this.contacts = [];
    this.todo = [];
  }

  renderDate() {

    date.setDate(1);

    let day = date.getDay();
    let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    let prevDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    let today = new Date();

    document.getElementById("month").innerHTML = months[date.getMonth()];
    document.getElementById("date-str").innerHTML = today.toDateString();

    let cells = "";

    for (let i = day; i > 0; i--) {
      cells += "<div class='prev-date day'>" + (prevDate - i + 1) + "<span class=''></span>" + "</div>";
    }

    // Create one div for each day
    for (let i = 1; i <= endDate; i++) {

      if (i == today.getDate() && date.getMonth() == today.getMonth()) {

        i = i.toString();
        cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth() + 1}-${i.length == 1 ? '0' + i : i} today">${i}<span class=''></span></div>`;
      } else {

        i = i.toString();
        cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth() + 1}-${i.length == 1 ? '0' + i : i}">${i}<span class=''></span></div>`;
      }
    }

    console.log(myCalendar);

    document.getElementsByClassName("days")[0].innerHTML = cells;

    let currentDaysArray = Array.from(document.getElementsByClassName("current-month"));

    // Check for event in myCalendar.event. print a dot.

    for (let i = 0; i < myCalendar.events.length; i++) {

      //  Get the date

      for (let j = 0; j < currentDaysArray.length; j++) {

        if (currentDaysArray[j].classList.contains(myCalendar.events[i].date)) {
          currentDaysArray[j].classList.add("eventToday");
        }
      }
    }
  }

  renderEventList() {
    const eventList = document.getElementById("event-list");
    let eventArray = [];
    for (let i = 0; i < myCalendar.events.length; i++) {
      eventList.innerHTML = "";

      if (myCalendar.events[i].date == event.target.classList[2]) {

        eventArray.push(myCalendar.events[i]);
      } else {
        eventList.innerHTML = "";
      }

      eventArray.forEach((event) => this.renderThisEvent(event));

      /* for (let i = 0; i < eventArray.length; i++) {
          eventList.innerHTML += eventArray[i].startTime + ": " + eventArray[i].title + "</br>";
      } */
    }
  }


  getInputsEvent() {

    let eventAdded = new Event(title_add.value, place_add.value, date_add.value, startTime_add.value, endTime_add.value, contact_add.value);
    this.events.push(eventAdded);
  }

}


class Event {
  constructor(title, place, date, startTime, endTime, contact = "") {
    this.title = title;
    this.place = place;
    this.date = date;
    this.startTime = startTime;
    this.endTime = endTime;
    this.contact = contact;
    this.id = date.replace(/-/g, "") + startTime.replace(":", "");
  }
}

// ======code from branch LI -contact===========
class ContactList {
  constructor() {
    this.contacts = [];
    this.contactDetails = [];
    this.contact_id = 0;
  }

  addContact(companyName, companyWeb, companyAddress, firstName, lastName, tel, email) {
    this.contact_id++;
    var contact = new ContactItem(companyName, companyWeb, companyAddress, firstName, lastName, tel, email, this.contact_id);
    this.contacts.push(contact);
    this.render();
  }


  // fill contact list to contact area
  render() {
    //var contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
    let sortedcontactlist = this.contacts.sort(compare); //sort object in array function compare located at the end of code

    for (let currentContact of sortedcontactlist) {
      var contactName = document.createElement("p");
      contactName.id = "contact-name-" + currentContact.id;
      contactName.className = "contact-name";
      contactName.innerHTML = currentContact.companyName + " - " + "<span>" + currentContact.firstName + " " + currentContact.lastName + "</span>";
      contactList.appendChild(contactName);
    }
  }

  // fill details of contact to contact-details area
  //chaneg all contact_index to contactId
  render2(contactId) {
    //  var contactDetails = document.getElementById("contact-details");
    //  contactDetails.innerHTML = "";
    //var contactDetailsDisplayInfo=document.getElementById("contact-details-display-info");
    contactDetailsDisplayInfo.innerHTML = "";
    
    var y = contact_list.find(x => x.id === contactId);

    var contactDiv = document.createElement("div");
    contactDiv.id = "contact-" + contactId;

    var companyName = document.createElement("p");
    companyName.id = "companyName-" + contactId;
    var companyWeb = document.createElement("p");
    companyWeb.id = "companyWeb-" + contactId;
    var companyAddress = document.createElement("p");
    companyAddress.id = "companyAddress-" + contactIdx;
    var firstName = document.createElement("p");
    firstName.id = "firstName-" + contactId;
    var lastName = document.createElement("p");
    lastName.id = "lastName-" + contactId;
    var tel = document.createElement("p");
    tel.id = "tel-" + contactId;
    var email = document.createElement("p");
    email.id = "email-" + contactId;
    

    companyName.innerHTML = "<span>Company Name: </span>" + y.companyName;
    companyWeb.innerHTML = "<span>Company Website: </span>" + y.companyWeb;
    companyAddress.innerHTML = "<span>Company Address: </span>" + y.companyAddress;
    firstName.innerHTML = "<span>First name: </span>" + y.firstName;
    lastName.innerHTML = "<span>Last name: </span>" + y.lastName;
    tel.innerHTML = "<span>PhoneNumber: </span>" + y.tel;
    email.innerHTML = "<span>Email: </span>" + y.email;
    /*
    companyName.innerHTML = "<span>Company Name: </span>" + this.contacts[contact_index].companyName;
    companyWeb.innerHTML = "<span>Company Website: </span>" + this.contacts[contact_index].companyWeb;
    companyAddress.innerHTML = "<span>Company Address: </span>" + this.contacts[contact_index].companyAddress;
    firstName.innerHTML = "<span>First name: </span>" + this.contacts[contact_index].firstName;
    lastName.innerHTML = "<span>Last name: </span>" + this.contacts[contact_index].lastName;
    tel.innerHTML = "<span>PhoneNumber: </span>" + this.contacts[contact_index].tel;
    email.innerHTML = "<span>Email: </span>" + this.contacts[contact_index].email;
  */
    contactDiv.appendChild(companyName);
    contactDiv.appendChild(companyWeb);
    contactDiv.appendChild(companyAddress);
    contactDiv.appendChild(firstName);
    contactDiv.appendChild(lastName);
    contactDiv.appendChild(tel);
    contactDiv.appendChild(email);

    contactDetailsDisplayInfo.appendChild(contactDiv);
    
    

    // PRINT EVENTS FOR THIS CONTACT
    /*      for (let i = 0; i < myCalendar.events.length; i++){
            if (myCalendar.events[i].contact == this.contacts[contact_index].firstName + " " + this.contacts[contact_index].lastName ){
                // Print here
                contactEventsDisplay.innerHTML += myCalendar.events[i].date + " " + myCalendar.events[i].startTime + " " + myCalendar.events[i].title+ " " + myCalendar.events[i].place + "</br>";
            }
          }
    */         //changed contact_index to contactId, therefore this.contacts[contact_index] becomes y now. see line 204;
    for (let i = 0; i < myCalendar.events.length; i++) {
      
      if (myCalendar.events[i].contact == y.firstName + " " + y.lastName) {
        // Print here
        
        contactEventsDisplay.innerHTML += myCalendar.events[i].date + " " + myCalendar.events[i].startTime + " " + myCalendar.events[i].title + " " + myCalendar.events[i].place + "</br>";
      }
    }
  }

}

class ContactItem {
  constructor(companyName = "", companyWeb = "", companyAddress = "", firstName = "", lastName = "", tel = "", email = "", id) {
    this.companyName = companyName;
    this.companyWeb = companyWeb;
    this.companyAddress = companyAddress;
    this.firstName = firstName;
    this.lastName = lastName;
    this.tel = tel;
    this.email = email;
    this.id = id;
  }
}


// IMPORT DATA FROM MOCK API ////////////////////////////
let myCalendar = new Calendar();
var contact_list = new ContactList();

$.get("http://5daef5cbf2946f001481d066.mockapi.io/events", function (data) {
  for (let event of data) {
    myCalendar.events.push(event);
  }
});


$.get("http://5daef5cbf2946f001481d066.mockapi.io/contacts", function (data) {
  for (let contact of data) {
    contact_list.contacts.push(contact);
  }
  contact_list.render();
});


function additem() {
  $.ajax({
    method: "POST",
    url: "http://5daef5cbf2946f001481d066.mockapi.io/contacts",
    data: {
      companyName: document.getElementById("company_name").value,
      companyWeb: document.getElementById("company_web").value,
      companyAddress: document.getElementById("company_address").value,
      firstName: document.getElementById("first_name").value,
      lastName: document.getElementById("last_name").value,
      tel: document.getElementById("tel").value,
      email: document.getElementById("email").value
    }
  })
    .done(function (msg) {
      console.log(msg);
    });
}

function deleteitem(id) {
  $.ajax({
    method: "DELETE",
    url: "https://www.5daef5cbf2946f001481d066.mockapi.io/contacts/" + id
  })
    .done(function (msg) {
      console.log(msg);
    });
}

///// = correct========
function edititem(id) {
  $.ajax({

    method: "PUT",
    url: "https://www.5daef5cbf2946f001481d066.mockapi.io/contacts/" + id,
    data: {
      companyName: document.getElementById("company_name").value,
      companyWeb: document.getElementById("company_web").value,
      companyAddress: document.getElementById("company_address").value,
      firstName: document.getElementById("first_name").value,
      lastName: document.getElementById("last_name").value,
      tel: document.getElementById("tel").value,
      email: document.getElementById("email").value

    }
    //  data: JSON.stringify(dataObject),
    //  dataType: 'json',
    //success: function(result) {
    //  alert("success?");
    //}
  }).done(function (msg) {
    console.log(msg);
  });
}
//=======================================================================





let contactList = document.getElementById("contact-list");
let contactHeader = document.getElementById("contact-header");
let addNewContact = document.getElementById("addNewContact");
let contactDetails = document.getElementById("contact-details");

let contacts = document.getElementsByClassName("contact-name");

var searchBar = document.getElementById("searchbar");
var addBtn = document.getElementById("btn_addContact");
var updateBtn = document.getElementById("btn_addContact_update");
var confirmBtn = document.getElementById("btn_addContact_confirm");
var concelBtn = document.getElementById("btn_addContact_cancel");

let contactInfoDisplay = document.getElementById("contact-details-display-info");
let contactEventsDisplay = document.getElementById("contact-details-display-events");
let contactNotesDisplay = document.getElementById("contact-details-display-notes");


let backBtn = document.getElementById("contact-back-button");
let removeBtn = document.getElementById("contact-remove-button");
let editBtn = document.getElementById("contact-edit-button");
let infoBtn = document.getElementById("contact-info-button");
let eventsBtn = document.getElementById("contact-events-button");
let notesBtn = document.getElementById("contact-notes-button");


// start display (event listener on name of contact on the list)
contactList.style.display = "flex";
contactHeader.style.display = "flex";
contactDetails.style.display = "none";

document.addEventListener("click", hehe)
function hehe(event){
  console.log(event.target)
}
// event listeners move to DOMContentLoaded===============
//=============================================================
contactList.addEventListener("click", displayDetails);

function displayDetails(contact) {

  if (contact.target.classList.contains("contact-name")) {
    contactEventsDisplay.innerHTML = "";
    contactList.style.display = "none";
    contactHeader.style.display = "none";
    contactDetails.style.display = "flex";
    contactEventsDisplay.style.display = "none";
    contactNotesDisplay.style.display = "none";

    document.getElementById("contact-display-name").innerHTML = contact.target.innerHTML;
    var nodes = Array.prototype.slice.call(document.getElementById('contact-list').children),
      ref = contact.target;
    //console.log(nodes.indexOf(contact.target).toString());
    //  console.log( nodes.indexOf( ref ));

    console.log(contact.target.id.slice(13));
    var idNumber = contact.target.id.slice(13);
    //showDetails2(idNumber);showDetails(idNumber);
    showDetails2(idNumber);

    removeBtn.addEventListener("click", function () {
      contactList.style.display = "flex";
      contactHeader.style.display = "flex";
      contactDetails.style.display = "none";

      let confirm = window.confirm("Are you sure you want to delete this contact?");

      if (confirm == true) {
        ref.remove();
        deleteitem(idNumber);
      }

    });
    var y = contact_list.contacts.find(x => x.id === idNumber);

    editBtn.addEventListener("click", function () {
      console.log("edit")
      addNewContact.style.display = "flex";
      updateBtn.style.display = "inline";
      confirmBtn.style.display = "none";
      backBtn.style.display = "none";
      removeBtn.style.display = "none";
      editBtn.style.display = "none";
      document.getElementById("contact-display-name").style.display = "none";
      document.getElementById("contact-details").style.display = "none";

      console.log(contact_list.contacts);
      console.log(y);

      document.getElementById("company_name").value = y.companyName;
      document.getElementById("company_web").value = y.companyWeb;
      document.getElementById("company_address").value = y.companyAddress;
      document.getElementById("first_name").value = y.firstName;
      document.getElementById("last_name").value = y.lastName;
      document.getElementById("tel").value = y.tel;
      document.getElementById("email").value = y.email;

    });

    concelBtn.addEventListener("click", function () {
      console.log("cancel")
      addNewContact.style.display = "none";
      backBtn.style.display = "flex";
      removeBtn.style.display = "flex";
      editBtn.style.display = "flex";
    });

    updateBtn.addEventListener("click", function () {
      console.log("update")
      y.companyName = document.getElementById("company_name").value;
      y.companyWeb = document.getElementById("company_web").value;
      y.companyAddress = document.getElementById("company_address").value;
      y.firstName = document.getElementById("first_name").value;
      y.lastName = document.getElementById("last_name").value;
      y.tel = document.getElementById("tel").value;
      y.email = document.getElementById("email").value;

      
      
      edititem(idNumber);  //does not update
      showDetails2(idNumber);
      console.log("I happen")
      document.getElementById("contact-display-name").style.display = "flex";
      document.getElementById("contact-details").style.display = "flex";
      contactInfoDisplay.style.display = "flex";
      addNewContact.style.display = "none";
      backBtn.style.display = "flex";
      removeBtn.style.display = "flex";
      editBtn.style.display = "flex";
      document.getElementById("contact-display-name").innerHTML = y.companyName + " - " + y.firstName + " " + y.lastName;
      ref.innerHTML = y.companyName + " - " + y.firstName + " " + y.lastName;
      //window.location.reload();   /// not sure is good here with reload
    });
  }

  

}



//======================
backBtn.addEventListener("click", function () {
  contactDetails.style.display = "none";
  contactList.style.display = "flex";
  contactHeader.style.display = "flex";
});

eventsBtn.addEventListener("click", function () {
  contactInfoDisplay.style.display = "none";
  contactEventsDisplay.style.display = "flex";
  contactNotesDisplay.style.display = "none";
  

  eventsBtn.classList.add("active");
  infoBtn.classList.remove("active");
  notesBtn.classList.remove("active");
});
notesBtn.addEventListener("click", function () {
  contactInfoDisplay.style.display = "none";
  contactEventsDisplay.style.display = "none";
  contactNotesDisplay.style.display = "flex";

  notesBtn.classList.add("active");
  infoBtn.classList.remove("active");
  eventsBtn.classList.remove("active");
});


infoBtn.addEventListener("click", function (contact) {

  contactInfoDisplay.style.display = "flex";
  contactEventsDisplay.style.display = "none";
  contactNotesDisplay.style.display = "none";
  displayDetails(contact);
  //showDetails(nodes.indexOf(contact).toString());
  //showDetails(contact);
  infoBtn.classList.add("active");
  notesBtn.classList.remove("active");
  eventsBtn.classList.remove("active");
});


document.addEventListener("DOMContentLoaded", function (event) {
  addBtn.addEventListener("click", function (e) {
    addNewContact.style.display = "inline";
    updateBtn.style.display = "none";
    confirmBtn.style.display = "inline";
    contactList.style.display = "none";

    document.getElementById("company_name").value = "";
    document.getElementById("company_web").value = "";
    document.getElementById("company_address").value = "";
    document.getElementById("first_name").value = "";
    document.getElementById("last_name").value = "";
    document.getElementById("tel").value = "";
    document.getElementById("email").value = "";

  });

  confirmBtn.addEventListener("click", function (e) {
    var company_name = document.getElementById("company_name").value;
    var company_web = document.getElementById("company_web").value;
    var company_address = document.getElementById("company_address").value;
    var first_name = document.getElementById("first_name").value;
    var last_name = document.getElementById("last_name").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("email").value;
    addNewContact.style.display = "none";
    contactList.style.display = "flex";
    contact_list.addContact(company_name, company_web, company_address, first_name, last_name, tel, email);
    additem();
    //location.reload(true);
    window.location.reload();
  });
  concelBtn.addEventListener("click", function (e) {
    addNewContact.style.display = "none";
    contactList.style.display = "flex";
  });

});


// this function is to sort contact list alphabetically, will call this function inside render();
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const companyA = (a.companyName.toUpperCase() + " - " + a.firstName.toUpperCase() + a.lastName.toUpperCase());
  const companyB = (b.companyName.toUpperCase() + " - " + b.firstName.toUpperCase() + b.lastName.toUpperCase());
  let comparison = 0;
  if (companyA > companyB) {
    comparison = 1;
  } else if (companyA < companyB) {
    comparison = -1;
  }
  return comparison;
}

// this function is to show details of contact on the contact-list
function showDetails2(contactId) {
  //  var contactInfoDisplay=document.getElementById("contact-details-display-info");
  contactInfoDisplay.innerHTML = "";
  var y = contact_list.contacts.find(x => x.id === contactId);
  console.log(contact_list.contacts);
  console.log(y);

  var contactDiv = document.createElement("div");
  contactDiv.id = "contact-" + contactId;

  var companyName = document.createElement("p");
  companyName.id = "companyName-" + contactId;
  var companyWeb = document.createElement("p");
  companyWeb.id = "companyWeb-" + contactId;
  var companyAddress = document.createElement("p");
  companyAddress.id = "companyAddress-" + contactId;
  var firstName = document.createElement("p");
  firstName.id = "firstName-" + contactId;
  var lastName = document.createElement("p");
  lastName.id = "lastName-" + contactId;
  var tel = document.createElement("p");
  tel.id = "tel-" + contactId;
  var email = document.createElement("p");
  email.id = "email-" + contactId;

  companyName.innerHTML = "<span>Company Name: </span>" + y.companyName;
  companyWeb.innerHTML = "<span>Company Website: </span>" + y.companyWeb;
  companyAddress.innerHTML = "<span>Company Address: </span>" + y.companyAddress;
  firstName.innerHTML = "<span>First name: </span>" + y.firstName;
  lastName.innerHTML = "<span>Last name: </span>" + y.lastName;
  tel.innerHTML = "<span>PhoneNumber: </span>" + y.tel;
  email.innerHTML = "<span>Email: </span>" + y.email;

  contactDiv.appendChild(companyName);
  contactDiv.appendChild(companyWeb);
  contactDiv.appendChild(companyAddress);
  contactDiv.appendChild(firstName);
  contactDiv.appendChild(lastName);
  contactDiv.appendChild(tel);
  contactDiv.appendChild(email);

  contactInfoDisplay.appendChild(contactDiv);

  // PRINT EVENTS FOR THIS CONTACT
  for (let i = 0; i < myCalendar.events.length; i++) {
    if (myCalendar.events[i].contact == y.firstName + " " + y.lastName) {
      // Print here
      contactEventsDisplay.innerHTML += myCalendar.events[i].date + " " + myCalendar.events[i].startTime + " " + myCalendar.events[i].title + " " + myCalendar.events[i].place + "</br>";
    }
  }


}

// contact list page -search funtion
searchBar.addEventListener("keyup", search_contact);

function search_contact() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.getElementById("contact-list")

  for (let i = 0; i < x.children.length; i++) {
    if (!x.children[i].innerHTML.toLowerCase().includes(input)) {
      x.children[i].style.display = "none";
    } else {
      x.children[i].style.display = "inline";
    }
  }
}
