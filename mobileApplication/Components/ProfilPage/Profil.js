import React from 'react';
import { SafeAreaView, Image, StyleSheet, Text, View, List, FlatList, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';

class Profil extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ip_host: "null",
            username: "null",
        }
    }

    _choseNavigation = (key) => {
        if (key == "AREA") {
            this.props.navigation.navigate('AREA')
        } else if (key == "Profil") {
            this.props.navigation.navigate('Profil')
        } else if (key == "Services") {
            this.props.navigation.navigate('Services')
        } else if (key == "Home") {
            this.props.navigation.navigate('HomePage')
        }
    }


    componentDidMount() {
        AsyncStorage.getItem('IP_Host')
            .then((data) => this.setState({ ip_host: data }))
            .catch((error) => console.error(error))
        AsyncStorage.getItem('UserName')
            .then((data) => this.setState({ username: data }))
            .catch((error) => console.error(error))

        console.info("Call database to recup profil info user")

        console.log("payload: ", payload)

        const payload = {
            UserName: this.state.username,
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
                this.setState({ userID: data[0].userID })
            }).catch((error) => console.log(error));
    }


    render() {
        return (
            <View style={styles.containterProfil}>
                <Header choseNavigation={this._choseNavigation} />
                <View style={styles.container}>
                    <View style={styles.topProfil}>
                        <Image style={styles.tinyLogo} source={require('../../assets/Logo-AREA.png')} />
                    </View>
                    <View style={styles.midProfil}>
                        <Text style={{ fontSize: 20 }} >Username : {this.state.username}</Text>
                        <Text style={{ fontSize: 20 }} >Ip host : {this.state.ip_host}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containterProfil: {
        backgroundColor: 'white',
        flex: 1,
    },
    container: {
        flex: 1,
        margin: 20,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#7CE0B7'
    },
    topProfil: {
        flex: 1,
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    midProfil: {
        flex: 3,
        margin: 10,
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    tinyLogo: {
        width: 250,
        height: 120,
    }
});

export default Profil;