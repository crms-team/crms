import {combineReducers} from 'redux';
import {showmodal,AddResource} from '../actions'
import { act } from 'react-dom/test-utils';

const initstate={ 
    restype:""
};
const instancestate={
    payload:{
        name:"",
        type:"",
        region:"",
        platform:"",
        instype:"",
        size:"",
        parent:"",
        link:[],
        children:[] 
    }
}


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

const Add = (state=instancestate,action)=>{
    switch(action.type){
        case AddResource:
            return Object.assign({},state,{
                payload:action.payload
            })
        default:
            return state
    }
};

const Reduxapp = combineReducers({
    show,Add
});

export default Reduxapp;