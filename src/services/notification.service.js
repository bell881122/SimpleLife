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

    createNotificationItem(receiveMemberId) {
        let notification = new NotificationItem("", "").data;
        notification.memberId = receiveMemberId;
        notification.notifications.push(new Notification({
            type: 'sys',
            title: '歡迎加入 Simple Life！',
            context:
                `感謝您使用 Simple Life，
                以下簡易說明本平台使用方式。

                【個人頁面】
                登入後，點擊畫面右上角的頭像，
                即可進入個人頁面。
                
                在「刊登」頁籤中，
                會顯示您所刊登的物品，
                點選「+」符號即可上傳物品；
                
                在「收藏」頁籤中，
                可以查看已加入收藏的物品；
                
                「個人」頁籤則是您的個人資訊，
                您可在此修改暱稱與留言板內容。

                【查看／收藏物品】
                遇見心儀的物品時，
                點擊物品即可進入物品頁。

                使用物品標題上方的書籤符號，
                即可收藏該物品，
                再次點擊則取消收藏。

                【交流物品】
                點擊物品刊登者的頭像，
                即可進入他的個人頁面，
                查看更多該刊登者的物品；

                點選訊息符號則可傳遞私訊，
                諮詢物品詳情與寄送方式等，
                傳訊時，敬請留意保持網路禮儀。


                請盡情享受您的 Simple Life 吧！
                祝您有美好的一天 ~^^~`
        }).data);
        this.create(notification)
            .then(function (docRef) {
                console.log("新增通知成功");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    createNewNotification({ receiveMemberId, type, title, context }) {
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
                this.getByMemberId(memberId, setState, data)
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