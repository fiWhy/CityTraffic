import { IRequestProvider } from "./request-providers.factory";

export class FirebaseRequestProvider<T> implements IRequestProvider<T> {
    static $inject = ["$firebaseArray"];
    private firebaseRef: any;
    constructor(private $firebaseArray) {
        this.firebaseRef = firebase.database().ref()
    }

    get(url: string): Promise<T | T[]> {
        const { ref, id } = this.parseUrl(url);
        const array = this.connectToFirebaseArray(ref);
        return array;

    }

    post(url: string, data: any): Promise<T | T[]> {
        const { ref, id } = this.parseUrl(url);
        const array = this.connectToFirebaseArray(ref);
        return new Promise((resolve, reject) => {
            array.$add(data).then((newRef) => {
                const id = newRef.key;
                const index = array.$indexFor(id);
                resolve(array[index]);
            });
        })
    }

    patch(url: string, data: any): Promise<T | T[]> {
        const { ref, id } = this.parseUrl(url);
        const array = this.connectToFirebaseArray(ref);
        return array.$loaded().then(() => {
            const { el, index } = this.getElementAndIndexById(array, id);
            const updatedData = Object.assign({}, el, data);
            array[index] = updatedData;
            array.$save(index);
        });
    }

    put(url: string, data: any): Promise<T | T[]> {
        const { ref, id } = this.parseUrl(url);
        const array = this.connectToFirebaseArray(ref);
        return array.$loaded().then(() => {
            const { el, index } = this.getElementAndIndexById(array, id);
            const updatedData = Object.assign({}, data);
            array[index] = updatedData;
            array.$save(index);
        });
    }

    delete(url: string): Promise<null> {
        const { ref, id } = this.parseUrl(url);
        const array = this.connectToFirebaseArray(ref);
        return array.$loaded().then(() => {
            const { el, index } = this.getElementAndIndexById(array, id);
            array.$remove(index);
        });
    }

    private parseUrl(url: string) {
        const pieces = url.split("/");
        return { ref: pieces[0], id: pieces[1] };
    }

    private connectToFirebaseArray(ref: any) {
        return this.$firebaseArray(this.firebaseRef.child(ref));
    }

    private getElementAndIndexById(arrayRef: any, id: string) {
        const index = arrayRef.$indexFor(id);
        const el = arrayRef[index];
        return { el, index };
    }
}