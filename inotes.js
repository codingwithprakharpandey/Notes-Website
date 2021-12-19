console.log("Welcome to inotes app");
showtext();
let addbtn = document.getElementById("addnotes-btn");
addbtn.addEventListener("click", function (e) {
  let addtext = document.getElementById("addtext");
  let title = document.getElementById("title");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let myobj = {
    notetitle: title.value,
    text: addtext.value
  }
  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addtext.value = "";
  title.value = "";
//   console.log(notesobj);
  showtext();
});

// This is function to show elements (notes) from localStorage.

function showtext() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  let html = "";
  notesobj.forEach(function (element, index) {
    html += `   <div  class="inside-notes" >
        <div>
          <h1 class="title-h1"> ${element.notetitle} </h1>
          <p class="notes-desc" >${element.text}</p>
         <button id="${index}" onclick="deletenotes(this.id) "class="delete-btn">Delete Notes</button>
        </div> 
   </div> `;
  });
  let noteselm = document.getElementById("notes");
  if (notesobj.length != 0) {
    noteselm.innerHTML = html;
  } else {
    noteselm.innerHTML = `<p class="default-message" >Nothing To Show ! Please Add a Note </p>`;
  }
}

//Function to delete a Note ==>

function deletenotes(index) {
//   console.log("I am deleting The notes", index);
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index,1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  showtext();
}

//Function for Searching the notes

let search = document.getElementById('searchtxt');
  search.addEventListener('input', function(){

      let inputVal = search.value.toLowerCase();
    //   console.log('Input Event is fired!', inputVal);
      let notecard = document.getElementsByClassName('inside-notes');
      Array.from(notecard).forEach(function(element) {
          let cardtxt = element.getElementsByTagName('p')[0].innerText
          let cardtitle = element.getElementsByTagName('h1')[0].innerText
        //   console.log(cardtxt);
          if ((cardtxt.includes(inputVal)) || (cardtitle.includes(inputVal))) {
              element.style.display = "block";
          } else {
            element.style.display = "none";
          }
      })
  })
