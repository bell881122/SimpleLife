import BaseDataService from "services/_base.service";
let collection = "/messageItems";

class MessageItem {
    constructor(id, dt) {
        this.data = {
            id: id,
            memberIds: dt.memberIds !== undefined ? dt.memberIds : [],
            lastMessage: dt.lastMessage !== undefined ? dt.lastMessage : "",
            lastModifiedTime: dt.lastModifiedTime !== undefined ? dt.lastModifiedTime : Date.now(),
            unreadMemberId: dt.unreadMemberId !== undefined ? dt.unreadMemberId : "",
            registerTime: dt.registerTime !== undefined ? dt.registerTime : Date.now(),
        }
    }
}

class MessageItemDataService {

    create(data) {
        return BaseDataService.create(collection, data);
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
                condition: authorId
            }]
        }
        BaseDataService.query(collection, queryCondition)
            .then(result => {
                this.setData(result, setState)
            });
    }

    setData(items, setState) {
        let messageItems = [];
        items.forEach((item) => {
            let id = item.id;
            let dt = item.data();
            let messageItem = new MessageItem(id, dt).data;
            messageItems.push(messageItem);
        });

        //firebase用desc篩選出最新訊息，因此要再asc回去
        messageItems = messageItems.sort(function (a, b) {
            return a.lastModifiedTime < b.lastModifiedTime ? 1 : -1;
        });

        setState(messageItems);
    };
}

export default new MessageItemDataService();