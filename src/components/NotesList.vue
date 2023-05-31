<template>
  <div class="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
    <div
      class="bg-white w-full p-8 relative rounded-lg"
      v-for="(note, index) in Notes"
      :key="index">
      <h3
        class="font-bold w-full text-2xl after:absolute after:w-1 after:h-10 after:left-0 after:bg-black mb-1 max-w-[10ch] overflow-x-visible">
        {{ note.title }}
      </h3>
      <p class="text-gray-400 mb-5">
        {{ new Date(note.createdAt).toDateString() }}
      </p>
      <p class="text-lg">{{ note.desc }}</p>
      <div class="flex gap-2 justify-end">
        <svg
          @click="edit(note, index)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 cursor-pointer hover:stroke-green-500 duration-300">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        <svg
          @click="delet(note, index)"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 cursor-pointer hover:stroke-red-500 duration-300">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const emit = defineEmits(["delet", "edit"]);

const delet = (note, index) => {
  emit("delet", {
    note,
    index,
  });
};
const edit = (note, index) => {
  emit("edit", {
    note,
    index,
  });
};
const props = defineProps({
  Notes: [Array],
});
setTimeout(() => {
  console.log(props.Notes[0]);
}, 200);
</script>
