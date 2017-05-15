export class User {
    public id: number | string;
    public providerId: string;
    public username: string;
    public email: string;
    public image: string;
    public token: string;
    public additionalInfo: any;
    public lastLogin: Date;
    public location: google.maps.LatLng;
    public online: boolean;
    public placeId: string;
    constructor(user: any) {
        this.id = user.id || null;
        this.providerId = user.providerId || null;
        this.username = user.username || null;
        this.email = user.email || null;
        this.image = user.image || null;
        this.token = user.token || null;
        this.additionalInfo = user.additionalInfo || null;
        this.lastLogin = user.lastLogin || new Date();
        this.location =  user.location? new google.maps.LatLng(user.location.lat, user.location.lng): null;
        this.online = user.online || false;
        this.placeId = user.placeId || null;
    }
}