import * as actType from '../actions/ActionTypes'

const defaultState = {
  modalMode: false
}

const reducerCommon = (state = defaultState, action) => {
  switch (action.type) {
    case actType.TOGGLE_MODAL:
      return {
        ...defaultState,
        modalMode: action.modalMode
      }
    default:
      return state
  }
}

export default reducerCommon
