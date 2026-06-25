import Head from 'next/head';

const articles = [
  {
    slug: 'how-to-check-keyword-density',
    title: 'How to Check Keyword Density — A Beginner\'s Guide',
    icon: '🔍',
  },
  {
    slug: 'how-to-write-perfect-meta-description',
    title: 'How to Write a Perfect Meta Description That Gets Clicks',
    icon: '🏷️',
  },
  {
    slug: 'how-to-improve-website-speed-seo',
    title: 'How to Improve Website Speed for SEO — 10 Proven Tips',
    icon: '⚡',
  },
];

const tools = [
  {
    slug: 'keyword-density',
    title: 'Keyword Density Checker',
    description:
      'Analyze keyword frequency in any URL or text. Find over-optimized keywords and improve your SEO.',
    icon: '🔍',
    keywords: ['keyword density checker', 'check keyword density free', 'seo keyword analyzer'],
  },
  {
    slug: 'meta-generator',
    title: 'Meta Tag Generator',
    description:
      'Generate SEO-optimized title tags and meta descriptions from your topic. Preview how they appear in Google.',
    icon: '🏷️',
    keywords: ['meta tag generator', 'free meta tags', 'seo meta description generator'],
  },
  {
    slug: 'speed-checker',
    title: 'Website Speed Checker',
    description:
      'Test any URL against Google PageSpeed Insights. Get actionable performance recommendations.',
    icon: '⚡',
    keywords: ['website speed test', 'page speed checker', 'free pagespeed test'],
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Free SEO Tools — Keyword Density, Meta Tags, Speed Check</title>
        <meta
          name="description"
          content="Free online SEO tools: keyword density checker, meta tag generator, website speed test. No signup, instant results."
        />
        <meta
          name="keywords"
          content="free seo tools, keyword density checker, meta tag generator, website speed test, seo analyzer online"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seotoolspro.com/" />
        <meta property="og:title" content="Free SEO Tools — No Signup Required" />
        <meta
          property="og:description"
          content="Keyword density checker, meta tag generator, and website speed test. All free, no registration."
        />
        <meta property="og:type" content="website" />
      </Head>

      <main style={styles.main}>
        {/* Hero */}
        <section style={styles.hero}>
          <h1 style={styles.h1}>Free SEO Tools for Everyone</h1>
          <p style={styles.subtitle}>
            Keyword analysis, meta tag generation, speed testing — all free, no signup.
          </p>
        </section>

        {/* Tool Grid */}
        <section style={styles.grid}>
          {tools.map((tool) => (
            <a key={tool.slug} href={`/tools/${tool.slug}/`} style={styles.card}>
              <span style={styles.icon}>{tool.icon}</span>
              <h2 style={styles.cardTitle}>{tool.title}</h2>
              <p style={styles.cardDesc}>{tool.description}</p>
              <span style={styles.cta}>Try it free →</span>
            </a>
          ))}
        </section>

        {/* Features */}
        <section style={styles.features}>
          <h2 style={styles.sectionTitle}>Why Choose Our Tools</h2>
          <div style={styles.featureGrid}>
            {[
              {
                title: '100% Free',
                desc: 'No credit card, no registration. All tools work instantly in your browser.',
              },
              {
                title: 'Privacy First',
                desc: 'Everything runs client-side. We never store your URLs or content.',
              },
              {
                title: 'SEO Optimized',
                desc: 'Built by SEO practitioners. Every tool follows Google best practices.',
              },
              {
                title: 'Instant Results',
                desc: 'No waiting, no queue. Get your analysis in milliseconds.',
              },
            ].map((f) => (
              <div key={f.title} style={styles.featureCard}>
                <h3 style={styles.featureTitle}>{f.title}</h3>
                <p style={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Latest Articles */}
        <section style={styles.latestArticles}>
          <h2 style={styles.sectionTitle}>📝 Latest SEO Articles</h2>
          <div style={styles.articleGrid}>
            {articles.map((article) => (
              <a key={article.slug} href={`/blog/${article.slug}/`} style={styles.articleCard}>
                <span style={styles.articleIcon}>{article.icon}</span>
                <span style={styles.articleTitle}>{article.title}</span>
                <span style={styles.articleCta}>Read →</span>
              </a>
            ))}
          </div>
          <a href="/blog/" style={styles.viewAll}>View all articles →</a>
        </section>

        {/* AdSense Placeholder */}
        <section style={styles.adSection}>
          {/* Google AdSense — replace data-ad-client with your publisher ID */}
          {/*
          <ins className="adsbygoogle"
               style={{display:'block'}}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="1234567890"
               data-ad-format="auto"
               data-full-width-responsive="true" />
          <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
          */}
          <p style={styles.adPlaceholder}>— Ad Placement —</p>
        </section>

        <footer style={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} SEO Tools Pro. Built with Next.js. Deployed on
            Vercel.
          </p>
          <p style={styles.footerLinks}>
            <a href="/about/">About</a> &middot;{' '}
            <a href="mailto:contact@seotoolspro.com">Contact</a>
          </p>
        </footer>
      </main>
    </>
  );
}

const styles = {
  main: {
    maxWidth: 960,
    margin: '0 auto',
    padding: '20px 24px 60px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: '#1a1a2e',
    lineHeight: 1.6,
  },
  hero: {
    textAlign: 'center',
    padding: '60px 0 40px',
  },
  h1: {
    fontSize: '2.4rem',
    fontWeight: 800,
    margin: '0 0 12px',
    color: '#0f0f23',
  },
  subtitle: {
    fontSize: '1.15rem',
    color: '#555',
    maxWidth: 500,
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 24,
    padding: '20px 0 50px',
  },
  card: {
    display: 'block',
    padding: '32px 24px',
    borderRadius: 12,
    background: '#fff',
    border: '1px solid #eaeaea',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
  icon: {
    fontSize: '2rem',
    display: 'block',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: 700,
    margin: '0 0 8px',
  },
  cardDesc: {
    fontSize: '0.92rem',
    color: '#666',
    margin: '0 0 16px',
    lineHeight: 1.5,
  },
  cta: {
    color: '#2563eb',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  features: {
    padding: '40px 0',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 32,
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20,
  },
  featureCard: {
    padding: 24,
    borderRadius: 10,
    background: '#f8f9fc',
  },
  featureTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    marginBottom: 8,
  },
  featureDesc: {
    fontSize: '0.88rem',
    color: '#555',
    lineHeight: 1.5,
  },
  latestArticles: {
    padding: '40px 0',
  },
  articleGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 20,
  },
  articleCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '14px 20px',
    background: '#f8f9fc',
    borderRadius: 10,
    border: '1px solid #eaeaea',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'background 0.15s',
  },
  articleIcon: {
    fontSize: '1.3rem',
    flexShrink: 0,
  },
  articleTitle: {
    flex: 1,
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#1a1a2e',
    lineHeight: 1.3,
  },
  articleCta: {
    color: '#2563eb',
    fontWeight: 600,
    fontSize: '0.88rem',
    flexShrink: 0,
  },
  viewAll: {
    color: '#2563eb',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
  },
  adSection: {
    margin: '40px 0',
    padding: '60px 0',
    textAlign: 'center',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
  },
  adPlaceholder: {
    color: '#bbb',
    fontSize: '0.85rem',
  },
  footer: {
    textAlign: 'center',
    paddingTop: 40,
    borderTop: '1px solid #eee',
    fontSize: '0.85rem',
    color: '#888',
  },
  footerLinks: {
    marginTop: 8,
  },
};
