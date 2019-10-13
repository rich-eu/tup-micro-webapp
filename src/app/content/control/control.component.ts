import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../../shared/app.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Notification, NotificationType } from "./../../shared/toastr/toastr-notification.model";
import { NotificationService } from "./../../shared/toastr/toastr-notification.service";

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {

  private apiUnsubscribeService: Subject < void > = new Subject();
  @ViewChild('snackbar', {
    static: false
  }) snackbar: ElementRef;

  public selectedType: boolean;

  public outlet1: Boolean;
  public outlet2: Boolean;
  public outlet3: Boolean;

  notifications: Notification[] = [];

  constructor(
    public appService: AppService,
    public _notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.getDevices();

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

  toggleSwitch(num, state) {
    state = state ? state : 'off';    
    let stateBool = (state === 'on') ? true : false;
    let isChanged = false;
    if (num === 1) {                  
      if(this.outlet1 !== stateBool) {
        this.outlet1 = stateBool;
        isChanged = true;
      }
    } else if (num === 2) {      
      if(this.outlet2 !== stateBool) {
        this.outlet2 = stateBool;
        isChanged = true;
      }
    } else if (num === 3) {      
      if(this.outlet3 !== stateBool) {
        this.outlet3 = stateBool;
        isChanged = true;
      }
    }

    if(isChanged){
    
      const url = environment.API_URL + 'switch/' + num;
      const param = {
        state: state
      };
      
      this.appService.getService(url, param).pipe(
        takeUntil(this.apiUnsubscribeService)).subscribe(
        data => {        
          const output = 'Outlet ' + num + ' has beed turned ' + state + '!';
          (state === 'on') ? this._notificationService.success(output) : this._notificationService.warn(output);
        },
        error => {
          // console.log(error);
          this._notificationService.error(error.message)
        }
      );
    } else {
      const output = 'Outlet ' + num + ' is already ' + state + '!';
      this._notificationService.info(output);
    }    
  }

  public getDevices() {
    const url = environment.API_URL + 'devices';
    const param = {};
    this.appService.getService(url, param).pipe(
      takeUntil(this.apiUnsubscribeService)).subscribe(
      data => {
        if ((Object.assign(data)).length > 0) {
          Object.assign(data).forEach(row => {
            if (row.id === 1) {
              this.outlet1 = (row.state === 0) ? false : true
            } else if (row.id === 2) {
              this.outlet2 = (row.state === 0) ? false : true
            } else if (row.id === 3) {
              this.outlet3 = (row.state === 0) ? false : true
            }
          });

        }
      },
      error => {
        console.log(error);
        this._notificationService.error(error.message)
      }
    );
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
