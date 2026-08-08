/* ==========================================================================
   Xiaowei Luo 个人网站 - 交互脚本
   说明：内容数据与文案来自 content.js，本文件只负责渲染与交互
   ========================================================================== */

/* ---------- 工具函数 ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function throttle(fn, delay = 100) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => { fn.apply(this, args); timer = null; }, delay);
  };
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = String(str);
  return div.innerHTML;
}

/* ---------- 语言状态（模块级，供 Toast 等提前使用） ---------- */
let currentLang = "zh";

/* ---------- Toast 提示（文案随当前语言） ---------- */
const toastWrap = $("#toastWrap");
function showToast(key, type = "success") {
  const dict = I18N[currentLang] || I18N.zh;
  const message = dict[key] || key;
  const icons = { success: "fa-check-circle", error: "fa-exclamation-circle", info: "fa-info-circle" };
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${escapeHtml(message)}</span>`;
  toastWrap.appendChild(el);
  setTimeout(() => {
    el.classList.add("leaving");
    el.addEventListener("animationend", () => el.remove());
  }, 2600);
}

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 语言初始化（最先，供各模块使用） ---------- */
  const savedLang = localStorage.getItem("lang");
  const browserZh = navigator.language && navigator.language.toLowerCase().startsWith("zh");
  currentLang = savedLang === "en" || savedLang === "zh" ? savedLang : (browserZh ? "zh" : "en");

  /* ---------- 预加载动画 ---------- */
  const preloader = $("#preloader");
  window.addEventListener("load", () => {
    preloader.classList.add("hide");
    setTimeout(() => preloader.remove(), 600);
  });
  // 兜底：3 秒后强制移除
  setTimeout(() => {
    if (preloader && preloader.parentNode) {
      preloader.classList.add("hide");
      setTimeout(() => preloader.remove(), 600);
    }
  }, 3000);

  /* ---------- 动态粒子背景 ---------- */
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 70, density: { enable: true, value_area: 800 } },
        color: { value: "#00d1ff" },
        shape: { type: "circle" },
        opacity: { value: 0.4, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 150, color: "#00d1ff", opacity: 0.25, width: 1 },
        move: { enable: true, speed: 1.5, random: true, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.6 } },
          push: { particles_nb: 3 }
        }
      }
    });
  }

  /* ---------- 留言板（GitHub Issues / utterances） ---------- */
  const GITHUB_REPO = "luo213/luoxiaowei.github.io";
  const commentsEl = $("#comments");
  let commentsLoadTimer = null;

  function utterancesTheme(theme) {
    return theme === "light" ? "github-light" : "github-dark";
  }
  // 加载 utterances：访客留言将自动保存为仓库 Issues，登录 GitHub 即可查看
  function loadComments(theme) {
    if (!commentsEl) return;
    const repo = GITHUB_REPO.trim();
    const status = key => {
      commentsEl.innerHTML = `<p class="comments-status">${I18N[currentLang][key]}</p>`;
    };
    if (!repo || repo.includes("your-")) {
      status("commentsUnset");
      return;
    }
    status("commentsLoading");
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "留言");
    script.setAttribute("theme", utterancesTheme(theme));
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;
    script.onerror = () => {
      clearTimeout(commentsLoadTimer);
      status("commentsFail");
    };
    commentsEl.appendChild(script);
    // iframe 出现即移除加载占位，避免与评论区并存
    const frameObserver = new MutationObserver(() => {
      if (document.querySelector("iframe.utterances-frame")) {
        const placeholder = commentsEl.querySelector(".comments-status");
        if (placeholder) placeholder.remove();
        frameObserver.disconnect();
        clearTimeout(commentsLoadTimer);
      }
    });
    frameObserver.observe(commentsEl, { childList: true, subtree: true });
    // 超时检测：脚本已加载但组件未出现时提示（utteranc.es 可能被网络拦截）
    clearTimeout(commentsLoadTimer);
    commentsLoadTimer = setTimeout(() => {
      if (!document.querySelector("iframe.utterances-frame")) {
        status("commentsTimeout");
      }
    }, 10000);
  }
  // 主题切换时同步留言板主题：优先通知 iframe，失败则重新加载
  function syncCommentsTheme(theme) {
    const frame = document.querySelector("iframe.utterances-frame");
    if (frame) {
      try {
        frame.contentWindow.postMessage(
          { type: "set-theme", theme: utterancesTheme(theme) },
          "https://utteranc.es"
        );
        return;
      } catch (e) { /* 继续走重新加载 */ }
    }
    loadComments(theme);
  }

  /* ---------- 主题切换 ---------- */
  const themeToggle = $("#themeToggle");
  const themeIcon = $("#themeIcon");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  function setTheme(theme, save = true) {
    document.body.classList.toggle("light-mode", theme === "light");
    themeIcon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
    if (themeColorMeta) {
      themeColorMeta.setAttribute("content", theme === "light" ? "#f2f6fb" : "#05070d");
    }
    if (save) localStorage.setItem("theme", theme);
    syncCommentsTheme(theme);
  }
  // 首次访问跟随系统偏好
  const storedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(storedTheme || (systemDark ? "dark" : "light"), !storedTheme);
  themeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("light-mode") ? "dark" : "light";
    setTheme(next);
    showToast(next === "light" ? "toastLight" : "toastDark", "info");
  });

  /* ---------- 汉堡菜单 ---------- */
  const nav = $("#mainNav");
  const hamburger = $("#hamburger");
  hamburger.addEventListener("click", () => {
    const open = nav.classList.toggle("menu-open");
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", I18N[currentLang][open ? "ariaMenuClose" : "ariaMenuOpen"]);
  });
  $$("#mainNav .nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("menu-open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", I18N[currentLang].ariaMenuOpen);
    });
  });

  /* ---------- 导航：滚动收缩 + 高亮 ---------- */
  const navLinks = $$(".nav-links a");
  const sections = navLinks
    .map(link => $(link.getAttribute("href")))
    .filter(Boolean);

  function onScroll() {
    // 阅读进度条
    const docH = document.documentElement;
    const total = docH.scrollHeight - window.innerHeight;
    $("#progressBar").style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : "0%";
    // 导航收缩
    nav.classList.toggle("scrolled", window.scrollY > 20);
    // 回到顶部
    $("#backToTop").classList.toggle("show", window.scrollY > 400);
    // 导航高亮
    const fromTop = window.scrollY + 120;
    let currentId = "";
    sections.forEach(sec => {
      if (sec.offsetTop <= fromTop) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  }
  window.addEventListener("scroll", throttle(onScroll, 80), { passive: true });
  onScroll();

  /* ---------- 复制 ---------- */
  $$("[data-copy]").forEach(btn => {
    btn.addEventListener("click", function () {
      const text = this.getAttribute("data-copy");
      const done = () => showToast("toastCopied");
      const fail = () => showToast("toastCopyFail", "error");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(done).catch(fail);
      } else {
        const temp = document.createElement("input");
        temp.value = text;
        document.body.appendChild(temp);
        temp.select();
        try { document.execCommand("copy"); done(); } catch (e) { fail(); }
        document.body.removeChild(temp);
      }
    });
  });

  /* ---------- 发送邮件：提示并尝试打开邮件客户端 ---------- */
  $$('a[href^="mailto:"]').forEach(link => {
    link.addEventListener("click", () => {
      showToast("toastMail", "info");
    });
  });

  /* ---------- 打印简历 ---------- */
  $$("[data-print]").forEach(btn => {
    btn.addEventListener("click", () => window.print());
  });
  // 打印前确保技能进度条已填充（未滚动到时宽度为 0）
  window.addEventListener("beforeprint", () => {
    $$(".skill-bar .fill").forEach(fill => {
      fill.style.width = fill.dataset.level + "%";
    });
  });

  /* ---------- 滚动渐入 ---------- */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach(el => revealObserver.observe(el));

  /* ---------- 统计数字滚动 ---------- */
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  /* ---------- 技能进度条 ---------- */
  const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.level + "%";
        skillObserver.unobserve(fill);
      }
    });
  }, { threshold: 0.4 });

  /* ---------- 项目模态框 ---------- */
  const modal = $("#projectModal");
  const modalTitle = $("#modal-title");
  const modalDetail = $("#modal-detail");
  const modalTags = $("#modal-tags");
  const modalClose = $("#modalClose");
  let lastFocused = null;
  let openCardKey = null;

  function openModalByKey(key) {
    const card = $(`.project-card[data-key="${key}"]`);
    if (!card) return;
    lastFocused = document.activeElement;
    openCardKey = key;
    const t = I18N[currentLang];
    const catKey = {
      power: "filterPower", camera: "filterCamera", sensor: "filterSensor",
      controller: "filterController", alarm: "filterAlarm"
    }[card.dataset.category];
    modalTitle.textContent = card.dataset.title;
    modalDetail.textContent = card.dataset.detail;
    const tags = [t[catKey], t[card.dataset.role]].filter(Boolean);
    modalTags.innerHTML = tags.map(tag => `<span class="modal-tag">${escapeHtml(tag)}</span>`).join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openCardKey = null;
    if (lastFocused) lastFocused.focus();
  }
  function refreshOpenModal() {
    // 语言切换时，用当前语言刷新已打开的模态框内容
    if (!openCardKey || !modal.classList.contains("open")) return;
    const card = $(`.project-card[data-key="${openCardKey}"]`);
    if (!card) return;
    const t = I18N[currentLang];
    const catKey = {
      power: "filterPower", camera: "filterCamera", sensor: "filterSensor",
      controller: "filterController", alarm: "filterAlarm"
    }[card.dataset.category];
    modalTitle.textContent = card.dataset.title;
    modalDetail.textContent = card.dataset.detail;
    const tags = [t[catKey], t[card.dataset.role]].filter(Boolean);
    modalTags.innerHTML = tags.map(tag => `<span class="modal-tag">${escapeHtml(tag)}</span>`).join("");
  }
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* ---------- 项目过滤 ---------- */
  const filterBtns = $$(".filter-btn");
  const projectSearch = $("#projectSearch");
  const roleToggle = $("#roleToggle");
  const projectEmpty = $("#projectEmpty");
  let activeFilter = "all";

  function applyProjectFilters() {
    const keyword = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;
    $$("#projectRender .project-card").forEach(card => {
      const matchCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchRole = !roleToggle.checked || card.dataset.independent === "true";
      const text = `${card.dataset.title} ${card.dataset.detail} ${card.dataset.category} ${card.dataset.role}`.toLowerCase();
      const matchKeyword = !keyword || text.includes(keyword);
      const show = matchCategory && matchRole && matchKeyword;
      card.classList.toggle("hidden", !show);
      if (show) {
        visibleCount++;
        // 重新触发入场动画
        card.style.animation = "none";
        void card.offsetWidth;
        card.style.animation = "";
      }
    });
    projectEmpty.style.display = visibleCount ? "none" : "block";
  }
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeFilter = btn.dataset.filter;
      applyProjectFilters();
    });
  });
  projectSearch.addEventListener("input", throttle(applyProjectFilters, 150));
  roleToggle.addEventListener("change", applyProjectFilters);

  /* ---------- 项目卡片交互（模态框 + 聚光灯） ---------- */
  function bindProjectCards() {
    $$("#projectRender .project-card").forEach(card => {
      card.addEventListener("click", () => openModalByKey(card.dataset.key));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModalByKey(card.dataset.key); }
      });
      card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        card.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      });
    });
  }

  /* ---------- 内容渲染（数据来自 content.js） ---------- */
  const langToggle = $("#langToggle");
  const typeTarget = $("#typedText");
  const advList = $("#advList");
  const statsRender = $("#statsRender");
  const workRender = $("#workRender");
  const projectRender = $("#projectRender");
  const skillsRender = $("#skillsRender");
  const skillTagsRender = $("#skillTagsRender");
  const timelineRender = $("#timelineRender");

  /* --- 打字机（文案随语言） --- */
  let typeTimer = null, roleIdx = 0, charIdx = 0, deleting = false;
  function getRoles() {
    return [I18N[currentLang].typeRole1, I18N[currentLang].typeRole2, I18N[currentLang].typeRole3];
  }
  function typeLoop() {
    const current = getRoles()[roleIdx];
    if (!deleting) {
      charIdx++;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        typeTimer = setTimeout(typeLoop, 2200);
        return;
      }
      typeTimer = setTimeout(typeLoop, 80);
    } else {
      charIdx--;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % getRoles().length;
        typeTimer = setTimeout(typeLoop, 300);
        return;
      }
      typeTimer = setTimeout(typeLoop, 36);
    }
  }
  function resetTypewriter() {
    clearTimeout(typeTimer);
    roleIdx = 0; charIdx = 0; deleting = false;
    typeTarget.textContent = getRoles()[0];
    typeTimer = setTimeout(typeLoop, 800);
  }

  /* --- 应用静态文案 --- */
  function applyI18n() {
    const t = I18N[currentLang];
    $$("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (key && t[key] !== undefined) el.innerHTML = t[key];
    });
    $$("[data-i18n-placeholder]").forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (key && t[key] !== undefined) el.placeholder = t[key];
    });
    $$("[data-i18n-aria]").forEach(el => {
      const key = el.dataset.i18nAria;
      if (key && t[key] !== undefined) el.setAttribute("aria-label", t[key]);
    });
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.title = t.htmlTitle;
    const metaDesc = document.getElementById("metaDesc");
    if (metaDesc) metaDesc.content = t.htmlDesc;
    // 语言按钮：显示目标语言
    langToggle.textContent = I18N[currentLang === "zh" ? "en" : "zh"].langSwitch;
    langToggle.title = currentLang === "zh" ? "English" : "中文";
  }

  /* --- 渲染函数（结构必须与 style.css 选择器匹配） --- */
  function renderAdvantages() {
    advList.innerHTML = ADVANTAGES.map(item => `
      <li><span class="adv-icon"><i class="fas ${item.icon}"></i></span>${escapeHtml(item[currentLang])}</li>`).join("");
  }
  function renderStats() {
    statsRender.innerHTML = STATS.map(s => s.count !== null ? `
      <div class="stat-card">
        <div class="stat-value" data-count="${s.count}" data-suffix="${escapeHtml(s.suffix[currentLang])}">0${escapeHtml(s.suffix[currentLang])}</div>
        <div class="stat-label">${escapeHtml(s.label[currentLang])}</div>
      </div>` : `
      <div class="stat-card">
        <div class="stat-value">${escapeHtml(s.label[currentLang])}</div>
        <div class="stat-label">${escapeHtml(s.sub[currentLang])}</div>
      </div>`).join("");
    $$("#statsRender .stat-value[data-count]").forEach(el => counterObserver.observe(el));
  }
  function renderWork() {
    workRender.innerHTML = WORK.map(w => `
      <div class="work-card">
        <h3>${escapeHtml(w.company)}</h3>
        <div class="work-meta"><i class="fas fa-calendar-alt"></i>${escapeHtml(w.period[currentLang])} ｜ ${escapeHtml(I18N[currentLang][w.roleKey])}</div>
        <ul>${w.duties[currentLang].map(d => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
      </div>`).join("");
  }
  function renderProjects() {
    projectRender.innerHTML = PROJECTS.map(p => `
      <div class="project-card" role="button" tabindex="0"
        data-key="${p.id}" data-category="${p.category}" data-role="${p.role}"
        data-independent="${p.independent}"
        data-title="${escapeHtml(p.title[currentLang])}"
        data-detail="${escapeHtml(p.detail[currentLang])}">
        <span class="project-badge">${escapeHtml(I18N[currentLang][p.role])}</span>
        <h3>${escapeHtml(p.title[currentLang])}</h3>
        <ul>${p.tags.map(tag => `<li>${escapeHtml(typeof tag === "string" ? tag : tag[currentLang])}</li>`).join("")}</ul>
        <span class="card-arrow"><i class="fas fa-arrow-right"></i></span>
      </div>`).join("");
    bindProjectCards();
    applyProjectFilters();
  }
  function renderSkills() {
    skillsRender.innerHTML = SKILLS.map(s => `
      <div class="skill-item">
        <div class="skill-head"><strong>${escapeHtml(s.name[currentLang])}</strong><span>${s.level}%</span></div>
        <div class="skill-bar"><div class="fill" data-level="${s.level}"></div></div>
      </div>`).join("");
    skillTagsRender.innerHTML = SKILL_TOOLS.map(tool => `<span class="tag">${escapeHtml(tool[currentLang])}</span>`).join("");
    $$("#skillsRender .fill").forEach(fill => skillObserver.observe(fill));
  }
  function renderTimeline() {
    timelineRender.innerHTML = TIMELINE.map(item => `
      <li><span class="tl-time">${escapeHtml(item.time[currentLang])}</span><br><span class="tl-text">${escapeHtml(item.text[currentLang])}</span></li>`).join("");
  }

  /* --- 语言切换总调度 --- */
  function setLanguage(lang, save, showTip) {
    currentLang = lang;
    if (save) localStorage.setItem("lang", lang);
    applyI18n();
    renderAdvantages();
    renderStats();
    renderWork();
    renderProjects();
    renderSkills();
    renderTimeline();
    resetTypewriter();
    refreshOpenModal();
    if (showTip) showToast("toastLang", "info");
  }
  setLanguage(currentLang, false, false);

  langToggle.addEventListener("click", () => {
    setLanguage(currentLang === "zh" ? "en" : "zh", true, true);
  });

  /* ---------- 回到顶部 ---------- */
  $("#backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 注册 Service Worker ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
});
