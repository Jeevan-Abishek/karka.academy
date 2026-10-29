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
    name: 'Gabriel Samraj',
    degreeTransition: 'BE Mechanical Engg (DMI College near Anjugramam)',
    course: 'Frontend Development (Main Project Complete)',
    highlightText: 'Friday Placement Training Attending',
    topBadge: 'DMI College &bull; Frontend Placement Track',
    company: 'DMI College near Anjugramam',
    companyName: 'DMI College (Anjugramam)',
    package: 'Placement Training',
    designation: 'Frontend Developer Trainee',
    statusDetail: 'Friday Placement Training',
    role: 'Frontend Developer Trainee • DMI College (Anjugramam) • Friday Placement Training',
    quote: '"I completed my BE in Mechanical Engineering from DMI College near Anjugramam. I came across Karka on Instagram and joined the Frontend Development program. I have now completed my main project and am actively attending the dedicated Friday placement training sessions, which have given me real interview confidence and technical problem-solving clarity."',
    image: 'assets/images/thumb-testimonial-gabriel.jpg',
    video: 'video/Video testimonial by Gabriel Samraj.mp4',
    proofLink: 'https://www.instagram.com/karka.ai',
    proofIcon: 'fa-brands fa-instagram',
    proofText: 'Discovered via Instagram (@karka.ai)'
  },
  kishore: {
    name: 'Kishore',
    degreeTransition: 'BSc Computer Science (Sivanthi Adinar College, Nagercoil)',
    course: 'Practical UI/UX Design & Figma Track',
    highlightText: 'Friend Referral &bull; Strong Career Scope',
    topBadge: 'Sivanthi Adinar College &bull; UI/UX Practical Track',
    company: 'Sivanthi Adinar College, Nagercoil',
    companyName: 'Sivanthi Adinar College',
    package: 'Friend Referral',
    designation: 'UI/UX Design Trainee',
    statusDetail: 'Friend Referral • Practical UI/UX',
    role: 'UI/UX Design Trainee • Sivanthi Adinar College, Nagercoil • Friend Referral',
    quote: '"I studied BSc Computer Science at Sivanthi Adinar College in Nagercoil and joined Karka through a friend\'s referral. The UI/UX training here is hands-on, practical, and directly aligned with what modern software companies look for, creating immense career scope."',
    image: 'assets/images/thumb-testimonial-kishore.jpg',
    video: 'video/Video testimonial by Kishore.mp4',
    proofLink: 'https://www.youtube.com/@karka_academy',
    proofIcon: 'fa-brands fa-youtube',
    proofText: 'Watch Kishore on YouTube (@karka_academy)'
  },
  prabin: {
    name: 'Prabin Raj',
    degreeTransition: 'Mathematics Background (from Kollancode)',
    course: 'Pay After Placement (PAP) Software Track',
    highlightText: 'Zero Laptop Start ➔ Successfully Placed',
    topBadge: 'Kollancode &bull; Placed via PAP Model',
    company: 'From Kollancode',
    companyName: 'Kollancode',
    package: 'Successfully Placed',
    designation: 'Placed Software Developer',
    statusDetail: 'Successfully Placed via PAP',
    role: 'Placed Software Developer • From Kollancode • Successfully Placed via PAP',
    quote: '"Coming from a Mathematics background in Kollancode, I had no coding experience and did not even own a laptop initially. Karka\'s Pay After Placement (PAP) model made it completely accessible for me to learn web technologies and get successfully placed into software engineering."',
    image: 'assets/images/thumb-testimonial-prabin.jpg',
    video: 'video/Video testimonial by Prabin Raj.mp4',
    proofLink: 'https://www.youtube.com/@karka_academy',
    proofIcon: 'fa-brands fa-youtube',
    proofText: 'Watch Prabin Raj on YouTube (@karka_academy)'
  },
  sridevi: {
    name: 'Bala Sridevi',
    degreeTransition: 'B.Com (Sriappa College for Women, Nagercoil)',
    course: 'UI/UX Design (Recommended by Hema Mam)',
    highlightText: 'IT Professional Mentoring &bull; Placement Support',
    topBadge: 'Sriappa College &bull; Non-Coding to Tech',
    company: 'Sriappa College for Women',
    companyName: 'Sriappa College for Women',
    package: 'IT Mentored',
    designation: 'UI/UX Designer',
    statusDetail: 'Hema Mam Guidance • Placement Support',
    role: 'UI/UX Designer • Sriappa College for Women, Nagercoil • Non-Coding to Tech',
    quote: '"I graduated in B.Com from Sriappa College for Women in Nagercoil with a non-coding background. I found Karka through Google, and during admission counseling, Hema Mam recommended the UI/UX design track for my strengths. The mentorship from active IT professionals and continuous placement support made my transition into tech smooth and confident."',
    image: 'assets/images/thumb-testimonial-sridevi.jpg',
    video: 'video/Video testimonial by Sridevi.mp4',
    proofLink: 'https://www.youtube.com/@karka_academy',
    proofIcon: 'fa-brands fa-youtube',
    proofText: 'Watch Bala Sridevi on YouTube (@karka_academy)'
  },
  shiju: {
    name: 'Shijumon',
    degreeTransition: 'MBA Student (from Mandaithivu)',
    course: 'Digital Marketing & Graphic Design',
    highlightText: 'Well-Organized Placement &bull; Affordable',
    topBadge: 'Mandaithivu &bull; Marketing &amp; Graphic Design',
    company: 'From Mandaithivu',
    companyName: 'Mandaithivu',
    package: 'MBA Graduate',
    designation: 'Digital Marketing & Graphic Specialist',
    statusDetail: 'Affordable &bull; Well-Organized Placement',
    role: 'Digital Marketer & Graphic Specialist • From Mandaithivu • MBA Graduate',
    quote: '"As an MBA student from Mandaithivu, I chose Karka for Digital Marketing and Graphic Design. The course pricing is very affordable, the practical skill development is exceptional, and the placement process is handled in a well-organized, structured manner. It gave me high-demand creative skills with verified placement assistance."',
    image: 'assets/images/thumb-testimonial-shiju.jpg',
    video: 'video/Video testimonial by Shiju Mon.mp4',
    proofLink: 'https://www.youtube.com/@karka_academy',
    proofIcon: 'fa-brands fa-youtube',
    proofText: 'Watch Shijumon on YouTube (@karka_academy)'
  }
};

let isReelPlaying = false;

function formatStoryVideoTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateVideoControlsUI(playingState) {
  isReelPlaying = playingState;
  const playBtnIcon = document.querySelector('#playBtnIcon i');
  const ctrlPauseBtn = document.getElementById('ctrlPauseBtn');
  const overlay = document.getElementById('videoPlayOverlay');

  if (playingState) {
    if (playBtnIcon) playBtnIcon.className = 'fa-solid fa-pause';
    if (ctrlPauseBtn) {
      ctrlPauseBtn.className = 'fa-solid fa-pause';
      ctrlPauseBtn.setAttribute('title', 'Pause video');
    }
    if (overlay) overlay.classList.add('playing');
  } else {
    if (playBtnIcon) playBtnIcon.className = 'fa-solid fa-play';
    if (ctrlPauseBtn) {
      ctrlPauseBtn.className = 'fa-solid fa-play';
      ctrlPauseBtn.setAttribute('title', 'Play video');
    }
    if (overlay) overlay.classList.remove('playing');
  }
}

