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
            favorites: dt.favorites !== undefined ? dt.favorites : [],
            registerDate: dt.registerDate !== undefined ? dt.registerDate : Date.now(),
            changeTimes: dt.changeTimes !== undefined ? dt.changeTimes : 0,
            goodCount: dt.goodCount !== undefined ? dt.goodCount : 0,
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
        BaseDataService.query(collection, "uid", "==", uid).then(snapshot => {
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
}

export default new MemberDataService();