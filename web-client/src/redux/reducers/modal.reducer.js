/** Modal Reducer */

// INITIAL STATE
const INITIAL_STATE = {
  currentModal: '',
  modalHidden: true
};

// ACTION CREATORS
export const showModal = () => ({
  type: 'modal/SHOW'
});

export const hideModal = () => ({
  type: 'modal/HIDE'
});

export const toggleModal = () => ({
  type: 'modal/TOGGLE'
});

export const setCurrentModal = modalName => ({
  type: 'modal/CURRENT/SET',
  payload: modalName
});

// REDUCER
export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'modal/SHOW':
      return { ...state, modalHidden: false };

    case 'modal/HIDE':
      return { ...state, modalHidden: true };

    case 'modal/TOGGLE':
      return { ...state, modalHidden: !state.modalHidden };

    case 'modal/CURRENT/SET':
      return { ...state, currentModal: action.payload };

    default:
      return state;
  }
}
