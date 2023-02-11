import React, { useRef } from 'react';
import { SafeAreaView, Button, Animated, StyleSheet, Text, View } from 'react-native';
import Header from '../Header';

const Anim = () => {
    const fadeText = useRef(new Animated.Value(0)).current;

    Animated.timing(fadeText, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
    }).start();

    return (
            <Animated.View style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: fadeText
            }}>
                <Text style={styles.fadingText}>Welcome on our {'\n'} AREA Project</Text>
            </Animated.View>
    );
}

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    _choseNavigation = (key) => {
        if (key == "AREA") {
            this.props.navigation.navigate('AREA')
        } else if (key == "Profil") {
            this.props.navigation.navigate('Profil')
        } else if (key == "Services") {
            this.props.navigation.navigate('Services')
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header choseNavigation={this._choseNavigation} />
                <Anim />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fadingText: {
        textAlign: "center",
        fontSize: 45
    },
});

export default HomePage;