import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessengerFrameComponent } from './messenger-frame/messenger-frame.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { ListComponent } from './sidebar/list/list.component';
import { ItemComponent } from './sidebar/list/item/item.component';
import { MessageComponent } from './messenger-frame/message/message.component';
import { LogginComponent } from './loggin/loggin.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MessengerFrameComponent,
    SidebarHeaderComponent,
    ListComponent,
    ItemComponent,
    MessageComponent,
    LogginComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
