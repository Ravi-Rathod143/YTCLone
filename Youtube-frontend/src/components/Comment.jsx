import React,{ useState } from "react";
import { useComment } from "../hooks/useComment";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment as deleteCommentAction,
  editComment,
} from "../redux/commentSlice";
import { enqueueSnackbar } from "notistack";

const Comment = ({ comment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const { deleteComment, updateComment } = useComment();
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const dateFormatter = (timestamp) => {
    const myDate = new Date(timestamp);
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };
    return myDate.toLocaleString("en-GB", options).replace(",", "");
  };

  const handleDelete = async () => {
    const res = await deleteComment(comment._id);
    dispatch(deleteCommentAction(comment._id));
    enqueueSnackbar(res, { variant: "success" });
  };

  const handleEdit = async () => {
    if (editedText.trim() === "") return;
    await updateComment(comment._id, editedText);

    dispatch(editComment({ commentId: comment._id, newText: editedText }));
    enqueueSnackbar("Comment Updated", { variant: "success" });
    setIsEditing(false);
  };
  return (
    <div className="p-2 sm:p-3 rounded-lg duration-200 transition-all border-b">
      <div className="flex items-center gap-2">
        <img
          src={`${comment?.user?.avatar}`}
          className="h-10 w-10 rounded-full"
        />
        <p className="text-lg font-bold">@{comment?.user?.username}</p>
        <p className="text-sm mt-2 sm:mt-0 sm:text-base">
          {dateFormatter(comment?.timestamp)}
        </p>
      </div>

      {/* Comment Text or Edit Mode */}
      {isEditing ? (
        <div className="flex flex-col ml-12 gap-2">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="border rounded-lg p-2"
          />
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white py-1 px-4 rounded-lg"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditedText(comment.text);
              }}
              className="bg-gray-400 cursor-pointer hover:bg-gray-500 text-white py-1 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-lg ml-12 sm:text-base">{comment.text}</p>
      )}

      {/* Edit/Delete Buttons */}
      {userInfo === comment?.user?._id && (
        <div className="flex gap-2 ml-12 mt-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 cursor-pointer hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;