import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { LayoutServiceService } from '../../services/layout-service.service';
import { ModalAlertsComponent } from '../../../shared/components/modal-alerts/modal-alerts.component';
import { AdsI } from 'src/app/shared/interfaces/ad.interface';



@Component({
  selector: 'app-ads-layouts',
  templateUrl: './ads-layouts.component.html',
  styleUrls: ['./ads-layouts.component.css']
})
export class AdsLayoutsComponent implements OnInit {
  @ViewChild('exitoDeleteAdsRev') exitoDeleteAdsRev!: ModalAlertsComponent;
  @ViewChild('failDeleteAdsRev') failDeleteAdsRev!: ModalAlertsComponent;
  @ViewChild('successNotices') successNotices!: ModalAlertsComponent;
  @ViewChild('failNotices') failNotices!: ModalAlertsComponent;
  @ViewChild('btnEdit') btnEdit!: ElementRef;

  userId: string = '';
  adsActive: AdsI[] = [];
  adsReview: AdsI[] = [];
  adsReturn: AdsI[] = [];
  adsDisable: AdsI[] = [];
  messague: string = "";
  selectedAds!: AdsI;

  constructor(private layoutService: LayoutServiceService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('id')!;
    this.getAds();
  }

  async getAds() {
    try {
      this.adsActive = [];
      this.adsReview = [];
      this.adsReturn = [];
      const response = await lastValueFrom(
        this.layoutService.onGetAds(this.userId)
      );

      if (response.data !== null) {
        response.data.map((element: any) => {
          if (element.state === 0) {
            this.adsActive.push(element);
          }
          if (element.state === 1) {
            this.adsReview.push(element);
          }
          if (element.state === 2) {
            this.adsReturn.push(element);
          }
          if (element.state === 3) {
            this.adsDisable.push(element);
          }
        });
      }
    } catch (error: any) {
      this.adsActive = [];
      this.adsReview = [];
      this.adsReturn = [];
    }
  }

  onRedirigir() {
    this.getAds();
  }

  async onDelete(id: string) {
    try {
      const response = await lastValueFrom(this.layoutService.deleteAds(id));
      if (response.data !== null) {
        this.exitoDeleteAdsRev.abrir();
      }
    } catch (error: any) {
      this.failDeleteAdsRev.abrir();
    }
  }

  async onOffAds(data: any) {
    try {
      data.stop = !data.stop ?? true;
      const response = await lastValueFrom(this.layoutService.onOffAds(data, data._id!));
      if (response.data !== null) {
        this.messague = response.message;
        this.successNotices.abrir();
      }
    } catch (error: any) {
      this.messague = error.error.message;
      this.successNotices.abrir();
    }
  }

  onUpdate(item: AdsI) {
    this.btnEdit.nativeElement.click();
    this.selectedAds = { ...item };
  }

  openModal(data: any) {
    this.messague = data.messague;
    if (data.result) {
      this.successNotices.abrir();
    } else {
      this.failNotices.abrir();
    }
  }
}
