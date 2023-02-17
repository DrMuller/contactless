<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Keep in touch, <br />
          but contactless
        </h2>
      </div>
      <!-- <Qrcode :text="message" class="mx-auto"></Qrcode> -->
      <canvas ref="$canvas" class="mx-auto w-80 h-80"></canvas>
      <form class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="first_name" class="sr-only"> First name </label>
            <input
              id="first_name"
              name="first_name"
              type="text"
              autocomplete="given-name"
              v-model="form.firstName"
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
              v-model="form.lastName"
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
              v-model="form.phoneNumber"
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
              v-model="form.email"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="email"
            />
          </div>
          <div>
            <label for="linkedin_url" class="sr-only">Organisation</label>
            <input
              id="organisation"
              name="organisation"
              type="text"
              autocomplete="organisation"
              v-model="form.companyName"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Keep in touch, Inc."
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
              v-model="form.linkedinUrl"
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="LinkedIn profile url"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  firstName: "",
  lastName: "",
  phoneNumber: "",
  linkedinUrl: "",
  companyName: "",
  email: "",
});

const isFormEmpty = computed(() => {
  return (
    form.firstName === "" &&
    form.lastName === "" &&
    form.phoneNumber === "" &&
    form.linkedinUrl === "" &&
    form.companyName === "" &&
    form.email === ""
  );
});

function buildVcard() {
  const vCard = `BEGIN:VCARD
VERSION:4.0
N:${form.firstName};${form.lastName};;;
FN:${form.firstName} ${form.lastName}
ORG:${form.companyName}
TEL;TYPE=work,voice:${form.phoneNumber}
EMAIL:${form.email}
URL:${form.linkedinUrl}
END:VCARD`;
  return vCard;
}
const $canvas = ref<HTMLCanvasElement>();
const defaultMessage = "Keep in touch, but contactless";

onMounted(() => {
  if ($canvas.value) {
    useQrCode(defaultMessage, $canvas.value);
  }
});

watch(form, () => {
  const message = isFormEmpty.value ? defaultMessage : buildVcard();
  if ($canvas.value) {
    useQrCode(message, $canvas.value);
  }
});
</script>
