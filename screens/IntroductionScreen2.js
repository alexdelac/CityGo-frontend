import {
    Text,
    View,
  } from 'react-native';
  import {useFonts} from 'expo-font'


  export default function IntroductionScreen2({ navigation }) {

    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });

    if(!fontsLoaded){
      return null
    }




    return (

        <View>

        <Image source={require('../assets/intro2.png')} />
        <Text>
            D'un verre en tête à tête ?
        </Text>


    </View>

    )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
    },

})