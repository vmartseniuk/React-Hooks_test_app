import React, {useState, useEffect, useReducer, useRef, useMemo } from 'react'
import axios from 'axios'
import List from './List'
import useFormInput from '../hooks.js/forms'

const todo = props => {
    const [inputIsValid, setInputIsValid] = useState(false)   
//    const [todoName, setTodoName] = useState('');
//    const [submittedTodo, setSubmittedTodo] = useState(null)
//    const [todoList, setTodoList] = useState([])
    
    const todoInputRef = useRef()
    const todoInput = useFormInput()

const todoListReducer = (state, action) => {
    switch(action.type){
        case 'ADD':
         return state.concat(action.payload)
         case 'SET' :
            return action.payload
        case 'REMOVE':
            return state.filter((todo)=> todo.id !== action.payload)
        default:
            return state
    }
}

    const [todoList, dispatch] = useReducer(todoListReducer, [])
  
    useEffect(() => {
        axios.get('https://hoks-150ab.firebaseio.com/todos.json')
        .then(result => {
            const todoData = result.data;
            const todos = []
            for(const key in todoData){
                todos.push({id:key, name:todoData[key].name})
            }
            dispatch({type:'SET',payload: todos})
        })
        return () =>{
            console.log('Cleanup')
        }
    }, [])

    //  const mouseMoveHandler =(event) => {
    //     // console.log(event.clientX , event.clientY)
    // }
    
    // useEffect(() => {
    //     document.addEventListener('mousemove', mouseMoveHandler)
    //     return() => {
    //         document.removeEventListener('mousemove', mouseMoveHandler)
    //     }
    // }, [])
    
    // useEffect(
    //     ()=>{
    //     if(submittedTodo){
    //         dispatch({type:'ADD', payload:submittedTodo})
    //     }
    // },[submittedTodo])
////////////
//    const inputChangeHandler = (event) => {
//     setTodoName(event.target.value)
//    }

   const inputValidation =(event) => {
    if(event.target.value.trim() === ''){
        setInputIsValid(false)
    } else {
        setInputIsValid(true)
    }
   }

   const todoAddHAndler =() => {
    //    setTodoList(todoList.concat(todoName))
        // const todoName = todoInputRef.current.value;
        const todoName = todoInput.value;

        
       axios.post('https://hoks-150ab.firebaseio.com/todos.json', {name: todoName})
       .then(res => {
           console.log(res)
           setTimeout(() => {
               const todoItem = { id: res.data.name, name: todoName}
            //    setTodoList( todoList.concat(todoItem))
            dispatch({type:'ADD', payload: todoItem})
           }, 3000)
       })
       .catch(e => {
        console.log(e)
    })
   }

   const todoRemoveHandler = (todoId) => {
       axios.delete(`https://hoks-150ab.firebaseio.com/todos/${todoId}.json`)
        .then(res =>{
            dispatch({type:'REMOVE', payload : todoId})
        })
        .catch(e => {
            console.log(e)
        })
   }

 return <React.Fragment>
     <input 
        type="text" 
        placeholder="todo" 
        // onChange={inputChangeHandler} 
        // value={todoName} 
            // ref = {todoInputRef}
            // onChange={inputValidation}
        onChange={todoInput.onChange}
        value={todoInput.value}
        style ={{backgroundColor: todoInput.validity ? 'white' : 'red'}}
        />
     <button type='button'
        onClick={todoAddHAndler}
        >Add</button>
        {useMemo (() => <List items={todoList} onClick={todoRemoveHandler}/>, [todoList])} 
 </React.Fragment>
}
export default todo