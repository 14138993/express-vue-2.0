import {userAction} from '../actions/userAction'
import {userGetter} from '../getters/userGet'
import {userMuation} from '../mutations/userMutations'
export default {
	namespaced: true,
	state:{
		is_open:false
	},
	actions:userAction,
    getters: userGetter,
    mutations: userMuation	
}