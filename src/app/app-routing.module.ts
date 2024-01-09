import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { NftComponent } from './component/nft/nft.component';
import { BuyNowComponent } from './component/buy-now/buy-now.component';
import { AuctionsComponent } from './component/auctions/auctions.component';
import { BuyNftNowComponent } from './component/buy-nft-now/buy-nft-now.component';
import { BuyNftAuctionComponent } from './component/buy-nft-auction/buy-nft-auction.component';
import {NewHomeComponent} from "./new-home/new-home.component";

const routes: Routes = [
  {path: "", component: NewHomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'user', component: UserComponent},
  {path:'nft', component: NftComponent},
  {path:'buy-now', component:BuyNowComponent},
  {path:'auctions', component: AuctionsComponent},
  {path:'buy-nft-now', component: BuyNftNowComponent},
  {path:'buy-nft-auction', component: BuyNftAuctionComponent},
  {path: "home", component: NewHomeComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
