import React from 'react';
import {BrowserRouter as Link} from 'react-router-dom';

export default class HomePage extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome to Course Manager!</h1>
                <Link to='/courses'>Click here to see the your list of courses.</Link>
            </div>
        )
    }
}