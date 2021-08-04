import React, {useRef, useState, useEffect} from 'react'
import {Container} from "./styled";
import {StatusBar, ActivityIndicator} from 'react-native'
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding'
import {MapsApi} from '../../config'
import MapViewDirections from "react-native-maps-directions";
import * as Permissions from 'expo-permissions';
import devsUberApi from '../../useDevsUber'
import AddressModal from '../../components/AddressModal'
import DriverModal from '../../components/DriverModal'
import {useNavigation} from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native';
import {
    IntineraryArea,
    IntineraryItem,
    Intinerarylabel,
    IntineraryPoint,
    IntineraryTitle,
    IntineraryValue,
    IntineraryPlaceholder,
    RequestDetails,
    RequestDetail,
    RequestTitle,
    RequestValue,
    RequestButton,
    RequestButtons,
    RequestButtonText,
    LoadingArea,
    MenuArea,
    MenuImage

} from './styled'

function Home(){
    const navigation = useNavigation();
    const api = devsUberApi();
    const [fromLoc, setFromLoc] = useState({});
    const [toLoc, setLoc] = useState({});
    const [showDirections, setShowDirections] = useState(false);
    const [requestDistance, setRequestDistance] = useState(0);
    const [requestTime, setRequestTime] = useState(0);
    const [requestPrice, setRequestPrice] = useState(0);
    const [modalField, setModalField] = useState('');
    const [loading, setLoandig] = useState(false);

    const [driverInfo, setDriverInfo] = useState({});
    const [driverModalVisible, setDriverModalVisible] = useState(false);

    const [modalTitle, setModalTitle] = useState('');
    const [modalVisible, setModalVisible] = useState('');

    const map = useRef();
    const [mapLoc, setMapLoc] = useState({
        center:{
            latitude:37.78825,
            longitude:-122.4324
        },
        zoom:16,
        pitch:0,
        altitude:0,
        heading:0,
    });


    useEffect(() => {
        Geocoder.init(MapsApi, {language:'pt-br'});
        getMyCurrentPosition();
    },[]);

    useEffect(() => {
        if (fromLoc.center && toLoc.center){
            setShowDirections(true);
        }
    },[toLoc]);

   async function getMyCurrentPosition(){
        const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

            const geo = await Geocoder.from(location.coords.latitude, location.coords.longitude);

            if(geo.results.length > 0){
                const loc = {
                    name: geo.results[0].formatted_address,
                    center:{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude
                    },
                    zoom: 16,
                    pitch: 0,
                    altitude: 0,
                    heading: 0
                };
                setFromLoc(loc);
                setMapLoc(loc);

            }

        } else {
            throw new Error('Location permission not granted');
        }
    }

   function handleToClick() {
       setModalField('to');
       setModalTitle('Escolha um destino');
       setModalVisible(true)

        /*const geo = await Geocoder.from('Ame Votuporanga,sp');

        if(geo.results.length > 0) {
            let loc = {
                name: geo.results[0].formatted_address,
                center: {
                    latitude: geo.results[0].geometry.location.lat,
                    longitude: geo.results[0].geometry.location.lng
                },
                zoom: 16,
                pitch: 0,
                altitude: 0,
                heading: 0
            };
            setLoc(loc);
        }*/

    }

    function handleFromClick(){
        setModalField('from');
        setModalTitle('Escolha uma origem');
        setModalVisible(true)
    }

    async function handleDirectionsReady(r){
       setRequestDistance(r.distance);
       setRequestTime(r.duration);

       const {price} =  await api.getRequestPrice(r.distance);
       if (price > 0){
           setRequestPrice(price);
       }

       map.current.fitToCoordinates(r.coordinates, {
           edgePadding: {
               left: 50,
               right: 50,
               bottom: 20,
               top:1100
           }
       })
    }

    function handleRequestCancel(){
        setLoc({});
        setShowDirections(false);
        setRequestDistance(0);
        setRequestTime(0);
        setRequestPrice(0);
        setMapLoc(fromLoc);
    }

    async function handleRequestGo(){
        setLoandig(true);

        const driver = await api.findDriver({
            fromlat: fromLoc.center.latitude,
            fromlng: fromLoc.center.longitude,
            tolat: toLoc.center.latitude,
            tolng: toLoc.center.longitude
        });

        setLoandig(false);

        if (!driver.error){
            setDriverInfo(driver.driver);
            setDriverModalVisible(true);
            handleRequestCancel();
        }else{
            alert(driver.error);
        }
    }

    function handleMenu(){
        navigation.dispatch(DrawerActions.openDrawer());
    }

    async function handleMapChange(){
       const cam = await map.current.getCamera();
       cam.altitude = 0;
       setMapLoc(cam);
    }

    function handleModalClick(field, address){
        let loc = {
            name: address.address,
            center: {
                latitude: address.latitude,
                longitude: address.longitude
            },
            zoom: 16,
            pitch: 0,
            altitude: 0,
            heading: 0
        };

        switch (field) {
            case 'from':
                return (
                    setFromLoc(loc),
                    setMapLoc(loc)
                );
                break;
            case 'to':
                return setLoc(loc);
                break;
        }
    }

    return (
        <>
            <StatusBar barStyle={'dark-content'}/>
            <Container>
                <DriverModal
                    driver={driverInfo}
                    visible={driverModalVisible}
                    visibleAction={setDriverModalVisible}
                />
                <AddressModal
                    title={modalTitle}
                    visible={modalVisible}
                    visibleAction={setModalVisible}
                    field={modalField}
                    clickAction={handleModalClick}
                />
                <MapView
                    ref={map}
                    style={{flex:1}}
                    provider={'google'}
                    camera={mapLoc}
                    onRegionChangeComplete={handleMapChange}
                >
                    {fromLoc.center &&
                        <MapView.Marker
                            pinColor={'black'}
                            coordinate={fromLoc.center}/>
                    }
                    {toLoc.center &&
                        <MapView.Marker
                            pinColor={'black'}
                            coordinate={toLoc.center}/>
                    }

                    {showDirections &&
                        <MapViewDirections
                            origin={fromLoc.center}
                            destination={toLoc.center}
                            strokeWidth={5}
                            strokeColor='black'
                            apikey={MapsApi}
                            waypoints={[fromLoc.center, toLoc.center]}
                            onReady={handleDirectionsReady}
                        />
                    }
                </MapView>
                <MenuArea undelayColor={'transparent'} onPress={handleMenu}>
                    <MenuImage source={require('../../assets/menu.png')}/>
                </MenuArea>
                <IntineraryArea>
                    <IntineraryItem onPress={handleFromClick}>
                        <>
                            <Intinerarylabel>
                                <IntineraryPoint color={'#0000ff'}/>
                                <IntineraryTitle>Origem</IntineraryTitle>
                            </Intinerarylabel>
                            {fromLoc.name &&
                                <IntineraryValue>{fromLoc.name}</IntineraryValue>
                            }
                            {!fromLoc.name &&
                                <IntineraryPlaceholder>Escolha um local de origem</IntineraryPlaceholder>
                            }
                        </>
                    </IntineraryItem>
                        <IntineraryItem onPress={handleToClick}>
                            <>
                                <Intinerarylabel>
                                    <IntineraryPoint color={'#00ff00'}/>
                                    <IntineraryTitle>Destino</IntineraryTitle>
                                </Intinerarylabel>
                                {toLoc.name &&
                                    <IntineraryValue>{toLoc.name}</IntineraryValue>
                                }
                                {!toLoc.name &&
                                    <IntineraryPlaceholder>Escolha um local de destino</IntineraryPlaceholder>
                                }

                            </>
                        </IntineraryItem>
                    {fromLoc.center && toLoc.center &&
                        <IntineraryItem>
                            <>
                                <RequestDetails>
                                    <RequestDetail>
                                        <RequestTitle>Distância</RequestTitle>
                                        <RequestValue>{requestDistance > 0 ? `${requestDistance.toFixed(1)}km` : '---' }</RequestValue>
                                    </RequestDetail>
                                    <RequestDetail>
                                        <RequestTitle>Tempo</RequestTitle>
                                        <RequestValue>{requestTime > 0 ? `${requestTime.toFixed(0)}mins` : '---' }</RequestValue>
                                    </RequestDetail>
                                    <RequestDetail>
                                        <RequestTitle>Preço</RequestTitle>
                                        <RequestValue>{requestPrice > 0 ? `R$ ${requestPrice.toFixed(2)}` : '---' }</RequestValue>
                                    </RequestDetail>
                                </RequestDetails>
                                <RequestButtons>
                                    <RequestButton color={'#419c43'} onPress={handleRequestGo}>
                                        <RequestButtonText>Solicitar motorista</RequestButtonText>
                                    </RequestButton>
                                    <RequestButton color={'red'} onPress={handleRequestCancel}>
                                        <RequestButtonText>Cancelar</RequestButtonText>
                                    </RequestButton>
                                </RequestButtons>
                            </>
                        </IntineraryItem>
                    }
                </IntineraryArea>
                {loading &&
                    <LoadingArea>
                        <ActivityIndicator size={'large'} color={'black'}/>
                    </LoadingArea>
                }
            </Container>
        </>
    )
}

export default Home;