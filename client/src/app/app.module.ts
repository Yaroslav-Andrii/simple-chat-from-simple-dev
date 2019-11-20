// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Router
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';
import { ChatService } from './shared/chat.service';

// Interceptors
import { AuthInterceptors } from './shared/auth-interceptors.service';

/* Components */

// # Main
import { AppComponent } from './app.component';

// # Login and registration
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// # Chat
import { ChatComponent } from './chat/chat.component';

// &: Sidebar
import { SidebarComponent } from './chat/sidebar/sidebar.component';
import { SidebarHeaderComponent } from './chat/sidebar/sidebar-header/sidebar-header.component';
import { ListComponent } from './chat/sidebar/list/list.component';
import { ItemComponent } from './chat/sidebar/list/item/item.component';

// &: Messages frame
import { MessengerFrameComponent } from './chat/messenger-frame/messenger-frame.component';
import { MessageComponent } from './chat/messenger-frame/message/message.component';

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
