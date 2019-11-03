import { Component, OnInit, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AppService } from '../../shared/app.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Notification, NotificationType } from "./../../shared/toastr/toastr-notification.model";
import { NotificationService } from "./../../shared/toastr/toastr-notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private apiUnsubscribeService: Subject < void > = new Subject();

  @ViewChild('snackbar', {
    static: false
  }) snackbar: ElementRef;

  public username = '';
  public password = '';
  notifications: Notification[] = [];

  constructor(
    public appService: AppService,
    public _notificationService: NotificationService
    
  ) { }

  ngOnInit() {
    this._notificationService.getAlert().subscribe((alert: Notification) => {
      this.notifications = [];
      if (!alert) {
        this.notifications = [];
        return;
      }
      this.notifications.push(alert);
      setTimeout(() => {
        this.notifications = this.notifications.filter(x => x !== alert);
      }, 4000);
    });
  }

  ngOnDestroy() {
    this.apiUnsubscribeService.next();
    this.apiUnsubscribeService.complete();
  }


  public login() {
    const url = environment.API_URL + 'login';
    if (this.username === '' || this.password === '') {
      this._notificationService.error('Please input valid username and password!')
    } else {
      const param = {
        username: this.username,
        password: this.password
      };
      this.appService.getService(url, param).pipe(
        takeUntil(this.apiUnsubscribeService)).subscribe(
        data => {
          if(Object.assign(data).password !== '' && Object.assign(data).username !== '' ) {
            localStorage.setItem('username', Object.assign(data).username);
            localStorage.setItem('password', Object.assign(data).password);
            window.location.href = '/control';
          }
        },
        error => {
          console.log(error);
          this._notificationService.error('Invalid Credentials!')
        }
      );
    }
    
  }

  removeNotification(notification: Notification) {
    this.notifications = this.notifications.filter(x => x !== notification);
  }

  cssClass(notification: Notification) {
    if (!notification) {
      return;
    }
    switch (notification.type) {
      case NotificationType.Success:
        return 'toast-success';
      case NotificationType.Error:
        return 'toast-error';
      case NotificationType.Info:
        return 'toast-info';
      case NotificationType.Warning:
        return 'toast-warning';
    }
  }


}
