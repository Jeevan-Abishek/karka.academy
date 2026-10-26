/**
 * KARKA AI & TECH ACADEMY (karka.academy)
 * Full Interactive Functionality & Intelligence Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCoursesDropdown();
  initMobileDrawer();
  initNavbarScroll();
  initAskKarkaAI();
  initVideoStories();
  initBootcampPagination();
  initCareerDirectoryAccordion();
  initPapCalculator();
  initReviewFilters();
  initReviewsCarousel();
  initFaqAccordion();
  initModals();
  initLeadForm();
  initInfiniForm();
});

/* ==========================================================================
   0. THEME SWITCHER (Light Theme Default with Dark Mode Support)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const savedTheme = localStorage.getItem('karka_theme') || 'light';
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('karka_theme', newTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fa-solid fa-sun" style="color: #f59e0b;"></i> <span>Light</span>';
      }
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (toggleBtn) {
        toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> <span>Dark</span>';
      }
    }
  }
}

/* ==========================================================================
   1. DESKTOP COURSES DROPDOWN (Removed as requested)
   ========================================================================== */
function initCoursesDropdown() {
  // Our Courses dropdown removed
}

/* ==========================================================================
/* ==========================================================================
   2. MOBILE MENU & COURSES DRAWERS (Slide-over Modals)
   ========================================================================== */
function initMobileDrawer() {
  // Hamburger Menu Drawer
  const hamburgerBtn = document.getElementById('mobileMenuToggleBtn') || document.querySelector('.hamburger-btn');
  const megaDrawer = document.getElementById('megaDrawer');
  const megaCloseBtn = document.getElementById('drawerCloseBtn');
  const megaBackdrop = document.getElementById('drawerBackdrop');
  const megaLinks = megaDrawer ? megaDrawer.querySelectorAll('.drawer-link, .open-apply-modal') : [];

  // Courses Pill Button & Drawer
  const coursesBtn = document.getElementById('mobileCoursesBtn');
  const coursesDrawer = document.getElementById('coursesDrawer');
  const coursesCloseBtn = document.getElementById('coursesDrawerCloseBtn');
  const coursesBackdrop = document.getElementById('coursesDrawerBackdrop');
  const viewAllBtn = document.getElementById('btnViewAllPrograms');
  const coursesLinks = coursesDrawer ? coursesDrawer.querySelectorAll('.courses-drawer-card, .btn-view-all-programs') : [];

  function openMegaDrawer() {
    closeCoursesDrawer();
    if (megaDrawer) {
      megaDrawer.classList.add('active');
      megaDrawer.setAttribute('aria-hidden', 'false');
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMegaDrawer() {
    if (megaDrawer) {
      megaDrawer.classList.remove('active');
      megaDrawer.setAttribute('aria-hidden', 'true');
      if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
      if (!coursesDrawer || !coursesDrawer.classList.contains('active')) {
        document.body.style.overflow = '';
      }
    }
  }

  function openCoursesDrawer() {
    closeMegaDrawer();
    if (coursesDrawer) {
      coursesDrawer.classList.add('active');
      coursesDrawer.setAttribute('aria-hidden', 'false');
      if (coursesBtn) {
        coursesBtn.setAttribute('aria-expanded', 'true');
        coursesBtn.classList.add('active');
      }
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCoursesDrawer() {
    if (coursesDrawer) {
      coursesDrawer.classList.remove('active');
      coursesDrawer.setAttribute('aria-hidden', 'true');
      if (coursesBtn) {
        coursesBtn.setAttribute('aria-expanded', 'false');
        coursesBtn.classList.remove('active');
      }
      if (!megaDrawer || !megaDrawer.classList.contains('active')) {
        document.body.style.overflow = '';
      }
    }
  }

  // Hamburger Toggle
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (megaDrawer && megaDrawer.classList.contains('active')) {
        closeMegaDrawer();
      } else {
        openMegaDrawer();
      }
    });
  }

  if (megaCloseBtn) {
    megaCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMegaDrawer();
    });
  }

  if (megaBackdrop) {
    megaBackdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeMegaDrawer();
    });
  }

  megaLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMegaDrawer();
    });
  });

  // Courses Pill Button Toggle
  if (coursesBtn) {
    coursesBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (coursesDrawer && coursesDrawer.classList.contains('active')) {
        closeCoursesDrawer();
      } else {
        openCoursesDrawer();
      }
    });
  }

  if (coursesCloseBtn) {
    coursesCloseBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeCoursesDrawer();
    });
  }

  if (coursesBackdrop) {
    coursesBackdrop.addEventListener('click', (e) => {
      e.preventDefault();
      closeCoursesDrawer();
    });
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      closeCoursesDrawer();
    });
  }

  coursesLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeCoursesDrawer();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMegaDrawer();
      closeCoursesDrawer();
    }
  });

  // Automatically close drawers and restore scroll if viewport resized to desktop width
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
      closeMegaDrawer();
      closeCoursesDrawer();
    }
  });
}

/* ==========================================================================
   3. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. "ASK KARKA AI" INTERACTIVE INTELLIGENCE ENGINE
   ========================================================================== */
const aiKnowledgeBase = {
  pap: {
    title: 'Pay After Placement (PAP) Governance',
    response: 'Under our PAP framework, you pay ₹0 upfront tuition fee during the 6 months of training and studio internship in Nagercoil. Repayment begins only after accepting a verified offer of ₹4.5 LPA or higher, via capped monthly installments. If you do not secure a qualifying placement, you owe zero rupees.'
  },
  noncs: {
    title: 'Non-CS Background Eligibility',
    response: 'Over 60% of our successful alumni graduated from non-CS disciplines including Mechanical, Civil, Electrical, B.Sc Physics, and B.Com. Our 6-month curriculum starts from fundamental computational logic before moving to React, Node, AI APIs, and system architecture.'
  },
  salary: {
    title: 'Placement Packages & Statistics',
    response: 'Our verified placement track record features a 94.8% placement success rate, an average starting package of ₹5.8 LPA, and top offers reaching ₹12.4 LPA across companies like Zoho, Freshworks, HCL, Capecom, Novac, and Matrimony.com.'
  },
  internship: {
    title: 'AgileTribers Incubation Living Lab',
    response: 'AgileTribers is an integrated software production studio at our Nagercoil center. During the final 8–12 weeks, students write real production code, manage GitHub PR code reviews, and ship live features for real businesses instead of toy projects.'
  },
  default: {
    title: 'Karka AI Career Advisory',
    response: 'Karka AI & Tech Academy is Nagercoil\'s exclusive AI Learning Center offering high-impact bootcamps in Fullstack Web & AI, Data Science, UI/UX, and Cloud DevOps with 100% Pay After Placement (₹0 Upfront). Would you like to check your eligibility?'
  }
};

