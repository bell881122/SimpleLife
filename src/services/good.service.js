import BaseDataService from "services/_base.service";
import getTimestamp from "js/getTimestamp.js";
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
            published: dt.published !== undefined ? dt.published : true,
            location: dt.location !== undefined ? dt.location : "",
            tags: dt.tags !== undefined ? dt.tags : [],
            //時間紀錄
            registerDate: dt.registerDate !== undefined ? dt.registerDate : Date.now(),
            registerTimestamp: dt.registerTimestamp !== undefined ? dt.registerTimestamp : getTimestamp(),
            lastModifiedDate: dt.lastModifiedDate !== undefined ? dt.lastModifiedDate : Date.now(),
            lastModifiedTimestamp: dt.lastModifiedTimestamp !== undefined ? dt.lastModifiedTimestamp : getTimestamp(),
            publishedDate: dt.publishedDate !== undefined ? dt.publishedDate : Date.now(),
            publishedTimestamp: dt.publishedTimestamp !== undefined ? dt.publishedTimestamp : getTimestamp(),
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

    //TODO:暫時用不到，保留給後台使用
    getAll(setState) {
        let queryCondition = {
            orderby: ["registerTimestamp", "desc"]
        }
        BaseDataService.getAll(collection, queryCondition).then(snapshot => {
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

    getByIds(ids, setState) {
        if (ids.length === 0) {
            setState([]);
        } else {
            BaseDataService.getByIds(collection, ids)
                .then(snapshot => {
                    this.setData(snapshot, setState)
                }).catch(error => {
                    console.log("Error getting documents: ", error);
                });
        }
    }

    getMemberGoods(memberId, setState) {
        let queryCondition = {
            where: [
                {
                    key: "memberId",
                    operation: "==",
                    condition: memberId
                },
                {
                    key: "published",
                    operation: "==",
                    condition: true
                }
            ],
            orderby: ["registerTimestamp", "desc"]
        }

        BaseDataService.query(collection, queryCondition).then(snapshot => {
            this.setData(snapshot, setState);
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    query(key, operation, condition, orderby, setState) {
        let queryCondition = {
            where: [{
                key: key,
                operation: operation,
                condition: condition
            }],
            orderby: orderby
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