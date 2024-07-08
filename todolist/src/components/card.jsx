import { useState } from "react"
import { MdEdit, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { ImRadioUnchecked } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";


export default function Todo({item, onUpdate, onDelete, onToggleComplete}){

const [isEdit, setIsEdit] = useState(false);


function FormEdit(){


    const [newValue, setNewValue] = useState(item.title)

    function handleChange(e){
        e.preventDefault();
        const value = e.target.value;
        setNewValue(value)
    }

    function handleClickUpdate(){
        onUpdate(item.id, newValue);
        setIsEdit(false)
    }


    return(
        <form onSubmit={handleClickUpdate}>
            <input type="text" onChange={handleChange} value={newValue} />
            <button onClick={handleClickUpdate}>Modifier</button>

        </form>
    )
}

function TodoElement(){
    return(
        <>
        <div key={item.id} className={`title ${item.completed ? 'completed' : ''}`}>
            
            {item.title}</div>
        <div className="settings">
            <button onClick={()=> setIsEdit(true)}><MdEdit /></button>
            <button onClick={(e)=> onDelete(item.id)}><FaTrash /></button>
            <span className="check" onClick={() => onToggleComplete(item.id)} style={{ cursor: 'pointer' }}>
                        {item.completed ? <FaRegCheckCircle /> : <ImRadioUnchecked />}
                    </span>
        </div>
        </>
    )
}

return(

    <div className="todo">
        {isEdit ?
    <li className="cardTodo">
        <FormEdit />
    </li>    
    :
    <li className="cardTodo">
        <TodoElement />
    </li> 
    }
    </div>

)
}
