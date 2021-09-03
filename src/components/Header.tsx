import React from 'react'
import { Typography } from '@material-ui/core';

function Header({ title }: { title: string }) {
    return (
        <div style={{ display: 'left' }}>
            <Typography variant="h4" component="h1" gutterBottom >{title}</Typography>
            <img src={'./favicon.png'} className="App-logo" alt="logo" style={{ width: '5em' }} />
        </div>
    );
}

export default Header;