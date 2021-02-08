export const addTask=(task)=>{
    return{
        type:"ADD_TASK",
        payload:task
    }
}
export const changeTask=(id)=>{
    return{
        type:"CHANGE_STATUS",
        payload:id
    }
}
export const addList=(list)=>{
    return{
        type:"ADD_LIST",
        payload:list
    }
}
export const removeList=(id)=>{
    return{
        type:"REMOVE_LIST",
        payload:id
    }
}
export const markTask=(id)=>{
    return{
        type:"MARK_TASK",
        payload:id
    }
}
export const deleteTask=(id)=>{
    return{
        type:"DELETE_TASK",
        payload:id
    }
}