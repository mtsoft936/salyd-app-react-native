import React, { useState } from "react"
import { Button, TextInput } from "react-native-paper";
import { CommonActions } from '@react-navigation/native';
import { apiUrl } from '../../../config/keys';

import {
    View,
    Text,
    AsyncStorage,
    StyleSheet,
    Alert,
} from "react-native";

import Header from '../../../components/Header';
import { colors } from "../../../constants/constant";
import Axios from "axios";

const HomeMain = (props) => {

    const [tableId, setTableId] = useState(null);

    const joinTable = (props) => {
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Table',
                        params: { roomId: "TempID" }
                    },
                ],
            })
        );
    }

    const newTable = async (props) => {
        const token = await AsyncStorage.getItem("token");
        console.log(token);
        Axios.post(`${apiUrl}/newtable`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            tableId
        })
            .then(async (res) => {
                if (res.data.error) {
                    Alert.alert("Sorry, Incorrect Table Id");
                }
                else {
                    await AsyncStorage.setItem('tableId', res.data._id);
                    Alert.alert("Table Created Successfully");
                    props.navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'Table',
                                    params: { roomId: res.data.roomId }
                                },
                            ],
                        })
                    );
                }
            })
    }

    return (
        <View>
            <Header>Home</Header>
            <View style={styles.container}>

                <Button
                    mode="contained"
                    color={colors.accentPrimary}
                    style={styles.button}
                    onPress={() => scanQrc()}
                >
                    Scan QR Code
                </Button>

                <Text style={{ margin: 15 }}> Please enter the tableId mentioned below the QR code placed on your table</Text>

                <TextInput
                    label="Table ID"
                    mode="outlined"
                    value={tableId}
                    style={{ margin: 15 }}
                    theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                    onChangeText={(text) => setTableId(text)}
                />

                <Button
                    mode="contained"
                    color={colors.accentPrimary}
                    style={styles.button}
                    onPress={() => newTable()}
                >
                    Proceed
                </Button>
                <Text style={{
                    fontSize: 25, fontWeight: "bold", marginLeft: 15, color: colors.accentPrimary
                }}>Join A Table</Text>

                <TextInput
                    label="Enter table id"
                    mode="outlined"
                    value={tableId}
                    style={{ margin: 15 }}
                    theme={{ roundness: 30, colors: { primary: colors.accentPrimary, background: colors.back } }}
                    onChangeText={(text) => setTableId(text)}
                />
                <Button
                    mode="contained"
                    color={colors.accentPrimary}
                    style={styles.button}
                    onPress={() => joinTable(props)}
                >
                    Join Table
                </Button>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        fontSize: 18,
        marginLeft: 18,
        marginRight: 18,
        marginTop: 18
    },
    container: {
        backgroundColor: colors.back
    },
    button: {
        margin: 10,
        borderRadius: 50,
        marginBottom: 20,
        color: colors.back
    },
    outlined: {
        borderColor: colors.back,
        borderWidth: 1
    },
})
export default HomeMain;