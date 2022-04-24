import { StyleSheet, Text, Image, View, TouchableOpacity, Button } from 'react-native'
import React, {useState, useEffect}  from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

// This import got me many errors in node-modules dependency - so comment out
// import { backgroundColor, shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { ScrollView } from 'react-native';
import { auth } from '../../firebase';

import { Camera } from 'expo-camera';
import { Audio } from 'expo-av';
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'


// Camera reference
// https://docs.expo.dev/versions/latest/sdk/camera/
// 
// export default function ScanScreen({ navigation }) {
export default function CameraScreen() {

  {/*camera related settings */}
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  // const isFocused = useIsFocused()
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [status, setStatus] = React.useState({});
  const video = React.useRef(null);

  useEffect(() => {
    (async() => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

      {/* Comments out
      if (galleryStatus.status === 'granted') {
          const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy: ['creationTime'], mediaType: ['video']})
          setGalleryItems(userGalleryMedia)
      }
      */}

    })();
  }, []); 

  const takeVideo = async () => {
    if (camera) {
      const data = await camera.recordAsync({
        maxDuration:10
      })
      setRecord(data.uri);
      console.log(data.uri);
    }
  }

  const stopVideo = async () => {
    camera.stopRecording();
  }

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />
  }

  if (hasCameraPermission === false || hasAudioPermission === false) {
    return <Text> No access to Camera and Audio </Text>
  }

  return ( 
    <View style={styles.container}>
    <View>
    { 
      <Camera
          style={styles.camera}
      />
     }
{/* comment out - https://reactjs.org/warnings/invalid-hook-call-warning.html
      <Camera
        ref = { ref => setCamera(ref)}
        style = {styles.fixedRatio}
        type = {type}
        ratio = {'4:3'} 
      />
*/}
    </View>

    <ScrollView contentinsetAdustmentBehavior= 'automatic'>

    {/*search*/}
    <View style={styles.searchWrapper}>
        <Icon name="search" size={16} color="#d3d3d3" />
        <View style={styles.search}>
            <Text style={styles.searchText}>Search</Text>
        </View>
    </View>

    {/*title*/}
    <View style={styles.titlesWrapper}>
          <Text style={styles.titlesTitle}>What do you want to cook today?</Text>
          <View style={styles.titleArrow}>
          <MaterialCommunityIcons name="rightcircleo" color='#ffffff' size={25} /></View>
    </View>

    {/*pref*/}
    <View style={styles.prefWrapper}>
        <Text style={styles.prefText}>Based on your preferences</Text>
            <View style={styles.prefCardWrapper}>
             <Text style={styles.prefCardText}>Olive Garden Salads, Famous House Salad</Text>
             <Text style={styles.prefMiniText}>140k Calories</Text>
             <Text style={styles.prefMiniText}>3g Protein</Text>
             <Text style={styles.prefMiniText}>9g Total Fat</Text>
             <Text style={styles.prefMiniTextEnd}>12g Carbohydrates</Text>
             <View><Image
            style={styles.prefImage}
            source={require('../../assets/Salad.png')}
            /></View>
            </View>
            <View style={styles.prefCardBottom}>
        
        </View>
     </View>
     </ScrollView>
     </View>  
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF3EB',
        flex: 1,
    },
    searchWrapper: {
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 30,
        marginTop: 50,
        backgroundColor: '#ffffff',
    },
    search: {
        flex: 1,
        marginLeft:10,
        borderBottomColor: '#D3D3D3',
        color:'#d3d3d3',

    },
    searchText: {
        fontFamily: 'raleway-regular',
        fontSize: 14,
        color: '#d3d3d3',

    },
    titlesWrapper: {
        marginTop: 40,
        marginHorizontal:25,
        paddingHorizontal: 40,
        borderRadius: 50,
        backgroundColor: '#9ac1af',
        padding:30,
        shadowColor: '#000000',
        shadowOffset: {
        width:0,
        height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    },
    titlesTitle: {
        color: '#ffffff',
        fontFamily: 'raleway-bold', //make bold
        fontSize: 25,
        textAlign: 'center',

    },
    titleArrow: {
        marginTop: 10,
        alignItems: 'center',
    },
    prefWrapper: {
        paddingHorizontal: 20,
        shadowColor: '#000000',
        shadowOffset: {
        width:0,
        height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    },
    prefText: {
    color: '#332e3c',
    fontFamily: 'raleway-bold', //turn to bold
    fontSize: 20,
    marginTop: 30,
    marginBottom:10,
    },
    prefCardWrapper: {
    backgroundColor: '#FFFFFF',
    marginTop: 10,
    borderRadius: 25,
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: 'column',
    shadowColor: '#000000',
    shadowOffset: {
        width:0,
        height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    },
    prefCardText: {
    fontFamily: 'raleway-regular', //change to semi-bold
    fontSize: 18,
    color: '#c0a587',
    marginBottom:5
    },
    prefCardBottom: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 10,
    },
    prefMiniText: {
    fontFamily: 'raleway-regular',
    fontSize: 12,
    color: '#d3d3d3',

    },
    prefMiniTextEnd:{
        marginBottom: 10,
        fontFamily: 'raleway-regular',
    fontSize: 12,
    color: '#d3d3d3'

    },
    prefImage: {
        width: 295,
        height: 300,
        marginBottom: 20,
    },

    titleText: {
      fontFamily: 'Raleway-Bold',
      fontSize:18,
    },

    button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
   },
   buttonText: {
     color: 'white',
     fontWeight: '700',
     fontSize: 16,
  },

  camera : {
      flex : 1, 
      backgroundColor : 'black',
      aspectRatio: 9 / 16,
  }
});
