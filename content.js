/* ==========================================================================
   Xiaowei Luo 个人网站 - 内容数据与多语言字典
   --------------------------------------------------------------------------
   可持续发展约定：
   - 所有可展示内容集中在本文档，改简历/加项目只需改这里，不动 HTML/JS
   - 新增语言：在 I18N 中加一个节点（如 "ja"），并将各数据中的 zh/en 补全
   - 项目过滤分类与角色使用固定 key，与语言无关
   ========================================================================== */

/* ---------- 多语言字典 ---------- */
const I18N = {
  zh: {
    /* 站点标题与描述（浏览器标签页 / SEO） */
    htmlTitle: "Xiaowei Luo - 嵌入式硬件工程师",
    htmlDesc: "Xiaowei Luo 的个人简介与项目展示，嵌入式硬件工程师，聚焦矿用电子设备、电源管理、传感器与工业通信研发。",
    /* 导航 */
    navOverview: "能力概览", navBasic: "基本信息", navWork: "工作经历",
    navProjects: "项目经历", navSkills: "核心技能", navTimeline: "时间轴",
    navMessage: "留言板", navHighlights: "技术亮点", navContact: "联系方式",
    /* 按钮 */
    sendMail: "发送邮件", webMail: "网页版写信", copyEmail: "复制邮箱",
    printResume: "打印简历", langSwitch: "中", 
    /* Hero */
    heroTagExplosion: "防爆标准",
    /* 能力概览 */
    overviewTitle: "能力概览", overviewText: "专注矿用设备与工业现场应用研发，覆盖硬件设计、嵌入式开发与系统联调，重视可靠性与工程化落地。",
    /* 基本信息 */
    basicTitle: "基本信息", basicName: "姓名：", basicExp: "工作经验：",
    basicField: "技术方向：", basicEmail: "邮箱：",
    basicExpVal: "3 年", basicFieldVal: "嵌入式硬件研发",
    /* 工作经历 */
    workTitle: "工作经历", roleDev: "电子工程师（研发）", roleDevEn: "Electronics Engineer (R&D)",
    /* 项目经历 */
    projectsTitle: "项目经历",
    filterAll: "全部", filterSensor: "传感器", filterCamera: "摄像仪",
    filterController: "控制器", filterAlarm: "报警器", filterPower: "电源",
    projectSearchPh: "搜索项目关键词，如：RS485、光纤、Modbus",
    projectSoloOnly: "只看独立开发",
    projectEmpty: "没有找到匹配的项目，换个关键词试试",
    /* 角色标签 */
    roleSoloDev: "独立开发", roleSoloDesign: "独立设计",
    roleHwDesign: "硬件设计", roleHwEmbed: "硬件&嵌入式", roleTechSupport: "技术支持",
    /* 核心技能 */
    skillsTitle: "核心技能",
    /* 时间轴 */
    timelineTitle: "工作与项目时间轴",
    /* 留言板 */
    messageTitle: "留言板",
    /* 技术亮点 */
    highlightsTitle: "技术亮点",
    hl1Title: "防爆标准适配", hl1Desc: "具备 GB3836 防爆要求的电源改造与结构协同经验，覆盖从方案到认证文档的全流程。",
    hl2Title: "远程监控与通信", hl2Desc: "在多项目中集成 RS485 与 Modbus RTU/TCP，支持远程读取与控制。",
    hl3Title: "数据记录与UI", hl3Desc: "通过 FATFS 记录运行数据，使用 LVGL 实现电源参数可视化与阈值配置。",
    /* 联系方式 */
    contactTitle: "联系方式",
    /* Footer */
    footerCopyright: "© 2026 Xiaowei Luo. 保留所有权利。",
    footerLine: "Built with <i class=\"fas fa-heart\" style=\"color:#ff5c7a;\"></i> · 嵌入式硬件工程师的个人网站",
    /* 无障碍标签 */
    ariaTheme: "切换主题", ariaMenuOpen: "打开菜单", ariaMenuClose: "关闭菜单",
    ariaBackTop: "回到顶部", ariaCloseModal: "关闭模态框", ariaLang: "Switch to English",
    /* Toast */
    toastCopied: "已复制到剪贴板", toastCopyFail: "复制失败，请手动复制",
    toastMail: "正在尝试打开邮件客户端…若未弹出，请用“网页版写信”或复制邮箱",
    toastLight: "已切换到浅色模式", toastDark: "已切换到深色模式",
    toastLang: "已切换为中文",
    /* 留言板状态 */
    commentsUnset: '<i class="fas fa-cog"></i> 留言板尚未配置（content.js 中 GITHUB_REPO）',
    commentsLoading: '<i class="fas fa-spinner fa-spin"></i> 留言板加载中…',
    commentsFail: '<i class="fas fa-exclamation-circle"></i> 留言板加载失败（无法访问 utteranc.es），请稍后刷新重试',
    commentsTimeout: '<i class="fas fa-exclamation-circle"></i> 留言板加载超时（utteranc.es 无法访问），请稍后刷新重试',
    /* 打字机角色 */
    typeRole1: "嵌入式硬件工程师 ｜ Embedded Hardware Engineer",
    typeRole2: "MCU ｜ PCB ｜ Sensor System",
    typeRole3: "矿用设备与电源管理研发"
  },

  en: {
    /* Site title & description (browser tab / SEO) */
    htmlTitle: "Xiaowei Luo - Embedded Hardware Engineer",
    htmlDesc: "Personal profile and project portfolio of Xiaowei Luo, an embedded hardware engineer focused on mining electronic devices, power management, sensors and industrial communication R&D.",
    /* 导航 */
    navOverview: "Overview", navBasic: "Basic Info", navWork: "Experience",
    navProjects: "Projects", navSkills: "Skills", navTimeline: "Timeline",
    navMessage: "Guestbook", navHighlights: "Highlights", navContact: "Contact",
    /* 按钮 */
    sendMail: "Send Email", webMail: "Web Mail", copyEmail: "Copy Email",
    printResume: "Print Resume", langSwitch: "EN",
    /* Hero */
    heroTagExplosion: "Explosion-proof",
    /* 能力概览 */
    overviewTitle: "Overview", overviewText: "Focused on mining equipment and industrial field applications, covering hardware design, embedded development and system integration, with emphasis on reliability and engineering delivery.",
    /* 基本信息 */
    basicTitle: "Basic Info", basicName: "Name: ", basicExp: "Experience: ",
    basicField: "Focus: ", basicEmail: "Email: ",
    basicExpVal: "3 Years", basicFieldVal: "Embedded Hardware R&D",
    /* 工作经历 */
    workTitle: "Work Experience", roleDev: "Electronics Engineer (R&D)", roleDevEn: "Electronics Engineer (R&D)",
    /* 项目经历 */
    projectsTitle: "Projects",
    filterAll: "All", filterSensor: "Sensors", filterCamera: "Cameras",
    filterController: "Controllers", filterAlarm: "Alarms", filterPower: "Power",
    projectSearchPh: "Search projects, e.g. RS485, fiber, Modbus",
    projectSoloOnly: "Solo projects only",
    projectEmpty: "No matching projects. Try another keyword.",
    /* 角色标签 */
    roleSoloDev: "Solo Development", roleSoloDesign: "Solo Design",
    roleHwDesign: "Hardware Design", roleHwEmbed: "Hardware & Embedded", roleTechSupport: "Technical Support",
    /* 核心技能 */
    skillsTitle: "Core Skills",
    /* 时间轴 */
    timelineTitle: "Work & Project Timeline",
    /* 留言板 */
    messageTitle: "Guestbook",
    /* 技术亮点 */
    highlightsTitle: "Highlights",
    hl1Title: "Explosion-proof Compliance", hl1Desc: "Experience in GB3836-compliant power retrofit and structural collaboration, covering the full process from design to certification documents.",
    hl2Title: "Remote Monitoring & Communication", hl2Desc: "Integrated RS485 and Modbus RTU/TCP across multiple projects for remote reading and control.",
    hl3Title: "Data Logging & UI", hl3Desc: "FATFS-based data logging with LVGL-powered visualization of power parameters and threshold configuration.",
    /* 联系方式 */
    contactTitle: "Contact",
    /* Footer */
    footerCopyright: "© 2026 Xiaowei Luo. All rights reserved.",
    footerLine: "Built with <i class=\"fas fa-heart\" style=\"color:#ff5c7a;\"></i> · Personal site of an Embedded Hardware Engineer",
    /* 无障碍标签 */
    ariaTheme: "Toggle theme", ariaMenuOpen: "Open menu", ariaMenuClose: "Close menu",
    ariaBackTop: "Back to top", ariaCloseModal: "Close dialog", ariaLang: "切换到中文",
    /* Toast */
    toastCopied: "Copied to clipboard", toastCopyFail: "Copy failed, please copy manually",
    toastMail: "Opening email client... If it doesn't appear, use Web Mail or copy the email",
    toastLight: "Light mode on", toastDark: "Dark mode on",
    toastLang: "Language switched to English",
    /* 留言板状态 */
    commentsUnset: '<i class="fas fa-cog"></i> Guestbook not configured (GITHUB_REPO in content.js)',
    commentsLoading: '<i class="fas fa-spinner fa-spin"></i> Loading guestbook…',
    commentsFail: '<i class="fas fa-exclamation-circle"></i> Failed to load guestbook (cannot reach utteranc.es). Please refresh later.',
    commentsTimeout: '<i class="fas fa-exclamation-circle"></i> Guestbook loading timed out (utteranc.es unreachable). Please refresh later.',
    /* 打字机角色 */
    typeRole1: "Embedded Hardware Engineer",
    typeRole2: "MCU ｜ PCB ｜ Sensor System",
    typeRole3: "Mining Equipment & Power Management R&D"
  }
};

