class Calendar {
    constructor() {
        this.events = [];
    } 
    renderWeek() {	
        date.setDate(1);

        let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let prevDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        let nextDate = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();

		
		
        let cells = "";
        let beyondthismonth = 0;
        for(let helper = 3; helper > 0; helper--){
            if(today.getDate() - helper > 0){
                
                let collect = String(today.getDate() - helper);

                cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth() + 1}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;
            } else if(today.getDate() - helper <= 0){
                
                let collect = String( prevDate- beyondthismonth);
                cells += `<div class="day prev-month ${date.getFullYear()}-${date.getMonth()}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;

                beyondthismonth++;
            }

        }
        cells += `<div class="day current-month selected ${date.getFullYear()}-${date.getMonth() + 1}-${todaysdate}">${today.getDate()}<span class=''></span></div>`;
        
        for(let helper = 1; helper < 4; helper++){
            if(today.getDate() + helper <= endDate){
                
                let collect = String(today.getDate()+helper);
                cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth() + 1}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;
            } else if(today.getDate() + helper > endDate){
                
                let collect = String(nextDate - nextDate + beyondthismonth);
                cells += `<div class="day next-month ${date.getFullYear()}-${date.getMonth() + 2}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;
                beyondthismonth++;
            }
        }

        console.log(myCalendar);
        
        document.getElementsByClassName("aWeek")[0].innerHTML = cells;

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

}

