import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {BlogComponent} from "./pages/blog/blog.component";
import {BlogDetailComponent} from "./pages/blog/blog-detail/blog-detail.component";
import {ForumComponent} from "./pages/forum/forum.component";
import {NewTopicComponent} from "./pages/forum/new-topic/new-topic.component";
import {PlanningToolsComponent} from "./pages/planning-tools/planning-tools.component";
import {GuestsListComponent} from "./pages/planning-tools/guests-list/guests-list.component";
import {ChecklistPageComponent} from "./pages/planning-tools/checklist-page/checklist-page.component";
import {VendorManagerComponent} from "./pages/planning-tools/vendor-manager/vendor-manager.component";
import {BudgetComponent} from "./pages/planning-tools/budget/budget.component";
import {VendorsComponent} from "./pages/vendors/vendors.component";
import {VenuesComponent} from "./pages/venues/venues.component";
import {VendorDetailComponent} from "./pages/vendors/vendor-detail/vendor-detail.component";
import {MyEventsComponent} from "./pages/planning-tools/my-events/my-events.component";
import {RedirectGuardService} from "./services/redirect-guard.service";
import {MessagesComponent} from "./pages/planning-tools/messages/messages.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', canActivate: [RedirectGuardService], component: LoginComponent },
  { path: 'register', canActivate: [RedirectGuardService], component: RegisterComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog-detail/:id', component: BlogDetailComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'forum/new-topic', component: NewTopicComponent },
  { path: 'planning-tools', component: PlanningToolsComponent },
  { path: 'guests-list', canActivate: [AuthGuardService], component: GuestsListComponent },
  { path: 'check-list-page', canActivate: [AuthGuardService], component: ChecklistPageComponent },
  { path: 'vendor-manager', canActivate: [AuthGuardService], component: VendorManagerComponent },
  { path: 'budget', canActivate: [AuthGuardService], component: BudgetComponent },
  { path: 'my-events', canActivate: [AuthGuardService], component: MyEventsComponent },
  { path: 'vendors', canActivate: [AuthGuardService], component: VendorsComponent },
  { path: 'venues', component: VenuesComponent },
  { path: 'vendors/vendor-detail/:id', canActivate: [AuthGuardService], component: VendorDetailComponent },
  { path: 'messages', canActivate: [AuthGuardService], component: MessagesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
