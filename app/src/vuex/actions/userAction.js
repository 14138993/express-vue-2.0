import * as type from '../type/userType.js'


export const userAction = {
	openModel({commit, state}){
		commit(type.OPEN_MODAL)
	},
	close({commit, state}){
		commit(type.CLOSE_MODAL)
	}
}