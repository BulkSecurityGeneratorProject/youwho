import { SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction } from 'react-jhipster';
import axios from 'axios';
import { IProfilingResults } from 'app/shared/model/survey-response.model';

export const ACTION_TYPES = {
  FETCH_PERSONAL_RESULTS: 'results/FETCH_PERSONAL_RESULTS'
};

const initialState = {
  personalResults: false
};

export type ResultsState = Readonly<typeof initialState>;

export default (state: ResultsState = initialState, action): ResultsState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPES.FETCH_PERSONAL_RESULTS):
      return {
        ...state,
        personalResults: action.payload.data
      };
    default:
      return state;
  }
};

export const getPersonalResults: ICrudGetAction<IProfilingResults> = id => {
  const requestUrl = `api/survey-responses/results/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PERSONAL_RESULTS,
    payload: axios.get<IProfilingResults>(requestUrl)
  };
};