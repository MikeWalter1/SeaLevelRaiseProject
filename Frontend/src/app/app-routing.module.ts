import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AboutPageComponent } from './components/pages/inner-pages/about-page/about-page.component';
import { BlogDetailsPageComponent } from './components/pages/inner-pages/blog-details-page/blog-details-page.component';
import { BlogPageComponent } from './components/pages/inner-pages/blog-page/blog-page.component';
import { ContactPageComponent } from './components/pages/inner-pages/contact-page/contact-page.component';
import { FeatureDetailsPageComponent } from './components/pages/inner-pages/feature-details-page/feature-details-page.component';
import { FeaturesPageComponent } from './components/pages/inner-pages/features-page/features-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/inner-pages/privacy-policy-page/privacy-policy-page.component';
import { ProjectDetailsPageComponent } from './components/pages/inner-pages/project-details-page/project-details-page.component';
import { ProjectsPageComponent } from './components/pages/inner-pages/projects-page/projects-page.component';
import { TeamPageComponent } from './components/pages/inner-pages/team-page/team-page.component';
import { TermsConditionsPageComponent } from './components/pages/inner-pages/terms-conditions-page/terms-conditions-page.component';
import { DexOfferingComponent } from './components/pages/multi-page/dex-offering/dex-offering.component';
import { GamingMetaverseComponent } from './components/pages/multi-page/gaming-metaverse/gaming-metaverse.component';
import { LandSellingPlatformComponent } from './components/pages/multi-page/land-selling-platform/land-selling-platform.component';
import { MetavarseLaunchpadComponent } from './components/pages/multi-page/metavarse-launchpad/metavarse-launchpad.component';
import { NftCentricMetaverseComponent } from './components/pages/multi-page/nft-centric-metaverse/nft-centric-metaverse.component';
import { DexOfferingLandingComponent } from './components/pages/single-page/dex-offering-landing/dex-offering-landing.component';
import { GamingMetaverseLandingComponent } from './components/pages/single-page/gaming-metaverse-landing/gaming-metaverse-landing.component';
import { LandSellingPlatformLandingComponent } from './components/pages/single-page/land-selling-platform-landing/land-selling-platform-landing.component';
import { MetavarseLaunchpadLandingComponent } from './components/pages/single-page/metavarse-launchpad-landing/metavarse-launchpad-landing.component';
import { NftCentricMetaverseLandingComponent } from './components/pages/single-page/nft-centric-metaverse-landing/nft-centric-metaverse-landing.component';
import { ContractInteractionComponent } from './components/common/contract-interaction/contract-interaction.component';
import { WalletConnectComponent } from './components/common/wallet-connect/wallet-connect.component';
import { CreateOrganizationComponent } from './components/pages/inner-pages/create-organization/create-organization.component';
import { CreateProjectComponent } from './components/pages/inner-pages/create-project/create-project.component';
import { OrganizationsOverviewComponent } from './components/pages/inner-pages/organizations-overview/organizations-overview.component';

const routes: Routes = [

    // Multi-page
    {path: '', component: GamingMetaverseComponent},
    // {path: '', component: MetavarseLaunchpadComponent},
    {path: 'index-2', component: DexOfferingComponent},
    {path: 'index-3', component: GamingMetaverseComponent},
    {path: 'index-4', component: NftCentricMetaverseComponent},
    {path: 'index-5', component: LandSellingPlatformComponent},

    // Single Page
    // {path: 'metavarse-launchpad', component: MetavarseLaunchpadLandingComponent},
    // {path: 'dex-offering', component: DexOfferingLandingComponent},
    // {path: 'gaming-metaverse', component: GamingMetaverseLandingComponent},
    // {path: 'nft-centric-metaverse', component: NftCentricMetaverseLandingComponent},
    // {path: 'land-selling-platform', component: LandSellingPlatformLandingComponent},

    // Inner Pages
    {path: 'about-us', component: AboutPageComponent},
    {path: 'team', component: TeamPageComponent},
    {path: 'features', component: FeaturesPageComponent},
    {path: 'feature-details', component: FeatureDetailsPageComponent},
    {path: 'projects', component: ProjectsPageComponent},
    {path: 'project-details', component: ProjectDetailsPageComponent},
    {path: 'blog', component: BlogPageComponent},
    {path: 'blog-details', component: BlogDetailsPageComponent},
    {path: 'privacy-policy', component: PrivacyPolicyPageComponent},
    {path: 'terms-conditions', component: TermsConditionsPageComponent},
    {path: 'create-organization', component: CreateOrganizationComponent},
    {path: 'create-project', component: CreateProjectComponent},
    {path: 'organizations-overview', component: OrganizationsOverviewComponent},
    // {path: 'contact-us', component: ContactPageComponent},
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
