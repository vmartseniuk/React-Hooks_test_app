import React, { useState, useEffect } from 'react'
import axios from 'axios'
const todo = props => {
   const [todoName, setTodoName] = useState('');
   const [todoList, setTodoList] = useState([])
   
  

    useEffect(() => {
        axios.get('https://hoks-150ab.firebaseio.com/todos.json')
        .then(result => {
            console.log(result)
            const todoData = result.data;
            const todos = []
            for(const key in todoData){
                todos.push({id:key, name:todoData[key].name})
            }
            setTodoList(todos)
        })
        return () =>{
            console.log('Cleanup')
        }
    }, [todoName])

     const mouseMoveHandler =(event) => {
        console.log(event.clientX , event.clientY)
    }

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler)
        return() => {
            document.removeEventListener('mousemove', mouseMoveHandler)
        }
    }, [])
    
   const inputChangeHandler = (event) => {
    setTodoName(event.target.value)
    console.log(event)
   }

   const todoAddHAndler =() => {
       setTodoList(todoList.concat(todoName))
       axios.post('https://hoks-150ab.firebaseio.com/todos.json', {name: todoName})
       .then(res => {
           console.log(res)
       })
       .catch(e => {
        console.log(e)
    })
   }

 return <React.Fragment>
     <input 
        type="text" 
        placeholder="todo" 
        onChange={inputChangeHandler} 
        value={todoName} />
     <button type='button'
        onClick={todoAddHAndler}
        >Add</button>
     <ul>
         {
             todoList.map(todo => <li key={todo.id}>{todo.name}</li>)
         }
     </ul>
 </React.Fragment>
}
export default todo