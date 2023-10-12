import { toast } from "react-toastify";
import { store } from "../../redux/store";
import { reduxSetLocalStream } from "../../redux/videoSlice";
const audioOnlyConstraints = {
  audio: true,
  video: false,
};
const defaultConstraints = {
  audio: true,
  video: true,
};
export const getLocalStreamPreview = (audioOnly = false, callbackFunc) => {
  const constraints = audioOnly ? audioOnlyConstraints : defaultConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      store.dispatch(reduxSetLocalStream(stream));
      callbackFunc();
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
