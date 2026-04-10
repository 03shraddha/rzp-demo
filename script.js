// script.js - tab navigation, rendering, interactions, add entry, and content.js download
// depends on window.ENTRIES defined in content.js (loaded first in HTML)

/* =============================================================================
   TAB NAVIGATION — iOS Safari-style pill tabs (agent1)
   ============================================================================= */

// ── State ──────────────────────────────────────────────────
let currentTab = 0;
const tabsVisited = new Set([0]); // tab 0 is active on load

// Absolute scroll targets per tab — computed once at load (scrollY=0)
// so getBoundingClientRect().top equals the document Y position
const PAGE_IDS = ['page-docs', 'page-payments', 'page-aimap'];
const pageScrollTargets = [0, 0, 0]; // filled in initPageScrollTargets()

function initPageScrollTargets() {
  PAGE_IDS.forEach((id, i) => {
    const section = document.getElementById(id);
    if (!section) return;
    // page-docs and page-payments have .page-hero; page-aimap has .hero
    const anchor = section.querySelector('.page-hero') || section.querySelector('.hero') || section;
    pageScrollTargets[i] = Math.max(0, anchor.getBoundingClientRect().top - 57);
  });
}

// ── Core: switch to a tab by index ─────────────────────────
/**
 * Switches the visible page and updates active pill styling.
 * @param {number} index - 0, 1, or 2
 */
function switchTab(index) {
  if (index < 0 || index > 2) return;

  const container = document.querySelector('.pages-container');

  // Phase 1: fade out
  if (container) container.classList.add('flip-exit');

  setTimeout(() => {
    // Scroll while hidden using precomputed targets (reliable, no runtime layout dependency)
    currentTab = index;
    window.scrollTo({ top: pageScrollTargets[index], behavior: 'instant' });

    document.querySelectorAll('.tab-pill').forEach((pill) => {
      pill.classList.toggle('active', Number(pill.dataset.tab) === index);
    });
    moveIndicator(index);
    onTabEnter(index);

    // Phase 2: flip in from opposite side
    if (container) {
      container.classList.remove('flip-exit');
      container.classList.add('flip-enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.classList.remove('flip-enter');
        });
      });
    }
  }, 220);
}

// ── Scroll spy — updates active tab as user scrolls ────────
/**
 * Watches each .page entering the top half of the viewport and
 * updates the active tab pill accordingly.
 */
function initScrollSpy() {
  const targets = [
    document.querySelector('#page-docs .page-hero'),
    document.querySelector('#page-payments .page-hero'),
    document.getElementById('page-aimap'),
  ];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const index = targets.indexOf(entry.target);
      if (index === -1 || index === currentTab) return;
      currentTab = index;
      document.querySelectorAll('.tab-pill').forEach((pill) => {
        pill.classList.toggle('active', Number(pill.dataset.tab) === index);
      });
      moveIndicator(index);
      onTabEnter(index);
    });
  }, {
    rootMargin: '-57px 0px -50% 0px',
    threshold: 0,
  });
  targets.forEach((t) => t && observer.observe(t));
}

// ── Tab enter callback ──────────────────────────────────────
/**
 * Called when a tab becomes active. Triggers typewriter / animation once per tab.
 * @param {number} index
 */
function onTabEnter(index) {
  if (tabsVisited.has(index)) return; // already animated, skip
  tabsVisited.add(index);

  if (index === 0) typewriterPageDocs();
  if (index === 1) typewriterPagePayments();
  if (index === 2) typewriterHero();
}

// ── Scroll reveal ───────────────────────────────────────────
/**
 * Sets up IntersectionObserver on all .reveal elements.
 * Adds .reveal--visible when element enters viewport (fires once).
 * Stagger delay is driven by --i CSS custom property on the element.
 *
 * Usage in HTML:
 *   <div class="reveal" style="--i: 1">...</div>
 */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target); // fire once, then stop watching
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ── Indicator ────────────────────────────────────────────────
/**
 * Moves the .tab-indicator underline under the pill at `index`.
 */
