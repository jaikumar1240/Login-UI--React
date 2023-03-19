import React, { useContext, useEffect, useReducer, useRef, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  console.log(state, action);
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return {
    value: '',
    isValid: false
  }
}

const passwordReduced = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return {
    value: '',
    isValid: false
  }
}
const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
  let initalState = {
    value: '',
    isValid: null
  }
  const [emailState, dispatchEmail] = useReducer(emailReducer, initalState);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value })
    setFormIsValid(
      passwordState.isValid && event.target.value.includes('@')
    );
  };

  const [passwordState, dispatchPassword] = useReducer(passwordReduced, initalState)

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: 'USER_INPUT',
      val: event.target.value
    })
    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    );
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(
        emailState.isValid && passwordState.isValid
      );
      setFormIsValid(
        passwordState.isValid && emailState.isValid
      );
    }, 600);
    return () => {
      clearTimeout(timer);
    }
  }, [emailState.isValid, passwordState.isValid])

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const authCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    }
    else if (!emailState.isValid) {
      emailRef.current.focus();
    }
    else {
      passwordRef.current.focus()
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <Input
          ref={emailRef}
          label='E-Mail'
          for='email'
          type='email'
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          value={emailState.value}
          isValid={emailState.isValid}
        />
        <Input
          ref={passwordRef}
          label='Password'
          for='password'
          type='password'
          isValid={passwordState.isValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
