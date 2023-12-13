import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, View, Keyboard,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../reducers/user';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font'




const BACKEND_ADDRESS = 'http://10.1.3.138:3000';



export default function SigninScreen({ navigation }) {

  const [signInPassword, setSignInPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [email, setEmail] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const dispatch = useDispatch();
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
  });




  const handleConnect = () => {
    console.log(email, password)

    if (email !== '' && password !== '') {
      if (pattern.test(email)) {
        fetch(`${BACKEND_ADDRESS}/users/signin`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email, password: password }),
        })
          .then(response => response.json())
          .then(data => {
            if (data.result) {
              console.log(data)
              dispatch(login({ pseudonyme: data.pseudonyme, token: data.token }));
              navigation.navigate('Welcome');

              setEmail('');
              setPassword('');
            } else {
              setError(data.error)
            }
          })
      } else {
        setError('Invalid Email')
      }
    } else {
      setError('Missing or empty fields')
    }

    Keyboard.dismiss()


  };





  if (!fontsLoaded) {
    return null
  }



  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.title}>Connexion</Text>
      <View>
        {isFocused === 'Email' && <Text style={styles.inputLabel}>E-mail</Text>}
        <TextInput
          onFocus={() => setIsFocused('Email')}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, isFocused === 'Email' && styles.inputIsFocused]}
          placeholderTextColor={'#D7D7E5'}
          placeholder={isFocused === 'Email' ? '' : 'Email'}
          onChangeText={(value) => setEmail(value)}
          value={email} />
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
        <TouchableOpacity>
          <Text style={styles.forgetPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity onPress={() => handleConnect()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Envoyer</Text>
      </TouchableOpacity>
      <Text style={styles.reseauxText}>ou connecte-toi grâce à tes réseaux</Text>
      <View style={styles.logocontainer}>
        <TouchableOpacity>
          <FontAwesome name='facebook-square' size={50} style={styles.logo} color='#000080'></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name='google' size={50} style={styles.logo}></FontAwesome>
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Pas de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}> Inscris-toi</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  title: {
    color: '#FF7337',
    fontSize: 36,
    fontFamily: 'Quicksand-Bold',
    marginTop: 25
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

  forgetPassword: {
    color: '#FF7337',
    fontSize: 16,
    paddingLeft: 5,
    marginTop: 10,
    fontFamily: 'Quicksand-Bold',
  },

  button: {
    width: 285,
    height: 50,
    backgroundColor: '#8440B4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reseauxText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',
  },

  buttonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
  },

  textContainer: {
    flexDirection: 'row',

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
  box: {
    flexDirection: 'row',
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
  logocontainer: {
    flexDirection: 'row',

  },
  logo: {
    width: '100%',
  },
  error: {
    fontFamily: 'Quicksand-Medium',
    fontStyle: 'italic',
  }
});