/* ---------- 能力概览（优势 + 统计） ---------- */
const ADVANTAGES = [
  {
    icon: "fa-microchip",
    zh: "具备矿用电子设备独立开发经验，从需求分析到量产全流程主导，实现产品技术突破与落地应用。",
    en: "Proven experience in independently developing mining electronic devices, leading the full process from requirement analysis to mass production with technical breakthroughs and field deployment."
  },
  {
    icon: "fa-code",
    zh: "熟练掌握 STM32 / STC 单片机嵌入式开发，擅长硬件电路设计与 PCB 布局。",
    en: "Skilled in STM32 / STC MCU embedded development, with expertise in hardware circuit design and PCB layout."
  },
  {
    icon: "fa-shield-halved",
    zh: "深入理解煤矿防爆标准与安全认证流程，具备从技术方案到认证文档的全周期项目管理能力。",
    en: "Deep understanding of coal mine explosion-proof standards and safety certification; capable of full-cycle project management from technical solutions to certification documents."
  },
  {
    icon: "fa-network-wired",
    zh: "精通 Modbus 等工业通信协议与多传感器集成。",
    en: "Proficient in Modbus and other industrial communication protocols and multi-sensor integration."
  }
];

const STATS = [
  { count: 3, suffix: { zh: "年", en: " yrs" }, label: { zh: "硬件与嵌入式研发经验", en: "Hardware & Embedded R&D" } },
  { count: 10, suffix: { zh: "+", en: "+" }, label: { zh: "矿用设备与系统项目", en: "Mining Equipment & System Projects" } },
  { count: null, suffix: null, label: { zh: "全流程", en: "Full-Cycle" }, sub: { zh: "原理图、PCB、联调与优化", en: "Schematic, PCB, Debugging & Optimization" } }
];

