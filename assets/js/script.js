var modal = document.querySelector(".modal-bg");

function setLocal(localNotes)
{
  var jsonData = JSON.stringify(localNotes);

  localStorage.setItem("notes", jsonData);
}

function getLocal()
{
  var notes = localStorage.getItem("notes");

  if(notes == null)
  {
    return [];
  }
  else {
    return JSON.parse(notes);
  }
}

function submitNote(text, time, important)
{
  var origNotes = getLocal();

  var newNote = {
    text: text,
    dueDate: time,
    important: important
  };

  origNotes.push(newNote);

  setLocal(origNotes);
}

function buildList()
{
  var noteList = getLocal();
  var ulElm = document.querySelector("ul");

  ulElm.innerHTML = "";

  for(var i = 0; i < noteList.length; i++)
  {
    var liElm = document.createElement("li");
    var textPElm = document.createElement("p");
    var datePElm = document.createElement("p");
    var delBtnElm = document.createElement("button");
    var editBtnElm = document.createElement("button");


    /*
    var d = new Date(noteList[i].dueDate);
    var outDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
    console.log(outDate);

    datePElm.innerHTML = outDate;

    if(password.length == 8) //Skal omskrives, så hvis der ikke skrives dato, at der ikke kommer en masse NaN
      {
          alert("Thank you very much!~");
      }
    else
      {
          alert("Hey! Plz retry!")
      }

    */

    textPElm.innerHTML = noteList[i].text;
    datePElm.innerHTML = noteList[i].dueDate;

    delBtnElm.innerHTML = "Delete";
    delBtnElm.setAttribute("data-index", i);

    delBtnElm.addEventListener("click", submitDelEvent);

    editBtnElm.innerHTML = "Edit";
    editBtnElm.setAttribute("data-index", i);
    editBtnElm.addEventListener("click", submitEditEvent);


    liElm.appendChild(textPElm);
    liElm.appendChild(datePElm);
    liElm.appendChild(delBtnElm);
    liElm.appendChild(editBtnElm);


    ulElm.appendChild(liElm);
  }
}

function submitEditEvent(event)
{
  var arrIndex = event.target.getAttribute("data-index");
  var notes = getLocal();

  var editText = prompt ("Edit text");

  notes[arrIndex].text = editText;

  var editDate = prompt ("Edit Date");

  notes[arrIndex].dueDate = editDate;

  setLocal(notes);
  buildList();

}

function submitDelEvent(event)
{
   var arrIndex = event.target.getAttribute("data-index");
   var notes = getLocal();

   notes.splice(arrIndex, 1);



   setLocal(notes);
   buildList();
}

function submitNoteEvent(event)
{
  console.log("submit new note goes here");

  var noteText = document.querySelector("#noteText");
  var noteTime = document.querySelector("#noteTime");
  var noteImportant = document.querySelector("#noteImportant");

  submitNote(noteText.value, noteTime.value, noteImportant.checked);
  buildList();
  modal.style.display = "none";

  console.log(noteImportant.checked);
}

window.onload = function()
{
  buildList();
}

var showModalBtn = document.querySelector("#showModal");

showModalBtn.addEventListener('click', function(event)
{

  modal.style.display = "block";
});

var submitNoteBtn = document.querySelector("#addNote");

submitNoteBtn.addEventListener("click", submitNoteEvent);
