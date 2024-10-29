import { create } from 'zustand';

interface FolderStore {
    selectedId: string | null; // 현재 선택된 항목의 ID
    setSelectedId: (id: string | null) => void; // 선택된 항목의 ID를 설정하는 함수
    openFolderIds: string[]; // 열려 있는 폴더의 ID 목록
    toggleFolderOpen: (id: string) => void; // 폴더의 열림 상태를 토글하는 함수
}

export const useFolderStore = create<FolderStore>((set) => {
    return {
        selectedId: null,
        setSelectedId: (id: string | null): void => {
            return set({ selectedId: id });
        },
        openFolderIds: [],
        toggleFolderOpen: (id: string): void => {
            return set((state) => {
                return {
                    // 열려 있는 폴더에 해당 id가 있으면 닫기(배열에서 제거), 없으면 열기(배열에 추가)
                    openFolderIds: state.openFolderIds.includes(id)
                        ? state.openFolderIds.filter((folderId) => {
                              // filter를 이용해 해당 id를 목록에서 제거
                              return folderId !== id;
                          })
                        : [...state.openFolderIds, id], // 배열에 해당 id를 추가하여 폴더 열기
                };
            });
        },
    };
});
