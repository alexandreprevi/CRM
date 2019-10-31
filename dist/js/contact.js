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

contactList.addEventListener("click", function (contact) {

    if (contact.target.classList.contains("contact-name")) {
        contactList.style.display = "none";
        contactHeader.style.display = "none";
        contactDetails.style.display = "flex";
        contactEventsDisplay.style.display = "none";
        contactNotesDisplay.style.display = "none";

        document.getElementById("contact-display-name").innerHTML = contact.target.innerHTML;
    }
})


backBtn.addEventListener("click", function () {
    contactList.style.display = "flex";
    contactHeader.style.display = "flex";
    contactDetails.style.display = "none";
});

infoBtn.addEventListener("click", function () {
    contactInfoDisplay.style.display = "flex";
    contactEventsDisplay.style.display = "none";
    contactNotesDisplay.style.display = "none";
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