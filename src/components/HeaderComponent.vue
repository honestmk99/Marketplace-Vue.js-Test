<template>
	<nav class="navbar navbar-expand navbar-dark bg-dark">
		<a href="/" class="navbar-brand">Mykola Test</a>
		<div class="navbar-nav mr-auto">
			<li class="nav-item">
				<router-link to="/home" class="nav-link">
					<font-awesome-icon icon="home" /> Home
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/products" class="nav-link">
					<font-awesome-icon /> Products
				</router-link>
			</li>
		</div>

		<div v-if="!currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link to="/register" class="nav-link">
					<font-awesome-icon icon="user-plus" /> Sign Up
				</router-link>
			</li>
			<li class="nav-item">
				<router-link to="/login" class="nav-link">
					<font-awesome-icon icon="sign-in-alt" /> Login
				</router-link>
			</li>
		</div>

		<div v-if="currentUser" class="navbar-nav ml-auto">
			<li class="nav-item">
				<router-link to="/profile" class="nav-link">
					<font-awesome-icon icon="user" />
					{{ currentUser.username }}
				</router-link>
			</li>
			<li class="nav-item">
				<a class="nav-link" @click.prevent="logOut">
					<font-awesome-icon icon="sign-out-alt" /> LogOut
				</a>
			</li>
		</div>
	</nav>
</template>

<script>
export default {
	name: "HeaderComponent",
	computed: {
		currentUser() {
			return this.$store.state.auth.user;
		},
	},
	methods: {
		logOut() {
			this.$store.dispatch('auth/logout');
			this.$router.push('/login');
		}
	}
}
</script>