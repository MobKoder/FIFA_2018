// import { AppRegistry } from 'react-native';
// import App from './App';

// AppRegistry.registerComponent('FIFA_2018', () => App);


import React, {
    Component
} from 'react';
import {
    AppRegistry
} from 'react-native';
import {
    DrawerNavigator
} from 'react-navigation';
import Icon from "react-native-vector-icons/FontAwesome";
import tabNav from './App/tabnav';

const drawernav = DrawerNavigator({
    DrawerItem1: {
        screen: tabNav,
        navigationOptions: {
            drawerLabel: "Drawer Item 1",
            drawerIcon: ({
                tintColor
            }) => < Icon name = "rocket"
            size = {
                24
            }
            />
        },
    }
});

AppRegistry.registerComponent('FIFA_2018', () => drawernav);