import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAccessComponent } from './no-access/no-access.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherWidgetComponent
  },
  {
    path: 'no-access',
    component: NoAccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
