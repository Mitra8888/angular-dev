import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DataComponent } from '../data/data.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'data', component:DataComponent},
];
