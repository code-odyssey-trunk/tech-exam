import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { registerUser } from "../../services/user.services";

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignupScreen extends React.Component {
  state = {
    name: "",
    username: "",
    password: "",
    repeat: "",
    nameError: false,
    usernameError: false,
    passwordError: false,
    repeatError: false,
  };

  register = async () => {
    const { name, username, password, repeat } = this.state;

    //Validate fields
    let validateFlag = 0;
    if (name.length < 2) {
      validateFlag = 1;
      this.setState({ nameError: true });
    }
    if (username.length < 3) {
      validateFlag = 1;
      this.setState({ usernameError: true });
    }
    if (password.length < 4) {
      validateFlag = 1;
      this.setState({ passwordError: true });
    }
    if (password !== repeat) {
      validateFlag = 1;
      this.setState({ repeatError: true });
    }
    if (validateFlag) {
      return;
    }

    this.setState({
      nameError: false,
      usernameError: false,
      passwordError: false,
      repeatError: false,
    });

    //Requesting to register
    const result = await registerUser(name, username, password);
    if (!result.data) {
      return;
    }
    const { changeAppScreen } = this.props;
    //Navigation
    changeAppScreen("dashboard", result.data);
  };

  render() {
    const { classes } = this.props;
    const { nameError, usernameError, passwordError, repeatError } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              helperText="Enter minimum of 2 characters"
              error={nameError}
              autoFocus
              onChange={(event) =>
                this.setState({ name: event.target.value, nameError: false })
              }
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              error={usernameError}
              helperText="Enter minimum of 3 characters"
              onChange={(event) =>
                this.setState({
                  username: event.target.value,
                  usernameError: false,
                })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText="Enter minimum of 4 characters"
              onChange={(event) =>
                this.setState({
                  password: event.target.value,
                  passwordError: false,
                })
              }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="repeat"
              label="Confirm password"
              type="password"
              id="repeat"
              autoComplete="current-password"
              error={repeatError}
              onChange={(event) =>
                this.setState({
                  repeat: event.target.value,
                  repeatError: false,
                })
              }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.register()}
            >
              Sign up
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => this.props.changeAppScreen("login")}
                  variant="body2"
                >
                  {"Already have an account? LogIn"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(SignupScreen);
