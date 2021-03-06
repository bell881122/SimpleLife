import BaseDataService from "services/_base.service";
import getTimestamp from "js/getTimestamp.js";
let collection = "/goods";

export function newGood(id, dt, isCopy = false) {
    return {
        id: id,
        memberId: dt.memberId !== undefined ? dt.memberId : "",
        title: dt.title !== undefined ? dt.title : "",
        description: dt.description !== undefined ? dt.description : "",
        imgURL: dt.imgURL !== undefined && !isCopy ? dt.imgURL : "",
        price: dt.price !== undefined ? dt.price : 0,
        state: dt.state !== undefined ? dt.state : "二手",
        published: dt.published !== undefined ? dt.published : true,
        location: dt.location !== undefined ? dt.location : "",
        tags: dt.tags !== undefined ? dt.tags : [],
        //時間紀錄
        registerDate: dt.registerDate !== undefined && !isCopy ? dt.registerDate : Date.now(),
        registerTimestamp: dt.registerTimestamp !== undefined && !isCopy ? dt.registerTimestamp : getTimestamp(),
        lastModifiedDate: dt.lastModifiedDate !== undefined && !isCopy ? dt.lastModifiedDate : Date.now(),
        lastModifiedTimestamp: dt.lastModifiedTimestamp !== undefined && !isCopy ? dt.lastModifiedTimestamp : getTimestamp(),
        publishedDate: dt.publishedDate !== undefined && !isCopy ? dt.publishedDate : Date.now(),
        publishedTimestamp: dt.publishedTimestamp !== undefined && !isCopy ? dt.publishedTimestamp : getTimestamp(),
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

    getById(id, setState, setNoMatch) {
        BaseDataService.getById(collection, id).then(item => {
            let id = item.id;
            let dt = item.data();
            let good = newGood(id, dt);
            setState(good);
        }).catch(error => {
            console.log("Error getting documents: ", error);
            if (setNoMatch !== undefined)
                setNoMatch(true);
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

    query(condition, setState) {
        let queryCondition = condition;
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
            let good = newGood(id, dt);
            goods.push(good);
        });
        setState(goods);
    };
}

export default new GoodDataService();