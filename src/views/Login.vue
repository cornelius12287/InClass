<template>
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-pills card-header-pills">
          <li class="nav-item">
            <a class="nav-link" href="/Register">Register New User</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" href="/Login">Login with Existing User</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Sign-in with Facebook</a>
          </li>
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Register</h4>
        <p class="card-text">
            <form @submit.prevent="submit">
                <div class="form-group">
                  <label for="Email">Email</label>
                  <input type="text" v-model="data.email"
                    class="form-control" name="Email" id="Email" aria-describedby= "HelpEmail" placeholder="Email">
                  <small id= "HelpEmail" class="form-text text-muted">You can use any email that you've used on our site.</small>
                </div>
                <div class="form-group">
                  <label for="Password">Password</label>
                  <input type="password" v-model="data.password"
                    class="form-control" name="Password" id="Password" placeholder="Password">
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
      </div>

      <div class="col-lg-6">
        <div class="card border-success" v-if="newUser">
          <div class="card-body">
            <h4 class="card-title">You are now Logged In!</h4>
            <p class="card-text">
              {{newUser.FirstName}} {{newUser.LastName}}
            </p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import { Register } from '@/models/users';
import { Globals } from '@/models/api';
import toastr from 'toastr';

export default {
    data: ()=> ({
        data: {},
        newUser: null
    }),
    methods: {
        async submit(){
          try{
            const m = await Login(this.data);
            this.$router.push(Globals.redirectRoute);
            //this.newUser = m.user;
            toastr.success("You've logged in successfully!");
          }
          catch(error){
            Globals.errors.push(error);
            toastr.error(error.msg);
          }
        }
    }
}
</script>

<style>

</style>
