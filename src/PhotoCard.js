import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { CardActionArea } from "@material-ui/core";

export default function PhotoCard(props) {
  console.log(props.photo);
  return (
    <div>
      <Card style={{ maxWidth: 345, marginRight: 10, marginTop: 10 }}>
        <CardActionArea>
          <CardMedia
            style={{ height: 140 }}
            src="img"
            image={props.photo.image}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.photo.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" />
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
