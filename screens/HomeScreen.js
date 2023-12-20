import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux'
import { changeLike } from '../reducers/user'
import { AutocompleteDropdown, AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

export default function HomeScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState({ latitude: 50.637699, longitude: 3.064728 });
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [EtablishmentsModalVisible, setEtablishmentsModalVisible] = useState(false);
  const [isCheckedEvent, setCheckedEvent] = useState(false);
  const [isCheckedBar, setCheckedBar] = useState(false);
  const [isCheckedRestaurant, setCheckedRestaurant] = useState(false);
  const [isCheckedFavorite, setCheckedFavorite] = useState(false);
  const [isCheckedPromo, setCheckedPromo] = useState(false);
  const [eventCardVisible, setEventCardVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [eventsData, setEventsData] = useState(null)
  const [selection, setSelection] = useState(null)
  const [adresse, setAdresse] = useState('')
  const [modalMarkerDetail, setModalMarkerDetail] = useState('')

 

  const user = useSelector((state) => state.user.value)
  const like = useSelector((state) => state.user.like)
  const dispatch = useDispatch()

  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    console.warn("Date sélectionnée: ", date);
    setSelectedStartDate(date);
    // hideDatePicker();
  };

// récupération de la localisation au lancement de l'application
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            setCurrentPosition(location.coords);

          });
      }
    })();
  }, []);

console.log(selectedStartDate)

