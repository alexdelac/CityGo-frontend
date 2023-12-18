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
  Platform
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState(null);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [EtablishmentsModalVisible, setEtablishmentsModalVisible] = useState(false);
  const [isCheckedEvent, setCheckedEvent] = useState('');
  const [isCheckedBar, setCheckedBar] = useState('');
  const [isCheckedRestaurant, setCheckedRestaurant] = useState('');
  const [isCheckedFavorite, setCheckedFavorite] = useState('');
  const [isCheckedPromo, setCheckedPromo] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [date, setDate] = useState(new Date())
  const [eventsData, setEventsData] = useState(null)

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
    hideDatePicker();
  };


  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        Location.watchPositionAsync({ distanceInterval: 10 },
          (location) => {
            fetch('http://10.1.1.249:3000/events/display', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ latitude: location.coords.latitude, longitude: location.coords.longitude, date: date }),
            })
              .then(response => response.json())
              .then(data => {
                setEventsData(data.data)
                setCurrentPosition(location.coords);
              })
          });
      }
    })();
  }, []);

  let event
  let eventList
  if (eventsData) {
    event = eventsData.map((data, i) => {
      const latitude = data.etablissement.localisation.coordinates[1]
      const longitude = data.etablissement.localisation.coordinates[0]
      return <Marker key={i} coordinate={{ latitude, longitude }} title={data.etablissement.name} pinColor='#8440B4' />
    })
    eventList = eventsData.map((data, i) => {
      return (
        <View style={styles.etablishmentCard}>
          <Image style={styles.image} source={{uri: data.etablissement.photos[0]}} />
          <TouchableOpacity onPress={() => {
            setEtablishmentsModalVisible(false);
            navigation.navigate('Description')
          }}>
            <View style={styles.etablishmentInfo}>
              <Text style={styles.etablishmentName}>{data.etablissement.name}</Text>
              <Text style={styles.etablishmentDistance}>à XXX mètres</Text>
              <Text style={styles.etablishmentNote}>Note Google: 3,9/5</Text>
              <Text style={styles.etablishmentAdress}>{data.etablissement.adresse}</Text>
              <Text style={styles.etablishmentPhone}>{data.etablissement.telephone}</Text>
              <Text style={styles.etablishmentEvent}>{data.title}</Text>
              <Text style={styles.etablishmentEvent}>{data.description}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.etablishmentFavorite}>
            <FontAwesome name='star' color={'#D7D7E5'} size={25} />
          </View>
        </View>
      )
    })
  }

  console.log(eventList)

  // Fonts import
  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      {/* Filter view */}
      <View style={styles.filterContainer}>
        <View style={styles.filter}>
          <TextInput
            placeholder={'Adresse, ville, métro...'}
            style={styles.filterPlace}
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
              onConfirm={handleConfirm}
              onCancel={() => { hideDatePicker() }}
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
                  onValueChange={() => setCheckedBar(isCheckedBar === '' ? 'Bar' : '')}
                  color={isCheckedBar !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Restaurant :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedRestaurant}
                  onValueChange={() => setCheckedRestaurant(isCheckedRestaurant === '' ? 'Restaurant' : '')}
                  color={isCheckedRestaurant !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Favoris :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedFavorite}
                  onValueChange={() => setCheckedFavorite(isCheckedFavorite === '' ? 'Favoris' : '')}
                  color={isCheckedFavorite !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Promotion :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedPromo}
                  onValueChange={() => setCheckedPromo(isCheckedPromo === '' ? 'Promotion' : '')}
                  color={isCheckedPromo !== '' ? '#E6DCEC' : undefined}
                />
                <Text style={styles.checkboxText}>Evènements :</Text>
                <Checkbox
                  style={styles.checkbox}
                  value={isCheckedEvent}
                  onValueChange={() => setCheckedEvent(isCheckedEvent === '' ? 'Evènement' : '')}
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
      </Modal>

      {/* Mapview */}
      <MapView style={styles.map}
        initialRegion={{
          latitude: 50.637699,
          longitude: 3.064728,
          latitudeDelta: 0.0062,
          longitudeDelta: 0.0061,
        }}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#FF7337" />}
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
    alignItems: 'center',
  },
  filterBottom: {
    flexDirection: 'row',
    marginTop: 5,
  },
  filterPlace: {
    width: 365,
    height: 35,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D7D7E5',
    marginTop: 50,
    paddingLeft: 9,
  },
  filterWhen: {
    width: 185,
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
    width: 170,
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
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
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#D7D7E5',
    padding: 8,
  },
  image: {
    width: 135,
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
  },
  etablishmentName: {
    color: '#8440B4',
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
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
    marginLeft: 15,
    marginTop: 10,
  }


});