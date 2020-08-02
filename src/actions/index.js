export const AddResource ='AddResource';
export const ViewResource ='ViewResource';
export const DelResource ='DelResouce';
export const ModResource ='ModResouce';

export function actionaddresource(){
    return{
        type:AddResource
    };
}

export function actionmodresource(){
    return{
        type:ModResource
    };
}

export function actiondelresource(){
    return{
        type:DelResource
    };
}

export function actionViewResource(data){
    return{
        type: ViewResource
    };
}
