<template>
  <div id="app">
    <HeaderComponent />

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent";

export default {
  components: {
    HeaderComponent,
  },
};
</script>
