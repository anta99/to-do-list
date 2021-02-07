import React,{useState,useEffect} from "react";
import {addTask,changeTask,removeList} from "../../actions/index";
import bootstrap from 'bootstrap'
import {BsPen,BsTrashFill,BsCheck} from "react-icons/bs";
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
        document.querySelector(".closeModalBtn").click();
    }
    const changeStatus=(e)=>{
        const taskId=e.target.parentNode.dataset.taskid;
        dispatch(changeTask(taskId));
    }
    const removeList=()=>{
        dispatch(removeList(listId));
    }
    return(
        <section className="list row g-0">
            <article className="listHeader col-8 p-2">
                <h2 className="d-inline">{listObj.name}</h2>
            </article>
            <article className="listHeader col-4 text-end p-2">
                <span className="removeList" onClick={removeList}><BsTrashFill /></span>
            </article>
            <article classNmae="col-12 tasksDiv">
                <button type="button" className="customBtn ms-2" data-bs-toggle="modal" data-bs-target={`#addTaskModal${listObj.id}`}>+</button>
                <span className="ms-4 taskText">Add task</span>
            </article>
            {/* Print all unfinished tasks */}
            {unfinishedTasks.map(task=><article classNmae="col-12 tasksDiv">
                <button type="button" className="unfinishTaskBtn ms-2" data-taskid={task.id} onClick={changeStatus}><BsCheck /></button>
                <span className="ms-4 taskText" data-bs-toggle="modal" data-bs-target="#changeTaskModal" onClick={(e)=>{
                    const changeid=e.target.parentElement.previousElementSibling.dataset.taskid;
                    changeTaskId=changeid;
                    console.log(changeTaskId);
                }}>{task.task} <BsPen /></span>
            </article>)}
            {/* Print all finished tasks */}
            <article className="listHeader col-12">
                {finishedTasks.length ? <h2 className="d-inline text-success">Completed ({finishedTasks.length})</h2> : ""}
            </article>
            {finishedTasks.map(task=><article classNmae="col-12 tasksDiv">
                <button type="button" className="finishedTaskBtn ms-2" data-taskid={task.id} onClick={changeStatus}><BsCheck /></button>
                <span className="ms-4 taskText">{task.task}</span>
            </article>)}
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
                        <button type="button" className="btn btn-secondary closeModalBtn" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={clickAdd}>Add task</button>
                    </section>
                    </article>
                </section>
            </article>
            {/* Change task modal */}
                <article className="modal fade" id="changeTaskModal" data-bs-backdrop="static" data-bs-keyboard="false" tabzndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <section className="modal-dialog">
                        <article className="modal-content">
                            <section className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add new task</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </section>
                            <section className="modal-body">
                                <label>Name</label>
                                <input tpye="text" className="form-control" id="taskName" />
                            </section>
                            <section className="modal-footer">
                                <button type="button" className="btn btn-secondary closeModalBtn" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Add task</button>
                            </section>
                        </article>
                    </section>
                </article>
        </section>
        
    )
}