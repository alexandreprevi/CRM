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

    renderHistoric() {
        //
        let sortedEvents = this.events.sort(this.sortHistoric);
        //
        let date = new Date();
        let day = date.getDate().toString();
        if (day.length == 1) {
            day = '0' + day;
        }

        let today = `${date.getFullYear()}-${date.getMonth() + 1}-${day}`;

        const previousEventsTable = document.getElementById("past-events-table");
        const upcomingEventsTable = document.getElementById("upcoming-events-table");

        if (myCalendar.events) {
    
            for (let event of sortedEvents) {
                let tr = document.createElement("tr");
                tr.id = `${event.id}`;
                tr.innerHTML = `<td>${event.date}</td><td>${event.startTime}</td><td>${event.title}</td><td>${event.place}</td><td>${event.contact}</td><td><i class="fas fa-edit edit-button"></i><i class="fas fa-trash-alt delete-button"></i></td>`;
                event.date < today ? previousEventsTable.appendChild(tr) : upcomingEventsTable.appendChild(tr);

            }
        }

    }
    sortHistoric(a, b) {
        // Use toUpperCase() to ignore character casing
        let eventA = (a.date);
        let eventB = (b.date);
        let comparison = 0;
        if (eventA > eventB) {
            comparison = 1;
        } else if (eventA < eventB) {
            comparison = -1;
        }
        return comparison;
    }


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
                el.parentElement.parentElement.remove();

                // remove event from myCalendar.events after confirmation alert
                myCalendar.events.forEach((event) => {
                    if (el.parentElement.parentElement.id == event.id) {
                        // remove the event from the calender.event array with the id of the event
                        let eventToRemove = myCalendar.events.map(function (item) { return item.id }).indexOf(event.id);
                        myCalendar.events.splice(eventToRemove, 1);
                    }
                })

    
                $.ajax({
                    method: "DELETE",
                    url: `http://5daef5cbf2946f001481d066.mockapi.io/events/${el.parentElement.parentElement.id}`
                })
                    .done(function (msg) {
                        console.log(msg);
                    });
            }

        }
    }
    editEvent(el) {

        if (el.classList.contains("edit-button")) {

            modalAdd.style.display = "flex";
            modalAdd.classList.add('open');
            editContact.style.display = "flex";
            confirmAddEvent.style.display = "none";

            editContact.addEventListener("click", function () {
                modalAdd.style.display = "none";
                modalAdd.classList.remove('open');

                $.ajax({
                    method: "PUT",
                    url: `http://5daef5cbf2946f001481d066.mockapi.io/events/${el.parentElement.parentElement.id}`,
                    data: {
                        title: title_add.value,
                        place: place_add.value,
                        date: date_add.value,
                        startTime: startTime_add.value,
                        endTime: endTime_add.value,
                        contact: contact_add.value,
                        id: date_add.value + startTime_add.value
                    }
                })
                    .done(function (msg) {
                        console.log(msg);
                        //////////////////////////////////////////////////////////////////////////////////////// ???????
                        window.location.reload();
                    });


            });


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

class ContactList {
    constructor() {
        this.contacts = [];
        this.contactDetails = [];
        this.contact_id = 0;
    }

    // fill contact list to contact area
    renderDropDown() {
        let selectContactDropDown = document.getElementById("contact-add");
        let sortedcontactlist = this.contacts.sort(compare);

        for (let contact of sortedcontactlist) {
            let currentContact = contact.firstName + " " + contact.lastName;
            selectContactDropDown.add(new Option(currentContact));
        }

    }
}

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

// IMPORT DATA FROM MOCK API ////////////////////////////

let myCalendar = new Calendar();

$.get("http://5daef5cbf2946f001481d066.mockapi.io/events", function (data) {
    for (let event of data) {
        myCalendar.events.push(event);
    }
    myCalendar.renderHistoric();
});

let contact_list = new ContactList();

$.get("http://5daef5cbf2946f001481d066.mockapi.io/contacts", function (data) {
    for (let contact of data) {
        contact_list.contacts.push(contact);
    }
    contact_list.renderDropDown();
});

//////////////////////////////////////////////////////////

// MODAL window with event list
let modal = document.getElementById("modal-calender");
let modalAdd = document.getElementById("modal-add");
let closeModal = document.getElementById("close-modal");
let addEventButton = document.getElementById("add-event-button");

// MODAL window/form to add events
let cancelButton = document.getElementById("cancel-button");
let confirmAddEvent = document.getElementById("confirm-add-event-button");
let title_add = document.getElementById("title-add");
let place_add = document.getElementById("place-add");
let date_add = document.getElementById("date-add");
let startTime_add = document.getElementById("start-time-add");
let endTime_add = document.getElementById("end-time-add");
let contact_add = document.getElementById("contact-add");
let editContact = document.getElementById("edit-add-event-button");

editContact.style.display = "none";




// Cancel adding an event to the calendar
cancelButton.addEventListener("click", function () {
    modalAdd.classList.remove('open');
    modalAdd.style.display = "none";
});

// Adding an event to the calendar
confirmAddEvent.addEventListener("click", function () {
    modalAdd.style.display = "none";
    modalAdd.classList.remove('open');

    myCalendar.getInputsEvent();
});





function filter() {
    let inputFilter = document.getElementById("inputFilter");
    let filter = inputFilter.value.toUpperCase();
    const previousEventsTable = document.getElementById("past-events-table");
    const upcomingEventsTable = document.getElementById("upcoming-events-table");
    let eventsInPreviousEventsTable = previousEventsTable.getElementsByTagName("tr");
    let eventsInUpcomingEventsTable = upcomingEventsTable.getElementsByTagName("tr");

    for (let i = 0; i < eventsInPreviousEventsTable.length; i++) {
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

    for (let i = 0; i < eventsInUpcomingEventsTable.length; i++) {
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



let previousEvents = document.getElementById("prev-events");
let upcomingEvents = document.getElementById("upcoming-events");
previousEvents.style.display = "flex";
upcomingEvents.style.display = "flex";

previousEvents.addEventListener("click", function () {
    /*   upcomingEvents.style.display == "flex" ? upcomingEvents.style.display = "none" : upcomingEvents.style.display = "flex"; */
    if (upcomingEvents.style.display == "flex") {
        upcomingEvents.style.display = "none";
        previousEvents.style.height = "90%";
    } else {
        upcomingEvents.style.display = "flex";
        previousEvents.style.height = "45%";
    }
});

/* upcomingEvents.addEventListener("click", function() {
    previousEvents.style.display == "flex" ? previousEvents.style.display = "none" : previousEvents.style.display = "flex";
}) */

upcomingEvents.addEventListener("click", function () {
    /*   upcomingEvents.style.display == "flex" ? upcomingEvents.style.display = "none" : upcomingEvents.style.display = "flex"; */
    if (previousEvents.style.display == "flex") {
        previousEvents.style.display = "none";
        upcomingEvents.style.height = "90%";
    } else {
        previousEvents.style.display = "flex";
        upcomingEvents.style.height = "45%";
    }
});

document.getElementById("prev-events").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
        myCalendar.editEvent(e.target);
    }
    if (e.target.classList.contains("delete-button")) {
        myCalendar.deleteEvent(e.target);
    }

});

document.getElementById("upcoming-events").addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-button")) {
        myCalendar.editEvent(e.target);
    }
    if (e.target.classList.contains("delete-button")) {
        myCalendar.deleteEvent(e.target);
    }

});
