<template>
  <div class="container" v-if="currentUser">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> : Profile Edit Form
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.token.substring(0, 20)}} ... {{currentUser.token.substr(currentUser.token.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    
    <Form @submit="handleSubmit" :validation-schema="schema" v-if = "currentUser">
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="firstName">First Name</label>
          <Field name="firstName" type="text" class="form-control" v-model="formData.firstName"/>
          <ErrorMessage name="firstName" class="error-feedback" />
        </div>
        <div class="form-group col-md-4">
          <label for="lastName">Last Name</label>
          <Field name="lastName" type="text" class="form-control" v-model="formData.lastName" />
          <ErrorMessage name="lastName" class="error-feedback" />
        </div>
        <div class="form-group col-md-4">
          <label for="maidenName">Maiden Name</label>
          <Field name="maidenName" type="text" class="form-control" v-model="formData.maidenName" />
          <ErrorMessage name="maidenName" class="error-feedback" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="age">Age</label>
          <Field name="age" type="number" class="form-control" v-model="formData.age" />
          <ErrorMessage name="age" class="error-feedback" />
        </div>
        <div class="form-group col-md-4">
          <label for="gender">Gender</label>
          <Field name="gender" type="text" class="form-control" v-model="formData.gender" />
          <ErrorMessage name="gender" class="error-feedback" />
        </div>
        <div class="form-group col-md-4">
          <label for="email">Email</label>
          <Field name="email" type="email" class="form-control" v-model="formData.email" />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="phone">Phone</label>
          <Field name="phone" type="text" class="form-control" v-model="formData.phone" />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        
        <div class="form-group col-md-4">
          <label for="birthDate">Birth Date</label>
          <Field name="birthDate" type="date" class="form-control" v-model="formData.birthDate" />
          <ErrorMessage name="birthDate" class="error-feedback" />
        </div>
        <div class="form-group col-md-4">
          <label for="bloodGroup">Blood Group</label>
          <Field name="bloodGroup" type="text" class="form-control" v-model="formData.bloodGroup" />
          <ErrorMessage name="bloodGroup" class="error-feedback" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-4">
          <label for="height">Height</label>
          <Field name="height" type="number" class="form-control" v-model="formData.height" />
          <ErrorMessage name="height" class="error-feedback" />
        </div>
        <div class="form-group col-md-4">
          <label for="weight">Weight</label>
          <Field name="weight" type="number" class="form-control" v-model="formData.weight" />
          <ErrorMessage name="weight" class="error-feedback" />
        </div>
        <div class="form-group col-md-4">
          <label for="eyeColor">Eye Color</label>
          <Field name="eyeColor" type="text" class="form-control" v-model="formData.eyeColor" />
          <ErrorMessage name="eyeColor" class="error-feedback" />
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          ></span>
          Submit
        </button>
      </div>
    </Form>
    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
    <!-- <strong>Authorities:</strong>
    <ul>
      <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
    </ul> -->
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: 'ProfileComponent',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      firstName: yup
        .string()
        .required("firstName is required"),
      lastName: yup
        .string()
        .required("lastName is required"),
      maidenName: yup
        .string()
        .required("maidenName is required"),
      age: yup
        .number()
        .required("age is required"),
      gender: yup
        .string()
        .required("gender is required"),
      phone: yup
        .string()
        .required("phone is required"),
      birthDate: yup
        .date()
        .required("birthDate is required"),
      bloodGroup: yup
        .string()
        .required("bloodGroup is required"),
      height: yup
        .string()
        .required("height is required"),
      weight: yup
        .string()
        .required("weight is required"),
      eyeColor: yup
        .string()
        .required("eyeColor is required"),
    })
    return {
      message:"",
      schema,
      loading: false,
      successful: false,
      formData: {}
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    userData() {
      return this.$store.state.user.user;
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    if (!this.userData.firstName) {
      this.$store.dispatch("user/getUser", this.currentUser.id).then(() => {
        this.formData = this.$store.state.user.user
      }).catch(() => {})
    }
    this.formData = this.userData
  },
  methods: {
    handleSubmit(data) {
      this.message = '';
      this.loading = true;
      this.$store.dispatch("user/updateUser", {data, id: this.currentUser.id}).then(() => {
        this.message = "User Data Updated Successfully!"
        this.loading = false;
      }).catch(err => {
        console.log(err)
        this.loading = false;
      });
    }
  }
};
</script>