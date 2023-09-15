import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { lastValueFrom } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { AdsI } from 'src/app/shared/interfaces/ad.interface';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css']
})
export class NoticesComponent implements OnInit {
  @ViewChild('successNotices') successNotices!: ModalAlertsComponent;
  @ViewChild('failNotices') failNotices!: ModalAlertsComponent;


  
  @Input() action: number = 0 // 0 - nuevo, 2 - revision ,1 - edicion
  @Input() data!: AdsI
  @Output() saveAds = new EventEmitter<any>();
  @Output() acceptAds = new EventEmitter<AdsI>();
  @Output() rejectAds = new EventEmitter<AdsI>();
  //listas
  ageList: any = [];
  profsList: any = [];
  countriesList: any = [];
  languageList: any = [];
  hobbiesList: any = [];
  generoList: any = [];
  religionList: any = [];
  journalList: any = [];
  dependecyList: any = [];

  //seleccionados
  selectedAge: any;
  selectedProfs: any = [];
  selectedCountry: any;
  selectedLanguage: any;
  selectedHobbies: any;
  selectedGenero: any;
  selectedReligion: any;
  selectedJournal: any;
  selectedDependency: any;

  dropdownSettings: IDropdownSettings = {};
  errMsj: string = '';
  jobs: any = [];
  countries: any = [];
  generos: any = [];
  imgA!: File;
  imgAb64 = '';
  user_id = '';
  item: any;
  auxItem = false;
  auxImg = false;
  auxAge: any = [];
  auxProf: any = [];
  auxPais: any = [];
  auxIdioma: any = [];
  auxHobbie: any = [];
  auxGender: any = [];
  auxReligion: any = [];
  auxJournal: any = [];
  auxDepen: any = [];
  auxTitle = '';
  auxDesc = '';
  auxLink1 = '';
  auxLink2 = '';
  auxPackage = '';

  constructor(private userService: UserServiceService) {}

