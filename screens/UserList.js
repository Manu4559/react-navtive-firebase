import React, { useEffect, useState } from "react";
import { ScrollView, Button } from 'react-native'
import db from '../database/firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ListItem, Avatar } from 'react-native-elements'

const UserList = (props) => {
    const [users, setUsers] = useState([])

    const querySnapshot= async() => {
        const dbRef = await getDocs(collection(db, 'users'))
        const users = []
        dbRef.forEach((doc) => {
            const { name, email, phone } = doc.data()
            users.push({
                id: doc.id,
                name,
                email,
                phone
            })
        })
        setUsers(users)

    }

    useEffect(() => {

        querySnapshot()

    }, [])


    return (
        <ScrollView>
            <Button
                title="Create User"
                onPress={() => props.navigation.navigate('CreateUserScreen')}
            />

            {
                users.map(user => {
                    return (
                        <ListItem
                            key={user.id} bottomDivider onPress={() => {
                                props.navigation.navigate('UserDetailScreen', {
                                    userId: user.id
                                })
                            }}>
                            <ListItem.Chevron />
                            <Avatar
                                source={{
                                    uri:
                                        "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg",
                                }}
                                rounded
                            />
                            <ListItem.Content>
                                <ListItem.Title>{user.name}</ListItem.Title>
                                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                            </ListItem.Content>
                        </ListItem>
                    )
                })
            }

        </ScrollView>
    )
}

export default UserList