import React, { Component } from "react";
import { createBottomTabNavigator, TabView } from "react-navigation";
import Icon from "react-native-vector-icons/FontAwesome";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconMaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import { HomeStack, MatchesStack, TeamStack } from "./stacknav";

const tabNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <IconIonicons name={"ios-home-outline"} size={30} color={tintColor} />
        )
      }
    },
    Matches: {
      screen: MatchesStack,
      navigationOptions: {
        tabBarLabel: "Matches",
        tabBarIcon: ({ tintColor }) => (
          <IconIonicons
            name={"ios-football-outline"}
            size={30}
            color={tintColor}
          />
        )
      }
    },
    Team: {
      screen: TeamStack,
      navigationOptions: {
        tabBarLabel: "Team",
        tabBarIcon: ({ tintColor }) => (
          <IconMaterialCommunity
            name={"account-group"}
            size={30}
            color={tintColor}
          />
        )
      }
    }

    ///... add more tabs here
  },
  {
    tabBarOptions: {
      activeTintColor: "#FFFFFF",
      inactiveTintColor: "#DDDDDD",
      style: {
        backgroundColor: "#ED4147"
      }
    }
  }
);

export default tabNav;
