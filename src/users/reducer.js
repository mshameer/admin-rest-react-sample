import { USER_CREATE, USER_UPDATE } from './actions';

export default (state = {}, { type, payload }) => {
    switch(type){
       case USER_CREATE :  return payload;
       case USER_UPDATE :  return payload
       default :  return state;
    }
  }