function initAskKarkaAI() {
  const form = document.getElementById('aiPromptForm');
  const input = document.getElementById('aiQueryInput');
  const micBtn = document.getElementById('micBtn');

  if (micBtn && input) {
    micBtn.addEventListener('click', () => {
      input.value = "Tell me about Pay After Placement and average salary";
      processAiQuery(input.value);
    });
  }

  if (form && input) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = input.value.trim();
      if (val) {
        processAiQuery(val);
      }
    });
  }
}

function askAiQuestion(query) {
  const input = document.getElementById('aiQueryInput');
  if (input) input.value = query;
  processAiQuery(query);
}

function processAiQuery(query) {
  const responseBox = document.getElementById('aiResponseBox');
  const responseContent = document.getElementById('aiResponseContent');
  if (!responseBox || !responseContent) return;

  const q = query.toLowerCase();
  let selected = aiKnowledgeBase.default;

  if (q.includes('pap') || q.includes('pay after') || q.includes('fees') || q.includes('0 upfront') || q.includes('upfront')) {
    selected = aiKnowledgeBase.pap;
  } else if (q.includes('non-cs') || q.includes('mechanical') || q.includes('civil') || q.includes('b.com') || q.includes('background') || q.includes('eligibility')) {
    selected = aiKnowledgeBase.noncs;
  } else if (q.includes('salary') || q.includes('package') || q.includes('placement') || q.includes('lpa') || q.includes('stats')) {
    selected = aiKnowledgeBase.salary;
  } else if (q.includes('intern') || q.includes('agiletribers') || q.includes('project') || q.includes('studio') || q.includes('lab')) {
    selected = aiKnowledgeBase.internship;
  }

  responseContent.innerHTML = `<strong>${selected.title}:</strong><br>${selected.response}`;
  responseBox.classList.add('active');
  responseBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeAiResponse() {
  const responseBox = document.getElementById('aiResponseBox');
  if (responseBox) responseBox.classList.remove('active');
}

/* ==========================================================================
   4. VIDEO TESTIMONIALS & LEARNER TABS
   ========================================================================== */
const storiesData = {
  gabriel: {
    name: 'Gabriel Samraj - FRONTEND DEVELOPER',
    role: 'Frontend Developer @ Zoho Corp (₹8.5 LPA)',
    quote: '"Karka\'s UI/UX design course was a game-changer for me. The instructors are passionate and the curriculum is up-to-date with the latest design trends. I now feel confident in my ability to create stunning visuals that stand out."',
    image: 'assets/images/karka-hero.jpg'
  },
  prabin: {
    name: 'Prabin Kumar',
    role: 'Fullstack Engineer @ Capecom (₹6.8 LPA)',
    quote: '"I studied B.Sc Physics with zero tech placement support from college. At Karka, building 10+ real projects in React and Node made me confident enough to build scalable SaaS apps."',
    image: 'assets/images/karka-studio.jpg'
  },
  shiju: {
    name: 'Shiju Nair',
    role: 'AI & Data Engineer @ Matrimony.com (₹7.2 LPA)',
    quote: '"Civil Engineering to AI seemed impossible until I joined Karka. The 4-Pillar system and prompt engineering drills gave me an unfair advantage over other candidates during placement rounds."',
    image: 'assets/images/karka-hero.jpg'
  },
  kishore: {
    name: 'Kishore Kannan',
    role: 'UI/UX Product Designer @ Freshworks (₹9.0 LPA)',
    quote: '"I came from B.Com and loved visual aesthetics. Karka\'s product design mentors taught me how to talk to users, build design systems in Figma, and build portfolios that hiring managers crave."',
    image: 'assets/images/karka-studio.jpg'
  },
  sridevi: {
    name: 'Sridevi Ananth',
    role: 'MERN Stack Developer @ HCL Tech (₹7.5 LPA)',
    quote: '"After a 3-year career break following motherhood, re-entering tech was daunting. Karka\'s supportive on-site mentors and outcome-aligned PAP model gave me my life and career back."',
    image: 'assets/images/karka-hero.jpg'
  }
};

function initVideoStories() {
  const tabs = document.querySelectorAll('.story-tab-btn');
  const nameEl = document.getElementById('featStoryName');
  const roleEl = document.getElementById('featStoryRole');
  const quoteEl = document.getElementById('featStoryQuote');
  const imgEl = document.getElementById('featStoryImg');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const storyKey = tab.getAttribute('data-story');
      const data = storiesData[storyKey];
      if (data && nameEl && roleEl && quoteEl && imgEl) {
        nameEl.textContent = data.name;
        roleEl.textContent = data.role;
        quoteEl.textContent = data.quote;
        imgEl.src = data.image;
      }
    });
  });
}

let isPlaying = false;
function toggleReelPlayback() {
  const icon = document.querySelector('#playBtnIcon i');
  const ctrlIcon = document.getElementById('ctrlPauseBtn');
  const fill = document.getElementById('videoProgressFill');

  isPlaying = !isPlaying;
  if (isPlaying) {
    if (icon) icon.className = 'fa-solid fa-pause';
    if (ctrlIcon) ctrlIcon.className = 'fa-solid fa-play';
    if (fill) fill.style.width = '85%';
  } else {
    if (icon) icon.className = 'fa-solid fa-play';
    if (ctrlIcon) ctrlIcon.className = 'fa-solid fa-pause';
  }
}

/* ==========================================================================
   5. BOOTCAMP PAGINATION & EXPLORER (#bootcamps)
   ========================================================================== */
function initBootcampPagination() {
  const pageBtns = document.querySelectorAll('.bootcamp-page-btn');
  const cards = document.querySelectorAll('#bootcampsGrid .bootcamp-card');

  function goToPage(pageNum) {
    pageNum = parseInt(pageNum, 10) || 1;
    if (pageNum < 1) pageNum = 1;
    if (pageNum > 6) pageNum = 6;

    // 1. Update active button state
    pageBtns.forEach(btn => {
      const p = parseInt(btn.getAttribute('data-page'), 10);
      btn.classList.toggle('active', p === pageNum);
    });

    // 2. Highlight and scroll the corresponding card into view smoothly
    const targetCard = document.querySelector(`#bootcampsGrid .bootcamp-card[data-program-index="${pageNum}"]`);
    if (targetCard) {
      cards.forEach(c => {
        c.style.transition = 'all 0.3s ease';
        c.style.borderColor = '';
        c.style.boxShadow = '';
      });
      targetCard.style.borderColor = 'var(--infosys-electric-blue)';
      targetCard.style.boxShadow = '0 0 0 3px rgba(0, 112, 243, 0.2), 0 10px 25px -5px rgba(0, 0, 0, 0.1)';
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => {
        targetCard.style.borderColor = '';
        targetCard.style.boxShadow = '';
      }, 2500);
    }
  }

  pageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const page = parseInt(btn.getAttribute('data-page'), 10);
      goToPage(page);
    });
  });

  window.switchBootcampPage = goToPage;
}

