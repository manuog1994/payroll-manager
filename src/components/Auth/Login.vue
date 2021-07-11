<template>
  <div class="login">
      <h2>Iniciar sesión</h2>

      <form class="ui form" @submit.prevent="onLogin">
          <div class="field">
              <input type="text" placeholder="Correo electrónico" v-model="formData.email" :class="{error: formError.email}">
          </div>
          <div class="field">
              <input type="password" placeholder="Contraseña" v-model="formData.password" :class="{error: formError.password}">
          </div>
          <button type="submit" class="ui button positive fluid" :class="{loading}">Entrar</button>
      </form>

      <p @click="changeForm">Crear nueva cuenta</p>
  </div>
</template>

<script>
import * as Yup from "yup";
import {ref} from "vue";
import {auth} from "../../utils/firebase";

export default {
    name: "Login",
    props: {
        changeForm: Function,
    },

    setup() {
        let formData = {};
        let formError = ref({});
        let loading = ref(false);

        const schemaForm = Yup.object().shape({
            email: Yup.string().email(true).required(true),
            password: Yup.string().required(true),
        });

        const onLogin = async () => {
            loading.value = true;
            formError.value = {};
            try {
                await schemaForm.validate(formData, { abortEarly: false});
                
                try {
                    const {email, password} = formData;
                    await auth.signInWithEmailAndPassword(email, password);
                } catch (error) {
                    console.log(error);
                }
            } catch (err) {
               err.inner.forEach((error) => {
                   formError.value[error.path] = error.message;
               });
            }
            loading.value = false;
        }
        return {
            formData,
            onLogin,
            formError,
            loading,
        }
    }

};
</script>

<style lang="scss" scoped>
.login{
    background-color: white;
    padding: 30px;
    box-shadow: 0px 0px 38px -5px rgba(0, 0, 0, 0.45);
    width: 400px;
    border-radius: 10px;

    h2{
        text-align: center;
        margin-bottom: 30px;
    }

    form{
        input.error {
            border-color: #faa;
            background-color: #ffeded;
        }
    }

    p{
        text-align: center;
        margin-top: 30px;

        &:hover{
            cursor: pointer;
            opacity: 0.6;
        }
    }
}

</style>