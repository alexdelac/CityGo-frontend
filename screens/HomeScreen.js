import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, 
  View,
  Modal
} from 'react-native';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState(null);
  const [FilterModalVisible, setFilterModalVisible] = useState(false);

  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
  });

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

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.filterContainer}>
        <View style={styles.filter}>
          <TextInput 
            placeholder={'Adresse, ville, métro...'}
            style={styles.filterPlace}
          />
          <View style={styles.filterBottom}>
            <TextInput 
              placeholder={'Quand ?'}
              style={styles.filterWhen}
            />
            <TouchableOpacity
              style={styles.buttonFilter}
              activeOpacity={0.8}
              onPress={() => setFilterModalVisible(true)}>
                <Text style={styles.textButtonFilter}>
                  + de filtres
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={FilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modal}>
          <View style={styles.modalView}>
          <View style={styles.sectionCheckbox}>
              <Text style={styles.checkboxText}>
                Bar :
              </Text>
              <Checkbox
                  style={styles.checkbox}
                  />
              <Text style={styles.checkboxText}>
                Restaurant :
              </Text>
              <Checkbox
                  style={styles.checkbox}
                  />
                  <Text style={styles.checkboxText}>
                Favoris :
              </Text>
              <Checkbox
                  style={styles.checkbox}
                  />
                  <Text style={styles.checkboxText}>
                Promotions :
              </Text>
              <Checkbox
                  style={styles.checkbox}
                  />
                  <Text style={styles.checkboxText}>
                Evènements :
              </Text>
              <Checkbox
                  style={styles.checkbox}
                  />
              </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFilterModalVisible(false)}>
              <Text>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.etablishmentsContainer}>
        <View style={styles.etablishments}>
          <Text style={styles.etablishmentsList}>
            Liste des établissements
          </Text>
        </View>
      </View>

      <MapView style={styles.map}
        initialRegion={{
          latitude: 50.637699,
          longitude: 3.064728,
          latitudeDelta: 0.0062,
          longitudeDelta: 0.0061,
        }}>
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#FF7337" />}
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
    top: 800,
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
    // justifyContent: 'center',
    // alignItems: 'center',
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
    backgroundColor: '#FF7337',
    borderRadius: 5,
  },
  checkbox: {
    height: 15,
    width: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D3CCD8',
    marginRight: 30,
    marginLeft: 5,
  },
  sectionCheckbox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -20,
    marginLeft: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    
   },
  checkboxText: {
    color: '#E6DCEC',
    fontSize: 15,
    marginBottom: 20,

  }
  

});