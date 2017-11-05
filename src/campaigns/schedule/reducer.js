import { SCHEDULE_CREATE_REST } from './actions';

export default (state = {}, { type, payload }) => {
  console.log(type, payload);
    switch(type){
       case SCHEDULE_CREATE_REST :  return payload;
       default :  return state;
    }
  }
