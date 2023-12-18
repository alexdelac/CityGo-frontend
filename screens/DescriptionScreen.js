  import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Swiper from 'react-native-swiper';
  import {useFonts} from 'expo-font';

  export default function DescriptionScreen({ navigation }) {

  // Fonts import
  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
  });
  if(!fontsLoaded){
    return null
  }
  // swiper pics
  const images = [
    require('../assets/LovsterImage.jpeg'),
    require('../assets/LovsterImage.jpeg'),
    require('../assets/LovsterImage.jpeg'),
  ];
  
  return (
  
  <View style={styles.container} >
    <Swiper
      style={styles.swiper}
      loop={false}
      showsPagination={true}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      paginationStyle={styles.paginationStyle}
    >
      {images.map((image, index) => (
      <View key={index} style={styles.slide}>
        <Image source={image} style={styles.image} />
      </View>
      ))}
    </Swiper>
    <View style={styles.favorite}>
      <Text style={styles.h2}>Café Lovster</Text>
      <FontAwesome name='star' color={'#D7D7E5'} size={30} style={styles.star}
      />
    </View>
    <View style={styles.etablishmentCard}>
      <Text style={styles.type}>Bar / Restaurant</Text>
      <Text style={styles.note}>Note Google: 3,9/5</Text>
      <Text style={styles.adress}>3/3 Bis Boulevard Carnot</Text>
      <Text style={styles.adress}>59800 Lille</Text>
      <Text style={styles.adress}>03 28 14 18 74</Text>
      <View style={styles.itineraryContent}>
      <FontAwesome name='location-arrow' color={'#FF7337'} size={30}
        />
        <Text style={styles.itinerary}>Y aller !</Text>
      </View>
      <Text style={styles.description}>Restaurant spécialisé dans les lobster rolls. Places assises, Sert de l'alcool, Cartes bancaires acceptées, Service de table.</Text>
      <Text style={styles.currentEvent}>Evènements en cours</Text>
      <Text style={styles.event}>Happy Hour de 18 à 20h</Text>
      <Text style={styles.event}>5 Euros la pinte</Text>
    </View>
    <View style={styles.return}>
    <TouchableOpacity
              style={styles.buttonReturn}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Welcome')} >
              <Text style={styles.textButtonReturn}>
                Retour
              </Text>
            </TouchableOpacity>
            </View>
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
    swiper: {
      height: 320,
    },
    dot: {
      backgroundColor: '#C8C2BB',
      width: 10,
      height: 10,
      borderRadius: 5,
      bottom: - 10,
    },
    activeDot: {
      backgroundColor: '#B261E3',
      width: 10,
      height: 10,
      borderRadius: 5,
      bottom: -10,
    },
    slide: {
      flex: 1,
    },
    image: {
      width: '100%',
      height: 300,
    },
    h2: {
      fontSize: 32,
      color: '#8440B4',
      fontFamily: 'Quicksand-Bold',
    },
    favorite: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 18,
      marginRight: 20,
      marginTop: 20,
    },
    etablishmentCard: {
      flex: 1,
      padding: 20,
      bottom: 245,
    },
    type: {
      fontSize: 20,
      color: '#341C42',
      fontFamily: 'Quicksand-Bold',
    },
    note: {
      fontSize: 20,
      color: '#341C42',
      fontFamily: 'Quicksand-Bold',
      marginTop: 15,
      marginBottom: 15,
    },
    adress: {
      fontSize: 20,
      color: '#341C42',
      fontFamily: 'Quicksand-Regular',
    },
    itineraryContent: {
      flexDirection: 'row',
    },
    itinerary: {
      fontSize: 20,
      color: '#FF7337',
      fontFamily: 'Quicksand-Bold',
      marginTop: 5,
      marginLeft: 10,
    },
    description: {
      fontSize: 20,
      color: '#321C3C',
      fontFamily: 'Quicksand-Regular',
      marginTop: 20,
    },
    currentEvent: {
      fontSize: 20,
      color: '#321C3C',
      fontFamily: 'Quicksand-Bold',
      marginTop: 20,
      marginBottom: 10,
    },
    event: {
      fontSize: 24,
      color: '#8440B4',
      fontFamily: 'Quicksand-Bold',
    },
    return: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 40,
    },
    buttonReturn: {
      backgroundColor: '#FFF',
      borderRadius: 50,
      borderWidth: 1,
      borderColor: '#8440B4',
      height: 50,
      width: 285,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButtonReturn: {
      color: '#8440B4',
      fontSize: 24,
      fontFamily: 'Quicksand-SemiBold',
    },
    
  });