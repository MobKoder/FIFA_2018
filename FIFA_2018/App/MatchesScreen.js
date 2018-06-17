import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

import * as NetworkCall from "./NetworkCall";
var dateFormat = require("dateformat");

class MatchesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      groups: null,
      matches: null,
      teams: null,
      stadiums: null
    };
  }

  fetchData() {
    NetworkCall.fetchFullData().then(response => {
      if (response) {
        this.setState({
          response,
          groups: NetworkCall.groupsInfo(),
          matches: NetworkCall.allMatches(),
          teams: NetworkCall.teams(),
          stadiums: NetworkCall.stadiums()
        });
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 5, fontSize: 20 }}>Matches</Text>
        <ScrollView bounces={true} style={{ flexDirection: "column" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 5
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                backgroundColor: "#FF0000",
                margin: 10
              }}
            />
            {this.createGroups()}
          </View>
        </ScrollView>
      </View>
    );
  }

  createGroups() {
    let groups = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let groupsCard = [];
    groups.forEach(group => {
      if (!this.state.groups) {
        return;
      }
      groupsCard.push(this.createGroupsCard(this.state.groups[group]));
    });
    return groupsCard;
  }

  createGroupsCard(group) {
    return (
      <View
        key={group.name}
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#FFFFFF",
          margin: 5
        }}
      >
        <Text style={{ margin: 10, fontSize: 20 }}>{group.name}</Text>
        {this.createGroupMatches(group.matches)}
      </View>
    );
  }

  createGroupMatches(matches) {
    let matchesTable = [];
    matches.forEach((match, index) => {
      {
        matchesTable.push(this.createMatchTable(match));
        if (index < matches.length) {
          matchesTable.push(
            <View
              style={{
                height: 1,
                backgroundColor: "#DDDDDD",
                marginHorizontal: 5
              }}
            />
          );
        }
      }
    });
    return matchesTable;
  }

  createMatchTable(match) {
    var now = new Date(match.date);
    var localDate = dateFormat(now, "dd - mmm, HH:MM");
    return (
      <View
        key={match.name}
        style={{
          flex: 1,
          flexDirection: "row",
          margin: 5
        }}
      >
        <Text style={{ flex: 2 }}>{localDate} </Text>
        <Text
          style={{
            flex: 1,
            textAlign: "right",
            marginHorizontal: 5
          }}
        >
          {this.state.teams[match.home_team - 1].emojiString}
        </Text>

        <Text style={{ flex: 2 }}>
          {this.state.teams[match.home_team - 1].name}
        </Text>

        <Text style={{ flex: 1, textAlign: "center" }}>
          {match.home_result}
        </Text>

        <Text style={{ flex: 1, textAlign: "center" }}>Vs</Text>
        <Text style={{ flex: 1, textAlign: "center" }}>
          {match.away_result}
        </Text>

        <Text style={{ flex: 1, textAlign: "right", marginHorizontal: 5 }}>
          {this.state.teams[match.away_team - 1].emojiString}
        </Text>
        <Text style={{ flex: 2 }}>
          {this.state.teams[match.away_team - 1].name}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#EEEEEE"
  }
});

export default MatchesScreen;
