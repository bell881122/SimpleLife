import BaseDataService from "services/_base.service";
import MemberDataService from "services/member.service";
import getTimestamp from "js/getTimestamp.js";
let collection = "/messageItems";


function newMessageItem(id, dt) {
    return {
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

class MessageItemDataService {

    create(data) {
        return BaseDataService.create(collection, data);
    }

    update(id, data) {
        let messageItem = newMessageItem(id, data);
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
                        let messageItem = newMessageItem(id, dt);
                        if (messageItem.memberIds.indexOf(chatId) > -1) {
                            hasMessageItem = true;
                        }
                    });
                }

                if (!hasMessageItem) {
                    let messageItem = newMessageItem("", "");
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
                        let messageItem = newMessageItem(id, dt);
                        messageItems.push(messageItem);
                    });

                    // chatMemberName ??? chatMemberPhotoUrl ??????????????????????????????????????? messageItem
                    // ??????????????? messageItems ??????????????????????????????????????????
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