import React, { useState, useCallback } from "react";
import { View, FlatList } from 'react-native'

import { CategorySelect } from "../../components/CategorySelect";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListerDivider"
import { Background } from '../../components/Background';
import { Load } from "../../components/Load";

import { styles } from "./styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId) //se o id atual é o mesmo que estou clicando estarei querendo desmarcar ele
                                                                            //caso contrário irei atribuir um novo id, basicamente é realizar o efeito de marcar e desmarcar
/*      A FUNÇÃO É A MESMA COISA QUE ISSO
        if(categoryId === category) {
            setCategory('')
        } else {
            setCategory(categoryId)
        } */
    }

    function handleAppointmentDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected});
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage)
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();

    }, [category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate}/>
            </View>
                <CategorySelect
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />

                {
                    loading ? <Load /> :
                <>
                    <ListHeader 
                        title="Partidas agendadas"
                        subtitle={`Total ${appointments.length}`}
                    />

                    <FlatList //indicada para quando tem muitos elementos em uma lista
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment 
                                data={item} 
                                onPress={() => handleAppointmentDetails(item)}    
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider/>}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </>
                }
        </Background>
    );
}