import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

const CustomButton = ({ title, isLoading, color }) => {
    return (
        <View style={{
            backgroundColor: color ? color : isLoading ? '#677066' : '#7c9a92',
            marginHorizontal: 33,
            alignItems: 'center',
            marginTop: 20,
            padding: 17,
            borderRadius: 16
        }}>
            {isLoading ? (
                <ActivityIndicator color="#fff"></ActivityIndicator>
            ) :
                <Text style={{ color: '#fff', fontSize: 22, fontFamily: 'Jost-Bold' }}>{title}</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

export default CustomButton 
