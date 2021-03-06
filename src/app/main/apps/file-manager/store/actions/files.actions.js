import axios from "axios";
import { Catalog } from "electr-common";
const FileManager = Catalog.Categories.FileManager;

export const GET_FILES = "[FILE MANAGER APP] GET FILES";

export function getFiles() {
  const request = axios.get(FileManager.GET_FILES);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_FILES,
        payload: response.data
      })
    );
}
