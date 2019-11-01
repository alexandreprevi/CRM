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

    /* renderHistoric(){
        let date = new Date();
        let today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

        const previousEventsTable = document.getElementById("past-events-table");
        const upcomingEventsTable = document.getElementById("upcoming-events-table");

        if (myCalendar.events){
            for (let event of myCalendar.events) {
                let tr = document.createElement("tr");
                tr.innerHTML = `<td>${event.date}</td><td>${event.startTime}</td><td>${event.title}</td><td>${event.contact}</td>`;
                event.date < today ?   previousEventsTable.appendChild(tr) : upcomingEventsTable.appendChild(tr);
            }
        }

    } */

    renderThisEvent(event) {
        const eventList = document.getElementById("event-list");

        const row = document.createElement("row");
        row.id = event.id;
        row.innerHTML = `${event.startTime} ${event.title} <a class="delete-button">X</a></br>`;
        eventList.appendChild(row);


    }

    deleteEvent(el) {
        if (el.classList.contains("delete-button")) {

            // Remove event from the list
            let confirm = window.confirm("Are you sure you want to delete this event?");

            if (confirm == true) {
                el.parentElement.remove();

                // remove event from myCalendar.events after confirmation alert
                myCalendar.events.forEach((event) => {
                    if (el.parentElement.id == event.id) {
                        // remove the event from the calender.event array with the id of the event
                        let eventToRemove = myCalendar.events.map(function (item) { return item.id }).indexOf(event.id);
                        myCalendar.events.splice(eventToRemove, 1);
                    }
                })
            }

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

// IMPORT DATA FROM MOCK API ////////////////////////////

let myCalendar = new Calendar();

$.get("http://5daef5cbf2946f001481d066.mockapi.io/events", function (data) {
    for (let event of data) {
        myCalendar.events.push(event);
    }

});


//////////////////////////////////////////////////////////


/* function filter() {
    let inputFilter = document.getElementById("inputFilter");
    let filter = inputFilter.value.toUpperCase();
    const previousEventsTable = document.getElementById("past-events-table");
    const upcomingEventsTable = document.getElementById("upcoming-events-table");
    let eventsInPreviousEventsTable = previousEventsTable.getElementsByTagName("tr");
    let eventsInUpcomingEventsTable = upcomingEventsTable.getElementsByTagName("tr");

    for (let i = 0; i <eventsInPreviousEventsTable.length; i++){
        let event = eventsInPreviousEventsTable[i];

        if (event) {

            txtValue = event.textContent || event.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                eventsInPreviousEventsTable[i].style.display = "";
            } else {
                eventsInPreviousEventsTable[i].style.display = "none";
            }
        }
    }

    for (let i = 0; i <eventsInUpcomingEventsTable.length; i++){
        let event = eventsInUpcomingEventsTable[i];

        if (event) {

            txtValue = event.textContent || event.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                eventsInUpcomingEventsTable[i].style.display = "";
            } else {
                eventsInUpcomingEventsTable[i].style.display = "none";
            }
        }
    }
}
 */


let contactList = document.getElementById("contact-list");
let contactHeader = document.getElementById("contact-header");
let contactDetails = document.getElementById("contact-details");

let contacts = document.getElementsByClassName("contact-name");

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


// event listeners
contactList.addEventListener("click", displayDetails);
function displayDetails(contact) {

    if (contact.target.classList.contains("contact-name")) {
        contactList.style.display = "none";
        contactHeader.style.display = "none";
        contactDetails.style.display = "flex";
        contactEventsDisplay.style.display = "none";
        contactNotesDisplay.style.display = "none";

        document.getElementById("contact-display-name").innerHTML = contact.target.innerHTML;
        var nodes = Array.prototype.slice.call( document.getElementById('contact-list').children ),
            ref = contact.target;

        console.log( nodes.indexOf( ref ) );
        showDetails(nodes.indexOf(ref).toString());
    }
}

backBtn.addEventListener("click", function () {
    contactList.style.display = "flex";
    contactHeader.style.display = "flex";
    contactDetails.style.display = "none";
});

infoBtn.addEventListener("click", function(contact) {

    contactInfoDisplay.style.display = "flex";
    contactEventsDisplay.style.display = "none";
    contactNotesDisplay.style.display = "none";
    displayDetails(contact)
});

eventsBtn.addEventListener("click", function () {
    contactInfoDisplay.style.display = "none";
    contactEventsDisplay.style.display = "flex";
    contactNotesDisplay.style.display = "none";
});
notesBtn.addEventListener("click", function () {
    contactInfoDisplay.style.display = "none";
    contactEventsDisplay.style.display = "none";
    contactNotesDisplay.style.display = "flex";
});

// ======code from branch LI -contact===========
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
    var contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
    let sortedcontactlist = this.contacts.sort(compare); //sort object in array function compare located at the end of code

    for (let currentContact of sortedcontactlist) {
      var contactName = document.createElement("p");
      contactName.id = "contact-name-" + currentContact.id;
      contactName.className = "contact-name";
      contactName.innerHTML = currentContact.companyName + " - " + currentContact.firstName +" " +currentContact.lastName;
      contactList.appendChild(contactName);
    }
  }

  // fill details of contact to contact-details area
  render2(contact_index) {
  //  var contactDetails = document.getElementById("contact-details");
  //  contactDetails.innerHTML = "";
    var contactDetailsDisplayInfo=document.getElementById("contact-details-display-info");
    contactDetailsDisplayInfo.innerHTML="";

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

      contactDetailsDisplayInfo.appendChild(contactDiv);
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
//var contactList = document.getElementById("contact_list");
//var contactDetails = document.getElementById("contact-details");

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
}

// contact list page -search funtion
document.getElementById("searchbar").addEventListener("keyup", search_contact);
function search_contact() {
    let input = document.getElementById('searchbar').value
    input=input.toLowerCase();
    let x = document.getElementById("contact-list")

    for (let i = 0; i <x.children.length; i++) {
        if (!x.children[i].innerHTML.toLowerCase().includes(input)) {
            x.children[i].style.display="none";
        }
        else {
            x.children[i].style.display="inline";
        }
    }
}