function toggleReelPlayback() {
  const video = document.getElementById('featStoryVideo');
  if (!video) return;

  if (video.paused || video.ended) {
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateVideoControlsUI(true);
      }).catch(err => {
        console.warn('Playback prevented or aborted:', err);
      });
    }
  } else {
    video.pause();
    updateVideoControlsUI(false);
  }
}

function initVideoStories() {
  const tabs = document.querySelectorAll('.story-tab-btn');
  const nameEl = document.getElementById('featStoryName');
  const roleEl = document.getElementById('featStoryRole');
  const quoteEl = document.getElementById('featStoryQuote');
  const imgEl = document.getElementById('featStoryImg');
  const linkedinEl = document.getElementById('featCompanyLinkedin');
  const videoEl = document.getElementById('featStoryVideo');
  const videoSrcEl = document.getElementById('featStoryVideoSrc');
  const fill = document.getElementById('videoProgressFill');
  const timeDisplay = document.getElementById('videoTimeDisplay');
  const progressBar = document.getElementById('videoProgressBar');
  const volBtn = document.getElementById('ctrlVolumeBtn');

  // Dynamic badge and credential elements
  const topSpeakerEl = document.getElementById('featStoryTopSpeaker');
  const packageBadgeEl = document.getElementById('featStoryPackageBadge');
  const transitionEl = document.getElementById('featStoryTransition');
  const courseEl = document.getElementById('featStoryCourse');
  const packageTextEl = document.getElementById('featStoryPackageText');
  const designationEl = document.getElementById('featStoryDesignation');
  const companyEl = document.getElementById('featStoryCompany');
  const salaryEl = document.getElementById('featStorySalary');

  // Video event handlers
  if (videoEl) {
    videoEl.addEventListener('play', () => updateVideoControlsUI(true));
    videoEl.addEventListener('pause', () => updateVideoControlsUI(false));
    videoEl.addEventListener('ended', () => {
      updateVideoControlsUI(false);
      if (fill) fill.style.width = '100%';
    });

    videoEl.addEventListener('timeupdate', () => {
      if (videoEl.duration && !isNaN(videoEl.duration) && videoEl.duration > 0) {
        const percent = (videoEl.currentTime / videoEl.duration) * 100;
        if (fill) fill.style.width = `${percent}%`;
        if (timeDisplay) {
          timeDisplay.textContent = `${formatStoryVideoTime(videoEl.currentTime)} / ${formatStoryVideoTime(videoEl.duration)}`;
        }
      }
    });

    videoEl.addEventListener('loadedmetadata', () => {
      if (videoEl.duration && !isNaN(videoEl.duration) && videoEl.duration > 0) {
        if (timeDisplay && videoEl.currentTime > 0) {
          timeDisplay.textContent = `${formatStoryVideoTime(videoEl.currentTime)} / ${formatStoryVideoTime(videoEl.duration)}`;
        }
      }
    });
  }

  // Interactive seek on progress bar click
  if (progressBar && videoEl) {
    progressBar.addEventListener('click', (e) => {
      if (!videoEl.duration || isNaN(videoEl.duration)) return;
      const rect = progressBar.getBoundingClientRect();
      const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      videoEl.currentTime = clickRatio * videoEl.duration;
      if (fill) fill.style.width = `${clickRatio * 100}%`;
      if (timeDisplay) {
        timeDisplay.textContent = `${formatStoryVideoTime(videoEl.currentTime)} / ${formatStoryVideoTime(videoEl.duration)}`;
      }
    });
  }

  // Volume toggle
  if (volBtn && videoEl) {
    volBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      videoEl.muted = !videoEl.muted;
      if (videoEl.muted) {
        volBtn.className = 'fa-solid fa-volume-xmark';
        volBtn.setAttribute('title', 'Unmute audio');
      } else {
        volBtn.className = 'fa-solid fa-volume-high';
        volBtn.setAttribute('title', 'Mute audio');
      }
    });
  }

  // Story tab switching
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const storyKey = tab.getAttribute('data-story');
      const data = storiesData[storyKey];
      if (data) {
        // Update main text details
        if (nameEl) nameEl.textContent = data.name;
        if (quoteEl) quoteEl.textContent = data.quote;
        if (imgEl) imgEl.src = data.image;

        // Dynamically sync badges, degree transition, course, company & package
        if (topSpeakerEl) topSpeakerEl.textContent = data.name;
        if (packageBadgeEl) packageBadgeEl.innerHTML = data.topBadge || `${data.companyName || data.company} &bull; ${data.package}`;
        if (transitionEl) transitionEl.textContent = data.degreeTransition;
        if (courseEl) courseEl.textContent = data.course;
        if (packageTextEl) packageTextEl.innerHTML = data.highlightText || `${data.package} Package`;

        // Update author row details cleanly
        if (designationEl && companyEl && salaryEl) {
          designationEl.textContent = data.designation;
          companyEl.textContent = data.companyName || data.company;
          salaryEl.textContent = data.statusDetail || data.package;
        } else if (roleEl) {
          roleEl.textContent = data.role;
        }

        if (linkedinEl && data.proofLink) {
          linkedinEl.href = data.proofLink;
          linkedinEl.innerHTML = `<i class="${data.proofIcon || 'fa-brands fa-youtube'}"></i> <span>${data.proofText}</span>`;
        }

        // Seamless video update
        if (videoEl && data.video) {
          videoEl.pause();
          updateVideoControlsUI(false);
          videoEl.poster = data.image;
          if (videoSrcEl) {
            videoSrcEl.src = data.video;
          }
          videoEl.src = data.video;
          videoEl.load();
          if (fill) fill.style.width = '0%';
          if (timeDisplay) {
            timeDisplay.textContent = '00:00 / 00:00';
          }
        }
      }
    });
  });
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
  const pageNumbersContainer = document.getElementById('reviewsPageNumbers');

  if (!track || !prevBtn || !nextBtn) return;

  let currentPage = 1;
  let currentOffset = 0;

  function getStep() {
    const firstCard = track.querySelector('.review-card:not(.hidden)');
    if (!firstCard) return 360;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 24;
    return firstCard.offsetWidth + gap;
  }

  function getCardsPerPage() {
    const wrapper = track.parentElement;
    const wrapperWidth = wrapper ? wrapper.clientWidth : 1100;
    const step = getStep();
    return Math.max(1, Math.floor((wrapperWidth + 24) / step));
  }

  function getMaxScroll() {
    const visibleCards = track.querySelectorAll('.review-card:not(.hidden)');
    if (!visibleCards.length) return 0;
    const wrapper = track.parentElement;
    const wrapperWidth = wrapper ? wrapper.clientWidth : 1100;
    const step = getStep();
    const totalWidth = visibleCards.length * step - 24;
    return Math.max(0, totalWidth - wrapperWidth);
  }

  function getTotalPages() {
    const visibleCards = track.querySelectorAll('.review-card:not(.hidden)');
    if (!visibleCards.length) return 1;
    const cardsPerPage = getCardsPerPage();
    return Math.max(1, Math.ceil(visibleCards.length / cardsPerPage));
  }

  function updateTransform() {
    track.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    track.style.transform = `translateX(${currentOffset}px)`;
  }

  function updateActivePageBtn() {
    if (!pageNumbersContainer) return;
    const btns = pageNumbersContainer.querySelectorAll('.reviews-page-btn');
    btns.forEach(btn => {
      const p = parseInt(btn.getAttribute('data-page'), 10);
      const isActive = p === currentPage;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  }

  function goToPage(pageNum) {
    const totalPages = getTotalPages();
    currentPage = Math.max(1, Math.min(pageNum, totalPages));
    const maxScroll = getMaxScroll();
    const cardsPerPage = getCardsPerPage();
    const step = getStep();

    if (currentPage === 1) {
      currentOffset = 0;
    } else if (currentPage === totalPages) {
      currentOffset = -maxScroll;
    } else {
      currentOffset = -Math.min(maxScroll, (currentPage - 1) * cardsPerPage * step);
    }

    updateTransform();
    updateActivePageBtn();
  }

  function renderPageNumbers() {
    if (!pageNumbersContainer) return;
    const totalPages = getTotalPages();
    pageNumbersContainer.innerHTML = '';

    for (let p = 1; p <= totalPages; p++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `reviews-page-btn ${p === currentPage ? 'active' : ''}`;
      btn.setAttribute('data-page', p);
      btn.setAttribute('aria-label', `Go to testimonial page ${p}`);
      btn.setAttribute('aria-current', p === currentPage ? 'true' : 'false');
      btn.innerHTML = `<span class="page-dot"></span><span class="page-num">${p}</span>`;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        goToPage(p);
      });

      pageNumbersContainer.appendChild(btn);
    }
  }

  window._reviewsCarouselReset = function() {
    currentPage = 1;
    currentOffset = 0;
    updateTransform();
    renderPageNumbers();
  };

  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = getTotalPages();
    if (totalPages <= 1) return;
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    } else {
      goToPage(1); // loop back to first
    }
  });

  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const totalPages = getTotalPages();
    if (totalPages <= 1) return;
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    } else {
      goToPage(totalPages); // loop to last
    }
  });

  // Touch swipe support for smooth mobile interaction
  let touchStartX = 0;
  let touchEndX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDiff = touchStartX - touchEndX;
    if (Math.abs(swipeDiff) > 50) {
      if (swipeDiff > 0) {
        // Swiped left -> next
        nextBtn.click();
      } else {
        // Swiped right -> prev
        prevBtn.click();
      }
    }
  }, { passive: true });

  window.addEventListener('resize', () => {
    renderPageNumbers();
    goToPage(currentPage);
  });

  // Initial render of page numbers
  renderPageNumbers();
}

