import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableNativeFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

class ConnexionPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ip_host: "",
            password: "",
            userName: ""
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP_Host')
            .then((data) => this.setState({ ip_host: data }))
            .catch((error) => console.error(error))
    }

    _onSubmit() {
        const userName = this.state.userName;
        const user_entry_mdp = this.state.password;

        const payload = {
            UserName: this.state.userName,
        }

        fetch('http://' + this.state.ip_host + ':8080/db/getUser', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(data => {
                if (data[0].userPassword == user_entry_mdp) {
                    AsyncStorage.setItem("UserName", payload.UserName)
                    this.props.navigation.navigate('HomePage')
                } else {
                    alert('You have entered a bad password : ', user_entry_mdp, " or a bad username : ", userName)
                }
            }).catch((error) => console.log(error));
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles_connexion.Connexion}>
                    <View style={styles_connexion.Connexion_Title}>
                        <Text style={{ fontSize: 25 }}>Connexion</Text>
                    </View>
                    <View style={styles_connexion.container_form}>
                        <View style={styles_connexion.row}>
                            <View>
                                <Text style={styles_connexion.label}>userName : </Text>
                            </View>
                            <TextInput
                                style={styles_connexion.textIpInput}
                                placeholder={"your userName"}
                                onChangeText={(value) => { this.setState({ userName: value }) }}
                                required
                            />
                        </View>
                        <View style={styles_connexion.row}>
                            <View>
                                <Text style={styles_connexion.label}>Password : </Text>
                            </View>
                            <TextInput
                                secureTextEntry={true}
                                style={styles_connexion.textIpInput}
                                placeholder={"**************"}
                                onChangeText={(value) => { this.setState({ password: value }) }}
                                required
                            />
                        </View>
                        <HideWithKeyboard>
                            <Button color="#7CE0B7" title="submit" onPress={() => { this._onSubmit() }} />
                        </HideWithKeyboard>
                        <Button color="#7CE0B7" title="Inscription" onPress={() => { this.props.navigation.navigate('InscriptionPage') }} />
                    </View>
                </View>
            </TouchableNativeFeedback>
        )
    }
}

const styles_connexion = StyleSheet.create({
    Connexion: {
        flex: 1,
        backgroundColor: 'white'
    },
    Connexion_Title: {
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
    },
    container_form: {
        flex: 0.45,
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

export default ConnexionPage