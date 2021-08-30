import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper"; //espaçamento para iphone x

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row', //para ficar um do lado do outro
        justifyContent: 'space-between', //para ocupar as estremidades
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42,
    },
    matches: {
        marginTop: 24,
        marginLeft: 24,
    }
})