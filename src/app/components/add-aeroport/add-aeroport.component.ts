import { Component, OnInit} from '@angular/core';
import { Aeroport } from 'src/app/model/aeroport.model';
import { AeroportsService } from 'src/app/services/aeroports.service';

@Component({
  selector: 'app-add-aeroport',
  templateUrl: './add-aeroport.component.html',
  styleUrls: ['./add-aeroport.component.scss']
})
export class AddAeroportComponent implements OnInit {

  aeroport: Aeroport = {

    idAero: '',
		aeroNom: '',
		aeroVille: '',
		aeroPays: '',
		aeroLatitude:'',
		aeroLongitude:'',

  };
  submitted = false;

  constructor(private aeroportService: AeroportsService) { }

  ngOnInit(): void {
  }

  saveAeroport(): void {
    const data = {
      idAero : this.aeroport.idAero,
      aeroNom: this.aeroport.aeroNom,
      aeroVille: this.aeroport.aeroVille,
      aeroPays: this.aeroport.aeroPays,
      aeroLatitude: this.aeroport.aeroLatitude,
      aeroLongitude: this.aeroport.aeroLongitude
    };

    this.aeroportService.create(data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.submitted = true;
        },
        error: (e) => console.error(e)
      });
  }

  newAeroport(): void {
    this.submitted = false;
    this.aeroport = {
      idAero : '',
      aeroNom:'',
      aeroVille: '',
      aeroPays: '',
      aeroLatitude:'',
      aeroLongitude:''
    };
  }

}