import { Iduserprofil } from "./iduserprofil.model";
import { Profil } from "./profil.model";

export class Usersprofils {
     constructor(
        public id: Iduserprofil,
        public profil: Profil,
        public dateInit: any,
        public note: any
     ) {  }

}