/* ---------- 工作经历 ---------- */
const WORK = [
  {
    company: "Industrial Electronics Company",
    period: { zh: "2023.06 - 2024.08", en: "2023.06 - 2024.08" },
    roleKey: "roleDev",
    duties: {
      zh: [
        "参与煤矿设备新产品全流程开发：需求调研、方案设计评估、功能实现及样机测试优化",
        "负责硬件功能模块设计与实现，参与制定技术方案并进行可行性评估",
        "执行产品样机功能测试与性能优化，跟踪生产协作并持续改进产品性能",
        "完成工艺文件编制、BOM 清单整理及硬件元器件选型工作",
        "协助完成煤矿安全认证（煤安认证）送审材料的准备与对接"
      ],
      en: [
        "Participated in full-cycle development of new mining equipment products: requirement research, solution design & evaluation, feature implementation, prototype testing and optimization",
        "Designed and implemented hardware functional modules; participated in technical solution definition and feasibility assessment",
        "Conducted prototype functional testing and performance optimization; tracked production collaboration and continuously improved product performance",
        "Prepared process documents, BOM lists and hardware component selection",
        "Assisted in preparing and coordinating coal mine safety certification (MA) submission materials"
      ]
    }
  },
  {
    company: "Industrial IoT Technology Company",
    period: { zh: "2024.08 - 至今", en: "2024.08 - Present" },
    roleKey: "roleDevEn",
    duties: {
      zh: [
        "参与新产品调研与技术方案制定，核心功能设计与实现，完成样机测试与多轮优化迭代",
        "主导产品测试流程优化与生产协作，建立标准化测试文档，跟踪产品问题并推动改进",
        "负责工艺文件编制、BOM 清单整理及硬件元器件选型，关注物料成本控制与供应稳定性",
        "深度参与煤矿安全认证（煤安认证）送审工作，协助整理技术文档并通过审核"
      ],
      en: [
        "Participated in new product research and technical planning; designed and implemented core features; completed prototype testing with multiple optimization iterations",
        "Led test process optimization and production collaboration; established standardized test documentation; tracked product issues and drove improvements",
        "Prepared process documents, BOM lists and component selection, focusing on cost control and supply stability",
        "Deeply involved in MA certification submission; assisted in organizing technical documents and passing review"
      ]
    }
  }
];

