import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { NftComponent } from './component/nft/nft.component';
import { BuyNowComponent } from './component/buy-now/buy-now.component';
import { AuctionsComponent } from './component/auctions/auctions.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'user', component: UserComponent},
  {path:'nft', component: NftComponent},
  {path:'buy-now', component:BuyNowComponent},
  {path:'auctions', component: AuctionsComponent},
  {path:'**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