// Backwards-compatible stubs for previous custom tab panel references
function initAudienceTabs() {}
window.switchAudienceTab = function() {};
function initBootcampFilters() {}
window.resetBootcampFilters = function() {};
window.showAllBootcamps = function(e) {
  if (e) e.preventDefault();
};


/* ==========================================================================
   5B. CAREER TRACK DIRECTORY 2-COLUMN ACCORDION & FILTERS
   ========================================================================== */
function initCareerDirectoryAccordion() {
  const accordionItems = document.querySelectorAll('.directory-accordion-item');
  const trackFilterBtns = document.querySelectorAll('.track-filter-btn');

  // 1. Wire accordion headers to toggle expand/collapse
  accordionItems.forEach(item => {
    const header = item.querySelector('.directory-accordion-header');
    if (!header) return;

    header.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('is-open');

      if (isOpen) {
        item.classList.remove('is-open');
        header.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 2. Wire quick filter tabs for career directory tracks
  trackFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = btn.getAttribute('data-track-filter');

      trackFilterBtns.forEach(b => {
        if (b === btn) {
          b.classList.add('tab-active');
          b.setAttribute('aria-selected', 'true');
        } else {
          b.classList.remove('tab-active');
          b.setAttribute('aria-selected', 'false');
        }
      });

      accordionItems.forEach(item => {
        const itemCat = item.getAttribute('data-track-cat');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. FINANCIAL ROI CALCULATOR
   ========================================================================== */
function initPapCalculator() {
  const slider = document.getElementById('ctcSlider');
  const ctcDisplay = document.getElementById('calc-ctc-display');
  const inhandDisplay = document.getElementById('calc-inhand');
  const papMonthlyDisplay = document.getElementById('calc-pap-monthly');
  const netKeepDisplay = document.getElementById('calc-net-keep');

  if (!slider) return;

  function calculate() {
    const ctcLakhs = parseFloat(slider.value);
    ctcDisplay.textContent = `₹${ctcLakhs.toFixed(1)} LPA`;

    const monthlyGross = (ctcLakhs * 100000) / 12;
    const estimatedInHand = Math.round(monthlyGross * 0.86);
    const papContribution = Math.round(estimatedInHand * 0.15);
    const netTakeHome = estimatedInHand - papContribution;

    const formatINR = (val) => '₹' + val.toLocaleString('en-IN');

    inhandDisplay.textContent = formatINR(estimatedInHand) + '/mo';
    papMonthlyDisplay.textContent = formatINR(papContribution) + '/mo';
    netKeepDisplay.textContent = formatINR(netTakeHome) + '/mo';
  }

  slider.addEventListener('input', calculate);
  calculate();
}

/* ==========================================================================
   7. REVIEWS & TESTIMONIAL CAROUSEL
   ========================================================================== */
function initReviewsCarousel() {
  const track = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');

  if (!track || !prevBtn || !nextBtn) return;

  let currentOffset = 0;
  const cardWidth = 355; // card width + gap

  window._reviewsCarouselReset = function() {
    currentOffset = 0;
    track.style.transform = 'translateX(0px)';
  };

  nextBtn.addEventListener('click', () => {
    const visibleCards = track.querySelectorAll('.review-card:not(.hidden)');
    const visibleCount = visibleCards.length;
    const maxScroll = Math.max(0, (visibleCount - 1) * cardWidth);

    if (Math.abs(currentOffset) + cardWidth <= maxScroll) {
      currentOffset -= cardWidth;
      track.style.transform = `translateX(${currentOffset}px)`;
    } else {
      currentOffset = 0;
      track.style.transform = `translateX(0px)`;
    }
  });

  prevBtn.addEventListener('click', () => {
    if (currentOffset < 0) {
      currentOffset += cardWidth;
      track.style.transform = `translateX(${currentOffset}px)`;
    }
  });
}

/* ==========================================================================
   8. FAQS ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.toggleFaq(btn);
      }
    });
  });
}

window.toggleFaq = function(buttonEl) {
  if (!buttonEl) return;
  const item = buttonEl.closest('.faq-item');
  if (!item) return;
  const answer = item.querySelector('.faq-answer');
  const isOpen = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(el => {
    el.classList.remove('active');
    const ans = el.querySelector('.faq-answer');
    if (ans) ans.style.display = 'none';
    const btn = el.querySelector('.faq-question');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  });
  if (!isOpen) {
    item.classList.add('active');
    if (answer) answer.style.display = 'block';
    buttonEl.setAttribute('aria-expanded', 'true');
  }
};

window.toggleFaqItem = function(item) {
  if (!item) return;
  const btn = item.querySelector('.faq-question');
  if (btn) window.toggleFaq(btn);
};

/* ==========================================================================
   9. MODALS & APPLICATION FLOWS
   ========================================================================== */
const syllabusData = {
  // School Students Tracks
  'python-kids': {
    title: 'Python for Kids & Young Explorers',
    subtitle: 'Computational Logic, Pygame Game Development & Fun AI',
    modules: [
      { name: 'Module 1: Logic & Animation Basics', desc: 'Variables, loops, and conditions with visual storytelling and interactive challenges.' },
      { name: 'Module 2: Pygame 2D Game Development', desc: 'Building arcade games like Space Invaders and Flappy Bird with collision mechanics.' },
      { name: 'Module 3: Creative Algorithms & Mini AI Chatbots', desc: 'Simple natural language bots and fun machine learning mini-experiments.' }
    ]
  },
  'java-basics': {
    title: 'Java Basics for School Students',
    subtitle: 'Object-Oriented Programming & Problem Solving for Academic Excellence',
    modules: [
      { name: 'Module 1: Java Syntax & Fundamentals', desc: 'Data types, control structures, methods, and clean coding practices.' },
      { name: 'Module 2: OOP Pillars with Real Examples', desc: 'Classes, Objects, Inheritance, Encapsulation, and Polymorphism.' },
      { name: 'Module 3: High School Projects & Mini GUI Apps', desc: 'Building calculators, school quiz apps, and algorithmic logic challenges.' }
    ]
  },
  'html-css-school': {
    title: 'HTML & CSS for Beginners',
    subtitle: 'Build and Launch Your Very First Websites from Scratch',
    modules: [
      { name: 'Module 1: Modern Web Structure with HTML5', desc: 'Semantic tags, headers, lists, links, images, tables, and audio/video.' },
      { name: 'Module 2: Creative Styling with CSS3', desc: 'Colors, fonts, Flexbox layouts, borders, gradients, and hover effects.' },
      { name: 'Module 3: Portfolio Project & Live Hosting', desc: 'Creating your personal student portfolio website and deploying live on GitHub Pages.' }
    ]
  },
  'js-young-coders': {
    title: 'JavaScript for Young Coders',
    subtitle: 'Making Webpages Dynamic, Animated & Interactive',
    modules: [
      { name: 'Module 1: JS Fundamentals & Browser DOM', desc: 'Variables, events, button click listeners, and modifying HTML dynamically.' },
      { name: 'Module 2: Interactive Games & Timers', desc: 'Creating stopwatch apps, digital clocks, memory matching games, and quizzes.' },
      { name: 'Module 3: Canvas Graphics & Animations', desc: 'Drawing on HTML5 canvas, animating shapes, and interactive particle effects.' }
    ]
  },

  // College Students Tracks
  'internship-fullstack': {
    title: 'Full Stack Developer Internship (AgileTribers Studio)',
    subtitle: '6-Month Production Experience with Sprint Deliverables & Code Reviews',
    modules: [
      { name: 'Phase 1: Codebase Onboarding & Architecture', desc: 'Git flow, branching models, Dockerized services, and monorepo structure.' },
      { name: 'Phase 2: Full-Stack Feature Delivery', desc: 'Building React 19 UI features, RESTful microservices, and database schemas.' },
      { name: 'Phase 3: Automated Testing & CI/CD Pipelines', desc: 'Writing Jest/Playwright tests, automated GitHub Actions, and container deployment.' },
      { name: 'Phase 4: Client Demo, Code Audit & Experience Certificate', desc: 'Live release demos, peer code reviews, and industry portfolio verification.' }
    ]
  },
  'data-science-foundations': {
    title: 'Data Science & Machine Learning Foundations',
    subtitle: 'Python, NumPy, Pandas, Scikit-Learn & Real-World Data Pipelines',
    modules: [
      { name: 'Phase 1: Python for Data Science & EDA', desc: 'Data wrangling, cleaning datasets, visualization with Matplotlib & Seaborn.' },
      { name: 'Phase 2: Statistical Modeling & ML Algorithms', desc: 'Regression, classification, decision trees, hyperparameter tuning.' },
      { name: 'Phase 3: Real-Time BI & Prediction Dashboards', desc: 'Streamlit applications, interactive dashboarding, and KPI metric reporting.' }
    ]
  },
  'uiux-internship': {
    title: 'UI/UX Design Studio Internship',
    subtitle: 'Product Discovery, Wireframes, Figma Systems & High-Fidelity Prototypes',
    modules: [
      { name: 'Sprint 1: User Research & Empathy Mapping', desc: 'Conducting user interviews, synthesizing pain points, and user journeys.' },
      { name: 'Sprint 2: Figma Design System Architecture', desc: 'Auto-layout 5.0, typography tokens, component states, and accessibility.' },
      { name: 'Sprint 3: High-Fidelity Micro-Animations & Testing', desc: 'Interactive prototypes, usability testing sessions, and dev handoff specs.' }
    ]
  },
  'advanced-python-automation': {
    title: 'Advanced Python for Automation & Scripting',
    subtitle: 'APIs, Web Scraping, Process Automation & Backend Scripting',
    modules: [
      { name: 'Phase 1: Advanced Python & Async I/O', desc: 'Decorators, generators, concurrent execution with asyncio, and typing.' },
      { name: 'Phase 2: Web Scraping & Headless Automation', desc: 'BeautifulSoup, Playwright automated browsers, and robust data scraping.' },
      { name: 'Phase 3: REST API Integration & Scheduled Bots', desc: 'Connecting webhooks, building Telegram/Discord bots, and cron tasks.' }
    ]
  },
  'java-springboot': {
    title: 'Java Backend with Spring Boot & Microservices',
    subtitle: 'Enterprise Architecture, Spring Security, Hibernate ORM & Docker',
    modules: [
      { name: 'Phase 1: Modern Java 21 & Spring Boot Core', desc: 'Dependency injection, REST controllers, beans lifecycle, and Maven/Gradle.' },
      { name: 'Phase 2: Database Persistence with Spring Data JPA', desc: 'PostgreSQL integration, entity relationships, caching, and migrations.' },
      { name: 'Phase 3: JWT Security & Cloud Containerization', desc: 'Role-based access control, Docker compose, and AWS deployment.' }
    ]
  },
  'react-architecture': {
    title: 'Advanced React Architecture & Performance',
    subtitle: 'React 19, Server Components, State Machines & Scalable Design',
    modules: [
      { name: 'Phase 1: React 19 Compiler & Actions', desc: 'useOptimistic, useFormStatus, Server Actions, and rendering optimizations.' },
      { name: 'Phase 2: Scalable Global State & Architecture', desc: 'Zustand, TanStack Query, atomic architecture, and custom hook patterns.' },
      { name: 'Phase 3: Production Next.js App Router', desc: 'SSR, ISR, middleware routing, SEO optimization, and Edge deployment.' }
    ]
  },
  'sql-database': {
    title: 'SQL & Database Architecture Mastery',
    subtitle: 'Schema Design, Query Optimization, Indexing & Distributed Data',
    modules: [
      { name: 'Phase 1: Advanced Relational Modeling & Joins', desc: '3NF normalization, window functions, recursive CTEs, and views.' },
      { name: 'Phase 2: Indexing, EXPLAIN ANALYZE & Tuning', desc: 'B-tree vs GIN indexes, query execution plans, and bottleneck resolution.' },
      { name: 'Phase 3: Transactions, ACID & NoSQL Hybrids', desc: 'Isolation levels, PostgreSQL JSONB storage, Redis caching, and sharding.' }
    ]
  },

  // Graduates PAP Tracks
  'mern-fullstack': {
    title: 'MERN Fullstack Engineering (₹0 Upfront PAP)',
    subtitle: 'From JS Fundamentals to Scalable Microservices and AI Agents',
    modules: [
      { name: 'Phase 1: Modern JavaScript & TypeScript Foundations', desc: 'ES6+, functional programming, asynchronous event loop, TypeScript type systems.' },
      { name: 'Phase 2: React 19 & Component Architecture', desc: 'Hooks, custom state management (Zustand/Redux), Next.js App Router, SSR, Tailwind/Vanilla styling.' },
      { name: 'Phase 3: Scalable Node.js & MongoDB Backends', desc: 'Express REST APIs, JWT authentication, MongoDB schema validation, caching with Redis.' },
      { name: 'Phase 4: AI Agent & LLM Integration', desc: 'Integrating OpenAI/Anthropic APIs, LangChain, vector search, building agentic AI tools.' }
    ]
  },
  'ai-datascience': {
    title: 'AI & Data Science Specialist (₹0 Upfront PAP)',
    subtitle: 'Python, Machine Learning, Statistical Analysis & BI Dashboards',
    modules: [
      { name: 'Phase 1: Python for Data Analysis', desc: 'NumPy, Pandas, exploratory data analysis, data cleaning pipelines.' },
      { name: 'Phase 2: Machine Learning Algorithms', desc: 'Regression, classification, clustering with Scikit-Learn, cross-validation.' },
      { name: 'Phase 3: Deep Learning & Neural Nets', desc: 'PyTorch fundamentals, convolutional networks, transformers.' },
      { name: 'Phase 4: Power BI & Executive Dashboards', desc: 'DAX queries, interactive business dashboards, KPI forecasting.' }
    ]
  },
  'cloud-devops': {
    title: 'Cloud & DevOps Engineering (₹0 Upfront PAP)',
    subtitle: 'Linux, AWS, Docker, Kubernetes, Terraform & CI/CD Pipelines',
    modules: [
      { name: 'Phase 1: Linux Systems & Cloud Infrastructure', desc: 'Shell scripting, AWS EC2, VPC, S3, IAM security protocols.' },
      { name: 'Phase 2: Containerization & Kubernetes Orchestration', desc: 'Docker multistage builds, Kubernetes pods, deployments, services, and ingress.' },
      { name: 'Phase 3: Infrastructure as Code & CI/CD', desc: 'Terraform provisioning, GitHub Actions automation, monitoring with Prometheus & Grafana.' }
    ]
  },

  // Default aliases
  mern: {
    title: 'MERN Fullstack Development',
    subtitle: 'From JS Fundamentals to Production Microservices and AI Agents',
    modules: [
      { name: 'Phase 1: Modern JavaScript & TypeScript Foundations', desc: 'ES6+, functional programming, asynchronous event loop, TypeScript type systems.' },
      { name: 'Phase 2: React 19 & Component Architecture', desc: 'Hooks, custom state management (Zustand/Redux), Next.js App Router, SSR, Tailwind/Vanilla styling.' },
      { name: 'Phase 3: Scalable Node.js & MongoDB Backends', desc: 'Express REST APIs, JWT authentication, MongoDB schema validation, caching with Redis.' },
      { name: 'Phase 4: AI Agent & LLM Integration', desc: 'Integrating OpenAI/Anthropic APIs, LangChain, vector search, building agentic AI tools.' }
    ]
  },
  aiml: {
    title: 'AI & Data Science Professional',
    subtitle: 'Python, Machine Learning, Statistical Analysis & BI Dashboards',
    modules: [
      { name: 'Phase 1: Python for Data Analysis', desc: 'NumPy, Pandas, exploratory data analysis, data cleaning pipelines.' },
      { name: 'Phase 2: Machine Learning Algorithms', desc: 'Regression, classification, clustering with Scikit-Learn, cross-validation.' },
      { name: 'Phase 3: Deep Learning & Neural Nets', desc: 'PyTorch fundamentals, convolutional networks, transformers.' },
      { name: 'Phase 4: Power BI & Executive Dashboards', desc: 'DAX queries, interactive business dashboards, KPI forecasting.' }
    ]
  },
  uiux: {
    title: 'UI/UX & Product Design',
    subtitle: 'User Research, Wireframing, Figma Design Systems & Prototypes',
    modules: [
      { name: 'Phase 1: UX Research & Information Architecture', desc: 'User persona creation, journey mapping, empathy interviewing, IA tree testing.' },
      { name: 'Phase 2: High-Fidelity UI in Figma', desc: 'Auto-layout, responsive components, tokens, typography scales, accessibility standards.' },
      { name: 'Phase 3: Interactive Micro-Animations', desc: 'Advanced prototyping, component state transitions, handoff specifications.' },
      { name: 'Phase 4: Product Case Studies', desc: '2 end-to-end design case studies prepared for top design studio recruiting.' }
    ]
  },
  genai: {
    title: 'Generative AI Foundations & LLM Mastery',
    subtitle: 'Prompt Engineering, RAG Systems, Vector DBs & Autonomous Agents',
    modules: [
      { name: 'Module 1: Advanced Prompt Engineering', desc: 'Chain-of-thought, few-shot prompting, system message constraints.' },
      { name: 'Module 2: Embeddings & Vector Databases', desc: 'Pinecone, ChromaDB, chunking strategies, semantic retrieval.' },
      { name: 'Module 3: RAG Architecture', desc: 'Building production Retrieval-Augmented Generation on custom company documents.' },
      { name: 'Module 4: Autonomous Agents', desc: 'LangChain, AutoGen, tool calling, multi-agent cooperative workflows.' }
    ]
  },
  business: {
    title: 'Technical Business Analyst & Product Management',
    subtitle: 'Bridging Business Requirements, Data Analytics & Tech Architecture',
    modules: [
      { name: 'Phase 1: Business Analysis & Jira/Agile', desc: 'PRD documentation, user stories, Sprint ceremonies, workflow diagramming.' },
      { name: 'Phase 2: SQL & Relational Databases', desc: 'Writing complex queries, joins, data extraction, database schema analysis.' },
      { name: 'Phase 3: Power BI & Executive Dashboards', desc: 'DAX expressions, real-time KPI tracking, interactive client reporting.' },
      { name: 'Phase 4: AI Product Management', desc: 'Evaluating AI/ML feasibility, automated workflow specs, stakeholder communication.' }
    ]
  },
  marketing: {
    title: 'Content, Digital Marketing & Media',
    subtitle: 'SEO, Performance Marketing, Video Production & Brand Storytelling',
    modules: [
      { name: 'Phase 1: Brand Strategy & Copywriting', desc: 'Crafting high-converting copy, brand voice, content calendars, and storytelling.' },
      { name: 'Phase 2: Performance Marketing & SEO', desc: 'Search engine optimization, Google Ads, Meta advertising, technical auditing, and analytics.' },
      { name: 'Phase 3: Digital Media, Reels & Video Production', desc: 'Premiere Pro, CapCut, social media creative design, and viral short-form video strategies.' }
    ]
  },
  devops: {
    title: 'Cloud & DevOps Engineering',
    subtitle: 'Linux, AWS, Docker, Kubernetes, Terraform & CI/CD Pipelines',
    modules: [
      { name: 'Phase 1: Linux Systems & Cloud Infrastructure', desc: 'Shell scripting, AWS EC2, VPC, S3, IAM security protocols.' },
      { name: 'Phase 2: Containerization & Kubernetes Orchestration', desc: 'Docker multistage builds, Kubernetes pods, deployments, services, and ingress.' },
      { name: 'Phase 3: Infrastructure as Code & CI/CD', desc: 'Terraform provisioning, GitHub Actions automation, monitoring with Prometheus & Grafana.' }
    ]
  },
  python: {
    title: 'Python for Kids & Young Explorers',
    subtitle: 'Computational Logic, Pygame Game Development & Fun AI',
    modules: [
      { name: 'Module 1: Logic & Animation Basics', desc: 'Variables, loops, and conditions with visual storytelling and interactive challenges.' },
      { name: 'Module 2: Pygame 2D Game Development', desc: 'Building arcade games like Space Invaders and Flappy Bird with collision mechanics.' },
      { name: 'Module 3: Creative Algorithms & Mini AI Chatbots', desc: 'Simple natural language bots and fun machine learning mini-experiments.' }
    ]
  },
  fullstack: {
    title: 'Fullstack Web & Enterprise Software Development',
    subtitle: 'From JS Fundamentals to Scalable Microservices and AI Agents',
    modules: [
      { name: 'Phase 1: Modern JavaScript & TypeScript Foundations', desc: 'ES6+, functional programming, asynchronous event loop, TypeScript type systems.' },
      { name: 'Phase 2: React 19 & Component Architecture', desc: 'Hooks, custom state management (Zustand/Redux), Next.js App Router, SSR, Tailwind/Vanilla styling.' },
      { name: 'Phase 3: Scalable Node.js & MongoDB Backends', desc: 'Express REST APIs, JWT authentication, MongoDB schema validation, caching with Redis.' },
      { name: 'Phase 4: AI Agent & LLM Integration', desc: 'Integrating OpenAI/Anthropic APIs, LangChain, vector search, building agentic AI tools.' }
    ]
  }
};

/* ==========================================================================
   MODAL DIALOG ENGINE (PAP, Practice Curriculum / Syllabus, Infini AI)
   ========================================================================== */

function initModals() {
  const appForm = document.getElementById('papApplicationForm');

  // 1. Universal multi-step admission modal wired to all "ENROLL NOW", "Apply for Admission", and "START YOUR TRANSFORMATION" buttons
  document.querySelectorAll('button, a').forEach(btn => {
    const rawText = (btn.textContent || '').trim().replace(/\s+/g, ' ');
    const lower = rawText.toLowerCase();
    const isEnrollNow = lower.includes('enroll now') || lower.includes('enroll in') || lower.includes('enroll with');
    const isApplyAdmission = lower.includes('apply for admission') || lower.includes('apply for studio internship') || lower.includes('apply now');
    const isStartTransformation = lower.includes('start your transformation');
    const isVerifyPap = lower.includes('verify') && (lower.includes('pap') || lower.includes('eligibility'));
    const isApplyBtn = btn.classList.contains('open-apply-modal') || btn.classList.contains('btn-pro-enroll-solid') || btn.classList.contains('btn-bootcamp-enroll');

    if (isEnrollNow || isApplyAdmission || isStartTransformation || isVerifyPap || isApplyBtn) {
      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
          e.preventDefault();
        }

        // Close mobile drawer if open
        const drawer = document.getElementById('megaDrawer');
        if (drawer && drawer.classList.contains('active')) {
          drawer.classList.remove('active');
          drawer.setAttribute('aria-hidden', 'true');
        }
        const proDrawer = document.getElementById('proDrawerMenu');
        if (proDrawer && proDrawer.classList.contains('active')) {
          if (typeof closeProDrawer === 'function') closeProDrawer();
        }

        // Match optional track from data attribute
        const trackAttr = btn.getAttribute('data-track');
        if (trackAttr) {
          const selectElem = document.getElementById('appTrack');
          if (selectElem) {
            for (let i = 0; i < selectElem.options.length; i++) {
              if (selectElem.options[i].text.toLowerCase().includes(trackAttr.toLowerCase())) {
                selectElem.selectedIndex = i;
                break;
              }
            }
          }
        }

        openModal('applyModal');
      });
    }

    // 2. Syllabus preview modal wired to all "Explore [Course]" buttons
    const isExplore = lower.startsWith('explore') || btn.classList.contains('btn-pro-card-explore') || btn.classList.contains('btn-bootcamp-explore') || btn.classList.contains('open-syllabus-modal');
    if (isExplore) {
      btn.addEventListener('click', (e) => {
        const hasOnClick = btn.hasAttribute('onclick');
        if (!hasOnClick) {
          const href = btn.getAttribute('href');
          if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
            e.preventDefault();
          }
          const trackAttr = btn.getAttribute('data-track');
          let trackKey = trackAttr || 'mern';
          if (!trackAttr) {
            if (lower.includes('python for kids') || lower.includes('young explorers')) trackKey = 'python-kids';
            else if (lower.includes('java basics')) trackKey = 'java-basics';
            else if (lower.includes('html & css') || lower.includes('html and css')) trackKey = 'html-css-school';
            else if (lower.includes('javascript for young coders')) trackKey = 'js-young-coders';
            else if (lower.includes('internship') && lower.includes('full stack')) trackKey = 'internship-fullstack';
            else if (lower.includes('data science') || lower.includes('data analytics') || lower.includes('ai & data')) trackKey = 'data-science-foundations';
            else if (lower.includes('ui/ux') || lower.includes('design')) trackKey = 'uiux-internship';
            else if (lower.includes('automation') || lower.includes('python')) trackKey = 'advanced-python-automation';
            else if (lower.includes('spring boot') || lower.includes('java backend')) trackKey = 'java-springboot';
            else if (lower.includes('react architecture')) trackKey = 'react-architecture';
            else if (lower.includes('sql') || lower.includes('database')) trackKey = 'sql-database';
            else if (lower.includes('generative ai') || lower.includes('gen ai') || lower.includes('llm')) trackKey = 'genai';
            else if (lower.includes('cloud') || lower.includes('devops')) trackKey = 'devops';
            else if (lower.includes('video editing') || lower.includes('media') || lower.includes('marketing')) trackKey = 'marketing';
            else trackKey = 'mern';
          }
          openSyllabus(trackKey);
        }
      });
    }

    // 3. Wire "Register for Infini" buttons
    if (lower.includes('register for infini') || btn.classList.contains('open-infini-modal') || btn.id === 'btnRegisterInfini') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openInfiniModal();
      });
    }
  });

  // 3. Close button [×] handlers for all modals
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const modal = btn.closest('.modal-backdrop');
      if (modal) {
        closeModal(modal);
      }
    });
  });

  // 4. Backdrop outside click handlers for all modals
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // 5. Escape key listener to close active modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.modal-backdrop.active');
      if (activeModal) {
        closeModal(activeModal);
      }
    }
  });

  // 6. PAP multi-step form submit handler
  if (appForm) {
    appForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitPapApplication();
    });
  }
}

