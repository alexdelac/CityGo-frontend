    import {
        StyleSheet,
        View,
        Text,
        Image,
        ScrollView,
        Linking,
        Platform,
    } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Swiper from 'react-native-swiper';
  
  import {useFonts} from 'expo-font';

  

  export default function DescriptionScreen({route, navigation }) {

    const {eventData} = route.params //stock la data envoyé dans le route params a la redirection
    console.log(eventData)
    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });

    // fonction prenant la latitude et longitude envoyé dans le eventData pour redirection vers google maps
    const handleOpenNavigation = ()=>{
      let url =''
      if (Platform.OS === 'ios'){
        url = `http://maps.apple.com/?daddr=${eventData.etablissement.localisation.coordinates[1]},${eventData.etablissement.localisation.coordinates[0]}`
      } else {
        url = `http://maps.google.com/?daddr=${eventData.etablissement.localisation.coordinates[1]},${eventData.etablissement.localisation.coordinates[0]}`
      }
      
      Linking.openURL(url)
    }
    

    if(!fontsLoaded){
    return null
    }
  

    return (
        <View style={styles.container} >
            <Swiper
        style={styles.swiper}
        loop={false}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {eventData.etablissement.photos.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={{uri: image}} style={styles.image} />
          </View>
        ))}
      </Swiper>
            <View style={styles.etablishmentCard}>
                <Text style={styles.h2}>{eventData.etablissement.name}</Text>
                <Text style={styles.type}>{eventData.etablissement.type}</Text>
                <Text style={styles.note}>Note Google: 3,9/5</Text>
                <Text style={styles.adress}>{eventData.etablissement.adresse}</Text>
                <Text style={styles.adress}>{eventData.etablissement.telephone}</Text>
                <Text style={styles.itinerary} onPress={()=>handleOpenNavigation()}><FontAwesome name='street-view' color={'#FF7337'} size={35} /> Y aller !</Text>
                <Text style={styles.description}>{eventData.etablissement.description}</Text>
                <Text style={styles.currentEvent}>Evènements en cours</Text>
                <Text style={styles.event}>{eventData.title}</Text>
                <Text style={styles.event}>{eventData.description}</Text>
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
        backgroundColor: 'red',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
        position: 'absolute',
        bottom: 10,
        zIndex: 2, // Ajustez cette valeur pour que les dots apparaissent au-dessus des images
      },
      activeDot: {
        backgroundColor: 'yellow',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
        position: 'absolute',
        bottom: 10,
        zIndex: 3, // Ajustez cette valeur pour que les active dots apparaissent au-dessus des dots inactifs
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
        marginTop: 20,
    },
    etablishmentCard: {
        flex: 1,
        padding: 20,
        bottom: 150,
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
    itinerary: {
        fontSize: 20,
        color: '#FF7337',
        fontFamily: 'Quicksand-Bold',
        marginTop: 5,
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
    }

    

  });