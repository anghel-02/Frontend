import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import 'localstorage-polyfill'
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
global ['localStorage'] = localStorage;
@NgModule ({
  imports: [
    AppModule,
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
