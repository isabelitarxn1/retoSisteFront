import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListCreditsComponent } from './components/list-credits/list-credits.component';
import { CreditComponent } from './components/credit/credit.component';




@NgModule({
  declarations: [
    ListCreditsComponent,
    CreditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    HomeRoutingModule
  ]
})
export class HomeModule { }
