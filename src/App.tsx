import { content } from './content/content';
import { Preloader } from './components/Preloader';
import { SiteNav } from './components/SiteNav';
import { useSiteMotion } from './lib/useSiteMotion';
import { Hero, Intro, Skills, ToolsAndAwards } from './sections/IdentitySections';
import { Campaigns, SelectedWork, SocialPages, LandingAndPosters } from './sections/WorkSections';
import { ContactSection } from './sections/ContactSection';

export default function App() {
  useSiteMotion();

  return (
    <>
      <Preloader brand={content.brand} />
      <a className="skip-link" href="#main">{content.navigation.skipLabel}</a>
      <SiteNav data={content.navigation} brand={content.brand} />
      <main id="main">
        <Hero data={content.hero} brand={content.brand} />
        <Intro data={content.intro} brand={content.brand} externalLinkLabel={content.accessibility.externalLink} />
        <Skills data={content.skills} />
        <ToolsAndAwards data={content.toolsAndAwards} />
        <Campaigns data={content.campaigns} />
        <SelectedWork data={content.work} externalLinkLabel={content.accessibility.externalLink} />
        <SocialPages data={content.social} />
        <LandingAndPosters data={content.landing} externalLinkLabel={content.accessibility.externalLink} />
        <ContactSection data={content.contact} brand={content.brand} externalLinkLabel={content.accessibility.externalLink} />
      </main>
    </>
  );
}
