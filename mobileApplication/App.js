import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';

import IpRequest from './Components/LoginPage/ip_request';
import ConnexionPage from './Components/LoginPageDir/ConnexionPage';
import InscriptionPage from './Components/LoginPageDir/InscriptionPage';
import HomePage from './Components/HomePage/HomePage';
import Profil from './Components/ProfilPage/Profil';
import AREA from './Components/AREAPage/AREA';
import Services from './Components/ServicesPage/Services';

const Stack = createStackNavigator();
LogBox.ignoreAllLogs();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="IpRequest" component={IpRequest} options={{
        title: 'IP Request',
        headerStyle: {
          backgroundColor: '#7CE0B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="ConnexionPage" component={ConnexionPage} options={{
        title: 'Connexion Page',
        headerStyle: {
          backgroundColor: '#7CE0B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="InscriptionPage" component={InscriptionPage} options={{
        title: 'Inscription Page',
        headerStyle: {
          backgroundColor: '#7CE0B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="HomePage" component={HomePage} options={{
        title: 'Home Page',
        headerStyle: {
          backgroundColor: '#7CE0B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="Profil" component={Profil} options={{
        title: 'Profil',
        headerStyle: {
          backgroundColor: '#7CE0B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="AREA" component={AREA} options={{
        title: 'AREA',
        headerStyle: {
          backgroundColor: '#7CE0B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
      <Stack.Screen name="Services" component={Services} options={{
        title: 'Services',
        headerStyle: {
          backgroundColor: '#7CE0B7',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
