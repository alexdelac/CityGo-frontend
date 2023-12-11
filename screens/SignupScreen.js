import {Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput,
    TouchableOpacity, View} from 'react-native';
  import { useState } from 'react';
  import {useDispatch, useSelector} from 'react-redux';
  import {addUser} from '../reducers/user';

  const BACKEND_ADDRESS = 'http://10.1.3.138:3000';


  export default function SignupScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value)

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('') 
    const [emailError, setEmailError] = useState(false)

    const handleSubmit = () => {
      
      if (pseudo.length === 0) {
        return;
      }

      fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({pseudonyme: pseudo, email: email, password: password})
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
           dispatch(addUser({pseudo: pseudo, token: data.token})); 
           setEmail('');
           setPseudo('');
           navigation.navigate('TabNavigator');
          }
        
      })
      
      
    };



    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Text style={styles.title}>Inscription</Text>
          <View style={styles.view}>
          <TextInput style={styles.input} placeholder="Pseudonyme" onChangeText={(value) => setPseudo(value)} value={pseudo} />
          <TextInput style={styles.input} placeholder="E-mail" onChangeText={(value) => setEmail(value)} value={email}/>
          <TextInput style={styles.input} placeholder="Mot de passe" onChangeText={(value) => setPassword(value)} value={password}/>
          <TextInput style={styles.input} placeholder="Confirmation mot de passe" />
          </View>
          <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Envoyer</Text>
           </TouchableOpacity> 
          <Text style={styles.message}>ou inscris-toi grâce à tes réseaux :</Text>
          <View style={styles.box}>
          <Text style={styles.footer}>Déjà un compte ?</Text>
          <Text style={styles.connect}> Connecte-toi !</Text>
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
  });