/**
 * Universal Modal Opener
 * Opens requested modal as a centered overlay and locks background scrolling
 */
function openModal(modalIdOrElem) {
  let modal;
  if (!modalIdOrElem) {
    modal = document.getElementById('applyModal');
  } else if (typeof modalIdOrElem === 'string') {
    modal = document.getElementById(modalIdOrElem);
  } else {
    modal = modalIdOrElem;
  }

  if (!modal) return;

  // Immediately dismiss any other active modals
  document.querySelectorAll('.modal-backdrop').forEach(m => {
    if (m !== modal) {
      m.classList.remove('active', 'closing');
    }
  });

  modal.classList.remove('closing');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // If opening PAP modal, ensure it starts at step 1
  if (modal.id === 'applyModal') {
    goToStep(1);
  }
}

/**
 * Universal Smooth Modal Closer
 * Transitions out smoothly via .closing class before hiding
 */
function closeModal(modalIdOrElem) {
  let modal;
  if (!modalIdOrElem) {
    modal = document.querySelector('.modal-backdrop.active');
  } else if (typeof modalIdOrElem === 'string') {
    modal = document.getElementById(modalIdOrElem);
  } else {
    modal = modalIdOrElem;
  }

  if (!modal || !modal.classList.contains('active')) return;

  modal.classList.remove('active');
  modal.classList.add('closing');

  setTimeout(() => {
    modal.classList.remove('closing');
    // Only restore body scrolling if no other modal is currently active
    if (!document.querySelector('.modal-backdrop.active')) {
      document.body.style.overflow = '';
    }
  }, 250);
}

