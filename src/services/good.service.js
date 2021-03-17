import BaseDataService from "services/_base.service";
let collection = "/goods";

class Good {
    constructor(id, dt) {
        this.data = {
            id: id,
            memberId: dt.memberId,
            title: dt.title,
            description: dt.description,
            imgURL: dt.imgURL,
            price: dt.price,
            state: dt.state,
            transactionTypes: dt.transactionTypes,
            f2fLocation: dt.f2fLocation,
            published: dt.published,
            instore: dt.instore !== undefined ? dt.instore : true,
            registerDate: dt.registerDate !== undefined ? dt.registerDate : Date.now(),
            publishedDate: dt.publishedDate !== undefined ? dt.publishedDate : Date.now(),
        }
    }
}

class GoodDataService {

    getAll(setState) {
        BaseDataService.getAll(collection).then(snapshot => {
            this.setData(snapshot, setState)
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    getById(id, setState) {
        BaseDataService.getById(collection,id).then(item => {
                let id = item.id;
                let dt = item.data();
                let good = new Good(id, dt).data;
                setState(good);
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