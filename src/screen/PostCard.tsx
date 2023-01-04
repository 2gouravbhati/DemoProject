import { View, StyleSheet, Image, Text } from 'react-native'
import React from 'react'
import ActionButton from './ActionButton'


interface PostCard {
    post_height: number,
    post: any
}


export default function PostCard(props: PostCard) {
    const { image, userName, isFollowing, userId } = props.post
    return (
        <View style={{ height: props.post_height }}>
            <View style={{
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 10
            }}>
                <Text style={style.heading}>{userName}</Text>
                <ActionButton
                    isFollowing={isFollowing}
                    userId={userId}
                />
            </View>
            <Image
                source={{ uri: image }}
                style={style.image}
            />
        </View>
    )
}





const style = StyleSheet.create({
    image: {
        flex: 1,
        backgroundColor: 'gray'
    },
    heading: {
        fontSize: 16,
        color: "#000",
        fontWeight: 'bold',
    },
    sub_heading: {
        fontSize: 14,
        color: "#000",
        opacity: 0.75,
    }
})