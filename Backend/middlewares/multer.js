import multer from "multer";
// Multer is a middleware for handling file uploads in Node.js with Express. It supports multipart/form-data for uploading files, allows customization of storage (local or cloud), and provides features like file size/type filtering.

const storage = multer.memoryStorage();
/*
multer.memoryStorage():

Creates a storage engine that keeps the uploaded file in memory (RAM) instead of saving it to disk. This means the file is not saved as a physical file but is kept in memory, which can be useful for small files or when you want to process them right away.

How it Works:

single("file"):
Tells Multer to handle a single file upload. The file part is the name of the form field that will hold the uploaded file.

storage: Specifies that Multer should use memory storage to keep the file in memory.
single("file"): Specifies that you expect a single file in the form field named file.

*/

export const singleUpload = multer({ storage }).single("file");
