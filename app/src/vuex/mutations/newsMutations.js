import * as type from '../type/newsType'
export const newsMuation = {
	[type.OPEN_MODAL](state){
		state.is_open=true
	},
	[type.CLOSE_MODAL](state){
		state.is_open=false
	}
}