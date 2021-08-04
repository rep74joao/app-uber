import styled from 'styled-components/native'

export const ActionButton = styled.TouchableHighlight`
  background-color: #3574cb;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 5px;
  margin: 15px 20px;
  box-shadow: 0 2px 2px #999;
  
`

export const ActionButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  
`

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`

export const Header = styled.SafeAreaView`
  height: 130px;
  background-color: #3574cb;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  margin-top: 30px;
  padding-left: 20px;
  color: #fff;
  font-size: 27px;
`;

export const Menu = styled.View`
  background-color: #3574cb;
  flex-direction: row;
  padding-left: 20px;
  margin-bottom: 15px;
`

export const MenuItem = styled.TouchableHighlight.attrs({
    underlayColor: 'transparent'
})`
  padding: 20px;
  border-bottom-width: 5px;
  border-bottom-color: ${props => props.active ? '#fff' : '#3574cb'};
`

export const MenuItemText = styled.Text`
  font-size: 16px;
  color: #fff;
`

export const Input = styled.TextInput.attrs({
    placeholderTextColor:'#999'
})`
  margin: 10px 20px;
  border-bottom-width: 2px;
  border-bottom-color: #ccc;
  height: 50px;
  font-size: 16px;
  color:#333;
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