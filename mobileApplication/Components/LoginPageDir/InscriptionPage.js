import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Keyboard, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

class InscriptionPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ip_host: "",
            password: "",
            confirmPassword: "",
            userName: ""
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP_Host')
            .then((data) => this.setState({ ip_host: data }))
            .catch((error) => console.error(error))
    }

    _onSubmit() {
        if (this.state.password != this.state.confirmPassword) {
            alert("Please enter the same password on both field ;(")
            return;
        }

        console.info("-- | Call the DataBase to add a new user, Inscription | --")

        const payload = {
            UserName: this.state.userName,
            UserPassword: this.state.confirmPassword
        }

        fetch('http://' + this.state.ip_host + ':8080/db/addUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                if (data == null)
                    alert("This user already exist..")
                else {
                    alert("You will be redirected to the login page ;)")
                    this.props.navigation.navigate('ConnexionPage')
                }
            }).catch((error) => {
                console.log(error)
            });

    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}
                accessible={false}>
                <View style={styles_inscription.Inscription}>
                    <View style={styles_inscription.Inscription_Title}>
                        <Text style={{ fontSize: 25 }}>Inscription</Text>
                    </View>
                    <View style={styles_inscription.container_form}>
                        <View style={styles_inscription.row}>
                            <View>
                                <Text style={styles_inscription.label}>Username : </Text>
                            </View>
                            <TextInput
                                style={styles_inscription.textIpInput}
                                placeholder={"Your userName"}
                                onChangeText={(value) => { this.setState({ userName: value }) }}
                                minLength={4}
                                required
                            />
                        </View>
                        <View style={styles_inscription.row}>
                            <View>
                                <Text style={styles_inscription.label}>Password : </Text>
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={styles_inscription.textIpInput}
                                placeholder={"**************"}
                                minLength={7}
                                onChangeText={(value) => { this.setState({ password: value }) }}
                                required
                            />
                        </View>
                        <View style={styles_inscription.row}>
                            <View>
                                <Text style={styles_inscription.label}>Confirm your password : </Text>
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={styles_inscription.textIpInput}
                                placeholder={"**************"}
                                minLength={7}
                                onChangeText={(value) => { this.setState({ confirmPassword: value }) }}
                                required
                            />
                        </View>
                        <HideWithKeyboard>
                            <Button color="#7CE0B7" title="submit" onPress={() => { this._onSubmit() }} />
                        </HideWithKeyboard>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles_inscription = StyleSheet.create({
    Inscription: {
        flex: 1,
        backgroundColor: 'white'
    },
    Inscription_Title: {
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
    },
    container_form: {
        flex: 0.5,
        justifyContent: 'space-around',
        paddingBottom: 15,
        marginLeft: 10,
        marginRight: 10,
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
    },
    textIpInput: {
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomWidth: 2,
        backgroundColor: "#e7e7e7",
        borderColor: "#7CE0B7",
    },
})

export default InscriptionPage;