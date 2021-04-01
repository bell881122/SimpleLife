import BaseDataService from "services/_base.service";
let collection = "/members";

class Member {
    constructor(dt) {
        this.data = {
            uid: dt.uid,
            profile: {
                name: dt !== undefined ? dt.profile.name : "",
                email: dt !== undefined ? dt.profile.email : "",
                photoURL: dt !== undefined ? dt.profile.photoURL : "",
            },
            registerDate: dt.registerDate !== undefined ? dt.registerDate : Date.now(),
            publishedCount: dt.publishedCount !== undefined ? dt.publishedCount : 0,
            messageBoard: dt.messageBoard !== undefined ? dt.messageBoard : "每天一點點，邁向簡單幸福生活。"
        }
    }
}

class MemberDataService {

    create(data) {
        BaseDataService.create(collection, data);
    }

    getById(uid, user, setState) {
        let queryCondition = {
            where: [{
                key: "uid",
                operation: "==",
                condition: uid
            }]
        }
        BaseDataService.query(collection, queryCondition).then(snapshot => {
            let member;
            if (snapshot.docs.length === 0) {
                member = new Member(user).data;
                this.create(member);
                setState(member);
            } else {
                snapshot.forEach((item) => {
                    let dt = item.data();
                    member = new Member(dt).data;
                    setState(member);
                });
            }
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    getSimpleMemberData(uids, messageItems, setMessageItems) {
        let queryCondition = {
            where: [{
                key: "uid",
                operation: "in",
                condition: uids
            }]
        }

        BaseDataService.query(collection, queryCondition).then(snapshot => {

            // TODO:目前用迴圈塞資料，數量多時可能會有效能問題，要改寫法
            let chatMessageItems = messageItems;
            snapshot.forEach((item) => {
                let dt = item.data();
                let member = new Member(dt).data;
                chatMessageItems.forEach(i => {
                    if (i.memberIds.indexOf(dt.uid) > -1) {
                        i.chatMemberName = member.profile.name;
                        i.chatMemberPhotoUrl = member.profile.photoURL;
                    }
                })
            })
            setMessageItems(chatMessageItems);
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }
}

export default new MemberDataService();