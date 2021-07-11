import { createStore } from 'vuex';
import {auth} from '../utils/firebase';

export default createStore({
  state: {
    user: undefined,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    reloadUser({commit}){
      auth.onAuthStateChanged((user) => {
        commit("setUser",{
          ...user
        });
      })
    }
  },
  modules: {
  }
})
