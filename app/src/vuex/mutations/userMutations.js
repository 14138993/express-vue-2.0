import * as type from '../type/userType.js'
export const userMuation = {
	[type.OPEN_MODAL](state){
		state.is_open=true
	},
	[type.CLOSE_MODAL](state){
		state.is_open=false
	},
	[type.UPDATA_USER](state,user){
		state.userMsg=user
	},
	[type.DELET_USER](state){
		state.userMsg=''
	}
}