class Calendar{
    constructor(){
        this.events = [];
    }

    renderDate(){
    
        date.setDate(1);
        
        let day = date.getDay();
        let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let prevDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        let today = new Date();
        
    
        
        document.getElementById("month").innerHTML = months[date.getMonth()];
        document.getElementById("date-str").innerHTML = today.toDateString();
        
        let cells = "";
    
        for (let i = day; i > 0; i--){ 
            cells += "<div class='prev-date day'>" + (prevDate - i + 1) + "<span class=''></span>" + "</div>";
        }

        // add a "0" in front of numbers from 1 to 9. (with a if)
        // change order to "year - month - day" and get rid of "day".

        for (let i = 1; i <= endDate; i++){
            
            if (i == today.getDate() && date.getMonth() == today.getMonth()){

                i = i.toString();
                cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth()+1}-${i.length == 1 ? '0' + i : i} today">${i}<span class=''></span></div>`;
            } else {
                
                i = i.toString();
                cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth()+1}-${i.length == 1 ? '0' + i : i}">${i}<span class=''></span></div>`;
            }
        }

        
        document.getElementsByClassName("days")[0].innerHTML = cells;
        



        // DISPLAY DOT FOR EVENT

        // check if there is an event.
        // From the date of the event, add a class "eventToday" on the div of this day 
        // on the calender to show a DOT

        // Then go to the modal section and write innerHTMl with the event title, place.. etc


        console.log(myCalendar);
        // add an event class on days with event
        for (let i = 0; i < myCalendar.events.length; i++){
            
        }




        let currentDaysArray = Array.from(document.getElementsByClassName("current-month"));
        

        // check for event
        for (let i = 0; i < currentDaysArray.length; i++){
            if (currentDaysArray[i].classList.contains("eventToday")){
                currentDaysArray[i].classList.add("dot");
            }
        }
        
    }

}


class Event{
    constructor(title, place, date, startTime, endTime, contact = ""){
        this.title = title;
        this.place = place;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
        this.contact = contact;
    }

    getEvent(){
      //  return `${this.startTime}: ${this.title} at ${this.place}`;
      console.log(date_add.value, startTime_add.value);
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



// MODAL show events
let modal = document.getElementById("modal-calender");
let modalAdd = document.getElementById("modal-add");
let closeModal = document.getElementById("close-modal");
let addEventButton = document.getElementById("add-event-button");

// MODAL add events
let cancelButton = document.getElementById("cancel-button");
let confirmAddEvent = document.getElementById("confirm-add-event-button");
let title_add = document.getElementById("title-add");
let place_add = document.getElementById("place-add");
let date_add = document.getElementById("date-add");
let startTime_add = document.getElementById("start-time-add");
let endTime_add = document.getElementById("end-time-add");
let contact_add = document.getElementById("contact-add");

// Event listener on days
days.addEventListener("click", function(event){


    // display modal if clicked on day div
    event.target.classList.contains("days") ? modal.style.display = "none" : modal.style.display = "flex";

    // get date clicked
    let dateModal = document.getElementById("date-modal");

    // check if it is previous month
    event.target.classList.contains("prev-date") ? currentMonth =  months[(date.getMonth() - 1)] : currentMonth = months[date.getMonth()];
    
    // display date on top right corner Modal
    dateModal.innerHTML = event.target.innerHTML + " " + currentMonth.substring(0, 3);

    // display the events of this day

    let pTest = document.getElementById("test");
    let arrayTest = [];
    for (let i = 0; i < myCalendar.events.length; i++){
        pTest.innerHTML = "";
        if(myCalendar.events[i].date == event.target.classList[2]){
            arrayTest.push(myCalendar.events[i]);
        } else{
            pTest.innerHTML = "";
        }

        for (let i = 0; i < arrayTest.length; i ++){
            pTest.innerHTML += arrayTest[i].startTime + ": " + arrayTest[i].title + "</br>";
        }
    }



    
});

/* // Close modal
closeModal.addEventListener("click", function(){
    modal.style.display = "none";
}) */
window.addEventListener("click", function(event){
    if (event.target == modal){
        modal.style.display = "none";
    }
});

addEventButton.addEventListener("click", function(){
    modalAdd.style.display = "flex";
});
cancelButton.addEventListener("click", function(){
    modalAdd.style.display = "none";
});
confirmAddEvent.addEventListener("click", function(){
    modalAdd.style.display = "none";
    getInputsEvent();
    myCalendar.renderDate();
} );



function getInputsEvent(){

    let eventAdded = new Event(title_add.value, place_add.value, date_add.value, startTime_add.value, endTime_add.value, contact_add.value);
    myCalendar.events.push(eventAdded);
    console.log(myCalendar);
}



function moveDate(para){
    if (para == 'prev'){
        date.setMonth(date.getMonth() - 1);
    } else if (para == 'next'){
        date.setMonth(date.getMonth() + 1);
    }
    myCalendar.renderDate();

}


 