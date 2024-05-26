import { NgModule } from '@angular/core';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetavarseLaunchpadLandingComponent } from './components/pages/single-page/metavarse-launchpad-landing/metavarse-launchpad-landing.component';
import { MetavarseLaunchpadComponent } from './components/pages/multi-page/metavarse-launchpad/metavarse-launchpad.component';
import { DexOfferingLandingComponent } from './components/pages/single-page/dex-offering-landing/dex-offering-landing.component';
import { DexOfferingComponent } from './components/pages/multi-page/dex-offering/dex-offering.component';
import { GamingMetaverseLandingComponent } from './components/pages/single-page/gaming-metaverse-landing/gaming-metaverse-landing.component';
import { GamingMetaverseComponent } from './components/pages/multi-page/gaming-metaverse/gaming-metaverse.component';
import { NftCentricMetaverseLandingComponent } from './components/pages/single-page/nft-centric-metaverse-landing/nft-centric-metaverse-landing.component';
import { NftCentricMetaverseComponent } from './components/pages/multi-page/nft-centric-metaverse/nft-centric-metaverse.component';
import { LandSellingPlatformLandingComponent } from './components/pages/single-page/land-selling-platform-landing/land-selling-platform-landing.component';
import { LandSellingPlatformComponent } from './components/pages/multi-page/land-selling-platform/land-selling-platform.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { MetavarseLaunchpadBannerComponent } from './components/common/metavarse-launchpad-banner/metavarse-launchpad-banner.component';
import { KeyFeaturesComponent } from './components/common/key-features/key-features.component';
import { HowItWorksComponent } from './components/common/how-it-works/how-it-works.component';
import { PartnerComponent } from './components/common/partner/partner.component';
import { WhatWillGetComponent } from './components/common/what-will-get/what-will-get.component';
import { AboutUsComponent } from './components/common/about-us/about-us.component';
import { EarnRewardsComponent } from './components/common/earn-rewards/earn-rewards.component';
import { ProjectsComponent } from './components/common/projects/projects.component';
import { RoadmapComponent } from './components/common/roadmap/roadmap.component';
import { TokenInfoComponent } from './components/common/token-info/token-info.component';
import { DexOfferingBannerComponent } from './components/common/dex-offering-banner/dex-offering-banner.component';
import { TeamComponent } from './components/common/team/team.component';
import { GamingMetaverseBannerComponent } from './components/common/gaming-metaverse-banner/gaming-metaverse-banner.component';
import { FeaturedAuctionComponent } from './components/common/featured-auction/featured-auction.component';
import { NewsArticlesComponent } from './components/common/news-articles/news-articles.component';
import { EcosystemComponent } from './components/common/ecosystem/ecosystem.component';
import { NftCentricMetaverseBannerComponent } from './components/common/nft-centric-metaverse-banner/nft-centric-metaverse-banner.component';
import { VideoPresentationComponent } from './components/common/video-presentation/video-presentation.component';
import { StatisticsComponent } from './components/common/statistics/statistics.component';
import { LandSellingPlatformBannerComponent } from './components/common/land-selling-platform-banner/land-selling-platform-banner.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { AboutPageComponent } from './components/pages/inner-pages/about-page/about-page.component';
import { FeatureDetailsPageComponent } from './components/pages/inner-pages/feature-details-page/feature-details-page.component';
import { FeaturesPageComponent } from './components/pages/inner-pages/features-page/features-page.component';
import { BlogPageComponent } from './components/pages/inner-pages/blog-page/blog-page.component';
import { BlogDetailsPageComponent } from './components/pages/inner-pages/blog-details-page/blog-details-page.component';
import { ContactPageComponent } from './components/pages/inner-pages/contact-page/contact-page.component';
import { PrivacyPolicyPageComponent } from './components/pages/inner-pages/privacy-policy-page/privacy-policy-page.component';
import { TermsConditionsPageComponent } from './components/pages/inner-pages/terms-conditions-page/terms-conditions-page.component';
import { ProjectsPageComponent } from './components/pages/inner-pages/projects-page/projects-page.component';
import { ProjectDetailsPageComponent } from './components/pages/inner-pages/project-details-page/project-details-page.component';
import { MultipageNavbarComponent } from './components/common/multipage-navbar/multipage-navbar.component';
import { TeamPageComponent } from './components/pages/inner-pages/team-page/team-page.component';
import { OnepageNavbarComponent } from './components/common/onepage-navbar/onepage-navbar.component';
import { ContractInteractionComponent } from './components/common/contract-interaction/contract-interaction.component';
import { HttpClientModule } from '@angular/common/http';
import { WalletConnectComponent } from './components/common/wallet-connect/wallet-connect.component';
import { CreateOrganizationComponent } from './components/pages/inner-pages/create-organization/create-organization.component';
import { FormsModule } from '@angular/forms';
import { ProjectListitemComponent } from './components/common/project-listitem/project-listitem.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CreateProjectComponent } from './components/pages/inner-pages/create-project/create-project.component';
import { OrganizationsOverviewComponent } from './components/pages/inner-pages/organizations-overview/organizations-overview.component';
import { OrganizationListitemComponent } from './components/common/organization-listitem/organization-listitem.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { WalletLoginComponent } from './components/pages/inner-pages/wallet-login/wallet-login.component';

@NgModule({
    declarations: [
        AppComponent,
        MetavarseLaunchpadLandingComponent,
        MetavarseLaunchpadComponent,
        DexOfferingLandingComponent,
        DexOfferingComponent,
        GamingMetaverseLandingComponent,
        GamingMetaverseComponent,
        NftCentricMetaverseLandingComponent,
        NftCentricMetaverseComponent,
        LandSellingPlatformLandingComponent,
        LandSellingPlatformComponent,
        FooterComponent,
        MetavarseLaunchpadBannerComponent,
        KeyFeaturesComponent,
        HowItWorksComponent,
        PartnerComponent,
        WhatWillGetComponent,
        AboutUsComponent,
        EarnRewardsComponent,
        ProjectsComponent,
        RoadmapComponent,
        TokenInfoComponent,
        DexOfferingBannerComponent,
        TeamComponent,
        GamingMetaverseBannerComponent,
        FeaturedAuctionComponent,
        NewsArticlesComponent,
        EcosystemComponent,
        NftCentricMetaverseBannerComponent,
        VideoPresentationComponent,
        StatisticsComponent,
        LandSellingPlatformBannerComponent,
        NotFoundComponent,
        AboutPageComponent,
        FeatureDetailsPageComponent,
        FeaturesPageComponent,
        BlogPageComponent,
        BlogDetailsPageComponent,
        ContactPageComponent,
        PrivacyPolicyPageComponent,
        TermsConditionsPageComponent,
        ProjectsPageComponent,
        ProjectDetailsPageComponent,
        MultipageNavbarComponent,
        TeamPageComponent,
        OnepageNavbarComponent,
        ContractInteractionComponent,
        WalletConnectComponent,
        CreateOrganizationComponent,
        ProjectListitemComponent,
        CreateProjectComponent,
        OrganizationsOverviewComponent,
        OrganizationListitemComponent,
        WalletLoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CarouselModule,
        NgxScrollTopModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        MatFormFieldModule,
        MatSelectModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
