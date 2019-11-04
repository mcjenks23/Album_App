import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { db, storage } from "./firebase";
import uuid from "node-uuid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function AddPhoto(props) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleSavePhoto = () => {
    setSaving(true);
    storage
      .ref("photos/" + uuid())
      .put(file)
      .then(snapshot => {
        console.log("file saved");
        snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log(downloadURL);
          db.collection("users")
            .doc(props.user.uid)
            .collection("albums")
            .doc(props.album_id)
            .collection("photos")
            .add({
              title: title,
              image: downloadURL
            })
            .then(() => {
              console.log("Image Added");
              setTitle("");
              setFile(null);
              setSaving(false);
              props.onClose(false);
            });
        });
      });
  };

  const handleFile = e => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add a photo</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            label="Photo Title"
            fullWidth
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
            {file && (
              <Typography style={{ marginRight: 20 }}>{file.name}</Typography>
            )}
            <Button variant="contained" component="label">
              <input
                type="file"
                onChange={handleFile}
                style={{ display: "none" }}
              />
              Choose a file
            </Button>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.onClose(false)}>
          Cancel
        </Button>
        <div style={{ position: "relative" }}>
          <Button color="primary" variant="contained" onClick={handleSavePhoto}>
            Save
          </Button>
          {saving && (
            <CircularProgress
              style={{
                position: "absolute",
                top: "50%",
                left: "35%",
                marginTop: -12,
                marginleft: -12
              }}
              color="secondary"
              size={24}
            />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
}
