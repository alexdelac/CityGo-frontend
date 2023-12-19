import {
  Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput,
  TouchableOpacity, View, Keyboard
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font'

const BACKEND_ADDRESS = 'http://192.168.1.60:3000';

export default function SignupScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [errorSignup, setErrorSignup] = useState(null)
  const [errorPassword, setErrorPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
  });

  useEffect(() => {
    if (user.token) {
      navigation.navigate('Welcome')
    }
  }, [])




  const handleSubmit = () => {

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


    if (password === confirmPassword && pattern.test(email)) {

      fetch(`${BACKEND_ADDRESS}/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudonyme: pseudo, email: email, password: password, confirmPassword: confirmPassword })
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {

            dispatch(login({ pseudo: pseudo, token: data.token }));
            navigation.navigate('Signin');
          }
          else {
            setErrorSignup(data.error)
          }
        })
    } else {
      setErrorPassword(true)
    }
    Keyboard.dismiss()
  }


  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Inscription</Text>

      <View style={styles.view}>
        {isFocused === 'Pseudonyme' && <Text style={styles.inputLabel}>Pseudo</Text>}
        <TextInput
          onFocus={() => setIsFocused('Pseudonyme')}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, isFocused === 'Pseudonyme' && styles.inputIsFocused]}
          placeholderTextColor={'#D7D7E5'}
          placeholder={isFocused === 'Pseudonyme' ? '' : 'Pseudonyme'}
          onChangeText={(value) => setPseudo(value)}
          value={pseudo}

        />
        {isFocused === 'Email' && <Text style={styles.inputLabel}>E-mail</Text>}
        <TextInput
          onFocus={() => setIsFocused('Email')}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, isFocused === 'Email' && styles.inputIsFocused]}
          placeholderTextColor={'#D7D7E5'}
          placeholder={isFocused === 'Email' ? '' : 'Email'}
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        {isFocused === 'Mot de passe' && <Text style={styles.inputLabel}>Mot de passe</Text>}
        <TextInput
          onFocus={() => setIsFocused('Mot de passe')}
          onBlur={() => setIsFocused(false)}
          autoCapitalize='none'
          secureTextEntry={true}
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={[styles.input, isFocused === 'Mot de passe' && styles.inputIsFocused]}
          placeholderTextColor={'#D7D7E5'}
          placeholder={isFocused === 'Mot de passe' ? '' : 'Mot de passe'} />
        {isFocused === 'Confirmation mot de passe' && <Text style={styles.inputLabel}>Confirm</Text>}
        <TextInput
          onFocus={() => setIsFocused('Confirmation mot de passe')}
          onBlur={() => setIsFocused(false)}
          autoCapitalize='none'
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(value) => setConfirmPassword(value)}
          style={[styles.input, isFocused === 'Confirmation mot de passe' && styles.inputIsFocused]}
          placeholderTextColor={'#D7D7E5'}
          placeholder={isFocused === 'Confirmation mot de passe' ? '' : 'Confirmation mot de passe'} />
      </View>
      {errorPassword && <Text style={styles.error}>Email non valide ou mot de passe non identique</Text>}
      {errorSignup && <Text style={styles.error}>{errorSignup}</Text>}

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      <View style={styles.bottomContainer}>
      <Text style={styles.message}>ou inscris-toi grâce à tes réseaux :</Text>
      <View style={styles.logocontainer}>
        <TouchableOpacity>
          <FontAwesome name='facebook-square' style={styles.logo} size={50} color='#000080'></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name='google' style={styles.logo} size={50}></FontAwesome>
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Déjà un compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.linkText}> Connecte-toi</Text>
        </TouchableOpacity>
      </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 291,
    marginTop: 200,
  },

  title: {
    fontSize: 36,
    color: '#FF7337',
    fontFamily: 'Quicksand-Bold',
    marginTop: 90,
    marginBottom: 50,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D7D7E5',
    borderRadius: 5,
    width: 285,
    height: 55,
    margin: 5,
    paddingLeft: 20,
  },

  inputIsFocused: {
    borderColor: '#FF7337',
  },

  inputLabel: {
    position: 'relative',
    color: '#FF7337',
    textAlign: 'center',
    width: 70,
    marginBottom: -14,
    marginLeft: 20,
    backgroundColor: 'white',
    zIndex: 1,
    fontFamily: 'Quicksand-SemiBold',

  },

  button: {
    width: 285,
    height: 50,
    backgroundColor: '#8440B4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',

  },

  textContainer: {
    flexDirection: 'row',
    marginBottom: 60,
  },

  text: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
  },

  linkText: {
    color: '#FF7337',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',

  },
  message: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',

  },
  logocontainer: {
    flexDirection: 'row',

  },
  error: {
    fontFamily: 'Quicksand-Bold',
  },
});