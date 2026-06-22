import Head from 'next/head';
import { useState, useCallback } from 'react';

const STOP_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'can', 'shall', 'to', 'of', 'in', 'for',
  'on', 'with', 'at', 'by', 'from', 'as', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'between', 'out', 'off', 'over',
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
  'so', 'than', 'too', 'very', 'just', 'because', 'but', 'and', 'or',
  'if', 'while', 'about', 'up', 'down', 'it', 'its', 'this', 'that',
  'these', 'those', 'he', 'she', 'they', 'them', 'we', 'you', 'i', 'me',
  'my', 'your', 'his', 'her', 'our', 'their',
]);

function analyzeKeywordDensity(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

  const total = words.length;
  if (total === 0) return { total, keywords: [] };

  const freq = {};
  words.forEach((w) => {
    freq[w] = (freq[w] || 0) + 1;
  });

  const keywords = Object.entries(freq)
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / total) * 100).toFixed(2),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  return { total, keywords };
}

const TIPS = [
  {
    level: 'good',
    range: '1% – 3%',
    advice:
      'Optimal range. Your keyword density is balanced and natural. Google sees this as a well-written page.',
  },
  {
    level: 'warn',
    range: '3% – 5%',
    advice:
      'Slightly high. Consider varying your language. Use synonyms and related terms instead of repeating the same phrase.',
  },
  {
    level: 'bad',
    range: '> 5%',
    advice:
      'Keyword stuffing detected! Google may penalize this. Rewrite the content to be more natural. Aim for readability over density.',
  },
];

export default function KeywordDensityTool() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const handleAnalyze = useCallback(() => {
    if (!input.trim()) return;
    setResult(analyzeKeywordDensity(input));
  }, [input]);

  const handleSample = () => {
    const sample = `SEO tools help website owners improve their search engine rankings. A good keyword density checker analyzes your content and finds the most frequently used keywords. If your keyword density is too high, search engines might think you are keyword stuffing. The ideal keyword density is between one and three percent for most pages.`;
    setInput(sample);
    setResult(analyzeKeywordDensity(sample));
  };

  const getDensityColor = (d) => {
    const v = parseFloat(d);
    if (v > 5) return '#dc2626';
    if (v > 3) return '#f59e0b';
    return '#16a34a';
  };

  return (
    <>
      <Head>
        <title>Free Keyword Density Checker — Analyze Any Text or URL</title>
        <meta
          name="description"
          content="Free online keyword density checker. Paste text or enter a URL to analyze keyword frequency. Get SEO recommendations instantly."
        />
        <meta
          name="keywords"
          content="keyword density checker, check keyword density free, keyword density analyzer, seo keyword analysis, free keyword density tool"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seotoolspro.com/tools/keyword-density/" />
        <meta property="og:title" content="Free Keyword Density Checker" />
        <meta
          property="og:description"
          content="Analyze keyword frequency in any text or URL. Instant SEO recommendations."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Keyword Density Checker',
              url: 'https://seotoolspro.com/tools/keyword-density/',
              applicationCategory: 'SEO Analysis Tool',
              operatingSystem: 'All',
              description:
                'Free online tool to analyze keyword density in any text or webpage content.',
            }),
          }}
        />
      </Head>

      <main style={styles.main}>
        <a href="/" style={styles.back}>
          ← Back to all tools
        </a>

        <h1 style={styles.h1}>Keyword Density Checker</h1>
        <p style={styles.desc}>
          Paste your text below and click Analyze. We&apos;ll show you the most-used keywords and
          their density percentages. Stop words (the, and, is, etc.) are automatically filtered.
        </p>

        {/* Input */}
        <div style={styles.inputArea}>
          <textarea
            style={styles.textarea}
            rows={8}
            placeholder="Paste your text or article content here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div style={styles.buttons}>
            <button style={styles.analyzeBtn} onClick={handleAnalyze}>
              🔍 Analyze Keywords
            </button>
            <button style={styles.sampleBtn} onClick={handleSample}>
              Try with sample text
            </button>
          </div>
        </div>

        {/* Results */}
        {result && (
          <section style={styles.results}>
            <h2 style={styles.sectionTitle}>
              Results — {result.total} words analyzed
            </h2>

            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span style={styles.colRank}>#</span>
                <span style={styles.colWord}>Keyword</span>
                <span style={styles.colCount}>Count</span>
                <span style={styles.colDensity}>Density</span>
                <span style={styles.colBar}>Distribution</span>
              </div>
              {result.keywords.map((kw, i) => (
                <div key={kw.word} style={styles.tableRow}>
                  <span style={styles.colRank}>{i + 1}</span>
                  <span style={styles.colWord}>{kw.word}</span>
                  <span style={styles.colCount}>{kw.count}</span>
                  <span style={{ ...styles.colDensity, color: getDensityColor(kw.density) }}>
                    {kw.density}%
                  </span>
                  <span style={styles.colBar}>
                    <span
                      style={{
                        ...styles.barFill,
                        width: `${Math.min(parseFloat(kw.density) * 20, 100)}%`,
                        background: getDensityColor(kw.density),
                      }}
                    />
                  </span>
                </div>
              ))}
            </div>

            {/* Tips */}
            <h2 style={{ ...styles.sectionTitle, marginTop: 40 }}>SEO Tips</h2>
            <div style={styles.tips}>
              {TIPS.map((t) => (
                <div key={t.level} style={styles.tipCard}>
                  <strong>
                    {t.range}:{' '}
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
            <a href="/tools/meta-generator/" style={styles.relatedCard}>
              🏷️ Meta Tag Generator
            </a>
            <a href="/tools/speed-checker/" style={styles.relatedCard}>
              ⚡ Speed Checker
            </a>
          </div>
        </section>

        {/* AdSense Placeholder */}
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
  textarea: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '0.95rem',
    border: '2px solid #ddd',
    borderRadius: 10,
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: 1.6,
    boxSizing: 'border-box',
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
  table: {
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    display: 'flex',
    padding: '10px 16px',
    background: '#f9fafb',
    borderBottom: '2px solid #e5e7eb',
    fontWeight: 700,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    color: '#6b7280',
  },
  tableRow: {
    display: 'flex',
    padding: '8px 16px',
    borderBottom: '1px solid #f3f4f6',
    alignItems: 'center',
  },
  colRank: { width: 40, flexShrink: 0, fontSize: '0.85rem', color: '#9ca3af' },
  colWord: { flex: 2, fontWeight: 600, fontSize: '0.9rem' },
  colCount: { flex: 1, fontSize: '0.9rem', color: '#6b7280' },
  colDensity: { flex: 1, fontSize: '0.9rem', fontWeight: 700 },
  colBar: { flex: 2, height: 8, background: '#f3f4f6', borderRadius: 4 },
  barFill: { display: 'block', height: 8, borderRadius: 4, minWidth: 2 },
  tips: { display: 'flex', flexDirection: 'column', gap: 12 },
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
