import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { RoomComponent } from './components/room/room.component';
import { MessageComponent } from './components/message/message.component';
import { ModalComponent } from './components/modal/modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { ExtraFeaturesComponent } from './components/extra-features/extra-features.component';

import { UserService} from './services/user.service';
import { MessageService} from './services/message.service';
import { RoomService} from './services/room.service';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RoomComponent,
    MessageComponent,
    ModalComponent,
    NavbarComponent,
    SidePanelComponent,
    ExtraFeaturesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    MessageService,
    RoomService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
