class ContactList {
  constructor() {
    this.contacts = [];
    this.contactDetails = [];
    this.contact_id = 0;
  }

  addContact(companyName, companyWeb, companyAddress, personName, personTel, personEmail) {
    var contact = new ContactItem(companyName, companyWeb, companyAddress, personName, personTel, personEmail, this.contact_id);
    this.contacts.push(contact);
    //sorterar objekten i arrayen functionen compare finns längst ner
    //this.contacts.sort((a, b) => a.companyName.localeCompare(b.companyName)); ///sort()here also doesn't work corretly
    this.render();
    this.contact_id++; // PROBLEM: del 1 av 3: Id används för att skilja på kontaket, vilket ärr jätte bra, men scrolla ner
  }

  // fyller contactarea
  render() {      
    var list = document.getElementById("contacts_area");
    list.innerHTML = "";
    var arr = [];
    let sortedcontactlist = this.contacts.sort(compare);
    for (let currentContact of sortedcontactlist) {
     console.log("Inside render with id: " + currentContact.id);
      //  var newContactDiv = document.createElement("div");
      //newContactDiv.id = "newContact-" + currentContact.id;
      var new_contactName = document.createElement("p");
      new_contactName.id = "new_contactName-" + currentContact.id;
      //new_contactName.id = currentContact.id.toString();
      new_contactName.class = "new_contactName";
      new_contactName.innerHTML = currentContact.companyName + " - " + currentContact.personName;

      list.appendChild(new_contactName);

      arr.push(new_contactName.innerHTML);
      console.log(arr);

      new_contactName.addEventListener('click', function() {

        //såja
        for(let index = 0; index < sortedcontactlist.length;index++){
          for(let prop in sortedcontactlist[index]){

            if(currentContact.id == sortedcontactlist[index][prop]){
              showDetails(index); //del 1.5 / 3: id används som parameter
            }

          }
        }
        
       });

    }
  }

  // display details of contact
  render2(contact_index) { //del 2 / 3: id används som index!! Här e problemet, eftrsom Id har bytt plats tyvärr! så id != index!
    console.log("Inside render2 with id: " + contact_index);

    var contact_page = document.getElementById("contact_page");
    contact_page.innerHTML = "";

    var newContactDiv = document.createElement("div");
    newContactDiv.id = "newContact-" + contact_index;
    var contactPageDiv = document.createElement("div");
    contactPageDiv.id = "contactPage-" + contact_index;
    var new_companyName = document.createElement("p");
    new_companyName.id = "new_companyName-" + contact_index;
    var new_companyWeb = document.createElement("p");
    new_companyWeb.id = "new_companyWeb-" + contact_index;
    var new_companyAddress = document.createElement("p");
    new_companyAddress.id = "new_companyAddress-" + contact_index;
    var new_personName = document.createElement("p");
    new_personName.id = "new_personName-" + contact_index;
    var new_personTel = document.createElement("p");
    new_personTel.id = "new_personTel-" + contact_index;
    var new_personEmail = document.createElement("p");
    new_personEmail.id = "new_personEmail-" + contact_index;

    new_companyName.innerHTML = "Company Name: " + this.contacts[contact_index].companyName;
    new_companyWeb.innerHTML = "Company Website: " + this.contacts[contact_index].companyWeb;
    new_companyAddress.innerHTML = "Company Address: " + this.contacts[contact_index].companyAddress;
    new_personName.innerHTML = "Contact's name: " + this.contacts[contact_index].personName;

    new_personTel.innerHTML = "Contact's PhoneNumber: " + this.contacts[contact_index].personTel;
    new_personEmail.innerHTML = "Contact's Email: " + this.contacts[contact_index].personEmail;

    newContactDiv.appendChild(new_companyName);
    newContactDiv.appendChild(new_personName);
    newContactDiv.appendChild(new_companyWeb);
    newContactDiv.appendChild(new_personTel);
    newContactDiv.appendChild(new_companyAddress);
    newContactDiv.appendChild(new_personEmail);
    

    contact_page.appendChild(newContactDiv);
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

function showDetails(contactId) {
  console.log("in it: " + contactId);
  
  contact_list.render2(contactId);
}

var contact_list = new ContactList();
document.addEventListener("DOMContentLoaded", function(event) {

  var addNewContact = document.getElementById("addNewContact");
  document.getElementById("btn_addContact").addEventListener("click", function(e) {
    //creatNewContact();
    addNewContact.style.display = "inline";
  });


  document.getElementById("btn_addContact_confirm").addEventListener("click", function(e) {

    var company_name = document.getElementById("company_name").value;
    var company_web = document.getElementById("company_web").value;
    var company_address = document.getElementById("company_address").value;
    var person_name = document.getElementById("person_name").value;
    var person_tel = document.getElementById("person_tel").value;
    var person_email = document.getElementById("person_email").value;

    addNewContact.style.display = "none";
    contact_list.addContact(company_name, company_web, company_address, person_name, person_tel, person_email);
    console.log(contact_list.contacts);
    //contact_list.contacts.sort(compare);
   //contact_list.contacts.sort((a, b) => a.companyName.localeCompare(b.companyName));//It is wrong oder when sort() here

  });

});

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const companyA = a.companyName.toUpperCase();
  const companyB = b.companyName.toUpperCase();

  let comparison = 0;
  if (companyA > companyB) {
    comparison = 1;
  } else if (companyA < companyB) {
    comparison = -1;
  }
  return comparison;
}