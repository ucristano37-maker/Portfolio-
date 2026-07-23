/* =========================================================
   Abdul Nafay — Portfolio — script.js
   =========================================================
   IMPORTANT (contact form email delivery):
   This is a static site with no backend, so we use Web3Forms
   (https://web3forms.com — free, no signup hassle) to deliver
   contact-form messages straight to a.nafayyyy@gmail.com.

   Steps to activate the contact form (2 minutes):
   1. Go to https://web3forms.com
   2. Enter your email (a.nafayyyy@gmail.com) and click "Create Access Key"
   3. Check that inbox and confirm your email
   4. Copy the Access Key you receive
   5. Paste it below into WEB3FORMS_ACCESS_KEY
   That's it — no dashboard, no template setup. Every message
   submitted on the site will land directly in your Gmail inbox,
   regardless of whether the visitor has a mail app installed.
   ========================================================= */

const WEB3FORMS_ACCESS_KEY = "aff2cf58-a3d3-4cef-aa51-f5f5558b1eb8";

// Set this to your real GitHub profile URL
const GITHUB_URL = "https://github.com/ucristano37-maker";

document.addEventListener("DOMContentLoaded", () => {

  /* ---------- GitHub link ---------- */
  const githubLink = document.getElementById("githubLink");
  if (githubLink) githubLink.href = GITHUB_URL;

  /* ---------- Custom cursor ---------- */
  const cursorDot   = document.getElementById("cursorDot");
  const cursorCaret = document.getElementById("cursorCaret");

  window.addEventListener("mousemove", (e) => {
    cursorDot.style.left   = e.clientX + "px";
    cursorDot.style.top    = e.clientY + "px";
    cursorCaret.style.left = e.clientX + "px";
    cursorCaret.style.top  = e.clientY + "px";
  });

  const hoverables = "a, button, input, textarea, .tab, .social-card, .skill-card";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverables)) cursorCaret.classList.add("hovering");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverables)) cursorCaret.classList.remove("hovering");
  });

  /* ---------- Title bar clock ---------- */
  const clockEl = document.getElementById("clock");
  function updateClock() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  updateClock();
  setInterval(updateClock, 30000);

  /* ---------- Typewriter hero name ---------- */
  startTypewriter("typewriter", ["Abdul Nafay"], {
    typeSpeed: 130, deleteSpeed: 70, holdTime: 2400, gapTime: 600
  });

  /* ---------- Tabs ---------- */
  const tabs = document.querySelectorAll(".tab");
  const panels = document.querySelectorAll(".panel");
  const breadcrumb = document.getElementById("breadcrumbPath");
  const breadcrumbMap = {
    about: "portfolio &gt; src &gt; about.jsx",
    projects: "portfolio &gt; src &gt; projects.tsx",
    social: "portfolio &gt; src &gt; connect.json",
    contact: "portfolio &gt; src &gt; contact.js",
    skills: "portfolio &gt; src &gt; skills.css",
    experience: "portfolio &gt; src &gt; experience.md"
  };

  function activateTab(name) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.tab === name));
    panels.forEach(p => p.classList.toggle("active", p.id === name));
    breadcrumb.innerHTML = breadcrumbMap[name] || "";
    if (name === "skills") animateSkillBars();
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activateTab(tab.dataset.tab));
  });

  /* ---------- Projects data ----------
     Add / edit your own projects here. Each project needs:
     image  -> image URL (or leave "" and set a video instead)
     video  -> video URL (optional, overrides image if provided)
     title, description, tags -> array of tech used (shown as chips)
  */
  const projects = [
    {
      title: "Super Collection — Fashion E-commerce",
      description: "A full Pakistani fashion e-commerce platform with a real-time product catalog, cart & checkout, complete admin dashboard, and a WhatsApp-style support chat between customers and admin.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      video: "",
      tags: ["React", "Vite", "Firebase", "Firestore", "JavaScript", "CSS3"]
    },
    {
      title: "AI Agent Automation Workflows",
      description: "Custom n8n workflows connecting APIs, databases and AI language models to automate real business processes — from lead handling to intelligent chat agents.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
      video: "",
      tags: ["n8n", "AI Agents", "REST APIs", "Automation"]
    },
    {
      title: "Hill Climb Style Browser Game",
      description: "An HTML5 canvas driving game with procedural terrain generation, a garage system, four unlockable cars, coin collection, and real physics.",
      image: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=800&auto=format&fit=crop",
      video: "",
      tags: ["HTML5 Canvas", "JavaScript", "Game Physics"]
    }
    // 👉 Add more of your own projects here, same format
  ];

  const projectsGrid = document.getElementById("projectsGrid");
  projectsGrid.innerHTML = projects.map((p, i) => `
    <div class="project-card" data-index="${i}">
      <div class="project-media">
        ${p.video
          ? `<video src="${p.video}" muted loop autoplay playsinline></video>`
          : `<img src="${p.image}" alt="${p.title}" loading="lazy">`
        }
      </div>
      <div class="project-body">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.description}</div>
        <div class="project-tags">${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}</div>
      </div>
    </div>
  `).join("");

  /* ---------- Project modal ---------- */
  const projectModal = document.getElementById("projectModal");
  const modalMedia = document.getElementById("modalMedia");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");
  const modalClose = document.getElementById("modalClose");

  function openProjectModal(index) {
    const p = projects[index];
    if (!p) return;
    modalMedia.innerHTML = p.video
      ? `<video src="${p.video}" controls autoplay loop></video>`
      : `<img src="${p.image}" alt="${p.title}">`;
    modalTitle.textContent = p.title;
    modalDesc.textContent = p.description;
    modalTags.innerHTML = p.tags.map(t => `<span class="project-tag">${t}</span>`).join("");
    projectModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
  function closeProjectModal() {
    projectModal.classList.remove("show");
    document.body.style.overflow = "";
  }

  projectsGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".project-card");
    if (card) openProjectModal(Number(card.dataset.index));
  });
  modalClose.addEventListener("click", closeProjectModal);
  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) closeProjectModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProjectModal();
  });

  /* ---------- Scroll-reveal animation ---------- */
  document.querySelectorAll(
    ".card, .project-card, .social-card, .contact-info, .contact-form, .skill-card, .sb-row, .tl-item"
  ).forEach(el => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  function observeReveals() {
    document.querySelectorAll(".reveal:not(.in-view)").forEach(el => revealObserver.observe(el));
  }
  observeReveals();
  // Re-scan after dynamic content (skills/projects/experience) renders on tab switch
  tabs.forEach(tab => tab.addEventListener("click", () => setTimeout(observeReveals, 50)));

  /* ---------- Skills data (full stack + web dev + AI/automation) ---------- */
  const skills = [
    { name: "HTML5",              level: 95, years: 3, color: "#f38ba8" },
    { name: "CSS3",                level: 92, years: 3, color: "#89b4fa" },
    { name: "JavaScript",          level: 90, years: 3, color: "#e3b341" },
    { name: "TypeScript",          level: 70, years: 1, color: "#89b4fa" },
    { name: "React.js",            level: 88, years: 3, color: "#89dceb" },
    { name: "Next.js",             level: 65, years: 1, color: "#cdd6f4" },
    { name: "Vite",                level: 85, years: 2, color: "#a6e3a1" },
    { name: "Tailwind CSS",        level: 82, years: 2, color: "#89dceb" },
    { name: "Node.js",             level: 82, years: 3, color: "#a6e3a1" },
    { name: "Express.js",          level: 78, years: 2, color: "#a6e3a1" },
    { name: "Firebase",            level: 87, years: 2, color: "#f5a3c7" },
    { name: "Firestore",           level: 85, years: 2, color: "#f5a3c7" },
    { name: "MongoDB",             level: 72, years: 2, color: "#a6e3a1" },
    { name: "SQL / MySQL",         level: 68, years: 1, color: "#89b4fa" },
    { name: "REST APIs",           level: 85, years: 3, color: "#cba6f7" },
    { name: "Git & GitHub",        level: 90, years: 3, color: "#f38ba8" },
    { name: "Responsive Design",   level: 93, years: 3, color: "#89b4fa" },
    { name: "UI / UX Design",      level: 88, years: 3, color: "#f5a3c7" },
    { name: "Backend Architecture",level: 84, years: 3, color: "#e3b341" },
    { name: "Authentication & Security", level: 80, years: 2, color: "#f38ba8" },
    { name: "n8n Workflow Automation", level: 75, years: 1, color: "#e3b341" },
    { name: "AI Agents & LLM Integration", level: 72, years: 1, color: "#cba6f7" },
    { name: "API Integrations",    level: 86, years: 3, color: "#89dceb" },
    { name: "Deployment (GitHub Pages / Vercel)", level: 88, years: 2, color: "#a6e3a1" }
  ];

  const skillsGrid = document.getElementById("skillsGrid");
  skillsGrid.innerHTML = skills.map(s => `
    <div class="skill-card" style="--skill-color:${s.color}">
      <div class="skill-top">
        <span class="skill-name">${s.name}</span>
        <span class="skill-years">${s.years} ${s.years === 1 ? "yr" : "yrs"}</span>
      </div>
      <div class="skill-bar"><div class="skill-bar-fill" data-level="${s.level}"></div></div>
    </div>
  `).join("");

  function animateSkillBars() {
    document.querySelectorAll(".skill-bar-fill").forEach(fill => {
      const level = fill.dataset.level;
      fill.style.width = "0%";
      requestAnimationFrame(() => {
        setTimeout(() => { fill.style.width = level + "%"; }, 50);
      });
    });
  }

  /* ---------- Experience timeline ---------- */
  const experience = [
    {
      year: "Year 3 — Current",
      title: "Independent Full Stack Developer",
      desc: "Designing and building complete e-commerce platforms end-to-end — React + Vite frontends, Firebase backends, admin dashboards, auth, and live deployment."
    },
    {
      year: "Year 2",
      title: "Frontend & Backend Integration",
      desc: "Deepened backend skills — Firestore data modelling, authentication flows, real-time sync across devices, and admin tooling for e-commerce systems."
    },
    {
      year: "Year 1",
      title: "Frontend Development Foundations",
      desc: "Built strong fundamentals in HTML, CSS and JavaScript, then moved into React — building responsive, component-based interfaces and interactive UIs."
    }
  ];

  const timeline = document.getElementById("experienceTimeline");
  timeline.innerHTML = experience.map(e => `
    <div class="tl-item">
      <div class="tl-year">${e.year}</div>
      <div class="tl-title">${e.title}</div>
      <div class="tl-desc">${e.desc}</div>
    </div>
  `).join("");

  /* ---------- Skill breakdown (reuses the skills array above) ---------- */
  const skillDescriptions = {
    "HTML5": "Semantic, accessible markup that forms a clean foundation for every project I build.",
    "CSS3": "Responsive layouts, animations and modern styling (Flexbox, Grid, custom properties) used daily.",
    "JavaScript": "Core language for all interactivity — DOM manipulation, async logic, and app behaviour.",
    "TypeScript": "Adding type-safety to larger projects to catch bugs early and keep code maintainable.",
    "React.js": "Component-based UIs, hooks, state management and building fast, interactive interfaces.",
    "Next.js": "Server-rendered React apps with routing and performance optimizations for production use.",
    "Vite": "My go-to build tool for lightning-fast React development and optimized production builds.",
    "Tailwind CSS": "Utility-first styling for building polished UIs quickly without leaving the markup.",
    "Node.js": "Backend logic, APIs and server-side scripts that power the apps I build.",
    "Express.js": "Building REST APIs and backend routes with clean, structured server architecture.",
    "Firebase": "Authentication, hosting and backend infrastructure for real-world production apps.",
    "Firestore": "Real-time NoSQL database work — live data sync across devices for e-commerce & dashboards.",
    "MongoDB": "Document-based database design for flexible, scalable backend data models.",
    "SQL / MySQL": "Relational database fundamentals — queries, schema design and data relationships.",
    "REST APIs": "Designing and consuming APIs to connect frontend apps with backend services cleanly.",
    "Git & GitHub": "Version control, branching workflows and collaborative development, used on every project.",
    "Responsive Design": "Making sure every interface looks and works great on any screen size or device.",
    "UI / UX Design": "Designing interfaces that are not just functional, but genuinely pleasant to use.",
    "Backend Architecture": "Structuring scalable systems — data flow, auth, and business logic done right.",
    "Authentication & Security": "Implementing secure login systems, role-based access, and data protection.",
    "n8n Workflow Automation": "Building automated workflows that connect apps, APIs and services without manual work.",
    "AI Agents & LLM Integration": "Creating AI-powered agents and integrating language models into real workflows.",
    "API Integrations": "Connecting third-party services and APIs into seamless, working product features.",
    "Deployment (GitHub Pages / Vercel)": "Shipping projects live — build pipelines, hosting, and production deployment."
  };

  const skillBreakdown = document.getElementById("skillBreakdown");
  skillBreakdown.innerHTML = skills.map(s => `
    <div class="sb-row" style="--sb-color:${s.color}">
      <div class="sb-row-top">
        <span class="sb-row-name">${s.name}</span>
        <span class="sb-row-years">${s.years} ${s.years === 1 ? "year" : "years"} experience</span>
      </div>
      <div class="sb-row-desc">${skillDescriptions[s.name] || ""}</div>
    </div>
  `).join("");

  /* ---------- CV download ---------- */
  document.getElementById("downloadCvBtn").addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = "assets/resume.pdf";
    link.download = "Abdul-Nafay-CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });

  /* ---------- Toast helper ---------- */
  const toast = document.getElementById("toast");
  function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.borderColor = isError ? "#f38ba8" : "#a6e3a1";
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3200);
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contactForm");
  const submitBtn = document.getElementById("cf-submit");
  const submitText = document.getElementById("cf-submit-text");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cf-name").value.trim();
    const email = document.getElementById("cf-email").value.trim();
    const message = document.getElementById("cf-message").value.trim();

    if (!name || !email || !message) {
      showToast("Please fill in every field.", true);
      return;
    }

    if (WEB3FORMS_ACCESS_KEY === "YOUR_WEB3FORMS_ACCESS_KEY") {
      showToast("Contact form isn't set up yet — add your Web3Forms key in script.js.", true);
      return;
    }

    submitText.textContent = "Sending...";
    submitBtn.disabled = true;

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Portfolio message from ${name}`,
        name,
        email,
        message
      })
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        console.log("Web3Forms response:", status, data);
        if (data.success) {
          form.reset();
          showToast("Message sent successfully!");
        } else {
          showToast(data.message || "Something went wrong. Please email me directly.", true);
        }
      })
      .catch((err) => {
        console.error("Web3Forms error:", err);
        showToast("Network error. Please email me directly.", true);
      })
      .finally(() => {
        submitText.textContent = "Send Message";
        submitBtn.disabled = false;
      });
  });
});
