import React, { useEffect } from "react";
import * as MUI from "../MaterialUI";
import { useSelector, useDispatch } from "react-redux";
import useForm from "../hooks/useForm";
import { login } from "../actions/login";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const initialValues = {username: "", password: ""};
  const classes = MUI.useStyles();
  const [user, handleChanges] = useForm(initialValues);
  const {isFetching, error} = useSelector(state => state.colorsReducer);
  const dispatch = useDispatch();

  const postLogin = e => {
    e.preventDefault();

    dispatch(login(user));
    handleChanges({target: {name: Object.keys(initialValues), value: Object.values(initialValues)}});
}

  useEffect(() => {
    if(!isFetching && error.length === 0) {
      if(localStorage.getItem("token")) {
        props.history.push("/bubbles");
      }
    }
  }, [isFetching, error.length, props.history]);
  
  return (
    <div className = "login-container">
      <h2>Login Here!</h2>
      <form className = {classes.form_root} onSubmit = {postLogin}>
        <MUI.TextField id="username" type = "text" label="Username" name = "username" value = {user.username} onChange = {handleChanges} />
        <MUI.TextField id="password" type = "password" label="Password" name = "password" value = {user.password} onChange = {handleChanges} />
        <MUI.Button variant = "contained" type = "submit">Login</MUI.Button>
        {isFetching && <MUI.CircularProgress />}
        {(!isFetching && error.length > 0) && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
