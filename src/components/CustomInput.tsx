import { useRef, useState } from "react";
import { Animated, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome'


const CustomInput = ({ placeHolder, onChangeText, error, warn, ...props }) => {
    const [text, setText] = useState('')
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(props.secureTextEntry)
    const labelPosition = useRef(new Animated.Value(text ? 1 : 0)).current

    const handleFocus = () => {
        setIsFocused(true)
        animatedLabel(1);
    }
    const handleBlur = () => {
        setIsFocused(false)
        if (!text) {
            animatedLabel(0)
        }
    }
    const handleTextChange = (text : any) => {
        setText(text);
        if (onChangeText) {
            onChangeText(text);
        }
        if (text) {
            animatedLabel(1);
        } else if (isFocused) {
            animatedLabel(1);
        } else {
            animatedLabel(0);
        }
    };
    const animatedLabel = (toValue : any) => {
        Animated.timing(labelPosition, {
            toValue: toValue,
            duration: 200,
            useNativeDriver: false
        }).start()
    }

    const labelStyle = {
        left: 10,
        top: labelPosition.interpolate({
            inputRange: [0, 1.3],
            outputRange: [17, 0],
        }),
        fontSize: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 14],
        }),
        color: labelPosition.interpolate({
            inputRange: [0, 1],
            outputRange: ['gray', 'white'],
        }),
        
    };
    return (
        <View style={[styles.innerContainer, error && { borderColor: 'red' } || warn &&{ borderColor: 'yellow'}]}>
            <Animated.Text style={[styles.label, labelStyle]}>{placeHolder}</Animated.Text>
            <View style={styles.inputContainer}>
                <TextInput
                    {...props}
                    style={styles.input}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleTextChange}
                    value={text}
                    textAlignVertical="center"
                    textContentType={props.secureTextEntry ? 'newPassword' : props.secureTextEntry}
                    secureTextEntry={showPassword}
                />
                {props.secureTextEntry && !!text && (
                    <View>
                        <TouchableOpacity style={{ width: 25 }} onPress={() => setShowPassword(!showPassword)}>
                            {!showPassword ? <Icon name= 'eye-slash' color="gray" size={24} /> : <Icon name="eye" color="gray" size={24} />}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        borderWidth: 1,
        borderColor: "#eee",
        borderRadius: 5,
        height: 55,
        justifyContent: 'center',
        marginVertical: 10

    },
    label: {
        position: "absolute",
        color: 'gray',
        fontFamily: 'PTSerif-Regular'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10
    },
    input: {
        flex: 1,
        fontSize: 18,
        marginTop: 15,
        paddingLeft: 10,
        color: '#fff',
        fontFamily: 'PTSerif-Regular',
    },
    errorText: {
        marginTop: 40,
        fontSize: 15,
        color: 'red',
    },
    warnText: {
        marginTop: 20,
        fontSize: 15,
        color: 'green'
    }
})

export default CustomInput