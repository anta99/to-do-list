const tasksReducer=(state=[],action)=>{
    switch(action.type){
        case "CHANGE_STATUS":
             state.forEach((task,index)=>task.id==action.payload ? task.finished=!task.finished : task)
             return [...state];
        case "ADD_TASK":
            return [...state,action.payload];
        case "MARK_TASK":
            state.forEach(task=>task.id==action.payload ? task.important=!task.important : task)
            return [...state];
        case "DELETE_TASK":
            return state.filter(task=>task.id!=action.payload);
        case "UPDATE_TASK":
            const taskToUpdate=state.find((task)=>task.id==action.payload.id);
            taskToUpdate.task=action.payload.newName;
            taskToUpdate.desc=action.payload.desc;
            taskToUpdate.date=action.payload.date;
            return [...state];
        default:
            return state;
    }

}
export default tasksReducer;