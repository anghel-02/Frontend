import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {HttpClientModule, HttpClient, withFetch} from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatToolbarModule} from "@angular/material/toolbar";


import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './component/user/user.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { NftComponent } from './component/nft/nft.component';
import { AuctionsComponent } from './component/auctions/auctions.component';
import { BuyNowComponent } from './component/buy-now/buy-now.component';
import { BuyNftNowComponent } from './component/buy-nft-now/buy-nft-now.component';
import { BuyNftAuctionComponent } from './component/buy-nft-auction/buy-nft-auction.component';
import { NewHomeComponent } from './new-home/new-home.component';
import { CreatenftComponent } from './component/createnft/createnft.component';




@NgModule ({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserComponent,
    GalleryComponent,
    NftComponent,
    AuctionsComponent,
    BuyNowComponent,
    BuyNftNowComponent,
    BuyNftAuctionComponent,
    NewHomeComponent,
    CreatenftComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatTabsModule,
    HttpClientModule,
    MatSelectModule,
    MatOptionModule,
    MatGridListModule,
    MatSidenavModule,
    MatListModule,
    MatRadioModule,
    MatToolbarModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
