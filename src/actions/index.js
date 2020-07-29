export const AddResource ='AddResource';
export const Set_Data='Set_Data'

export function addresource(){
    return{
        type:AddResource
    };
}

export function setdata(value){
    return{
        type:Set_Data,
        instance:value
    };
}
