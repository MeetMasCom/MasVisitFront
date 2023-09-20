import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FriendsServiceService } from 'src/app/friends/services/friends-service.service';
import { ChatI } from '../../interfaces/chat.interface';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  chat: FormControl = new FormControl("", Validators.required);
  users: any[] = [];
  user: any;
  messagues: ChatI[] = []
  isLoading: boolean = false

  /**
   * Constructor
   * @param friendsServiceService
   * @param authServiceService
   * 
   */
  constructor(private friendsServiceService: FriendsServiceService) {

  }

  /**
   * AfterViewInit
   */
  ngAfterViewInit(): void {
    this.sensorMessage();

  }

  /**
   * Sensor
   */
  sensorMessage() {
    setTimeout(() => {
      this.getMessagues(this.user._id);
      this.sensorMessage();
    }, 60000);
  }

  /**
   * OnInit
   */
  ngOnInit(): void {
    const userId = sessionStorage.getItem('id')!;
    this.friendsServiceService.getAllUserLike(userId).subscribe(res => {
      this.users = res.data;
      this.selectUser(res.data[0]);
    })
  }

  /**
   * Seleccionar usuario
   * @param user 
   */
  selectUser(user: any) {
    if (this.user?._id == user?._id) return
    this.messagues = [];
    this.user = user;
    this.getMessagues(user._id);
  }

  /**
   * Obtener mensajes
   * @param userId 
   */
  getMessagues(userId: string) {
    this.isLoading = true;
    const userFrom = sessionStorage.getItem('id')!;
    this.friendsServiceService.getMessages(userFrom, userId).subscribe(res => {
      this.messagues = res.data;
      this.isLoading = false;
    })
  }

  /**
   * Guardar mensaje
   */
  saveMessague() {
    const value = this.chat.value;
    this.chat.reset();
    this.isLoading = true;
    const userFrom = sessionStorage.getItem('id')!;
    this.friendsServiceService.saveMessages(this.user._id, userFrom, value).subscribe(res => {
      this.isLoading = false;
      this.getMessagues(this.user._id);
    });
  }

}
