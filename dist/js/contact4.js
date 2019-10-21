class ContactList {
  constructor() {
    this.contacts = [];
    this.contactDetails = [];
    this.contact_id = 0;
  }

  addContact(companyName, companyWeb, companyAddress, personName, personTel, personEmail) {
    //addContact(companyName,personName) {
    this.contact_id++;
    var contact = new ContactItem(companyName, companyWeb, companyAddress, personName, personTel, personEmail, this.contact_id);
    //var list_contact = new ContactName(companyName,personName,this.contact_id);
    this.contacts.push(contact);

    this.render();

  }

  test(x) {
    x = true;
    console.log(x); //true  //true
    return x;
  }

  showDetails(event) {
    
        for (var i = 0; i < this.contacts.length; i++) {
      var currentContact = document.getElementById("new_contactName-" + this.contacts[i].id);
      this.contactDetails = this.contactDetails.filter(function(value, index, arr) {
        return index = i;
      });


//problrm here, can't get value true for currentContact_isClicked by click
              //var currentContact_isClicked = true;
              var currentContact_isClicked = false;
              currentContact.addEventListener("click", function() {
                //currentContact_isClicked = true;
                currentContact_isClicked = this.test(currentContact_isClicked);
                console.log(currentContact_isClicked); //should be true
              });

              if (currentContact_isClicked == true) {
                this.contactDetails.push(this.contacts[i]);
              }

      }
      this.render();
    }

    //render works well ;
    render() {
      var list = document.getElementById("contacts_area");
      list.innerHTML = "";

      for (var currentContact of this.contacts) {
        var newContactDiv = document.createElement("div");
        newContactDiv.id = "newContact-" + currentContact.id;

        var new_contactName = document.createElement("p");
        new_contactName.id = "new_contactName-" + currentContact.id;

        new_contactName.innerHTML = currentContact.companyName + " - " + currentContact.personName;
        //new_contactName.href = "https://nackademin.se";  it works;

        newContactDiv.appendChild(new_contactName);
        list.appendChild(newContactDiv);
        console.log(currentContact.id);
        console.log(new_contactName.innerHTML);
      }

      // need to test how to display details of contact
      var contact_page = document.getElementById("contact_page");
      contact_page.innerHTML = "";

      for (var currentContact of this.contactDetails) {
        var newContactDiv = document.createElement("div");
        newContactDiv.id = "newContact-" + currentContact.id;

        var new_companyName = document.createElement("p");
        new_companyName.id = "new_companyName-" + currentContact.id
        var new_companyWeb = document.createElement("p");
        new_companyWeb.id = "new_companyWeb-" + currentContact.id
        var new_companyAddress = document.createElement("p");
        new_companyAddress.id = "new_companyAddress-" + currentContact.id
        var new_personName = document.createElement("p");
        new_personName.id = "new_personName-" + currentContact.id
        var new_personTel = document.createElement("p");
        new_personTel.id = "new_personTel-" + currentContact.id
        var new_personEmail = document.createElement("p");
        new_personEmail.id = "new_personEmail-" + currentContact.id

        new_companyName.innerHTML = "Company Name: " + currentContact.companyName;
        new_companyWeb.innerHTML = "Company Website: " + currentContact.companyWeb;
        new_companyAddress.innerHTML = "Company Address: " + currentContact.companyAddress;
        new_personName.innerHTML = "Contact's name: " + currentContact.personName;
        new_personTel.innerHTML = "Contact's PhoneNumber: " + currentContact.personTel;
        new_personEmail.innerHTML = "Contact's Email: " + currentContact.personEmail;

        newContactDiv.appendChild(new_companyName);
        newContactDiv.appendChild(new_personName);
        newContactDiv.appendChild(new_companyWeb);
        newContactDiv.appendChild(new_personTel);
        newContactDiv.appendChild(new_companyAddress);
        newContactDiv.appendChild(new_personEmail);

        contact_page.appendChild(newContactDiv);

        console.log(currentContact.id);
        console.log(new_companyName.innerHTML);
      }
    }
  }
  //I made the changes below -Nicke, I think you can adjust och change it to fit your methods =D
  document.addEventListener("click", showInfo)
  function showInfo(){
 
    let contactsarea = document.getElementById("contacts_area");
    let paragraph = document.querySelectorAll("p");
    paragraph.forEach(p => p.addEventListener("click", detail));
    
    function detail(event){ // loops through contactsarea's children, and matches event.target with p.

      for(let check = 0; check < contactsarea.children.length; check++){

        if(event.target == contactsarea.children[check].children[0]){ // event.target is matched with the content of the created divs(the paragraphs in divs)
          console.log("I happen when you click the P!") // insert the code here(i think!)
        }
      }
    }
  }

  class ContactItem {
    constructor(companyName = "", companyWeb = "", companyAddress = "", personName = "", personTel = "", personEmail = "", id) {
      this.companyName = companyName;
      this.companyWeb = companyWeb;
      this.companyAddress = companyAddress;
      this.personName = personName;
      this.personTel = personTel;
      this.personEmail = personEmail;
      this.id = id;
    }
  }

  var contact_list = new ContactList();
  console.log(contact_list);

  document.addEventListener("DOMContentLoaded", function(event) {
    var addNewContact = document.getElementById("addNewContact");
    document.getElementById("btn_addContact").addEventListener("click", function(e) {
      addNewContact.style.display = "inline";
    });


    document.getElementById("btn_addContact_confirm").addEventListener("click", function(e) {
      var company_name = document.getElementById("company_name").value;
      var person_name = document.getElementById("person_name").value;
      var company_web = document.getElementById("company_web").value;
      var company_address = document.getElementById("company_address").value;
      var person_tel = document.getElementById("person_tel").value;
      var person_email = document.getElementById("person_email").value;

      addNewContact.style.display = "none";
      contact_list.addContact(company_name, company_web, company_address, person_name, person_tel, person_email);
    });

    document.getElementById("show").addEventListener("click", function(e) {
      contact_list.showDetails();
    });

  });
