import { Colis } from "./colis.model";
import { Statuts } from "./statuts";
import { User } from "./user.model";

export class PriseCharge {

    idPrise?: any;
	colis?: Colis;	
	statuts?: Statuts;	
	users?: User;
	idVol?: string;
	villeDepart?: string;
	dateDepart?: Date;
	villeArrivee?: string;
	dateArrivee?: Date;
}
