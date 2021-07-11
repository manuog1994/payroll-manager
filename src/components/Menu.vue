<template>
    <div class="ui secondary menu">
        <div class="ui container">
            <div class="menu left">
                <router-link class="item" to="/">Nóminas</router-link>
            </div>
            <router-link class="menu center" to="/">
                <img class="ui small image" src="../assets/nomina.png" alt="">
            </router-link>

            <div class="menu right">
                <router-link class="item" to="/account">
                    Hola, {{  user.displayName || user.email }}
                </router-link>

                <span class="ui item logout">
                    <i @click="logout" class="sign-out icon"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
import {auth} from "../utils/firebase";

export default {
    name: "Menu",

    setup() {
        const store = useStore();
        const user = computed(() => store.state.user);
        const logout = () => auth.signOut();

        return{
            user,
            logout,
        }
    },
}
</script>

<style lang="scss" scoped>
.ui.menu.secondary{
    background-color: #16202b;

    .item{
        color: #fff;

        &:hover{
            color: #1fa1f1;
        }
    }

    .menu.left{
        width: 50%;
    }

    .menu.right{
        width: 50%;
        justify-content: flex-end;
    }

    .logout:hover{
        cursor: pointer;

        i{
            color: #f00;
        }
    }

    .menu.center{
        background-color: #2e2e2e;
        position: relative;
        top: 15px;
        padding: 20px;
        margin: -10px;
        border-radius: 50%;

        &:hover{
            box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
            -webkit-box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
            -moz-box-shadow: 0px 10px 10px -3px rgba(0, 0, 0, 0.3);
        }
        .ui.image{
            width: 40px;
        }
    }
}
</style>