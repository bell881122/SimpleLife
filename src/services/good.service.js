import BaseDataService from "services/_base.service";

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
            instore: dt.instore !== undefined ? dt.instore : true
        }
    }
}

class GoodDataService {

    getAll(setState) {
        BaseDataService.getAll("/goods").then(snapshot => {
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