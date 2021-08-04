import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import {Modal} from 'react-native'
import {AirbnbRating} from 'react-native-ratings'
import useDevsUber from '../useDevsUber'

export default function DriverModal(props){
    const api = useDevsUber();

    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showStars, setShowStars] = useState(false);

    function handleFinishTrip(){
        setShowStars(true);
    }

    async function handleRating(rating){
        await api.setRating(rating);
        props.visibleAction(false);
    }

    return(
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={props.visible}
        >
            <ModalArea>
                <DriverHeadLine>Seu motorista é: </DriverHeadLine>
                <DriverAvatar source={{uri: props.driver.avatar}}/>
                <DriverName>{props.driver.name}</DriverName>
                <DriverStars>{props.driver.stars} estrelas</DriverStars>

                {!showStars &&
                   <>
                       <DriverCarInfo>
                           <DriverCar>{props.driver.carName}</DriverCar>
                           <DriverColor>{props.driver.carColor}</DriverColor>
                           <DriverPlate>{props.driver.carPlate}</DriverPlate>
                       </DriverCarInfo>
                       <TripButton onPress={handleFinishTrip}>
                           <TripButtonText>Encerrar viagem</TripButtonText>
                       </TripButton>
                   </>
                }

                {showStars &&
                    <>
                        <RatingTitle>
                            Avalie o motorista pela viagem
                        </RatingTitle>
                        <AirbnbRating
                            count={5}
                            reviews={['Terrível', 'Ruim', 'Bom', 'Muito bom', 'Ótimo']}
                            defaultRating={5}
                            onFinishRating={handleRating}
                        />
                    </>
                }
            </ModalArea>
        </Modal>
    )
}
const RatingTitle = styled.Text`
  margin: 20px;
  font-size: 15px;
  color: #000;
`

const DriverHeadLine = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
`

const TripButton = styled.TouchableHighlight`
  height: 50px;
  background-color: #3574cb;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 80%;
`;

const TripButtonText = styled.Text`
  font-size: 17px;
  color: #fff;
`

const ModalArea = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`

const DriverAvatar = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`

const DriverName = styled.Text`
  margin: 20px;
  font-size: 25px;
  font-weight: bold;
  color:#000;
`;

const DriverStars = styled.Text`
  color:#999;
  font-size: 16px;
`;

const DriverCarInfo = styled.View`
  width: 80%;
  margin: 20px;
  border-top-width: 1px;
  border-top-color: #999;
  border-bottom-width: 1px;
  border-bottom-color: #999;
  align-items: center;
  padding: 20px;
`


const DriverCar = styled.Text`
  font-size: 15px;
  color:#000;
  
`;

const DriverColor = styled.Text`
  font-size: 15px;
  color:#999;
`;

const DriverPlate = styled.Text`
  font-size: 20px;
  color: black;
`;


