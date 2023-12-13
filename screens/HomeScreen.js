import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity, View, Dimensions,
} from 'react-native';
import { useFonts } from 'expo-font';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';



export default function HomeScreen({ navigation }) {

  const [currentPosition, setCurrentPosition] = useState(null);

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
      <MapView style={styles.map}
      initialRegion={{
        latitude: 50.637699,
        longitude: 3.064728,
        latitudeDelta: 0.0062,
        longitudeDelta: 0.0061,
      }}
      >
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
        
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

});