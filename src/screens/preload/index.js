import {useNavigation, CommonActions} from '@react-navigation/native'
import {connect} from 'react-redux'

function Preload(props){
    const navigation = useNavigation();
    console.log(navigation.navigation)

    if (!props.token){
        navigation.dispatch(CommonActions.reset({
            index:0,
            routes:[{name:'Login'}]
        }))
    } else{
        navigation.dispatch(CommonActions.reset({
            index:0,
            routes:[{name:'HomeDrawer'}]
        }))
    }

    return null;
};

const mapStateToProps = (state) => {
    return{
        token: state.userReducer.token
    }
};

export default connect(mapStateToProps)(Preload)

