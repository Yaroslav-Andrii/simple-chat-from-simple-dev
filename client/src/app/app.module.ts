import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MessengerFrameComponent } from './messenger-frame/messenger-frame.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { ListComponent } from './sidebar/list/list.component';
import { ItemComponent } from './sidebar/list/item/item.component';
import { MessageComponent } from './messenger-frame/message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from './shared/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptors } from './shared/auth-interceptors.service';
import { UserService } from './shared/user.service';
import { ChatService } from './shared/chat.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MessengerFrameComponent,
    SidebarHeaderComponent,
    ListComponent,
    ItemComponent,
    MessageComponent,
    LoginComponent,
    RegisterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    UserService,
    ChatService,
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptors,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
