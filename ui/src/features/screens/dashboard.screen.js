import React, { Component } from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import UserIcon from "@material-ui/icons/Person";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  loadUsers,
  updateUser,
  deleteUser,
} from "../../services/user.services";

export default class DashboardScreen extends Component {
  state = {
    users: [],
    isEdit: false,
    name: null,
    userId: null,
    validationError: false,
  };

  logout = () => {
    const { changeAppScreen } = this.props;
    //Navigation
    changeAppScreen("login", []);
  };

  async intialLoad() {
    //Fetching all users
    const res = await loadUsers();
    this.setState({
      users: res.data,
    });
  }

  componentDidMount() {
    this.intialLoad();
  }

  updateUser = async () => {
    const { name, userId } = this.state;
    if (name.length < 2) {
      this.setState({ validationError: true });
      return;
    }
    //Requesting to update
    await updateUser(name, userId);
    //Update data on update
    this.intialLoad();
    this.setState({ isEdit: false });
  };

  deleteUser = async (userId) => {
    //Checking with logged in user
    if (userId === this.props.userData.id) {
      alert("Cannot delete logged in User");
      return;
    }
    //Requesting to delete
    await deleteUser(userId);
    //Updating data on delete
    this.intialLoad();
  };

  render() {
    const { userData } = this.props;
    console.log("userData", userData);

    return (
      <div style={{ width: "100%" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">Welcome {userData.name}</Typography>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <Button onClick={() => this.logout()} color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <div
            style={{
              marginTop: 30,
              paddingTop: 20,
              backgroundColor: "tomato",
            }}
          >
            <Typography
              style={{
                textAlign: "left",
                marginLeft: 20,
                color: "white",
                fontWeight: "bold",
              }}
              variant="h6"
            >
              Users
            </Typography>
            <List style={{ backgroundColor: "#ebebeb" }}>
              {this.state.users.map((user) => (
                <ListItem key={user.id}>
                  <ListItemAvatar>
                    <Avatar>
                      <UserIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() =>
                        this.setState({
                          isEdit: true,
                          name: user.name,
                          userId: user.id,
                        })
                      }
                      edge="end"
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => this.deleteUser(user.id)}
                      edge="end"
                      aria-label="delete"
                      style={{ color: "red" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Container>
        <Dialog
          fullWidth={true}
          open={this.state.isEdit}
          onClose={() => this.setState({ isEdit: false })}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit user</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={this.state.name}
              error={this.state.validationError}
              helperText="Enter minimum of 2 characters"
              onChange={(event) => this.setState({ name: event.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ isEdit: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={() => this.updateUser()} color="primary">
              SAVE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
