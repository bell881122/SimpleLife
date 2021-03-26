import BaseDataService from "services/_base.service";
let collection = "/goods";

class Good {
    constructor(id, dt) {
        this.data = {
            id: id,
            memberId: dt.memberId !== undefined ? dt.memberId : "",
            title: dt.title !== undefined ? dt.title : "",
            description: dt.description !== undefined ? dt.description : "",
            imgURL: dt.imgURL !== undefined ? dt.imgURL : "",
            price: dt.price !== undefined ? dt.price : 0,
            state: dt.state !== undefined ? dt.state : "二手",
            // transactionTypes: dt.transactionTypes !== undefined ? dt.transactionTypes : [],
            // f2fLocation: dt.memberId !== undefined ? dt.memberId : true,
            published: dt.published !== undefined ? dt.published : true,
            instore: dt.instore !== undefined ? dt.instore : true,
            registerDate: dt.registerDate !== undefined ? dt.registerDate : Date.now(),
            publishedDate: dt.publishedDate !== undefined ? dt.publishedDate : Date.now(),
        }
    }
}

class GoodDataService {

    create(data) {
        return BaseDataService.create(collection, data);
    }

    update(id, data) {
        return BaseDataService.update(collection, id, data);
    }

    delete(id) {
        return BaseDataService.delete(collection, id);
    }

    getAll(setState) {
        BaseDataService.getAll(collection).then(snapshot => {
            this.setData(snapshot, setState)
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    getById(id, setState) {
        BaseDataService.getById(collection, id).then(item => {
            let id = item.id;
            let dt = item.data();
            let good = new Good(id, dt).data;
            setState(good);
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    query(key, operation, condition, setState) {
        let queryCondition = {
            where: [{
                key: key,
                operation: operation,
                condition: condition
            }]
        }
        BaseDataService.query(collection, queryCondition).then(snapshot => {
            this.setData(snapshot, setState)
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    setData(items, setState) {
        let goods = [];
        items.forEach((item) => {
            let id = item.id;
            let dt = item.data();
            let good = new Good(id, dt).data;
            goods.push(good);
        });
        setState(goods);
    };
}

export default new GoodDataService();

const NewGood = new Good("", "");
export { NewGood };