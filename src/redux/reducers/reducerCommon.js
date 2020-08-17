import * as actType from '../actions/ActionTypes'

const defaultState = {
  modalMode: false
}

const reducerCommon = (state = defaultState, action) => {
  switch (action.type) {
    case actType.TOGGLE_MODAL:
      console.log(`toggling modal: ${action.modalMode}`)
      return {
        ...defaultState,
        modalMode: action.modalMode
      }
    default:
      return state
  }
}

export default reducerCommon