function goToStep(stepNum) {
  if (stepNum === 2) {
    const name = document.getElementById('appName').value.trim();
    const email = document.getElementById('appEmail').value.trim();
    const phone = document.getElementById('appPhone').value.trim();
    if (!name || !email || !phone) {
      alert('Please fill in your name, email, and phone number to proceed.');
      return;
    }
  }

  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`step-${i}`);
    const progEl = document.getElementById(`prog-${i}`);
    if (stepEl) stepEl.classList.remove('active');
    if (progEl) {
      if (i <= stepNum) progEl.classList.add('active');
      else progEl.classList.remove('active');
    }
  }

  const targetStep = document.getElementById(`step-${stepNum}`);
  if (targetStep) targetStep.classList.add('active');
}

function submitPapApplication() {
  const name = document.getElementById('appName')?.value.trim() || 'Learner';
  const trackElem = document.getElementById('appTrack');
  const trackName = trackElem ? trackElem.options[trackElem.selectedIndex]?.text : 'Full Stack Development';
  const email = document.getElementById('appEmail')?.value || '';
  const phone = document.getElementById('appPhone')?.value || '';
  const degree = document.getElementById('appDegree')?.value || '';
  const gradYear = document.getElementById('appGradYear')?.value || '';
  const token = 'KARKA-NAG-' + Math.floor(1000 + Math.random() * 9000);
  
  const resName = document.getElementById('resUserName');
  if (resName) resName.textContent = name;
  const resTrack = document.getElementById('resUserTrack');
  if (resTrack) resTrack.textContent = trackName;
  const resToken = document.getElementById('resUserToken');
  if (resToken) resToken.textContent = token;

  // Post lead to backend
  fetch('http://localhost:5000/api/enroll', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token,
      name,
      email,
      phone,
      track: trackName,
      degree,
      gradYear,
      submittedAt: new Date().toISOString()
    })
  }).catch(err => {
    console.warn('Enrollment API error (offline fallback active):', err);
  });

  goToStep(4);

  // Confetti Celebration
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

