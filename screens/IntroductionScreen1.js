import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFonts } from 'expo-font';

export default function IntroductionScreen1({ navigation }) {

  const user = useSelector((state) => state.user.value)
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
  });

  useEffect(() => {
    if (user.token) {
      navigation.navigate('Welcome')
    }
  }, [])

  if (!fontsLoaded) {
    return null;
  }

  return (
  <View style={styles.container}>
    <TouchableWithoutFeedback 
      onPress={() => navigation.navigate('Introduction2')}
    >
      <View style={styles.introductionContainer}>
        <Image
          source={require('../assets/test.png')}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.text}>
          Envie d'un resto entre amis ?
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
    margin: -100,
  },
  text: {
    fontSize: 36,
    fontFamily: 'Quicksand-SemiBold',
    color: '#321C3C',
    textAlign: 'center',
  }
});

