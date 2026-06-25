import Head from 'next/head';
import { useState, useCallback } from 'react';

function generateMeta(topic) {
  const clean = topic.trim();
  if (!clean) return null;

  // Title templates
  const titleTemplates = [
    `${clean} — Free Online Tool & Guide [${new Date().getFullYear()}]`,
    `${clean}: The Complete Guide for Beginners`,
    `Best ${clean} — Top Tips, Tools & Strategies`,
    `${clean} Made Easy — Step-by-Step Tutorial`,
    `Ultimate ${clean} Guide — Expert Tips & Free Tools`,
  ];

  // Description templates
  const descTemplates = [
    `Looking for ${clean}? Our free tool helps you get started instantly. No signup required. Learn the best practices for ${clean} in ${new Date().getFullYear()}.`,
    `Master ${clean} with our free online tool and expert guide. Get actionable tips, best practices, and step-by-step instructions for ${clean}.`,
    `${clean} explained in simple terms. Use our free tool to generate optimized ${clean} content. Perfect for beginners and experts alike.`,
  ];

  const title = titleTemplates[Math.floor(Math.random() * titleTemplates.length)];
  const desc = descTemplates[Math.floor(Math.random() * descTemplates.length)];

  // Also generate a concise version for SERP preview
  const serpTitle = clean.length > 55 ? clean.slice(0, 52) + '...' : clean + ' — Free Tool & Guide';
  const serpDesc = `Discover the best ${clean} strategies and tools. Our free ${clean} checker gives instant results — no signup needed. Optimize your content now.`;

  return {
    title,
    description: desc,
    keywords: clean
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 2)
      .join(', '),
    serpTitle: serpTitle.slice(0, 60),
    serpDesc: serpDesc.slice(0, 160),
    serpUrl: `https://seotoolspro.com/tools/${clean.toLowerCase().replace(/\s+/g, '-')}/`,
    robots: 'index, follow',
  };
}

const TIPS = [
  {
    title: 'Title Tag',
    range: '50–60 characters',
    advice:
      'Keep your title tag between 50 and 60 characters. Google truncates longer titles in search results. Put your primary keyword near the beginning.',
  },
  {
    title: 'Meta Description',
    range: '150–160 characters',
    advice:
      'Aim for 150–160 characters. Write a compelling summary that makes users want to click. Include your primary keyword naturally.',
  },
  {
    title: 'Keywords',
    range: '5–10 relevant terms',
    advice:
      'While the meta keywords tag is no longer used for ranking, it helps organize your content strategy. Focus on user intent, not keyword stuffing.',
  },
];

