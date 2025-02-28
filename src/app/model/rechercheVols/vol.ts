import { AeroportVol } from "./aeroport-vol";
import { Airline } from "./airline";
import { Flight } from "./flight";

export class Vol {

    flight_date?: Date;
	flight_status?: string;
	departure?: AeroportVol;
	arrival?: AeroportVol;
	airline?: Airline;
    flight?:Flight;
    aircompagnieline?:string;
    numVol?:string;
    villeDepart?:string;
    villeArrivee?:string;
    nbKiloDispo?:any;
}
