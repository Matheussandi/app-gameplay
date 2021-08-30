import React, { useEffect} from "react";
import { useState } from "react";
import { View, FlatList } from "react-native";

import { Guild, GuildProps } from "../../components/Guild";
import { Load } from "../../components/Load";
import { ListDivider } from "../../components/ListerDivider";

import { styles } from './styles';
import { api } from "../../services/api";

type Props = {
    hadleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({ hadleGuildSelect }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        const response = await api.get('/users/@me/guilds');

        setGuilds(response.data);
        setLoading(false);
    }

    useEffect(() => {
        fetchGuilds();
    },[]) //esse [] diz que não tem nenhuma dependência

    return (
        <View style={styles.container}>
            {
                loading ? <Load /> : 
                <FlatList 
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Guild 
                    data={item}
                    onPress={() => hadleGuildSelect(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                contentContainerStyle={{ paddingBottom: 10}}
                style={styles.guilds}
                />
            }      
        </View>
    );
}