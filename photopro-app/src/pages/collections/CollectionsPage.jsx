import React, { useState, useEffect } from "react";
import axios from "axios";
import Toolbar from "../../components/toolbar/toolbar";
import "./CollectionsPage.css";
import { Redirect } from "react-router-dom";
import Collection from "./collection/Collection";

export default function CollectionsPage() {
  const [allCollections, setAllCollections] = useState([]);

  const [collectionClicked, setCollectionClicked] = useState(false);
  const [collectionIdClicked, setCollectionIdClicked] = useState(null);
  const [collectionNameClicked, setCollectionNameClicked] = useState(null);
  const [collectionPrivateClicked, setCollectionPrivateClicked] = useState(
    null
  );

  useEffect(() => {
    console.log("getting users collections");
    getUsersCollections();
  }, []);

  const getUsersCollections = () => {
    axios({
      method: "GET",
      url: "http://localhost:5000/get_users_collection",
      params: {
        batch_size: 10,
      },
    }).then((response) => {
      if (response.data.result !== false) {
        console.log(response);
        setAllCollections(response.data.result);
      }
    });
  };

  const collectionsComponents = allCollections.map((collection) => {
    return (
      <Collection
        key={collection.collection_id}
        collection_id={collection.collection_id}
        collection_name={collection.collection_name}
        creator_id={collection.creator_id}
        num_photos={collection.num_photos}
        private={collection.private}
        setCollectionClicked={setCollectionClicked}
        setCollectionIdClicked={setCollectionIdClicked}
        setCollectionNameClicked={setCollectionNameClicked}
        setCollectionPrivateClicked={setCollectionPrivateClicked}
      />
    );
  });

  const collectionData = (
    <Redirect
      push
      to={{
        pathname: `/collection-${collectionIdClicked}`,
        state: {
          collection_id: `${collectionIdClicked}`,
        },
      }}
    />
  );

  let componentsRender;
  if (collectionClicked) {
    componentsRender = collectionData;
  } else {
    componentsRender = (
      <div className="collectionsPageWrapper">
        <div className="title">
          <h1>My collections</h1>
        </div>
        <div className="collectionsWrapper">{collectionsComponents}</div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Toolbar />
      {componentsRender}
    </React.Fragment>
  );
}
