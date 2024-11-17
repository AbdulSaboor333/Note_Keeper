// References
const notesContainer = document.getElementById("notesContainer");
const addNoteBtn = document.getElementById("addNoteBtn");
const noteModal = document.getElementById("noteModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const noteForm = document.getElementById("noteForm");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editNoteId = null;

// Functions
function renderNotes() {
  notesContainer.innerHTML = "";
  const searchTerm = searchInput.value.toLowerCase();
  notes
    .filter(note => note.title.toLowerCase().includes(searchTerm))
    .forEach((note, index) => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("note-card");

      noteCard.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <div class="note-actions">
          <button onclick="editNote(${index})">Edit</button>
          <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
        </div>
      `;

      notesContainer.appendChild(noteCard);
    });
}

function openModal(edit = false) {
  noteModal.classList.remove("hidden");
  if (!edit) {
    noteTitle.value = "";
    noteContent.value = "";
    editNoteId = null;
  }
}

function closeModal() {
  noteModal.classList.add("hidden");
}

function saveNote() {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();

  if (!title || !content) {
    alert("Both fields are required!");
    return;
  }

  if (editNoteId !== null) {
    notes[editNoteId] = { title, content };
  } else {
    notes.push({ title, content });
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
  closeModal();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes();
}

function editNote(index) {
  openModal(true);
  noteTitle.value = notes[index].title;
  noteContent.value = notes[index].content;
  editNoteId = index;
}

// Event Listeners
addNoteBtn.addEventListener("click", () => openModal());
closeModalBtn.addEventListener("click", closeModal);
noteForm.addEventListener("submit", e => {
  e.preventDefault();
  saveNote();
});
searchInput.addEventListener("input", renderNotes);

// Initial Rendering
renderNotes();

