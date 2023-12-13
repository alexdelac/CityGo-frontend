import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';
import { useFonts } from 'expo-font';
import { logout } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';



export default function ProfilScreen({ navigation }) {
  const dispatch = useDispatch();
const user = useSelector((state) => state.user.value)


  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
  });

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Signin');
    
  };

  if (!fontsLoaded) {
    return null
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <View style={styles.textcontainer}>
        <View style={styles.textinfo}>
          <Text>Pseudonyme : </Text>
          <Text>user pseudonyme</Text>
          </View>
          <View style={styles.textinfo}>
          <Text>E-mail : </Text>
          <Text>user.email</Text>
          </View>
        </View>
      <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Modifier mes informations</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Changer de mot de passe</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity  style={styles.deconnectbutton} activeOpacity={0.8} onPress={() => handleLogout()}>
            <Text  style={styles.textdeconnectButton}>Se déconnecter</Text>
          </TouchableOpacity>
          <TouchableOpacity>
        <Text style={styles.deleteLink}>Supprimer le compte</Text>
      </TouchableOpacity>
    </View>
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
    textAlign: 'center',
  },
  info: {
    textAlign: 'center',
  },
  pseudo: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  email: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  button: {
    height: 50,
    width: 285,
    backgroundColor: '#8440B4',
    borderRadius: 50,
    alignItems: 'center',
    paddingTop: 8,     
    marginBottom: 25,
  },
  textButton: {
    color: '#ffffff',
      fontWeight: '600',
      fontSize: 16,
      fontFamily: 'Quicksand-SemiBold',
      textAlign: 'center',
  },
  buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  deconnectbutton: {
    width: 285,
    height: 50,
    borderWidth: 1,
    borderColor: '#8440B4',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  textdeconnectButton: {
    color: '#8440B4',
  },
  deleteLink: {
    color: '#FF7337',
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold'
  },
  textcontainer: {
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Quicksand-Light',
    fontSize: 20,
  },
  textinfo: {
    flexDirection: 'row',
  }
});