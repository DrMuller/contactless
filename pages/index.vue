<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Stay in touch, <br />
          but contactless
        </h2>
      </div>
      <img :src="url" alt="Workflow" width="225" height="225" class="mx-auto" />
      <form class="mt-8 space-y-6" @click.prevent="submitForm">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="first_name" class="sr-only">First name</label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              autocomplete="given-name"
              v-model="firstName"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="First name"
            />
          </div>
          <div>
            <label for="last_name" class="sr-only">Last name</label>
            <input
              id="last_name"
              name="last_name"
              type="text"
              autocomplete="family-name"
              v-model="lastName"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Last name"
            />
          </div>
          <div>
            <label for="phone_number" class="sr-only">Phone number</label>
            <input
              id="phone_number"
              name="phone_number"
              type="text"
              autocomplete="tel"
              v-model="phoneNumber"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Phone number"
            />
          </div>
          <div>
            <label for="linkedin_url" class="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              v-model="email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="email"
            />
          </div>
          <div>
            <label for="linkedin_url" class="sr-only">
              LinkedIn profile url
            </label>
            <input
              id="linkedin_url"
              name="linkedin_url"
              type="text"
              autocomplete="url"
              v-model="linkedinUrl"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="LinkedIn URL"
            />
          </div>
        </div>
        <!-- <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get my QR code
          </button>
        </div> -->
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const firstName = ref("");
const lastName = ref("");
const phoneNumber = ref("");
const linkedinUrl = ref("");
const email = ref("");
const qrCodeUrl = ref("");
const vCard = ref("");

const defaultQrcode =
  "https://chart.googleapis.com/chart?cht=qr&chs=450x450&chl=Hey! I'm using ContactLess!";

const url = computed(() => {
  return !isFormEmpty() ? qrCodeUrl.value : defaultQrcode;
});

const isFormEmpty = () => {
  return (
    firstName.value === "" &&
    lastName.value === "" &&
    phoneNumber.value === "" &&
    linkedinUrl.value === "" &&
    email.value === ""
  );
};

const submitForm = () => {
  const formData = {
    firstName: firstName.value,
    lastName: lastName.value,
    phoneNumber: phoneNumber.value,
    linkedinUrl: linkedinUrl.value,
    email: email.value,
  };

  vCard.value = `BEGIN:VCARD
VERSION:3.0
N:${formData.lastName};${formData.firstName};;;
TEL;TYPE=WORK,VOICE:${formData.phoneNumber}
EMAIL:${formData.email}
URL;TYPE=WORK:${formData.linkedinUrl}
END:VCARD`;

  const encodedUrl = encodeURIComponent(vCard.value);
  qrCodeUrl.value = `https://chart.googleapis.com/chart?cht=qr&chs=450x450&chl=${encodedUrl}`;
};
</script>
