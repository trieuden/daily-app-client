import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#f2f2f2',
        position: 'relative',
        display: 'flex',
    },
    header: {
        height: 250,
        width: '100%',
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        overflow: 'hidden',
    },
    imageBackground: {
        height: '100%'
    },
    title: {
        paddingTop: 50,
        fontSize: 24,
        fontWeight: '400',
        color: '#b3b3b3',
        marginHorizontal: 24
    },
    info: {
        width: '90%',
        backgroundColor: 'white',
        position: 'absolute',
        height: '70%',
        right: '5%',
        top: 170,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
    },
    avatarForm: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 150,
        alignItems: 'center',

    },
    avatar: {
        height: 150,
        width: 150,
        position: 'absolute',
        top: -40,
        left: '50%',
        borderRadius: 80,
        transform: [{ translateY: 0 }, { translateX: -75 }],
        backgroundColor: 'red'
    },
    nameForm: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: "center"
    },
    name: {
        fontSize: 21,
        fontWeight: 'bold',
        marginVertical: 5
    },
    email: {

    },
    modalForm: {
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 20,
    },
    modal: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        marginTop: 10,
    },
    modal_item: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    modal_text: {
        fontSize: 19,
        marginHorizontal: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end'
    },
});