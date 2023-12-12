import api from '../utils/api';
import {
  setBricks,
  soldBrick,
  setSoldAmount,
} from '../features/brick/brickSlice';

export const getBricks = () => async (dispatch) => {
  try {
    await api.get('/brick/all').then((res) => {
      dispatch(setBricks(res.data));
    });
  } catch (e) {
    console.log(e);
  }
};

export const initialBricks = () => async (dispatch) => {
  try {
    await api.post('/brick/initial').then((res) => {});
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
  try {
    await api
      .post('/brick/buy', { brick_id, user, amount })
      .then((res) => {
        dispatch(soldBrick({ todo: res.data, index }));
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    console.log(e);
  }
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
