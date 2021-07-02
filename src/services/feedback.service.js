import BaseDataService from "services/_base.service";
let collection = "/feedbacks";

export function newFeedback(id, dt) {
    return {
        id: id,
        memberId: dt.memberId !== undefined ? dt.memberId : "",
        type: dt.type !== undefined ? dt.type : "建議",
        title: dt.title !== undefined ? dt.title : "",
        content: dt.content !== undefined ? dt.content : "",
        state: dt.state !== undefined ? dt.state : "受理中",
        registerTime: dt.registerTime !== undefined ? dt.registerTime : "",
        registerTimestamp: dt.registerTimestamp !== undefined ? dt.registerTimestamp : ""
    }
}

class FeedbackDataService {

    create(data) {
        return BaseDataService.create(collection, data);
    }

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

    setData(items, setState) {
        let feedbacks = [];
        items.forEach((item) => {
            let id = item.id;
            let dt = item.data();
            let feedback = newFeedback(id, dt);
            feedbacks.push(feedback);
        });
        setState(feedbacks);
    };
}

export default new FeedbackDataService();