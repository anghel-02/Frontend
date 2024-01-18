import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { UserComponent } from './component/user/user.component';
import { NftComponent } from './component/nft/nft.component';
import { BuyNowComponent } from './component/buy-now/buy-now.component';
import { AuctionsComponent } from './component/auctions/auctions.component';
import { BuyNftNowComponent } from './component/buy-nft-now/buy-nft-now.component';
import { BuyNftAuctionComponent } from './component/buy-nft-auction/buy-nft-auction.component';
import {NewHomeComponent} from "./new-home/new-home.component";
import {GalleryComponent} from "./component/gallery/gallery.component";
import { CreatenftComponent } from './component/createnft/createnft.component';
import { AuthGuardService } from './authguard.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path:'user', component: UserComponent, canActivate:[AuthGuardService]},
  {path:'nft', component: NftComponent, canActivate:[AuthGuardService]},
  {path:'buy-now', component:BuyNowComponent},
  {path:'auctions', component: AuctionsComponent},
  {path:'buy-nft-now', component: BuyNftNowComponent, canActivate:[AuthGuardService]},
  {path:'buy-nft-auction', component: BuyNftAuctionComponent},
  {path:'home', component: NewHomeComponent},
  {path: 'gallery', component: GalleryComponent, canActivate:[AuthGuardService]},
  {path: 'createnft', component: CreatenftComponent, canActivate:[AuthGuardService]},
  {path: '**', component: NewHomeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
