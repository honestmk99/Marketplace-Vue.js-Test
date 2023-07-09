<template>
	<div class="container">
    <header class="jumbotron">
      <h3>
        <strong>Products List</strong>
      </h3>
    </header>
		<div class="row">
			<div class="col-md-3">
				<div class="sidebar">
					<h4>Categories</h4>
					<ul class="category-list">
						<li v-for="(category, key) in sortedCategories" :key="category.id">
							<label :for="key">
								<input type="checkbox" :id="key" v-model="selectedCategories" :value="category">
								{{ category }}
							</label>
						</li>
					</ul>
				</div>
			</div>
			<div class="col-md-9">
				<div class="search-bar">
					<button class="btn btn-primary" @click="toggleSortOrder">Toggle Category Order</button>
					<input type="text" v-model="searchQuery" placeholder="Search products">
				</div>
				<div class="products">
					<div class="row">
						<div class="col-md-4" v-for="product in filteredProducts.slice(
							(currentPage - 1) * itemsPerPage, 
							Math.min(currentPage * itemsPerPage, filteredProducts.length - 1))" :key="product.id">
							<ProductComponent :productData="product" :key="product.id"/>
						</div>
					</div>
				</div>
				<div class="pagination">
					<ul class="pagination justify-content-center">
						<li class="page-item" :class="{ 'active': currentPage === page }" v-for="page in totalPages" :key="page">
							<a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
  
<script>
import ProductService from '../services/product.service';
import ProductComponent from "@/components/ProductComponent.vue";

export default {
	name:"ProductsComponent",
	components:{
		ProductComponent
	},
	data() {
		return {
			categories: [],
			products: [],
			searchQuery: '',
			sortOrderAsc: true,
			currentPage: 1,
			itemsPerPage: 9,
			cart: [],
			selectedCategories: [],
			sortedCategories: [],
			filteredProducts: [],
			totalPages: 0
		};
	},
  watch: {
    sortOrderAsc(newValue) {
			const sorted = [...this.categories]; // Create a shallow copy of the categories array
			this.sortedCategories = sorted.sort((a, b) => {
				if (newValue == true)
					return b.localeCompare(a);
				else
					return a.localeCompare(b);
			});
		},
		selectedCategories(newArray) {
			// first filted by search
			this.filterProducts(newArray, this.searchQuery)
		},
		
		searchQuery(newQuery) {
			// first filted by search
			this.filterProducts(this.selectedCategories, newQuery)
		}
	},
	methods: {
		toggleSortOrder() {
			this.sortOrderAsc = !this.sortOrderAsc;
		},
		changePage(page) {
			this.currentPage = page;
		},
		filterProducts(selectedCategories, query) {
			let filtered = this.products

			if (query.length)
				filtered = filtered.filter(product => {
					return product.title.toLowerCase().includes(query.toLowerCase());
				});
			
			if (Object.values(selectedCategories).length)
				filtered = filtered.filter(product => {
					for (let category of Object.values(selectedCategories)) {
						if (product.category == category)
							return true;
					}
				});

			this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
			this.filteredProducts = filtered;
		},
		addToCart(product) {
			const itemInCart = this.cart.find(item => item.id === product.id);
			if (itemInCart) {
				itemInCart.quantity += product.quantity;
			} else {
				this.cart.push({
					id: product.id,
					name: product.name,
					quantity: product.quantity,
				});
			}
		},
	},
	mounted() {
		// Fetch categories and products data from API or static file
		ProductService.getAllCategories().then(response => {
			this.categories = response;
			this.sortedCategories = this.categories;
		})


		ProductService.getAllProducts().then(response => {
			this.products = response.products;
			this.filteredProducts = this.products;
			this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
		})
		
	},
};
</script>

<style>
.sidebar {
	margin-top: 20px;
}

.search-bar {
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
}

.category-list {
	margin-top: 15px;
  list-style: none;
	padding-left: 10px;
}

.products {
	margin-bottom: 20px;
}

.pagination {
	margin-top: 20px;
}
</style>
