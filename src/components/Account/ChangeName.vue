<template>
  <form class="ui form change-name" @submit.prevent="onChangeName">
      <input type="text" placeholder="Nombre y apellidos" v-model="name" :class="{error: formError}">
<button type="submit" class="ui button primary" :class="{loading}">Actualizar</button>
  </form>
</template>

<script>
import {ref} from 'vue';
import * as Yup from 'yup';
import {auth} from '../../utils/firebase';
import {useStore} from 'vuex';

export default {
    name: "ChangeName",

    setup() {
        const store = useStore();
        let name = ref("");
        let formError = ref(false);
        let loading = ref(false);

        const schemaForm = Yup.object().shape({
            name: Yup.string().min(6, true).required(true),
        })

        const onChangeName = async () => {
            formError.value = false;
            loading.value = true;

            try {
                await schemaForm.validate({name: name.value}, {abortEarly: false});

                try {
                    await auth.currentUser.updateProfile({
                        displayName: name.value
                    });
                    store.dispatch("reloadUser");
                } catch (error) {
                  console.log(error)  
                }
            } catch (err) {
                err.inner.forEach((error) => {
                    formError.value = error.message;
                })
            }
            loading.value = false;
        };

        return{
            name,
            onChangeName,
            formError,
            loading,
        }

    }
}
</script>

<style lang="scss" scoped>
.ui.form.change-name{
    text-align: center;

    input.error{
        border-color: #faa;
        background-color: #ffeded;
    }

    .ui.button{
        margin: 20px 0 0 0;
    }
}
</style>