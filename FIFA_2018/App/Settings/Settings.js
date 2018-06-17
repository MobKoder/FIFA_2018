import React, {
    Component
} from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Linking,
    Share,
    SectionList,
    AsyncStorage,
    TouchableOpacity,
    Text,
    Platform,
    Alert
} from 'react-native';
//import Communications from 'react-native-communications';
// import QHCredits from './QHCredits';
// import QHPrivacyPolicy from './QHPrivacyPolicy';

const Constants = require('./../MKConstants');
//const url = 'https://play.google.com/store/apps/details?id=com.qiknews';
class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            currentSelectedRow: -1
        };
    }

   getSectionListItem = (item, section, index) => {}

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
            <
           Text style = {
               [styles.SectionListItemStyle, {
                   backgroundColor,
                   color
               }]
           } > {
               item
           } </Text> 
            </TouchableOpacity>
       );
   }
   
   render() {
    const info = ['FIFA 2018 v1.0.0 - Copyright© 2018 MobKoder', 'Rate us', 'Send Feedback', 'Share App', 'Credits', 'Privacy policy', ];

       return ( <View style = {
               styles.container
           } >
           <SectionList sections = {
               [{
                   title: 'About',
                   data: info
               }, ]
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
           margin: 5,
           justifyContent: 'center',
           alignItems: 'center'
       },
   });

export default Settings;

