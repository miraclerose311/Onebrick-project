import api from '../utils/api';
import {
  setBricks,
  setBrick,
  setSoldAmount,
} from '../features/brick/brickSlice';
import { clearLoading, setLoading } from '../features/loading/loadingSlice';

export const getBricks = () => (dispatch) => {
  dispatch(setLoading());
  const getBrickPromise = api.get('/brick/all');
  const getSoldAmountPromise = api.get('/brick/sold-amount');

  Promise.all([getBrickPromise, getSoldAmountPromise])
    .then((results) => {
      const bricksData = results[0].data;
      const soldAmountData = results[1].data;

      return Promise.all([
        dispatch(setSoldAmount(soldAmountData)),
        dispatch(setBricks(bricksData)),
      ]);
    })
    .then(() => {
      dispatch(clearLoading());
    })
    .catch((error) => {
      console.log(error);
      dispatch(clearLoading()); // Handle error and clear loading state
    });
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

export const buyBrick = (brickData) => async (dispatch) => {
  dispatch(setLoading());
  await api
    .post('/brick/buy', JSON.stringify(brickData))
    .then((res) => {
      console.log('After finishing buy brick => ', res.data);
      dispatch(setBrick(res.data));
      dispatch(clearLoading());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addDedication = async (dedication) => {
  try {
    console.log(dedication);
    await api.post('/brick/add-dedication', dedication).then((res) => {
      console.log(res.data);
    });
  } catch (e) {
    console.log(e);
  }
};