/* ==========================================================================
   8. FAQS ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      window.toggleFaq(btn);
    };

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

  // Single open accordion pattern: close all other open FAQs smoothly
  document.querySelectorAll('.faq-item').forEach(el => {
    if (el !== item) {
      el.classList.remove('active');
      const ans = el.querySelector('.faq-answer');
      if (ans) {
        ans.style.maxHeight = null;
        ans.style.display = 'none';
      }
      const btn = el.querySelector('.faq-question');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });

  if (isOpen) {
    item.classList.remove('active');
    buttonEl.setAttribute('aria-expanded', 'false');
    if (answer) {
      answer.style.maxHeight = answer.scrollHeight + 'px';
      void answer.offsetHeight; // force reflow
      answer.style.maxHeight = '0px';
      setTimeout(() => {
        if (!item.classList.contains('active')) {
          answer.style.display = 'none';
        }
      }, 350);
    }
  } else {
    item.classList.add('active');
    buttonEl.setAttribute('aria-expanded', 'true');
    if (answer) {
      answer.style.display = 'block';
      answer.style.maxHeight = '0px';
      void answer.offsetHeight; // force reflow
      answer.style.maxHeight = (answer.scrollHeight + 40) + 'px';
      setTimeout(() => {
        if (item.classList.contains('active')) {
          answer.style.maxHeight = 'none';
        }
      }, 350);
    }
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

    // 3. Wire "Register for Infini" buttons (only if not an external link)
    if (btn.classList.contains('open-infini-modal')) {
      const href = btn.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          openInfiniModal();
        });
      }
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

      // 2. Filter review cards smoothly without reload
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const matches = (filterVal === 'all' || category === filterVal);
        if (matches) {
          card.classList.remove('hidden');
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.classList.add('hidden');
          card.style.display = 'none';
        }
      });

      // 3. Reset carousel offset to start position
      if (window._reviewsCarouselReset) {
        window._reviewsCarouselReset();
      } else if (track) {
        track.style.transform = 'translateX(0px)';
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

/* ==========================================================================
   HIGH-CONVERSION LEAD GENERATION: WHATSAPP SYLLABUS, PAP TERMS & 60S QUIZ
   ========================================================================== */

// 1. SYLLABUS-TO-WHATSAPP MODAL
function openSyllabusWhatsAppModal(trackName) {
  const modal = document.getElementById('syllabusWhatsAppModal');
  const headerTitle = document.getElementById('syllabusModalHeaderTitle');
  const selectTrack = document.getElementById('syllabusTrackSelect');
  const errorMsg = document.getElementById('syllabusPhoneError');
  const toast = document.getElementById('syllabusSuccessToast');
  const form = document.getElementById('syllabusWhatsAppForm');
  const phoneInput = document.getElementById('syllabusPhoneInput');

  if (errorMsg) errorMsg.style.display = 'none';
  if (toast) toast.style.display = 'none';
  if (form) form.style.display = 'block';

  const defaultTrack = trackName || 'MERN Fullstack Development';
  if (headerTitle) {
    headerTitle.textContent = `Download ${defaultTrack} Official Syllabus & Fee Structure`;
  }

  if (selectTrack) {
    let found = false;
    for (let i = 0; i < selectTrack.options.length; i++) {
      if (selectTrack.options[i].value.toLowerCase().includes(defaultTrack.toLowerCase()) ||
          defaultTrack.toLowerCase().includes(selectTrack.options[i].value.toLowerCase())) {
        selectTrack.selectedIndex = i;
        found = true;
        break;
      }
    }
    if (!found) {
      // Add custom track option and select it
      const newOpt = document.createElement('option');
      newOpt.value = defaultTrack;
      newOpt.textContent = defaultTrack;
      selectTrack.appendChild(newOpt);
      selectTrack.value = defaultTrack;
    }
  }

  // Prevent background scrolling
  document.body.classList.add('modal-open');
  if (modal) modal.classList.add('active');
  if (phoneInput) setTimeout(() => phoneInput.focus(), 150);
}

