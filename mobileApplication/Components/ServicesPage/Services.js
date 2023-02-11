import React from 'react';
import { StyleSheet, Text, View, Linking, Image, TouchableOpacity } from 'react-native';
import Header from '../Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Services extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            ip_host: "null",
            username: "",
            
            discordConnect: false,
            twitterConnect: false,
            gitHubConnect: false,
            spotifyConnect: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP_Host')
            .then((data) => this.setState({ ip_host: data }))
            .catch((error) => console.error(error))
        AsyncStorage.getItem('UserName')
            .then((data) => this.setState({ username: data }))
            .catch((error) => console.error(error))
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

    _connectToDiscord = async () => {
        console.log("Connect to discord")

        const payload = {
            UserName: this.state.username,
        }

        fetch('http://' + this.state.ip_host + ':8080/discord/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.text())
            .then(data => {
                if (data == '"status:connected"') {
                    this.setState({ discordConnect: true })
                    console.log("INFO : Already Connected")
                    return
                }

                const urlstate = Linking.canOpenURL(data)

                if (urlstate == false) {
                    alert("There is an error with the server.. try again later.. sorry")
                } else {
                    // url = data.replace("localhost", this.state.ip_host)
                    // Linking.openURL(url)
                    Linking.openURL(data)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _connectToTwitter = async () => {
        console.log("Connect to Twitter")

        const payload = {
            UserName: this.state.username,
        }

        fetch('http://' + this.state.ip_host + ':8080/twitter/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.text())
            .then(data => {
                if (data == '"status:connected"') {
                    this.setState({ twitterConnect: true })
                    console.log("INFO : Already Connected")
                    return
                }

                const urlstate = Linking.canOpenURL(data)

                if (urlstate == false) {
                    alert("There is an error with the server.. try again later.. sorry")
                } else {
                    // url = data.replace("localhost", this.state.ip_host)
                    // Linking.openURL(url)
                    Linking.openURL(data)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    _connectToSpotify = async () => {
        console.log("Connect to Spotify")

        const payload = {
            UserName: this.state.username,
        }

        fetch('http://' + this.state.ip_host + ':8080/spotify/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)

        })
            .then(response => response.text())
            .then(data => {
                if (data == '"status:connected"') {
                    this.setState({ spotifyConnect: true })
                    console.log("INFO : Already Connected")
                    return
                }

                const urlstate = Linking.canOpenURL(data)

                if (urlstate == false) {
                    alert("There is an error with the server.. try again later.. sorry")
                } else {
                    // url = data.replace("localhost", this.state.ip_host)
                    // Linking.openURL(url)
                    Linking.openURL(data)
                }
            })
            .catch((error) => {
                alert("There is an error with the server.. try again later.. sorry")
                console.log(error)
            });
    }

    _connectToGitHub = async () => {
        console.log("Connect to GitHub")

        const payload = {
            UserName: this.state.username,
        }

        fetch('http://' + this.state.ip_host + ':8080/github/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.text())
            .then(data => {
                if (data == '"status:connected"') {
                    this.setState({ gitHubConnect: true })
                    console.log("INFO : Already Connected")
                    return
                }

                const urlstate = Linking.canOpenURL(data)

                if (urlstate == false) {
                    alert("There is an error with the server.. try again later.. sorry")
                } else {
                    // url = data.replace("localhost", this.state.ip_host)
                    // Linking.openURL(url)
                    Linking.openURL(data)
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }

    render() {

        return (
            <View>
                <Header choseNavigation={this._choseNavigation} />
                <View style={styles.service}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ margin: 25 }} onPress={this._connectToDiscord}>
                            <Image style={styles.tinyLogo} source={require('../../assets/Discord-Logo.png')} />
                            {
                                this.state.discordConnect
                                    ?
                                    <Text style={{ fontSize: 16, color: '#7CE0B7' }}>Discord</Text>
                                    :
                                    <Text style={{ fontSize: 16, color: 'red' }}>Discord</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 25 }} onPress={this._connectToSpotify}>
                            <Image style={styles.tinyLogo} source={require('../../assets/Spotify-Logo.png')} />
                            {
                                this.state.spotifyConnect
                                    ?
                                    <Text style={{ fontSize: 16, color: '#7CE0B7' }}>Spotify</Text>
                                    :
                                    <Text style={{ fontSize: 16, color: 'red' }}>Spotify</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 25 }}  onPress={this._connectToGitHub}>
                            <Image style={styles.tinyLogo} source={require('../../assets/GitHub-Logo.png')} />
                            {
                                this.state.gitHubConnect
                                    ?
                                    <Text style={{ fontSize: 16, color: '#7CE0B7' }}>GitHub</Text>
                                    :
                                    <Text style={{ fontSize: 16, color: 'red' }}>GitHub</Text>
                            }
                        </TouchableOpacity>
                        <TouchableOpacity style={{ margin: 25 }} onPress={this._connectToTwitter}>
                            <Image style={styles.tinyLogo} source={require('../../assets/Twitter-Logo.png')} />
                            {
                                this.state.twitterConnect
                                    ?
                                    <Text style={{ fontSize: 16, color: '#7CE0B7' }}>Twitter</Text>
                                    :
                                    <Text style={{ fontSize: 16, color: 'red' }}>Twitter</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    service: {
        marginTop: 30,
        marginRight: 0,
        marginLeft: 0,
        flexDirection: 'column'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

export default Services;