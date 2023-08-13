import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const SinglePageComment = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyName, setReplyName] = useState("");
  const apiUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  // Load comments from the server on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${apiUrl}/comments`);
        const fetchedComments = response.data;

        setComments(fetchedComments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, [apiUrl]);

  const handleReplyNameChange = (event) => {
    setReplyName(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleReplyChange = async (event) => {
    setReply(event.target.value);
  };

  const fetchAvatar = async (name) => {
    try {
      const response = await fetch(
        `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch avatar");
      }
      const data = await response.arrayBuffer();
      const base64Data = btoa(
        new Uint8Array(data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      const avatarUrl = `data:image/png;base64,${base64Data}`;
      return avatarUrl;
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() !== "" && comment.trim() !== "") {
      try {
        const avatar = await fetchAvatar(name);
        const newComment = {
          name: name,
          comment: comment,
          email: email,
          datetime: new Date().toISOString(),
          avatar: avatar,
        };
        console.log(newComment);

        const response = await axios.post(`${apiUrl}/comments`, newComment);
        setComments([...comments, response.data]);
        clearFormFields();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (reply.trim() !== "") {
      try {
        const avatar = await fetchAvatar(replyName);
        const newReply = {
          name: replyName,
          reply: reply,
          datetime: new Date().toISOString(),
          avatar: avatar,
        };

        const response = await axios.post(
          `${apiUrl}/comments/${commentId}/replies`,
          newReply
        );
        const savedReply = response.data;

        const updatedComments = comments.map((comment) =>
          comment._id === commentId
            ? { ...comment, replies: [...comment.replies, savedReply] }
            : comment
        );

        setComments(updatedComments);
        clearReplyFormFields();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const clearFormFields = () => {
    setName("");
    setEmail("");
    setComment("");
  };

  const clearReplyFormFields = () => {
    setReply("");
    setReplyName("");
    setReplyIndex(null);
  };
  // format the date
  const getFormattedDate = (date) => {
    const options = {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleString(undefined, options);
  };

  // Prevent the default anchor tag behavior
  const handleReplyClick = (event, commentIndex) => {
    event.preventDefault();
    setReplyIndex(commentIndex);
  };

  return (
    <>
      <div className="pt-5">
        <h3 className="mb-5">{comments.length} Comments</h3>
        <ul className="comment-list">
          {comments.map((comment, commentIndex) => (
            <li key={comment._id} className="comment">
              <div className="vcard">
                {comment.avatar ? (
                  <img src={comment.avatar} alt="Random Avatar" />
                ) : (
                  <p>....</p>
                )}
              </div>
              <div className="comment-body">
                <h3>{comment.name}</h3>
                <div className="meta">{getFormattedDate(comment.datetime)}</div>
                <p>{comment.comment}</p>
                <p>
                  <a
                    href="#"
                    className="reply rounded"
                    onClick={(e) => handleReplyClick(e, commentIndex)}
                  >
                    Reply
                  </a>
                </p>
                {replyIndex === commentIndex && (
                  <div className="reply-section p-3">
                    <form action="#">
                      <div className="form-group">
                        <label htmlFor="name">Name *</label>
                        <input
                          type="text"
                          placeholder="Name"
                          id="name"
                          value={replyName}
                          onChange={handleReplyNameChange}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="reply">Reply *</label>
                        <textarea
                          value={reply}
                          onChange={handleReplyChange}
                          placeholder="Write your reply here"
                          id="reply"
                          rows={8}
                          className="form-control"
                        />
                      </div>
                      <button
                        onClick={(e) => handleReplySubmit(e, comment._id)}
                        className="btn btn-info"
                      >
                        Submit Reply
                      </button>
                    </form>
                  </div>
                )}
              </div>

              <ul className="children">
                {comment.replies.map((reply, replyIndex) => (
                  <li key={replyIndex} className="comment">
                    <div className="vcard">
                      {reply.avatar ? (
                        <img src={reply.avatar} alt="Reply Avatar" />
                      ) : (
                        <p>....</p>
                      )}
                    </div>
                    <div className="comment-body">
                      <h3>{reply.name}</h3>
                      <div className="meta">
                        {getFormattedDate(reply.datetime)}
                      </div>
                      <p>{reply.reply}</p>
                      <p>
                        <a
                          href="#"
                          className="reply rounded"
                          onClick={(e) => handleReplyClick(e, commentIndex)}
                        >
                          Reply
                        </a>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* comment  form sextion */}
        <div className="comment-form-wrap pt-5">
          <h3 className="mb-5">Leave a comment</h3>
          <form className="p-5 bg-light">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                name=""
                id="message"
                cols="30"
                rows="10"
                className="form-control"
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Post Comment"
                className="btn btn-primary"
                onClick={handleCommentSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

SinglePageComment.propTypes = {
  data: PropTypes.object,
};

export default SinglePageComment;
