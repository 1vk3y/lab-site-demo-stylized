// Simple i18n and UI behaviors for ChenLab site
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  const translations = {
    en: {
      brand: "ChenLab",
      "nav.home": "Home",
      "nav.research": "Research",
      "nav.team": "Team",
      "nav.publications": "Publications",
      "nav.contact": "Contact Us",
      "hero.title": "Advancing Science Through Innovation",
      "hero.sub": "ChenLab explores cell biology with a focus on cell fate determination, integrating quantitative experiments and analysis.",
      "hero.cta": "Explore Research",
      "research.title": "Research",
      "research.lead": "Our research theme: Cell Fate Determination.",
      "research.area1.title": "Cell Fate Decisions",
      "research.area1.text": "Mechanisms governing differentiation, lineage specification, and reprogramming.",
      "research.area2.title": "Single‑cell Omics",
      "research.area2.text": "Transcriptomic and epigenomic profiling to decode cellular heterogeneity.",
      "research.area3.title": "Signaling & Development",
      "research.area3.text": "Pathways controlling stem cells, morphogenesis, and tissue regeneration.",
      "team.title": "Team",
      "team.lead": "We are a diverse and collaborative group of researchers and students.",
      "team.pi.name": "Dr. Chen",
      "team.pi.role": "Principal Investigator",
      "team.member1.name": "Alex",
      "team.member1.role": "PhD Student",
      "team.member2.name": "Li Wei",
      "team.member2.role": "Research Assistant",
      "pubs.title": "Publications",
      "pubs.lead": "Selected recent publications.",
      "pubs.item1.title": "Single‑cell trajectories of human development",
      "pubs.item2.title": "Epigenetic control of cell fate decisions",
      "pubs.item3.title": "Signaling networks in stem cell differentiation",
      "contact.title": "Contact Us",
      "contact.address.title": "Address",
      "contact.address.text": "123 Research Ave, Science City, Country",
      "contact.email.title": "Email",
      "footer.text": "Pursuing excellence in research and education."
    },
    zh: {
      brand: "ChenLab",
      "nav.home": "首页",
      "nav.research": "研究方向",
      "nav.team": "团队成员",
      "nav.publications": "学术论文",
      "nav.contact": "联系我们",
      "hero.title": "以创新驱动科学进步",
      "hero.sub": "ChenLab 聚焦细胞生物学，重点研究细胞命运决定，结合定量实验与数据分析。",
      "hero.cta": "了解研究",
      "research.title": "研究方向",
      "research.lead": "我们的研究主题：细胞命运决定。",
      "research.area1.title": "细胞命运决定",
      "research.area1.text": "阐明分化、谱系特异化与重编程的调控机制。",
      "research.area2.title": "单细胞组学",
      "research.area2.text": "通过转录组与表观组测序解析细胞异质性。",
      "research.area3.title": "信号通路与发育",
      "research.area3.text": "干细胞、形态发生与组织再生的关键信号通路。",
      "team.title": "团队成员",
      "team.lead": "我们是一支多元协作的研究团队。",
      "team.pi.name": "陈博士",
      "team.pi.role": "课题组负责人",
      "team.member1.name": "Alex",
      "team.member1.role": "博士生",
      "team.member2.name": "李伟",
      "team.member2.role": "研究助理",
      "pubs.title": "学术论文",
      "pubs.lead": "部分近期代表性工作。",
      "pubs.item1.title": "人类发育的单细胞轨迹",
      "pubs.item2.title": "细胞命运决定的表观遗传调控",
      "pubs.item3.title": "干细胞分化中的信号网络",
      "contact.title": "联系我们",
      "contact.address.title": "地址",
      "contact.address.text": "科学之城 研究大道 123 号",
      "contact.email.title": "邮箱",
      "footer.text": "以卓越的科研与教育为追求。"
    }
  };

  const htmlEl = document.documentElement;
  const langBtn = $('#lang-toggle');

  function applyLang(lang){
    const dict = translations[lang] || translations.en;
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    htmlEl.lang = (lang === 'zh') ? 'zh-CN' : 'en';
    // Update toggle label to show the other language as primary hint
    if (lang === 'zh') {
      langBtn.textContent = '中文 / EN';
      document.title = 'ChenLab | 首页';
    } else {
      langBtn.textContent = 'EN / 中文';
      document.title = 'ChenLab | Home';
    }
    localStorage.setItem('chenlab_lang', lang);
    setCopyright(lang);
  }

  function initLang(){
    const saved = localStorage.getItem('chenlab_lang');
    let lang = saved || (navigator.language && navigator.language.startsWith('zh') ? 'zh' : 'en');
    applyLang(lang);
  }

  function toggleLang(){
    const current = localStorage.getItem('chenlab_lang') || (htmlEl.lang.startsWith('zh') ? 'zh' : 'en');
    applyLang(current === 'en' ? 'zh' : 'en');
  }

  // Back to top
  const backBtn = $('#backToTop');
  function onScroll(){
    if (window.scrollY > 120) {
      backBtn.classList.add('show');
    } else {
      backBtn.classList.remove('show');
    }
  }

  function toTop(){
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // Footer year (localized)
  function setCopyright(lang){
    const el = $('#copyright');
    if (!el) return;
    const year = new Date().getFullYear();
    el.textContent = (lang === 'zh')
      ? `© ${year} ChenLab 版权所有`
      : `© ${year} ChenLab. All rights reserved.`;
  }

  // Smooth in-page link focus handling (accessibility nicety)
  function initNavFocus(){
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener('click', () => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) setTimeout(() => target.setAttribute('tabindex','-1') || target.focus(), 400);
      });
    });
  }

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    langBtn && langBtn.addEventListener('click', toggleLang);
    window.addEventListener('scroll', onScroll, {passive:true});
    backBtn && backBtn.addEventListener('click', toTop);
    onScroll();
    initNavFocus();
  });
})();
