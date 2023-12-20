import {
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
  import {useFonts} from 'expo-font';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {changeLike} from'../reducers/user'


  export default function FavorisScreen({ navigation }) {
    const [dataFavoris, setDataFavoris]=useState(null)

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)
    const like = useSelector((state)=>state.user.like)

    const [fontsLoaded] = useFonts({
      'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
      'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf')
    });

    useEffect(()=>{
      fetch('http://192.168.1.60:3000/etablissements/favoris', {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: user.token}),
            })
            .then(response=>response.json())
            .then(data=>{
              setDataFavoris(data.data.liked)
            })
    }, [like])

    const handleLike = (id)=>{
      fetch('http://192.168.1.60:3000/users/like', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: user.token, etablissementId: id }),
              })
              .then(response=>response.json())
              .then(data=>{
                console.log(data)
                dispatch(changeLike())
              })
    }
let favoris
if(dataFavoris){
  favoris = dataFavoris.map((data, i)=>{
    console.log(data._id)
    return (<View key={i} style={styles.card}>
      <Image
        source={{uri: data.photos[0]}}
        style={styles.image} 
      />
      <View>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.type}>{data.type}</Text>
        <Text style={styles.adress}>{data.adresse}</Text>
        <Text style={styles.adress}>{data.telephone}</Text>
        <Text style={styles.distance}>à XXX mètres</Text>
      </View>
      <View style={styles.favorite}>
        <FontAwesome name='star' color={'#8440B4'} size={30}
        onPress={()=>handleLike(data._id)}
        />
        <FontAwesome name='circle' color={'#D7D7E5'} size={30}
        />
      </View>
    </View>)
  })
}


  

    if(!fontsLoaded){
      return null
    }

    return (
    
    <View style={styles.container}>
      <Text style={styles.h2}>
        Mes Favoris
      </Text>
      {favoris}
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