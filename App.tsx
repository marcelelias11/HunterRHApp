import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  Homepage,
  Cadastro,
  Contrato,
  FPV,
  FEC,
  Makepdf,
  Contratoqtd,
  ToContrato,
  ToContratoQtd,
  SignDocument,
} from './components/pages.tsx';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Homepage}
            options={{title: 'Bem vindo!'}}
          />
          <Stack.Screen
            name="ToContrato"
            component={ToContrato}
            options={{title: '', headerBackVisible: false}}
          />
          <Stack.Screen
            name="ToContratoQtd"
            component={ToContratoQtd}
            options={{title: '', headerBackVisible: false}}
          />
          <Stack.Screen
            name="Cadastro"
            component={Cadastro}
            options={{title: 'Cadastro'}}
          />
          <Stack.Screen
            name="Contratoqtd"
            component={Contratoqtd}
            options={{title: 'Contrato'}}
          />
          <Stack.Screen
            name="Contrato"
            component={Contrato}
            options={{title: 'Contrato'}}
          />
          <Stack.Screen name="FPV" component={FPV} options={{title: 'FPV'}} />
          <Stack.Screen name="FEC" component={FEC} options={{title: 'FEC'}} />
          <Stack.Screen
            name="Makepdf"
            component={Makepdf}
            options={{title: 'Finalizar', headerBackVisible: false}}
          />
          <Stack.Screen
            name="SignDocument"
            component={SignDocument}
            options={{title: 'Assinar'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '2%',
    backgroundColor: '#FFFFFF',
  },
}); //reset
