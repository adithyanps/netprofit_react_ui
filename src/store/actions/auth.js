import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (id,username,email) => {
  return {
    type: actionTypes.AUTH_SUCCES,
    // token:token,
    id:id,
    username:username,
    email:email,
  };
} ;

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error:error
  };
};




export const auth = (name,email,password) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      name:name,
      email:email,
      password:password
    }
    axios.post("/user/create/",authData)
      .then(response=>{

        // console.log(expirationTime)
        console.log(response);
        // localStorage.setItem('token', response.data.token);
        // localStorage.setItem('expirationTime', expirationTime);
        // localStorage.setItem('userId', response.data.id);
        dispatch(authSuccess(response.data.id,response.data.name,response.data.email))
      })
      .catch(error=>{
        console.log(error);
        console.log(error.response.data);

        dispatch(authFail(error.response.data))
      })
  };
};



export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};
export const getUserChoice = (user_choice) => {
  return {
    type: actionTypes.GET_USER_CHOICE,
    user_choice : user_choice,
  }
}
export const loginSuccess = (token) => {
  return {
    type: actionTypes.LOGIN_SUCCES,
    token:token,
    // id:id
  };
} ;

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error:error
  };
};
export const logout = () =>{
  localStorage.removeItem('token');
  localStorage.removeItem('expirationTime');
  localStorage.removeItem('userId');
  return {
    type:actionTypes.LOGOUT,

  }
}
export const redirect = () => {
  return {
    type:actionTypes.REDIRECT
  }
}

export const login = (email,password) => {
  return dispatch => {
    dispatch(loginStart());
    const loginData = {
      email:email,
      password:password
    }
       console.log(loginData)
    axios.post("/user/token/",loginData,{
        headers: {
            'Content-Type': 'application/json',
        }
    })
      .then(response=>{
        var now = new Date();
        var time = now.getTime();
        var expirationTime = new Date(time + 1000000*50);
        now.setTime(expirationTime);
        console.log(expirationTime)
        console.log(response.data.token);
        console.log(response.data);

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationTime', expirationTime);
        dispatch(loginSuccess(response.data.token));
        axios.get("/user/me/",{
          headers: {'Authorization':'Token '+localStorage.getItem('token'),
            'X-Requested-With': 'XMLHttpRequest'},
        }).then(
          response=>{
            console.log(response.data)
            dispatch(getUserChoice(response.data.user_choice));

            localStorage.setItem('userId', response.data.id);
          }
        )
      })
      .catch(error=>{
        console.log(error);
        dispatch(loginFail(error.response.data))
      })

  };
};
export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      dispatch(logout());
    } else {
      const expirationTime = new Date(localStorage.getItem('expirationTime'))
      // console.log(new Date(localStorage.getItem('expirationTime')))
      // console.log(expirationTime)


      if (expirationTime <= new Date()) {
        dispatch(logout());
      }  else {
        const userId = localStorage.getItem('userId');
        dispatch(loginSuccess(token))
      }
    }
  };
};
