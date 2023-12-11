import api from '../utils/api';
import { login } from '../features/auth/authSlice';
import { setAlert } from '../features/alert/alertSlice';

export const googleRegister = (access_token) => async (dispatch) => {
  try {
    await api
      .post('/auth/google-register', JSON.stringify({ access_token }))
      .then((res) => {
        console.log('Google Login payload => ', res.data);
        dispatch(login(res.data));
      });
  } catch (e) {
    if (e.response.data['Error'] == 'This user already exists') {
      const newAlert = {
        alertType: 'error',
        content: 'This user already exists',
      };
      dispatch(setAlert(newAlert));
    } else {
      // window.alert("Some error ocurred");
      const newAlert = {
        alertType: 'error',
        content: 'This user already exists',
      };
      dispatch(setAlert(newAlert));
    }
  }
};

export const googleLogin = (access_token) => async (dispatch) => {
  try {
    const res = await api.post(
      '/auth/google-login',
      JSON.stringify({ access_token })
    );
    console.log(res);
    dispatch(login(res.data));
  } catch (e) {
    console.log(e);
    if (e.response.data['Error'] == 'This user does not exists') {
      const newAlert = {
        alertType: 'error',
        content: 'This user does not exists',
      };
      dispatch(setAlert(newAlert));
    }
  }
};

export const isProfiled = () => async (dispatch) => {
  try {
    const user_id = localStorage.getItem('user');
    await api.post('/users/isProfiled', { user_id }).then((res) => {
      const bool = 'profile' in res.data ? true : false;
      dispatch(setIsProfiled(bool));
    });
  } catch (e) {
    console.log(e);
  }
};
