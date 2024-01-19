import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState } from 'react'
import React from 'react'
import { Alert, Dimensions, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const auth = FIREBASE_AUTH;



    const handleLogin = async () => {
        setPasswordError("");
        setEmailError("");

        // Kiểm tra email và mật khẩu
        if (!email.trim()) {
            setEmailError("Email là bắt buộc");
            setIsLoading(false)
        }

        if (!password.trim()) {
            setPasswordError("Mật khẩu là bắt buộc");
            setIsLoading(false)
            return;
        }
        setIsLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                setIsLoading(false)
            })
            .catch((error) => {
                if (error.code === 'auth/invalid-email') {
                    setEmailError('Địa chỉ email không hợp lệ')
                    setIsLoading(false)
                    return
                } else if (error.code === 'auth/user-not-found') {
                    setEmailError("Người dùng không tồn tại. Vui lòng đăng ký!")
                    setIsLoading(false)
                    return
                } else if (error.code === 'auth/wrong-password') {
                    setPasswordError("Mật khẩu sai! Thử lại.")
                    setIsLoading(false)
                    return
                } else {
                    console.error('Lỗi khi đăng nhập:', error);
                    setIsLoading(false)
                    return
                }
                setIsLoading(false).
                navigation.replace("LoadingScreen")
            });
    };
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {/* Các thành phần của ứng dụng */}
            <View style={styles.container}>
                <StatusBar backgroundColor={'#253334'} />
                <ImageBackground style={{ flex: 1, marginTop: -60 }} source={require('../images/LoginBackground.png')}>
                    <Image source={require('../images/smallLogo.png')} />
                    <Text style={styles.h3Text}>Sign in</Text>
                    <Text style={styles.h6Text}>Sign in to take your exercises and try to explore more.</Text>
                    <View style={styles.textInputContainer}>
                        <CustomInput placeHolder={"Email"} value={email} onChangeText={setEmail} warn={""} error={emailError} />
                        {emailError && <Text style={styles.errorText}>{emailError}</Text>}
                        <CustomInput
                            placeHolder={"Password"}
                            onChangeText={setPassword}
                            value={password}
                            error={passwordError}
                            warn={""}
                            secureTextEntry
                        />
                        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

                    </View>
                    <View style={{ alignItems: 'flex-end', marginEnd: 33 }}>
                        <TouchableOpacity>
                            <Text style={{ color: "white", fontFamily: 'PTSerif-Regular', marginTop: 5 }}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={handleLogin}>
                        <CustomButton title={"LOGIN"} isLoading={isLoading} color={""} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchId}>
                        <Image style={styles.imgTouchId} source={require("../images/touchid.png")}></Image>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 15 }}>
                        <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'DMSerifDisplay-Regular' }}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('SignupScreen') }}>
                            <Text style={{ textDecorationLine: 'underline', color: '#fff', fontSize: 18, fontFamily: 'DMSerifDisplay-Italic' }}> Sign up</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </GestureHandlerRootView>

    )
}
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({

    container: {
        flex: 1
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
    textInputContainer: {
        marginHorizontal: 33,
        marginTop: 15,
    },
    touchId: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 130,
        height: 130,
        borderRadius: 50,
        marginStart: screenWidth / 3,
        marginTop: 25
    },
    imgTouchId: {
        width: '100%',
        height: '100%',
    },
    errorText: {
        color: 'red',
        marginVertical: -8
    }

})

export default LoginScreen;