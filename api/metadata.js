function cleanValue(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .trim();
}

function extractMeta(html, key, attr) {
  const pattern = new RegExp(
    `<meta[^>]*${attr}=["']${key}["'][^>]*content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  const match = html.match(pattern);
  return match ? cleanValue(match[1]) : "";
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? cleanValue(match[1]) : "";
}

function extractDoiFromText(text) {
  if (!text) return "";
  const doiMatch = String(text).match(/10\.\d{4,9}\/[\-._;()/:A-Z0-9]+/i);
  return doiMatch ? doiMatch[0] : "";
}

function formatCrossrefAuthors(authors) {
  if (!Array.isArray(authors) || authors.length === 0) {
    return "";
  }

  return authors
    .map((author) => {
      const given = (author.given || "").trim();
      const family = (author.family || "").trim();
      if (given && family) {
        return `${family}, ${given}`;
      }
      return (author.name || "").trim();
    })
    .filter(Boolean)
    .join("; ");
}

async function fetchCrossrefByDoi(doi) {
  if (!doi) return null;

  try {
    const response = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
    if (!response.ok) return null;

    const payload = await response.json();
    const message = payload && payload.message ? payload.message : null;
    if (!message) return null;

    const title = Array.isArray(message.title) && message.title[0] ? cleanValue(message.title[0]) : "";
    const journal = Array.isArray(message["container-title"]) && message["container-title"][0]
      ? cleanValue(message["container-title"][0])
      : "";

    const rawDate =
      message.issued &&
      Array.isArray(message.issued["date-parts"]) &&
      Array.isArray(message.issued["date-parts"][0]) &&
      message.issued["date-parts"][0][0]
        ? String(message.issued["date-parts"][0][0])
        : "";

    return {
      title,
      author: formatCrossrefAuthors(message.author),
      siteName: "",
      journal,
      publisher: cleanValue(message.publisher || ""),
      volume: cleanValue(message.volume || ""),
      issue: cleanValue(message.issue || ""),
      pages: cleanValue(message.page || ""),
      rawDate,
    };
  } catch (error) {
    return null;
  }
}

function mergeMetadata(primary, fallback) {
  const p = primary || {};
  const f = fallback || {};

  return {
    title: p.title || f.title || "",
    author: p.author || f.author || "",
    siteName: p.siteName || f.siteName || "",
    journal: p.journal || f.journal || "",
    publisher: p.publisher || f.publisher || "",
    volume: p.volume || f.volume || "",
    issue: p.issue || f.issue || "",
    pages: p.pages || f.pages || "",
    rawDate: p.rawDate || f.rawDate || "",
  };
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = async function handler(req, res) {
  const targetUrl = String(req.query.url || "").trim();

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url query parameter" });
  }

  try {
    let parsed;
    try {
      parsed = new URL(targetUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return res.status(400).json({ error: "Only http/https URLs are supported" });
    }

    const doiFromUrl = extractDoiFromText(targetUrl);

    const crossrefFromUrlPromise = doiFromUrl
      ? fetchCrossrefByDoi(doiFromUrl)
      : Promise.resolve(null);

    const responsePromise = fetchWithTimeout(
      targetUrl,
      {
        headers: {
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
        redirect: "follow",
      },
      4500
    );

    const [responseResult, crossrefUrlResult] = await Promise.allSettled([
      responsePromise,
      crossrefFromUrlPromise,
    ]);

    const crossrefFromUrl =
      crossrefUrlResult.status === "fulfilled" ? crossrefUrlResult.value : null;

    if (responseResult.status !== "fulfilled") {
      res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
      return res.status(200).json(mergeMetadata({}, crossrefFromUrl));
    }

    const response = responseResult.value;

    if (!response.ok) {
      res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
      return res.status(200).json(mergeMetadata({}, crossrefFromUrl));
    }

    const html = await response.text();

    const citationAuthorMatches = [
      ...html.matchAll(/<meta[^>]*name=["']citation_author["'][^>]*content=["']([^"']+)["'][^>]*>/gi),
    ];

    const citationAuthors = citationAuthorMatches
      .map((match) => cleanValue(match[1]))
      .filter(Boolean);

    const firstPage = extractMeta(html, "citation_firstpage", "name");
    const lastPage = extractMeta(html, "citation_lastpage", "name");

    const pageMetadata = {
      title:
        extractMeta(html, "citation_title", "name") ||
        extractMeta(html, "og:title", "property") ||
        extractMeta(html, "twitter:title", "name") ||
        extractTitle(html),
      author:
        citationAuthors[0] ||
        extractMeta(html, "author", "name") ||
        extractMeta(html, "article:author", "property"),
      siteName: extractMeta(html, "og:site_name", "property"),
      journal: extractMeta(html, "citation_journal_title", "name"),
      publisher: extractMeta(html, "citation_publisher", "name"),
      volume: extractMeta(html, "citation_volume", "name"),
      issue: extractMeta(html, "citation_issue", "name"),
      pages: firstPage && lastPage ? `${firstPage}-${lastPage}` : firstPage,
      rawDate:
        extractMeta(html, "citation_publication_date", "name") ||
        extractMeta(html, "article:published_time", "property") ||
        extractMeta(html, "date", "name"),
    };

    const doiFromPage =
      extractMeta(html, "citation_doi", "name") ||
      extractMeta(html, "dc.identifier", "name") ||
      extractDoiFromText(html);

    let crossrefFromPage = null;
    if (doiFromPage && doiFromPage !== doiFromUrl) {
      crossrefFromPage = await fetchCrossrefByDoi(doiFromPage);
    }

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    return res.status(200).json(mergeMetadata(pageMetadata, crossrefFromPage || crossrefFromUrl));
  } catch (error) {
    return res.status(200).json({
      title: "",
      author: "",
      siteName: "",
      journal: "",
      publisher: "",
      volume: "",
      issue: "",
      pages: "",
      rawDate: "",
    });
  }
};