function moveIndicator(index) {
  const indicator = document.querySelector('.tab-indicator');
  const pills = document.querySelectorAll('.tab-pill');
  if (!indicator || !pills[index]) return;
  const pill = pills[index];
  indicator.style.left  = pill.offsetLeft + 'px';
  indicator.style.width = pill.offsetWidth + 'px';
}

// ── Init tabs ────────────────────────────────────────────────
/**
 * Wires up pill clicks, keyboard nav, touch nav, and sets initial state.
 * Called from DOMContentLoaded.
 */
function initTabs() {
  // Wire pill click handlers
  document.querySelectorAll('.tab-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      switchTab(Number(pill.dataset.tab));
    });
  });

  // Inject underline indicator into .tab-pills
  const tabPills = document.querySelector('.tab-pills');
  if (tabPills && !tabPills.querySelector('.tab-indicator')) {
    const indicator = document.createElement('div');
    indicator.className = 'tab-indicator';
    tabPills.appendChild(indicator);
    requestAnimationFrame(() => moveIndicator(0));
  }

  // Scroll spy updates active tab as user scrolls between pages
  initScrollSpy();
}


/* =============================================================================
   TYPEWRITER FUNCTIONS
   ============================================================================= */

// Typewriter for Page 1 (Razorpay Docs MCP) hero title
// Plays exactly 2 times: type → pause → erase → pause → retype → done
function typewriterPageDocs() {
  const title = document.getElementById('docs-hero-title');
  if (!title) return;
  const text = 'what if your ai agent always had the right docs?';
  title.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  title.appendChild(cursor);
  let i = 0;
  let secondPass = false; // true once we start the retype

  // Counts how many text characters are currently in the title (before cursor)
  function getTypedLength() {
    let len = 0;
    title.childNodes.forEach((node) => {
      if (node !== cursor && node.nodeType === Node.TEXT_NODE) len += node.textContent.length;
    });
    return len;
  }

  // Removes the last character from the text nodes before the cursor
  function removeLastChar() {
    for (let n = title.childNodes.length - 1; n >= 0; n--) {
      const node = title.childNodes[n];
      if (node === cursor) continue;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.length > 0) {
        node.textContent = node.textContent.slice(0, -1);
        // clean up empty text nodes to keep DOM tidy
        if (node.textContent.length === 0) title.removeChild(node);
        return;
      }
    }
  }

  function eraseChar() {
    if (getTypedLength() > 0) {
      removeLastChar();
      setTimeout(eraseChar, 30);
    } else {
      // All erased — pause then start second (final) pass
      secondPass = true;
      i = 0;
      setTimeout(next, 400);
    }
  }

  function next() {
    if (i < text.length) {
      title.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(next, 45);
    } else if (!secondPass) {
      // First pass done — pause, erase, then retype
      setTimeout(eraseChar, 600);
    } else {
      // Second pass done — fade out cursor and stop
      setTimeout(() => {
        cursor.style.animation = 'none';
        cursor.style.opacity = '0';
        cursor.style.transition = 'opacity 0.3s';
        setTimeout(() => cursor.remove(), 300);
      }, 400);
    }
  }
  setTimeout(next, 200);
}

