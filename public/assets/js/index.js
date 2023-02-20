const $noteTitle = $('.note-title');
const $noteText = $('.note-textarea');
const $saveNoteBtn = $('.save-note');
const $newNoteBtn = $('.new-note');
const $noteList = $('.list-container .list-group');

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

const getNotes = function() {
  return $.ajax({
    url:'/api/notes',
    method: 'GET',
  });
};
  

const saveNote = function(note)  {
  return $.ajax({
    url:'/api/notes',
    data: note,
    method: 'POST',
  });
};

const deleteNote = function(id) {
  return $.ajax({
    url:`/api/notes/${id}`,
    method: 'DELETE',
  });
};

const renderActiveNote = function() {
  $saveNoteBtn.hide();

  if (activeNote.id) {
    $noteTitle.attr('readonly', true);
    $noteText.attr('readonly', true);
    $noteTitle.val(activeNote.title);
    $noteText.val(activeNote.text);
  } else {
    $noteTitle.attr('readonly', false);
    $noteText.attr('readonly', false);
    $noteTitle.val('');
    $noteText.val('');
  }
};

const handleNoteSave = function() {
  const newNote = {
    title: $noteTitle.val(),
    text: $noteText.val(),
  };
  saveNote(newNote).then(function(data) {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = function(event) {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  event.stopPropagation();

  const note = $(this)
  .parent('.list-group-item')
  .data();
  
  if (activeNote.id === note.id) {
    activeNote = {};
  }

  deleteNote(note.id).then(function() {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = function(){
  activeNote = $(this).data();
  renderActiveNote();
};


const handleNewNoteView = function() {
  activeNote = {};
  renderActiveNote();
};

const handleRenderSaveBtn = function() {
  if (!$noteTitle.val.trim() || !$noteText.val().trim()) {
    $saveNoteBtn.hide();
  } else {
    $saveNoteBtn.show();
  }
};

// Render the list of note titles
const renderNoteList = function(notes) {
  $noteList.empty();

  const noteListItems = [];

  for(let i = 0; i< notes.length; i++) {
    const note = notes[i];
    const $li = $("<li class='list-group-item'>").data(note);
    const $span = $('<span>').text(note.title);
    const $delBtn = $("<i class='fas fa-trash-alt float-right text-danger delete-note'>");

    $li.append($span, $delBtn);
    noteListItems.push($li);
  }

    $noteList.append(noteListItems);

};

// Gets notes from the db and renders them to the sidebar
var getAndRenderNotes = function() {

return getNotes().then(function(data){
  renderNoteList(data);
});
};

  $saveNoteBtn.on('click', handleNoteSave);
  $noteList.on('click', 'list-group-item', handleNoteView);
  $newNoteBtn.on('click', handleNewNoteView);
  $noteList.on('click', 'delete-note', handleNoteDelete);
  $noteTitle.on('keyup', handleRenderSaveBtn);
  $noteText.on('keyup', handleRenderSaveBtn);

getAndRenderNotes();
