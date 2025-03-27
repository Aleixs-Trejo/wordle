import { useState } from "react";

type UseModalReturn = [boolean, () => void, () => void];

const useModal = (): UseModalReturn => {
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return [modal, openModal, closeModal];
};

export default useModal;