import { Statuts } from "./statuts";
import { User } from "./user.model";

export class UsersDispo {
    constructor(
        public idDispo: any,
        public idVol: string,
        public villeDepart: string,
        public aeronomDepart: string,
        public dateDepart: Date,
        public villeArrivee: string,
        public aeronomArrivee: string,
        public dateArrivee: Date,
        public nbKiloDispo: any,
        public users:User ,
        public statuts:Statuts 
     ) {  }
}
