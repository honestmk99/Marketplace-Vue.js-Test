<template>
  <div class="container">
    <header class="jumbotron">
      <h2>Dear Ronnie</h2>
      <h2>{{ content }}</h2>
      <h2>Mykola</h2>
    </header>
  </div>
</template>

<script>

export default {
  name: "HomeComponent",
  data() {
    return {
      content: `I just had to take a moment to express my deepest appreciation for gracing my shopping website with your presence. Your arrival was like a burst of confetti and party hats!

      You navigated through the virtual aisles like a pro, bringing joy to each product page you visited. I must say, your taste in online shopping is impeccable. You have truly elevated the coolness factor of my website by simply being there.

      Thank you for choosing my little corner of the internet to satisfy your retail therapy needs. Your presence has brought a smile to my face and made my day infinitely brighter. I applaud your impeccable sense of style and your ability to effortlessly spot the best deals.

      Please know that your visit hasn't gone unnoticed or unappreciated. You're a VIP in my virtual store, and I'm here to assist you with any questions or shopping needs you may have. Together, we'll conquer the online shopping world one fabulous item at a time!

      With heartfelt gratitude and a shopping cart full of happiness,`,
    };
  },
};
</script>
