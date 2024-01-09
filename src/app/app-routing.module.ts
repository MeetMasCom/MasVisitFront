import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { AdminMembershipComponent } from './admin/components/admin-membership/admin-membership.component';
import { AdminRechargsComponent } from './admin/components/admin-rechargs/admin-rechargs.component';
import { AdminRetreatComponent } from './admin/components/admin-retreat/admin-retreat.component';
import { AdminUsersComponent } from './admin/components/admin-users/admin-users.component';
import { AdminsComponent } from './admin/components/admins/admins.component';
import { CategoriasComponent } from './admin/components/categorias/categorias.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { FeedbackComponent } from './admin/components/feedback/feedback.component';
import { ProfessionsComponent } from './admin/components/professions/professions.component';
import { ProfilesComponent } from './admin/components/profiles/profiles.component';
import { SocialUserComponent } from './admin/components/social-user/social-user.component';
import { WalletCompanyComponent } from './admin/components/wallet-company/wallet-company.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { BalanceComponent } from './finance/components/balance/balance.component';
import { HomeComponent } from './profile/components/home/home.component';
import { LikesComponent } from './profile/components/likes/likes.component';
import { MyProfileComponent } from './profile/components/my-profile/my-profile.component';
import { PrivacyComponent } from './profile/components/privacy/privacy.component';
import { UserProfileComponent } from './profile/components/user-profile/user-profile.component';
import { UserDataComponent } from './user/components/user-data/user-data.component';
import { AdminLayoutComponent } from './layouts/components/admin-layout/admin-layout.component';
import { BilleteraComponent } from './billetera/components/billetera/billetera.component';
import { BilleteraEmpresaComponent } from './billetera/components/billetera-empresa/billetera-empresa.component';
import { UpdateBilleteraEComponent } from './billetera/components/update-billetera-e/update-billetera-e.component';

import { InstagramComponent } from './redes_sociales/components/instagram/instagram.component';
import { ApisComponent } from './admin/components/apis/apis.component';
import { PlanningComponent } from './redes_sociales/components/planning/planning.component';

import { CallbackInstagramComponent } from './redes_sociales/components/callback-instagram/callback-instagram.component';
import { AddPublicationComponent } from './redes_sociales/components/add-publication/add-publication.component';

import { MyPostComponent } from './post/components/my-post/my-post.component';
import {MarcasComponent} from './redes_sociales/components/marcas/marcas.component';
import {AnaliticaComponent} from './redes_sociales/components/analitica/analitica.component';
import { FeesComponent } from './shared/components/fees/fees.component';
import { PoliticsComponent } from './shared/components/politics/politics.component';
import { AgreementsComponent } from './shared/components/agreements/agreements.component';
import { LinkComponent } from './redes_sociales/components/link/link.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dataUser', component: UserDataComponent },
  { path: 'dataUser/:estado', component: UserDataComponent },

  //admin
  { path: 'admin', component: AdminLayoutComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'administradores', component: AdminsComponent },
  { path: 'billeteraE', component: WalletCompanyComponent },
  { path: 'membresias', component: AdminMembershipComponent },
  { path: 'recargasE', component: AdminRechargsComponent },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'userSocials', component: SocialUserComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'options/:code', component: ProfessionsComponent },
  { path: 'retirosE', component: AdminRetreatComponent },
  { path: 'supUsers', component: AdminUsersComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'apis', component: ApisComponent },

  //billetera
  { path: 'myBilletera', component: BilleteraComponent },

  { path: 'billetera', component: BilleteraEmpresaComponent },
  { path: 'updateBilletera/:id', component: UpdateBilleteraEComponent },

  { path: 'myProfile', component: MyProfileComponent },
  { path: 'userProfile', component: UserProfileComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'match', component: LikesComponent },

  { path: 'finanzas', component: BalanceComponent },

  //redes sociales
  { path: 'instagram', component: InstagramComponent },
  { path: 'callbackInstagram', component: CallbackInstagramComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'addPublication', component: AddPublicationComponent },
  { path: 'post', component: MyPostComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'analitica', component: AnaliticaComponent },

  { path: 'link', component: LinkComponent },  
  { path: 'fees', component: FeesComponent },
  { path: 'politicas', component: PoliticsComponent },
  { path: 'acuerdo', component: AgreementsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