//recupération des events selon date et localisation
  useEffect(() => {
    fetch('http://10.1.1.249:3000/events/display', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude: currentPosition.latitude, longitude: currentPosition.longitude, date: selectedStartDate, token: user.token }),
    })
      .then(response => response.json())
      .then(data => {
        setEventsData(data.data)

      })
  }, [like, selectedStartDate, currentPosition])


 //a chaque modification de l'input adresse intérroge l'API data.gouv afin d'obtenir les 5 adresse les plus pertinantes avec leurs coordonnées gps
  useEffect(() => {
    if (adresse.length > 3) {
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${adresse}&type=municipality&limit=5`)
        .then(response => response.json())
        .then(data => {
          setSelection(data.features.map((data, i) => {
            return { id: i, title: data.properties.label, coord: data.geometry }

          }))
        })
    }
  }, [adresse])

//ajoute ou supprime un établissement liké dans user.liked
  const handleLike = (id) => {
    fetch('http://10.1.1.249:3000/users/like', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, etablissementId: id }),
    })
      .then(response => response.json())
      .then(data => {
        dispatch(changeLike())
      })
  }

// contenu de la modal Event modal from marker (paramétre infos envoyé directement par le marker)
  const eventModal = (infos) => {
    setEventCardVisible(true)
    setModalMarkerDetail(
      <View style={styles.eventCardInfos}>
        <Image
          source={{uri: infos.etablissement.photos[0]}}
          style={styles.eventCardImage}
        />
        <TouchableOpacity onPress={() => {
            setEtablishmentsModalVisible(false);
            navigation.navigate('Description', {
              eventData: infos
            })
          }}>
          <View>
            <Text style={styles.eventCardName}>{infos.etablissement.name}</Text>
            <Text style={styles.eventCardType}>{infos.etablissement.type}</Text>
            <Text style={styles.eventCardType}>à {infos.etablissement.distance} mètres</Text>
            <Text style={styles.eventCardNote}>Note: 3,9/5</Text>
            <Text style={styles.eventCardAdress}>{infos.etablissement.adresse}</Text>
            <Text style={styles.eventCardAdress}>{infos.etablissement.telephone}</Text>
            <Text style={styles.eventCardEventTitle}>{infos.title}</Text>
            <Text style={styles.eventCardEventDescription}>{infos.description}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <FontAwesome name='star' color={infos.etablissement.isLiked ? '#8440B4' : '#D7D7E5'} size={25} marginRight={20}
            onPress={() => handleLike(infos.etablissement.id)}
          />
        </View>
      </View>
    )

  }

  let event
  let eventList
  if (eventsData) {


    // filtrage Events
    let filteredData = eventsData

    if (isCheckedFavorite) {
      filteredData = eventsData.filter(e => e.etablissement.isLiked === true)
    } else {
      filteredData = filteredData
    }
    if (isCheckedPromo && isCheckedEvent) {
      filteredData = filteredData
    } else if (isCheckedPromo) {
      filteredData = filteredData.filter(e => e.type.includes('Promotion'))
    } else if (isCheckedEvent) {
      filteredData = filteredData.filter(e => e.type.includes('Evènement'))
    } else {
      filteredData = filteredData
    }
    if (isCheckedBar) {
      filteredData = filteredData.filter(e => e.etablissement.type.includes('Bar'))
    } else if (isCheckedRestaurant) {
      filteredData = filteredData.filter(e => e.etablissement.type.includes('Restaurant'))
    } else {
      filteredData = filteredData
    }

//itération sur la data pour génération des marker
    event = filteredData.map((data, i) => {
      const latitude = data.etablissement.localisation.coordinates[1]
      const longitude = data.etablissement.localisation.coordinates[0]
      return <Marker
        key={i}
        coordinate={{ latitude, longitude }}
        title={data.etablissement.name}
        onPress={() => eventModal(data)}
      >
        <FontAwesome name="map-marker" size={40} color="#8440B4" />
      </Marker>
    })

//itération sur la data pour génération des cards de la liste
    eventList = filteredData.map((data, i) => {
      return (
        <View key={i} style={styles.etablishmentCard}>
          <Image style={styles.image} source={{ uri: data.etablissement.photos[0] }} />
          <TouchableOpacity onPress={() => {
            setEtablishmentsModalVisible(false);
            navigation.navigate('Description', {
              eventData: data
            })
          }}>
            <View style={styles.etablishmentInfo}>
              <Text style={styles.etablishmentName}>{data.etablissement.name}</Text>
              <Text style={styles.etablishmentDistance}>à {data.etablissement.distance} mètres</Text>
              <Text style={styles.etablishmentNote}>Note Google: 3,9/5</Text>
              <Text style={styles.etablishmentAdress}>{data.etablissement.adresse}</Text>
              <Text style={styles.etablishmentPhone}>{data.etablissement.telephone}</Text>
              <Text style={styles.etablishmentEvent}>{data.title}</Text>
              <Text style={styles.etablishmentEventDescription}>{data.description}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.etablishmentFavorite}>
            <FontAwesome name='star' color={data.etablissement.isLiked ? '#8440B4' : '#D7D7E5'} size={25} onPress={() => handleLike(data.etablissement.id)} />
          </View>
        </View>
      )
    })
  }


  // Fonts import
  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      {/* Filter view */}
      <View style={styles.filterContainer}>
        <AutocompleteDropdownContextProvider>
          <View style={styles.filter}>
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              onSelectItem={(item) => { item && setCurrentPosition({ latitude: item.coord.coordinates[1], longitude: item.coord.coordinates[0] }) }}
              onChangeText={(value) => setAdresse(value.replace(/ /g, '+'))}
              textInputProps={{
                placeholder: 'Adresse, ville, métro...',
                style: {
                  fontSize: 15,
                  alignSelf: 'center',
                  paddingLeft: 9,
                }
              }}
              dataSet={selection}
              inputContainerStyle={{
                width: '100%',
                height: 35,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#D7D7E5',
                backgroundColor: 'white',
                marginTop: 40,
              }}
            />
            <View style={styles.filterBottom}>
              <TextInput
                placeholder='Quand ?'
                onFocus={showDatePicker}
                value={selectedStartDate ? format(selectedStartDate, 'dd/MM/yy HH:mm') : ''}
                style={styles.filterWhen}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={ handleConfirm }
                onCancel={() => { hideDatePicker(); Keyboard.dismiss() }}
                locale="fr"
                cancelTextIOS="Annuler" // A voir pour Android
                confirmTextIOS="Confirmer" // A voir pour Android
              />
              <TouchableOpacity
                style={styles.buttonFilter}
                activeOpacity={0.8}
                onPress={() => setIsFilterModalVisible(!isFilterModalVisible)}
              >
                <Text style={styles.textButtonFilter}>+ de filtres</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AutocompleteDropdownContextProvider>
      </View>
      {/* Filter modal*/}
      <Modal
        animationType='fade'
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsFilterModalVisible(false)}>
          <View style={styles.modal}>
            <View style={styles.modalView}>
              <View style={styles.checkboxContainer}>
                <Text style={styles.checkboxText}>Bar :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedBar}
                  onValueChange={() => setCheckedBar(isCheckedBar === false ? true : false)}
                  color={isCheckedBar !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Restaurant :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedRestaurant}
                  onValueChange={() => setCheckedRestaurant(isCheckedRestaurant === false ? true : false)}
                  color={isCheckedRestaurant !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Favoris :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedFavorite}
                  onValueChange={() => setCheckedFavorite(isCheckedFavorite === false ? true : false)}
                  color={isCheckedFavorite !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Promotion :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedPromo}
                  onValueChange={() => setCheckedPromo(isCheckedPromo === false ? true : false)}
                  color={isCheckedPromo !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Evènements :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedEvent}
                  onValueChange={() => setCheckedEvent(isCheckedEvent === false ? true : false)}
                  color={isCheckedEvent !== '' ? '#E6DCEC' : undefined}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Etablishments button */}
      <View style={styles.etablishmentsContainer}>
        <TouchableOpacity
          style={styles.etablishments}
          activeOpacity={0.8}
          onPress={() => setEtablishmentsModalVisible(true)}
        >
          <Text style={styles.etablishmentsList}>
            Liste des établissements
          </Text>
        </TouchableOpacity>
      </View>
      {/* Etablishments modal */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={EtablishmentsModalVisible}
        onRequestClose={() => setEtablishmentsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEtablishmentsModalVisible(false)}>
        <View style={styles.modal}>
          <View style={styles.listModal}>
            <Text
              style={styles.titleModal}
              onPress={() => setEtablishmentsModalVisible(false)}
            >Liste des établissements</Text>
            <ScrollView style={styles.scrollList}>
              <View>
                {eventList}
              </View>
            </ScrollView>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Event modal from marker */}

      <Modal
        animationType='fade'
        transparent={true}
        visible={eventCardVisible}
        onRequestClose={() => setEventCardVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setEventCardVisible(false)}>
          <View style={styles.modalEvent}>
            <View style={styles.eventCard}>
              <View >

                {modalMarkerDetail}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Mapview */}
      <MapView style={styles.map}
        initialRegion={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0062,
          longitudeDelta: 0.0061,
        }}
        region={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0062,
          longitudeDelta: 0.0061,
        }}
      >
        {currentPosition && <Marker coordinate={currentPosition} title="Ma position">
          <FontAwesome name="map-marker" size={40} color="#FF7337" />
        </Marker>}
        {event}
      </MapView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  filterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1, // Pour s'assurer que la view filtre reste au-dessus de la carte
  },
  filter: {
    backgroundColor: '#FFF',
    height: 150,
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // pour Android
    overflow: 'visible',
    alignItems: 'flex-start',
  },
  filterBottom: {
    flexDirection: 'row',
    marginTop: 5,
  },
  filterPlace: {
    width: '100%',
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D7D7E5',
    marginTop: 50,
    paddingLeft: 9,
  },
  filterWhen: {
    width: '50%',
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D7D7E5',
    paddingLeft: 9,
    marginRight: 5,
  },
  buttonFilter: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#FF7337',
    height: 35,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
  textButtonFilter: {
    color: '#FF7337',
    fontSize: 14,
    fontFamily: 'Quicksand-SemiBold',
  },
  etablishmentsContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 800 : 650,
    left: 0,
    right: 0,
    height: 150,
    zIndex: 1, // Pour s'assurer que la view filtre reste au-dessus de la carte
  },
  etablishments: {
    backgroundColor: '#8440B4',
    height: 100,
    width: '100%',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // pour Android
    overflow: 'visible',
    alignItems: 'center',
    borderRadius: 50,
  },
  etablishmentsList: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    marginTop: 4,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    backgroundColor: '#8440B4',
    padding: 35,
    alignItems: 'center',
    elevation: 5,
    marginTop: 150,
    height: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // pour Android
    overflow: 'visible',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#E6DCEC',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#E6DCEC',
  },
  closeText: {
    color: '#E6DCEC',
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: -20,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D3CCD8',
    marginRight: 20,
    marginTop: 15,
    marginBottom: 5,
  },
  checkboxText: {
    color: '#E6DCEC',
    fontSize: 15,
  },
  listModal: {
    backgroundColor: '#8440B4',
    paddingTop: 35,
    alignItems: 'center',
    elevation: 5,
    marginTop: 155,
    height: '75%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  titleModal: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Quicksand-SemiBold',
    marginTop: -15,
    marginBottom: 20,
  },
  etablishmentCard: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#D7D7E5',
    padding: 10,
  },
  image: {
    width: 130,
    height: 190,
  },
  etablishmentInfo: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollList: {
    width: '100%',
    height: 200,
    backgroundColor: '#D7D7E5',
  },
  etablishmentName: {
    color: '#8440B4',
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
  },
  etablishmentAdress: {
    color: '#321C3C',
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
  },
  etablishmentDistance: {
    color: '#321C3C',
    fontSize: 13,
    fontFamily: 'Quicksand-SemiBold',
  },
  etablishmentEvent: {
    color: '#FF7337',
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    marginTop: 10,
  },
  etablishmentEventDescription: {
    color: '#FF7337',
    fontSize: 12,
    fontFamily: 'Quicksand-SemiBold',
    textAlign: 'justify',
    width: '35%',
  },
  etablishmentPhone: {
    color: '#321C3C',
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
  },
  etablishmentNote: {
    color: '#321C3C',
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
  },
  etablishmentFavorite: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  modalEvent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  eventCard: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: '40%',
    backgroundColor: '#FFF',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5, // pour Android
    overflow: 'visible',
  },
  eventCardInfos: {
    flexDirection: 'row',
    padding: 15,
    width: '60%',
  },
  eventCardImage: {
    width: 130,
    height: 180,
    marginRight: 10,
  },
  eventCardName: {
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
    color: '#FF7337',
  },
  eventCardType: {
    fontSize: 13,
    fontFamily: 'Quicksand-SemiBold',
    color: '#321C3C',
  },
  eventCardNote: {
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
    color: '#321C3C',
    marginTop: 10,
    marginBottom: 10,
  },
  eventCardAdress: {
    fontSize: 12,
    fontFamily: 'Quicksand-Regular',
    color: '#321C3C',
  },
  eventCardEventTitle: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: '#FF7337',
    marginTop: 10,
  },
  eventCardEventDescription: {
    fontSize: 15,
    fontFamily: 'Quicksand-SemiBold',
    color: '#FF7337',
  },



});