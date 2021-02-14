import React,{useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";


import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from "./components/Header/Header";
import ListGroup from "./components/ListGroup/ListGroup";
import {addList} from "./actions/index";



function App() {
  var listState=useSelector(state=>state.list);
  const dispatch=useDispatch();
  const listId=listState.length ? listState[listState.length-1].id+1 : 0;
  const addListHandler=()=>{
    const input=document.querySelector("#listName").value;
    const listObj={
      id:listId,
      name:input
    }
    dispatch(addList(listObj));
    document.querySelector("#listName").value="";
    document.querySelector("#addListBtn").click();
  }
  
  return (
    <main className="App">
      <Header />
      <ListGroup lists={listState} />
      <button type="button" className="customBtnMain" data-bs-toggle="modal" data-bs-target="#addListModal">+</button>
      {/* Add list modal */}
      <article className="modal fade" id="addListModal" data-bs-backdrop="static" data-bs-keyboard="false" tabzndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <section className="modal-dialog">
              <article className="modal-content">
              <section className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">Add new list</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </section>
              <section className="modal-body">
                  <label>List name</label>
                  <input tpye="text" className="form-control" id="listName" />
              </section>
              <section className="modal-footer">
                  <button type="button" className="btn btn-secondary" id="addListBtn" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={addListHandler}>Add list</button>
              </section>
              </article>
          </section>
        </article>
    </main>
  );
}

export default App;
