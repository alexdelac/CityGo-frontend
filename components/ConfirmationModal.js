import { StyleSheet, View, Text, TouchableOpacity } from "react-native"


export default function ConfirmationModal (props) {






return(
    <View style={styles.container}>
        <View style={styles.modalView}>
        <Text style={styles.h2Modal}>{props.title}</Text>
        <Text style={styles.textMessage}>{props.message}</Text>
        <TouchableOpacity style={styles.button1} onPress={() => props.handleCloseConfirmationModal()}>
            <Text style={styles.textButton1}>OK</Text>
        </TouchableOpacity>
        </View>
    </View>

)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
      },
      h2Modal: {
        color: '#FF7337',
        fontSize: 36,
        fontFamily: 'Quicksand-Bold',
        marginBottom: 40,
        textAlign: 'center',
      },
      modalView: {
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        elevation: 5, // Effet d'élévation pour Android
      },
      button1: {
        backgroundColor: '#8440B4',
        borderRadius: 50,
        marginBottom: 0,
        height: 50,
        width: 285,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
      },
      textButton1: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'Quicksand-SemiBold',
      },
    textMessage: {
        fontFamily: 'Quicksand-Bold',
    }
})
