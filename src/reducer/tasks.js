const tasksReducer=(state=[],action)=>{
    switch(action.type){
        case "CHANGE_STATUS":
             state.forEach((task,index)=>task.id==action.payload ? task.finished=!task.finished : task)
             return [...state];
        case "ADD_TASK":
            return [...state,action.payload];
        default:
            return state;
    }

}
export default tasksReducer;