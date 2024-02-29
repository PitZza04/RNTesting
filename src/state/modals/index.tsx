import {useNonReactiveCallback} from '#/lib/hooks/useNonReactiveCallback';
import React from 'react';

export interface ConfirmModal {
  name: 'confirm';
}
export interface ChangeHandleModal {
  name: 'change-handle';
  onChanged: () => void;
}
export type Modal = ConfirmModal | ChangeHandleModal;
const ModalContext = React.createContext<{
  isModalActive: boolean;
  activeModals: Modal[];
}>({
  isModalActive: false,
  activeModals: [],
});
const ModalControlContext = React.createContext<{
  openModal: (modal: Modal) => void;
  closeModal: () => boolean;
  closeAllModals: () => void;
}>({
  openModal: () => {},
  closeModal: () => false,
  closeAllModals: () => {},
});

export function Provider({children}: React.PropsWithChildren) {
  const [activeModals, setActiveModals] = React.useState<Modal[]>([]);

  const openModal = useNonReactiveCallback((modal: Modal) => {
    setActiveModals(modals => [...modals, modal]);
  });

  const closeModal = useNonReactiveCallback(() => {
    let wasActive = activeModals.length > 0;
    setActiveModals(modals => {
      return modals.slice(0, -1);
    });
    return wasActive;
  });

  const closeAllModals = useNonReactiveCallback(() => {
    setActiveModals([]);
  });

  const state = React.useMemo(
    () => ({
      isModalActive: activeModals.length > 0,
      activeModals,
    }),
    [activeModals],
  );

  const method = React.useMemo(
    () => ({
      openModal,
      closeModal,
      closeAllModals,
    }),
    [openModal, closeModal, closeAllModals],
  );
  return (
    <ModalContext.Provider value={state}>
      <ModalControlContext.Provider value={method}>
        {children}
      </ModalControlContext.Provider>
    </ModalContext.Provider>
  );
}

export function useModals() {
  return React.useContext(ModalContext);
}

export function useModalControls() {
  return React.useContext(ModalControlContext);
}
