let note = document.getElementById("note");

document.addEventListener("click", clickrelated)

function clickrelated(event) {

	if (event.target.value != null) {

		let checked = document.querySelectorAll("input[type='checkbox']");

		checked.forEach(ch => ch.addEventListener("change", eventhandling));
	}

	function eventhandling(event) {


		for (let li = 0; li < note.children.length; li++) {
			 

			if (note.children[li].children[0].checked) {

				let thetarget = document.getElementById("item" + li);
				thetarget.style.setProperty("text-decoration", "line-through");

			} else {
				let thetarget = document.getElementById("item" + li);
				thetarget.style.setProperty("text-decoration", "none"); 
			}
		}

	}

}
document.addEventListener("DOMContentLoaded", content)

function content( ) {
		
		let button = document.querySelectorAll("a");
		button.forEach(btn => btn.addEventListener("click", addcontent));
	
	function addcontent(event) {

		let inputfromhtml = document.getElementById("text2note");
		if (event.target.textContent == "add" && inputfromhtml.value != "") {
			document.getElementById("dialog-box").style.display = "none";
			document.getElementById("dialog-overlay").style.display = "none";

			let inputfromhtml = document.getElementById("text2note");


			let checkbox = document.createElement("input");
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("value", "item" + note.children.length);
			let listitem = document.createElement("li");
			listitem.setAttribute("id", "item" + note.children.length);

			listitem.textContent += inputfromhtml.value;
			listitem.appendChild(checkbox);
			note.appendChild(listitem);
			inputfromhtml.value = "";
		} else if (inputfromhtml.value == "" && event.target.textContent != "Edit") {
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