function closeSyllabusWhatsAppModal() {
  const modal = document.getElementById('syllabusWhatsAppModal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

async function handleSyllabusWhatsAppSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('syllabusNameInput');
  const phoneInput = document.getElementById('syllabusPhoneInput');
  const selectTrack = document.getElementById('syllabusTrackSelect');
  const optInCheckbox = document.getElementById('syllabusOptInCheckbox');
  const submitBtn = document.getElementById('syllabusSubmitBtn');
  const errorMsg = document.getElementById('syllabusPhoneError');
  const toast = document.getElementById('syllabusSuccessToast');
  const form = document.getElementById('syllabusWhatsAppForm');

  const name = nameInput ? nameInput.value.trim() : '';
  const rawPhone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
  const track = selectTrack ? selectTrack.value : 'MERN Fullstack Development';
  const optIn = optInCheckbox ? optInCheckbox.checked : true;

  // Validate 10-digit Indian phone number
  if (rawPhone.length !== 10) {
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Please enter a valid 10-digit WhatsApp number (without +91)';
    }
    phoneInput?.focus();
    return;
  }
  if (errorMsg) errorMsg.style.display = 'none';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Syllabus...';
  }

  // Asynchronously send lead data to POST /api/leads/syllabus-download
  try {
    const apiBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? (window.location.port === '5000' ? '' : 'http://localhost:5000')
      : '';
    await fetch(`${apiBase}/api/leads/syllabus-download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        phone: '+91' + rawPhone,
        course: track,
        source: 'whatsapp_syllabus',
        optInUpdates: optIn,
        status: 'New'
      })
    });
  } catch (err) {
    console.warn('Backend logging error or offline:', err);
  }

  // Construct official WhatsApp chat link:
  // https://wa.me/919487530243?text=Hi%20Karka%20Academy,%20I%20am%20[NAME].%20Please%20send%20me%20the%20detailed%20syllabus%20and%20PAP%20fee%20structure%20for%20[TRACK_NAME].
  const waText = `Hi Karka Academy, I am ${name}. Please send me the detailed syllabus and PAP fee structure for ${track}.`;
  const waUrl = `https://wa.me/919487530243?text=${encodeURIComponent(waText)}`;
  window.open(waUrl, '_blank');

  // Friendly success confirmation toast
  if (toast) {
    toast.style.display = 'block';
  }

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Receive Syllabus on WhatsApp &rarr;</span> <i class="fa-brands fa-whatsapp"></i>';
  }

  // Auto-close modal in 2 seconds
  setTimeout(() => {
    closeSyllabusWhatsAppModal();
    if (form) form.reset();
    if (toast) toast.style.display = 'none';
  }, 2000);
}

// 2. PAP CONTRACT EXPLAINER MODAL
function openPapTermsModal() {
  const modal = document.getElementById('papTermsModal');
  if (modal) modal.classList.add('active');
}

function closePapTermsModal() {
  const modal = document.getElementById('papTermsModal');
  if (modal) modal.classList.remove('active');
}

// 3. 60-SECOND PAP ELIGIBILITY QUIZ & PERSONALIZED ROADMAP
let quizAnswers = {
  degree: '',
  year: '',
  careerGoal: '',
  commitment: '',
  name: '',
  phone: ''
};

function openPapQuizModal() {
  const modal = document.getElementById('papQuizModal');
  if (modal) modal.classList.add('active');
  document.body.classList.add('modal-open');
  goToQuizStep(1);
}

function closePapQuizModal() {
  const modal = document.getElementById('papQuizModal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function selectQuizOption(field, value, nextStep) {
  quizAnswers[field] = value;
  
  // Highlight chosen option button
  const currentStepEl = document.querySelector(`.quiz-step[data-step="${nextStep - 1}"]`);
  if (currentStepEl) {
    currentStepEl.querySelectorAll('.quiz-opt-btn').forEach(btn => {
      btn.classList.toggle('selected', btn.getAttribute('data-val') === value);
    });
  }

  setTimeout(() => {
    goToQuizStep(nextStep);
  }, 200);
}

function goToQuizStep(stepNum) {
  const allSteps = document.querySelectorAll('#papQuizModal .quiz-step');
  allSteps.forEach(s => s.classList.remove('active'));

  const targetStep = document.querySelector(`#papQuizModal .quiz-step[data-step="${stepNum}"]`);
  if (targetStep) targetStep.classList.add('active');

  const fillEl = document.getElementById('quizProgressFill');
  const indEl = document.getElementById('quizStepNum');
  if (fillEl) {
    const pct = Math.min(100, Math.round((stepNum / 5) * 100));
    fillEl.style.width = `${pct}%`;
  }
  if (indEl && stepNum <= 5) {
    indEl.textContent = `Step ${stepNum} of 5`;
  } else if (indEl) {
    indEl.textContent = 'Eligible Match Result';
  }
}

async function handleQuizLeadSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('quizLeadName');
  const phoneInput = document.getElementById('quizLeadPhone');
  const errorMsg = document.getElementById('quizLeadPhoneError');
  const submitBtn = document.getElementById('quizSubmitBtn');

  const name = nameInput ? nameInput.value.trim() : 'Student';
  const rawPhone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';

  if (rawPhone.length !== 10) {
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Please enter a valid 10-digit WhatsApp number (without +91)';
    }
    phoneInput?.focus();
    return;
  }
  if (errorMsg) errorMsg.style.display = 'none';

  quizAnswers.name = name;
  quizAnswers.phone = '+91' + rawPhone;

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Calculating Fit Score &amp; Approval...';
  }

  // Calculate Compatibility Fit Score
  let fitScore = 95;
  if (quizAnswers.commitment === 'Full-time On-site in Nagercoil') fitScore += 3;
  else if (quizAnswers.commitment === 'Hybrid') fitScore += 1;

  if (quizAnswers.degree === 'Engineering CS' || quizAnswers.degree === 'Working Professional') fitScore += 1;
  if (quizAnswers.year === '2024' || quizAnswers.year === '2025') fitScore += 1;
  fitScore = Math.min(98, Math.max(94, fitScore));

  // Determine Personalized Track Recommendation
  let recTrack = 'MERN Fullstack Track';
  if (quizAnswers.careerGoal === 'AI & Data Scientist') recTrack = 'AI & Data Science Track';
  else if (quizAnswers.careerGoal === 'UI-UX Designer') recTrack = 'UI/UX Product Design Track';
  else if (quizAnswers.careerGoal === 'Python Specialist') recTrack = 'Python & AI Engineering Track';

  // Save lead & fit score to backend MongoDB: POST /api/leads/quiz
  try {
    const apiBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? (window.location.port === '5000' ? '' : 'http://localhost:5000')
      : '';
    await fetch(`${apiBase}/api/leads/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        phone: '+91' + rawPhone,
        course: recTrack,
        fitScore: `${fitScore}% Fit`,
        quizAnswers: quizAnswers,
        source: 'pap_eligibility_quiz'
      })
    });
  } catch (err) {
    console.warn('Backend quiz lead logging offline:', err);
  }

  // Setup Step 6 Result Screen
  const scoreDisplay = document.getElementById('quizFitScoreDisplay');
  const headlineDisplay = document.getElementById('quizFitHeadline');
  const trackDisplay = document.getElementById('quizRecTrack');
  const waConfirmBtn = document.getElementById('quizWhatsAppConfirmBtn');

  if (scoreDisplay) scoreDisplay.textContent = `${fitScore}% Fit`;
  if (headlineDisplay) headlineDisplay.textContent = `${fitScore}% Fit for ${recTrack} under ₹0 Upfront PAP`;
  if (trackDisplay) trackDisplay.textContent = recTrack;

  const waPrompt = `Hi Karka Academy, I completed the PAP Eligibility Quiz with a ${fitScore}% fit for ${recTrack}! My name is ${name} (+91${rawPhone}). Please schedule my 1:1 counselor roadmap call and reserve my provisional seat.`;
  if (waConfirmBtn) {
    waConfirmBtn.href = `https://wa.me/919487530243?text=${encodeURIComponent(waPrompt)}`;
  }

  goToQuizStep(6);

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Calculate My PAP Fit Score &amp; Roadmap &rarr;</span>';
  }
}

