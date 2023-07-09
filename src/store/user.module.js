import UserService from '../services/user.service';

export const user = {
  namespaced: true,
  state: {
    user: {},
  },
  actions: {
    getUser({ commit }, id) {
        return UserService.getUser(id).then(user => {
            console.log(user)
            console.log(id)
            commit('getSuccess', user, id);
            return Promise.resolve(user, id);
        }).catch(error => {
            commit('getFailure');
            return Promise.reject(error);
        });
    },
    updateUser({ commit }, payload) {
        // console.log(state.id, data)
        return UserService.updateUser(payload.id, payload.data).then((data) => {
            console.log("Updated User")
            commit("updateSuccess", data)
            return Promise.resolve(data)
        }).catch(error => {
            commit("updateFailure")
            return Promise.reject(error)
        });
    },
  },
  mutations: {
    getSuccess(state, user) {
        state.user = user
    },
    getFailure(state) {
        state.user = {}
    },
    updateSuccess(state, data) {
        state.user = data
    },
    updateFailure(){
    }
  }
};