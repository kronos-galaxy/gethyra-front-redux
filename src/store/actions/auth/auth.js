import { createActions } from 'redux-actions';

const {
  signIn,
  signUp,
  signOut,
  // ...
} = createActions({
  SIGN_IN: body => body,
  SIGN_UP: body => body,
  SIGN_OUT: body => body,
  // ...
});

export {
  signIn,
  signUp,
  signOut,
  // ...
};

export default {};
