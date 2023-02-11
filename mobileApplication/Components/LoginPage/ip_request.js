import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, TextInput, Button, Alert, TouchableNativeFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

class IpRequest extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ip_host: "0.0.0.0"
        }
    }

    _storeData = async () => {
        console.log(this.state.ip_host)
        AsyncStorage.setItem("IP_Host", this.state.ip_host)
            .catch((error) => console.error(error))
        Alert.alert('You IP Host will be : ', this.state.ip_host)
        this.props.navigation.navigate('ConnexionPage')
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.label}>IP Host : </Text>
                        </View>
                        <TextInput
                            style={styles.textIpInput}
                            placeholder={"0.0.0.0"}
                            onChangeText={text => { this.setState({ ip_host: text }) }}
                            maxLength={15}
                            minLength={7}
                            autoFocus
                        />
                    </View>
                    <View style={styles.Button}>
                        <Button
                            title='Confirm'
                            color="#7CE0B7"
                            onPress={this._storeData}
                        />
                    </View>
                </SafeAreaView>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    label: {
        paddingLeft: 15,
        paddingBottom: 20,
        paddingTop: 20,
        borderTopLeftRadius: 10,
        borderBottomWidth: 2,
        backgroundColor: "#e7e7e7",
        borderColor: "#7CE0B7",
        fontSize: 25,
    },
    textIpInput: {
        fontSize: 25,
        padding: 20,
        paddingLeft: 0,
        borderTopRightRadius: 10,
        borderBottomWidth: 2,
        backgroundColor: "#e7e7e7",
        borderColor: "#7CE0B7",
    },
    Button: {
        margin: 10,
    }
});

export default IpRequest;