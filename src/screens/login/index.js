import React, {useState} from 'react'
import {StatusBar, Platform, ActivityIndicator} from 'react-native'
import useDevsUber from '../../useDevsUber'
import {connect} from 'react-redux'
import {useNavigation, CommonActions} from '@react-navigation/native'
import {
    Container,
    Header,
    HeaderTitle,
    Menu,
    MenuItem,
    MenuItemText,
    Input,
    ActionButton,
    ActionButtonText,
    LoadingArea
} from './styled'


function Login(props){
    const [activeMenu, setActiveMenu] = useState('signin');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const api = useDevsUber();

    async function handleSignin(){
        if (email && password){
            setLoading(true);
            const res = await api.signin(email, password);
            setLoading(false);

            if (res.error){
                alert(res.error);
            } else{
                props.setToken(res.token);
                props.setName(res.name);
                navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes:[{name:'HomeDrawer'}]
                }));
            }
        }
    }

    async function handleSignup(){
        if (name && email && password){
            setLoading(true);
            const res = await api.signup(name, email, password);
            setLoading(false);

            if (res.error){
                alert(res.error);
            } else{
                props.setToken(res.token);
                props.setName(res.name);
                navigation.dispatch(CommonActions.reset({
                    index:0,
                    routes:[{name:'HomeDrawer'}]
                }));
            }
        }
    }

    return(
        <Container behavior={Platform.OS === 'ios' ? 'padding':null}>
            <StatusBar barStyle={'light-content'}/>
            <Header>
                <HeaderTitle>DevsUber</HeaderTitle>
            </Header>
            <Menu>
                <MenuItem
                    onPress={() => setActiveMenu('signin')}
                    active={activeMenu === 'signin'}>
                    <MenuItemText>Login</MenuItemText>
                </MenuItem>
                <MenuItem
                    onPress={() => setActiveMenu('signup')}
                    active={activeMenu === 'signup'}>
                    <MenuItemText>Cadastrar</MenuItemText>
                </MenuItem>
            </Menu>

            {activeMenu === 'signup' &&
                <Input
                    editable={!loading}
                    onChangeText={e => setName(e)}
                    placeholder={'Nome'}
                    value={name}/>
            }

            <Input
                editable={!loading}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
                onChangeText={e => setEmail(e)}
                placeholder={'E-mail'}
                value={email}/>

            <Input
                editable={!loading}
                secureTextEntry={true}
                autoCapitalize={'none'}
                onChangeText={e => setPassword(e)}
                placeholder={'Senha'}
                value={password}/>

            {activeMenu === 'signin' &&
                <ActionButton
                    disabled={loading}
                    onPress={handleSignin}>
                    <ActionButtonText>
                        Login
                    </ActionButtonText>
                </ActionButton>
            }

            {activeMenu === 'signup' &&
                <ActionButton
                    disabled={loading}
                    onPress={handleSignup}>
                    <ActionButtonText>
                        Cadastrar
                    </ActionButtonText>
                </ActionButton>
            }

            {loading &&
                <LoadingArea>
                    <ActivityIndicator size={'large'} color={'#fff'}/>
                </LoadingArea>
            }
        </Container>
    )
}

const mapStateToProps = (state) => {
  return {
      token: state.userReducer.token,
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setToken: (token) => dispatch({type:'SET_TOKEN', payload:{token}}),
        setName: (name) => dispatch({type:'SET_NAME', payload:{name}})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);