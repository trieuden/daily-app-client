import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, SectionList, SafeAreaView, Alert, StyleSheet } from 'react-native';

import Spends from './spend/spends';
import Incomes from './income/incomes';

import { styles } from '../../css/budget/budgetStyle';

const Budget = () => {

    const [currentView, setCurrentView] = useState('Spend');

    const renderView = useMemo(() => {
        switch (currentView) {
            case 'Spend':
                return <Spends />;
            case 'Income':
                return <Incomes />;
            default:
                return null;
        }
    }, [currentView]);

    return (
        <SectionList
            sections={[{ title: 'Main', data: [{}] }]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.buttonComponent}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: currentView === 'Spend' ? 'white' : '#e6e6e6' }]} onPress={() => setCurrentView('Spend')}>
                                <Text style={styles.button_text}>Spend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: currentView === 'Income' ? 'white' : '#e6e6e6' }]} onPress={() => setCurrentView('Income')}>
                                <Text style={styles.button_text}>Income</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderView}
                </View>
            )}
        />
    );
};

export default Budget;
