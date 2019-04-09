import React, {useState, useEffect} from 'react';
import Todo from './component/Todo'
import Header from './component/Header'
import Auth from './component/Auth'
import AuthContext from './auth-contex'


const app = props => {

const [page, setPage] = useState('auth')
const [authStatus, setAuthStatus] = useState(false)

const switchPage = (pageName) =>{
  setPage(pageName)
}
const login = () => {
  setAuthStatus(true)
}

  return(
    <div className="App">
    <AuthContext.Provider>
      <Header 
          onLoadTodos={switchPage.bind(this, 'todos')} 
          onLoadAuth={switchPage.bind(this, 'auth')} />
        <hr/>
        {page == 'auth' ? <Auth/> : <Todo/>}
    </AuthContext.Provider>
      
    </div>
  )
}


export default app;
