import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity, View
  } from 'react-native';
  import {useFonts} from 'expo-font'


  export default function HomeScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });

    if(!fontsLoaded){
      return null
    }

    return (

      <View>
      <Text>HomeScreen</Text>
    </View>
    )
  };