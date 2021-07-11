import {auth} from './firebase';
import firebase from 'firebase/app';

export function reauthenticate(password){
    const user = auth.currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password,
    )
    return user.reauthenticateWithCredential(credentials);
}