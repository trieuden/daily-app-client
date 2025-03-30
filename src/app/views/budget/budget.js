import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, FlatList, SectionList, SafeAreaView, Alert, StyleSheet } from 'react-native';

import { useTranslation } from 'react-i18next';
import Spends from './spend/Spends';
import Incomes from './income/Incomes';

import { styles } from '../../css/budget/BudgetStyle';

const Budget = () => {
    const {t} = useTranslation();

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
                                <Text style={styles.button_text}>{t("Spend_title")}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: currentView === 'Income' ? '#00cc88' : 'white' }]} onPress={() => setCurrentView('Income')}>
                                <Text style={styles.button_text}>{t("Income_title")}</Text>
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
