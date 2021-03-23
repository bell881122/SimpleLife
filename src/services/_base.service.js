import { firestore } from "js/firebase";
const db = firestore;

class BaseDataService {

    create(collection, data) {
        return db.collection(collection).add(data);
    }

    update(collection, id, data) {
        return db.collection(collection).doc(id).update(data);
    }

    delete(collection, id) {
        return db.collection(collection).doc(id).delete();
    }

    getAll(collection) {
        return db.collection(collection).get();
    }

    getById(collection, id) {
        return db.collection(collection).doc(id).get();
    }

    query(collection, key, operation, condition) {
        return db.collection(collection).where(key, operation, condition).get();
    }
}

export default new BaseDataService();