/* ==========================================================================
   17. FEATURE #3: INTERACTIVE CODE LAB (PROFESSIONAL COMPONENT PLAYGROUND)
   ========================================================================== */
const INITIAL_SANDBOX_CODE = `<button class="btn-production-cta" style="
  background: #7c3aed;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.28);
  cursor: pointer;
  transition: all 0.2s ease;
">
  Get Started Free &rarr;
</button>`;

const COMPONENT_PRESETS = {
  enterprise: `<button class="btn-production-cta" style="
  background: #7c3aed;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 12px 24px rgba(124, 58, 237, 0.28);
  cursor: pointer;
  transition: all 0.2s ease;
">
  Get Started Free &rarr;
</button>`,
  gradient: `<button class="btn-production-cta" style="
  background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 15px 30px;
  font-size: 16px;
  font-weight: 800;
  box-shadow: 0 14px 28px rgba(124, 58, 237, 0.35);
  cursor: pointer;
  transition: all 0.2s ease;
">
  Explore Programs &rarr;
</button>`,
  emerald: `<button class="btn-production-cta" style="
  background: #4c1d95;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 13px 26px;
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(76, 29, 149, 0.3);
  cursor: pointer;
  transition: all 0.2s ease;
">
  Enroll with ₹0 Upfront &rarr;
</button>`
};

const PRESET_STYLES = {
  enterprise: { radius: '10', padding: '14', shadow: '12' },
  gradient: { radius: '12', padding: '15', shadow: '14' },
  emerald: { radius: '8', padding: '13', shadow: '10' }
};

let codeDebounceTimer = null;

function initSandboxChallenge() {
  const codeInput = document.getElementById('sandboxCodeInput');
  const liveOutput = document.getElementById('sandboxLiveOutput');
  const gutter = document.getElementById('codeEditorGutter');

  if (!codeInput || !liveOutput) return;

  // Initialize interactive component sliders
  initCodeLabSliders();

  // Live preview update with debounced parsing
  codeInput.addEventListener('input', () => {
    updateSandboxPreview(codeInput.value);
    updateGutterLineNumbers();

    clearTimeout(codeDebounceTimer);
    codeDebounceTimer = setTimeout(() => {
      syncCodeToSlidersAndHud(codeInput.value);
    }, 50);
  });

  // Sync scrolling between code textarea & line numbers gutter
  codeInput.addEventListener('scroll', () => {
    if (gutter) gutter.scrollTop = codeInput.scrollTop;
  });

  // Support Tab key inside editor
  codeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeInput.selectionStart;
      const end = codeInput.selectionEnd;
      codeInput.value = codeInput.value.substring(0, start) + '  ' + codeInput.value.substring(end);
      codeInput.selectionStart = codeInput.selectionEnd = start + 2;
      updateSandboxPreview(codeInput.value);
      updateGutterLineNumbers();
      syncCodeToSlidersAndHud(codeInput.value);
    }
  });

  // Initial preview render & gutter setup
  updateSandboxPreview(codeInput.value);
  updateGutterLineNumbers();
  syncCodeToSlidersAndHud(codeInput.value);
}

/* ==========================================================================
   COMPONENT PROPERTY SLIDERS & REAL-TIME CSS SYNC
   ========================================================================== */
function initCodeLabSliders() {
  const sliderRadius = document.getElementById('sliderGravity') || document.getElementById('sliderRadius');
  const sliderPadding = document.getElementById('sliderY') || document.getElementById('sliderPadding');
  const sliderShadow = document.getElementById('sliderRot') || document.getElementById('sliderShadow');

  if (!sliderRadius || !sliderPadding || !sliderShadow) return;

  const onSliderChange = () => {
    const radiusVal = sliderRadius.value;
    const paddingVal = sliderPadding.value;
    const shadowVal = sliderShadow.value;

    applyComponentState(radiusVal, paddingVal, shadowVal, true);
  };

  sliderRadius.addEventListener('input', onSliderChange);
  sliderPadding.addEventListener('input', onSliderChange);
  sliderShadow.addEventListener('input', onSliderChange);
}

