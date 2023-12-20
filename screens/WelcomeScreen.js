import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, View
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFonts } from 'expo-font'
import {updateWelcomeType} from '../reducers/user'




export default function WelcomeScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
  });

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch()

  if (!fontsLoaded) {
    return null
  }


  return (
    <View style={styles.container} >
      <View style={styles.welcomecontainer}>
        <Text style={styles.title}>Hello {''}
          <Text style={styles.pseudonyme}>{user.pseudonyme}</Text>,</Text>
        <Text style={styles.title}>où allons-nous ?</Text>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity onPress={() => {dispatch(updateWelcomeType('Restaurant')); navigation.navigate("TabNavigator")}} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Restaurant</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("TabNavigator")} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Bar</Text>
        </TouchableOpacity>
      </View>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    textAlign: 'center',
    fontFamily: 'Quicksand-SemiBold',
  },
  button: {
    width: 285,
    height: 80,
    backgroundColor: '#8440B4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,

  },
  textButton: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 36,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'center',

  },
  pseudonyme: {
    color: '#FF7337',
    fontSize: 36,
    fontFamily: 'Quicksand-Bold',

  },
  welcomecontainer: {

    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 70,
  },
  buttoncontainer: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});