/* Syllabus / Practice Curriculum Modal */
function openSyllabus(trackKey) {
  const modal = document.getElementById('syllabusModal');
  const title = document.getElementById('syllabusModalTitle');
  const sub = document.getElementById('syllabusModalSubtitle');
  const content = document.getElementById('syllabusModalContent');

  if (typeof syllabusData !== 'undefined') {
    const data = syllabusData[trackKey] || syllabusData.mern;
    if (title) title.textContent = data.title;
    if (sub) sub.textContent = data.subtitle;

    if (content) {
      let html = '<div style="display:flex; flex-direction:column; gap:1rem;">';
      data.modules.forEach(m => {
        html += `
          <div style="background: var(--bg-subtle); border: 1px solid var(--border-hairline); border-radius: 8px; padding: 1.2rem;">
            <h4 style="color: var(--infosys-electric-blue); font-size: 1.05rem; margin-bottom: 0.35rem;">${m.name}</h4>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.55;">${m.desc}</p>
          </div>
        `;
      });
      html += `
        <div style="margin-top: 1.2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap:wrap; gap:1rem;">
          <span style="font-size: 0.88rem; color: var(--accent-green); font-weight:700;"><i class="fa-solid fa-circle-check"></i> Eligible for ₹0 Upfront PAP</span>
          <button class="btn-enterprise-primary open-apply-modal" onclick="closeSyllabusModal(); openModal('applyModal');" style="font-size: 0.88rem; padding: 0.55rem 1.2rem;">
            Enroll for This Practice
          </button>
        </div>
      </div>`;

      content.innerHTML = html;
    }
  }

  openModal('syllabusModal');
}

