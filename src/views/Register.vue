<template>
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link active" href="">Register New User</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Login">Login with Existing User</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Sign-in with Facebook</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <p class="card-text">
            <form @submit.prevent="Submit">
                <div class="form-group">
                  <label for="FirstName">First Name</label>
                  <input type="text" v-model="data.FirstName"
                    class="form-control" name="FirstName" id="FirstName" aria-describedby= "HelpFirstName" placeholder="FirstName">
                  <small id= "HelpFirstName" class="form-text text-muted">If you have a middle name, you can enter it here.</small>
                </div>
                <div class="form-group">
                  <label for="LastName ">Last Name</label>
                  <input type="text" v-model="data.LastName"
                    class="form-control" name="LastName" id="LastName" aria-describedby="HelpLastName" placeholder="LastName">
                  <small id="HelpLastName" class="form-text text-muted">Help text</small>
                </div>
                <div class="form-group">
                  <label for="Password">Password</label>
                  <input type="password" v-model="data.Password"
                    class="form-control" name="Password" id="Password" placeholder="Password">
                </div>
                <div class="form-group">
                  <label for="Birthday">Birthday</label>
                  <input type="date" v-model="data.Birthday"
                    class="form-control" name="Birthday" id="Birthday" aria-describedby="HelpBirthday" placeholder="Birthday">
                  <small id="HelpBirthday" class="form-text text-muted">Please include the year</small>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </p>
      </div>
    </div>
</template>

<script>
import {Register} from "@/models/users";
export default {
    data: ()=> ({
        data: {}
    }),
    methods: {
        submit(){
            Register(this.data)
        }
    }

}
</script>

<style>

</style>
