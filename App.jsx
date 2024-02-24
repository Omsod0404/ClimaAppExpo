import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  KeyboardAvoidingView
} from 'react-native';
import {useFonts} from 'expo-font';

const colorsPalette = {
  headerColor: '#5A516E',
  sectionColor: '#FFFFFF',
  secTextColor: '#2B2B2B',
  backColor: '#797189',
  fontColor: '#FFFFFF',
  bottonColor:'#3C3649',
  barColor: '#7A748A'
};

export default App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async () => {
    const API_KEY = '7e2b9b013f5541c3857191636242102';
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1&aqi=yes&alerts=no`,
      );
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      console.error(err.message);
      setError(err);
    }
  };

  useEffect(() => {
    if (city) {
      fetchWeatherData;
    }
  }, [city]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} backgroundColor={colorsPalette.bottonColor}/>
      <Text style={styles.title}>MyWeatherApp</Text>
      <View style={styles.header}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your location"
          placeholderTextColor={colorsPalette.fontColor}
          value={city}
          onChangeText={text => {
            setCity(text);
          }}
        />
        <TouchableOpacity style={styles.button} onPress={fetchWeatherData}>
          <Text style={styles.weatherText}>Get my weather</Text>
        </TouchableOpacity>
      </View>
      {error && (
        <Text>{error}</Text>
      )}
      {weatherData && (
        <>
        <View style={styles.current}>
          <Text style={styles.subTitle}>Current temperature in:</Text>
          <Text style={styles.location}>{weatherData.location.name}, {weatherData.location.country}</Text>
          <View style={styles.temp}>
            <Image source={{uri: `https:${weatherData.current.condition.icon}`}} style={styles.tempIcon}/>
            <Text style={styles.tempText}>{weatherData.current.temp_c}°C</Text>
          </View>
          <Text style={styles.condition}>{weatherData.current.condition.text}</Text>
        </View>
        <View style={styles.todayDetails}>
          <Text style={styles.subTitle}>Today's details:</Text>
          <View style={styles.detail}>
            <Text style={styles.detailText}>Max/Min °C</Text>
            <Text style={styles.detailText}>{weatherData.forecast.forecastday[0].day.maxtemp_c} / {weatherData.forecast.forecastday[0].day.mintemp_c}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailText}>Chance of rain</Text>
            <Text style={styles.detailText}>{weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailText}>Humidity</Text>
            <Text style={styles.detailText}>{weatherData.forecast.forecastday[0].day.avghumidity}%</Text>
          </View>
        </View>
        <View style={styles.dayTime}>
          <View style={styles.time}>
            <Text style={styles.subTitle}>Sunrise</Text>
            <Image source={require('./assets/img/sunrise.png')} style={styles.sunImage}/>
            <Text style={styles.detailText}>{weatherData.forecast.forecastday[0].astro.sunrise}</Text>
          </View>
          <View style={styles.time}>
            <Text style={styles.subTitle}>Sunset</Text>
            <Image source={require('./assets/img/sunset.png')} style={styles.sunImage}/>
            <Text style={styles.detailText}>{weatherData.forecast.forecastday[0].astro.sunset}</Text>
          </View>
        </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorsPalette.backColor
  },
  title: {
    width: '100%',
    backgroundColor: colorsPalette.headerColor,
    fontFamily: 'Roboto-Bold',
    color: colorsPalette.fontColor,
    fontSize: 30,
    textAlign: 'center',
    padding: 10
  },
  header:{
    backgroundColor: colorsPalette.headerColor,
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10
  },
  textInput: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: colorsPalette.fontColor,
    backgroundColor: colorsPalette.backColor,
    color: colorsPalette.fontColor,
    fontSize: 20,
    width: '60%',
    height: 35,
    paddingLeft: 20,
    fontFamily: 'Roboto-Medium',
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    alignContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: colorsPalette.bottonColor,
    width: '35%',
    height: 35,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colorsPalette.fontColor,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  weatherText: {
    color: colorsPalette.fontColor,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  current:{
    margin: 20,
    backgroundColor: colorsPalette.sectionColor,
    width: '90%',
    height: '25%',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  subTitle:{
    fontSize: 26,
    fontFamily: 'Roboto-Medium',
    color: colorsPalette.secTextColor,
    marginBottom: 10
  },
  location:{
    fontSize: 22,
    fontFamily: 'Roboto-Regular',
    color: colorsPalette.secTextColor,
    textAlign: 'center'
  },
  temp:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  tempIcon:{
    height: 100,
    width: 100
  },
  tempText:{
    fontSize: 40,
    fontFamily: 'Roboto-Medium',
    color: colorsPalette.secTextColor,
  },
  condition:{
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    color: colorsPalette.secTextColor,
    marginBottom: 10,
    textAlign: 'center'
  },
  todayDetails:{
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colorsPalette.sectionColor,
    width: '90%',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  detail:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  detailText:{
    color: colorsPalette.secTextColor,
    fontFamily: 'Roboto-Regular',
    fontSize: 20
  },
  dayTime:{
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colorsPalette.sectionColor,
    width: '90%',
    padding: 10,
    alignSelf: 'center',
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center'
  },
  time:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  sunImage:{
    height: 80,
    width: 80
  },
});