// Typewriter for Page 2 (Payment Recovery) hero title
// Plays exactly 2 times: type → pause → erase → pause → retype → done
function typewriterPagePayments() {
  const title = document.getElementById('payments-hero-title');
  if (!title) return;
  const text = 'every failed payment is revenue walking out the door';
  title.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  title.appendChild(cursor);
  let i = 0;
  let secondPass = false; // true once we start the retype

  // Counts how many text characters are currently in the title (before cursor)
  function getTypedLength() {
    let len = 0;
    title.childNodes.forEach((node) => {
      if (node !== cursor && node.nodeType === Node.TEXT_NODE) len += node.textContent.length;
    });
    return len;
  }

  // Removes the last character from the text nodes before the cursor
  function removeLastChar() {
    for (let n = title.childNodes.length - 1; n >= 0; n--) {
      const node = title.childNodes[n];
      if (node === cursor) continue;
      if (node.nodeType === Node.TEXT_NODE && node.textContent.length > 0) {
        node.textContent = node.textContent.slice(0, -1);
        // clean up empty text nodes to keep DOM tidy
        if (node.textContent.length === 0) title.removeChild(node);
        return;
      }
    }
  }

  function eraseChar() {
    if (getTypedLength() > 0) {
      removeLastChar();
      setTimeout(eraseChar, 30);
    } else {
      // All erased — pause then start second (final) pass
      secondPass = true;
      i = 0;
      setTimeout(next, 400);
    }
  }

  function next() {
    if (i < text.length) {
      title.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
      setTimeout(next, 40);
    } else if (!secondPass) {
      // First pass done — pause, erase, then retype
      setTimeout(eraseChar, 600);
    } else {
      // Second pass done — fade out cursor and stop
      setTimeout(() => {
        cursor.style.animation = 'none';
        cursor.style.opacity = '0';
        cursor.style.transition = 'opacity 0.3s';
        setTimeout(() => cursor.remove(), 300);
      }, 400);
    }
  }
  setTimeout(next, 200);
}


// Typewriter effect on every .section-label as it scrolls into view.
// Uses IntersectionObserver — each label types itself TWICE (type → erase → retype),
// then stops. CSS ::after shows a blinking | while typing; .typing-done hides it.
function initSectionTypewriters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.dataset.typed === 'true') return;
      el.dataset.typed = 'true';
      const fullText = el.textContent.trim();
      el.textContent = '';
      let i = 0;
      let secondPass = false; // true once we start the retype

      function eraseChar() {
        if (el.textContent.length > 0) {
          el.textContent = el.textContent.slice(0, -1);
          setTimeout(eraseChar, 25);
        } else {
          // All erased — pause then start second (final) pass
          secondPass = true;
          i = 0;
          setTimeout(typeChar, 400);
        }
      }

      function typeChar() {
        if (i < fullText.length) {
          el.appendChild(document.createTextNode(fullText[i]));
          i++;
          setTimeout(typeChar, 40);
        } else if (!secondPass) {
          // First pass done — pause, erase, then retype
          setTimeout(eraseChar, 600);
        } else {
          // Second pass done — mark complete and stop
          el.classList.add('typing-done');
        }
      }

      typeChar();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.section-label').forEach((el) => observer.observe(el));
}


/* =============================================================================
   AI MAP PAGE — rendering, interactions, add entry, and content.js download
   ============================================================================= */

// ---------------------------------------------------------------------------
// module-level state
// ---------------------------------------------------------------------------

let currentFilter = 'All'; // tracks the active company filter

// ---------------------------------------------------------------------------
// utility
// ---------------------------------------------------------------------------

// truncates at the last word boundary before maxLen so it never cuts mid-word
// for multi-line bullet text, uses just the first line as preview
const truncate = (text, maxLen) => {
  const flat = text.split('\n')[0]; // use first bullet as preview
  if (flat.length <= maxLen) return flat;
  const cut = flat.lastIndexOf(' ', maxLen);
  return flat.slice(0, cut > 0 ? cut : maxLen) + '...';
};

// converts newline-delimited text into an html bullet list.
// if text has no newlines, returns it wrapped in a <p>.
const toBullets = (text) => {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (lines.length <= 1) return `<p class="detail-text-p">${lines[0] || ''}</p>`;
  return `<ul class="detail-bullets">${lines.map(l => `<li>${l}</li>`).join('')}</ul>`;
};

// types text into an element character by character.
// handles \n by inserting a <br> element so lines break visually.
// calls onDone callback when finished (optional).
function typeText(element, text, speed = 18, onDone) {
  element.innerHTML = '';
  let i = 0;
  function next() {
    if (i < text.length) {
      if (text[i] === '\n') {
        element.appendChild(document.createElement('br'));
      } else {
        // append to last text node if one exists, otherwise create a new one
        const last = element.lastChild;
        if (last && last.nodeType === Node.TEXT_NODE) {
          last.textContent += text[i];
        } else {
          element.appendChild(document.createTextNode(text[i]));
        }
      }
      i++;
      setTimeout(next, speed);
    } else {
      if (onDone) onDone();
    }
  }
  next();
}

