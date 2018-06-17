import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";

import * as NetworkCall from "./NetworkCall";

class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "",
      previousFiveMatches: [],
      nextFiveMatches: [],
      team: null,
      currentMatch: {
        name: "",
        home_team: "",
        home_result: 0,
        away_team: "",
        away_result: 0
      }
    };
  }

  fetchData() {
    NetworkCall.fetchFullData().then(response => {
      if (response) {
        this.setState({
          response,
          previousFiveMatches: NetworkCall.previousFiveMatches(),
          nextFiveMatches: NetworkCall.nextFiveMatches(),
          team: NetworkCall.teams(),
          currentMatch: NetworkCall.currentMatch()
        });
      }
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  getCurrentScore() {
    let currentMatch = this.state.currentMatch;
    let homeTeam = this.state.team
      ? this.state.team[currentMatch.home_team - 1].name
      : "-";
    let awayTeam = this.state.team
      ? this.state.team[currentMatch.away_team - 1].name
      : "-";

    return (
      <View
        style={{
          flex: 1,
          height: 200,
          backgroundColor: "#ED414722",
          flexDirection: "row",
          margin: 16
        }}
      >
        <View style={{ flex: 1 }} />
        <View
          style={{
            flex: 4,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Text style={{ alignItems: "center", fontSize: 20 }}>
            Match {currentMatch.name}
          </Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            <View
              style={{
                flex: 1,
                alignItems: "flex-end"
              }}
            >
              <Text style={{ alignItems: "center", fontSize: 80 }}>
                {currentMatch.home_result || 0}
              </Text>
              <Text style={{ alignItems: "center", fontSize: 20 }}>
                {homeTeam}
              </Text>
            </View>

            <Text style={{ alignItems: "center", fontSize: 80 }}> - </Text>

            <View style={{ flex: 1 }}>
              <Text style={{ alignItems: "center", fontSize: 80 }}>
                {currentMatch.away_result || 0}
              </Text>
              <Text style={{ alignItems: "center", fontSize: 20 }}>
                {awayTeam}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row"
          }}
        />
      </View>
    );
  }

  getRecentFixtures() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5
          }}
        >
          <Text
            style={{
              flex: 1,
              marginHorizontal: 5,
              fontSize: 18
            }}
          >
            Last Five Fixtures:
          </Text>
          <Text
            style={{
              flex: 1,
              marginHorizontal: 5,
              fontSize: 18
            }}
          >
            Next Five Fixtures:
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            marginHorizontal: 5
          }}
        >
          {this.createFixturesList()}
        </View>

      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView bounces={true} style={{ flexDirection: "column" }}>
          {this.getCurrentScore()}
          {this.getRecentFixtures()}
        </ScrollView>
      </View>
    );
  }

  createLastFixtureItem(fixture) {
    let homeTeam = this.state.team[fixture.home_team - 1].name;
    let awayTeam = this.state.team[fixture.away_team - 1].name;
    let homeResult = fixture.home_result;
    let awayResult = fixture.away_result;
    let homeFlag = this.state.team[fixture.home_team - 1].emojiString;
    let awayFlag = this.state.team[fixture.away_team - 1].emojiString;

    return (
      <View
        key={fixture.name}
        style={{
          flex: 1,
          flexDirection: "column",
          marginVertical: 10,
          alignItems: "flex-start"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={{ textAlign: "left", marginHorizontal: 5 }}>
            {homeFlag}
          </Text>
          <Text>{homeTeam}</Text>
          <Text style={{ marginHorizontal: 5 }}>{homeResult}</Text>
        </View>
        <Text style={{ marginHorizontal: 40 }}>Vs</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={{ textAlign: "left", marginHorizontal: 5 }}>
            {awayFlag}
          </Text>
          <Text>{awayTeam}</Text>
          <Text style={{ marginHorizontal: 5 }}>{awayResult}</Text>
        </View>
      </View>
    );
  }

  createNextFixtureItem(fixture) {
    let homeTeam = this.state.team[fixture.home_team - 1].name;
    let awayTeam = this.state.team[fixture.away_team - 1].name;
    let homeFlag = this.state.team[fixture.home_team - 1].emojiString;
    let awayFlag = this.state.team[fixture.away_team - 1].emojiString;

    return (
      <View
        key={fixture.name}
        style={{
          flex: 1,
          flexDirection: "column",
          marginVertical: 10,
          alignItems: "flex-start"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={{ textAlign: "left", marginHorizontal: 5 }}>
            {homeFlag}
          </Text>
          <Text>{homeTeam}</Text>
        </View>
        <Text style={{ marginHorizontal: 40 }}> Vs </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text style={{ textAlign: "left", marginHorizontal: 5 }}>
            {awayFlag}
          </Text>
          <Text>{awayTeam}</Text>
        </View>
      </View>
    );
  }

  createFixturesList() {
    let view = [];
    if (
      (this.state.previousFiveMatches &&
        this.state.previousFiveMatches.length > 0) ||
      (this.state.nextFiveMatches && this.state.nextFiveMatches.length > 0)
    ) {
      for (var index = 0; index < 5; index++) {
        let lineView = [];
        if (this.state.previousFiveMatches[index]) {
          lineView.push(
            this.createLastFixtureItem(this.state.previousFiveMatches[index])
          );
        } else {
          lineView.push(
            <View
              style={{
                flex: 1,
                marginHorizontal: 5,
                alignItems: "center"
              }}
              key={index}
            />
          );
        }

        if (this.state.nextFiveMatches[index]) {
          lineView.push(
            this.createNextFixtureItem(this.state.nextFiveMatches[index])
          );
        } else {
          lineView.push(
            <View
              style={{
                flex: 1,
                marginHorizontal: 5,
                alignItems: "center"
              }}
              key={index}
            />
          );
        }

        view.push(
          <View
            key={index}
            style={{
              flex: 1,
              flexDirection: "row"
            }}
          >
            {lineView}
          </View>
        );
      }
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column"
          }}
        >
          {view}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white"
  }
});

export default MainScreen;
