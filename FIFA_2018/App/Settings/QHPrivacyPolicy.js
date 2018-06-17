import React, { Component } from 'react';
import { StyleSheet, WebView, Modal, View, TouchableOpacity, Text, Platform } from 'react-native';
import { trackScreenView } from './QHGaTracking';

const Constants = require('./MKConstants');
export default class QHPrivacyPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    componentDidMount() {
        trackScreenView("Privacy Policy");
    }

    _onPressOverlay() {
        if (this.state.visible) {
            if (this.props.dismiss) {
                this.props.dismiss();
            }
            setTimeout(() => {
                this._dismiss();
            }, this.props.delay);
        }
    }

    _dismiss() {
        this.state.visible = false;
    }

    _headerView() {
        return (
            <View style={styles.header} >
                <Text
                    style={styles.headerTitle}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    Privacy Policy
                </Text>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={this._onPressOverlay.bind(this)}
                >
                    <View style={styles.CircleShapeView}>
                        <Text style={styles.closeButton}> X </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const source = (Platform.OS) === 'ios' ? require('./privacyPolicy.html') : { uri: 'file:///android_asset/privacyPolicy.html' };
        return (
            <Modal
                {...this.props}
                transparent
                visible={this.state.visible}
                animationType={'slide'}
                onRequestClose={this._onPressOverlay.bind(this)}
            >
                {this._headerView()}
                <WebView
                    style={{ flex: 1, backgroundColor: '#e3e9f2' }}
                    source={source}
                />
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        //height: 1,
        paddingHorizontal: 10,
        marginTop: (Platform.OS) == 'ios' ? 20 : 0,
        flexDirection: 'row',
        backgroundColor: '#0461f7',
    },
    headerTitle: {
        flex: 1,
        fontFamily: Constants.Fonts.Light,
        fontSize: 25,
        color: Constants.Colors.white,
        textAlign: 'center',
    },
    closeButton: {
        fontFamily: Constants.Fonts.Light,
        fontSize: 15,
        color: Constants.Colors.white,
        textAlign: 'left',
    },
    CircleShapeView: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#f4f5f7',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 2
    },
});
