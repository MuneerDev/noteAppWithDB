<template>
  <Teleport to="#model">
    <div class="relative w-full h-full z-50">
      <div
        @click.self="close"
        class="bg-black bg-opacity-50 absolute w-screen h-screen top-0 flex justify-center items-center">
        <Transition name="fade" appear>
          <div class="bg-white w-1/2 p-7 rounded-lg grid">
            <h2 class="text-3xl">Edit Note</h2>
            <input
              type="text"
              class="bg-gray-100 my-3 px-2 py-3"
              v-model="EditMessege" />
            <input
              type="text"
              class="bg-gray-100 px-2 py-3 mb-3"
              v-model="Editdesc" />
            <div class="flex justify-end gap-3">
              <slot> </slot>
              <button
                class="bg-green-500 px-3 py-2 rounded-xl text-white"
                @click="save">
                save
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  currentindex: { Object },
});
console.log(props.currentindex);

const EditMessege = ref(props.currentindex.title);
const Editdesc = ref(props.currentindex.desc);

const emit = defineEmits(["close", "save"]);
const close = () => {
  emit("close");
};
const save = () => {
  let trimed = EditMessege.value.trim();

  if (trimed.length > 0) {
    emit("save", {
      EditMessege,
      Editdesc,
      index: props.currentindex.id,
    });
  } else {
    alert("Please add value");
  }
};
</script>
