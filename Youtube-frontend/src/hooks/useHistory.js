// useHistory.js
import { useDispatch } from "react-redux";
import { addToHistory } from "../redux/historySlice"; // Import the action from historySlice

export const useHistory = () => {
  const dispatch = useDispatch();

  const saveHistory = (videoId) => {
    dispatch(addToHistory(videoId)); // Dispatch the action to store the videoId in history
  };

  return { saveHistory };
};
