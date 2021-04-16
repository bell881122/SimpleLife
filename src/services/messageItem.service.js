import BaseDataService from "services/_base.service";
import MemberDataService from "services/member.service";
import getTimestamp from "js/getTimestamp.js";
let collection = "/messageItems";

class MessageItem {
    constructor(id, dt) {
        this.data = {
            id: id,
            memberIds: dt.memberIds !== undefined ? dt.memberIds : [],
            lastMessage: dt.lastMessage !== undefined ? dt.lastMessage : "",
            unreadMemberId: dt.unreadMemberId !== undefined ? dt.unreadMemberId : "",
            lastModifiedDate: dt.lastModifiedDate !== undefined ? dt.lastModifiedDate : Date.now(),
            lastModifiedTimestamp: dt.lastModifiedTimestamp !== undefined ? dt.lastModifiedTimestamp : getTimestamp(),
            createdTime: dt.createdTime !== undefined ? dt.createdTime : Date.now(),
            createdTimestamp: dt.createdTimestamp !== undefined ? dt.createdTimestamp : getTimestamp(),
        }
    }
}

class MessageItemDataService {

    create(data) {
        return BaseDataService.create(collection, data);
    }

    update(id, data) {
        let messageItem = new MessageItem(id, data).data;
        return BaseDataService.update(collection, id, messageItem);
    }

    checkMessageItem(authorId, chatId, setDoneCheckMessageItem) {
        let queryCondition = {
            where: [{
                key: "memberIds",
                operation: "array-contains",
                condition: authorId
            }]
        }

        BaseDataService.query(collection, queryCondition)
            .then(result => {
                let hasMessageItem = false;

                if (result.docs.length > 0) {
                    result.forEach((item) => {
                        let id = item.id;
                        let dt = item.data();
                        let messageItem = new MessageItem(id, dt).data;
                        if (messageItem.memberIds.indexOf(chatId) > -1) {
                            hasMessageItem = true;
                        }
                    });
                }

                if (!hasMessageItem) {
                    let messageItem = new MessageItem("", "").data;
                    messageItem.memberIds = [authorId, chatId];
                    this.create(messageItem);
                }
                setDoneCheckMessageItem(true);
            });
    }

    getMessageItems(authorId, setState) {
        let queryCondition = {
            where: [{
                key: "memberIds",
                operation: "array-contains",
                condition: authorId,
            }],
            orderby: ["lastModifiedTimestamp", "desc"],
        }
        BaseDataService.query(collection, queryCondition)
            .then(snapshot => {

                if (snapshot.docs.length === 0) {
                    return;
                }
                else {
                    let messageItems = [];
                    snapshot.forEach((item) => {
                        let id = item.id;
                        let dt = item.data();
                        let messageItem = new MessageItem(id, dt).data;
                        messageItems.push(messageItem);
                    });

                    // chatMemberName 跟 chatMemberPhotoUrl 都可能隨時被修改，不會存進 messageItem
                    // 因此在抓到 messageItems 的內容後，要另外塞入這些資料
                    let chatMemberIds = [];
                    messageItems.forEach(i => {
                        i.memberIds.forEach(j => {
                            if (j !== authorId) {
                                chatMemberIds.push(j);
                            }
                        });
                    });

                    MemberDataService.getSimpleMemberData(chatMemberIds, messageItems, setState);
                }
            });
    }
}

export default new MessageItemDataService();