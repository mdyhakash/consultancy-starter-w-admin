import { create } from "zustand";

export const useGalleryDialog = create((set) => ({
  folderId: null,
  folderName: "",
  setFolderId: ({ folderId = null, folderName = "" } = {}) =>
    set({ folderId, folderName }),
}));

export default useGalleryDialog;
