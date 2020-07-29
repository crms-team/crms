import {AddResource, Set_Data} from '../actions';
import {combineReducers} from 'redux';

const instanceinit={
    value:"",
    instance:""
};

const SetType=(state=instanceinit,action)=>{
    switch(action.type){
        case Set_Data:
            return Object.assign({},state,{
                instance:action.instance
            });
        default:
            return state;
    }
}

const SetTypeApp=combineReducers({
    SetType
});

export default SetTypeApp;

