import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import  Icon  from 'react-native-vector-icons/FontAwesome'
const FloatingButton = ({onPress}) => {
    return (
        <TouchableOpacity
            style={styles.circle}
            onPress={onPress}
        >
            <Icon name="chevron-right" size={25} color={"#fff"}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    circle: {
        backgroundColor: "#7c9a92",
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 15,
        right: 30,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FloatingButton 