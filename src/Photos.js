import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import Button from "@material-ui/core/Button";
import { db, snapshotToArray } from "./firebase";

export default function Photos(props) {
  const [d_open, setDOpen] = useState(false);
  const [photos, setPhotos] = useState([{ title: "Hello", image: "" }]);

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .doc(props.match.params.album_id)
      .collection("photos")
      .onSnapshot(snapshot => {
        const updated_photos = snapshotToArray(snapshot);
        setPhotos(updated_photos);
      });
    return unsubscribe;
  }, [props]);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10
      }}
    >
      {photos.map(p => {
        return <PhotoCard photo={p} />;
      })}
      <div>
        <Button
          color="secondary"
          variant="contained"
          style={{ marginTop: 10 }}
          onClick={() => {
            setDOpen(true);
          }}
        >
          Add Photo
        </Button>
      </div>
      <AddPhoto
        open={d_open}
        onClose={setDOpen}
        user={props.user}
        album_id={props.match.params.album_id}
      />
    </div>
  );
}
