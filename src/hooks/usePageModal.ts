import { ref } from "vue";
import type pageModal from "@/base-ui/pageModal/pageModal.vue";

type CallbackFnType = (data?: any) => void;

function usePageModal(
  createCallback?: CallbackFnType,
  editCallback?: CallbackFnType
) {
  const modalRef = ref<InstanceType<typeof pageModal>>();
  const handleNewBtnClick = () => {
    modalRef.value?.setModalVisible();
    if (createCallback) {
      createCallback();
    }
  };
  const handleEditBtnClick = (itemData: any) => {
    modalRef.value?.setModalVisible(false, itemData);
    if (editCallback) {
      editCallback(itemData);
    }
  };
  return {
    modalRef,
    handleNewBtnClick,
    handleEditBtnClick
  };
}

export default usePageModal;
