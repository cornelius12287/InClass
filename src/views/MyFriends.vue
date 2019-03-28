<template>
<div>
    <h1 v-if="Globals.user">{{Globals.user.name}}'s Friends Page</h1>
    <ul>
        <li v-for="friend in friends" :key="friend.id">
            {{friend.FirstName}}
        </li>
    </ul>
</div>
</template>

<!--SCRIPT ACTS LIKE A CONTROLLER-->
<script>

import {Globals} from "@/models/api";
import {GetFriends} from "@/models/users";

export default {
    data: ()=> ({
        Globals: Globals,
        friends: []
    }),
    async mounted(){
        this.friends = await GetFriends();
    }
}
</script>

<style>

</style>
