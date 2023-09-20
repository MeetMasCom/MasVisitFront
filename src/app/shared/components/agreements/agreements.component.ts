import { Component, OnInit } from '@angular/core';
import { AdminServiceService } from 'src/app/admin/services/admin-service.service'
@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css'],
})
export class AgreementsComponent implements OnInit {

  data: any[] = []

  /**
   * Constructor
   * @param billeteraServiceService 
   */
  constructor(private adminServiceService: AdminServiceService) {

  }

  
  /**
   * OnInit
   */
  ngOnInit(): void {
    this.adminServiceService.getAllMembership().subscribe(res => {
      this.data = res.data;
    })
  }

  findPrice(code: string): number {
    return this.data.find(f => f.code == code).price ?? 0;
  }

}
