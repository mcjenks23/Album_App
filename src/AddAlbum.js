import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { db } from "./firebase";

export default function AddAlbum(props) {
  const [name, setName] = useState("");

  const handleSaveAlbum = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("albums")
      .add({ title: name })
      .then(() => {
        setName("");
        props.onClose(false);
      })
      .catch(error => {
        alert(error.message);
        console.log(error);
        //display error message
      });
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Album</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            label="Album Title"
            fullWidth
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.onClose(false)}>
          Cancel
        </Button>
        <Button color="primary" variant="contained" onClick={handleSaveAlbum}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
