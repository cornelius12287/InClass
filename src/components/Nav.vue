<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <router-link class="navbar-brand" to="/">
            <img alt="Vue logo" height='50px' src="../assets/logo.png">
        </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/" active-class="active" exact>Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/About" active-class="active" exact>About</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyFriends" active-class="active" exact>My Friends</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/MyGoals" active-class="active" exact>My Goals</router-link>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        <form class="form-inline mt-2 mt-md-0" v-if="!Globals.user">
            <router-link to="/Login" class="nav-link">LOGIN</router-link>
            <router-link to="/Register" class="nav-link">SIGN UP</router-link>
        </form>
        <span class="navbar-text" v-if="Globals.user">
            <img width="30" :src="`https://graph.facebook.com/${Globals.oAuthId}/picture`" />
            Welcome {{Globals.user.FirstName}}{{Globals.user.LastName}}</span>
        </div>
    </nav>
</template>

<script>
import { Globals } from "@/models/api";

export default {
    // data takes a function that returns data
    data:()=>({
        Globals: Globals
    }),
    // methods takes an object that contain functins
    methods: {

        }
    }

</script>

<style>

</style>
