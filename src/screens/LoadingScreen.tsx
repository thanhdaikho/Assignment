import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const LoadingScreen = ({ navigation }) => {
    const user = FIREBASE_AUTH.currentUser;
    const database = getFirestore();
    const ref = collection(database, 'Users');

    useEffect(() => {
        const getUserData = async () => {
            if (user) {
                try {
                    const q = query(ref, where('userId', '==', user.uid));
                    const querySnapshot = await getDocs(q);
                    if (querySnapshot.size > 0) {
                        const documentData = querySnapshot.docs[0].data();
                        console.log(documentData);
                        if (documentData.FullName && documentData.AvatarURL) {
                            // Nếu có dữ liệu, chuyển đến HomeScreen
                            navigation.replace('HomeScreen');
                        } else {
                            // Nếu không có dữ liệu, chuyển đến NewProfileScreen
                            navigation.replace('NewProfileScreen');
                        }
                    } else {
                        console.log('User document not found');
                    }
                } catch (error) {
                    console.error('Error getting user data:', error);
                    // Xử lý lỗi nếu có
                }
            }
        };

        getUserData();
    }, [user, ref, navigation]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default LoadingScreen;
