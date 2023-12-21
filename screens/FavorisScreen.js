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
    console.log(dataFavoris)
    useEffect(()=>{
      fetch('http://10.1.1.249:3000/etablissements/favoris', {
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
    fetch('http://10.1.1.249:3000/users/like', {
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
      return (
      <View key={i} style={styles.card}>
        <Image
          source={{uri: data.photos[0]}}
          style={styles.image} 
        />
        <View style={styles.infos}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.type}>{data.type}</Text>
          <Text style={styles.adress}>{data.adresse}</Text>
          <Text style={styles.adress}>{data.telephone}</Text>
        </View>
        <View style={styles.favorite}>
          <FontAwesome 
            name='star' 
            color={'#8440B4'} 
            size={25}
            onPress={()=>handleLike(data._id)}
          />
          <FontAwesome 
            name='circle' 
            color={data.inProgress ?'#87E35B' : '#D7D7E5'} 
            size={25}
          />
        </View>
      </View>
    )
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
  <View style={styles.favoritesContainer}>
    {favoris}
  </View>
</View>



);



}

 

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
      justifyContent: 'flex-start',
      backgroundColor: '#FFF',
      borderTopWidth: 1,
      borderColor: '#D7D7E5',
      width: '100%',
      padding: 10,

    },
    image: {
      width: 105,
      height: 90,
      padding: 5,
      marginRight: 10,
    },
    infos: {
      alignItems: 'flex-start',

    },
    name: {
      fontSize: 16,
      fontFamily: 'Quicksand-Bold',
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
    favorite: {
      justifyContent: "space-between",
      marginLeft: 'auto',
    },
    favoritesContainer: {
      backgroundColor: '#D7D7E5',
      flex: 1,
    }

  })