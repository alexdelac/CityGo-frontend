import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import {useFonts} from 'expo-font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function TopdealsScreen({ navigation }) {

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
      Top Deals
    </Text>
    <ScrollView style={styles.topDealsContainer}>
      <View style={styles.card}>
        <View style={styles.infos}>
        <Image 
          source={require('../assets/topdeals.jpeg')}
          style={styles.image}  />
          <Text style={styles.title}>
            Le RDV du mois : Blind Test de Claudy
          </Text>
          <Text style={styles.etablishment}>
            Café Lovster
          </Text>
          <Text style={styles.description}>
            Tous les derniers mercredis du mois, venez au Lovster challenger vos connaissances musicales ! En compagnie de Claudy, de rolls et de drinks en tous genres. Inscriptions au 03.28.14.18.74 ou directement au bar. GROUPES DE 6 MAX   
          </Text>
      </View>
      </View>
      <View style={styles.card}>
        <View style={styles.infos}>
        <Image 
          source={require('../assets/topdeals2.jpeg')}
          style={styles.image}  />
          <Text style={styles.title}>
            Les Happy Hours du Scot 
          </Text>
          <Text style={styles.etablishment}>
            O'Scotland
          </Text>
          <Text style={styles.description}>
            Du lundi au vendredi, de 16h à 20h, venez profiter de nos happy hours pour découvrir notre sélection de 25 bières pression. 
          </Text>
      </View>
      </View>
      <View style={styles.card}>
        <View style={styles.infos}>
        <Image 
          source={require('../assets/topdeals3.jpeg')}
          style={styles.image}  />
          <Text style={styles.title}>
            Lille Jazz Club
          </Text>
          <Text style={styles.etablishment}>
            La Canopée
          </Text>
          <Text style={styles.description}>
            Le dimanche soir, la Canopée se plonge dans une atmosphère totalement chill & jazzy. Chaque semaine, retrouve un band de jazzmen sur scène pour un concert gratuit !
          </Text>
      </View>
      </View>
    </ScrollView>
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
  topDealsContainer: {
    backgroundColor: '#D7D7E5',
    flex: 2,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#D7D7E5',
    width: '100%',
    padding: 10,

  },
  image: {
    width: 400,
    height: 150,
    padding: 5,
    alignSelf: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    color: '#8440B4',
    marginBottom: 5,
  },
  etablishment: {
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
    color: '#FF7337',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Quicksand-Regular',
    color: '#321C3C',
  },
  infos: {
    alignItems: 'flex-start',
  },
  

})