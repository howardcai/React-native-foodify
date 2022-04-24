import { StyleSheet, Text, Image, View, TouchableOpacity, Button } from 'react-native'
import React, {useState, useEffect, useRef}  from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';

// This import got me many errors in node-modules dependency - so comment out
// import { backgroundColor, shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { ScrollView } from 'react-native';
import { auth } from '../../firebase';

import { Camera } from 'expo-camera';
import { Audio , Video } from 'expo-av';
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useIsFocused } from '@react-navigation/core'


// Camera reference
// https://docs.expo.dev/versions/latest/sdk/camera/
// 
export default function ScanScreen({ navigation }) {

  {/*camera related settings */}
  const [hasAudioPermission, setHasAudioPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  const isFocused = useIsFocused()
  const [camera, setCamera] = useState(null);
  const [record, setRecord] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [status, setStatus] = React.useState({});
  const [photo, setPhoto] = useState(null);
  const video = React.useRef(null);

  useEffect(() => {
    (async() => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const audioStatus = await Audio.requestPermissionsAsync();
      setHasAudioPermission(audioStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      
      {/* -- not available on web.
      if (galleryStatus.status === 'granted') {
          const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy: ['creationTime'], mediaType: ['video']})
          setGalleryItems(userGalleryMedia)
      }
      */}

    })();
  }, []); 

  const takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  const takeVideo = async () => {
    if (camera) {
      const cameraIsAvailable = await Camera.isAvailableAsync()
      console.log("CameraisAvailable: ", cameraIsAvailable)

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
    <ScrollView contentinsetAdustmentBehavior= 'automatic'>

    {/*title*/}
    <View style={styles.titlesWrapper}>
          <Text style={styles.titlesTitle}>Video Scan</Text>
          <View style={styles.titleArrow}>
            <MaterialCommunityIcons name="rightcircleo" color='#ffffff' size={25} />
          </View>
    </View>

    <View style={styles.cameraContainer}>
    { isFocused ?
      <Camera
        ref = { ref => setCamera(ref)}
        style={styles.camera}
        type = {type}
        ratio = {'4:3'} 
      />
      : null 
    }
    </View>

   <View style={styles.buttonContainer}>

        <TouchableOpacity
          onPress={takeVideo}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Take Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takePic}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={stopVideo}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Stop Video</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={takeVideo}
          style={styles.button}
          onPress={()=> {
            setType(
              type === camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
            );
          }}
        >
          <Text style={styles.buttonText}>Flip Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={()=> 
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        >
          <Text style={styles.buttonText}> Video Play/Pause </Text>
        </TouchableOpacity>

   </View>

    <Video 
      ref = {video}
      style = {styles.video}
      source = {{
        uri: record,
      }}
      useNativeControls
      resizeMode='contain'
      isLooping
      onPlaybackStatusUpdate={status => setStatus(()=>status)}
    />

    </ScrollView>
    </View>  
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF3EB',
        flex: 1,
        justifyContent: 'center',

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

    buttonContainer: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      alignSelf: 'center',
    },

    button: {
      backgroundColor: '#9ac1af',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 10,
   },
   buttonText: {
     color: 'white',
     fontWeight: '700',
     fontSize: 16,
     alignItems: 'center',
  },
  
  cameraContainer: {
    flex:1,
    flexDirection: 'row'
  },

  camera : {
      flex : 1, 
      backgroundColor : 'black',
      aspectRatio: 9 / 16,
      width:350, 
      height:500,
      marginTop: 40
  },
  video : {
    alignSelf: 'center',
    width:350,
    height: 220,
    marginTop: 40
  }
});
