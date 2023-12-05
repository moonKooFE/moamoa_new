import React, { useEffect } from "react";
import useOnScreen from "../hooks/useOnScreen";
import Comment from "./Comment";
import styles from "./CommentList.module.css";

export default function CommentList({
  heightOfComponent,
  headerComponent,
  hasMore,
  isLoading,
  loadMore,
  comments,
  commentType
}) {
  const { measureRef, isIntersecting, observer } = useOnScreen();

  useEffect(() => {
    if (isIntersecting && hasMore) {
      loadMore();
      observer.disconnect();
    }
  }, [isIntersecting, hasMore, loadMore]);

  return (
    <div className={styles.commentList} style={{height:heightOfComponent}}>
      <div>{headerComponent}</div>
      {comments.map((comment, index) => {
        if (index === comments.length - 1) {
          return (
            <React.Fragment key={comment.index}>
              <Comment
                mesureRef={measureRef}
                key={comment.id}
                comment={comment}
                commentType={commentType}
              />
              </React.Fragment>
          );
        }
        return (
          <React.Fragment key={comment.index}>
            <Comment key={comment.index} comment={comment} commentType={commentType}/>
          </React.Fragment>
        );
      })}
      {isLoading && <li>Loading...</li>}
    </div>
  );
}
