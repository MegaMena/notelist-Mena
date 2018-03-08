console.log("ladida");

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

function submitNote()
{
  var origNotes = getLocal();

  var newNote = {
    text: "Ladida",
    dueDate: "2018-03-09 13:00:00",
    important: true
  };

  origNotes.push(newNote);

  setLocal(origNotes);
}

submitNote();
