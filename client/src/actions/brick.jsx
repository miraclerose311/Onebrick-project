import api from '../utils/api';
import { add_donor_info } from '../features/brick/brickSlice';

// export const addCount = (count) => {
//     add_donor_info(count);
// };

// export const googleLogin = (access_token) => async (dispatch) => {
//   try {
//     const res = await api.post(
//       '/auth/google-login',
//       JSON.stringify({ access_token })
//     );
//     console.log(res.data);
//     dispatch(login());
//   } catch (e) {
//     if (e.response.data['Error'] == "This user does not exists") {
//       window.alert('This user does not exists')
//     } else {
//       window.alert('Some error ocurred')
//     }
//   }
// };
