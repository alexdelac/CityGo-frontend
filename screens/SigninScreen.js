import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, View,
  } from 'react-native';

  export default function SigninScreen({ navigation }) {








    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.title}>Connexion</Text>
        <View>
          <TextInput style={styles.input} placeholder="E-mail" />
          <TextInput style={styles.input} placeholder="Mot de passe" />
         <TouchableOpacity>
            <Text style={styles.passwordforget}>Mot de passe oublié ?</Text>
          </TouchableOpacity> 
        </View>
          
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Envoyer</Text>
          </TouchableOpacity>
          <Text style={styles.message}>ou inscris-toi grâce à tes réseaux :</Text>
          <View style={styles.box}>
          <Text style={styles.footer}>Pas de compte ?</Text>
          <Text style={styles.connect}> Inscris-toi !</Text>
          </View>
        </KeyboardAvoidingView>
      )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    title: {
      color: '#FF7337',
      fontSize: 36,
      fontWeight: '600',
      textAlign: 'center',      
    },
    button: {
      alignItems: 'center',
      paddingTop: 8,
      width: 285,
      height: 50,
      marginTop: 30,
      backgroundColor: '#8440B4',
      borderRadius: 50,
      marginBottom: 80,
    },
    textButton: {
      color: '#ffffff',
      height: 30,
      width: 94,
      fontWeight: '600',
      fontSize: 23,
    },
    input: {
      width: 285,
      height: 55,
      borderColor: '#D7D7E5',
      borderWidth: 1,
      borderRadius: 5,
      margin: 5,
      padding: 10,
    },
    message: {
      color: '#341C42',
      fontSize: 24,
      width: 291,
      height: 60,
      textAlign: 'center',
    },
    box: {
      flexDirection: 'row',
    },
    connect: {
      color: '#FF7337',
    },
    passwordforget: {
      color: '#FF7337',
      fontSize: 16,
    },
  });