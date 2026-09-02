import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TarjetasProductos from './src/componentes/TarjetasProductos';

export default function App() {
  return (
    <View style={styles.container}>
      <TarjetasProductos></TarjetasProductos>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3eeec",  //Color principal de la página (creo :v)
    alignItems: 'center',
    justifyContent: 'center',
  },
});
