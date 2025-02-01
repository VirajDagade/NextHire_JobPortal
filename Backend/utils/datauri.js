import DataUriParser from "datauri/parser.js";
// datauri-parser is a tool used in programming to convert a file (like an image, video, or document) into a Data URI format
import path from "path";
// A Data URI is a way to encode file data directly into a URL so it can be embedded in web pages or transferred as text.

const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
