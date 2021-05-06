import BaseDataService from "services/_base.service";
import getTimestamp from "js/getTimestamp.js";
let collection = "/notifications";

class NotificationItem {
    constructor(id, dt) {
        this.data = {
            id: id,
            memberId: dt.memberId !== undefined ? dt.memberId : "",
            notifications: dt.notifications !== undefined ? dt.notifications : [],
        }
    }
}

class Notification {
    constructor(dt) {
        this.data = {
            type: dt.type !== undefined ? dt.type : "",
            title: dt.title !== undefined ? dt.title : "",
            context: dt.context !== undefined ? dt.context : "",
            unread: dt.unread !== undefined ? dt.unread : true,
            registerDate: dt.registerDate !== undefined ? dt.registerDate : Date.now(),
            registerTimestamp: dt.registerTimestamp !== undefined ? dt.registerTimestamp : getTimestamp(),
        }
    }
}

class NotificationDataService {

    create(data) {
        return BaseDataService.create(collection, data);
    }

    update(id, data) {
        return BaseDataService.update(collection, id, data);
    }

    createNewNotification({ receiveMemberId, type, title, context}) {
        let notification = new Notification({ type, title, context }).data;
        this.getByMemberId(receiveMemberId, null, notification);
    }

    getCurrentMemberNotificationItem(memberId, setState) {
        this.getByMemberId(memberId, setState, "get");
    }

    getByMemberId(memberId, setState, data) {
        let queryCondition = {
            where: [{
                key: "memberId",
                operation: "==",
                condition: memberId
            }]
        }
        BaseDataService.query(collection, queryCondition).then(snapshot => {
            if (snapshot.docs.length === 0) {
                let notification = new NotificationItem("", "").data;
                notification.memberId = memberId;
                this.create(notification)
                    .then(function (docRef) {
                        if (data === "get") {
                            setState(notification);
                        } else {
                            notification.notifications.push(data);
                            this.update(notification.id, notification)
                        }
                    })
                    .catch((e) => {
                        console.log(e);
                    });

            } else {
                snapshot.forEach((item) => {
                    let id = item.id;
                    let dt = item.data();
                    let notification = new NotificationItem(id, dt).data;
                    if (data === "get") {
                        setState(notification);
                    } else {
                        notification.notifications.push(data);
                        this.update(notification.id, notification)
                    }
                });
            }
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }
}

export default new NotificationDataService();