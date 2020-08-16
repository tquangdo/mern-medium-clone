import * as actType from './ActionTypes'

export function toggleClose() {
    return (dispatch) => {
        dispatch({ type: actType.TOGGLE_MODAL, modalMode: false })
    }
}
export function toggleOpen() {
    return (dispatch) => {
        dispatch({ type: actType.TOGGLE_MODAL, modalMode: true })
    }
}
