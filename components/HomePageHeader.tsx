import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Image } from "expo-image";

export default function HomePageHeader(){

    const PlaceholderImage=require("../assets/images/placeholder_image.png");
    return (
        <View style={styles.header}>
        <Image
            source={PlaceholderImage}
            style={styles.profileImage}
        />
        <View>
            <Text style={styles.goodMorningText}>Hi,Buddy</Text>
            <Text style={styles.subText}>Your daily adventure starts now</Text>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    goodMorningText: {
        color: 'black',
        fontSize: 36,
        fontWeight: 'bold',
    },
    subText: {
        color: 'grey',
        fontSize: 16,
        marginBottom: 10,
    },
    header: {
        marginTop:100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        // backgroundColor:"yellow",
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    subGreeting: {
        fontSize: 14,
        color: 'gray',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
    },
});
