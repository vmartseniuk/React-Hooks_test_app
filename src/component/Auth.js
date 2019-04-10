import React, { useContext } from 'react'

import AuthContex from '../auth-contex'

const auth = props => {
    const auth = useContext(AuthContex)

    return(
        <button onClick={auth.login} >Log in!</button>

    )
}

export default auth