function applyComponentState(radiusVal, paddingVal, shadowVal, updateCodeInput = false) {
  // Update tile display values
  const valRadius = document.getElementById('sliderValGravity') || document.getElementById('sliderValRadius');
  const valPadding = document.getElementById('sliderValY') || document.getElementById('sliderValPadding');
  const valShadow = document.getElementById('sliderValRot') || document.getElementById('sliderValShadow');

  if (valRadius) valRadius.textContent = `${radiusVal}px`;
  if (valPadding) valPadding.textContent = `${paddingVal}px`;
  if (valShadow) valShadow.textContent = `${shadowVal}px`;

  // Update slider positions if called externally
  const sliderRadius = document.getElementById('sliderGravity') || document.getElementById('sliderRadius');
  const sliderPadding = document.getElementById('sliderY') || document.getElementById('sliderPadding');
  const sliderShadow = document.getElementById('sliderRot') || document.getElementById('sliderShadow');

  if (sliderRadius && sliderRadius.value !== String(radiusVal)) sliderRadius.value = radiusVal;
  if (sliderPadding && sliderPadding.value !== String(paddingVal)) sliderPadding.value = paddingVal;
  if (sliderShadow && sliderShadow.value !== String(shadowVal)) sliderShadow.value = shadowVal;

  // Update HUD readouts
  const coordsVal = document.getElementById('hudCoordsVal');
  const hudGravityVal = document.getElementById('hudGravityVal');
  const tiltChip = document.getElementById('previewTiltChip');
  const chamberTelemetryText = document.getElementById('chamberTelemetryText');

  if (coordsVal) {
    coordsVal.textContent = `RADIUS: ${radiusVal}px | PADDING: ${paddingVal}px | SHADOW: ${shadowVal}px`;
  }
  if (hudGravityVal) {
    hudGravityVal.textContent = `PRODUCTION-READY`;
  }
  if (tiltChip) {
    tiltChip.textContent = `RADIUS: ${radiusVal}px`;
  }
  if (chamberTelemetryText) {
    chamberTelemetryText.textContent = `STATUS: PRODUCTION-READY // PADDING: ${paddingVal}px 28px // RADIUS: ${radiusVal}px`;
  }

  // Update the button's inline style directly in live output
  const liveOutput = document.getElementById('sandboxLiveOutput');
  const btn = liveOutput ? liveOutput.querySelector('button') : null;
  if (btn) {
    btn.style.borderRadius = `${radiusVal}px`;
    btn.style.padding = `${paddingVal}px 28px`;
    btn.style.boxShadow = `0 ${shadowVal}px ${parseInt(shadowVal, 10) * 2}px rgba(124, 58, 237, 0.28)`;
  }

  // Optionally sync updated property text into the editable code editor
  if (updateCodeInput) {
    const codeInput = document.getElementById('sandboxCodeInput');
    if (codeInput) {
      let code = codeInput.value;
      if (/border-radius:\s*[^;]+;/i.test(code)) {
        code = code.replace(/border-radius:\s*[^;]+;/i, `border-radius: ${radiusVal}px;`);
      }
      if (/padding:\s*[^;]+;/i.test(code)) {
        code = code.replace(/padding:\s*[^;]+;/i, `padding: ${paddingVal}px 28px;`);
      }
      if (/box-shadow:\s*[^;]+;/i.test(code)) {
        code = code.replace(/box-shadow:\s*[^;]+;/i, `box-shadow: 0 ${shadowVal}px ${parseInt(shadowVal, 10) * 2}px rgba(124, 58, 237, 0.28);`);
      }
      codeInput.value = code;
      updateGutterLineNumbers();
    }
  }
}

function syncCodeToSlidersAndHud(code) {
  let radius = '10';
  const radMatch = code.match(/border-radius:\s*([\d.]+)px/i);
  if (radMatch) radius = radMatch[1];

  let padding = '14';
  const padMatch = code.match(/padding:\s*([\d.]+)px/i);
  if (padMatch) padding = padMatch[1];

  let shadow = '12';
  const shMatch = code.match(/box-shadow:\s*0\s+([\d.]+)px/i);
  if (shMatch) shadow = shMatch[1];

  applyComponentState(radius, padding, shadow, false);
}

function updateGutterLineNumbers() {
  const codeInput = document.getElementById('sandboxCodeInput');
  const gutter = document.getElementById('codeEditorGutter');
  if (!codeInput || !gutter) return;

  const lines = codeInput.value.split('\n');
  const lineCount = Math.max(lines.length, 11);
  let html = '';
  for (let i = 1; i <= lineCount; i++) {
    html += `<span>${i}</span>`;
  }
  gutter.innerHTML = html;
}

function applyComponentPreset(presetKey) {
  const codeInput = document.getElementById('sandboxCodeInput');
  const resolvedKey = COMPONENT_PRESETS[presetKey] ? presetKey : 'enterprise';
  if (!codeInput) return;

  // Toggle active class on preset buttons
  document.querySelectorAll('.btn-component-preset').forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    const isMatch = onclickAttr.includes(`'${resolvedKey}'`);
    btn.classList.toggle('active', !!isMatch);
  });

  // Inject code
  codeInput.value = COMPONENT_PRESETS[resolvedKey];
  updateSandboxPreview(codeInput.value);
  updateGutterLineNumbers();

  // Sync component sliders and status
  const style = PRESET_STYLES[resolvedKey] || PRESET_STYLES.enterprise;
  applyComponentState(style.radius, style.padding, style.shadow, false);

  // Status prompt
  const feedbackEl = document.getElementById('sandboxStatusFeedback');
  if (feedbackEl) {
    const presetNames = {
      enterprise: '💼 Royal Purple',
      gradient: '🚀 Violet Gradient',
      emerald: '👑 Deep Orchid'
    };
    feedbackEl.innerHTML = `
      <span class="status-badge-guidance" style="color: #c084fc; font-weight: 700; display: inline-flex; align-items: center; gap: 6px;">
        <i class="fa-solid fa-circle-check"></i> Component Preset Loaded: [${presetNames[resolvedKey] || 'Custom'}]. Ready to Preview.
      </span>
    `;
  }
}

// Common typos mapped to valid CSS properties
const CSS_PROPERTY_SUGGESTIONS = {
  'bous': 'border-radius',
  'radius': 'border-radius',
  'boder-radius': 'border-radius',
  'border-rad': 'border-radius',
  'bradius': 'border-radius',
  'backgroud': 'background',
  'backround': 'background',
  'bg': 'background',
  'bground': 'background',
  'colr': 'color',
  'colour': 'color',
  'clor': 'color',
  'pading': 'padding',
  'pad': 'padding',
  'paddng': 'padding',
  'font-siz': 'font-size',
  'fontsize': 'font-size',
  'size': 'font-size',
  'fsize': 'font-size',
  'font-wight': 'font-weight',
  'fontweight': 'font-weight',
  'weight': 'font-weight',
  'fweight': 'font-weight',
  'shadow': 'box-shadow',
  'boxshadow': 'box-shadow',
  'bshadow': 'box-shadow',
  'curser': 'cursor',
  'point': 'cursor',
  'pointer': 'cursor',
  'transiton': 'transition',
  'trans': 'transition',
  'bordr': 'border',
  'boder': 'border',
  'bord': 'border',
  'magin': 'margin',
  'mrg': 'margin',
  'opcty': 'opacity',
  'opac': 'opacity',
  'zindex': 'z-index',
  'disply': 'display',
  'widt': 'width',
  'heigt': 'height'
};

function getCssSuggestion(prop) {
  return CSS_PROPERTY_SUGGESTIONS[prop] || null;
}

