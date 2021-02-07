import React,{useState,useEffect} from "react";
import {addTask,changeTask,removeList} from "../../actions/index";
import bootstrap from 'bootstrap'
import {BsTrashFill,BsCheck,BsExclamationCircle} from "react-icons/bs";
import {useSelector,useDispatch} from "react-redux";
import "./style.css";


export default function List({listObj}){
    const [listId,setListId]=useState(null);
    const tasksState=useSelector(state=>state.task);
    let changeTaskId;
    const unfinishedTasks=tasksState.filter(task=>!task.finished && task.listId==listId);
    const finishedTasks=tasksState.filter(task=>task.finished && task.listId==listId);
    const tasksLength=tasksState.length;
    const dispatch=useDispatch();

    useEffect(()=>{
        setListId(listObj.id);
    },[])
    const clickAdd=()=>{
        const input=document.querySelector(`#taskName${listObj.id}`);
        const taskObj={
            id:tasksLength,
            listId:listId,
            task:input.value,
            finished:false
        }
        //console.log(taskObj);
        dispatch(addTask(taskObj));
        document.querySelector(`#taskName${listObj.id}`).value="";
        document.querySelector(`#closeBtn${listObj.id}`).click();
    }
    const changeStatus=(e)=>{
        const taskId=e.target.parentNode.dataset.taskid;
        dispatch(changeTask(taskId));
    }
    return(
        <section className="list row g-0">
            <article className="listHeader col-8 p-2">
                <h2 className="d-inline">{listObj.name}</h2>
            </article>
            <article className="listHeader col-4 text-end p-2">
                <span className="removeList" onClick={()=>{console.log(listId);dispatch(removeList(listId))}}><BsTrashFill /></span>
            </article>
            <hr/>
            <ul>
                <li>
                    <button type="button" className="customBtn ms-2" data-bs-toggle="modal" data-bs-target={`#addTaskModal${listObj.id}`}>+</button>
                    <span className="ms-4 taskText">Add task</span>
                </li>
            
            {/* Print all unfinished tasks */}
            {unfinishedTasks.map(task=><li key={task.id}>
                <button type="button" className="unfinishTaskBtn ms-2" data-taskid={task.id} onClick={changeStatus}><BsCheck /></button>
                <p className="ms-4 taskText" data-bs-toggle="modal" data-bs-target="#changeTaskModal">{task.task}</p>
               
            </li>)}
            {/* Print all finished tasks */}
            <li className="listHeader p-2">
                {finishedTasks.length ? <h2 className="d-inline text-success">Completed ({finishedTasks.length})</h2> : ""}
            </li>
            {finishedTasks.map(task=><li key={task.id}>
                <button type="button" className="finishedTaskBtn ms-2" data-taskid={task.id} onClick={changeStatus}><BsCheck /></button>
                <span className="ms-4 taskText">{task.task}</span>
            </li>)}
            {/* Print important tasks */}

            </ul>
            {/* Add task modal */}
            <article className="modal fade" id={`addTaskModal${listObj.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabzndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <section className="modal-dialog">
                    <article className="modal-content">
                    <section className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Add new task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </section>
                    <section className="modal-body">
                        <label>Task name</label>
                        <input tpye="text" className="form-control mt-2" id={`taskName${listObj.id}`} />
                    </section>
                    <section className="modal-footer">
                        <button type="button" className="btn btn-secondary" id={`closeBtn${listObj.id}`} data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={clickAdd}>Add task</button>
                    </section>
                    </article>
                </section>
            </article>
            {/* Change task modal */}
               
        </section>
        
    )
}