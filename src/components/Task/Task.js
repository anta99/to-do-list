import React,{useState,useEffect} from "react";
import {changeTask,markTask,deleteTask} from "../../actions/index";
import {useDispatch} from "react-redux";
import bootstrap from 'bootstrap'
import {BsCheck,BsThreeDotsVertical} from "react-icons/bs";
import "./style.css";
import Taskdesc from "../Taskdesc/Taskdesc";

export default function Task({taskObj}){
    const [changeComp,setChangeComp]=useState(false);
    const [changeid,setChangeid]=useState(null);
    const dispatch=useDispatch();
    const button=taskObj.finished ? "finishedTaskBtn" : "unfinishTaskBtn";
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
    const openChangeComp=(e)=>{
        if(!changeComp){
            const changeId=e.target.dataset.id;
            setChangeid(changeId);
        }
        setChangeComp(!changeComp);
    }
    return(
        <section>
            <button type="button" className={`${button} ms-2`} data-taskid={taskObj.id} onClick={changeStatus}><BsCheck /></button>
                <p className="ms-4 taskText">{taskObj.task}</p>
                <div className="dropdown d-inline-block">
                    <button className="btn dropdown-toggle d-inline" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <BsThreeDotsVertical />
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li className="dropdown-item" data-id={taskObj.id} onClick={markAsImportant}>{taskObj.important ? "Unmark as important" : "Mark as important"}</li>
                        <li className="dropdown-item" data-id={taskObj.id} onClick={deleteTaskHandler}>Delete task</li>
                        <li className="dropdown-item" data-id={taskObj.id} onClick={openChangeComp}>Change task</li>
                    </ul>
                </div>
                {/* Change task modal */}
            {changeComp ? <Taskdesc taskId={changeid} closeHandler={openChangeComp} /> : null}
        </section>
    );
}