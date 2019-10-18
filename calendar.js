class Calendar {
    constructor() {
        this.events = [];
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

    renderThisEvent(event){
        const eventList = document.getElementById("event-list");
        const row = document.createElement("row");
        row.id = event.id;
        row.innerHTML = `${event.startTime} ${event.title} <a class="delete-button">X</a></br>`;
        eventList.appendChild(row);

    }

    deleteEvent(el){
        if (el.classList.contains("delete-button")){

            // Remove event from the list
            let confirm = window.confirm("Are you sure you want to delete this event?");

            if (confirm == true){
                el.parentElement.remove();
                
                // remove event from myCalendar.events after confirmation alert
                myCalendar.events.forEach((event) => {
                    if (el.parentElement.id == event.id){
                        // remove the event from the calender.event array with the id of the event
                        let eventToRemove = myCalendar.events.map(function(item) {return item.id}).indexOf(event.id);
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
        this.id = date.replace(/-/g,"")+startTime.replace(":","");
    }

}

let myCalendar = new Calendar();
let date = new Date();

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let days = document.getElementById("days");

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

// Event listener on days
days.addEventListener("click", function (dayPressed) {

    // display modal if clicked on day div
    dayPressed.target.classList.contains("days") ? modal.style.display = "none" : modal.style.display = "flex";

    // get date clicked
    let dateModal = document.getElementById("date-modal");

    // check if it is previous month
    dayPressed.target.classList.contains("prev-date") ? currentMonth = months[(date.getMonth() - 1)] : currentMonth = months[date.getMonth()];

    // display date on top right corner Modal
    dateModal.innerHTML = dayPressed.target.innerHTML + " " + currentMonth.substring(0, 3);

    // display the events of this day
    myCalendar.renderEventList();
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    myCalendar.renderDate();
});

// Opening the event form window
addEventButton.addEventListener("click", function () {
    modalAdd.style.display = "flex";
});

// Cancel adding an event to the calendar
cancelButton.addEventListener("click", function () {
    modalAdd.style.display = "none";
});

// Adding an event to the calendar
confirmAddEvent.addEventListener("click", function () {
    modalAdd.style.display = "none";
    myCalendar.getInputsEvent();
});

// Remove an event from the event-list
document.getElementById("event-list").addEventListener("click", (e) => {
    myCalendar.deleteEvent(e.target);
});

// Move the previous or next month on the calendar
function moveDate(para) {
    if (para == 'prev') {
        date.setMonth(date.getMonth() - 1);
    } else if (para == 'next') {
        date.setMonth(date.getMonth() + 1);
    }
    myCalendar.renderDate();

}