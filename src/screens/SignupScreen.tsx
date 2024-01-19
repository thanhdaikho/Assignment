import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler';
import { useState } from 'react'
import React from 'react'
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import CountryPicker from 'react-native-country-picker-modal'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_APP } from '../../FirebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';




const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [rePasswordError, setRePasswordError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [validField, setValidField] = useState("")
    const [rePassword, setRepassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [countryCode, setCountryCode] = useState<string>("VN" as string);
    const [callingCode, setCallingCode] = useState('84')
    const [phoneNumber, setPhoneNumber] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const database = getFirestore()
    const ref = collection(database, 'Users')
    const [phoneNumberInputStyle, setPhoneNumberInputStyle] = useState({
        fontSize: 15,
        width: '75%',
        height: '100%',
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        paddingStart: 17,
        marginStart: 15
    })
    const [modalVisible, setModalVisible] = useState(false)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        ;


    const handleSignup = () => {
        // Reset errors
        setPasswordError("");
        setRePasswordError("");
        setEmailError("")
        const auth = FIREBASE_AUTH;

        if (phoneNumber.length < 3) {
            setPhoneNumberInputStyle({ ...phoneNumberInputStyle, borderColor: 'red' })
        }
        if (phoneNumber.length > 3) {
            setPhoneNumberInputStyle({ ...phoneNumberInputStyle, borderColor: 'yellow' })
        }

        if (!emailRegex.test(email)) {
            setEmailError("Must be a valid email");
            setIsLoading(false)
            return;
        }

        if (password.length < 7) {
            setPasswordError("Password must be at least 7 characters long");
            setIsLoading(false)
            return;
        } else if (password !== rePassword) {
            setPasswordError("Password is not match");
            setRePasswordError("Password is not match");
            setIsLoading(false)
            return;

        } else if (password.length > 6) {
            setValidField("");
        }
        setIsLoading(true)

        if (phoneNumber.length > 5 && emailRegex.test(email) && password.length >= 6 && password == rePassword) {

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    try {
                        let userData = {
                            userId: user.uid,
                            phoneNumber: phoneNumber
                        } 
                        addDoc(ref, userData)

                    } catch (err) {
                        console.log(err)
                    }
                    setIsLoading(false)
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        setEmailError('That email address is already in use!');
                        return;
                    }

                    if (error.code === 'auth/invalid-email') {
                        setEmailError('That email address is invalid!');
                        return;
                    }
                    setIsLoading(false)
                });

        }
    }




    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <StatusBar backgroundColor={'#253334'} />
                    <ImageBackground style={{ flex: 1, marginTop: -60 }} source={require('../images/LoginBackground.png')}>
                        <Image source={require('../images/smallLogo.png')} />
                        <Text style={styles.h3Text}>Sign up</Text>
                        <Text style={styles.h6Text}>Sign up now for free and start exercises.</Text>
                        <View style={styles.phoneInputContainer}>
                            <View
                                style={{
                                    alignItems: 'center',
                                    width: '25%',
                                    height: '100%',
                                    marginLeft: 20,
                                    borderWidth: 2,
                                    borderColor: '#fff',
                                    borderRadius: 10,
                                    padding: 2,
                                    flexDirection: 'row',

                                }}>
                                <CountryPicker
                                    withFilter
                                    countryCode={countryCode}
                                    withFlag
                                    withAlphaFilter={false}
                                    withCurrencyButton={false}
                                    withCallingCode
                                    onSelect={country => {
                                        console.log('country: ', country);
                                        const { cca2, callingCode } = country;
                                        setCountryCode(cca2);
                                        setCallingCode(callingCode[0]);
                                        setModalVisible(false); // Ẩn modal sau khi chọn quốc gia
                                    }}
                                    containerButtonStyle={{
                                        alignItems: 'center',
                                        marginLeft: 10
                                    }}
                                    withModal // Bật modal
                                    modalProps={{
                                        visible: modalVisible,
                                        onRequestClose: () => setModalVisible(false),
                                    }}
                                    onOpen={() => setModalVisible(true)}
                                    onClose={() => setModalVisible(false)}
                                >
                                </CountryPicker>
                                <Text style={{ color: '#fff' }}>{countryCode}</Text>
                            </View>
                            <TextInput
                                style={phoneNumberInputStyle}
                                keyboardType='phone-pad'
                                placeholder={"+" + callingCode}
                                placeholderTextColor="gray"
                                value={phoneNumber}
                                onChangeText={(text) => setPhoneNumber(text)}></TextInput>
                        </View>
                        <View style={styles.textInputContainer}>
                            <CustomInput placeHolder={"Email"} onChangeText={setEmail} error={emailError} warn={validField} />
                            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                            <CustomInput
                                placeHolder={"Password"}
                                onChangeText={setPassword}
                                secureTextEntry
                                error={passwordError}
                                warn={validField}
                            />
                            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
                            <CustomInput
                                placeHolder={"Re-password"}
                                onChangeText={setRepassword}
                                secureTextEntry
                                error={passwordError}
                                warn={validField}
                            />
                            {rePasswordError && <Text style={styles.errorText}>{rePasswordError}</Text>}

                        </View>

                        <TouchableOpacity onPress={handleSignup}>
                            <CustomButton title={"SIGN UP"} isLoading={isLoading} color={""} />
                        </TouchableOpacity>


                    </ImageBackground>

                </View>
            </ScrollView>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({

    container: {
        flex: 1
    },
    scrollContainer: {
        flexGrow: 1,
    },
    h3Text: {
        color: "#fff",
        fontSize: 45,
        fontFamily: 'DMSerifDisplay-Regular',
        marginStart: 33,
        marginTop: -90
    },
    h6Text: {
        color: "#fff",
        fontFamily: 'Jost-Bold',
        marginStart: 33,
        marginTop: 20,
        fontSize: 21
    },
    phoneInputContainer: {
        height: 45,
        borderRadius: 30,
        marginTop: 35,
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: -5,
        marginStart: -55
    },
    phoneNumberInput: {
        fontSize: 15,
        width: '75%',
        height: '100%',
        color: 'white',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        paddingStart: 17,
        marginStart: 15
    },
    textInputContainer: {
        marginHorizontal: 33,
        marginTop: 15,
    },
    errorText: {
        color: 'red',
        marginVertical: -8
    }
})

export default SignupScreen
