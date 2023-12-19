import {
    Text,
    View,
  } from 'react-native';
  import {useFonts} from 'expo-font'


  export default function IntroductionScreen3({ navigation }) {

    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });

    if(!fontsLoaded){
      return null
    }




    return (

        <View>
            <Text>
                Envie d'un resto entre amis ? 
            </Text> 

                <Image source={require('../assets/intro3.png')} />
        


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