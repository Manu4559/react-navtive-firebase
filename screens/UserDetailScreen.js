import React, { useEffect, useState } from "react";
import { View, TextInput, ScrollView, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native'
import db from '../database/firebase'
import { doc, getDoc, deleteDoc, setDoc, } from 'firebase/firestore'


const UserDetailScreen = (props) => {
    const intialState = {
        id: '',
        name: '',
        email: '',
        phone: ''
    }
    const [user, setUser] = useState(intialState)

    const [loading, setLoading] = useState(true)

    const getUserById = async (id) => {

        const dbRef = doc(db, 'users', id)
        const docRef = await getDoc(dbRef)
        const user = docRef.data()
        setUser({
            ...user,
            id: docRef.id,
        })

        setLoading(false)

    }

    useEffect(() => {
        getUserById(props.route.params.userId)
    }, [])

    const handleChangeText = (name, value) => {
        setUser({ ...user, [name]: value })
    }

    const deleteUser = async () => {
        const dbRef = (doc(db, 'users', props.route.params.userId))
        await deleteDoc(dbRef)
        props.navigation.navigate('UserList')

    }

    const updateUser = async () => {
        const dbRef = (doc(db, 'users', user.id))
        await setDoc(dbRef, {
            name: user.name,
            email: user.email,
            phone: user.phone
        })
        setUser(intialState)
        props.navigation.navigate('UserList')
    }


    const openConfimationAlert = () => {
        Alert.alert('Remove The User', 'Are you sure?', [
            { text: 'Yes', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log(false) }
        ])
    }

    if (loading) {
        return (
            <View>
                <ActivityIndicator size='large' color='#9e9e9e' />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Name User"
                    value={user.name}
                    onChangeText={(value) => handleChangeText('name', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Email User"
                    value={user.email}
                    onChangeText={(value) => handleChangeText('email', value)} />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Phone User"
                    value={user.phone}
                    onChangeText={(value) => handleChangeText('phone', value)} />
            </View>
            <View>
                <Button
                    color='#19AC52'
                    title="Update User"
                    onPress={() => updateUser()} />
            </View>
            <View>
                <Button
                    color='#E37399'
                    title="Delete User"
                    onPress={() => openConfimationAlert()} />
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'

    }
})


export default UserDetailScreen