import Head from 'next/head';
import { useState, useCallback } from 'react';

const SCORE_COLORS = {
  good: '#16a34a',
  average: '#f59e0b',
  poor: '#dc2626',
};

function getScoreColor(score) {
  if (score >= 90) return SCORE_COLORS.good;
  if (score >= 50) return SCORE_COLORS.average;
  return SCORE_COLORS.poor;
}

function getScoreLabel(score) {
  if (score >= 90) return 'Good';
  if (score >= 50) return 'Needs Work';
  return 'Poor';
}

function formatMs(ms) {
  if (ms == null) return '—';
  if (ms < 1000) return `${Math.round(ms)} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

export default function SpeedCheckerTool() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleCheck = useCallback(async () => {
    const trimmed = url.trim();
    if (!trimmed) return;

    let targetUrl = trimmed;
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&strategy=mobile`;
      const resp = await fetch(apiUrl);
      if (!resp.ok) {
        throw new Error(`API returned HTTP ${resp.status}`);
      }
      const data = await resp.json();

      if (data.error) {
        throw new Error(data.error.message || 'API error');
      }

      const lighthouse = data.lighthouseResult || {};
      const audits = lighthouse.audits || {};
      const categories = lighthouse.categories || {};

      const performance = categories.performance?.score ?? null;
      const perfScore = performance != null ? Math.round(performance * 100) : null;

      // Core Web Vitals & key metrics
      const metrics = {
        fcp: audits['first-contentful-paint']?.numericValue ?? null,
        lcp: audits['largest-contentful-paint']?.numericValue ?? null,
        tbt: audits['total-blocking-time']?.numericValue ?? null,
        cls: audits['cumulative-layout-shift']?.numericValue ?? null,
        si: audits['speed-index']?.numericValue ?? null,
        interactive: audits['interactive']?.numericValue ?? null,
      };

      // Opportunities (suggestions)
      const opportunities = [];
      const oppAudits = [
        'render-blocking-resources',
        'unused-css-rules',
        'unused-javascript',
        'offscreen-images',
        'uses-optimized-images',
        'efficient-animated-content',
        'uses-text-compression',
        'uses-responsive-images',
        'server-response-time',
        'dom-size',
      ];

      oppAudits.forEach((id) => {
        const audit = audits[id];
        if (audit && audit.score != null && audit.score < 0.9 && audit.displayValue) {
          opportunities.push({
            id,
            title: audit.title || id,
            description: audit.description || '',
            displayValue: audit.displayValue,
            score: Math.round(audit.score * 100),
          });
        }
      });

      // Sort by score ascending (worst first)
      opportunities.sort((a, b) => a.score - b.score);

      setResult({
        url: targetUrl,
        finalUrl: lighthouse.finalUrl || targetUrl,
        performanceScore: perfScore,
        metrics,
        opportunities: opportunities.slice(0, 8),
        fetchTime: lighthouse.fetchTime || new Date().toISOString(),
      });
    } catch (err) {
      setError(err.message || 'Failed to check speed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [url]);

  const handleSample = () => {
    setUrl('https://seotoolspro.com');
    setResult(null);
    setError(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleCheck();
  };

  return (
    <>
      <Head>
        <title>Free Website Speed Checker — PageSpeed Insights Test</title>
        <meta
          name="description"
          content="Test any website speed with Google PageSpeed Insights. Get performance score, Core Web Vitals, and optimization suggestions. Free, instant, no signup."
        />
        <meta
          name="keywords"
          content="website speed test, page speed checker, free pagespeed test, core web vitals, lighthouse speed test"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://seotoolspro.com/tools/speed-checker/" />
        <meta property="og:title" content="Free Website Speed Checker — PageSpeed Test" />
        <meta
          property="og:description"
          content="Check any website speed with Google PageSpeed Insights API. Get performance score and actionable recommendations."
        />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Website Speed Checker',
              url: 'https://seotoolspro.com/tools/speed-checker/',
              applicationCategory: 'SEO Analysis Tool',
              operatingSystem: 'All',
              description:
                'Free website speed testing tool powered by Google PageSpeed Insights. Get performance scores and optimization suggestions.',
            }),
          }}
        />
      </Head>

      <main style={styles.main}>
        <a href="/" style={styles.back}>
          ← Back to all tools
        </a>

        <h1 style={styles.h1}>Website Speed Checker</h1>
        <p style={styles.desc}>
          Enter any URL to test its performance with Google PageSpeed Insights. We&apos;ll show your
          score, Core Web Vitals (LCP, FCP, TBT, CLS), and specific optimization recommendations.
        </p>

        {/* Input */}
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div style={styles.buttons}>
            <button style={styles.analyzeBtn} onClick={handleCheck} disabled={loading}>
              {loading ? '⏳ Analyzing...' : '⚡ Check Speed'}
            </button>
            <button style={styles.sampleBtn} onClick={handleSample}>
              Try with example
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={styles.errorBox}>
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <section style={styles.results}>
            <h2 style={styles.sectionTitle}>
              Results for{' '}
              <a href={result.url} target="_blank" rel="noopener noreferrer" style={styles.resultUrl}>
                {result.finalUrl || result.url}
              </a>
            </h2>

            {/* Score Gauge */}
            {result.performanceScore != null && (
              <div style={styles.scoreSection}>
                <div
                  style={{
                    ...styles.scoreCircle,
                    borderColor: getScoreColor(result.performanceScore),
                    color: getScoreColor(result.performanceScore),
                  }}
                >
                  <span style={styles.scoreNumber}>{result.performanceScore}</span>
                  <span style={styles.scoreLabel}>{getScoreLabel(result.performanceScore)}</span>
                </div>
                <p style={styles.scoreHint}>
                  Mobile performance score (scale 0–100). Based on{' '}
                  {result.fetchTime ? new Date(result.fetchTime).toLocaleDateString() : 'today'}&apos;s
                  data.
                </p>
              </div>
            )}

            {/* Core Web Vitals */}
            <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>📊 Core Web Vitals & Metrics</h2>
            <div style={styles.metricsGrid}>
              {[
                { label: 'FCP', name: 'First Contentful Paint', value: result.metrics.fcp, unit: 'ms' },
                { label: 'LCP', name: 'Largest Contentful Paint', value: result.metrics.lcp, unit: 'ms' },
                { label: 'TBT', name: 'Total Blocking Time', value: result.metrics.tbt, unit: 'ms' },
                { label: 'CLS', name: 'Cumulative Layout Shift', value: result.metrics.cls, unit: '' },
                { label: 'SI', name: 'Speed Index', value: result.metrics.si, unit: 'ms' },
                { label: 'TTI', name: 'Time to Interactive', value: result.metrics.interactive, unit: 'ms' },
              ].map((m) => (
                <div key={m.label} style={styles.metricCard}>
                  <div style={styles.metricLabel}>{m.label}</div>
                  <div style={styles.metricValue}>
                    {m.value != null ? (m.unit === 'ms' ? formatMs(m.value) : m.value.toFixed(3)) : '—'}
                  </div>
                  <div style={styles.metricName}>{m.name}</div>
                </div>
              ))}
            </div>

            {/* Opportunities */}
            {result.opportunities.length > 0 && (
              <>
                <h2 style={{ ...styles.sectionTitle, marginTop: 32 }}>
                  💡 Optimization Opportunities
                </h2>
                <div style={styles.oppGrid}>
                  {result.opportunities.map((opp) => (
                    <div key={opp.id} style={styles.oppCard}>
                      <div style={styles.oppHeader}>
                        <span style={styles.oppTitle}>{opp.title}</span>
                        <span
                          style={{
                            ...styles.oppBadge,
                            color: getScoreColor(opp.score),
                            borderColor: getScoreColor(opp.score),
                          }}
                        >
                          {opp.displayValue}
                        </span>
                      </div>
                      <div style={styles.oppDesc}>{opp.description}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {result.opportunities.length === 0 && (
              <p style={{ color: '#16a34a', marginTop: 20, fontWeight: 600 }}>
                🎉 No major optimization opportunities found! Your site is well-optimized.
              </p>
            )}
          </section>
        )}

        {/* Tips (always visible for SEO) */}
        <section style={styles.related}>
          <h2 style={styles.sectionTitle}>Why Page Speed Matters for SEO</h2>
          <div style={styles.tips}>
            {[
              {
                title: 'Google Ranking Factor',
                desc: 'Page speed is a confirmed ranking signal for both mobile and desktop search. Faster pages rank higher.',
              },
              {
                title: 'Core Web Vitals',
                desc: 'LCP, FCP, and CLS are part of Google\'s page experience signals. Poor scores can hurt your rankings.',
              },
              {
                title: 'User Experience',
                desc: '53% of mobile users leave a page that takes longer than 3 seconds to load. Speed directly impacts conversions.',
              },
            ].map((tip) => (
              <div key={tip.title} style={styles.tipCard}>
                <strong>{tip.title}: </strong>
                {tip.desc}
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section style={styles.related}>
          <h3 style={styles.sectionTitle}>Try Other Tools</h3>
          <div style={styles.relatedGrid}>
            <a href="/tools/keyword-density/" style={styles.relatedCard}>
              🔍 Keyword Density Checker
            </a>
            <a href="/tools/meta-generator/" style={styles.relatedCard}>
              🏷️ Meta Tag Generator
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
  errorBox: {
    padding: '14px 18px',
    background: '#fef2f2',
    color: '#dc2626',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 500,
    marginBottom: 20,
  },
  results: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    marginBottom: 16,
  },
  resultUrl: {
    color: '#2563eb',
    fontSize: '0.95rem',
    wordBreak: 'break-all',
  },
  scoreSection: {
    textAlign: 'center',
    padding: '20px 0 10px',
  },
  scoreCircle: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 140,
    borderRadius: '50%',
    border: '6px solid',
    marginBottom: 12,
  },
  scoreNumber: {
    fontSize: '2.8rem',
    fontWeight: 800,
    lineHeight: 1,
  },
  scoreLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  scoreHint: {
    color: '#888',
    fontSize: '0.85rem',
    maxWidth: 400,
    margin: '0 auto',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: 12,
  },
  metricCard: {
    padding: '14px 12px',
    background: '#f8f9fc',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: '1.3rem',
    fontWeight: 700,
    color: '#1a1a2e',
    marginBottom: 2,
  },
  metricName: {
    fontSize: '0.7rem',
    color: '#9ca3af',
    lineHeight: 1.2,
  },
  oppGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  oppCard: {
    padding: '14px 18px',
    background: '#f8f9fc',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
  },
  oppHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 8,
  },
  oppTitle: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  oppBadge: {
    fontSize: '0.8rem',
    fontWeight: 700,
    padding: '2px 10px',
    borderRadius: 12,
    border: '1px solid',
  },
  oppDesc: {
    fontSize: '0.83rem',
    color: '#666',
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
