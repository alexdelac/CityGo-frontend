import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, View
  } from 'react-native';
  import { useSelector } from 'react-redux';
  import {useFonts} from 'expo-font'

  

  export default function WelcomeScreen({ navigation }) {
    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });
  

    const user = useSelector((state) => state.user.value);
    console.log(user)

if(!fontsLoaded){
  return null
}



    





    return (
        <View style={styles.container} >
          <View style={styles.welcomecontainer}>
          <Text style={styles.title}>Hello {''}
          <Text style={styles.pseudonyme}>{user.pseudonyme}</Text>
           , où allons nous ?</Text>
          </View>
          <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text onPress={() => navigation.navigate("TabNavigator", { screen: "Home" })} style={styles.textButton}>Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("TabNavigator", { screen: "Home" })} style={styles.button} activeOpacity={0.8}>
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
      width: 343,
      height: 108,
      fontSize: 36,
      fontWeight: '600',
      textAlign: 'center',
      fontFamily: 'Quicksand-SemiBold',
    },
    button: {
      alignItems: 'center',
      paddingTop: 8,
      width: 285,
      height: 80,
      backgroundColor: '#8440B4',
      borderRadius: 50,
      marginBottom: 25,
      
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
      height: 108,
      width: 343,
      textAlign: 'center',
      marginBottom: 70,
    },
    buttoncontainer: {
      alignItems: 'center',
      justifyContent: 'center',
    }
  });