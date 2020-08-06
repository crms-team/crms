import {combineReducers} from 'redux';
import {showmodal} from '../actions'

const initstate={ 
    restype:""
};


const show = (state=initstate,action)=>{
    switch(action.type){
        case showmodal:
            return Object.assign({},state,{
                restype:action.restype
            })
        default:
            return state
    }
};

const Reduxapp = combineReducers({
    show
});

export default Reduxapp;