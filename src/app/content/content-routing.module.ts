import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content.component';

import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ControlComponent } from './control/control.component';
import { StatsComponent } from './stats/stats.component';
import { NotFoundComponent } from './not-found/not-found.component'


const routes: Routes = [
  { path: '', component: ContentComponent,
    children: [
     { path: '', redirectTo: '/control', pathMatch: 'full'  } ,      
      { path: 'control', component: ControlComponent, } ,      
      { path: 'about', component: AboutComponent, } ,      
      { path: 'stats', component: StatsComponent, } ,
      { path: 'login', component: LoginComponent   } ,  
      { path: 'not-found', component: NotFoundComponent   } ,      
     { path: '**', redirectTo: '/not-found'  } ,
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ], exports: [RouterModule],
  providers: [  ]
})
export class ContentRoutingModule { }
