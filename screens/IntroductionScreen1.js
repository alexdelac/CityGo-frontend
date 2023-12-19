import {
    Text,
    View,
    Image,
  } from 'react-native';
  import {useFonts} from 'expo-font'


  export default function IntroductionScreen1({ navigation }) {

    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });

    if(!fontsLoaded){
      return null
    }




    return (
    
    <View>

        <Image source={require('../assets/intro1.png')} />
        <Text>
            Envie d'un resto entre amis ? 
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

