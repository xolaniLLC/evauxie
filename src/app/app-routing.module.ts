import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginCustomerComponent} from "./login-customer/login-customer.component";
import {RegisterCustomerComponent} from "./register-customer/register-customer.component";
import {RedirectGuardService} from "./services/redirect-guard.service";
import {ForumComponent} from "./forum/forum.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ProfilComponent} from "./profil/profil.component";
import {NewTopicComponent} from "./new-topic/new-topic.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {TopicComponent} from "./topic/topic.component";
import {BlogComponent} from "./blog/blog.component";
import {ArticleComponent} from "./article/article.component";
import {PlanningToolsComponent} from "./planning-tools/planning-tools.component";
import {MyEventsComponent} from "./planning-tools/my-events/my-events.component";
import {ChecklistComponent} from "./planning-tools/checklist/checklist.component";
import {VendorsManagerComponent} from "./planning-tools/vendors-manager/vendors-manager.component";
import {GuestsListsComponent} from "./planning-tools/guests-lists/guests-lists.component";
import {BudgetComponent} from "./planning-tools/budget/budget.component";
import {MailboxComponent} from "./mailbox/mailbox.component";
import {PaymentComponent} from "./planning-tools/payment/payment.component";
import {ApercuMailComponent} from "./mailbox/apercu-mail/apercu-mail.component";
import {RegisterVendorComponent} from "./register-vendor/register-vendor.component";
import {VenuesComponent} from "./venues/venues.component";
import {CompanyComponent} from "./company/company.component";
import {VendorsComponent} from "./vendors/vendors.component";
import {SearchComponent} from "./search/search.component";
import {EAdminComponent} from "./e-admin/e-admin.component";
import {DashboardVendorComponent} from "./planning-tools/dashboard-vendor/dashboard-vendor.component";
import {ReviewVendorComponent} from "./planning-tools/review-vendor/review-vendor.component";
import {DashboardComponent} from "./planning-tools/dashboard/dashboard.component";
import {VitrineVendorComponent} from "./planning-tools/vitrine-vendor/vitrine-vendor.component";
import {AccountVendorComponent} from "./planning-tools/account-vendor/account-vendor.component";
import {BookingManagerComponent} from "./planning-tools/booking-manager/booking-manager.component";
import {DataProtectionPolicyComponent} from "./data-protection-policy/data-protection-policy.component";
import {UserTermsAndConditionsComponent} from "./user-terms-and-conditions/user-terms-and-conditions.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login-customer', canActivate: [RedirectGuardService], component: LoginCustomerComponent },
  { path: 'register-customer', canActivate: [RedirectGuardService], component: RegisterCustomerComponent },
  { path: 'register-vendor', canActivate: [RedirectGuardService], component: RegisterVendorComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'blogs-posts', component: BlogComponent },
  { path: 'article/:id', component: ArticleComponent },
  { path: 'profil/:id', component: ProfilComponent },
  { path: 'mailbox', canActivate: [AuthGuardService], component: MailboxComponent },
  { path: 'mailbox/:id', canActivate: [AuthGuardService], component: ApercuMailComponent },
  { path: 'company/:id', component: CompanyComponent },
  { path: 'planning-tools', component: PlanningToolsComponent },
  { path: 'planning-tools/dashboard', canActivate: [AuthGuardService], component: DashboardComponent },
  { path: 'planning-tools/my-events', canActivate: [AuthGuardService], component: MyEventsComponent },
  { path: 'planning-tools/checklist', canActivate: [AuthGuardService], component: ChecklistComponent },
  { path: 'planning-tools/vendors-manager', canActivate: [AuthGuardService], component: VendorsManagerComponent },
  { path: 'planning-tools/guests-lists', canActivate: [AuthGuardService], component: GuestsListsComponent },
  { path: 'planning-tools/budget', canActivate: [AuthGuardService], component: BudgetComponent },
  { path: 'planning-tools/payment', canActivate: [AuthGuardService], component: PaymentComponent },
  { path: 'planning-tools/dashboard-vendor', canActivate: [AuthGuardService], component: DashboardVendorComponent },
  { path: 'planning-tools/my-showcase', canActivate: [AuthGuardService], component: VitrineVendorComponent },
  { path: 'planning-tools/review-vendor', canActivate: [AuthGuardService], component: ReviewVendorComponent },
  { path: 'planning-tools/account-vendor', canActivate: [AuthGuardService], component: AccountVendorComponent },
  { path: 'planning-tools/booking-manager', canActivate: [AuthGuardService], component: BookingManagerComponent },
  { path: 'new-topic', canActivate: [AuthGuardService], component: NewTopicComponent },
  { path: 'topic/:id', component: TopicComponent },
  { path: 'venues', component: VenuesComponent },
  { path: 'vendors', component: VendorsComponent },
  { path: 'search', component: SearchComponent },
  { path: 'data-protection-policy', component: DataProtectionPolicyComponent },
  { path: 'user-terms-and-conditions', component: UserTermsAndConditionsComponent },
  { path: 'e-admin', canActivate: [AuthGuardService], component: EAdminComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