  async ngOnInit() {
    this.user_id = sessionStorage.getItem('id')!;
    this.item = JSON.parse(sessionStorage.getItem('item')!);

    await this.getJobs();
    await this.onGetCountry();
    await this.getGenero();

    this.profsList = this.jobs;
    this.countriesList = this.countries;
    this.generoList = this.generos;
    this.ageList = [
      { item_id: '1315', item_text: 'De 13 a 15 años' },
      { item_id: '1618', item_text: 'De 16 a 18 años' },
      { item_id: '1925', item_text: 'De 19 a 25 años' },
      { item_id: '25', item_text: 'De 25 años en adelante' },
    ];

    this.languageList = [
      { item_id: 'ES', item_text: 'Español' },
      { item_id: 'EN', item_text: 'Inglés' },
      { item_id: 'ITA', item_text: 'Italiano' },
      { item_id: 'CHM', item_text: 'Chino Mandarin' },
    ];

    this.hobbiesList = [
      { item_id: 'Deportes Extremos', item_text: 'Deportes Extremos' },
      { item_id: 'Juegos Mesa', item_text: 'Juegos de Mesa' },
      { item_id: 'Lectura', item_text: 'Lectura' },
      { item_id: 'Juegos Online', item_text: 'Juegos Online' },
    ];

    this.religionList = [
      { item_id: 'Catolica', item_text: 'Católica' },
      { item_id: 'Cristiana', item_text: 'Cristiana' },
      { item_id: 'Evangelica', item_text: 'Evangélica' },
      { item_id: 'Musulmana', item_text: 'Musulmana' },
    ];

    this.journalList = [
      { item_id: 'Tiempo Completo', item_text: 'Tiempo Completo' },
      { item_id: 'Medio Tiempo', item_text: 'Medio Tiempo' },
      { item_id: 'Freelancer', item_text: 'Freelancer' },
      { item_id: 'Ocasional', item_text: 'Ocasional' },
    ];

    this.dependecyList = [
      { item_id: 'Bajo Dependencia', item_text: 'Bajo Dependencia' },
      { item_id: 'Independiente', item_text: 'Independiente' },
    ];

    this.onSetSelected();

    this.selectedProfs = this.auxProf.length > 0 ? this.auxProf : [];
    this.selectedCountry = this.auxPais.length > 0 ? this.auxPais : [];
    this.selectedAge = this.auxAge.length > 0 ? this.auxAge : [];
    this.selectedLanguage = this.auxIdioma.length > 0 ? this.auxIdioma : [];
    this.selectedHobbies = this.auxHobbie.length > 0 ? this.auxHobbie : [];
    this.selectedGenero = this.auxGender.length > 0 ? this.auxGender : [];
    this.selectedReligion = this.auxReligion.length > 0 ? this.auxReligion : [];
    this.selectedJournal = this.auxJournal.length > 0 ? this.auxJournal : [];
    this.selectedDependency = this.auxDepen.length > 0 ? this.auxDepen : [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Quitar Todos',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  async getJobs() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('PROFESION')
      );

      response.data.map((x: any) => {
        this.jobs.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
      this.jobs = [];
    }
  }

  async onGetCountry() {
    try {
      const response = await lastValueFrom(this.userService.getCountries());
      response.data.forEach((element: any) => {
        this.countries.push({
          item_id: element._id,
          item_text: element.name,
        });
      });
    } catch (error: any) {
      console.log(error.error);
      this.countries = [];
    }
  }

  async getGenero() {
    try {
      const response = await lastValueFrom(
        this.userService.getCatalog('GENERO')
      );

      response.data.forEach((x: any) => {
        this.generos.push({
          item_id: x._id,
          item_text: x.name,
        });
      });
    } catch (error: any) {
      console.log('error', error.error);
    }
  }

  async onRegister(form: any) {
    const auxAge: any = [];
    const auxJob: any = [];
    const auxPais: any = [];
    const auxIdioma: any = [];
    const auxHobbies: any = [];
    const auxGender: any = [];
    const auxReligion: any = [];
    const auxJournal: any = [];
    const auxType: any = [];

    this.selectedAge.map((x: any) => {
      auxAge.push(x.item_id);
    });

    this.selectedProfs.map((x: any) => {
      auxJob.push(x.item_id);
    });

    this.selectedCountry.map((x: any) => {
      auxPais.push(x.item_id);
    });

    this.selectedLanguage.map((x: any) => {
      auxIdioma.push(x.item_id);
    });

    this.selectedHobbies.map((x: any) => {
      auxHobbies.push(x.item_id);
    });

    this.selectedGenero.map((x: any) => {
      auxGender.push(x.item_id);
    });

    this.selectedReligion.map((x: any) => {
      auxReligion.push(x.item_id);
    });

    this.selectedJournal.map((x: any) => {
      auxJournal.push(x.item_id);
    });

    this.selectedDependency.map((x: any) => {
      auxType.push(x.item_id);
    });

    const listas = {
      age: auxAge,
      job: auxJob,
      country: auxPais,
      language: auxIdioma,
      hobbies: auxHobbies,
      gender: auxGender,
      religion: auxReligion,
      journal: auxJournal,
      typeDep: auxType,
    };

    try {
      if (!this.auxItem) {
        const response = await lastValueFrom(
          this.userService.createAds(form, this.user_id, this.imgAb64, listas)
        );

        if (response.data !== null) {
          this.successNotices.abrir();
        }
      }

      if (this.auxItem) {
        if (!this.imgAb64) {
          this.imgAb64 = this.item.image;
        }

        const response = await lastValueFrom(
          this.userService.updateAds(form, this.imgAb64, listas, this.item._id)
        );

        if (response.data !== null) {
          sessionStorage.removeItem('item');
          this.successNotices.abrir();
        }
      }
    } catch (error: any) {
      console.log(error.error);
      this.failNotices.abrir();
    }
  }

  onSuccess() {
    location.reload();
  }

  //#region select update
  onSetSelected() {
    if (this.item !== null) {
      this.auxItem = true;
      this.auxImg = true;
      this.auxTitle = this.item.title;
      this.auxDesc = this.item.description;
      this.auxLink1 = this.item.link_ads;
      this.auxLink2 = this.item.link_conversion;
      this.auxPackage = this.item.package;

      this.ageList.filter((element: any) => {
        this.item.age.filter((x: any, index: any) => {
          if (element.item_id === this.item.age[index]) {
            this.auxAge.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.jobs.filter((element: any) => {
        this.item.job.filter((x: any, index: any) => {
          if (element.item_id === this.item.job[index]) {
            this.auxProf.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.countries.filter((element: any) => {
        this.item.country.filter((x: any, index: any) => {
          if (element.item_id === this.item.country[index]) {
            this.auxPais.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.languageList.filter((element: any) => {
        this.item.language.filter((x: any, index: any) => {
          if (element.item_id === this.item.language[index]) {
            this.auxIdioma.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.hobbiesList.filter((element: any) => {
        this.item.hobbies.filter((x: any, index: any) => {
          if (element.item_id === this.item.hobbies[index]) {
            this.auxHobbie.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.generoList.filter((element: any) => {
        this.item.gender.filter((x: any, index: any) => {
          if (element.item_id === this.item.gender[index]) {
            this.auxGender.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.religionList.filter((element: any) => {
        this.item.religion.filter((x: any, index: any) => {
          if (element.item_id === this.item.religion[index]) {
            this.auxReligion.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.journalList.filter((element: any) => {
        this.item.journal.filter((x: any, index: any) => {
          if (element.item_id === this.item.journal[index]) {
            this.auxJournal.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });

      this.dependecyList.filter((element: any) => {
        this.item.type_dependency.filter((x: any, index: any) => {
          if (element.item_id === this.item.type_dependency[index]) {
            this.auxDepen.push({
              item_id: element.item_id,
              item_text: element.item_text,
            });
          }
        });
      });
    }
  }
  //#endregion

  //#region img
  onChangeIng(event: any) {
    this.auxImg = false;
    this.imgA = <File>event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.imgA);
    reader.onload = () => {
      const base64String = reader.result!.toString().split(',')[1];
      const pureBase64 = base64String.replace(/[^a-zA-Z0-9+/]/g, '');

      this.imgAb64 = pureBase64;
    };
  }
  //#endregion

  //#region edad
  onSelectAge(item: any) {
    this.selectedAge.push(item);
    this.selectedAge.pop();
  }

  onSelectAllAge(items: any) {
    this.selectedAge = [];
    this.selectedAge.push(items);
  }

  onDeSelectAge(item: any) {
    this.selectedAge.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region profesion
  onSelectProf(item: any) {
    this.selectedProfs.push(item);
    this.selectedProfs.pop();
  }

  onSelectAllProf(items: any) {
    this.selectedProfs = [];
    this.selectedProfs.push(items);
  }

  onDeSelectProf(item: any) {
    this.selectedProfs.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region pais
  onSelectCountry(item: any) {
    this.selectedCountry.push(item);
    this.selectedCountry.pop();
  }

  onSelectAllCountry(items: any) {
    this.selectedCountry = [];
    this.selectedCountry.push(items);
  }

  onDeSelectCountry(item: any) {
    this.selectedCountry.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region idioma
  onSelectLanguage(item: any) {
    this.selectedLanguage.push(item);
    this.selectedLanguage.pop();
  }

  onSelectAllLanguage(items: any) {
    this.selectedLanguage = [];
    this.selectedLanguage.push(items);
  }

  onDeSelectLanguage(item: any) {
    this.selectedLanguage.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region pasatiempos
  onSelectHobbies(item: any) {
    this.selectedHobbies.push(item);
    this.selectedHobbies.pop();
  }

  onSelectAllHobbies(items: any) {
    this.selectedHobbies = [];
    this.selectedHobbies.push(items);
  }

  onDeSelectHobbies(item: any) {
    this.selectedHobbies.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region genero
  onSelectGenero(item: any) {
    this.selectedGenero.push(item);
    this.selectedGenero.pop();
  }

  onSelectAllGenero(items: any) {
    this.selectedGenero = [];
    this.selectedGenero.push(items);
  }

  onDeSelectGenero(item: any) {
    this.selectedGenero.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region religion
  onSelectReligion(item: any) {
    this.selectedReligion.push(item);
    this.selectedReligion.pop();
  }

  onSelectAllReligion(items: any) {
    this.selectedReligion = [];
    this.selectedReligion.push(items);
  }

  onDeSelectReligion(item: any) {
    this.selectedReligion.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region jornada
  onSelectJournal(item: any) {
    this.selectedJournal.push(item);
    this.selectedJournal.pop();
  }

  onSelectAllJournal(items: any) {
    this.selectedJournal = [];
    this.selectedJournal.push(items);
  }

  onDeSelectJournal(item: any) {
    this.selectedJournal.filter((element: any) => element !== item.item_id);
  }
  //#endregion

  //#region dependecy
  onSelectDep(item: any) {
    this.selectedDependency.push(item);
    this.selectedDependency.pop();
  }

  onSelectAllDep(items: any) {
    this.selectedDependency = [];
    this.selectedDependency.push(items);
  }

  onDeSelectDep(item: any) {
    this.selectedDependency.filter((element: any) => element !== item.item_id);
  }
  //#endregion
}
