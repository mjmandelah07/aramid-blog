import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SinglePageComment = () => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [replyIndex, setReplyIndex] = useState(null);
  const [replyName, setReplyName] = useState("");

  useEffect(() => {
    // Load comments from localStorage
    const storedComments = JSON.parse(localStorage.getItem("comments"));
    if (storedComments) {
      setComments(storedComments);
    }
  }, []);

  useEffect(() => {
    // Save comments to localStorage
    return () => {
      localStorage.setItem("comments", JSON.stringify(comments));
    };
  }, [comments]);
  const handleReplyNameChange = (event) => {
    setReplyName(event.target.value);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
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
      const blob = await response.blob();
      const avatarUrl = URL.createObjectURL(blob);
      return avatarUrl;
    } catch (error) {
      console.error(error);
    }
  };
  

  // handle comment change and update comment
  const handleCommentSubmit = async () => {
    
    if (name.trim() !== "" && comment.trim() !== "") {
      let newComment = {
        name: name,
        comment: comment,
        datetime: new Date().toLocaleString(),
        replies: [],
        avatar: "",
      };

      const avatar = await fetchAvatar(newComment.name);
      newComment.avatar = avatar;
      setComments([...comments, newComment]);
      setName("");
      setWebsite("");
      setEmail("");
      setComment("");
    }
  };

  // handle reply submission
  const handleReplySubmit = async (e, commentIndex) => {
    e.preventDefault();
    if (reply.trim() !== "") {
      const updatedComments = [...comments];
      updatedComments[commentIndex].replies.push({
        name: replyName,
        reply: reply,
        datetime: new Date().toLocaleString(),
        avatar: await fetchAvatar(replyName),
      });

      setComments(updatedComments);
      setReply("");
      setReplyName("");
      setReplyIndex(null);
    }
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
            <li key={commentIndex} className="comment">
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
                        onClick={(e) => handleReplySubmit(e, commentIndex)}
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
                      <div className="meta">{reply.datetime}</div>
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
              <label htmlFor="website">Website</label>
              <input
                type="url"
                className="form-control"
                id="website"
                value={website}
                onChange={handleWebsiteChange}
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
