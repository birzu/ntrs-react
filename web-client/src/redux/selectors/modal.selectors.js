import { createSelector } from 'reselect';

const selectModal = state => state.modal;

export const selectCurrentModal = createSelector(
  [selectModal],
  modal => modal.currentModal
);

export const selectModalHidden = createSelector(
  [selectModal],
  modal => modal.modalHidden
);