document.addEventListener("click", clickrelated)
// handles to-do list, striike and delete
function clickrelated(event) {

	if (event.target.value != null) {

		let checked = document.querySelectorAll("input[type='checkbox']");		
		checked.forEach(ch => ch.addEventListener("change", striketodolistitem));
		let listitem = document.querySelectorAll("li");
		listitem.forEach(li => li.addEventListener("click", deletetodolistitem));
	}

	function striketodolistitem() {	//stryker och tar bort strike
		for (let li = 0; li < todolist.children.length; li++) {
			
			if (todolist.children[li].children[0].checked) {

				let thetarget = document.getElementById(li+1);
				thetarget.style.setProperty("text-decoration", "line-through");

			} else {
				let thetarget = document.getElementById(li+1);
				thetarget.style.setProperty("text-decoration", "none"); 
			}
		}

	}

	function deletetodolistitem(event){

		for(let filter = 0; filter < todolist.children.length; filter++){

			if(todolist.children[filter] == event.target){
				todolist.removeChild(todolist.children[filter]);
				
				localStorage.removeItem(event.target.id);
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", content)
// adds content to list
function content( ) {
		
		let button = document.querySelectorAll("a");
		button.forEach(btn => btn.addEventListener("click", addcontent2list));
	
	function addcontent2list(event) { // add content to list.

		let inputfromhtml = document.getElementById("text2todolist");

		if (event.target.textContent == "add" && inputfromhtml.value != "") {
			document.getElementById("dialog-box").style.display = "none";
			document.getElementById("dialog-overlay").style.display = "none";

			let inputfromhtml = document.getElementById("text2todolist");

			let checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("value", Number(todolist.children.length)+1);
			let listitem = document.createElement("li");
			listitem.setAttribute("id", Number(todolist.children.length)+1);

			listitem.textContent = inputfromhtml.value + " [X]";
			listitem.appendChild(checkbox);
			todolist.appendChild(listitem);

			localStorage.setItem(todolist.children.length, inputfromhtml.value)
			inputfromhtml.value = "";
		} else if (inputfromhtml.value == "" && event.target.textContent == "add") {
			alert("Add a comment, por favor");
		} else if (event.target.textContent == "Edit") {

			document.getElementById("dialog-box").style.display = "block";
			document.getElementById("dialog-overlay").style.display = "block";
		}
	}
}

$(document).ready(function () {

	// if user clicked on button, the overlay layer or the dialogbox, close the dialog	
	$('a.btn-ok, #dialog-overlay').click(function () {
		$('#dialog-overlay, #dialog-box').hide();

		return false;
	});

	// if user resize the window, call the same function again
	// to make sure the overlay fills the screen and dialogbox aligned to center	
	$(window).resize(function () {

		//only do it if the dialog box is not hidden
		if (!$('#dialog-box').is(':hidden')) popup();
	});


});

//Popup dialog
function popup(message) {

	// get the screen height and width  
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();

	// calculate the values for center alignment
	var dialogTop = (maskHeight / 3) - ($('#dialog-box').height());
	var dialogLeft = (maskWidth / 2) - ($('#dialog-box').width() / 2);

	// assign values to the overlay and dialog box
	$('#dialog-overlay').css({
		height: maskHeight,
		width: maskWidth
	}).show();
	$('#dialog-box').css({
		top: dialogTop,
		left: dialogLeft
	}).show();

	// display the message
	$('#dialog-message').html(message);

}
// handles events, notifications and to-dolist
async function fetchitems(filter){

	let eventresponse = await fetch('https://www.5daef5cbf2946f001481d066.mockapi.io/events');
	let eventJson = await eventresponse.json();
 	
	var myevents = [];
	
	var savedata = [],
        keys = Object.keys(localStorage),
        i = keys.length;
		if(filter == null){
    while ( i-- ) {
        savedata.push( localStorage.getItem(keys[i]) );
	}
	localStorage.clear();
}
	

	var longintervals = [];
	let formatted = today.getFullYear()+"-";
	let month = today.getMonth()+1;
	
	if(month.length == 1){
		formatted += 0 + month;
	} else {
		formatted += month;
	}
	formatted += "-"+ todaysdate;
	let peeps = {};
	// Filters events shown and fills an object for notfications
	for(let a of eventJson){
		if(contactInterval(a.date)<peeps[a.contact] || peeps[a.contact] == null){
		peeps[a.contact] = contactInterval(a.date);
		}
		let collectdays = contactInterval(a.date);
		
	  if(filter != null){
		if(filter.contains(a.date))
		myevents.push(a.startTime + ": " + a.title + " with " + a.contact + " in " + a.place);
	  } else {
		if(formatted == a.date)
	  		myevents.push(a.startTime + ": " + a.title + " with " + a.contact + " in " + a.place);
	}
	}
	// Filters what to show in notifications
	for(let prop in peeps){
		
		if(peeps[prop] >= 20){
			longintervals.push("You have not contacted " + prop + " for " + peeps[prop] +" days!");
		}
	}

	for(let add = 0; add<savedata.length; add++){
			console.log("i happen")
			let checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("value", Number(todolist.children.length)+1);
			let listitem = document.createElement("li");
			listitem.setAttribute("id", Number(todolist.children.length)+1);

			listitem.textContent = savedata[add] + " [X]";
			listitem.appendChild(checkbox);
			todolist.appendChild(listitem);

			localStorage.setItem(add+1, savedata[add])
	}
	
	myevents.sort();
	document.getElementById("notifications").value = longintervals.join("\n");
	events.value = myevents.join("\n");
}
// Function to show how many days are left or passed since contact
function contactInterval(datecontacted){
	let year = datecontacted.substring(0,4);
	let month = datecontacted.substring(5, 7);
	let date = datecontacted.substring(8, 10);
	
	let testdate = new Date(year, month-1, date);
	let time = today - testdate;
	let time2days = time /(1000 * 60 * 60 * 24);
	if (time2days < 0){
		time2days = time2days/-1;
	}
	return Math.round(time2days);
}

let events = document.getElementById("events");
let today = new Date();
let todaysdate = String(today.getDate()); 
		if(todaysdate.length==1){
			todaysdate = "0"+ String(today.getDate()); 
		}
let todolist = document.getElementById("todolist");

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

myCalendar.renderWeek();
fetchitems();

let days = document.getElementById("aWeek");
let daysDisplayed = document.getElementsByClassName("day");

days.addEventListener("click", function (e) {
	fetchitems(event.target.classList);
	
	for (day of daysDisplayed) {
		day.classList.remove("selected");
	}
	e.target.classList.add("selected");
});

let today_date = new Date();
console.log(today_date.toDateString());

document.getElementById("date-today").innerHTML = today_date.toDateString();

