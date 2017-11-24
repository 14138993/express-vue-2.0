import * as type from '../type/userType.js'


export const userAction = {
	openModel({commit, state}){
		commit(type.OPEN_MODAL)
	},
	close({commit, state}){
		commit(type.CLOSE_MODAL)
	},
	updataUser({commit,state},user){
		commit(type.UPDATA_USER,user)
	},
	deletUser({commit,state}){
		commit(type.DELET_USER)
	}
}