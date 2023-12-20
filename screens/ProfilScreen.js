import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import { useFonts } from 'expo-font';
import { logout, updatePseudo } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import ConfirmationModal from '../components/ConfirmationModal';

const BACKEND_ADDRESS = 'http://192.168.1.60:3000';

export default function ProfilScreen({ navigation }) {

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value)
  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isFocused, setIsFocused] = useState(false)
  const [error, setError] = useState(null);
  const [newEmail, setNewEmail] = useState('');
  const [newPseudo, setNewPseudo] = useState('');
  const [newInfoModalVisible, setNewInfoModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [confirmationModalInfo, setConfirmationModalInfo] = useState({});

  const [fontsLoaded] = useFonts({
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Quicksand-SemiBold': require('../assets/fonts/Quicksand-SemiBold.ttf'),
    'Quicksand-Light': require('../assets/fonts/Quicksand-Light.ttf'),
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Regular': require('../assets/fonts/Quicksand-Regular.ttf'),
  });

 
const handleCloseConfirmationModal = () => {
  
  setConfirmationModalVisible(false)
}
  const handleUpdatePassword = () => {
    fetch(`${BACKEND_ADDRESS}/users/updatePassword`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, oldPassword, newPassword, confirmPassword }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setModalVisible(false)
          setConfirmationModalInfo({title: 'Changement de mot de passe', message:'Mot de passe changé avec succès !'})
          setConfirmationModalVisible(true)
        } else {
          setError(data.error)
        }
      })
  };

  const handleUpdateInfo = () => {
    fetch(`${BACKEND_ADDRESS}/users/updateInfo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, pseudonyme: newPseudo, email: newEmail }),
    })
      .then(response => response.json())
      .then(data => {
        
        if (data.result) {
          dispatch(updatePseudo(newPseudo))
          setNewInfoModalVisible(false)
          setConfirmationModalInfo({title: 'Modifier mes informations', message:'Pseudo et Email changés avec succès !'})
          setConfirmationModalVisible(true)
        } else {
          setError(data.error)
        }
      })
  };

  const handleDelete = () => {
    fetch(`${BACKEND_ADDRESS}/users/deleteAccount`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ token: user.token }),
    })
      .then(response => response.json())
      .then(data => {
        
        if (data.result) {
          dispatch(logout())
          navigation.navigate('Signup')
        } else {
          setError(data.error)
        }
      })
  };

 const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Signin');
  };

  if (!fontsLoaded) {
    return null
  }

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <View style={styles.infosContainer}>
        <View style={styles.infosText}>
          <Text style={styles.titleText}>Pseudonyme : </Text>
          <Text style={styles.userText}>{user.pseudonyme}</Text>
        </View>
        <View style={styles.infosBottomText}>
          <Text style={styles.titleText}>E-mail : </Text>
          <Text style={styles.userText}>{newEmail}</Text>
        </View>
        <TouchableOpacity onPress={() => setNewInfoModalVisible(!modalVisible)} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Modifier mes informations</Text>
        </TouchableOpacity>
        <Modal
          animationType='slide'
          transparent={true}
          visible={newInfoModalVisible}
          onRequestClose={() => {
            setNewInfoModalVisible(!newInfoModalVisible);
          }}>
          <KeyboardAvoidingView
            style={styles.modal}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

            <View style={styles.modalView}>
              <Text style={styles.h2Modal}>
                Modifier mes informations
              </Text>
              {isFocused === 'Nouveau pseudonyme' && <Text style={styles.inputLabelOldPassword}>Nouveau pseudonyme</Text>}
              <TextInput
                onFocus={() => setIsFocused('Nouveau pseudonyme')}
                onBlur={() => setIsFocused(false)}
                autoCapitalize='none'
                value={newPseudo}
                onChangeText={(value) => setNewPseudo(value)}
                style={[styles.input, isFocused === 'Nouveau pseudonyme' && styles.inputIsFocused]}
                placeholderTextColor={'#D7D7E5'}
                placeholder={isFocused === 'Nouveau pseudonyme' ? '' : 'Nouveau pseudonyme'}
              />

              {isFocused === 'Nouvel E-mail' && <Text style={styles.inputLabelNewPassword}>Nouvel E-mail</Text>}
              <TextInput
                onFocus={() => setIsFocused('Nouvel E-mail')}
                onBlur={() => setIsFocused(false)}
                autoCapitalize='none'
                value={newEmail}
                onChangeText={(value) => setNewEmail(value)}
                style={[styles.input, isFocused === 'Nouvel E-mail' && styles.inputIsFocused]}
                placeholderTextColor={'#D7D7E5'}
                placeholder={isFocused === 'Nouvel E-mail' ? '' : 'Nouvel E-mail'} />

              {error && <Text style={styles.error}>{error}</Text>}

              <TouchableOpacity
                style={styles.button1}
                activeOpacity={0.8}
                onPress={() => handleUpdateInfo()}>
                <Text style={styles.textButton1}>
                  Valider
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button2}
                activeOpacity={0.8}
                onPress={() => setNewInfoModalVisible(false)} >
                <Text style={styles.textButton2}>
                  Retour
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
        

        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.button} activeOpacity={0.8}>
          <Text style={styles.textButton}>Changer de mot de passe</Text>
        </TouchableOpacity>
      </View>

      {/* Modal to allow user to change his/her password */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <KeyboardAvoidingView
          style={styles.modal}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <View style={styles.modalView}>
            <Text style={styles.h2Modal}>
              Changement mot de passe
            </Text>
            {isFocused === 'Ancien mot de passe' && <Text style={styles.inputLabelOldPassword}>Ancien mot de passe</Text>}
            <TextInput
              onFocus={() => setIsFocused('Ancien mot de passe')}
              onBlur={() => setIsFocused(false)}
              autoCapitalize='none'
              secureTextEntry={true}
              value={oldPassword}
              onChangeText={(value) => setOldPassword(value)}
              style={[styles.input, isFocused === 'Ancien mot de passe' && styles.inputIsFocused]}
              placeholderTextColor={'#D7D7E5'}
              placeholder={isFocused === 'Ancien mot de passe' ? '' : 'Ancien mot de passe'} />

            {isFocused === 'Nouveau mot de passe' && <Text style={styles.inputLabelNewPassword}>Nouveau mot de passe</Text>}
            <TextInput
              onFocus={() => setIsFocused('Nouveau mot de passe')}
              onBlur={() => setIsFocused(false)}
              autoCapitalize='none'
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(value) => setNewPassword(value)}
              style={[styles.input, isFocused === 'Nouveau mot de passe' && styles.inputIsFocused]}
              placeholderTextColor={'#D7D7E5'}
              placeholder={isFocused === 'Nouveau mot de passe' ? '' : 'Nouveau mot de passe'} />

            {isFocused === 'Confirmation mot de passe' && <Text style={styles.inputLabelUpdatePassword}>Confirmation mot de passe</Text>}
            <TextInput
              onFocus={() => setIsFocused('Confirmation mot de passe')}
              onBlur={() => setIsFocused(false)}
              autoCapitalize='none'
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
              style={[styles.input, isFocused === 'Confirmation mot de passe' && styles.inputIsFocused]}
              placeholderTextColor={'#D7D7E5'}
              placeholder={isFocused === 'Confirmation mot de passe' ? '' : 'Confirmation mot de passe'} />

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity
              style={styles.button1}
              activeOpacity={0.8}
              onPress={() => handleUpdatePassword()}>
              <Text style={styles.textButton1}>
                Valider
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              activeOpacity={0.8}
              onPress={() => setModalVisible(false)} >
              <Text style={styles.textButton2}>
                Retour
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.deconnectbutton} activeOpacity={0.8} onPress={() => handleLogout()}>
          <Text style={styles.textdeconnectButton}>Se déconnecter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete()}>
          <Text style={styles.deleteLink}>Supprimer le compte</Text>
        </TouchableOpacity>
      </View>
      <Modal
      animationType='slide'
      transparent={true}
      visible={confirmationModalVisible}
      onRequestClose={() => {
        setConfirmationModalVisible(!confirmationModalVisible);
      }}><ConfirmationModal handleCloseConfirmationModal={handleCloseConfirmationModal} title={confirmationModalInfo.title} message={confirmationModalInfo.message}/></Modal>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 36,
    color: '#FF7337',
    fontFamily: 'Quicksand-Bold',
    marginTop: 90,
    marginBottom: 50,
  },
  info: {
    textAlign: 'center',
  },
  pseudo: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  email: {
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  button: {
    height: 50,
    width: 285,
    backgroundColor: '#8440B4',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  textButton: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',

  },
  deconnectbutton: {
    width: 285,
    height: 50,
    borderWidth: 1,
    borderColor: '#8440B4',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 30,
  },
  textdeconnectButton: {
    color: '#8440B4',
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold'
  },
  deleteLink: {
    color: '#FF7337',
    fontSize: 16,
    fontFamily: 'Quicksand-SemiBold',
    marginTop: 15,
  },
  infosContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infosText: {
    flexDirection: 'row',
  },
  infosBottomText: {
    flexDirection: 'row',
    marginBottom: 50,
  },
  titleText: {
    fontSize: 20,
    fontFamily: 'Quicksand-Bold',
  },
  userText: {
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
  },
  h2Modal: {
    color: '#FF7337',
    fontSize: 36,
    fontFamily: 'Quicksand-Bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  modalViewText: {
    marginBottom: 20,
    fontFamily: 'Quicksand-Medium',
    fontStyle: 'italic',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent
  },
  modalView: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5, // Effet d'élévation pour Android
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
  },
  input: {
    width: 285,
    height: 55,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D7D7E5',
    marginTop: 9,
    paddingLeft: 9,
  },
  inputIsFocused: {
    borderColor: '#FF7337',
  },
  inputLabelOldPassword: {
    position: 'relative',
    color: '#FF7337',
    textAlign: 'left',
    width: 140,
    marginBottom: -20,
    marginRight: 100,
    backgroundColor: 'white',
    zIndex: 1,
    fontFamily: 'Quicksand-SemiBold',
  },
  inputLabelNewPassword: {
    position: 'relative',
    color: '#FF7337',
    textAlign: 'left',
    width: 160,
    marginBottom: -20,
    marginRight: 80,
    backgroundColor: 'white',
    zIndex: 1,
    fontFamily: 'Quicksand-SemiBold',
  },
  inputLabelUpdatePassword: {
    position: 'relative',
    color: '#FF7337',
    textAlign: 'left',
    width: 190,
    marginBottom: -20,
    marginRight: 50,
    backgroundColor: 'white',
    zIndex: 1,
    fontFamily: 'Quicksand-SemiBold',
  },
  button1: {
    backgroundColor: '#8440B4',
    borderRadius: 50,
    marginBottom: 0,
    height: 50,
    width: 285,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  textButton1: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
  },
  button2: {
    backgroundColor: '#FFF',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#8440B4',
    marginBottom: 5,
    height: 50,
    width: 285,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 9,
  },
  textButton2: {
    color: '#8440B4',
    fontSize: 24,
    fontFamily: 'Quicksand-SemiBold',
  },
  error: {
    fontFamily: 'Quicksand-Medium',
    fontStyle: 'italic',
  },
});