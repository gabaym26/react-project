import * as actionType from './action'

const initialState = {
  user:null,
  recipies:[],
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        // case actionType.GET_RECIPE: {
        //     return { ...state, recipes: action.payload }
        // }
        case actionType.SET_USER: {
            return { ...state, user: action.payload }
        }
        case actionType.ADD_RECIPE:
            return { ...state, recipes: action.payload }
        default: {
            return { ...state }
        }
    }
}
export default Reducer