import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { ForumComponent } from './forum/forum.component';
import {FormsModule} from "@angular/forms";
import { ToastComponent } from './shared/toast/toast.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MiniatureTopicComponent } from './shared/miniature-topic/miniature-topic.component';
import { ProfilComponent } from './profil/profil.component';
import { SuggestionsTopicComponent } from './shared/suggestions-topic/suggestions-topic.component';
import { NewTopicComponent } from './new-topic/new-topic.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { TopicComponent } from './topic/topic.component';
import { PageLoadingComponent } from './shared/page-loading/page-loading.component';
import { CommentaireTopicComponent } from './shared/commentaire-topic/commentaire-topic.component';
import { BlogComponent } from './blog/blog.component';
import { MiniatureBlogComponent } from './shared/miniature-blog/miniature-blog.component';
import { ArticleComponent } from './article/article.component';
import { SuggestionsArticleComponent } from './shared/suggestions-article/suggestions-article.component';
import { CommentaireBlogComponent } from './shared/commentaire-blog/commentaire-blog.component';
import { PlanningToolsComponent } from './planning-tools/planning-tools.component';
import { MyEventsComponent } from './planning-tools/my-events/my-events.component';
import { MenuPlanningToolsComponent } from './shared/menu-planning-tools/menu-planning-tools.component';
import { ChecklistComponent } from './planning-tools/checklist/checklist.component';
import { VendorsManagerComponent } from './planning-tools/vendors-manager/vendors-manager.component';
import { GuestsListsComponent } from './planning-tools/guests-lists/guests-lists.component';
import { BudgetComponent } from './planning-tools/budget/budget.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { PaymentComponent } from './planning-tools/payment/payment.component';
import { WriteMessageComponent } from './shared/write-message/write-message.component';
import { MiniatureMessageComponent } from './shared/miniature-message/miniature-message.component';
import { RegisterVendorComponent } from './register-vendor/register-vendor.component';
import { MenuCompanyManagementComponent } from './shared/menu-company-management/menu-company-management.component';
import {ReactiveFormsModule} from "@angular/forms";
import { VenuesComponent } from './venues/venues.component';
import { BarreSearchComponent } from './shared/barre-search/barre-search.component';
import { ZoneResultatSearchComponent } from './shared/zone-resultat-search/zone-resultat-search.component';
import { MiniatureCompanyComponent } from './shared/miniature-company/miniature-company.component';
import { CompanyComponent } from './company/company.component';
import { MiniativeGiveNoticeComponent } from './shared/miniative-give-notice/miniative-give-notice.component';
import { AvisCompanyComponent } from './shared/avis-company/avis-company.component';
import { VendorsComponent } from './vendors/vendors.component';
import { SearchComponent } from './search/search.component';
import { EAdminComponent } from './e-admin/e-admin.component';
import { MiniatureProfilUserComponent } from './shared/miniature-profil-user/miniature-profil-user.component';
import { InformationsCompanyComponent } from './shared/informations-company/informations-company.component';
import { DashboardVendorComponent } from './planning-tools/dashboard-vendor/dashboard-vendor.component';
import { AccountVendorComponent } from './planning-tools/account-vendor/account-vendor.component';
import { ReviewVendorComponent } from './planning-tools/review-vendor/review-vendor.component';
import { MiniatureEventComponent } from './shared/miniature-event/miniature-event.component';
import { DashboardComponent } from './planning-tools/dashboard/dashboard.component';
import { VitrineVendorComponent } from './planning-tools/vitrine-vendor/vitrine-vendor.component';
import { BookingManagerComponent } from './planning-tools/booking-manager/booking-manager.component';
import {MiniatureAvatarUserComponent} from "./shared/miniature-avatar-user/miniature-avatar-user.component";
import { MiniatureNameUserComponent } from './shared/miniature-name-user/miniature-name-user.component';
import { FiltreComponent } from './shared/filtre/filtre.component';
import { MiniatureSlowIncrementNumberComponent } from './shared/miniature-slow-increment-number/miniature-slow-increment-number.component';
import { ConsoleInformationModelComponent } from './shared/console-information-model/console-information-model.component';
import { DataProtectionPolicyComponent } from './data-protection-policy/data-protection-policy.component';
import { UserTermsAndConditionsComponent } from './user-terms-and-conditions/user-terms-and-conditions.component';
import { FloatingActionButtonComponent } from './shared/floating-action-button/floating-action-button.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { VendorsAgreementWebsiteComponent } from './shared/vendors-agreement-website/vendors-agreement-website.component';

// Factory function required during AOT compilation
export function httpTranslateLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        FooterComponent,
        LoginCustomerComponent,
        RegisterCustomerComponent,
        ForumComponent,
        ToastComponent,
        PageNotFoundComponent,
        MiniatureTopicComponent,
        ProfilComponent,
        SuggestionsTopicComponent,
        NewTopicComponent,
        TopicComponent,
        PageLoadingComponent,
        CommentaireTopicComponent,
        BlogComponent,
        MiniatureBlogComponent,
        ArticleComponent,
        SuggestionsArticleComponent,
        CommentaireBlogComponent,
        PlanningToolsComponent,
        MyEventsComponent,
        MenuPlanningToolsComponent,
        ChecklistComponent,
        VendorsManagerComponent,
        GuestsListsComponent,
        BudgetComponent,
        MailboxComponent,
        PaymentComponent,
        WriteMessageComponent,
        MiniatureMessageComponent,
        RegisterVendorComponent,
        MenuCompanyManagementComponent,
        VenuesComponent,
        BarreSearchComponent,
        ZoneResultatSearchComponent,
        MiniatureCompanyComponent,
        CompanyComponent,
        MiniativeGiveNoticeComponent,
        AvisCompanyComponent,
        VendorsComponent,
        SearchComponent,
        EAdminComponent,
        MiniatureProfilUserComponent,
        InformationsCompanyComponent,
        DashboardVendorComponent,
        AccountVendorComponent,
        ReviewVendorComponent,
        MiniatureEventComponent,
        DashboardComponent,
        VitrineVendorComponent,
        BookingManagerComponent,
        MiniatureAvatarUserComponent,
        MiniatureAvatarUserComponent,
        MiniatureNameUserComponent,
        FiltreComponent,
        MiniatureSlowIncrementNumberComponent,
        ConsoleInformationModelComponent,
        DataProtectionPolicyComponent,
        UserTermsAndConditionsComponent,
        FloatingActionButtonComponent,
        VendorsAgreementWebsiteComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
      EditorModule,
      ReactiveFormsModule,
      HttpClientModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoaderFactory,
          deps: [HttpClient]
        }
      })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
