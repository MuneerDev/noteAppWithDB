<template>
  <div class="pt-5">
    <div
      class="bg-white w-full px-5 py-7 sm:px-10 sm:py-10 rounded-full flex items-center overflow-hidden gap-3">
      <div class="grid gap-2 flex-1 min-w-[50px]">
        <input
          type="text"
          class="flex-1 shrink py-2 px-2 sm:py-5 sm:px-5 h-full outline-none rounded-full"
          v-model="Note"
          placeholder="Note Title" />
        <input
          type="text"
          class="flex-1 shrink py-2 px-2 sm:py-5 sm:px-5 h-full outline-none rounded-full"
          v-model="description"
          placeholder="description" />
      </div>
      <button
        @click="addNote"
        class="bg-blue-500 text-white px-1 py-2 sm:px-3 sm:py-5 rounded-full">
        Add Note
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, ref } from "vue";
const Note = ref("");
const description = ref("");
const emit = defineEmits(["add"]);
const addNote = () => {
  const NoteTrim = Note.value.trim();
  if (NoteTrim.length > 0) {
    emit("add", {
      messege: Note.value,
      time: new Date().toDateString(),
      description: description.value,
    });
    Note.value = "";
    description.value = "";
  } else {
    alert("Please Add messege to the note!");
  }
};
</script>
