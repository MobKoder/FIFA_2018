import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { StackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import DetailScreen from "./detail";
import MainScreen from "./main";
import MatchesScreen from "./MatchesScreen";
import TeamScreen from "./TeamScreen";
import SettingsScreen from "./Settings/Settings";

export const HomeStack = StackNavigator({
  Home: {
    screen: MainScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")} />
      ),
      headerStyle: {
        paddingRight: 2,
        paddingLeft: 2,
        backgroundColor: "#ED4147"
      }
    })
  },
  Detail: {
    screen: DetailScreen,
    navigationOptions: props => ({
      title: "Detail"
    })
  }
});

export const MatchesStack = StackNavigator({
  Matches: {
    screen: MatchesScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Matches",
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")} />
      ),
      headerStyle: {
        paddingRight: 2,
        paddingLeft: 2,
        backgroundColor: "#ED4147"
      }
    })
  }
});

export const TeamStack = StackNavigator({
  Teams: {
    screen: TeamScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Teams",
      headerRight: (
        < TouchableOpacity onPress = {
          () => navigation.navigate("Settings")
        } >
        < Icon name = "info-circle"
        color = "#FFFFFF"
        size = {
          24
        }
        />
        />
        </TouchableOpacity>
      ),
      headerStyle: {
        paddingRight: 5,
        paddingLeft: 2,
        backgroundColor: "#ED4147"
      }
    })
  },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: props => ({
        title: "About",
        headerStyle: {
          paddingRight: 5,
          paddingLeft: 2,
          backgroundColor: "#ED4147",
        }
      })
    }
});