function closeSyllabusModal() {
  closeModal('syllabusModal');
}

/* Infini Modal */
function openInfiniModal() {
  openModal('infiniModal');
}

function closeInfiniModal() {
  closeModal('infiniModal');
}

/* Make functions globally available for inline onclick calls */
window.openModal = openModal;
window.closeModal = closeModal;
window.openInfiniModal = openInfiniModal;
window.closeInfiniModal = closeInfiniModal;
window.closeSyllabusModal = closeSyllabusModal;
window.openSyllabus = openSyllabus;
window.goToStep = goToStep;
window.submitPapApplication = submitPapApplication;

function openSpikeDemo() {
  const input = document.getElementById('aiQueryInput');
  if (input) {
    input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input.focus();
    input.value = "Explain React Virtual DOM and how Spike AI tests code";
    processAiQuery(input.value);
  }
}

/* ==========================================================================
   10. LEAD CAPTURE & INFINI FORM HANDLERS
   ========================================================================== */
function initLeadForm() {
  const form = document.getElementById('leadCaptureForm');
  const successMsg = document.getElementById('leadSuccessMsg');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        name: document.getElementById('leadName')?.value || '',
        email: document.getElementById('leadEmail')?.value || '',
        phone: document.getElementById('leadPhone')?.value || '',
        program: document.getElementById('leadProgram')?.value || '',
        message: document.getElementById('leadMessage')?.value || '',
        submittedAt: new Date().toISOString()
      };

      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        console.log('Contact form submission response:', data);
      } catch (err) {
        console.warn('Backend server contact submission error (fallback active):', err);
      }

      if (successMsg) {
        successMsg.style.display = 'block';
        form.reset();
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 6000);
      }
    });
  }
}

function initInfiniForm() {
  const form = document.getElementById('infiniForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🎉 Infini AI Registration Successful! Your team registration token has been generated. Our campus coordinator will reach out shortly.');
      closeInfiniModal();
      form.reset();
    });
  }
}

/* ==========================================================================
   11. PLATFORMS SHOWCASE TAB SWITCHER (#platforms)
   ========================================================================== */
