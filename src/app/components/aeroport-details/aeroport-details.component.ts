import { Component, OnInit,Input } from '@angular/core';
import { Aeroport } from 'src/app/model/aeroport.model';
import { AeroportsService } from 'src/app/services/aeroports.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-aeroport-details',
  templateUrl: './aeroport-details.component.html',
  styleUrls: ['./aeroport-details.component.scss']
})

export class AeroportDetailsComponent  implements OnInit {

  @Input() viewMode = false;

  @Input() currentAeroport: Aeroport = {
    idAero: '',
		aeroNom: '',
		aeroVille: '',
		aeroPays: '',
		aeroLatitude: '',
		aeroLongitude: ''
  };
  
  message = '';

  constructor(
    private aeroportService: AeroportsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getAeroport(this.route.snapshot.params["idAero"]);
    }
  }

  getAeroport(idAero: string): void {
    this.aeroportService.get(idAero)
      .subscribe({
        next: (data) => {
          this.currentAeroport = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

 
  updateAeroport(): void {
    this.message = '';

    this.aeroportService.update(this.currentAeroport.idAero, this.currentAeroport)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'Cet aeroport a été modifié avec succès!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteAeroport(): void {
    this.aeroportService.delete(this.currentAeroport.idAero)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/aeroports']);
        },
        error: (e) => console.error(e)
      });
  }

}
