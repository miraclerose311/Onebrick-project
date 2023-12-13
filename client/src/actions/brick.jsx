import api from '../utils/api';
import { setBricks, setSoldAmount } from '../features/brick/brickSlice';

export const getBricks = () => async (dispatch) => {
  try {
    await api.get('/brick/all').then((res) => {
      dispatch(setBricks(res.data));
    });
  } catch (e) {
    console.log(e);
  }
};

export const initialBricks = async () => {
  try {
    await api.post('/brick/initial').then(() => {
      console.log('Successfully initialized');
    });
  } catch (e) {
    console.log(e);
  }
};

export const getSoldAmount = () => async (dispatch) => {
  try {
    await api.get('/brick/sold-amount').then((res) => {
      dispatch(setSoldAmount(res.data));
    });
  } catch (e) {
    console.log(e);
  }
};

export const buyBrick = (brick_id, user, amount, index) => async (dispatch) => {
  await api
    .post('/brick/order', { amount })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const addDedication = async (dedication) => {
//   try {
//     console.log(dedication);
//     await api.post('/brick/add-dedication', dedication).then((res) => {
//       console.log(res.data);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };
