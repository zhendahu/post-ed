import React from 'react';

const Task = (props) => {

    function handleClick() {
        console.log('open TaskModal');
    }

    return(
        <div onClick={handleClick}>
            <div className = 'task-container'>
                <div className = 'task-title'>
                    <h1>{props.taskTitle}</h1>
                </div>
                <div className = 'task-summary'>
                    <h3>{props.taskSummary}</h3>
                </div>
            </div>
        </div>
    );
}


export default Task;