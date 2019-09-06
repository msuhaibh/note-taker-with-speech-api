import React, {Component} from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextCommands from '../TextCommands/TextCommands.js'
import VoiceCommands from '../VoiceCommands/VoiceCommands.js'
import ToDoItems from '../ToDoItems/ToDoItems.js'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
const uuidv4 = require('uuid/v4');

function TabPanel(props) {
    const {
        children,
        value,
        index,
        ...other
    } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}>
            <Box p={3}>{children}</Box>
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`};
}

class CustomTabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            value: 0
        };
    }

    addItem = (noteContent) => {
        if (noteContent) {
            const newItem = {
                text: noteContent,
                key: uuidv4()
            }

            this.setState((prevState) => {
                return {
                    items: prevState
                        .items
                        .concat(newItem)
                }
            });
        }
    }

    deleteItem = (key) => {
        const filteredItems = this
            .state
            .items
            .filter(function (item) {
                return (item.key !== key)
            });

        this.setState({items: filteredItems});
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue})
    };

    render() {
        return (
            <div>
                <Grid container direction="row">
                    <Grid item xs={12}>
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered>
                            <Tab label="Add By Speech" {...a11yProps(0)}/>
                            <Tab label="Add By Text" {...a11yProps(1)}/>
                            <Tab label="Your Notes" {...a11yProps(2)}/>
                        </Tabs>
                    </Grid>
                </Grid>
                <TabPanel value={this.state.value} index={0}>
                    <VoiceCommands entries={this.state.items} addItem={this.addItem}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <TextCommands entries={this.state.items} addItem={this.addItem}/>
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <ToDoItems entries={this.state.items} deleteItem={this.deleteItem}/>
                </TabPanel>
            </div>
        );
    }
}

export default CustomTabs;
