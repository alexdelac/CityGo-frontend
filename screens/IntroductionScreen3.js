import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { useFonts } from 'expo-font';

export default function IntroductionScreen3({ navigation }) {

  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
  <View style={styles.container}>
      <View style={styles.introductionContainer}>
        <Text style={styles.text}>
          Peu importe votre envie,{' '}
          <Text style={styles.text2}>
            CityGo
          </Text>
          {' trouve pour vous les meilleurs plans à proximité !'}
        </Text>
        <Image
          source={require('../assets/intro3.png')}
          style={styles.image}
          resizeMode='contain'
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.textButton}>
            Je m'inscris
          </Text>
        </TouchableOpacity>
      </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  introductionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  image: {
    width: '120%',
    margin: -190,
  },
  text: {
    fontSize: 36,
    fontFamily: 'Quicksand-SemiBold',
    color: '#321C3C',
    textAlign: 'center',
  },
  text2: {
    fontSize: 36,
    fontFamily: 'Quicksand-Bold',
    color: '#FF7337',
  },
  button: {
    backgroundColor: '#8440B4',
    borderRadius: 50,
    marginBottom: 0,
    height: 50,
    width: 285,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textButton: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
  },
});
