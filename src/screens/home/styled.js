import styled from 'styled-components/native'

export const MenuArea = styled.TouchableHighlight`
  width: 55px;
  height: 55px;
  position: absolute;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  
`

export const MenuImage = styled.Image`
  width: 25px;
  height: 25px;
`

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const IntineraryArea = styled.View`
  position:absolute;
  left: 10px;
  right: 10px;
  top: 60px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #999;
  border-color:#eee;
  border-width: 1px;
`;

export const IntineraryItem = styled.TouchableHighlight.attrs({
    underlayColor: '#eee'
})`
  padding: 15px 20px;
  border-bottom-color: #000;
  border-bottom-width: 1px;
`;

export const Intinerarylabel = styled.View`
  flex-direction:row;
  align-items: center;
  margin-bottom: 10px;
`;

export const IntineraryPoint = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color:${props => props.color};
`;

export const IntineraryTitle = styled.Text`
  margin-left: 10px;
  color: #999;
`;

export const IntineraryValue = styled.Text`
  color: #000;
  font-size: 16px;
`;

export const IntineraryPlaceholder = styled.Text`
  color: #555;
  text-align: center;
`

export const RequestDetails = styled.View`
  flex-direction: row;
`;

export const RequestDetail = styled.View`
  flex: 1;
  align-items: center;
`;

export const RequestTitle = styled.Text`
  color: #999;
  font-weight: bold;
  font-size: 15px;
`;

export const RequestValue = styled.Text`
  color: #000;
  font-size: 17px;
`;

export const RequestButtons = styled.View`
  flex-direction: row;
`;

export const RequestButton = styled.TouchableHighlight`
  flex: 1;
  margin: 10px 5px;
  height: 39px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: ${props => props.color};
`;

export const RequestButtonText = styled.Text`
  color: aliceblue;
  font-weight: bold;
`;

export const LoadingArea = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top:0;
  background-color: rgba(0,0,0, 0.5);
  justify-content: center;
  align-items: center;
  
`

