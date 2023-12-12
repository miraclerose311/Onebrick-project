import api from '../utils/api';
import {clearDonor} from '../features/brick/brickSlice'

export const addProfile = (data) => async (dispatch) => {
  try {
    await api.post('/users/add-profile', data)
      .then(res => {
        dispatch(clearDonor())
      })
  } catch (e) {
    console.log(e)
  }
}

