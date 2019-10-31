class Calendar {
    constructor() {
        this.events = [];
    } 
    renderWeek() {	
        date.setDate(1);

        let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let prevDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        let nextDate = new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();
        let today = new Date();

        let cells = "";
        let woho = 1;
        for(let hehe = 3; hehe > 0; hehe--){
            if(today.getDate() - hehe > 0){
                
                let collect = String(today.getDate() - hehe);

                cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth() + 1}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;
            } else if(today.getDate() - hehe <= 0){
                
                let collect = String(prevDate - prevDate + woho);
                cells += `<div class="day prev-month ${date.getFullYear()}-${date.getMonth()}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;

                woho++;
            }

        }
        cells += `<div class="day selected current-month ${date.getFullYear()}-${date.getMonth() + 1}-${(today.getDate()).length == 1 ? '0' + (today.getDate()) : today.getDate()}">${today.getDate()}<span class=''></span></div>`;
        
        for(let hehe = 1; hehe < 4; hehe++){
            if(today.getDate() + hehe <= endDate){
                
                let collect = String(today.getDate()+hehe);
                cells += `<div class="day current-month ${date.getFullYear()}-${date.getMonth() + 1}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;
            } else if(today.getDate() + hehe > endDate){
                
                let collect = String(nextDate - nextDate + woho);
                cells += `<div class="day next-month ${date.getFullYear()}-${date.getMonth() + 2}-${collect.length == 1 ? '0' + collect : collect}">${collect}<span class=''></span></div>`;
                woho++;
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

				let thetarget = document.getElementById("item" + li);
				thetarget.style.setProperty("text-decoration", "line-through");

			} else {
				let thetarget = document.getElementById("item" + li);
				thetarget.style.setProperty("text-decoration", "none"); 
			}
		}

	}

	function deletetodolistitem(event){

		for(let filter = 0; filter < todolist.children.length; filter++){

			if(todolist.children[filter] == event.target){
				todolist.removeChild(todolist.children[filter]);
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", content)

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
			checkbox.setAttribute("value", "item" + todolist.children.length);
			let listitem = document.createElement("li");
			listitem.setAttribute("id", "item" + todolist.children.length);

			listitem.textContent = inputfromhtml.value + " [X]";
			listitem.appendChild(checkbox);
			todolist.appendChild(listitem);
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

async function fetchitem(filter){
	
	let response = await fetch('https://www.5daef5cbf2946f001481d066.mockapi.io/events');
	let myJson = await response.json();
	var collect = [];

	var longintervals = [];
	let formatted = today.getFullYear()+"-";
	let month = today.getMonth()+1;

	if(month.length == 1){
		formatted += 0 + month;
	} else {
		formatted += month;
	}
	formatted += "-"+ today.getDate();
	
	for(let a of myJson){

		let collectdays = contactInterval(a.date);
		if(collectdays >= 20 || collectdays <= -20){
			longintervals.push("You have not been in touch with " + a.contact + " for " + collectdays + " days!");
		}
	  if(filter != null){
		if(filter.contains(a.date))
		collect.push(a.startTime + ": " + a.title + " with " + a.contact + " in " + a.place);
	  } else {
		if(formatted == a.date)
	  collect.push(a.startTime + ": " + a.title + " with " + a.contact + " in " + a.place);
	}
}
	
	collect.sort();
	document.getElementById("notifications").value = longintervals.join("\n");
	events.value = collect.join("\n");
}

function contactInterval(datecontacted){
	let year = datecontacted.substring(0,4);
	let month = datecontacted.substring(5, 7);
	let date = datecontacted.substring(8, 10);
	
	let testdate = new Date(year, month-1, date);
	let time = today - testdate;
	let time2days = time /(1000 * 60 * 60 * 24);
	if (time2days < 0){
		time2days/-1;
	}
	return Math.round(time2days);
}

let events = document.getElementById("events");
let today = new Date();


fetchitem();

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
let todolist = document.getElementById("todolist");

let days = document.getElementById("aWeek");
let daysDisplayed = document.getElementsByClassName("day");

days.addEventListener("click", function (e) {
	fetchitem(event.target.classList);
	
	for (day of daysDisplayed) {
		day.classList.remove("selected");
	}
	e.target.classList.add("selected");
});

let today_date = new Date();
console.log(today_date.toDateString());

document.getElementById("date-today").innerHTML = today_date.toDateString();

