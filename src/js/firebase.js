import { firebase } from '@firebase/app';
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

let config = JSON.parse(process.env.REACT_APP_FIREBASE_KEY)
firebase.initializeApp(config);

const firestore = firebase.firestore();
const storage = firebase.storage();
export { firestore, storage };