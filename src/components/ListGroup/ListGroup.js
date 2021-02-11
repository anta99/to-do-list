import React from "react";
import List from "../List/List";
import "./style.css";

export default function ListGroup({lists}){
    return(
        <section className="listGroupSec row">
            {lists.length==0 ? <h1 className="text-center emptyListMsg">You don't have any list so far.Go ahead and make one!</h1> : ""}
            {lists.map(list=>{
                return(
                <article className="listContainer col-12 col-md-6 col-xl-3 px-2" key={list.id}>
                    <List listObj={list} />
                </article>
                )
            })}
        </section>
    )
}