import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ContentRoutingModule } from './content-routing.module';

import { ContentComponent } from './content.component';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { ControlComponent } from './control/control.component';
import { StatsComponent } from './stats/stats.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guard';

@NgModule({
  imports: [
    CommonModule,    
    RouterModule,        
    FormsModule,
    ReactiveFormsModule,    
    ContentRoutingModule,      


  ],
  entryComponents: [
    // RegistrationCourseDialog,    
    
  ],
  exports: [
    
  ],
  declarations: [    
    ContentComponent, HeaderComponent, AboutComponent, ControlComponent, StatsComponent, FooterComponent, LoginComponent, NotFoundComponent,    
    
  ],

  providers: [
    AuthGuard    
  ]
})
export class ContentModule { }