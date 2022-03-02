import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './composants/header/header.component';
import { FooterComponent } from './composants/footer/footer.component';
import { BlogComponent } from './pages/blog/blog.component';
import { MiniatureBlogComponent } from './composants/miniature-blog/miniature-blog.component';
import { BlogDetailComponent } from './pages/blog/blog-detail/blog-detail.component';
import { ForumComponent } from './pages/forum/forum.component';
import { MiniatureTopicComponent } from './composants/miniature-topic/miniature-topic.component';
import { NewTopicComponent } from './pages/forum/new-topic/new-topic.component';
import { DetailForumComponent } from './forum/detail-forum/detail-forum.component';

import { EditorModule } from '@tinymce/tinymce-angular';
import {PlanningToolsComponent} from "./pages/planning-tools/planning-tools.component";
import { GuestsListComponent } from './pages/planning-tools/guests-list/guests-list.component';
import { ChecklistPageComponent } from './pages/planning-tools/checklist-page/checklist-page.component';
import { VendorManagerComponent } from './pages/planning-tools/vendor-manager/vendor-manager.component';
import { BudgetComponent } from './pages/planning-tools/budget/budget.component';
import { VendorsComponent } from './pages/vendors/vendors.component';
import { VenuesComponent } from './pages/venues/venues.component';
import { VendorDetailComponent } from './pages/vendors/vendor-detail/vendor-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    MiniatureBlogComponent,
    BlogDetailComponent,
    ForumComponent,
    MiniatureTopicComponent,
    NewTopicComponent,
    DetailForumComponent,
    PlanningToolsComponent,
    GuestsListComponent,
    ChecklistPageComponent,
    VendorManagerComponent,
    BudgetComponent,
    VendorsComponent,
    VenuesComponent,
    VendorDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
