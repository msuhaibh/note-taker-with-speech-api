import React from 'react';
import "./App.css";
import Navbar from '../Nav/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomTabs from '../Nav/Tabs.js';

const App = () => {
    return (
        <React.Fragment>
            <CssBaseline>
                <Navbar/>
                <CustomTabs />
            </CssBaseline>
        </React.Fragment>
    )
};

export default App;