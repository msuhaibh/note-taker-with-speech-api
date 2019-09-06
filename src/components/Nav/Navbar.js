import './Navbar.css';
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography component="h1" variant="h6" color="inherit">
                    Note Taker With Speech Recognition Api
                </Typography>
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;