export default function MetaGeneratorTool() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);
  const [templateIdx, setTemplateIdx] = useState(0);

  const handleGenerate = useCallback(() => {
    if (!topic.trim()) return;
    const meta = generateMeta(topic);
    if (meta) {
      setResult(meta);
      setTemplateIdx((prev) => (prev + 1) % 5);
    }
  }, [topic]);

  const handleSample = () => {
    setTopic('keyword research');
    setResult(generateMeta('keyword research'));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGenerate();
  };

  return (
    <>
      <Head>
        <title>Free Meta Tag Generator — SEO Title & Description Preview</title>
        <meta
          name="description"
          content="Generate SEO-optimized title tags and meta descriptions. Preview how your page will look in Google search results. Free, instant, no signup."
        />
        <meta
          name="keywords"
          content="meta tag generator, free meta tags, seo title generator, meta description generator, google serp preview"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seotoolspro.com/tools/meta-generator/" />
        <meta property="og:title" content="Free Meta Tag Generator — SERP Preview" />
        <meta
          property="og:description"
          content="Generate optimized title tags and meta descriptions. Preview your Google listing instantly."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Meta Tag Generator',
              url: 'https://seotoolspro.com/tools/meta-generator/',
              applicationCategory: 'SEO Tool',
              operatingSystem: 'All',
              description:
                'Free online tool to generate SEO-optimized title tags and meta descriptions with live SERP preview.',
            }),
          }}
        />
      </Head>

      <main style={styles.main}>
        <a href="/" style={styles.back}>
          ← Back to all tools
        </a>

        <h1 style={styles.h1}>Meta Tag Generator</h1>
        <p style={styles.desc}>
          Enter a topic or keyword, and we&apos;ll generate an SEO-optimized title tag and meta
          description. The preview shows exactly how your page will look in Google search results.
        </p>

        {/* Input */}
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            type="text"
            placeholder="e.g. keyword research, SEO audit, backlink building..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div style={styles.buttons}>
            <button style={styles.analyzeBtn} onClick={handleGenerate}>
              🏷️ Generate Meta Tags
            </button>
            <button style={styles.sampleBtn} onClick={handleSample}>
              Try with sample
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <section style={styles.results}>
            {/* SERP Preview */}
            <h2 style={styles.sectionTitle}>🔍 Google Search Preview</h2>
            <div style={styles.serpBox}>
              <div style={styles.serpUrl}>{result.serpUrl}</div>
              <div style={styles.serpTitle}>{result.serpTitle}</div>
              <div style={styles.serpDesc}>{result.serpDesc}</div>
            </div>

            {/* Generated Tags */}
            <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>📋 Generated Meta Tags</h2>

            <div style={styles.tagBlock}>
              <div style={styles.tagLabel}>Title Tag</div>
              <div style={styles.tagValue}>
                <code style={styles.code}>&lt;title&gt;</code>
                {result.title}
                <code style={styles.code}>&lt;/title&gt;</code>
              </div>
              <div style={styles.tagMeta}>
                {result.title.length} characters —{' '}
                {result.title.length > 60 ? (
                  <span style={{ color: '#dc2626' }}>Too long (Google may truncate)</span>
                ) : result.title.length < 30 ? (
                  <span style={{ color: '#f59e0b' }}>Consider making it longer</span>
                ) : (
                  <span style={{ color: '#16a34a' }}>Optimal length</span>
                )}
              </div>
            </div>

            <div style={styles.tagBlock}>
              <div style={styles.tagLabel}>Meta Description</div>
              <div style={styles.tagValue}>
                <code style={styles.code}>&lt;meta name=&quot;description&quot; content=&quot;</code>
                {result.description}
                <code style={styles.code}>&quot; /&gt;</code>
              </div>
              <div style={styles.tagMeta}>
                {result.description.length} characters —{' '}
                {result.description.length > 160 ? (
                  <span style={{ color: '#dc2626' }}>Too long (Google may truncate)</span>
                ) : result.description.length < 100 ? (
                  <span style={{ color: '#f59e0b' }}>Consider making it longer</span>
                ) : (
                  <span style={{ color: '#16a34a' }}>Optimal length</span>
                )}
              </div>
            </div>

            <div style={styles.tagBlock}>
              <div style={styles.tagLabel}>Meta Keywords</div>
              <div style={styles.tagValue}>
                <code style={styles.code}>&lt;meta name=&quot;keywords&quot; content=&quot;</code>
                {result.keywords}
                <code style={styles.code}>&quot; /&gt;</code>
              </div>
            </div>

            <div style={styles.tagBlock}>
              <div style={styles.tagLabel}>Robots</div>
              <div style={styles.tagValue}>
                <code style={styles.code}>&lt;meta name=&quot;robots&quot; content=&quot;</code>
                {result.robots}
                <code style={styles.code}>&quot; /&gt;</code>
              </div>
            </div>

            {/* SEO Tips */}
            <h2 style={{ ...styles.sectionTitle, marginTop: 40 }}>📐 SEO Best Practices</h2>
            <div style={styles.tips}>
              {TIPS.map((t) => (
                <div key={t.title} style={styles.tipCard}>
                  <strong>
                    {t.title} ({t.range}):{' '}
                  </strong>
                  {t.advice}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Tools */}
        <section style={styles.related}>
          <h3 style={styles.sectionTitle}>Try Other Tools</h3>
          <div style={styles.relatedGrid}>
            <a href="/tools/keyword-density/" style={styles.relatedCard}>
              🔍 Keyword Density Checker
            </a>
            <a href="/tools/speed-checker/" style={styles.relatedCard}>
              ⚡ Speed Checker
            </a>
          </div>
        </section>

        {/* AdSense */}
        <section style={styles.adSection}>
          <p style={styles.adPlaceholder}>— Ad Placement —</p>
        </section>
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
  h1: {
    fontSize: '2rem',
    fontWeight: 800,
    margin: '0 0 8px',
  },
  desc: {
    color: '#666',
    fontSize: '0.95rem',
    marginBottom: 28,
    maxWidth: 600,
  },
  inputArea: {
    marginBottom: 32,
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: 10,
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    outline: 'none',
  },
  buttons: {
    display: 'flex',
    gap: 12,
    marginTop: 12,
    flexWrap: 'wrap',
  },
  analyzeBtn: {
    padding: '10px 28px',
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
  },
  sampleBtn: {
    padding: '10px 20px',
    background: '#f3f4f6',
    color: '#374151',
    border: '1px solid #d1d5db',
    borderRadius: 8,
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  results: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: 16,
  },
  serpBox: {
    padding: '18px 20px',
    background: '#fff',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    maxWidth: 600,
  },
  serpUrl: {
    fontSize: '0.8rem',
    color: '#1a8c3f',
    marginBottom: 4,
    wordBreak: 'break-all',
  },
  serpTitle: {
    fontSize: '1.15rem',
    color: '#1a0dab',
    fontWeight: 600,
    marginBottom: 4,
    cursor: 'pointer',
    lineHeight: 1.3,
  },
  serpDesc: {
    fontSize: '0.88rem',
    color: '#4d5156',
    lineHeight: 1.4,
  },
  tagBlock: {
    marginBottom: 20,
  },
  tagLabel: {
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#6b7280',
    marginBottom: 6,
    letterSpacing: '0.05em',
  },
  tagValue: {
    padding: '12px 16px',
    background: '#f8f9fc',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    fontSize: '0.9rem',
    wordBreak: 'break-word',
    lineHeight: 1.6,
    fontFamily: 'Monaco, Consolas, "Courier New", monospace',
  },
  code: {
    color: '#2563eb',
    fontWeight: 600,
    background: 'transparent',
  },
  tagMeta: {
    fontSize: '0.8rem',
    color: '#888',
    marginTop: 4,
  },
  tips: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  tipCard: {
    padding: '14px 18px',
    background: '#f8f9fc',
    borderRadius: 8,
    fontSize: '0.9rem',
    lineHeight: 1.5,
    borderLeft: '4px solid #2563eb',
  },
  related: { marginTop: 50 },
  relatedGrid: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  relatedCard: {
    padding: '14px 24px',
    background: '#f8f9fc',
    borderRadius: 8,
    textDecoration: 'none',
    color: '#1a1a2e',
    fontWeight: 600,
    fontSize: '0.95rem',
    border: '1px solid #e5e7eb',
  },
  adSection: {
    margin: '40px 0 0',
    padding: '40px 0',
    textAlign: 'center',
    borderTop: '1px solid #eee',
  },
  adPlaceholder: { color: '#bbb', fontSize: '0.85rem' },
};
