import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import { auth, db, snapshotToArray } from "./firebase";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Photos from "./Photos";
import AddAlbum from "./AddAlbum";
import { Link, Route } from "react-router-dom";

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [d_open, setDOpen] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("albums")
        .onSnapshot(s => {
          const user_albums = snapshotToArray(s);
          setAlbums(user_albums);
        });
    }
    return unsubscribe;
  }, [user]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  const handleMenuOpen = () => {
    setDrawerOpen(true);
  };
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
        //display error message
      });
  };

  if (!user) {
    return <div />;
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            My Album
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi! {user.email}
          </Typography>

          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer_open} onClose={handleCloseDrawer}>
        <div>
          <List>
            {albums.map(a => {
              return (
                <ListItem
                  button
                  to={"/app/album/" + a.id + "/"}
                  component={Link}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={a.title} />
                </ListItem>
              );
            })}
            <ListItem
              button
              onClick={() => {
                setDOpen(true);
              }}
            >
              <ListItemText primary="Add Album" />
            </ListItem>
            <AddAlbum open={d_open} onClose={setDOpen} user={user} />
          </List>
          <Divider />
        </div>
      </Drawer>
      <Route
        path="/app/album/:album_id/"
        render={routeProps => {
          return <Photos user={user} {...routeProps} />;
        }}
      />
    </div>
  );
}
