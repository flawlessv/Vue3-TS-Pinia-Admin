import { ref } from "vue";
import type pageContent from "@/base-ui/pageContent/pageContent.vue";

function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>();
  const handleQueryClick = (queryInfo: any) => {
    contentRef.value?.fetchPagesListData(queryInfo);
  };
  const handleResetClick = () => {
    contentRef.value?.fetchPagesListData();
  };
  return {
    contentRef,
    handleQueryClick,
    handleResetClick
  };
}

export default usePageContent;
