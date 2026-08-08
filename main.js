/* ==========================================================================
   Xiaowei Luo 个人网站 - 交互脚本
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

/* ---------- Toast 提示 ---------- */
const toastWrap = $("#toastWrap");
function showToast(message, type = "success") {
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
    const status = msg => {
      commentsEl.innerHTML = `<p class="comments-status">${msg}</p>`;
    };
    if (!repo || repo.includes("your-")) {
      status('<i class="fas fa-cog"></i> 留言板尚未配置（main.js 中 GITHUB_REPO）');
      return;
    }
    status('<i class="fas fa-spinner fa-spin"></i> 留言板加载中…');
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
      status('<i class="fas fa-exclamation-circle"></i> 留言板加载失败（无法访问 utteranc.es），请稍后刷新重试');
    };
    commentsEl.appendChild(script);
    // 超时检测：脚本已加载但组件未出现时提示（utteranc.es 可能被网络拦截）
    clearTimeout(commentsLoadTimer);
    commentsLoadTimer = setTimeout(() => {
      if (!document.querySelector("iframe.utterances-frame")) {
        status('<i class="fas fa-exclamation-circle"></i> 留言板加载超时（utteranc.es 无法访问），请稍后刷新重试');
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
  function setTheme(theme, save = true) {
    document.body.classList.toggle("light-mode", theme === "light");
    themeIcon.className = theme === "light" ? "fas fa-sun" : "fas fa-moon";
    if (save) localStorage.setItem("theme", theme);
    syncCommentsTheme(theme);
  }
  // 首次访问跟随系统偏好
  const savedTheme = localStorage.getItem("theme");
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (systemDark ? "dark" : "light"), !savedTheme);
  themeToggle.addEventListener("click", () => {
    const next = document.body.classList.contains("light-mode") ? "dark" : "light";
    setTheme(next);
    showToast(next === "light" ? "已切换到浅色模式" : "已切换到深色模式", "info");
  });

  /* ---------- 打字机效果 ---------- */
  const roles = [
    "嵌入式硬件工程师 ｜ Embedded Hardware Engineer",
    "MCU ｜ PCB ｜ Sensor System",
    "矿用设备与电源管理研发"
  ];
  const typeTarget = $("#typedText");
  let roleIdx = 0, charIdx = 0, deleting = false;
  function typeLoop() {
    const current = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(typeLoop, 2200);
        return;
      }
      setTimeout(typeLoop, 80);
    } else {
      charIdx--;
      typeTarget.textContent = current.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeLoop, 300);
        return;
      }
      setTimeout(typeLoop, 36);
    }
  }
  setTimeout(typeLoop, 800);

  /* ---------- 汉堡菜单 ---------- */
  const nav = $("#mainNav");
  const hamburger = $("#hamburger");
  hamburger.addEventListener("click", () => nav.classList.toggle("menu-open"));
  $$("#mainNav .nav-links a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("menu-open"));
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
      const done = () => showToast("已复制到剪贴板");
      const fail = () => showToast("复制失败，请手动复制", "error");
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
  // mailto 依赖本机邮件客户端，未关联时点击无反应，给出提示并引导备用方式
  $$('a[href^="mailto:"]').forEach(link => {
    link.addEventListener("click", () => {
      showToast("正在尝试打开邮件客户端…若未弹出，请用“网页版写信”或复制邮箱", "info");
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
  $$(".stat-value[data-count]").forEach(el => counterObserver.observe(el));

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
  $$(".skill-bar .fill").forEach(fill => skillObserver.observe(fill));

  /* ---------- 项目模态框 ---------- */
  const modal = $("#projectModal");
  const modalTitle = $("#modal-title");
  const modalDetail = $("#modal-detail");
  const modalTags = $("#modal-tags");
  const modalClose = $("#modalClose");
  let lastFocused = null;

  function openModal(card) {
    lastFocused = document.activeElement;
    modalTitle.textContent = card.dataset.title;
    modalDetail.textContent = card.dataset.detail;
    const tags = [card.dataset.category, card.dataset.role].filter(Boolean);
    modalTags.innerHTML = tags.map(t => `<span class="modal-tag">${escapeHtml(t)}</span>`).join("");
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    modalClose.focus();
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }
  $$(".project-card").forEach(card => {
    card.addEventListener("click", () => openModal(card));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(card); }
    });
  });
  modalClose.addEventListener("click", closeModal);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  /* ---------- 项目过滤 ---------- */
  const filterBtns = $$(".filter-btn");
  const projectCards = $$(".project-card");
  const projectSearch = $("#projectSearch");
  const roleToggle = $("#roleToggle");
  const projectEmpty = $("#projectEmpty");
  let activeFilter = "all";

  function applyProjectFilters() {
    const keyword = projectSearch.value.trim().toLowerCase();
    let visibleCount = 0;
    projectCards.forEach(card => {
      const matchCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchRole = !roleToggle.checked || (card.dataset.role || "").includes("独立");
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
  applyProjectFilters();

  /* ---------- 项目卡片聚光灯效果 ---------- */
  projectCards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
      card.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
    });
  });

  /* ---------- 回到顶部 ---------- */
  $("#backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 联系方式展开 ---------- */
  const contactToggle = $("#contactToggle");
  const contactDetails = $("#contactDetails");
  if (contactToggle && contactDetails) {
    contactToggle.addEventListener("click", () => {
      const open = contactDetails.classList.toggle("open");
      contactToggle.innerHTML = open
        ? '<i class="fas fa-chevron-up"></i> 收起'
        : '<i class="fas fa-envelope"></i> 联系我';
    });
  }

  /* ---------- 注册 Service Worker ---------- */
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
});
