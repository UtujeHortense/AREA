import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default function Header(props) {
    const { choseNavigation } = props;

    return (
        <View style={styles.navBar}>
            <FlatList
                style={styles.FlatList}
                horizontal
                data={[
                    { key: 'Home' },
                    { key: 'Profil' },
                    { key: 'Services' },
                    { key: 'AREA' },
                ]}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => { choseNavigation(item.key) }}>
                        <Text style={styles.item}>
                            {item.key}
                        </Text>
                    </TouchableOpacity>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: "#7CE0B7",
        height: 50,
    },
    FlatList: {
        borderBottomWidth: 2,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});