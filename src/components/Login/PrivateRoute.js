import React from 'react'
import { Redirect, Route } from 'react-router-dom'



export default function PrivateRoute({ children, user, ...rest }) {



    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: location }
                        }}
                    />
                )}
        />
    )
}
