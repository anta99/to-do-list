import React,{useEffect} from "react";
import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from "./components/Header/Header";
import ListGroup from "./components/ListGroup/ListGroup";
import {addList} from "./actions/index";
import {useSelector,useDispatch} from "react-redux";


function App() {
  const dispatch=useDispatch();
  const listStateLength=useSelector(state=>state.list).length;
  const addListHandler=()=>{
    const input=document.querySelector("#listName").value;
    const listObj={
      id:listStateLength,
      name:input
    }
    dispatch(addList(listObj));
    document.querySelector(".closeModalBtn").click();
  }
  const listsState=useSelector(state=>state.list);
  return (
    <main className="App">
      <Header />
      <ListGroup lists={listsState} />
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
                  <label>Name</label>
                  <input tpye="text" className="form-control" id="listName" />
              </section>
              <section className="modal-footer">
                  <button type="button" className="btn btn-secondary closeModalBtn" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary" onClick={addListHandler}>Add list</button>
              </section>
              </article>
          </section>
        </article>
    </main>
  );
}

export default App;