function checkValidCssProperty(prop, val) {
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    const isPropKnown = CSS.supports(prop, 'inherit') || CSS.supports(prop, 'initial');
    if (!isPropKnown) {
      if (typeof document !== 'undefined') {
        const dummy = document.createElement('div');
        const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
        if (!(camel in dummy.style) && !(prop in dummy.style)) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  if (typeof document !== 'undefined') {
    const dummy = document.createElement('div');
    const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    return camel in dummy.style || prop in dummy.style;
  }
  return true;
}

function validateComponentCss(code) {
  if (!code || !code.trim()) {
    return { valid: false, error: 'ERROR IN CODE: Code editor is empty. Enter valid button HTML/CSS.' };
  }

  // 1. Check basic button tag presence
  if (!/<button\b/i.test(code)) {
    return { valid: false, error: 'ERROR IN CODE: Missing <button> element in component code.' };
  }

  // 2. Extract style text
  let cssText = '';
  const styleMatch = code.match(/style\s*=\s*["']([^"']*)["']/i);
  if (styleMatch) {
    cssText = styleMatch[1];
  } else {
    if (/style\s*=\s*["'][^"']*$/i.test(code)) {
      return { valid: false, error: 'ERROR IN CODE: Syntax Error - Unclosed quotes in style attribute.' };
    }
    const blockMatch = code.match(/\{([^}]+)\}/);
    cssText = blockMatch ? blockMatch[1] : code;
  }

  // 3. Clean and parse declarations
  const cleanCss = cssText.replace(/\/\*[\s\S]*?\*\//g, '');
  const rawDeclarations = cleanCss.split(';');

  for (let decl of rawDeclarations) {
    decl = decl.trim();
    if (!decl) continue;

    // Skip markup fragments
    if (decl.startsWith('<') || decl.includes('</button>') || decl.includes('&rarr;')) continue;

    if (!decl.includes(':')) {
      return {
        valid: false,
        error: `ERROR IN CODE: Syntax Error in "${decl}". Expected format "property: value;"`,
        prop: decl
      };
    }

    const colonIndex = decl.indexOf(':');
    const prop = decl.substring(0, colonIndex).trim().toLowerCase();
    const val = decl.substring(colonIndex + 1).trim();

    if (!prop) {
      return { valid: false, error: 'ERROR IN CODE: Empty CSS property name before colon.' };
    }
    if (!val) {
      return { valid: false, error: `ERROR IN CODE: Missing value for CSS property "${prop}:".` };
    }

    // Skip custom properties (variables)
    if (prop.startsWith('--')) continue;

    const isValidProp = checkValidCssProperty(prop, val);
    if (!isValidProp) {
      const suggestion = getCssSuggestion(prop);
      const hint = suggestion ? ` Did you mean "${suggestion}:"?` : ' Please check spelling.';
      return {
        valid: false,
        error: `ERROR IN CODE: Invalid CSS property detected: "${prop}:".${hint}`,
        prop: prop
      };
    }
  }

  return { valid: true };
}

function updateSandboxPreview(code) {
  const liveOutput = document.getElementById('sandboxLiveOutput');
  const feedbackEl = document.getElementById('sandboxStatusFeedback');
  const chamberBadge = document.getElementById('chamberTelemetryBadge');
  const chamberText = document.getElementById('chamberTelemetryText');
  const errorBanner = document.getElementById('sandboxErrorBanner');
  const successBanner = document.getElementById('sandboxSuccessBanner');

  if (!liveOutput) return true;

  const validation = validateComponentCss(code);

  if (!validation.valid) {
    // Hide success banner
    if (successBanner) successBanner.style.display = 'none';

    // Show distinct red error status badge in feedback bar
    if (feedbackEl) {
      feedbackEl.innerHTML = `
        <span class="status-badge-error">
          <i class="fa-solid fa-triangle-exclamation"></i> <strong>ERROR IN CODE:</strong> ${validation.error.replace(/^ERROR IN CODE:\s*/i, '')}
        </span>
      `;
    }

    // Update chamber telemetry to red error state
    if (chamberBadge) chamberBadge.classList.add('telemetry-error');
    if (chamberText) {
      chamberText.textContent = `ERROR IN CODE // INVALID PROPERTY: "${validation.prop || 'SYNTAX'}"`;
    }

    // Display distinct compiler error card in preview output
    liveOutput.innerHTML = `
      <div class="sandbox-compiler-error-card">
        <div class="compiler-error-icon"><i class="fa-solid fa-circle-exclamation"></i></div>
        <div class="compiler-error-details">
          <h5>ERROR IN CODE</h5>
          <p>${validation.error}</p>
        </div>
      </div>
    `;
    return false;
  }

  // Clear error states if previously active
  if (chamberBadge) chamberBadge.classList.remove('telemetry-error');
  if (errorBanner) errorBanner.style.display = 'none';

  // Basic sanitization: strip executable scripts
  const safeCode = code
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '');

  liveOutput.innerHTML = safeCode;
  return true;
}

function runSandboxVerify() {
  const codeInput = document.getElementById('sandboxCodeInput');
  const liveOutput = document.getElementById('sandboxLiveOutput');
  const feedbackEl = document.getElementById('sandboxStatusFeedback');
  const successBanner = document.getElementById('sandboxSuccessBanner');
  const errorBanner = document.getElementById('sandboxErrorBanner');
  const errorTitle = document.getElementById('sandboxErrorTitle');
  const errorDesc = document.getElementById('sandboxErrorDesc');

  if (!codeInput) return;

  const rawCode = codeInput.value;
  const isValid = updateSandboxPreview(rawCode);

  if (!isValid) {
    const validation = validateComponentCss(rawCode);
    if (errorBanner) {
      if (errorTitle) errorTitle.textContent = validation.error;
      if (errorDesc) errorDesc.textContent = `Check your CSS property name or declaration syntax in the editor above.`;
      errorBanner.style.display = 'flex';
      if (typeof errorBanner.scrollIntoView === 'function') {
        errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    if (successBanner) successBanner.style.display = 'none';
    return;
  }

  // Hide error banner when code is valid
  if (errorBanner) errorBanner.style.display = 'none';

  syncCodeToSlidersAndHud(rawCode);

  // Subtle button pulse
  const btn = liveOutput ? liveOutput.querySelector('button') : null;
  if (btn) {
    btn.style.transform = 'scale(0.96)';
    setTimeout(() => {
      if (btn) btn.style.transform = 'scale(1)';
    }, 150);
  }

  // Show Success Achievement Banner
  if (successBanner) {
    successBanner.style.display = 'flex';
    if (typeof successBanner.scrollIntoView === 'function') {
      successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Telemetry Feedback Message
  if (feedbackEl) {
    feedbackEl.innerHTML = `
      <span class="status-badge-success" style="color: #0d9488; font-weight: 700; display: inline-flex; align-items: center; gap: 8px;">
        <i class="fa-solid fa-circle-check"></i> <strong>COMPONENT COMPILED:</strong> Production-ready styling verified!
      </span>
    `;
  }
}

function resetSandboxChallenge() {
  const codeInput = document.getElementById('sandboxCodeInput');
  const feedbackEl = document.getElementById('sandboxStatusFeedback');
  const successBanner = document.getElementById('sandboxSuccessBanner');
  const errorBanner = document.getElementById('sandboxErrorBanner');
  const hintBubble = document.getElementById('sandboxHintBubble');
  const chamberBadge = document.getElementById('chamberTelemetryBadge');

  if (chamberBadge) chamberBadge.classList.remove('telemetry-error');
  if (errorBanner) errorBanner.style.display = 'none';

  document.querySelectorAll('.btn-component-preset').forEach(btn => {
    btn.classList.toggle('active', btn.classList.contains('preset-blue'));
  });

  if (codeInput) {
    codeInput.value = INITIAL_SANDBOX_CODE;
    updateSandboxPreview(INITIAL_SANDBOX_CODE);
    updateGutterLineNumbers();
    applyComponentState('10', '14', '12', false);
  }

  if (successBanner) successBanner.style.display = 'none';
  if (hintBubble) hintBubble.style.display = 'none';

  if (feedbackEl) {
    feedbackEl.innerHTML = `
      <span class="sandbox-feedback-prompt">
        <i class="fa-solid fa-circle-info"></i> Tweak CSS properties above &amp; click <strong>"[ ⚡ Run &amp; Preview Component ]"</strong> to verify.
      </span>
    `;
  }
}

function toggleSandboxHint() {
  const hintBubble = document.getElementById('sandboxHintBubble');
  if (!hintBubble) return;
  const isHidden = hintBubble.style.display === 'none' || !hintBubble.style.display;
  hintBubble.style.display = isHidden ? 'block' : 'none';
}

/* ==========================================================================
   18. FEATURE #4: 1-DAY FREE CAMPUS VISIT & LAB PASS BOOKING
   ========================================================================== */
function openCampusPassModal() {
  const modal = document.getElementById('campusPassModal');
  const dateInput = document.getElementById('campusPassDate');
  const errorMsg = document.getElementById('campusPassPhoneError');
  const toast = document.getElementById('campusPassSuccessToast');
  const form = document.getElementById('campusPassForm');

  if (errorMsg) errorMsg.style.display = 'none';
  if (toast) toast.style.display = 'none';
  if (form) form.style.display = 'block';

  // Ensure minimum date is today
  if (dateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.min = todayStr;
    if (!dateInput.value) {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      dateInput.value = d.toISOString().split('T')[0];
    }
  }

  if (modal) modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeCampusPassModal() {
  const modal = document.getElementById('campusPassModal');
  if (modal) modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}

function initCampusPassDatePicker() {
  const dateInput = document.getElementById('campusPassDate');
  if (dateInput) {
    const todayStr = new Date().toISOString().split('T')[0];
    dateInput.min = todayStr;
  }
}

async function handleCampusPassSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById('campusPassName');
  const phoneInput = document.getElementById('campusPassPhone');
  const dateInput = document.getElementById('campusPassDate');
  const degreeSelect = document.getElementById('campusPassDegree');
  const submitBtn = document.getElementById('campusPassSubmitBtn');
  const errorMsg = document.getElementById('campusPassPhoneError');
  const toast = document.getElementById('campusPassSuccessToast');
  const form = document.getElementById('campusPassForm');

  const name = nameInput ? nameInput.value.trim() : '';
  const rawPhone = phoneInput ? phoneInput.value.trim().replace(/\D/g, '') : '';
  const visitDate = dateInput ? dateInput.value : '';
  const degree = degreeSelect ? degreeSelect.value : 'Student';

  if (rawPhone.length !== 10) {
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.textContent = 'Please enter a valid 10-digit WhatsApp number (without +91)';
    }
    phoneInput?.focus();
    return;
  }
  if (errorMsg) errorMsg.style.display = 'none';

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Reserving Lab Pass...';
  }

  // Save lead to backend MongoDB: POST /api/leads/campus-pass
  try {
    const apiBase = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? (window.location.port === '5000' ? '' : 'http://localhost:5000')
      : '';
    await fetch(`${apiBase}/api/leads/campus-pass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        phone: '+91' + rawPhone,
        visitDate: visitDate,
        degree: degree,
        course: '1-Day Free Physical Lab Pass',
        source: 'campus_visit_pass'
      })
    });
  } catch (err) {
    console.warn('Backend campus pass logging offline:', err);
  }

  // Construct WhatsApp confirmation prompt link:
  // https://wa.me/919487530243?text=Hi%20Karka%20Academy,%20I%20have%20booked%20my%20Free%201-Day%20Physical%20Lab%20Pass%20for%20[DATE].%20My%20name%20is%20[NAME]%20([DEGREE]).%20Please%20confirm%20my%20entry%20slot%20at%20SRV%20Towers.
  const waMsg = `Hi Karka Academy, I have booked my Free 1-Day Physical Lab Pass for ${visitDate}. My name is ${name} (${degree}). Please confirm my entry slot at SRV Towers.`;
  const waUrl = `https://wa.me/919487530243?text=${encodeURIComponent(waMsg)}`;
  window.open(waUrl, '_blank');

  if (toast) toast.style.display = 'block';

  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Confirm My Free 1-Day Pass &rarr;</span> <i class="fa-solid fa-ticket"></i>';
  }

  setTimeout(() => {
    closeCampusPassModal();
    if (form) form.reset();
    if (toast) toast.style.display = 'none';
  }, 2000);
}

/* ==========================================================================
   19. FEATURE #3: STICKY MOBILE CONVERSION BAR OBSERVER
   ========================================================================== */
function initStickyMobileBarObserver() {
  const bar = document.getElementById('stickyMobileBar');
  if (!bar) return;

  const leadCaptureElements = [
    document.getElementById('leadForm'),
    document.getElementById('contact'),
    document.querySelector('.apply-modal-wrapper'),
    document.getElementById('applyModal')
  ].filter(Boolean);

  if (!leadCaptureElements.length || typeof IntersectionObserver === 'undefined') {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    let shouldHide = false;
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
        shouldHide = true;
      }
    });

    if (shouldHide) {
      bar.classList.add('sticky-bar-hidden');
    } else {
      bar.classList.remove('sticky-bar-hidden');
    }
  }, {
    threshold: [0, 0.1, 0.5]
  });

  leadCaptureElements.forEach(el => observer.observe(el));
}

// Global Window Exports
window.openSyllabusWhatsAppModal = openSyllabusWhatsAppModal;
window.closeSyllabusWhatsAppModal = closeSyllabusWhatsAppModal;
window.handleSyllabusWhatsAppSubmit = handleSyllabusWhatsAppSubmit;
window.openPapTermsModal = openPapTermsModal;
window.closePapTermsModal = closePapTermsModal;
window.openPapQuizModal = openPapQuizModal;
window.closePapQuizModal = closePapQuizModal;
window.selectQuizOption = selectQuizOption;
window.goToQuizStep = goToQuizStep;
window.handleQuizLeadSubmit = handleQuizLeadSubmit;
window.openCampusPassModal = openCampusPassModal;
window.closeCampusPassModal = closeCampusPassModal;
window.handleCampusPassSubmit = handleCampusPassSubmit;
window.runSandboxVerify = runSandboxVerify;
window.resetSandboxChallenge = resetSandboxChallenge;
window.toggleSandboxHint = toggleSandboxHint;
window.applyComponentPreset = applyComponentPreset;
window.applyComponentState = applyComponentState;
window.toggleReelPlayback = toggleReelPlayback;
window.initVideoStories = initVideoStories;

// Auto-run features on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initGradCalculator();
  initProDrawer();
  initSandboxChallenge();
  initCampusPassDatePicker();
  initStickyMobileBarObserver();
});



