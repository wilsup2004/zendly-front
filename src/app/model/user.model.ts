import { Usersprofils } from "./usersprofils.model";

export class User {

     constructor(
        public idUser: any,
        public nom: string,
        public prenom: string,
        public mail: string,
        public password: string,
        public usersProfils:Usersprofils []
     ) {  }

}
