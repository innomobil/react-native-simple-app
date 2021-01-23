import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, View, Image} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import images from '../res/images';
import colors from '../res/colors';
// import App from './App';

let windowHeight = Dimensions.get('window').height;

// let fakeApiCallWithoutBadNetwork = ms => new Promise(resolve => setTimeout(resolve, ms));

class SplashScreen extends Component {
  state = {
    bootSplashIsVisible: true,
  };

  opacity = new Animated.Value(1);
  translateY = new Animated.Value(0);

  setLogoIsLoaded = () => {

    // You can uncomment this line to add a delay on app startup
    // let data = await fakeApiCallWithoutBadNetwork(3000);
    let useNativeDriver = true;

    Animated.stagger(1000, [
      Animated.spring(this.translateY, {useNativeDriver, toValue: -50}),
      Animated.spring(this.translateY, {
        useNativeDriver,
        toValue: windowHeight,
      }),
    ]).start();

    Animated.timing(this.opacity, {
      useNativeDriver,
      toValue: 0,
      duration: 3000,
      //delay: 350,
    }).start(() => {
      this.setState({
        bootSplashIsVisible: false,
      });
    });
  };

  render() {
    const {bootSplashIsVisible} = this.state;

    return (
    // <View style={styles.container}>
    //     <Image source={images.logo} resizeMode="contain" style={{ width: '100%', height: 200 }} />
    // </View>
      <View style={styles.container}>
        
        {bootSplashIsVisible && (
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              styles.bootsplash,
              {opacity: this.opacity},
            ]}>
            <Animated.Image
              source={images.logo}
              resizeMode="contain"
              fadeDuration={0}
              onLoadEnd={this.setLogoIsLoaded}
              style={[
                styles.logo,
                {transform: [{translateY: this.translateY}]},
              ]}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    // justifyContent: "center",
    // padding: 30
  },
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: {
    height: 50,
    width: '100%',
  },
});

export default SplashScreen;