// ---------------------------------------------------------------------------
// rendering
// ---------------------------------------------------------------------------

// renders all table rows and cards from the given entries array.
// clears both containers first, then rebuilds DOM from scratch.
const renderAll = (entries) => {
  const tbody = document.getElementById('entries-tbody');
  const cardContainer = document.getElementById('card-container');

  // clear existing content before re-rendering
  tbody.innerHTML = '';
  cardContainer.innerHTML = '';

  entries.forEach((entry, index) => {
    // table: entry row (summary)
    const entryRow = document.createElement('tr');
    entryRow.className = 'entry-row';
    entryRow.dataset.id = entry.id;
    const badgeHTML = entry.company ? `<span class="entry-company-badge">${entry.company}</span>` : '';
    const teamHTML  = entry.team ? `<span style="display:block;font-size:12px;color:var(--color-text-secondary);margin-top:2px">${entry.team}</span>` : '';
    const problemPreview = entry.problem ? truncate(entry.problem, 80) : '<span style="color:var(--color-text-tertiary)">coming soon</span>';
    const solutionPreview = entry.solution ? truncate(entry.solution, 80) : '<span style="color:var(--color-text-tertiary)">coming soon</span>';

    entryRow.innerHTML = `
      <td>
        <span class="entry-name">${entry.name}</span>
        ${badgeHTML}
      </td>
      <td><span style="display:block;font-weight:500">${entry.role}</span>${teamHTML}</td>
      <td class="td-truncate">${problemPreview}</td>
      <td class="td-truncate">
        <div class="td-flex">
          <span>${solutionPreview}</span>
          <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </td>
    `;
    // staggered entrance: start invisible, animate in after a per-item delay
    entryRow.style.opacity = '0';
    entryRow.style.transform = 'translateY(12px)';
    entryRow.style.transition = `opacity 0.35s ease ${index * 60}ms, transform 0.35s ease ${index * 60}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        entryRow.style.opacity = '1';
        entryRow.style.transform = 'translateY(0)';
      });
    });
    tbody.appendChild(entryRow);

    // table: detail row (expanded content)
    const detailRow = document.createElement('tr');
    detailRow.className = 'detail-row';
    detailRow.dataset.id = entry.id;
    const refsHTML = (entry.refs && entry.refs.length)
      ? entry.refs.map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ref-link">${r.label}</a>`).join('')
      : '<span style="color:var(--color-text-tertiary);font-size:13px">no links yet</span>';

    detailRow.innerHTML = `
      <td colspan="4">
        <div class="detail-row__inner">
          <div class="detail-grid">
            <div>
              <div class="detail-label" data-full-text="problem / pain point">problem / pain point</div>
              ${toBullets(entry.problem)}
            </div>
            <div>
              <div class="detail-label" data-full-text="ai opportunity">ai opportunity</div>
              ${toBullets(entry.solution)}
            </div>
            <div>
              <div class="detail-label" data-full-text="ideas i'd try">ideas i'd try</div>
              <div class="detail-refs">${refsHTML}</div>
            </div>
          </div>
        </div>
      </td>
    `;
    tbody.appendChild(detailRow);

    // card
    const card = document.createElement('div');
    card.className = 'entry-card';
    card.dataset.id = entry.id;
    card.innerHTML = `
      <div class="card-header">
        <div>
          <div class="card-name">${entry.name}</div>
          <div class="card-role">${entry.role}</div>
          <div class="card-team">${entry.team}</div>
        </div>
        <span class="card-company-chip">${entry.company}</span>
      </div>
      <div class="card-problem">${truncate(entry.problem, 100)}</div>
      <div class="card-solution-section">
        <div class="solution-label">ai opportunity</div>
        ${toBullets(entry.solution)}
        ${(entry.refs && entry.refs.length) ? `
        <div class="solution-label" style="margin-top:14px">ideas i'd try</div>
        <div class="card-refs">${entry.refs.map(r => `<a href="${r.url}" target="_blank" rel="noopener noreferrer" class="ref-link">${r.label}</a>`).join('')}</div>
        ` : ''}
      </div>
      <div class="card-footer">
        <span class="card-expand-tag">view solution ↓</span>
      </div>
    `;
    // staggered entrance: start invisible + slightly scaled down, animate in
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px) scale(0.97)';
    card.style.transition = `opacity 0.4s ease ${index * 70}ms, transform 0.4s ease ${index * 70}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
    cardContainer.appendChild(card);
  });

  // re-attach click listeners after DOM rebuild
  attachRowListeners();
  attachCardListeners();
};

// ---------------------------------------------------------------------------
// click listeners (re-attached after every renderAll)
// ---------------------------------------------------------------------------

// delegates clicks on #entries-tbody to toggleExpand.
// stores handler ref on the element to avoid stacking duplicate listeners.
const attachRowListeners = () => {
  const tbody = document.getElementById('entries-tbody');

  if (tbody._rowClickHandler) {
    tbody.removeEventListener('click', tbody._rowClickHandler);
  }

  tbody._rowClickHandler = (event) => {
    const row = event.target.closest('.entry-row');
    if (row) toggleExpand(row.dataset.id);
  };

  tbody.addEventListener('click', tbody._rowClickHandler);
};

// delegates clicks on #card-container to toggleExpand.
const attachCardListeners = () => {
  const cardContainer = document.getElementById('card-container');

  if (cardContainer._cardClickHandler) {
    cardContainer.removeEventListener('click', cardContainer._cardClickHandler);
  }

  cardContainer._cardClickHandler = (event) => {
    const card = event.target.closest('.entry-card');
    if (card) toggleExpand(card.dataset.id);
  };

  cardContainer.addEventListener('click', cardContainer._cardClickHandler);
};

// ---------------------------------------------------------------------------
// filter
// ---------------------------------------------------------------------------

// filters entries by company and re-renders. updates active chip styling.
const setFilter = (company) => {
  currentFilter = company;

  document.querySelectorAll('.chip').forEach((chip) => {
    chip.classList.toggle('chip--active', chip.dataset.company === company);
  });

  const filtered =
    company === 'All'
      ? window.ENTRIES
      : window.ENTRIES.filter((e) => e.company === company);

  renderAll(filtered);
};

// ---------------------------------------------------------------------------
// view toggle (table <-> card)
// ---------------------------------------------------------------------------

// toggles between table view and card view with a fade+scale transition.
const toggleView = () => {
  const tableContainer = document.getElementById('table-container');
  const cardContainer  = document.getElementById('card-container');
  const btn = document.getElementById('view-toggle');
  const isCardView = document.body.classList.contains('card-view');

  const outgoing = isCardView ? cardContainer : tableContainer;
  const incoming = isCardView ? tableContainer : cardContainer;

  // fade out the currently visible container
  outgoing.style.opacity = '0';
  outgoing.style.transform = 'scale(0.98)';
  outgoing.style.transition = 'opacity 0.15s ease, transform 0.15s ease';

  setTimeout(() => {
    outgoing.style.display = 'none';
    outgoing.style.opacity = '';
    outgoing.style.transform = '';
    outgoing.style.transition = '';

    incoming.style.display = isCardView ? 'block' : 'grid';
    incoming.style.opacity = '0';
    incoming.style.transform = 'scale(0.98)';
    incoming.style.transition = 'none';

    // force reflow so the browser registers the starting state before we animate
    incoming.getBoundingClientRect();

    incoming.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    incoming.style.opacity = '1';
    incoming.style.transform = 'scale(1)';

    document.body.classList.toggle('card-view');

    btn.textContent = document.body.classList.contains('card-view')
      ? 'table view'
      : 'card view';

    setTimeout(() => {
      incoming.style.opacity = '';
      incoming.style.transform = '';
      incoming.style.transition = '';
      incoming.style.display = '';
    }, 300);
  }, 160);
};

// ---------------------------------------------------------------------------
// expand / collapse individual entries
// ---------------------------------------------------------------------------

// toggles expanded state for one entry in both table and card views
const toggleExpand = (id) => {
  // table view
  const detailRow = document.querySelector(`.detail-row[data-id="${id}"]`);
  const entryRow = document.querySelector(`.entry-row[data-id="${id}"]`);

  if (detailRow) {
    const isOpening = !detailRow.classList.contains('detail-row--open');
    detailRow.classList.toggle('detail-row--open');

    if (isOpening) {
      // type out all labels in sequence, one after the other
      const labels = Array.from(detailRow.querySelectorAll('.detail-label'));
      if (labels.length > 0) {
        // persist full text for re-opens
        labels.forEach(l => { l.dataset.fullText = l.dataset.fullText || l.textContent; });

        // chain: type label[0], then label[1], then label[2], etc.
        const typeChain = (index) => {
          if (index >= labels.length) return;
          typeText(labels[index], labels[index].dataset.fullText, 30, () => {
            setTimeout(() => typeChain(index + 1), 60);
          });
        };

        // wait for max-height transition to start, then type labels
        setTimeout(() => typeChain(0), 150);
      }
    }
  }
  if (entryRow) entryRow.classList.toggle('expanded');

  // card view
  const card = document.querySelector(`.entry-card[data-id="${id}"]`);
  if (card) {
    card.classList.toggle('expanded');
    const tag = card.querySelector('.card-expand-tag');
    if (tag) {
      tag.textContent = card.classList.contains('expanded')
        ? 'hide solution ↑'
        : 'view solution ↓';
    }
  }
};

// ---------------------------------------------------------------------------
// theme toggle (light <-> dark)
// ---------------------------------------------------------------------------

// toggles dark mode, persists to localStorage, swaps sun/moon icon
const toggleTheme = () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');

  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  const btn = document.getElementById('theme-toggle');
  btn.querySelector('.icon-sun').style.display = isDark ? 'none' : '';
  btn.querySelector('.icon-moon').style.display = isDark ? '' : 'none';
};

// ---------------------------------------------------------------------------
// typewriter hero animation (AI Map page — tab 2)
// ---------------------------------------------------------------------------

// types out the hero title letter by letter, then fades in subtitle and meta.
// called via onTabEnter(2) — NOT on DOMContentLoaded directly.
function typewriterHero() {
  // disable the CSS fade-in on .hero so we control visibility entirely here
  document.querySelector('.hero').style.animation = 'none';
  document.querySelector('.hero').style.opacity = '1';

  const title    = document.querySelector('.hero__title');
  const subtitle = document.querySelector('.hero__subtitle');
  const meta     = document.querySelector('.hero__meta');

  const fullText = title.textContent;
  title.textContent = '';
  title.style.opacity = '1'; // override any CSS fade-in so we control it

  // add a blinking cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  cursor.textContent = '|';
  title.appendChild(cursor);

  // hide subtitle and meta initially
  subtitle.style.opacity = '0';
  subtitle.style.transform = 'translateY(8px)';
  subtitle.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  meta.style.opacity = '0';
  meta.style.transform = 'translateY(8px)';
  meta.style.transition = 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s';

  let i = 0;
  const speed = 55; // ms per character

  function typeNext() {
    if (i < fullText.length) {
      // insert character before the cursor
      title.insertBefore(document.createTextNode(fullText[i]), cursor);
      i++;
      setTimeout(typeNext, speed);
    } else {
      // title done - remove cursor, then type the subtitle
      setTimeout(() => {
        cursor.style.animation = 'none';
        cursor.style.opacity = '0';
        cursor.style.transition = 'opacity 0.3s';
        setTimeout(() => cursor.remove(), 300);

        // type subtitle as two lines separated by \n (rendered as <br>)
        const subtitleFull = 'i\'d embed across teams to find what\'s actually blocking them\nx is where i live, that\'s where the ideas come from';
        subtitle.innerHTML = '';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';

        typeText(subtitle, subtitleFull, 28, () => {
          // fade in meta line after subtitle finishes
          setTimeout(() => {
            meta.style.opacity = '1';
            meta.style.transform = 'translateY(0)';
          }, 200);
        });
      }, 400);
    }
  }

  // small initial delay so the page has painted before typing starts
  setTimeout(typeNext, 300);
}

// ---------------------------------------------------------------------------
// initialisation
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  // 0. precompute scroll targets while scrollY=0 (must run before any scroll)
  initPageScrollTargets();

  // 1. restore saved theme preference
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    const btn = document.getElementById('theme-toggle');
    btn.querySelector('.icon-sun').style.display = 'none';
    btn.querySelector('.icon-moon').style.display = '';
  }

  // 2. typewriter for page 1 docs hero fires immediately (tab 0 is active on load)
  typewriterPageDocs();
  // mark tab 0 as visited so onTabEnter won't double-fire it
  // (tabsVisited is initialized with 0, so this is already handled)

  // 3. initial render with all entries (AI Map page)
  renderAll(window.ENTRIES);

  // 4. global event listeners
  document.getElementById('view-toggle').addEventListener('click', toggleView);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  // filter chips - delegated on the .filter-chips container
  const filterChipsContainer = document.querySelector('.filter-chips');
  if (filterChipsContainer) {
    filterChipsContainer.addEventListener('click', (event) => {
      if (event.target.matches('.chip')) {
        setFilter(event.target.dataset.company);
      }
    });
  }

  // row and card listeners are attached inside renderAll via
  // attachRowListeners() and attachCardListeners() - always fresh after re-render.

  // 5. init tab navigation and scroll reveal
  initTabs();
  initScrollReveal();

  // 7. typewriter on section labels as they enter viewport
  initSectionTypewriters();
});


/* =============================================================================
   AGENT 4: Sequential flow animations — initFlowAnimations
   ============================================================================= */

function initFlowAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const container = entry.target;
      if (container.dataset.flowAnimated === 'true') return;
      container.dataset.flowAnimated = 'true';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.classList.add('animating');
        });
      });
      observer.unobserve(container);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.arch-flow, .pipeline, .flow-diagram').forEach((el) => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFlowAnimations();
  initCustomCursor();
});

/* =============================================================================
   CUSTOM PRESENTATION CURSOR
   Blue ring follows the mouse with a slight lag, precise dot at pointer tip,
   click pulse, and hover magnetic effect on interactive elements.
   ============================================================================= */

function initCustomCursor() {
  const ring = document.createElement('div');
  ring.id = 'cursor-ring';
  ring.classList.add('cursor-hidden');

  const dot = document.createElement('div');
  dot.id = 'cursor-dot';
  dot.classList.add('cursor-hidden');

  document.body.appendChild(ring);
  document.body.appendChild(dot);

  let mouseX = -100;
  let mouseY = -100;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';

    ring.style.left = mouseX + 'px';
    ring.style.top  = mouseY + 'px';

    ring.classList.remove('cursor-hidden');
    dot.classList.remove('cursor-hidden');
  });

  document.addEventListener('mouseleave', () => {
    ring.classList.add('cursor-hidden');
    dot.classList.add('cursor-hidden');
  });

  // cursor only becomes visible after first mousemove sets position
  // (mouseenter fires before position is known, so we skip it)

  document.addEventListener('mousedown', () => ring.classList.add('clicking'));
  document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

  const interactiveSelector = [
    'a', 'button', '.tab-pill', '.tool-card',
    '.reason-block', '[role="button"]', 'label',
  ].join(', ');

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) ring.classList.add('hovering');
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) ring.classList.remove('hovering');
  });
}
