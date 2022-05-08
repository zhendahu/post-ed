import { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const CreateTask = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState ('');
    const [dateCreated, setDateCreated] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');
    const [isPending, setIsPending] = useState('false');
    // const history = useHistory();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {title, author, dateCreated, dueDate, description};

        setIsPending(true);

        console.log(task);  //need to replace this with fetch
        //POST REQUEST
        //fetch ('need to have the link here',{
            //method: 'POST',
            //headers: {"Content-Type": "???"}
            //body: object.stringify(task)
        //}).then(() => {
            //console.log('new task added');
            //setIsPending(false);
            //history.push('PLACE WHERE YOU SEND PEOPLE AFTER SUBMITTING TASK');
        //})
        
        }
    
    return(
        <div className="createTask">
            <h1>Create a new Task</h1>
            <form onSubmit = {handleSubmit}>
                <label> Task: </label>
                <input
                    type = "text"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label> Author: </label>
                <input
                    type = "text"
                    required
                    value = {author}
                    onChange={(event) => setAuthor(event.target.value)}
                />
                <label> Date Created: </label>
                <input
                    type = "text"
                    required
                    onChange={(event) => setDateCreated(event.target.value)}
                />
                <label> Due Date: </label>
                <input
                    type = "text"
                    required
                    value = {dueDate}
                    onChange={(event) => setDueDate(event.target.value)}
                />
                <label> Description: </label>
                <textarea
                    required
                    value = {description}
                    onChange={(event) => setDescription(event.target.value)}
                ></textarea>
                { !isPending && <button>Add Task</button> }
                { isPending && <button disabled>Adding Task... </button> }
            </form>
        </div>
    );
}

export default CreateTask;