/* ---------- 项目经历 ----------
   category: all 之外使用固定 key（power/camera/sensor/controller/alarm）
   independent: true 表示计入“只看独立开发” */
const PROJECTS = [
  {
    id: "p1", category: "power", role: "roleSoloDev", independent: true,
    tags: ["STC12 + CN3765", "RS485 + Modbus RTU"],
    title: { zh: "矿用双路12V/18V浇封电源", en: "Mining Dual 12V/18V Encapsulated Power Supply" },
    detail: {
      zh: "独立负责矿用双路12V/18V浇封电源的硬件与嵌入式系统开发。基于STC12与CN3765充电管理芯片设计磷酸铁锂电池充放电管理电路，实现过充、过放、短路等多重保护机制。通过RS485+Modbus RTU与上位机通信，支持远程实时读取电压、电流等关键参数及输入输出通断控制。独立完成原理图设计、PCB布局布线及单片机固件开发，产品通过相关测试，满足矿用浇封防爆标准。",
      en: "Independently developed the hardware and embedded system of a mining dual-output 12V/18V encapsulated power supply. Designed LiFePO4 battery charge/discharge circuits based on STC12 MCU and CN3765 charge controller, with multi-layer protections including over-charge, over-discharge and short circuit. Communicates with host software via RS485 + Modbus RTU, supporting remote real-time reading of voltage/current and I/O on-off control. Completed schematic, PCB layout and firmware by myself; the product passed relevant tests and meets mining encapsulation explosion-proof standards."
    }
  },
  {
    id: "p2", category: "camera", role: "roleTechSupport", independent: false,
    tags: [{ zh: "电源模块重构", en: "Power Module Redesign" }, { zh: "GB3836防爆标准", en: "GB3836 Explosion-proof Standard" }],
    title: { zh: "红外测温摄像仪（防爆改造）", en: "Infrared Thermography Camera (Explosion-proof Retrofit)" },
    detail: {
      zh: "针对双光谱摄像仪方案重新设计电源模块，优化电路布局与元器件选型，满足GB3836防爆标准，确保在易燃易爆环境中安全稳定运行。协同结构工程师完成防爆外壳的机械设计与密封方案，为产品送审认证提供全流程技术支持，最终协助产品通过防爆认证检测。",
      en: "Redesigned the power module of a dual-spectrum camera solution, optimizing circuit layout and component selection to meet GB3836 explosion-proof standards for safe operation in flammable environments. Collaborated with mechanical engineers on the flameproof enclosure design and sealing scheme, provided end-to-end technical support for certification, and helped the product pass explosion-proof certification tests."
    }
  },
  {
    id: "p3", category: "camera", role: "roleSoloDesign", independent: true,
    tags: [{ zh: "无线传输改造", en: "Wireless Transmission Retrofit" }, { zh: "协议转换与外设扩展", en: "Protocol Conversion & Peripheral Expansion" }],
    title: { zh: "无线对讲摄像仪", en: "Wireless Intercom Camera" },
    detail: {
      zh: "针对传统摄像仪布线复杂的问题，基于摄像仪机芯与无线AP独立完成无线传输改造方案。独立设计转接电路板及嵌入式软件，实现机芯数据的协议转换与处理，扩展功放、麦克风、灯光控制与雨刷控制等外围功能，提升产品集成度与实用性。",
      en: "Solved the wiring complexity of traditional cameras with a wireless transmission retrofit based on the camera core module and wireless AP. Independently designed the adapter board and embedded firmware for protocol conversion of camera data, and extended peripherals such as audio amplifier, microphone, light control and wiper control, improving product integration and practicality."
    }
  },
  {
    id: "p4", category: "camera", role: "roleSoloDesign", independent: true,
    tags: [{ zh: "光纤远传", en: "Fiber-optic Remote Transmission" }, { zh: "Pelco-D控制", en: "Pelco-D Control" }],
    title: { zh: "矿用本安型光纤摄像仪（微型）", en: "Mining Intrinsically Safe Fiber Camera (Miniature)" },
    detail: {
      zh: "独立设计微型光纤数据转接板，实现机芯数据通过光纤传输至交换机，支持高清视频远距离稳定传输。开发嵌入式控制程序，基于Pelco-D协议接收并解析后台指令，精准控制灯光、雨刷等矿用外设。集成音频功能模块，内置功放与麦克风电路，实现对讲与实时音频监控。",
      en: "Independently designed a miniature fiber-optic data adapter board to transmit camera data to switches over fiber for stable long-distance HD video. Developed embedded control firmware that parses host commands via Pelco-D protocol to precisely control mining peripherals such as lights and wipers. Integrated audio modules with built-in amplifier and microphone circuits for intercom and real-time audio monitoring."
    }
  },
  {
    id: "p5", category: "sensor", role: "roleSoloDev", independent: true,
    tags: [{ zh: "电磁感应检测", en: "Electromagnetic Induction Sensing" }, { zh: "阈值可调报警", en: "Adjustable Threshold Alarm" }],
    title: { zh: "矿用设备启停传感器", en: "Mining Equipment On/Off Sensor" },
    detail: {
      zh: "针对矿用设备运行状态监测需求，独立完成纯硬件传感器开发。基于电磁感应原理，通过线圈感应设备电缆电流变化，经放大比较电路处理感应信号；实现阈值可调的比较器设计，电流超过设定值时触发LED报警并输出无源开关量信号。结构紧凑、抗干扰能力强。",
      en: "Developed a pure-hardware sensor for monitoring the running status of mining equipment. Based on electromagnetic induction, the coil senses current changes in the equipment cable and the signal is processed by an amplifier-comparator circuit. The adjustable-threshold comparator triggers an LED alarm and outputs a passive digital signal when current exceeds the set value. Compact structure with strong anti-interference capability."
    }
  },
  {
    id: "p6", category: "sensor", role: "roleSoloDev", independent: true,
    tags: [{ zh: "电阻变化检测", en: "Resistance Change Detection" }, { zh: "开关量报警输出", en: "Digital Alarm Output" }],
    title: { zh: "电极式堆煤传感器", en: "Electrode-type Coal Pile Sensor" },
    detail: {
      zh: "独立设计并实现基于电阻检测原理的电极式堆煤传感器，通过监测电极与接地线间的阻值变化判断煤堆堆积状态，阻值低于预设阈值时触发开关量报警信号，实现对堆煤事故的实时预警。开发适用于恶劣环境的检测电路，重点优化抗干扰性与稳定性，完成原型制作与功能验证。",
      en: "Independently designed an electrode-type coal pile sensor based on resistance detection. It monitors the resistance change between electrodes and ground to determine pile-up status, and triggers a digital alarm when resistance drops below the preset threshold for real-time early warning of coal pile accidents. Developed detection circuits for harsh environments with optimized anti-interference and stability, and completed prototyping and functional verification."
    }
  },
  {
    id: "p7", category: "controller", role: "roleHwEmbed", independent: false,
    tags: [{ zh: "多路计量与控制", en: "Multi-channel Metering & Control" }, "Modbus RTU/TCP"],
    title: { zh: "矿用电源控制器", en: "Mining Power Controller" },
    detail: {
      zh: "基于STM32F103与HLW8032电能计量芯片，设计并实现多路交流电压、电流的实时采集电路，通过继电器完成精准的通道通断控制。独立开发LCD显示模块，实时展示电压、电流、功率等关键电参数。支持Modbus RTU/TCP双协议远程监控，集成本地按键、PLC远程指令与上位机软件三种控制方式；通过软件滤波算法提升计量精度与抗干扰能力。",
      en: "Designed multi-channel AC voltage/current acquisition circuits based on STM32F103 and HLW8032 energy metering IC, with precise relay channel control. Developed an LCD display module showing voltage, current and power in real time. Supports dual-protocol remote monitoring via Modbus RTU/TCP, and integrates three control modes: local buttons, PLC remote commands and host software. Software filtering improves metering accuracy and anti-interference."
    }
  },
  {
    id: "p8", category: "camera", role: "roleHwDesign", independent: false,
    tags: [{ zh: "功放与扬声器集成", en: "Amplifier & Speaker Integration" }, { zh: "本安防爆要求", en: "Intrinsic Safety Requirements" }],
    title: { zh: "图像处理摄像仪（音频增强）", en: "Image Processing Camera (Audio Enhanced)" },
    detail: {
      zh: "在摄像仪方案基础上增加大功率功放电路并集成扬声器，实现远距离音频播放，满足井下语音对讲及报警需求。负责摄像仪硬件选型评估，完成功放模块的电路原理设计与PCB布局，严格遵循矿用本安防爆标准进行电路安全设计，通过隔离、限流等措施确保易燃易爆环境下的安全运行。",
      en: "Added a high-power amplifier circuit and integrated speakers to the camera solution for long-distance audio playback, meeting underground voice intercom and alarm requirements. Handled hardware selection, amplifier schematic design and PCB layout, strictly following mining intrinsically-safe standards with isolation and current-limiting measures for safe operation in explosive environments."
    }
  },
  {
    id: "p9", category: "alarm", role: "roleSoloDev", independent: true,
    tags: [{ zh: "语音播放+灯光报警", en: "Voice + Light Alarm" }, { zh: "紧凑可靠结构", en: "Compact Reliable Design" }],
    title: { zh: "声光报警器", en: "Sound and Light Alarm" },
    detail: {
      zh: "设计基于开关量触发的声光报警系统，接收外部开关量输入信号后触发语音播放模块预存音频报警，并驱动红绿LED交替闪烁，实现声光双重报警指示。独立完成核心器件选型、电路原理图设计与PCB布局布线，通过数字逻辑电路控制语音芯片与LED驱动模块协同工作，开发出体积小巧、响应灵敏的报警装置。",
      en: "Designed a sound-and-light alarm system triggered by digital inputs. On receiving an external digital signal, it plays preset audio from the voice module and drives red/green LEDs alternately for dual alarm indication. Independently completed component selection, schematic design and PCB layout, using digital logic to coordinate the voice chip and LED drivers, resulting in a compact and responsive alarm device."
    }
  },
  {
    id: "p10", category: "sensor", role: "roleSoloDev", independent: true,
    tags: [{ zh: "多气体采集与报警", en: "Multi-gas Sensing & Alarm" }, { zh: "RS485数据输出", en: "RS485 Data Output" }],
    title: { zh: "多参气体传感器", en: "Multi-parameter Gas Sensor" },
    detail: {
      zh: "基于STM32主控，集成催化燃烧、电化学等专用气体传感器，实现多类型气体浓度采集、实时显示与阈值报警。独立设计信号调理电路，优化传感器信号采集质量，通过数据校准算法提升测量精度。支持RS485通信协议输出数据，可直接接入矿井监控系统，实现远程监测与告警联动。",
      en: "Built on an STM32 MCU with catalytic combustion and electrochemical gas sensors, achieving multi-gas concentration acquisition, real-time display and threshold alarms. Independently designed signal conditioning circuits and improved measurement accuracy through calibration algorithms. Outputs data over RS485 for direct integration with mine monitoring systems for remote monitoring and alarm linkage."
    }
  },
  {
    id: "p11", category: "power", role: "roleSoloDev", independent: true,
    tags: [{ zh: "自动识别电池节数", en: "Auto Battery Cell Count Detection" }, "FATFS+LVGL"],
    title: { zh: "自适应锂电池充放电管理系统", en: "Adaptive Li-ion Battery Charge/Discharge Management System" },
    detail: {
      zh: "基于STM32主控与CN3765电源管理芯片设计充放电电路，实现2~7节锂电池上电自动识别与参数自适应匹配。采用FATFS文件系统管理存储，记录电压、电流及设备状态数据，支持USB导出数据文件便于追溯分析。基于LVGL开发嵌入式GUI界面，实时显示电源参数并支持阈值配置；集成Modbus RTU/TCP协议实现远程监控与报警功能。",
      en: "Designed charge/discharge circuits with STM32 MCU and CN3765 PMIC, supporting automatic detection of 2–7 series Li-ion cells with adaptive parameter matching. Uses FATFS for data logging of voltage, current and device status, with USB export for traceability. Developed an LVGL-based GUI showing power parameters in real time with configurable thresholds, and integrated Modbus RTU/TCP for remote monitoring and alarms."
    }
  }
];

