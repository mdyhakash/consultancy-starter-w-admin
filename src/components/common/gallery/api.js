const apiGallery = {
  cacheKeyFolder: "apiGalleryFolder",
  folderCreate: {
    method: "post",
    endpoint: "/api/admin/gallery/folder/create",
  },
  folderList: {
    method: "get",
    endpoint: "/api/admin/gallery/folder/list",
  },
  folderDelete: (folderId) => ({
    method: "delete",
    endpoint: "/api/admin/gallery/folder/delete/" + folderId,
  }),
  cacheKeyFile: "apiGalleryFile",
  fileUpload: {
    method: "post",
    endpoint: "/api/admin/gallery/file/upload",
  },
  fileList: {
    method: "get",
    endpoint: "/api/admin/gallery/file/list",
  },
  fileDelete: (fileId) => ({
    method: "delete",
    endpoint: "/api/admin/gallery/file/delete/" + fileId,
  }),
};

export default apiGallery;
