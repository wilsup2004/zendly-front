import { Statuts } from "./statuts";
import { User } from "./user.model";

export class Colis {
 constructor(
        public idColis: any,
        public statuts:Statuts ,
        public users:User ,
        public longueur: any,
        public largeur: any,
        public hauteur: any,
        public nbKilo: any,
        public tarif: any,
        public horodatage: Date,
        public villeDepart: string,
        public villeArrivee: string,
        public description: string,
        public photoPath: string,
        public file :File
        
     ) {  }
}
