import axios from "axios";
import { ApiCatalog } from "electr-common";
const AnalyticsDashboard = ApiCatalog.Categories.AnalyticsDashboard;

export const GET_WIDGETS = "[ANALYTICS DASHBOARD APP] GET WIDGETS";

export function getWidgets() {
  const request = axios.get(AnalyticsDashboard.GET_WIDGETS);

  return dispatch =>
    request.then(response =>
      dispatch({
        type: GET_WIDGETS,
        payload: response.data
      })
    );
}
