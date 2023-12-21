import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { useFonts } from 'expo-font';

export default function IntroductionScreen2({ navigation }) {

  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
  <View style={styles.container}>
    <TouchableWithoutFeedback 
      onPress={() => navigation.navigate('Introduction3')}
    >
      <View style={styles.introductionContainer}>
        <Image
          source={require('../assets/intro2.png')}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.text}>
          D'un verre en tête à tête ?
        </Text>
      </View>
    </TouchableWithoutFeedback>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  introductionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    margin: -215,
  },
  text: {
    fontSize: 36,
    fontFamily: 'Quicksand-SemiBold',
    color: '#321C3C',
    textAlign: 'center',
  }
});