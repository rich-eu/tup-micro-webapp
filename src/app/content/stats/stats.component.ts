import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../shared/app.service';
import {  Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Notification, NotificationType } from "./../../shared/toastr/toastr-notification.model";
import { NotificationService } from "./../../shared/toastr/toastr-notification.service";

export interface Switch {
  outlet: string;
  action: boolean;
  date: string;
}


@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, OnDestroy {
  public publicURL = "http://www.google.com/";
  private apiUnsubscribeService: Subject<void> = new Subject();
  public histories: Switch[] = [];
  notifications: Notification[] = [];

  constructor(
    public appService: AppService,
    public _notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.getDeviceHistory();
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


  ngOnDestroy(){
    this.apiUnsubscribeService.next();
    this.apiUnsubscribeService.complete();
  }

  public copyLink(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this._notificationService.success('Link has been copied to Clipboard!') 

  }

  public getDeviceHistory(){
    const url = environment.API_URL + 'history/' + environment.HISTORY_LIMIT;
    const param = {      
    };
    this.histories = [];
    this.appService.getService(url, param).pipe(
      takeUntil(this.apiUnsubscribeService)).subscribe(
      data => {
        console.log(data);
        if ((Object.assign(data)).length > 0) {
          console.log('pasok');
          Object.assign(data).forEach(row => {
            this.histories.push({
              outlet: row.device,
              action: (row.state === 0)? false : true,
              date: row.date
            })
          });

        }
        console.log(this.histories);
        
      },
      error => {
        console.log(error);
        this._notificationService.error(error.message);
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
