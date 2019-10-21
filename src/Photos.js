import React, { useState, useEffect } from "react";
import PhotoCard from "./PhotoCard";
import AddPhoto from "./AddPhoto";
import Button from "@material-ui/core/Button";
export default function photo(props) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingLeft: 10,
        paddingTop: 10
      }}
    >
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <PhotoCard />
      <Button color="secondary" variant="contained" style={{ marginTop: 10 }}>
        <AddPhoto />
      </Button>
    </div>
  );
}
