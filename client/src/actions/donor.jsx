import api from '../utils/api';
import {clearDonor} from '../features/brick/brickSlice'
import { setIsProfiled } from '../features/auth/authSlice';

export const insertDonor = (donorData) => async (dispatch) => {
  try {
    await api.post('/donor/insert', donorData)
      .then(res => {
        dispatch(clearDonor(res.data))
      })
  } catch (e) {
    console.log(e)
  }
}

export const isProfiled = () => async (dispatch) => {
  try{
    const user_id = localStorage.getItem('user');
    await api.post('/donor/isProfiled', {user_id})
      .then(res => {
        const isProfiled = res.data > 0 ? true : false;
        dispatch(setIsProfiled(isProfiled))
      })
  } catch (e) {
    console.log(e);
  }
}