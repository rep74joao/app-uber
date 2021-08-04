import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native'
import {DrawerItemList} from "@react-navigation/drawer";
import styled from 'styled-components'
import {connect}from 'react-redux'
import {useNavigation, CommonActions} from '@react-navigation/native'

function CustomDrawer(props){
    const navigation = useNavigation();

    function handleLogout(){
        props.setToken('');
        navigation.dispatch(CommonActions.reset({
            index:0,
            routes:[{name:'Login'}]
        }))
    }

    return(
        <ScrollView>
            <SafeAreaView style={{flex:1}}>
                <Header>
                   <UserAvatar/>
                   <UserInfo>
                        <UserName>{props.name}</UserName>
                        <LogoutButton onPress={handleLogout} underlayColor={'transparent'}>
                            <LogoutButtonText>Sair</LogoutButtonText>
                        </LogoutButton>
                    </UserInfo>
                </Header>
                <DrawerItemList {...props}/>
            </SafeAreaView>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        name: state.userReducer.name
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        setToken: (token) => dispatch({type:'SET_TOKEN',payload:{token}})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);

const Header = styled.View`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color:#eee;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const UserAvatar = styled.Image`
  width: 39px;
  height: 39px;
  border-radius: 20px;
  background-color: #ddd;
`;

const UserInfo = styled.View`
  margin-left: 20px;
`;

const UserName = styled.Text`
  color: #000;
  font-size: 15px;
  font-weight: bold;
`

const LogoutButton = styled.TouchableHighlight`
  height: 25px;
  justify-content: center;
  
`;

const LogoutButtonText = styled.Text`
  color: black;
  font-size: 15px;
`;