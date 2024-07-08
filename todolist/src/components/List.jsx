import './todoApp.scss'
import {useState} from 'react'
import Card from './card'

const todoApp = () => {

    const [itemTodo, setItemTodo] = useState('')
    const [list, setList] = useState([]);



    function handleChange(event){
        const value = event.target.value;
        setItemTodo(value)
    }

    function handleSubmit(e){
        e.preventDefault();
        const newTodo = {
            id: crypto.randomUUID(),
            title: itemTodo,
            completed: false

        };
        setList([... list, newTodo]);
        setItemTodo('')
    }

    function handleUpdate(id, value){
        const temp = [...list];
        const item = temp.find(item => item.id === id);
        item.title = value;
        setList(temp)
    }

    function handleDelete(id) {
        const temp = list.filter((item) => item.id !== id);
        setList(temp);
    }

    function handleToggleComplete(id){
        const temp = [...list];
        const item = temp.find(item => item.id === id);
        item.completed = !item.completed;
        setList(temp)
    }

    return (

        <div className="h1">
            <h1>ToDo List React</h1>
        
        <div className="todoContainer">
            <form
            onSubmit={handleSubmit}
            >
                <input
                 type="text"
                 onChange={handleChange}
                 value={itemTodo} />

                <button
                onClick={handleSubmit}
                 type="submit">
                    Créer une tache
                    </button>

            </form>

            <div className="todoContainer">
                <ul className="listTodo">
                    {
                        list.map(item=> (
                            <Card
                            key={item.id}
                            item={item}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            onToggleComplete={handleToggleComplete}
                            />
                        ))
                    }
                </ul>
            </div>
        </div>
        </div>
    )
}

export default todoApp



