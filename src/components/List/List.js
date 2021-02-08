import React,{useState,useEffect} from "react";
import {addTask,changeTask,removeList,markTask,deleteTask} from "../../actions/index";
import bootstrap from 'bootstrap'
import {BsTrashFill,BsCheck,BsThreeDotsVertical} from "react-icons/bs";
import {useSelector,useDispatch} from "react-redux";
import "./style.css";


export default function List({listObj}){
    const [listId,setListId]=useState(null);
    const tasksState=useSelector(state=>state.task);
    const importantTasks=tasksState.filter(task=>task.important && task.listId==listId);
    const importantTasksIds=importantTasks.map(task=>task.id);
    const unfinishedTasks=tasksState.filter(task=>!task.finished && task.listId==listId && !importantTasksIds.includes(task.id));
    const finishedTasks=tasksState.filter(task=>task.finished && task.listId==listId && !importantTasksIds.includes(task.id));
    
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
            finished:false,
            important:false
        }
        dispatch(addTask(taskObj));
        document.querySelector(`#taskName${listObj.id}`).value="";
        document.querySelector(`#closeBtn${listObj.id}`).click();
    }
    const changeStatus=(e)=>{
        const taskId=e.target.parentNode.dataset.taskid;
        dispatch(changeTask(taskId));
    }
    const markAsImportant=(e)=>{
        const taskId=e.target.dataset.id;
        console.log(taskId);
        dispatch(markTask(taskId));
    }
    const deleteTaskHandler=(e)=>{
        const deleteId=e.target.dataset.id;
        console.log(deleteId);
        dispatch(deleteTask(deleteId));
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
                <div className="dropdown d-inline-block">
                    <button className="btn dropdown-toggle d-inline" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsThreeDotsVertical />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li className="dropdown-item" data-id={task.id} onClick={markAsImportant}>Mark as important</li>
                        <li className="dropdown-item" data-id={task.id} onClick={deleteTaskHandler}>Delete task</li>
                    </ul>
                </div>
            </li>)}
            {/* Print important tasks */}
            <li className="listHeader p-2">
                {importantTasks.length ? <h2 className="d-inline text-warning">Imprtant ({importantTasks.length})</h2> : ""}
            </li>
            {importantTasks.map(task=><li key={task.id}>
                <button type="button" className={`${task.finished ? "finishedTaskBtn" : "unfinishTaskBtn"} ms-2`} data-taskid={task.id} onClick={changeStatus}><BsCheck /></button>
                <p className="ms-4 taskText">{task.task}</p>
                <div className="dropdown d-inline-block">
                    <button className="btn dropdown-toggle d-inline" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsThreeDotsVertical />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li className="dropdown-item" data-id={task.id} onClick={markAsImportant}>Unmark as important</li>
                        <li className="dropdown-item" data-id={task.id} onClick={deleteTaskHandler}>Delete task</li>
                    </ul>
                </div>
            </li>)}
            {/* Print all finished tasks */}
            <li className="listHeader p-2">
                {finishedTasks.length ? <h2 className="d-inline text-success">Completed ({finishedTasks.length})</h2> : ""}
            </li>
            {finishedTasks.map(task=><li key={task.id}>
                <button type="button" className="finishedTaskBtn ms-2" data-taskid={task.id} onClick={changeStatus}><BsCheck /></button>
                <p className="ms-4 taskText">{task.task}</p>
                <div className="dropdown d-inline-block">
                    <button className="btn dropdown-toggle d-inline" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsThreeDotsVertical />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li className="dropdown-item" data-id={task.id} onClick={markAsImportant}>Mark as important</li>
                        <li className="dropdown-item" data-id={task.id} onClick={deleteTaskHandler}>Delete task</li>
                    </ul>
                </div>
            </li>)}
            
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