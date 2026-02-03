# Media Inspector

Media Inspector is a web-based inspection tool that analyzes webpages to identify and list video media resources exposed by the site.

The tool focuses on inspection and analysis, not downloading or bypassing restrictions.  
It is designed with clear technical and legal boundaries in mind.

---

## 🔍 What Media Inspector Does

**Media Inspector:**

- Accepts a webpage URL  
- Fetches the page HTML  
- Analyzes the markup to find video-related resources  
- Extracts and displays:
  - `<video>` tag sources  
  - `<source>` tag URLs  
  - Direct video file links (e.g. .mp4, .webm, .ogg)

The goal is to make media discovery transparent and understandable, similar to how a developer inspects the Network or Elements tab in browser dev tools.

---

## 🚫 What Media Inspector Does NOT Do

**Media Inspector does not:**

- Download videos  
- Break DRM or encryption  
- Reconstruct video streams  
- Bypass access controls  
- Support protected streaming platforms by default (e.g. YouTube, Netflix, Prime Video)

**Streaming formats such as:**

- .m3u8 (HLS)  
- .mpd (DASH)  

are intentionally excluded in the initial version.

---

## 🧠 Design Approach

### Static Analysis First

The initial version of Media Inspector is built around static HTML analysis.

This means the tool inspects:

- What is explicitly present in the HTML  
- What is directly observable without executing JavaScript  

This approach keeps the system:

- Simple  
- Fast  
- Predictable  
- Easy to reason about  

---

### Why Cheerio Is Used

Media Inspector uses Cheerio, a server-side HTML parsing library for Node.js.

Cheerio allows the application to:

- Parse raw HTML efficiently  
- Query elements using familiar CSS selectors  
- Extract media-related attributes without launching a browser  

Because the core objective is to inspect markup-level media exposure, Cheerio is the most appropriate and lightweight choice for the first version of the tool.

---

### Why Browser Automation Is Not Used (Yet)

Tools like Playwright or Puppeteer are powerful browser automation frameworks that:

- Execute JavaScript  
- Simulate real user behavior  
- Intercept runtime network requests  

While these capabilities are useful, they introduce:

- Higher system complexity  
- Increased resource usage  
- Legal and ethical considerations when dealing with streaming media  

For this reason, browser automation is intentionally excluded from v1.

---

## 🚀 Future Enhancements (Planned)

Media Inspector is designed with extensibility in mind.

Planned future versions may include:

- Optional Playwright-based analysis mode  
- Network request inspection  
- Detection and classification of streaming formats (.m3u8, .mpd)  
- Automation scripts for deeper media analysis  

These features will be:

- Clearly separated from the core static analysis  
- Explicitly labeled  
- Opt-in only  

This staged approach ensures the project evolves responsibly without compromising clarity or intent.

---

## ⚖️ Legal & Ethical Disclaimer

Media Inspector is an inspection and analysis tool, not a media extraction or circumvention utility.

The tool:

- Only analyzes publicly exposed webpage data  
- Does not bypass DRM, authentication, or encryption  
- Does not reconstruct protected media streams  

Users are responsible for ensuring their usage complies with applicable laws and website terms of service.

---

## 🧩 Project Philosophy

Exist first, improve later.

Media Inspector prioritizes:

- Clear scope  
- Explicit limitations  
- Strong fundamentals  

Advanced features are added only when the foundation is stable and well-defined.

---

## 🛠️ Tech Stack (v1)

- Frontend: React + Vite  
- Backend: Node.js + Express  
- HTML Parsing: Cheerio  
