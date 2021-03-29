import BaseDataService from "services/_base.service";
let collection = "/messages";

export const getTimestamp = () => {
    const date = new Date();
    const components = [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, "0"),
        date.getDate().toString().padStart(2, "0"),
        date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
        date.getSeconds().toString().padStart(2, "0"),
        date.getMilliseconds().toString().padStart(3, "0")
    ];
    const timestamp = parseInt(components.join(""));
    return timestamp;
}

class Message {
    constructor(id, dt) {
        this.data = {
            id: id,
            authorId: dt.authorId !== undefined ? dt.authorId : "",
            receiverId: dt.receiverId !== undefined ? dt.receiverId : "",
            createdTime: dt.createdTime !== undefined ? dt.createdTime : Date.now(),
            timestamp: dt.timestamp !== undefined ? dt.timestamp : "",
            type: dt.type !== undefined ? dt.type : "text",
            content: dt.content !== undefined ? dt.content : "",
        }
    }
}

class MessageDataService {

    create(data) {
        return BaseDataService.create(collection, data);
    }

    queryMessages(authorId, receiverId, queryLimit, setState) {

        let queryCondition1 = {
            where: [
                {
                    key: "authorId",
                    operation: "==",
                    condition: authorId,
                    orderby: ["timestamp", "desc"],
                    limit: queryLimit
                }, {
                    key: "receiverId",
                    operation: "==",
                    condition: receiverId,
                    orderby: ["timestamp", "desc"],
                    limit: queryLimit
                }
            ]
        }

        let queryCondition2 = {
            where: [
                {
                    key: "authorId",
                    operation: "==",
                    condition: receiverId,
                    orderby: ["timestamp", "desc"],
                    limit: queryLimit
                }, {
                    key: "receiverId",
                    operation: "==",
                    condition: authorId,
                    orderby: ["timestamp", "desc"],
                    limit: queryLimit
                }
            ]
        }

        async function getMessages() {

            const query1 = BaseDataService.query(collection, queryCondition1);
            const query2 = BaseDataService.query(collection, queryCondition2);

            const [query1Snapshot, query2Snapshot] = await Promise.all([
                query1,
                query2
            ]);

            const query1Array = query1Snapshot.docs;
            const query2Array = query2Snapshot.docs;

            const queryArray = query1Array.concat(query2Array);
            return queryArray;
        }

        getMessages().then(result => {
            this.setData(result, setState, queryLimit)
        });
    }

    setData(items, setState, queryLimit) {
        let messages = [];
        items.forEach((item) => {
            let id = item.id;
            let dt = item.data();
            let message = new Message(id, dt).data;
            messages.push(message);
        });

        //firebase用desc篩選出最新訊息，因此要再asc回去
        messages = messages.sort(function (a, b) {
            return a.timestamp > b.timestamp ? 1 : -1;
        });

        if (queryLimit)
            messages = messages.slice(queryLimit > messages.length ? (messages.length * -1) : (queryLimit * -1));

        setState(messages);
    };
}

export default new MessageDataService();

const NewMessage = new Message("", "");
export { NewMessage };