import {
    Image,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
  } from 'react-native';

  export default function HomeScreen({ navigation }) {

    





    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <Text style={styles.title}>Hello , où allons nous ?</Text>
          <Text style={styles.name}>Name</Text>

          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.textButton}>Bar</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      )
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      width: 343,
      height: 108,
      fontSize: 36,
      fontWeight: '600',
    },
    button: {
      alignItems: 'center',
      paddingTop: 8,
      width: 285,
      height: 80,
      marginTop: 30,
      backgroundColor: '#ec6e5b',
      borderRadius: 50,
      marginBottom: 80,
    },
    textButton: {
      color: '#ffffff',
      fontWeight: '600',
      fontSize: 36,
    },
  });