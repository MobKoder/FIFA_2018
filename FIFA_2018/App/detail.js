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
        if (!this.state.response) {
            return ( < View / > );
        }
        const currentMatch1 = NetworkCall.currentMatch();
        const previousFiveMatches1 = NetworkCall.previousFiveMatches();
        const nextFiveMatches1 = NetworkCall.nextFiveMatches();
        const team = NetworkCall.teams();
        const stadium = NetworkCall.stadiums();
        const matches = NetworkCall.allMatches();
        const group = NetworkCall.groupsInfo();

        return ( < View >
            <
            Text > {currentMatch1.name} < /Text> <
            Text > {
                previousFiveMatches1[0].matchday
            } < /Text> <
            Text > {
                nextFiveMatches1[0].matchday
            } < /Text> <
            Text > {
                team[0].name
            } < /Text> <
            Text > {
                stadium[0].name
            } < /Text> <
            Text > {matches[0].name} < /Text> <
            Text > {group.a.name} < /Text> < /
            View > );
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
            {
                this.test()
            }
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