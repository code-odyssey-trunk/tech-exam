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

import { loginUser } from "../../services/user.services";

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

class LoginScreen extends React.Component {
  state = {
    username: "",
    password: "",
    usernameError: false,
    passwordError: false,
    loginError: false,
  };

  login = async () => {
    const { username, password } = this.state;

    //Validate fields
    if (username.length === 0 && password.length === 0) {
      this.setState({ usernameError: true, passwordError: true });
      return;
    }
    if (username.length === 0) {
      this.setState({ usernameError: true });
      return;
    }
    if (password.length === 0) {
      this.setState({ passwordError: true });
      return;
    }

    this.setState({
      usernameError: false,
      passwordError: false,
      loginError: false,
    });

    //Requesting login
    const result = await loginUser(username, password);
    if (!result.data) {
      this.setState({ loginError: true });
      return;
    }
    const { changeAppScreen } = this.props;
    //Navigate
    changeAppScreen("dashboard", result.data);
  };

  render() {
    const { classes } = this.props;
    const { usernameError, passwordError, loginError } = this.state;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              error={usernameError}
              autoFocus
              onChange={(event) =>
                this.setState({
                  username: event.target.value,
                  loginError: false,
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
              error={passwordError}
              autoComplete="current-password"
              onChange={(event) =>
                this.setState({
                  password: event.target.value,
                  loginError: false,
                })
              }
            />
            {loginError && (
              <p style={{ color: "red" }}>Invalid username or password</p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.login()}
            >
              LogIn
            </Button>
            <Grid container>
              <Grid item>
                <Link
                  onClick={() => this.props.changeAppScreen("signup")}
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(LoginScreen);
