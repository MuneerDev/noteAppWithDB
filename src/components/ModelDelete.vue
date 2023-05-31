<template>
  <Teleport to="#model">
    <div class="relative w-full h-full z-50">
      <div
        @click.self="close"
        class="bg-black bg-opacity-50 absolute w-screen h-screen top-0 flex justify-center items-center">
        <Transition name="fade" appear>
          <div class="bg-white w-1/2 p-7 rounded-lg grid">
            <h3 class="text-2xl font-bold">Do you wish to delete?</h3>
            <p class="my-3">
              Please confirm that you want to delete this Note below
            </p>
            <div class="flex justify-end gap-3">
              <button
                class="bg-red-500 px-3 py-2 rounded-xl text-white"
                @click="close">
                cancel
              </button>
              <button
                class="bg-green-500 px-3 py-2 rounded-xl text-white"
                @click="delet">
                delete
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { defineEmits } from "vue";
const emit = defineEmits(["close", "delete"]);
const close = () => {
  emit("close");
};
const delet = () => {
  emit("delete");
};
</script>