/* ---------- 核心技能 ---------- */
const SKILLS = [
  { level: 95, name: { zh: "嵌入式开发（STM32 / STC12 / Modbus / RS485 / Pelco-D）", en: "Embedded Development (STM32 / STC12 / Modbus / RS485 / Pelco-D)" } },
  { level: 92, name: { zh: "硬件设计（原理图 / PCB / 器件选型 / BOM）", en: "Hardware Design (Schematic / PCB / Component Selection / BOM)" } },
  { level: 88, name: { zh: "系统联调（样机测试 / 生产协作 / 认证对接）", en: "System Debugging (Prototype Testing / Production Coordination / Certification)" } },
  { level: 85, name: { zh: "软件能力（FATFS / LVGL / LCD 交互）", en: "Software Skills (FATFS / LVGL / LCD Interaction)" } }
];

const SKILL_TOOLS = [
  { zh: "Altium Designer", en: "Altium Designer" },
  { zh: "Keil", en: "Keil" },
  { zh: "STM32CubeMX", en: "STM32CubeMX" },
  { zh: "J-Link", en: "J-Link" },
  { zh: "示波器/万用表", en: "Oscilloscope / Multimeter" }
];

/* ---------- 时间轴 ---------- */
const TIMELINE = [
  { time: { zh: "2019 - 2023", en: "2019 - 2023" }, text: { zh: "电子科学与技术专业，本科。", en: "B.S. in Electronic Science and Technology." } },
  { time: { zh: "2023.06 - 2024.08", en: "2023.06 - 2024.08" }, text: { zh: "Industrial Electronics Company，电子工程师（研发）。", en: "Industrial Electronics Company, Electronics Engineer (R&D)." } },
  { time: { zh: "2024.08 - 至今", en: "2024.08 - Present" }, text: { zh: "Industrial IoT Technology Company，电子工程师（研发）。", en: "Industrial IoT Technology Company, Electronics Engineer (R&D)." } },
  { time: { zh: "2023 - 至今", en: "2023 - Present" }, text: { zh: "完成矿用电源、传感器、摄像仪、控制器与报警器等 10+ 个项目交付。", en: "Delivered 10+ projects covering mining power supplies, sensors, cameras, controllers and alarms." } }
];
