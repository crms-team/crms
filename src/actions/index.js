export const AddResource ='AddResource';
export const DelResource ='DelResouce';
export const ModResource ='ModResouce';
export const  showmodal='showmodal';

export function actionaddresource(){
    return{
        type:AddResource,
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
    };
};

export function ShowModal(value){
    return{
        type: showmodal,
        restype : value
    }
};

export function actionmodresource(){
    return{
        type:ModResource,
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
    };
};

export function actiondelresource(){
    return{
        type:DelResource,
        payload:{
            name:"",
            type:"",
            parent:"",
        }
    };
};

