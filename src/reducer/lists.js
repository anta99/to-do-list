const listsReducer=(state=[],action)=>{
    switch(action.type){
        case "ADD_LIST":
            return [...state,action.payload];
        case "REMOVE_LIST":
            return state.filter((list,index)=>index!=action.payload);
        default:
            return state;
    }

}
export default listsReducer;