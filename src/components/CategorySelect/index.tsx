import React from "react";
import { ScrollView } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./styles";
import { categories } from "../../utils/categories";
import { Category } from "../Category";

type Props = {
    categorySelected: string;
    setCategory: (categoryId: string) => void;
    hasCheckBox?: boolean;
}

export function CategorySelect({ categorySelected, setCategory, hasCheckBox = false, }: Props) {
    return (
        <ScrollView 
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false} //falso para não aparecer uma barra de  rolagem
            contentContainerStyle={{ paddingRight: 40 }} //espaçamento da borda
        >
            {
                categories.map(category => (
                    <Category 
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                        onPress={() => setCategory(category.id)} //quando clicar no item passa para outro category
                        hasCheckBox={hasCheckBox}
                    />
                ))
            }
        </ScrollView>
    );
}