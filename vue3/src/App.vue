<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import {
  openKkiapayWidget,
  addKkiapayListener,
  removeKkiapayListener,
} from "kkiapay";

interface Shoe {
  name: string;
  price: number;
  image: string;
}
const shoes: Shoe[] = [
  {
    name: "Reebok",
    price: 990,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240301112151/shoes.png",
  },
  {
    name: "Sketchers",
    price: 1299,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240301112151/sneakers.png",
  },
  {
    name: "Adidas",
    price: 1499,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240301112150/running-shoe.png",
  },
  {
    name: "Converse",
    price: 1999,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20240301112149/sneakers-(1).png",
  },
];

const search = ref("");
const filteredShoes = computed(() => {
  const query = search.value.toLowerCase();
  const filteredShoes = shoes.filter((shoe) =>
    shoe.name.toLowerCase().includes(query)
  );
  return filteredShoes;
});

function handleClick(shoe: Shoe) {
  openKkiapayWidget({
    amount: shoe.price,
    api_key: "****************************",
    data: {
      name: shoe.name
    }
  });
}

function handlerSuccess() {
  
}
onMounted(() => {
      addKkiapayListener('success',handlerSuccess)
})
onBeforeUnmount(() => {
  removeKkiapayListener('success')
})
</script>

<template>
  <h1 class="text-3xl text-center text-blue-500 font-bold mb-4">
    SHOE COMPANY
  </h1>
  <nav class="flex items-center py-4 sticky top-0 bg-white z-10">
    <ul class="flex-1 text-center">
      <li class="list-none inline-block px-5">
        <a
          href="#"
          class="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
        >
          Home
        </a>
      </li>
      <li class="list-none inline-block px-2">
        <a
          href="#"
          class="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
        >
          About
        </a>
      </li>
      <li class="list-none inline-block px-2">
        <a
          href="#"
          class="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
        >
          Features
        </a>
      </li>
      <li class="list-none inline-block px-2">
        <a
          href="#"
          class="no-underline text-black hover:text-blue-500 transition-colors duration-300 font-bold"
        >
          Contact
        </a>
      </li>
      <li class="list-none inline-block px-2">
        <input
          type="text"
          id="searchInput"
          v-model="search"
          class="w-64 h-8 pl-2 pr-4 rounded-l-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Search..."
          aria-label="Search shoes"
        />
      </li>
    </ul>
  </nav>

  <div class="h-auto bg-white p-10">
    <ul
      id="shoe-list"
      class="flex flex-wrap justify-center align-center gap-10"
    >
      <template v-for="shoe in filteredShoes">
        <li class="p-2">
          <a
            href="#"
            class="block bg-gray-200 hover:scale-105 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300"
          >
            <img
              :src="shoe.image"
              class="w-60 h-60 object-cover p-10"
              :alt="shoe.name"
            />
            <div class="p-4">
              <h3 class="text-lg font-bold mb-1">{{ shoe.name }}</h3>
              <p class="text-gray-700">
                {{
                  new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "XOF",
                    minimumFractionDigits: 0,
                  }).format(shoe.price)
                }}
              </p>
              <button
                @click="handleClick(shoe)"
                class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition-colors duration-300"
              >
                Buy Now
              </button>
            </div>
          </a>
        </li>
      </template>
    </ul>
  </div>
</template>

