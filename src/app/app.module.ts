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
    CommentaireBlogComponent
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
