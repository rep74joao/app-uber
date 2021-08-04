import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Modal} from 'react-native'
import Geocoder from 'react-native-geocoding';
import {MapsApi} from "../config";

export default function AddressModal(props){
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        Geocoder.init(MapsApi, {language:'pt-br'});
    },[]);

    useEffect(() => {
        if (searchText.length > 5){

            setTimeout(async() => {
                const geo = await Geocoder.from(searchText);
                let tmpResults = [];

                if(geo.results.length > 0) {
                    for (let i in geo.results){
                        tmpResults.push({
                            address: geo.results[i].formatted_address,
                            latitude: geo.results[i].geometry.location.lat,
                            longitude: geo.results[i].geometry.location.lng
                        })
                    }
                    setResults(tmpResults);
                }else{
                    setResults([]);
                }
            },10)

        }

    },[searchText]);

    function handleClose(){
        setSearchText('');
        setResults([]);
    }

    function handleResultClick(i){
        props.clickAction(props.field, i);
        props.visibleAction(false);
    }

    return(
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={props.visible}
            onShow={handleClose}
        >
            <ModalArea>
                <ModalHeader>
                    <ModalClose onPress={() => props.visibleAction(false)}>
                        <ModalCloseText>X</ModalCloseText>
                    </ModalClose>
                    <ModalInput
                        value={searchText}
                        onChangeText={e => setSearchText(e)}
                        autoFocus={true}
                        placeholderTextColor={'#999'}
                        placeholder={props.title}/>
                </ModalHeader>
                <ModalResults>
                    {results.map((result, index) => (
                        <ModalResult key={index} onPress={() => handleResultClick(result)}>
                            <ModalResultText>{result.address}</ModalResultText>
                        </ModalResult>
                    ))}
                </ModalResults>
            </ModalArea>
        </Modal>
    )
}

const ModalResults = styled.View``;

const ModalResult = styled.TouchableHighlight`
  padding: 15px;

`

const ModalResultText = styled.Text`
  color: #000;
  font-size: 15px;
`

const ModalArea = styled.View`
  flex: 1;
  background-color: #fff;
`

const ModalHeader = styled.View`
   flex-direction: row;
   padding: 20px;
   align-items: center;
`

const ModalClose = styled.TouchableHighlight`
  width: 39px;
  height: 39px;
  justify-content: center;
  align-items: center;
  background-color: #eee;
  border-radius: 20px;
  
`;

const ModalCloseText = styled.Text``;

const ModalInput = styled.TextInput`
  margin-left: 20px;
  font-size: 20px;
  color: #999;
  
`