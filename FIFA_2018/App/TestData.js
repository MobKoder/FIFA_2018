import React, {
    Component
} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import * as NetworkCall from './NetworkCall';

class DetailScreen extends Component {

     constructor(props) {
         super(props);
         this.state = {
             response: ''
         }
     }

    test() {
        if(!this.state.response) {
        return (<View/>);
        }
        const currentMatch1 = NetworkCall.currentMatch();
        const previousFiveMatches1 = NetworkCall.previousFiveMatches();
        const nextFiveMatches1 = NetworkCall.nextFiveMatches();
        const team = NetworkCall.teams();
        const stadium = NetworkCall.stadiums();
        const matches = NetworkCall.allMatches();
        const group = NetworkCall.groupsInfo();

        return ( <View>
        <Text > currentMatch1 </Text>
        <Text > previousFiveMatches1 </Text>
        <Text > nextFiveMatches1 </Text>
        <Text > team </Text>
        <Text > stadium </Text>
        <Text > matches </Text>
        <Text > group </Text>
        </View>);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        NetworkCall.fetchFullData().then((response) => {
            if (response) {
                this.setState({
                    response
                });
            }
        })
    }

    render() {
        return ( < View style = {
                styles.container
            } >
            <Text > {test()} </Text>  
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DetailScreen;