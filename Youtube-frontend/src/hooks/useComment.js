import axios from "axios";

export const useComment = () => {
  const token = localStorage.getItem("token");

  const addAComment = async (videoId, comment) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_ROUTES}/comments/${videoId}`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res?.data;
  };
  const getAllComments = async (videoId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_ROUTES}/comments/${videoId}`
    );

    return res?.data;
  };
  const updateComment = async (commentId, updatedComment) => {
    await axios.put(
      `${import.meta.env.VITE_API_ROUTES}/comments/${commentId}`,
      { updatedComment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const deleteComment = async (commentId) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_ROUTES}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res?.data?.message;
  };

  return { addAComment, getAllComments, updateComment, deleteComment };
};