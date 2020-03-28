import React from 'react';
import {FlatList, StyleSheet, View, Text} from 'react-native';
import {Post} from "./Post";

export const PostList = ({data, onOpen}) => {
    if (!data.length) {
        return <View style={styles.wrapper}>
            <Text style={styles.noItems}>There is no items yet</Text>
        </View>
    }
    return (
        <View style={styles.wrapper}>
            <FlatList
                data={data}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => <Post post={item} onOpen={onOpen}/>}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        marginVertical: 10,
        fontFamily: 'open-regular',
        fontSize: 18,
        textAlign: 'center'
    }
});
