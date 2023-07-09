<template>
	<div class="card" v-if="localProduct">
		<div class="card-img">
			<img :src="localProduct.images[0]" class="card-img-top" alt="Product Image">
		</div>
    <div class="card-body">
			<h5 class="card-title">{{ localProduct.title }}</h5>
			<p class="card-text">{{ localProduct.description }}</p>
			<p class="card-price">Price: ${{ localProduct.price }}</p>
			<div class="card-actions">
        <input class="quantity-input" type="number" v-model="localProduct.stock" min="1">
        <button class="btn btn-primary">Add to Cart</button>
			</div>
    </div>
	</div>
</template>
  
<script>
export default {
	name: "ProductComponent",
	props: {
		productData: {
			type: Object,
		},
	},
	data() {
		return {
			localProduct: null, // Initialize as an empty object
		};
	},
	mounted() {
		this.localProduct = { ...this.productData };
	},
};
</script>
  
<style>
.card {
	margin-bottom: 20px;
	min-height: 450px;
	height: 450px;
	max-height: 450px;
	overflow: hidden;
  transition: box-shadow 0.3s ease; /* Add smooth transition effect */
	cursor: pointer;
}

.card:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); /* Apply shadow on hover */
}

.card-body{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.card-text{
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2; /* Number of lines to show */
	-webkit-box-orient: vertical;
}

.card-img{
	height: 200px;
	max-height: 200px;
	min-height: 200px;
	overflow: hidden;
}
.card-img-top {
	height: 200px;
	max-height: 200px;
	min-height: 200px;
	object-fit: cover;
  transition: transform 0.3s ease; /* Add smooth transition effect */
}

.card-img-top:hover {
  transform: scale(1.3); /* Increase the scale on hover (zoom in) */
}

.quantity-input {
	width: 60px;
	max-height: 40px;
}
.card-actions {
	height: 40px;
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	margin-bottom: 10px;
}
</style>
  