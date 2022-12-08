import { useDispatch, useSelector } from "react-redux";
import { onCloseModal, onOpenModal } from "../store";

export const useUiStore = () => {
  
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((state) => state.ui);

  const OpenModaldb = () => {
    dispatch(onOpenModal());
  };

  const CloseModaldb = () => {
    dispatch(onCloseModal());
  };

  const toggleDateModal = () => {
    (isDateModalOpen) 
     ? openDateModal() 
     : closeDateModal();
  };

  return {
    //Propiedades
    isDateModalOpen,

    //Metodos
    toggleDateModal,
    OpenModaldb,
    CloseModaldb,
  };
};
