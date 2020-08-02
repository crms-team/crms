import {combineReducers} from 'redux';
import {AddResource,ViewResource,DelResource} from '../actions'

const resourcestate={
    name:"AWS",
    type:"CLOUD",
    region:"",
    platform:"",
    instype:"",
    size:"",
    parent:"",
    link:[],
    children:[] 
};

function Reducer(state=resourcestate,action){
    switch(action.type){
        case ViewResource:
            return action.id
        default:
            return state;

    }
}


export default Reducer