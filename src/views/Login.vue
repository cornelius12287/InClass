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
        </ul>
      </div>
      <div class="card-body">
        <h4 class="card-title">Login</h4>
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
                <button type="submit" class="btn btn-success">Login</button>
            </form>
            <br /><button class="btn btn-primary btn-block" @click.prevent="facebookLogin">Log In with Facebook</button>
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
import * as fb from '@/models/facebook';
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
            toastr.success("You've logged in successfully!");
          }
          catch(error){
            Globals.errors.push(error);
            toastr.error(error.message);
          }
        },

        async facebookLogin(){
          const m = await fb.Login();
          console.log( {m} );
        }
    }
}
</script>

<style>

</style>
