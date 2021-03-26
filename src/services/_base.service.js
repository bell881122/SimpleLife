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

    query(collection, queryCondition) {
        let query = db.collection(collection);

        for (var i = 0; i < queryCondition.where.length;i++){
            query = this.queryBase(query, queryCondition.where[i]);
        }

        if (queryCondition.orderby !== undefined) {
            query = query.orderBy(queryCondition.orderby[0], queryCondition.orderby[1]);
        }

        if (queryCondition.limit !== undefined)
            query = query.limit(queryCondition.limit);

        return query.get();
    }

    queryBase(query, queryCondition) {
        query = query.where(queryCondition.key, queryCondition.operation, queryCondition.condition);

        return query;
    }
}

export default new BaseDataService();