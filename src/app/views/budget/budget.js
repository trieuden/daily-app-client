import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, SectionList, SafeAreaView, Alert, StyleSheet } from 'react-native';

import Spends from './spend/Spends';
import Incomes from './income/Incomes';

import { styles } from '../../css/budget/BudgetStyle';

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
            style={{backgroundColor:'white'}}
            renderItem={() => (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.buttonComponent}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: currentView === 'Spend' ? '#00cc88' : 'white' }]} onPress={() => setCurrentView('Spend')}>
                                <Text style={styles.button_text}>Spend</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: currentView === 'Income' ? '#00cc88' : 'white' }]} onPress={() => setCurrentView('Income')}>
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
