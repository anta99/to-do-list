import React from "react";
import {updateTask} from "../../actions";
import {useSelector,useDispatch} from "react-redux";
import "./style.css";
import {BsX,BsCheckCircle} from "react-icons/bs";

export default function Taskdesc({taskId,closeHandler}){
    const dispatch=useDispatch();
    const taskToUpdate=useSelector(state=>state.task).find((task)=>task.id==taskId);
    console.log(taskToUpdate);
    const showDatePicker=(e)=>{
        e.preventDefault();
        const datePicker=document.querySelector("#datePicker");
        datePicker.classList.contains("d-none") ? e.target.innerHTML="Remove date" : e.target.innerHTML="Add date";
        datePicker.classList.toggle("d-none");
    }
    const submitHandler=()=>{
        const taskName=document.querySelector("#changeTaskName");
        const taskdesc=document.querySelector("#descArea");
        const datePicker=document.querySelector("#datePicker");
        const updateObj={
            id:taskToUpdate.id,
            newName:taskName.value,
            desc:taskdesc.value,
            date:datePicker.value
        };
        console.log(updateObj);
        dispatch(updateTask(updateObj));
        closeHandler();
    }
    return(
        <section className="descHolder">
            <article className="taskdesc row">
                <form>
                    <section className="col-12 my-4">
                        <input type="text" defaultValue={taskToUpdate.task} id="changeTaskName" />
                    </section>
                    <section className="col-12 my-3">
                        <textarea placeholder="Add description" rows="5" id="descArea" defaultValue={taskToUpdate.desc}></textarea>
                    </section>
                    <section className="col-12 my-3">
                        <a href="#" id="addDate" onClick={showDatePicker}>Add date</a>
                        <input type="date" id="datePicker"  className="d-none" />
                    </section>
                    <section className="col-12 my-4 text-end">
                        <button type="button" id="commitBtn" onClick={submitHandler}><BsCheckCircle /></button>
                    </section>
                    <span className="exitBtn" onClick={closeHandler}><BsX /></span>
                </form>
            </article>
        </section>
    )
}