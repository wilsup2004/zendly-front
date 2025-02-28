import { Component, OnInit } from '@angular/core';
import { Aeroport } from 'src/app/model/aeroport.model';
import { AeroportsService } from 'src/app/services/aeroports.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-aeroport-list',
  templateUrl: './aeroport-list.component.html',
  styleUrls: ['./aeroport-list.component.scss']
})
export class AeroportListComponent  implements OnInit {

  aeroports: Aeroport[] = [];
  currentAeroport: Aeroport = {};
  currentIndex = -1;
  aeroNom = '';

  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10,20, 30];

  constructor(private aeroportService: AeroportsService,public authService: AuthService) { }

  ngOnInit(): void {
    this.retrieveAeroports();
  }

  isProfileVisible(profile: string): boolean {
    return this.authService.getCurrentUserProfile() === profile;
  }
  getRequestParams(searchNom: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchNom) {
      params[`aeroNom`] = searchNom;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  retrieveAeroports(): void {
    const params = this.getRequestParams(this.aeroNom, this.page, this.pageSize);

    this.aeroportService.getAll(params)
    .subscribe(
      response => {
        const { aeroports, totalItems } = response;
        this.aeroports = aeroports;
        this.count = totalItems;
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.retrieveAeroports();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.retrieveAeroports();
  }

  refreshList(): void {
    this.retrieveAeroports();
    this.currentAeroport = {};
    this.currentIndex = -1;
  }

  setActiveAeroport(tutorial: Aeroport, index: number): void {
    this.currentAeroport = tutorial;
    this.currentIndex = index;
  }

  removeAllAeroports(): void {
    this.aeroportService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }

  searchNom(): void {
    this.currentAeroport = {};
    this.currentIndex = -1;

    this.aeroportService.findByNom(this.aeroNom)
      .subscribe({
        next: (data) => {
          this.aeroports = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

}
