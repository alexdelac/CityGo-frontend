  import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Linking,
    Platform,
    TouchableOpacity,
  } from 'react-native';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  import Swiper from 'react-native-swiper';
  import {useFonts} from 'expo-font';
  import {useSelector} from 'react-redux'
  import { useState } from 'react';

  export default function DescriptionScreen({route, navigation }) {
    
    const user = useSelector((state) => state.user.value)

    const {eventData} = route.params //stock la data envoyé dans le route params a la redirection
    // Fonts import

    const [isLiked, setIsliked]=useState(eventData.etablissement.isLiked)

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

    const handleLike = (id)=>{
      fetch('http://10.1.1.249:3000/users/like', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: user.token, etablissementId: id }),
              })
              .then(response=>response.json())
              .then(data=>{
                console.log(data)
                setIsliked(!isLiked)
              })
    }
    

    if(!fontsLoaded){
    return null
    }
    
    return (
    
      <View style={styles.container} >
        <Swiper
          loop={true}
          showsPagination={true}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          paginationStyle={styles.paginationStyle}
        >
          {eventData.etablissement.photos.map((image, index) => (
          <View key={index} >
            <Image source={{uri: image}} style={styles.image} />
          </View>
          ))}
        </Swiper>

        <View style={styles.etablishmentCard}>
        <View style={styles.favorite}>
          <Text style={styles.h2}>{eventData.etablissement.name}</Text>
          <FontAwesome name='star' color={isLiked?'#8440B4':'#D7D7E5'} size={30} style={styles.star}
          onPress={()=>handleLike(eventData.etablissement.id)}
          />
        </View>
        
          <Text style={styles.type}>{eventData.etablissement.type}</Text>
          <Text style={styles.note}>Note Google: 3,9/5</Text>
          <Text style={styles.adress}>{eventData.etablissement.adresse}</Text>
          <Text style={styles.adress}>{eventData.etablissement.telephone}</Text>
          <TouchableOpacity style={styles.itineraryContent} onPress={()=>handleOpenNavigation()}>
            <FontAwesome name='location-arrow' color={'#FF7337'} size={30}
            />
            <Text style={styles.itinerary}>Y aller !</Text>
          </TouchableOpacity>
          <Text style={styles.description}>{eventData.etablissement.description}</Text>
          <Text style={styles.currentEvent}>Evènements en cours :</Text>
          <ScrollView style={styles.scrollEvent}>
            <Text style={styles.event}>{eventData.title}</Text>
            <Text style={styles.eventDescription}>{eventData.description}</Text>
          </ScrollView>
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
          </View>

      )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    dot: {
      backgroundColor: '#C8C2BB',
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    activeDot: {
      backgroundColor: '#B261E3',
      width: 10,
      height: 10,
      borderRadius: 5,
    },
    image: {
      width: '100%',
      height: 300,
    },
    etablishmentCard: {
      flex: 2,
      width: '100%',
      padding: 10,

    },
    h2: {
      fontSize: 32,
      color: '#8440B4',
      fontFamily: 'Quicksand-Bold',
    },
    favorite: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      fontSize: 18,
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
      fontSize: 18,
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
    eventDescription: {
      fontSize: 16,
      color: '#8440B4',
      fontFamily: 'Quicksand-SemiBold',
    },
    return: {
      alignItems: 'center',
      marginBottom: 30,
      padding: 10,
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
    scrollEvent: {
      width: '100%',
      height: 'auto',
    }
    
  });