import React, { Component } from "react";
import {
  View,
  Text,
  SectionList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import * as NetworkCall from "./NetworkCall";
const Constants = require('./MKConstants');
import teams from './teams.json';

class TeamScreen extends Component {
  constructor(props) {
    super(props);
  }

  getSectionListItem = (item, section, index) => {
  }

   renderItem = ({
     item,
     section,
     index,
     separators
   }) => {
     let backgroundColor = Constants.Colors.white;
     let color = '#000';
     return ( <TouchableOpacity activeOpacity = {
         1.0
       }
       style = {
         {
           height: 50,
           paddingHorizontal: 20,
           backgroundColor,
           marginBottom: 1,
           flexDirection: 'row'
         }
       }
       onPress = {
         this.getSectionListItem.bind(this, item, section, index)
       } >
        < Image
        style = {
          styles.FlagItemStyle
        }
        source = {
          {
            uri: item.flag
          }
        }
        />
       <Text style = {
         [styles.SectionListItemStyle, {
           backgroundColor,
           color
         }]
       }> {
         item.name
       } </Text> 
       </TouchableOpacity >
     );
   }

  componentDidMount() {
    console.log(NetworkCall.knockoutMatches());
    //this.fetchData();
  }

  render() {
    return (
      <View style={styles.container}>
         <SectionList
         sections = {
             [{
                 title: '',
                 data: teams
               },
               ]
               }
             renderItem = {
               this.renderItem
             }
             keyExtractor = {
               (item, index) => index
             }
             />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white"
  },
  SectionListItemStyle: {
    fontSize: 25,
    color: Constants.Colors.black,
    fontFamily: Constants.Fonts.Light,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  FlagItemStyle: {
    height:25,
    width: 25,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default TeamScreen;

