import React, { Component } from 'react';
import { StyleSheet, Linking, View, Modal, SectionList, AsyncStorage, TouchableOpacity, Text, Platform, Alert } from 'react-native';
import librariesInfo from './librariesInfoData.json';
import { trackScreenView } from './QHGaTracking';

const Constants = require('./MKConstants');
export default class QHCredits extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    componentDidMount() {
        trackScreenView("Open Source Credits");
    }

    renderItem = ({ item, section, index, separators }) => {
        return (
            <TouchableOpacity
                activeOpacity={1.0}
                style={{ paddingVertical: 8, backgroundColor: Constants.Colors.white, marginBottom: 1 }}
                onPress={this.GetSectionListItem.bind(this, item, section, index)}
            >
                <Text
                    style={ styles.SectionListItemStyle }
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        );
    }

    GetSectionListItem = (item, section, index) => {
        if (item.url) {
            Linking.canOpenURL(item.url).then(supported => {
                if (supported) {
                    Linking.openURL(item.url);
                } else {
                    console.log('Not able to open Url: ' + item.url);
                }
            });
        }
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
                    Credits
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
        return (
            <Modal
                {...this.props}
                transparent
                visible={this.state.visible}
                animationType={'slide'}
                onRequestClose={this._onPressOverlay.bind(this)}
            >
                {this._headerView()}
                <View style={{ flex: 1, backgroundColor: '#e3e9f2'}}>
                    <SectionList
                        sections={[
                            { title: '', data: librariesInfo },
                        ]}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    SectionHeaderStyle: {
        backgroundColor: '#0461f7',
        fontSize: 20,
        padding: 5,
        color: Constants.Colors.white,
    },
    SectionListItemStyle: {
        fontSize: 15,
        marginHorizontal: 5,
        color: Constants.Colors.black,
    },
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