import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpRequestInterceptor } from './content/guard/HttpRequestInterceptor';



@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