function initPlatformTabs() {
  const tabs = document.querySelectorAll('.platform-tab-btn');
  const panels = document.querySelectorAll('.platform-panel-card');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const platform = tab.getAttribute('data-platform');
      if (!platform) return;

      // 1. Update tab active state and ARIA
      tabs.forEach(btn => {
        const isCurrent = btn === tab;
        btn.classList.toggle('tab-active', isCurrent);
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      // 2. Switch active panel with animation
      panels.forEach(panel => {
        const panelPlatform = panel.id.replace('panel-platform-', '');
        if (panelPlatform === platform) {
          panel.classList.add('active');
          panel.setAttribute('aria-hidden', 'false');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/* ==========================================================================
   12. WHY KARKA 6-VALUE TABS & PREVIEW PANEL (#whyChooseUs)
   ========================================================================== */
function initWhyKarkaTabs() {
  const tabs = document.querySelectorAll('.why-tab-item');
  const panels = document.querySelectorAll('.why-preview-card');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const whyKey = tab.getAttribute('data-why');
      if (!whyKey) return;

      // 1. Update vertical tabs active state
      tabs.forEach(btn => {
        const isCurrent = btn === tab;
        btn.classList.toggle('tab-active', isCurrent);
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      // 2. Update preview display
      panels.forEach(panel => {
        const panelKey = panel.id.replace('why-panel-', '');
        if (panelKey === whyKey) {
          panel.classList.add('active');
          panel.setAttribute('aria-hidden', 'false');
        } else {
          panel.classList.remove('active');
          panel.setAttribute('aria-hidden', 'true');
        }
      });
    });
  });
}

/* ==========================================================================
   13. 4-PILLAR STEPPER PANEL (#pillars)
   ========================================================================== */
function initPillarStepper() {
  const stepBtns = document.querySelectorAll('.stepper-step-btn');
  const panels = document.querySelectorAll('.pillar-panel-view');
  const prevBtn = document.getElementById('pillarPrevBtn');
  const nextBtn = document.getElementById('pillarNextBtn');
  const counterSpan = document.getElementById('currentPillarNum');

  if (!stepBtns.length || !panels.length) return;

  let currentStep = 1;
  const totalSteps = stepBtns.length; // 4

  function goToStep(stepNum) {
    if (stepNum < 1) stepNum = 1;
    if (stepNum > totalSteps) stepNum = totalSteps;
    currentStep = stepNum;

    // Update step buttons
    stepBtns.forEach(btn => {
      const stepVal = parseInt(btn.getAttribute('data-pillar-step'), 10);
      const isCurrent = stepVal === currentStep;
      btn.classList.toggle('tab-active', isCurrent);
      btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });

    // Update active panel view
    panels.forEach(panel => {
      const panelStep = parseInt(panel.id.replace('pillar-panel-', ''), 10);
      if (panelStep === currentStep) {
        panel.classList.add('active');
        panel.setAttribute('aria-hidden', 'false');
      } else {
        panel.classList.remove('active');
        panel.setAttribute('aria-hidden', 'true');
      }
    });

    // Update counter
    if (counterSpan) {
      counterSpan.textContent = currentStep;
    }

    // Update Prev / Next button states
    if (prevBtn) {
      prevBtn.disabled = currentStep === 1;
    }
    if (nextBtn) {
      nextBtn.disabled = currentStep === totalSteps;
    }
  }

  // Click handlers on step headers
  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stepVal = parseInt(btn.getAttribute('data-pillar-step'), 10);
      if (stepVal) goToStep(stepVal);
    });
  });

  // Footer nav buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToStep(currentStep - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToStep(currentStep + 1);
    });
  }

  // Initialize step 1
  goToStep(1);
}

/* ==========================================================================
   14. ALUMNI SUCCESS STORIES FILTER PANEL (#reviews)
   ========================================================================== */
function initReviewFilters() {
  const filterPills = document.querySelectorAll('.review-filter-pill');
  const cards = document.querySelectorAll('#reviewsTrack .review-card');
  const track = document.getElementById('reviewsTrack');

  if (!filterPills.length || !cards.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const filterVal = pill.getAttribute('data-review-filter');
      if (!filterVal) return;

      // 1. Update filter pill active styling
      filterPills.forEach(btn => {
        const isCurrent = btn === pill;
        btn.classList.toggle('tab-active', isCurrent);
        btn.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      // 2. Filter review cards dynamically without reload
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.classList.remove('hidden');
          card.style.display = 'flex';
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });

      // 3. Reset carousel offset to start position
      if (track) {
        track.style.transform = 'translateX(0px)';
        if (window._reviewsCarouselReset) {
          window._reviewsCarouselReset();
        }
      }
    });
  });
}

/* ==========================================================================
   15. GRADUATES PAP CALCULATOR & MULTI-PAGE HELPERS
   ========================================================================== */
function initGradCalculator() {
  const slider = document.getElementById('grad-salary-slider');
  const salaryVal = document.getElementById('grad-calc-salary');
  const inhandVal = document.getElementById('grad-calc-inhand');
  const papVal = document.getElementById('grad-calc-pap');
  const netVal = document.getElementById('grad-calc-net');

  if (!slider) return;

  function updateGradCalc() {
    const ctcLakhs = parseFloat(slider.value);
    if (salaryVal) salaryVal.textContent = `₹${ctcLakhs.toFixed(1)} LPA`;

    const monthlyGross = (ctcLakhs * 100000) / 12;
    const estInHand = Math.round(monthlyGross * 0.88);
    const papContribution = Math.round(estInHand * 0.15);
    const netTakeHome = estInHand - papContribution;

    const formatINR = (val) => '₹' + val.toLocaleString('en-IN');

    if (inhandVal) inhandVal.textContent = formatINR(estInHand) + '/mo';
    if (papVal) papVal.textContent = formatINR(papContribution) + '/mo';
    if (netVal) netVal.textContent = formatINR(netTakeHome) + '/mo';
  }

  slider.addEventListener('input', updateGradCalc);
  updateGradCalc();
}

function toggleProDrawer() {
  const drawer = document.getElementById('proDrawer');
  const overlay = document.getElementById('proDrawerOverlay');
  if (drawer && overlay) {
    const isActive = drawer.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    document.body.style.overflow = isActive ? 'hidden' : '';
  }
}

function closeProDrawer() {
  const drawer = document.getElementById('proDrawer');
  const overlay = document.getElementById('proDrawerOverlay');
  if (drawer && overlay) {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initProDrawer() {
  const drawer = document.getElementById('proDrawer');
  const overlay = document.getElementById('proDrawerOverlay');
  if (!drawer) return;

  const links = drawer.querySelectorAll('a, button');
  links.forEach(el => {
    el.addEventListener('click', () => {
      closeProDrawer();
    });
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      closeProDrawer();
    });
  }

  const closeBtn = drawer.querySelector('.pro-drawer-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeProDrawer();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 769) {
      closeProDrawer();
    }
  });
}

window.toggleProDrawer = toggleProDrawer;
window.closeProDrawer = closeProDrawer;
window.initProDrawer = initProDrawer;
window.initGradCalculator = initGradCalculator;

// Auto-run grad calculator & pro drawer on pages
document.addEventListener('DOMContentLoaded', () => {
  initGradCalculator();
  initProDrawer();
});

