import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ListCreditsComponent } from './components/list-credits/list-credits.component';
import { CreditComponent } from './components/credit/credit.component';



const routes: Routes = [
  {path: 'Home',  component: ListCreditsComponent},
  {path: 'Credit',  component: CreditComponent},

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
