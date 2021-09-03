import React from 'react';
import { sensor } from '../lib/Sensor';
import Climate from './Climate';
import Footer from './Footer';
import Header from './Header';

import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper/Paper';

function App() {
    return (
        <Container maxWidth="sm" className="App">
            <Paper>
                <Header title="Weather forecast "></Header>
                <Climate sensor={sensor}></Climate>
                <Footer companyName="Powered by Group1" year={2021}></Footer>
            </Paper>
        </Container>
    );
}

export default App;