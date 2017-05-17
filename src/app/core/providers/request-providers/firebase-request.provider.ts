import { IRequestProvider } from "./request-providers.factory";

export class FirebaseRequestProvider<T> implements IRequestProvider<T> {
    static $inject = ["$firebaseArray", "$firebaseObject"];
    private firebaseRef: any;
    constructor(private $firebaseArray, private $firebaseObject) {
        this.firebaseRef = firebase.database().ref();
    }

    get(url: string, additional: any = {}): Promise<T | T[]> {
        const { ref, id, idList } = this.parseUrl(url);
        const firebaseProvider = id && !additional.asArray ? this.connectToFirebaseObject(ref, idList) : this.connectToFirebaseArray(ref, idList, id);
        return firebaseProvider.$loaded().then((newRef) => {
            if (id && !additional.asArray) {
                const id = newRef.key;
                const index = firebaseProvider.$indexFor(id);
                return firebaseProvider[index];
            } else {
                return firebaseProvider;
            }
        });
    }

    post(url: string, data: any, additional: any = {}): Promise<T | T[]> {
        const { ref, id, idList } = this.parseUrl(url);
        const firebaseProvider = id && !additional.asArray ? this.connectToFirebaseObject(ref, idList) : this.connectToFirebaseArray(ref, idList, id);
        return new Promise((resolve, reject) => {
            if (id && !additional.asArray) {
                firebaseProvider[id] = data;
                firebaseProvider.$save();
                resolve(firebaseProvider[id]);
            } else {
                firebaseProvider.$add(data).then((newRef) => {
                    const id = newRef.key;
                    const index = firebaseProvider.$indexFor(id);
                    resolve(firebaseProvider[index]);
                });
            }
        });
    }

    patch(url: string, data: any): Promise<T | T[]> {
        const { ref, id, idList } = this.parseUrl(url);
        const object = this.connectToFirebaseObject(ref, idList);
        return object.$loaded().then(() => {
            const updatedData = Object.assign({}, object[id], data);
            object[id] = updatedData;
            object.$save();
            return object[id];
        });
    }

    put(url: string, data: any): Promise<T | T[]> {
        const { ref, id, idList } = this.parseUrl(url);
        const object = this.connectToFirebaseObject(ref, idList);
        return object.$loaded().then(() => {
            const updatedData = Object.assign({}, data);
            object[id] = updatedData;
            object.$save();
            return object[id];
        });
    }

    delete(url: string): Promise<null> {
        const { ref, id, idList } = this.parseUrl(url);
        const array = this.connectToFirebaseArray(ref, idList);
        return array.$loaded().then(() => {
            const { el, index } = this.getElementAndIndexById(array, id);
            array.$remove(index);
        });
    }

    private parseUrl(url: string) {
        const pieces = url.split("/");
        const ref = pieces[0];
        let id;
        let idList;
        if (pieces.length > 2) {
            id = pieces.pop();
            idList = pieces.splice(1);
        } else {
            id = pieces[1];
            idList = [];
        }
        return { ref, id, idList };
    }

    private connectToFirebaseArray(ref: any, idList: any[], id?: any) {
        return this.$firebaseArray(this.deepChild(ref, idList, id));
    }

    private connectToFirebaseObject(ref: any, idList: any[]) {
        return this.$firebaseObject(this.deepChild(ref, idList));
    }

    private deepChild(ref, idList, id?: any) {
        let currentRef = this.firebaseRef.child(ref);
        for (let i = 0; i < idList.length; i++) {
            currentRef = currentRef.child(idList[i]);
        }
        if (id) {
            currentRef = currentRef.child(id);
        }
        return currentRef;
    }

    private getElementAndIndexById(arrayRef: any, id: string) {
        const index = arrayRef.$indexFor(id);
        const el = arrayRef[index];
        return { el, index };
    }
}