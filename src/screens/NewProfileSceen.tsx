import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, KeyboardAvoidingView, Platform } from 'react-native'
import FloatingButton from '../components/FloatingButton';
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { launchImageLibrary } from 'react-native-image-picker';
import { FIREBASE_AUTH, FIREBASE_FIRESTORE, FIREBASE_STORAGE, FIREBASE_APP } from '../../FirebaseConfig';
import { getFirestore, collection, query, where, getDocs, setDoc, doc, } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const handleUploadImage = async (userId, avatarSource, fullName) => {
    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", avatarSource, true);
            xhr.send(null);
        });

        const metadata = {
            contentType: 'image/jpeg'
        };

        try {
            const storage = getStorage();
            const storageRef = ref(storage, `images/${userId}/avatar/${fullName}_avatar`);
            const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

            uploadTask.on('state_changed',
                (snapshot) => {
                    // ... (existing code)
                },
                (error) => {
                    // ... (existing code)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        const user = FIREBASE_AUTH.currentUser;
                        const userId = user?.uid;
                        try {
                            const database = getFirestore();
                            const ref = collection(database, 'Users');
                            // Check if the document already exists
                            const q = query(ref, where('userId', '==', userId));
                            const querySnapshot = await getDocs(q);

                            const userDocRef = doc(FIREBASE_FIRESTORE, 'Users', querySnapshot.docs[0].id);
                                await setDoc(userDocRef, { AvatarURL: downloadURL }, { merge: true });
                                console.log('User data updated successfully');
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }
            );
        } catch (err) {
            console.log(err);
        }
    };
    uploadImage();
}


const NewProfileSceen = ( { navigation }) => {
    const [avatarSource, setAvatarSource] = useState(null);
    const [isFirstNameFocused, setIsFirstNameFocused] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
    const [isImagePicked, setIsImagePicked] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [fullName, setFullName] = useState("")
    const [isFirsnameFilled, setIsFirstnameFilled] = useState(false)
    const [isLastnameFilled, setIsLastnameFilled] = useState(false)
    const user = FIREBASE_AUTH.currentUser;
    const database = getFirestore();
    const ref = collection(database, 'Users');


    // ... (existing code)
    const handleChoosePhoto = async () => {
        setIsImagePicked(false)
        try {
            const readStoragePermission = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

            const granted = await PermissionsAndroid.request(readStoragePermission);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const result = await launchImageLibrary({ mediaType: 'photo' });

                if (!result.didCancel) {
                    console.log(result.assets[0].uri);
                    setAvatarSource(result.assets[0].uri);
                    setIsImagePicked(true)
                }
            } else {
                console.log('Permission denied');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleSetUserInfo = async () => {
        setIsFirstnameFilled(false)
        setIsLastnameFilled(false)
        if (firstName.trim() === "" && lastName.trim() === "") {
            setIsFirstnameFilled(true)
            setIsLastnameFilled(true)
            return
        } else if (firstName.trim() === "") {
            setIsFirstnameFilled(true)
            setIsLastnameFilled(false)
            return
        } else if (lastName.trim() === "") {
            setIsFirstnameFilled(false)
            setIsLastnameFilled(true)
            return
        } else {
            const user = FIREBASE_AUTH.currentUser;
            const userId = user?.uid;

            const fullName = firstName + " " + lastName
            setFullName(fullName)
            console.log(fullName)
            try {
                // Check if the document already exists
                const q = query(ref, where('userId', '==', userId));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.size > 0) {
                    const userDocRef = doc(FIREBASE_FIRESTORE, 'Users', querySnapshot.docs[0].id);
                    await setDoc(userDocRef, { FullName: fullName }, { merge: true });
                    console.log('User data updated successfully');
                    if (isImagePicked && avatarSource) {
                        handleUploadImage(user?.uid, avatarSource, fullName)
                    }
                }
                navigation.replace("HomeScreen")


            } catch (err) {
                console.log(err);
            }
        }

    }


    const handleFirstNameFocus = () => {
        setIsFirstNameFocused(true);
        setIsLastNameFocused(false);
    };

    const handleLastNameFocus = () => {
        setIsLastNameFocused(true);
        setIsFirstNameFocused(false);
    };
    const handleBlur = () => {
        setIsFirstNameFocused(false);
        setIsLastNameFocused(false);
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, height: '100%' }}>
                <View style={styles.container}>
                    <TouchableOpacity style={{
                        width: '35%',
                        height: '20%',
                        borderRadius: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginTop: 50
                    }} onPress={handleChoosePhoto}>
                        <View style={{
                            width: '100%',
                            aspectRatio: 1, // Đảm bảo chiều rộng và chiều cao của View bằng nhau để tạo hình tròn
                            borderRadius: 100,
                            borderColor: 'green',
                            borderWidth: 1,
                            overflow: 'hidden', // Đảm bảo hình ảnh không bị tràn ra khỏi biên của View
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                        }}>
                            <Image
                                style={{ width: '100%', height: '100%', borderColor: 'green', resizeMode: 'cover', opacity: 0.7 }}
                                source={avatarSource ? { uri: avatarSource } : require("../images/avatar_default.png")}
                            />
                            <Image
                                source={require('../images/picker.png')}
                                style={{
                                    position: 'absolute',
                                    width: 75,
                                    height: 75,
                                    opacity: 0.8,
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                    <View style={{
                        marginTop: 50, justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        alignContent: 'center'
                    }}>
                        <Text style={{ fontSize: 29, fontFamily: 'Jost-Bold', color: 'black' }}>Profile info</Text>
                        <Text style={{ fontSize: 19, fontFamily: 'PTSerif-Regular' }}>Enter your name and add a profile photo.</Text>
                    </View>
                    <View style={styles.nameInput}>
                        <TextInput
                            placeholder={isFirsnameFilled ? "At least 1" : "First Name"}
                            style={[
                                styles.inputName,
                                {
                                    borderColor: isFirstNameFocused ? 'green' : isFirsnameFilled ? 'red' : 'gray',
                                },
                            ]}
                            onFocus={handleFirstNameFocus}
                            onBlur={handleBlur}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                        />
                        <TextInput
                            placeholder={isLastnameFilled ? "At least 1" : "Last Name"}
                            style={[
                                styles.inputName,
                                {
                                    borderColor: isLastNameFocused ? 'green' : isLastnameFilled ? 'red' : 'gray',
                                },
                            ]}
                            onFocus={handleLastNameFocus}
                            onBlur={handleBlur}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                        />
                    </View>
                </View>

            </ScrollView>
            <FloatingButton onPress={handleSetUserInfo} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'center',
        // alignContent: 'center'
    },
    nameInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20
    },
    inputName: {
        width: '40%',
        borderRadius: 15,
        paddingStart: 10,
        borderWidth: 2,
        borderColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
    },

})

export default NewProfileSceen 
