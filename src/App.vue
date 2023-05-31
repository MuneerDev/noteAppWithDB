<template>
  <Model
    v-if="isEditing"
    :isEditing="isEditing"
    @close="closeModel"
    @save="saveEdit"
    :currentindex="currentindex">
    <button
      class="bg-red-500 px-3 py-2 rounded-xl text-white"
      @click="closeModel">
      cancel
    </button>
  </Model>
  <ModelDelete
    v-if="isDelete"
    @close="closeModel"
    @delete="confirmDelete = true">
    ></ModelDelete
  >
  <div class="container mx-auto max-w-[90%]">
    <Addnote @add="addNoteToArray"></Addnote>
    <NotesList
      :Notes="NotesArray"
      @delet="DeleteNote"
      @edit="EditNote"></NotesList>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Addnote from "./components/addNote";
import NotesList from "./components/NotesList";
import Model from "./components/ModelForm";
import ModelDelete from "./components/ModelDelete";
import axios from "axios";

onMounted(async () => {
  const data = await axios.get("http://localhost:5001/notes");
  NotesArray.value = [...data.data];
  console.log(NotesArray.value.length);
});

async function fetch() {
  const data = await axios.get("http://localhost:5001/notes");
  NotesArray.value = [...data.data];
}

const isEditing = ref(false);
const isDelete = ref(false);
const confirmDelete = ref(null);

const currentindex = ref(null);

const NotesArray = ref([]);

const addNoteToArray = async (note) => {
  console.log(note);
  const data = await axios.post(`http://localhost:5001/notes`, null, {
    params: {
      title: note.messege,
      desc: note.description,
    },
  });
  fetch();
  console.log(data);
};

const DeleteNote = (SelectedNote) => {
  console.log(SelectedNote.note.id);
  isDelete.value = true;
  watch(
    [isDelete, confirmDelete],
    async ([isDeleteValue, confirmDeleteValue]) => {
      if (isDeleteValue && confirmDeleteValue) {
        const data = await axios.delete(
          `http://localhost:5001/notes/${SelectedNote.note.id}`
        );
        console.log(data);
        closeModel();
        confirmDelete.value = false;
        fetch();
      }
      if (isDeleteValue && confirmDeleteValue === false) {
        confirmDelete.value = null;
      }
    }
  );
};

const EditNote = (SelectedNote) => {
  isEditing.value = true;
  currentindex.value = SelectedNote.note;
};
const closeModel = () => {
  if (isEditing.value) {
    isEditing.value = false;
  } else {
    isDelete.value = false;
  }
};
const saveEdit = async (SelectedEdit) => {
  const id = SelectedEdit.index;
  const title = SelectedEdit.EditMessege.value;
  const desc = SelectedEdit.Editdesc.value;
  console.log(id);

  const data = await axios.patch(`http://localhost:5001/notes/${id}`, null, {
    params: {
      title,
      desc,
    },
  });
  console.log(data);
  fetch();
  isEditing.value = false;
};
</script>
