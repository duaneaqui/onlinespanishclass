import { writeFileSync } from "node:fs";

const pages = [
  ["index.html", "Home"],
  ["programs.html", "Programs"],
  ["practice.html", "Practice"],
  ["about.html", "About"],
];
const brand = `<a class="brand" href="index.html"><span class="mark" aria-hidden="true">ñ</span><span>Mundo De Palabra<small>ONLINE SPANISH SCHOOL</small></span></a>`;
const link = (href, label, className = "button") => `<a class="${className}" href="${href}">${label} <span aria-hidden="true">↗</span></a>`;
const intro = (label, title, copy) => `<section class="page-intro"><div class="shell"><p class="eyebrow">${label}</p><h1>${title}</h1><p class="lead">${copy}</p></div></section>`;

function layout(index, body) {
  const nav = pages.map(([href, label], i) => `<a href="${href}"${i === index ? ' aria-current="page"' : ""}>${label}</a>`).join("");
  const title = index ? `${pages[index][1]} | Mundo De Palabra` : "Mundo De Palabra | Online Spanish School";
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Live online Spanish classes for kids and adults. Learn everyday Spanish, practice for bilingual BPO roles, or prepare for life in Spain.">
  <title>${title}</title>
  <link rel="stylesheet" href="style.css">
  <script src="school.js" defer></script>
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header><div class="shell header">${brand}<nav aria-label="Main navigation">${nav}</nav>${link("programs.html#classes", "View classes", "button header-cta")}</div></header>
  <main id="main">${body}</main>
  <footer><div class="shell footer">${brand}<nav aria-label="Footer navigation">${nav}</nav><span>Owned by Dave Lapana</span></div></footer>
</body>
</html>`;
}

const paths = [
  ["01", "Everyday Spanish", "Introduce yourself, ask questions, and build the vocabulary you need for simple conversations.", "everyday"],
  ["02", "Spanish for bilingual BPO", "Practice greeting customers, confirming details, and explaining the next step on a call.", "bpo"],
  ["03", "Spanish for life in Spain", "Practice the conversations you’ll need to get around, meet people, and introduce yourself at work.", "spain"],
];

const home = `
  <section class="hero"><div class="shell split">
    <div><p class="eyebrow">LIVE ONLINE SPANISH CLASSES</p><h1>Learn Spanish for <em>real conversations.</em></h1>
    <p class="lead">Start with the basics, build confidence speaking, and work toward the Spanish you’ll use in daily life, a bilingual BPO role, or a move to Spain.</p>
    <div class="actions">${link("programs.html#free-class", "Try a free live class")}${link("programs.html#classes", "Explore classes", "button secondary")}</div>
    <p class="hero-note"><span></span> Open to kids and adults <b>·</b> Beginners welcome</p></div>
    <figure class="hero-image"><img src="online-class.jpg" alt="Illustrative scene of a learner taking an online lesson from home" width="1200" height="960" fetchpriority="high"><figcaption><span class="lesson-icon" aria-hidden="true">▶</span><span><strong>The online classroom</strong><small>Live group and one-on-one lessons</small></span></figcaption></figure>
  </div></section>
  <div class="facts"><div class="shell"><div><strong>Live instruction</strong><span>Learn and speak in class</span></div><div><strong>Two class formats</strong><span>Group or private lessons</span></div><div><strong>From ₱2,800</strong><span>20 live group sessions</span></div></div></div>
  <section class="section shell"><p class="eyebrow">WHAT YOU’LL LEARN</p><h2>Start with your goal.</h2>
    <div class="path-grid">${paths.map(([number, title, copy, key]) => `<article class="path"><span class="step">${number}</span><h3>${title}</h3><p>${copy}</p>${link(`practice.html?topic=${key}`, "Try a phrase", "inline-link")}</article>`).join("")}</div>
  </section>
  <section class="feature"><div class="shell section split"><img class="study-image" src="study-desk.jpg" alt="Illustrative scene of a learner writing study notes beside a laptop" width="1200" height="960" loading="lazy"><div><p class="eyebrow">A LOOK AT THE LESSONS</p><h2>Build a conversation, one phrase at a time.</h2><p class="lead">In the practice lab, you’ll read a Spanish phrase, use a pronunciation guide, and check what it means in context.</p>${link("practice.html", "Open the practice lab")}</div></div></section>
`;

const programs = `
  ${intro("PROGRAMS AND PRICING", "Find the right Spanish class.", "Learn in a live online group or take private lessons focused on the situations you want to practice.")}
  <section class="feature" id="free-class"><div class="shell section">
    <p class="eyebrow">FREE INTRODUCTORY CLASS</p><h2>Try a one-hour Spanish class.</h2>
    <p class="lead">Join a free, live online class to see how we teach. If the class is a good fit, you can enroll in group or one-on-one lessons.</p>
    <p class="muted">Free-class schedule inquiries are coming soon.</p>
    ${link("#classes", "Compare paid classes", "button secondary")}
  </div></section>
  <section class="section shell" id="classes"><h2>Compare class formats</h2><div class="plan-grid">
    <article class="plan featured"><p class="eyebrow">LIVE GROUP LEARNING</p><h3>Group classes</h3><p>Practice speaking and listening with classmates in a shared online classroom.</p><div class="price"><strong>₱2,800</strong><span>20 sessions</span></div><button class="button" data-plan="group">Preview group enrollment <span aria-hidden="true">↗</span></button></article>
    <article class="plan"><p class="eyebrow">ONE-ON-ONE LEARNING</p><h3>Private classes</h3><p>Spend more of each lesson speaking and focus on the Spanish you want to use.</p><div class="price"><strong>~₱4,500</strong><span>10 sessions</span></div><button class="button secondary" data-plan="private">Preview private enrollment <span aria-hidden="true">↗</span></button></article>
  </div><p class="muted payment-note">GCash and PayPal are available to preview in checkout.</p></section>
  <section class="feature"><div class="shell section"><p class="eyebrow">LESSON TOPICS</p><h2>Build from the basics.</h2><div class="curriculum">
    <article><span class="step">01</span><h3>Find your voice</h3><p>Practice pronunciation, introductions, numbers, and common questions.</p></article>
    <article><span class="step">02</span><h3>Keep a conversation going</h3><p>Talk about your routine, ask for clarification, and respond in full sentences.</p></article>
    <article><span class="step">03</span><h3>Apply it to your goal</h3><p>Try customer service scenarios or practical conversations for work and daily life in Spain.</p></article>
  </div></div></section>
  <section class="section shell faq"><h2>Common questions</h2>
    <details><summary>Can I start as a complete beginner?</summary><p>Yes. Start with pronunciation and simple phrases, then build toward more advanced conversations.</p></details>
    <details><summary>Can children take classes?</summary><p>Yes. Mundo De Palabra welcomes both kids and adults.</p></details>
    <details><summary>How do I pay?</summary><p>You can try choosing GCash or PayPal in the enrollment preview. Payments and seat reservations are inactive during the preview.</p></details>
  </section>
  <dialog aria-labelledby="checkout-title"><form id="checkout">
    <button type="button" class="close" aria-label="Close enrollment">×</button>
    <p class="eyebrow">ENROLLMENT PREVIEW</p><h2 id="checkout-title"></h2><p id="checkout-price"></p>
    <fieldset><legend>Choose a payment method</legend><label><input type="radio" name="payment" value="GCash" required> GCash</label><label><input type="radio" name="payment" value="PayPal" required> PayPal</label></fieldset>
    <button class="button" type="submit">Preview checkout</button>
    <p class="muted payment-note">Demo only. Payment and enrollment are inactive.</p><p id="checkout-status" role="status"></p>
  </form></dialog>
`;

const practice = `
  ${intro("FREE PRACTICE LAB", "Try a short Spanish exercise.", "Choose a topic, read the phrase, and pick the English translation. Use the pronunciation guide to say the phrase out loud.")}
  <section class="section shell practice">
    <aside><h2>Choose a topic</h2><div class="topic-controls" role="group" aria-label="Practice topic">
      <button type="button" data-topic="everyday" aria-pressed="true">Everyday Spanish</button>
      <button type="button" data-topic="bpo" aria-pressed="false">Customer service</button>
      <button type="button" data-topic="spain" aria-pressed="false">Life in Spain</button>
    </div><p class="muted">Each topic has two example phrases.</p></aside>
    <div class="phrase-card"><div class="card-top"><span>TRANSLATION PRACTICE</span><span id="phrase-count">01 / 02</span></div>
      <p id="phrase-context">GREETING SOMEONE</p><h3 id="phrase" lang="es">Mucho gusto.</h3><p id="pronunciation">MOO-choh GOOS-toh</p>
      <div id="answers" role="group" aria-label="What does this phrase mean?"></div><p id="phrase-feedback" role="status"></p>
      <button class="button secondary" type="button" id="next-phrase">Next phrase <span aria-hidden="true">→</span></button>
    </div>
  </section>
  <section class="feature"><div class="shell section callout"><div><p class="eyebrow">READY TO SPEAK?</p><h2>Practice in a live class.</h2></div>${link("programs.html#classes", "Compare class options")}</div></section>
`;

const about = `
  ${intro("ABOUT MUNDO DE PALABRA", "An online school for Spanish learners.", "For kids and adults learning to speak Spanish for daily life, work, or a move to Spain.")}
  <section class="shell section split owner"><figure><img src="dave.png" width="1254" height="1254" alt="Dave Lapana, owner of Mundo De Palabra"><figcaption>Dave Lapana · School owner</figcaption></figure>
    <div><p class="eyebrow">MEET THE OWNER</p><h2>Dave Lapana</h2><p class="lead">Dave owns Mundo De Palabra, an online Spanish school offering live group and one-on-one classes. Students can start with everyday phrases and work toward conversations for bilingual customer service or life in Spain.</p>${link("programs.html#classes", "Explore the programs")}</div>
  </section>
`;

for (const [index, content] of [home, programs, practice, about].entries()) {
  writeFileSync(new URL(`dist/${pages[index][0]}`, import.meta.url), layout(index, content));
}
