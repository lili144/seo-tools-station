import Head from 'next/head';

const articles = [
  {
    slug: 'how-to-check-keyword-density',
    title: 'How to Check Keyword Density — A Beginner\'s Guide',
    excerpt:
      'Learn how to analyze keyword density in your content, avoid keyword stuffing, and find the ideal density range. Free tool included.',
    date: '2026-06-25',
    readTime: '5 min read',
    icon: '🔍',
    tags: ['keyword density', 'on-page SEO', 'content optimization'],
  },
  {
    slug: 'how-to-write-perfect-meta-description',
    title: 'How to Write a Perfect Meta Description That Gets Clicks',
    excerpt:
      'Master the art of writing meta descriptions that boost CTR. Learn ideal length, proven formulas, and common mistakes to avoid.',
    date: '2026-06-25',
    readTime: '5 min read',
    icon: '🏷️',
    tags: ['meta description', 'SERP optimization', 'CTR'],
  },
  {
    slug: 'how-to-improve-website-speed-seo',
    title: 'How to Improve Website Speed for SEO — 10 Proven Tips',
    excerpt:
      'Page speed is a confirmed Google ranking factor. Learn 10 actionable ways to speed up your site and pass Core Web Vitals.',
    date: '2026-06-25',
    readTime: '6 min read',
    icon: '⚡',
    tags: ['page speed', 'Core Web Vitals', 'performance optimization'],
  },
];

export default function BlogIndex() {
  return (
    <>
      <Head>
        <title>SEO Blog — Free Tutorials, Tips & Guides | SEO Tools Pro</title>
        <meta
          name="description"
          content="Free SEO tutorials and guides. Learn keyword density analysis, meta description writing, website speed optimization, and more. Practical tips for beginners."
        />
        <meta
          name="keywords"
          content="SEO blog, SEO tutorials, keyword density, meta description, website speed, SEO tips, SEO guide"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seo-tools-station.vercel.app/blog/" />
        <meta property="og:title" content="SEO Blog — Free Tutorials & Guides" />
        <meta
          property="og:description"
          content="Practical SEO tutorials for beginners. Learn keyword density, meta descriptions, and speed optimization."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              name: 'SEO Tools Pro Blog',
              url: 'https://seo-tools-station.vercel.app/blog/',
              description: 'Free SEO tutorials and practical guides for beginners and professionals.',
              blogPost: articles.map((a) => ({
                '@type': 'BlogPosting',
                headline: a.title,
                url: `https://seo-tools-station.vercel.app/blog/${a.slug}/`,
                datePublished: a.date,
                abstract: a.excerpt,
              })),
            }),
          }}
        />
      </Head>

      <main style={styles.main}>
        <a href="/" style={styles.back}>
          ← Back to all tools
        </a>

        <section style={styles.hero}>
          <h1 style={styles.h1}>SEO Blog</h1>
          <p style={styles.subtitle}>
            Practical SEO tutorials and guides. No fluff — just actionable tips you can use today.
          </p>
        </section>

        <section style={styles.grid}>
          {articles.map((article) => (
            <a key={article.slug} href={`/blog/${article.slug}/`} style={styles.card}>
              <span style={styles.icon}>{article.icon}</span>
              <div style={styles.cardMeta}>
                <span style={styles.date}>{article.date}</span>
                <span style={styles.dot}>·</span>
                <span style={styles.readTime}>{article.readTime}</span>
              </div>
              <h2 style={styles.cardTitle}>{article.title}</h2>
              <p style={styles.cardDesc}>{article.excerpt}</p>
              <div style={styles.tags}>
                {article.tags.map((tag) => (
                  <span key={tag} style={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span style={styles.cta}>Read article →</span>
            </a>
          ))}
        </section>

        <section style={styles.adSection}>
          <p style={styles.adPlaceholder}>— Ad Placement —</p>
        </section>

        <footer style={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} SEO Tools Pro. Built with Next.js. Deployed on Vercel.
          </p>
        </footer>
      </main>
    </>
  );
}

const styles = {
  main: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '20px 24px 60px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    color: '#1a1a2e',
    lineHeight: 1.6,
  },
  back: {
    color: '#2563eb',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    display: 'inline-block',
    marginBottom: 16,
  },
  hero: {
    padding: '30px 0 20px',
  },
  h1: {
    fontSize: '2.2rem',
    fontWeight: 800,
    margin: '0 0 8px',
    color: '#0f0f23',
  },
  subtitle: {
    fontSize: '1.05rem',
    color: '#555',
    maxWidth: 500,
  },
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    padding: '20px 0 50px',
  },
  card: {
    display: 'block',
    padding: '28px 24px',
    borderRadius: 12,
    background: '#fff',
    border: '1px solid #eaeaea',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
  icon: {
    fontSize: '1.8rem',
    display: 'block',
    marginBottom: 8,
  },
  cardMeta: {
    fontSize: '0.82rem',
    color: '#888',
    marginBottom: 8,
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  date: {},
  dot: {},
  readTime: {},
  cardTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    margin: '0 0 8px',
    color: '#1a1a2e',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: '#666',
    margin: '0 0 14px',
    lineHeight: 1.5,
  },
  tags: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  tag: {
    display: 'inline-block',
    padding: '3px 10px',
    background: '#f0f4ff',
    color: '#2563eb',
    borderRadius: 6,
    fontSize: '0.78rem',
    fontWeight: 500,
  },
  cta: {
    color: '#2563eb',
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  adSection: {
    margin: '20px 0',
    padding: '60px 0',
    textAlign: 'center',
    borderTop: '1px solid #eee',
    borderBottom: '1px solid #eee',
  },
  adPlaceholder: { color: '#bbb', fontSize: '0.85rem' },
  footer: {
    textAlign: 'center',
    paddingTop: 30,
    fontSize: '0.85rem',
    color: '#888',
  },
};
