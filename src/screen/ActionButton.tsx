import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Type from '../redux/type';

interface ActionButton {
    isFollowing: boolean,
    userId: number
}

const ActionButton = (props: ActionButton) => {
    const following = useSelector((state: any) => state.users_following?.[props.userId]);
    const status = following ?? props.isFollowing;
    const dispatch = useDispatch();

    const onPressButton = () => {
        if (status) {
            dispatch({
                type: Type.UN_FOLLOW_USER,
                id: props.userId
            })
        }
        else {
            dispatch({
                type: Type.FOLLOW_USER,
                id: props.userId
            })
        }
    }

    return (
        <TouchableOpacity
            style={style.container}
            onPress={onPressButton}>
            <Text style={style.text}>{status ? "Following" : "Follow"}</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#3f729b',
        borderRadius: 10,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        height: 35
    },
    text: { color: '#FFF', fontWeight: 'bold', fontSize: 14 }
})

export default ActionButton