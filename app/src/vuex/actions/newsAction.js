import * as type from '../type/newsType'


export const newsAction = {
	openModel({commit, state}){
		commit(type.OPEN_MODAL)
	},
	close({commit, state}){
		commit(type.CLOSE_MODAL)
	}
}