import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import {useFonts} from 'expo-font';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';


  export default function FavorisScreen({ navigation }) {

    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });

    if(!fontsLoaded){
      return null
    }

    return (
    
    <View style={styles.container}>
      <Text style={styles.h2}>
        Mes Favoris
      </Text>
      <View style={styles.card}>
        <Image
          source={require('../assets/LovsterImage.jpeg')}
          style={styles.image} 
        />
        <View>
          <Text style={styles.name}>Café Lovster</Text>
          <Text style={styles.type}>Bar / Restaurant</Text>
          <Text style={styles.adress}>3/3 Bis Boulevard Carnot 59800 Lille</Text>
          <Text style={styles.adress}>03 28 14 18 74</Text>
          <Text style={styles.distance}>à 345 mètres</Text>
        </View>
        <View style={styles.favorite}>
          <FontAwesome name='star' color={'#D7D7E5'} size={30}
          />
          <FontAwesome name='circle' color={'#D7D7E5'} size={30}
          />
        </View>
      </View>
    </View>



    );
  };



  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    h2: {
      fontSize: 36,
      color: '#FF7337',
      fontFamily: 'Quicksand-Bold',
      marginTop: 90,
      marginBottom: 50,
    },
    card: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      borderBottomWidth: 1,
      borderColor: '#D7D7E5',
      width: '100%',
      padding: 10,

    },
    image: {
      width: 105,
      height: 90,
      padding: 5,
    },
    name: {
      fontSize: 16,
      fontFamily: 'Quicksand-SemiBold',
      color: '#8440B4',
    },
    type: {
      fontSize: 13,
      fontFamily: 'Quicksand-SemiBold',
      color: '#321C3C',
      marginBottom: 3,
    },
    adress: {
      fontSize: 12,
      fontFamily: 'Quicksand-Regular',
      color: '#321C3C',
      marginBottom: 3,
    },
    distance: {
      fontSize: 13,
      fontFamily: 'Quicksand-SemiBold',
      color: '#FF7337',
    },
    favorite: {
      justifyContent: "space-between",
      alignItems: 'center',
    }

  })