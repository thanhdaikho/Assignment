import { useEffect, useState } from 'react' 
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { getFirestore, collection, addDoc, setDoc, query, where, getDocs } from 'firebase/firestore';

const HomeScreen = ( {navigation} ) => {
    const user = FIREBASE_AUTH.currentUser
    // const database = getFirestore()
    // const ref = collection(database, 'Users')

    
    return (
        <Text>Hallo {user?.email} </Text>
    )
}

export default HomeScreen
