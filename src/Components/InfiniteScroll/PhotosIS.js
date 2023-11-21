import React, { useCallback, useEffect, useState } from "react";
import { API } from "./utils/constants";
import CommentList from "./components/CommentListPhotos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api from "./utils/api";

const httpClient = axios.create({
  baseURL: API.baseURL
});

const api = new Api(httpClient);

export default function App(props) {
  // props.heightOfComponet, props.headerComponet

  const [requsetType, setRequsetType] = useState("PHOTOS/"+props.albumId);
  const [page, setPage] = useState(API.startPage);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fail, setFail] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //console.log("?");
    (async () => {
      const { data: newComments } = await api.comments(requsetType, page, "", "");
      setComments((prevComments) => [...prevComments, ...newComments.response]);
      setHasMore(newComments.response.length > 0);
      setIsLoading(false);
    })();
  }, [api, page]);

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
    setIsLoading(true);
  }, []);

  return (
    <div className="photosApp" style={{width:'100%'}}>
      {props.headerComponent}
      {comments.length >= 0 && (
        <CommentList
          heightOfComponent={props.heightOfComponent} 
          headerComponet={props.headerComponet} 
          hasMore={hasMore} 
          isLoading={isLoading} 
          loadMore={loadMore} 
          comments={comments}
          commentType={requsetType} 
          albumId={props.albumId}
          modalState1 = {props.modalState1}
        />
      )}
    </div>
  );
}
