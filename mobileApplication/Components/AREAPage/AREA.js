import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Header';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

class AREA extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            ip_host: "",
            username: "",

            actionArray: [
                discordAction = false,  // 00
                gitHubAction = false,   // 01
                spotifyAction = false,  // 02
                twitterAction = false,  // 03
                weatherAction = false,  // 04
            ],

            reactionArray: [
                discordReAction = false, // 00
                gitHubReAction = false,  // 01
                spotifyReAction = false, // 02
                twitterReAction = false, // 03
            ],

            // Spotify action / reaction var
            spotifyActionOneSelected: false,
            spotifyReActionOneSelected: false,
            spotifyReActionTwoSelected: false,
            spotifyReActionThreeSelected: false,
            spotifyReActionFoorSelected: false,
            spotifyReActionFiveSelected: false,
            spotifyMessage: "null",

            // Twitter action / reaction var
            twitterActionOneSelected: false,
            twitterActionTwoSelected: false,
            twitterReActionOneSelected: false,
            twitterUsername: "null",
            twitterId: "null",
            twitterMessage: "null",

            // Discord action / reaction var
            discordActionOneSelected: false,
            discordReActionOneSelected: false,
            DmToChannel: "null",

            // GitHub action / reaction var
            gitHubActionOneSelected: false,
            gitHubReActionOneSelected: false,
            BodyIssue: "null",
            TitleIssue: "null",

            // Weather action / reaction var
            weatherActionOneSelected: false,
            weatherActionTwoSelected: false,
            weatherActionThreeSelected: false,
            weatherActionFoorSelected: false,
            inputWeather: false,
            Town: "null",

            action: "null",
            reaction: "null",

        }
    }

    componentDidMount() {
        AsyncStorage.getItem('IP_Host')
            .then((data) => { this.setState({ ip_host: data }) })
            .catch((error) => console.error(error))
        AsyncStorage.getItem('UserName')
            .then((data) => { this.setState({ username: data }) })
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

    _onPressActionDiscord = () => {
        if (this.state.actionArray[0] == false)
            this.setState({ actionArray: [true, false, false, false, false] })
        else
            this.setState({ actionArray: [false, false, false, false, false] })
    }

    _onPressActionSpotify = () => {
        if (this.state.actionArray[2] == false)
            this.setState({ actionArray: [false, false, true, false, false] })
        else
            this.setState({ actionArray: [false, false, false, false, false] })
    }

    _onPressActionGitHub = () => {
        if (this.state.actionArray[1] == false)
            this.setState({ actionArray: [false, true, false, false, false] })
        else
            this.setState({ actionArray: [false, false, false, false, false] })
    }

    _onPressActionTwitter = () => {
        if (this.state.actionArray[3] == false)
            this.setState({ actionArray: [false, false, false, true, false] })
        else
            this.setState({ actionArray: [false, false, false, false, false] })
    }

    _onPressActionWeather = () => {
        if (this.state.actionArray[4] == false)
            this.setState({ actionArray: [false, false, false, false, true] })
        else
            this.setState({ actionArray: [false, false, false, false, false] })
    }

    /////

    _onPressReActionDiscord = () => {
        if (this.state.reactionArray[0] == false)
            this.setState({ reactionArray: [true, false, false, false] })
        else
            this.setState({ reactionArray: [false, false, false, false] })
    }

    _onPressReActionSpotify = () => {
        if (this.state.reactionArray[2] == false)
            this.setState({ reactionArray: [false, false, true, false] })
        else
            this.setState({ reactionArray: [false, false, false, false] })
    }

    _onPressReActionGitHub = () => {
        if (this.state.reactionArray[1] == false)
            this.setState({ reactionArray: [false, true, false, false] })
        else
            this.setState({ reactionArray: [false, false, false, false] })
    }

    _onPressReActionTwitter = () => {
        if (this.state.reactionArray[3] == false)
            this.setState({ reactionArray: [false, false, false, true] })
        else
            this.setState({ reactionArray: [false, false, false, false] })
    }

    //////

    _onConfirm = async () => {
        // Action Check

        twitterOne = false
        twitterTwo = false

        spotifyOne = false
        spotifyOther = false

        gitHub = false

        weather = false

        actionPayload = {}
        reActionPayload = {}

        if (this.state.weatherActionOneSelected == true) { // temp change
            this.setState({ action: "weather/temp_change" })
            actionPayload = {
                city: this.state.Town
            }
            weather = true
        } else if (this.state.weatherActionTwoSelected == true) { // wind_speed
            this.setState({ action: "weather/wind_speed" })
            actionPayload = {
                city: this.state.Town
            }
            weather = true
        } else if (this.state.weatherActionThreeSelected == true) { // UV_index
            this.setState({ action: "weather/uv_index" })
            actionPayload = {
                city: this.state.Town
            }
            weather = true
        } else if (this.state.weatherActionFoorSelected == true) { // Humidity
            this.setState({ action: "weather/humidity" })
            actionPayload = {
                city: this.state.Town
            }
            weather = true
        }

        if (this.state.twitterActionOneSelected == true) { // send a tweet
            this.setState({ action: "twitter/action/tweet" })

            fetch("http://" + this.state.ip_host + ":8080/twitter/user", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            }).then(response => response.json())
                .then(data => {
                    this.setState({ twitterUsername: data.user })
                    setTimeout(() => {
                        actionPayload = {
                            UserName: this.state.twitterUsername,
                        }
                    },
                        1500
                    )
                }).catch((error) => console.log("ERROR :", error));


            twitterOne = true
        } else if (this.state.twitterActionTwoSelected == true) { // mentionned
            this.setState({ action: "twitter/action/mention" })

            fetch("http://" + this.state.ip_host + ':8080/twitter/user', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            })
                .then(response => response.json())
                .then(data => {
                    this.setState({ twitterUsername: data.user })
                    this.setState({ twitterId: data.id })
                    setTimeout(() => {
                        actionPayload = {
                            UserName: this.state.twitterUsername,
                            Id: this.state.twitterId
                        }
                    },
                        1500
                    )
                }).catch((error) => console.log(error));


            twitterTwo = true
        }

        // ReAction Check

        if (this.state.discordReActionOneSelected == true) {
            this.setState({ reaction: "discord/dm" })

            reActionPayload = {
                text: this.state.DmToChannel
            }
        }

        if (this.state.gitHubReActionOneSelected == true) {
            this.setState({ reaction: "github/issue" })

            reActionPayload = {
                title: this.state.TitleIssue,
                body: this.state.BodyIssue
            }
        }

        if (this.state.spotifyReActionOneSelected == true) {
            this.setState({ reaction: "spotify/action/create_playlist" })

            reActionPayload = {
                text: this.state.spotifyMessage
            }
        } else if (this.state.spotifyReActionTwoSelected == true) {
            this.setState({ reaction: "spotify/action/play" })
        } else if (this.state.spotifyReActionThreeSelected == true) {
            this.setState({ reaction: "spotify/action/pause" })
        } else if (this.state.spotifyReActionFoorSelected == true) {
            this.setState({ reaction: "spotify/action/previous" })
        } else if (this.state.spotifyReActionFiveSelected == true) {
            this.setState({ reaction: "spotify/action/next" })
        }

        if (this.state.twitterReActionOneSelected == true) {
            this.setState({ reaction: "twitter/reaction/tweet" })

            reActionPayload = {
                text: this.state.twitterMessage
            }
        }

        // Fetch AREA

        setTimeout(() => {
            console.log("Action: ", this.state.action)
            console.log("Action informations: ", actionPayload)
            console.log("ReAction: ", this.state.reaction)
            console.log("ReAction informations: ", reActionPayload)

            if (twitterOne == true) {
                console.log("INFO: Call AREA Twitter tweet")

                var payload = {
                    UserName: actionPayload.UserName,
                    Reaction: this.state.reaction,
                    text: reActionPayload.text
                }

                console.log("payload : ", payload)

                fetch('http://' + this.state.ip_host + ':8080/' + this.state.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }).then(response => response.json())
                    .then(data => {
                        alert("AREA successfully created !")
                    }).catch((error) => console.log("Error: ", error))
            } else if (twitterTwo == true) {
                console.log("INFO: Call AREA Twitter mention")

                var payload = {
                    UserName: actionPayload.UserName,
                    Id: actionPayload.Id,
                    Reaction: this.state.reaction,
                    text: reActionPayload.text
                }

                console.log("payload : ", payload)

                fetch('http://' + this.state.ip_host + ':8080/' + this.state.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }).then(response => response.json())
                    .then(data => {
                        alert("AREA successfully created !")
                    }).catch((error) => console.log("Error: ", error))
            }

            if (weather == true) {
                console.log("INFO: Call AREA Weather call")

                var payload = {
                    city: actionPayload.city,
                    Reaction: this.state.reaction,
                    text: reActionPayload.text,
                    UserName: this.state.username
                }

                console.log("payload : ", payload)

                fetch('http://' + this.state.ip_host + ':8080/' + this.state.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                }).then(response => response.text())
                    .then(data => {
                        alert("AREA successfully created !")
                    }).catch((error) => console.log("Error: ", error))
            }
        },
            3000
        )

    }

    render() {
        return (
            <View>
                <Header choseNavigation={this._choseNavigation} />
                <View style={styles.service}>
                    <HideWithKeyboard>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {/* <TouchableOpacity onPress={() => { this._onPressActionDiscord() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/Discord-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>Discord</Text>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity onPress={() => { this._onPressActionSpotify() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/Spotify-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>Spotify</Text>
                            </TouchableOpacity> */}
                            {/* <TouchableOpacity onPress={() => { this._onPressActionGitHub() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/GitHub-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>GitHub</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity onPress={() => { this._onPressActionTwitter() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/Twitter-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>Twitter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this._onPressActionWeather() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/Weather-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>Weather</Text>
                            </TouchableOpacity>
                        </View>
                    </HideWithKeyboard>
                    {
                        this.state.actionArray[0]
                        &&
                        <View style={{ textAlign: 'center' }}>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }}>
                                <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >A voir</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.actionArray[2]
                        &&
                        <View>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} >
                                <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >A voir</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.actionArray[1]
                        &&
                        <View>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} >
                                <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >A voir</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.actionArray[3]
                        &&
                        <View>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ twitterActionOneSelected: !this.state.twitterActionOneSelected })}>
                                {
                                    this.state.twitterActionOneSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >When I tweet</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >When I tweet</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ twitterActionTwoSelected: !this.state.twitterActionTwoSelected })}>
                                {
                                    this.state.twitterActionTwoSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >When someone @ me</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >When someone @ me</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.actionArray[4]
                        &&
                        <View>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => {
                                this.setState({ weatherActionOneSelected: !this.state.weatherActionOneSelected })
                                this.setState({ weatherInput: !this.state.weatherInput })
                            }}>
                                {
                                    this.state.weatherActionOneSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Temp change</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Temp change</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => {
                                this.setState({ weatherActionTwoSelected: !this.state.weatherActionTwoSelected })
                                this.setState({ weatherInput: !this.state.weatherInput })
                            }}>
                                {
                                    this.state.weatherActionTwoSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Wind speed</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Wind speed</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => {
                                this.setState({ weatherActionThreeSelected: !this.state.weatherActionThreeSelected })
                                this.setState({ weatherInput: !this.state.weatherInput })
                            }}>
                                {
                                    this.state.weatherActionThreeSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >UV index</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >UV index</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => {
                                this.setState({ weatherActionFoorSelected: !this.state.weatherActionFoorSelected })
                                this.setState({ weatherInput: !this.state.weatherInput })
                            }}>
                                {
                                    this.state.weatherActionFoorSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Humidity</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Humidity</Text>
                                }
                            </TouchableOpacity>
                            {
                                this.state.weatherInput
                                &&
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Text style={styles.label}>Town : </Text>
                                    </View>
                                    <TextInput
                                        required
                                        style={styles.textIpInput}
                                        onChangeText={(value) => { this.setState({ Town: value }) }}
                                    />
                                </View>
                            }
                        </View>
                    }
                    <HideWithKeyboard>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity style={{ marginTop: 25, marginBottom: 25 }} onPress={() => { this._onPressReActionDiscord() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/Discord-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>Discord</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 25, marginBottom: 25 }} onPress={() => { this._onPressReActionSpotify() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/Spotify-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>Spotify</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 25, marginBottom: 25 }} onPress={() => { this._onPressReActionGitHub() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/GitHub-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>GitHub</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 25, marginBottom: 25 }} onPress={() => { this._onPressReActionTwitter() }}>
                                <Image style={styles.tinyLogo} source={require('../../assets/Twitter-Logo.png')} />
                                <Text style={{ fontSize: 16 }}>Twitter</Text>
                            </TouchableOpacity>
                        </View>
                    </HideWithKeyboard>
                    {
                        this.state.reactionArray[0]
                        &&
                        <View style={{ textAlign: 'center' }}>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ discordReActionOneSelected: !this.state.discordReActionOneSelected })}>
                                {
                                    this.state.discordReActionOneSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Send message</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Send message</Text>
                                }
                            </TouchableOpacity>
                            {
                                this.state.discordReActionOneSelected
                                &&
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Text style={styles.label}>Message : </Text>
                                    </View>
                                    <TextInput
                                        required
                                        style={styles.textIpInput}
                                        onChangeText={(value) => { this.setState({ DmToChannel: value }) }}
                                    />
                                </View>
                            }
                        </View>
                    }
                    {
                        this.state.reactionArray[2]
                        &&
                        <View>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ spotifyReActionOneSelected: !this.state.spotifyReActionOneSelected })}>
                                {
                                    this.state.spotifyReActionOneSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Create playlist</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Create playlist</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ spotifyReActionTwoSelected: !this.state.spotifyReActionTwoSelected })}>
                                {
                                    this.state.spotifyReActionTwoSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Play music</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Play music</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ spotifyReActionThreeSelected: !this.state.spotifyReActionThreeSelected })}>
                                {
                                    this.state.spotifyReActionThreeSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Pause music</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Pause music</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ spotifyReActionFoorSelected: !this.state.spotifyReActionFoorSelected })}>
                                {
                                    this.state.spotifyReActionFoorSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Previous music</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Previous music</Text>
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ spotifyReActionFiveSelected: !this.state.spotifyReActionFiveSelected })}>
                                {
                                    this.state.spotifyReActionFiveSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Next music</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Next music</Text>
                                }
                            </TouchableOpacity>
                            {
                                this.state.spotifyReActionOneSelected
                                &&
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Text style={styles.label}>Playlist name : </Text>
                                    </View>
                                    <TextInput
                                        required
                                        style={styles.textIpInput}
                                        onChangeText={(value) => { this.setState({ playlistName: value }) }}
                                    />
                                </View>
                            }
                        </View>
                    }
                    {
                        this.state.reactionArray[1]
                        &&
                        <View>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ gitHubReActionOneSelected: !this.state.gitHubReActionOneSelected })}>
                                {
                                    this.state.gitHubReActionOneSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Create isue</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Create isue</Text>
                                }
                            </TouchableOpacity>
                            {
                                this.state.gitHubReActionOneSelected
                                &&
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Text style={styles.label}>Title : </Text>
                                    </View>
                                    <TextInput
                                        required
                                        style={styles.textIpInput}
                                        onChangeText={(value) => { this.setState({ TitleIssue: value }) }}
                                    />
                                </View>
                            }
                            {
                                this.state.gitHubReActionOneSelected
                                &&
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Text style={styles.label}>Body : </Text>
                                    </View>
                                    <TextInput
                                        required
                                        style={styles.textIpInput}
                                        onChangeText={(value) => { this.setState({ BodyIssue: value }) }}
                                    />
                                </View>
                            }
                        </View>
                    }
                    {
                        this.state.reactionArray[3]
                        &&
                        <View>
                            <TouchableOpacity style={{ marginBottom: 5, marginTop: 5 }} onPress={() => this.setState({ twitterReActionOneSelected: !this.state.twitterReActionOneSelected })}>
                                {
                                    this.state.twitterReActionOneSelected
                                        ?
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: '#7CE0B7' }} >Send tweet</Text>
                                        :
                                        <Text style={{ fontSize: 17, textAlign: 'center', color: 'red' }} >Send tweet</Text>
                                }
                            </TouchableOpacity>
                            {
                                this.state.twitterReActionOneSelected
                                &&
                                <View style={{ flexDirection: 'row', }}>
                                    <View>
                                        <Text style={styles.label}>Message : </Text>
                                    </View>
                                    <TextInput
                                        required
                                        style={styles.textIpInput}
                                        onChangeText={(value) => { this.setState({ twitterMessage: value }) }}
                                    />
                                </View>
                            }
                        </View>
                    }
                </View>
                <Button color="#7CE0B7" title="Confirm" onPress={() => { this._onConfirm() }} />
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
    label: {
        paddingLeft: 15,
        paddingBottom: 20,
        paddingTop: 20,
        borderTopLeftRadius: 10,
        borderBottomWidth: 2,
        backgroundColor: "#e7e7e7",
        borderColor: "#7CE0B7",
        marginBottom: 10,
    },
    textIpInput: {
        flex: 1,
        borderTopRightRadius: 10,
        borderBottomWidth: 2,
        backgroundColor: "#e7e7e7",
        borderColor: "#7CE0B7",
        marginBottom: 10,
    },
});

export default AREA;