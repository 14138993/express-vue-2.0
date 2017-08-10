import {newsAction} from '../actions/newsAction'
import {newsGetter} from '../getters/newsGet'
import {newsMuation} from '../mutations/newsMutations'
export default {
	namespaced: true,
	state:{
		is_open:true
	},
	actions:newsAction,
    getters: newsGetter,
    mutations:newsMuation	
}