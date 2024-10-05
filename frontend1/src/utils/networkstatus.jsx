import { store } from "../app/store";
import { showAlert } from "../reducers/alertSlice";
import { changeState } from "../reducers/networkSlice";
import { ALERT_tYPES } from "./constants";

const NetworkStatus = () => {
  window.addEventListener("load", () => {
    navigator.onLine
      ? store.dispatch(
          changeState({
            status: "Online",
          })
        )
      : store.dispatch(
          changeState({
            status: "Offline",
          })
        );
  });

  window.addEventListener("online", () => {
    store.dispatch(
      showAlert({
        message: `You are online back!`,
        isVisible: true,
        severity: ALERT_tYPES.info,
      })
    );
  });

  window.addEventListener("offline", () => {
    store.dispatch(
      showAlert({
        message: `Lost network connection!`,
        isVisible: true,
        severity: ALERT_tYPES.error,
      })
    );
  });

  return <div></div>;
};

export default NetworkStatus;
