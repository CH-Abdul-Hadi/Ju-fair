export type Lang = "en" | "cn";

const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Our Services",
      experience: "Our Experience",
      globalNetwork: "Global Network",
      partner: "Become Our Partner",
      contact: "Contact Us",
      becomePartner: "Become Our Partner",
    },

    footer: {
      tagline:
        "Connecting Buyers. Empowering Exhibitions. Creating Opportunities.",
      company: "Company",
      support: "Support",
      contactInfo: "Contact Info",
      links: {
        about: "About Us",
        services: "Our Services",
        experience: "Our Experience",
        partner: "Become Our Partner",
        contact: "Contact Us",
        faqs: "FAQs",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
      },
      address: "Shanghai, China",
      phone: "+86 131 6255 5370",
      email: "info@jufairglobal.com",
      copyright: "JU Fair Global. All rights reserved.",
      crafted: "Crafted with precision for international business.",
    },

    home: {
      hero: {
        badge: "International Trade Partner",
        headline: "Connecting Global Buyers with",
        headlineAccent: "Trade Opportunities Worldwide",
        description:
          "JU FAIR GLOBAL helps attract international buyers, organize business matchmaking, and create measurable trade results.",
        btnPartner: "Become Our Partner",
        btnExplore: "Request Buyer Recruitment",
        stats: [
          { value: "3,000+", label: "Qualified Buyers" },
          { value: "50+", label: "Countries" },
          { value: "10+", label: "Exhibitions" },
        ],
      },
      services: {
        eyebrow: "What We Offer",
        title: "Helping Buyers Expand Globally",
        description:
          "From targeted buyer recruitment to curated matchmaking — every service is designed to drive measurable international trade outcomes.",
        featured: {
          title: "International Buyer Recruitment",
          desc: "Qualified buyer sourcing across 40+ markets using our proprietary matching system. We guarantee the right decision-makers at your event.",
          link: "Explore Recruitment",
          points: [
            "Database outreach & targeted campaigns",
            "Email marketing & direct phone invitations",
            "Social media prospecting",
            "Partnerships with chambers & associations",
          ],
        },
        cards: [
          {
            title: "Business Matchmaking",
            desc: "Curated 1:1 B2B meetings that lead to real trade outcomes and measurable ROI.",
          },
          {
            title: "Exhibition Sales",
            desc: "Global sales representation to fill your show floor with premium international exhibitors.",
          },
          {
            title: "Buyer Knowledge",
            desc: "Actionable insights and data analytics to convert trade leads faster.",
          },
        ],
        readMore: "Read more",
      },
      whyChoose: {
        eyebrow: "Advantages",
        title: "Why Choose JU FAIR GLOBAL",
        description:
          "Our proprietary methodology guarantees measurable trade outcomes for your events.",
        items: [
          {
            label: "Global Reach",
            desc: "Active presence across Europe, Middle East, South Asia, and North America.",
          },
          {
            label: "Industry Expertise",
            desc: "Decades of combined experience in trade, logistics, and event management.",
          },
          {
            label: "Data-Driven Recruitment",
            desc: "Targeted outreach using rich buyer databases and digital marketing channels.",
          },
          {
            label: "Measurable Business Results",
            desc: "Focus on actual order placement, contract signing, and verified ROI.",
          },
        ],
      },
      howItWorks: {
        eyebrow: "Process",
        title: "How We Deliver Results",
        description:
          "A streamlined four-step methodology to connect you with the world's most qualified buyers.",
        steps: [
          {
            title: "Discovery",
            desc: "We analyze your ideal buyer profiles and show metrics.",
          },
          {
            title: "Targeting",
            desc: "Proprietary matching against our 3000+ database.",
          },
          {
            title: "Engagement",
            desc: "Multi-channel outreach and meeting curation.",
          },
          {
            title: "Outcomes",
            desc: "Guaranteed meetings and comprehensive reporting.",
          },
        ],
      },
      trust: {
        eyebrow: "Trusted Worldwide",
        title: "Trusted by 3,000+ International Buyers",
        description:
          "Join the top exhibitors and organizers who rely on JU FAIR GLOBAL for qualified buyer acquisition across every industry.",
      },
      testimonials: [
        {
          quote:
            "JU FAIR GLOBAL delivered an outstanding matchmaking experience. We secured three major international distributors within two days of the expo.",
          name: "Sarah Jenkins",
          company: "Global Tech Exhibitions",
        },
        {
          quote:
            "Their targeted buyer recruitment methodology transformed our visitor quality. Our exhibitors reported a 40% increase in meaningful leads.",
          name: "Michael Chen",
          company: "Asia Pacific Trade Board",
        },
        {
          quote:
            "The most reliable international sales representation we've ever partnered with. Transparent reporting and consistently high conversion rates.",
          name: "Elena Rodriguez",
          company: "European Auto Shows",
        },
      ],
      cta: {
        title: "Ready to Grow Your Trade Potential?",
        description:
          "Join our network of international representatives, exhibitors, and organizers. Unlock access to a world of verified buyers.",
        btn: "Become Our Partner",
      },
    },

    about: {
      hero: {
        eyebrow: "About Us",
        title: "JU FAIR GLOBAL",
        subtitle:
          "A Division of JU GLOBAL established in 2022, located in Shanghai, China.",
      },
      story: {
        eyebrow: "Company Background",
        title: "Building Bridges in Global Trade",
        p1: "Founded as an exhibition services division, JU FAIR GLOBAL was built from extensive experience in international trade, logistics, sourcing, and cross-border business.",
        p2: "We identified a critical challenge: Buyers and suppliers were not connecting effectively during trade events. Creating JU FAIR GLOBAL bridged this gap, offering structured recruitment, qualified matchmaking, and end-to-end event support.",
        missionStatement: "Transform exhibitions into long-term business opportunities.",
        highlights: [
          "Established 2022",
          "Shanghai, China HQ",
          "3,000+ Verified Buyers",
          "Data-Driven Matching",
        ],
      },
      mission: {
        eyebrow: "Mission & Vision",
        title: "Our Purpose",
        description: "The driving forces behind our global operations.",
        cards: [
          {
            title: "Our Mission",
            desc: "Connect buyers, exhibitors, and organizers through targeted, result-driven business matchmaking.",
          },
          {
            title: "Our Vision",
            desc: "Become a trusted global exhibition platform and partner of choice for trade fair success.",
          },
        ],
      },
      values: {
        eyebrow: "Core Values",
        title: "What Guides Us",
        items: [
          {
            title: "Professionalism",
            desc: "High standards in every client interaction and event setup.",
          },
          {
            title: "Integrity",
            desc: "Transparent operations and trusted relationship building.",
          },
          {
            title: "Global Collaboration",
            desc: "Bridging international markets seamlessly.",
          },
          {
            title: "Results-Oriented",
            desc: "Focused on delivering tangible ROI and trade conversions.",
          },
        ],
      },
      timeline: {
        eyebrow: "Milestones",
        title: "Our Timeline",
        subtitle: "A legacy of bridging international markets.",
        events: [
          {
            year: "2023",
            t: "Founded",
            d: "Established as the exhibition services division of JU Global.",
          },
          {
            year: "2024",
            t: "First Events",
            d: "Successfully ran 3 matchmaking events and recruited 3,000+ buyers.",
          },
          {
            year: "2025",
            t: "Global Expansion",
            d: "Expanded network across Europe, Middle East, South Asia and North America.",
          },
          {
            year: "2026",
            t: "Record Results",
            d: "Facilitated USD 1 Million+ largest single order through our platform.",
          },
        ],
      },
    },

    services: {
      hero: {
        eyebrow: "What We Do",
        title: "Buyer Recruitment & Beyond",
        subtitle:
          "Comprehensive services driving measurable ROI for international exhibitors and organizers.",
      },
      items: [
        {
          title: "International Buyer Recruitment",
          desc: "Reach highly qualified international buyers perfectly matched to your product and industry. We leverage our proprietary database and multi-channel outreach to guarantee the right attendees.",
          points: [
            "Database outreach & targeted campaigns",
            "Email marketing & direct phone invitations",
            "Social media prospecting (LinkedIn, Facebook, Instagram)",
            "Paid search advertising (Google Ads)",
            "Strategic partnerships with trade associations & chambers of commerce",
          ],
          floatingLabel: "Guaranteed",
          floatingValue: "ROI Focused",
          cta: "Get Started",
        },
        {
          title: "Business Matchmaking",
          desc: "Curated 1:1 B2B meetings with pre-qualified buyers during your event. We handle buyer qualification, meeting scheduling, coordination, interpretation, and post-event follow-up and trade reporting.",
          points: [
            "Pre-event buyer qualification & screening",
            "One-on-one meeting scheduling & coordination",
            "On-site interpretation & translation support",
            "Post-event follow-up tracking & comprehensive trade reporting",
          ],
          floatingLabel: "Guaranteed",
          floatingValue: "ROI Focused",
          cta: "Get Started",
        },
        {
          title: "International Buyer Support",
          desc: "End-to-end support ensuring buyers attend, engage, and convert. We provide a seamless experience from invitation to post-show follow-up.",
          points: [
            "Official invitation letters & visa assistance",
            "Dedicated hotel booking & accommodation support",
            "Airport pickup & local transport coordination",
          ],
          floatingLabel: "Guaranteed",
          floatingValue: "ROI Focused",
          cta: "Get Started",
        },
        {
          title: "Exhibition Sales Representation",
          desc: "Global sales representation to fill your show floor with premium international exhibitors. We handle local and international exhibitor recruitment, booth sales, and marketing.",
          points: [
            "Local & international exhibitor recruitment",
            "Exhibition booth sales & sponsorship management",
            "Event marketing & B2B lead generation",
            "Strategic partnership development",
          ],
          floatingLabel: "Guaranteed",
          floatingValue: "ROI Focused",
          cta: "Get Started",
        },
      ],
    },

    experience: {
      hero: {
        eyebrow: "Portfolio",
        title: "Our Experience",
        subtitle:
          "A snapshot of the premium shows and organizers we proudly support around the world.",
      },
      results: {
        eyebrow: "Impact",
        title: "Measurable Results",
        stats: [
          { n: "3,000+", label: "International Buyers Recruited" },
          { n: "3+", label: "Major Matchmaking Events" },
          { n: "5+", label: "High-Value Trade Deals" },
          { n: "$1M+", label: "Largest Single Order Secured" },
        ],
      },
      exhibitions: {
        eyebrow: "Our Partners",
        title: "Exhibitions We Support",
        description:
          "Trusted by leading trade shows and organizers across multiple industry verticals.",
        names: [
          "China Yiwu International Commodities Fair",
          "Canton Fair",
          "Yiwu Innovation Expo",
          "ShanghaiTex",
          "China Medical Equipment Fair",
          "Rubber Technology Exhibition",
          "Shanghai Energy Saving Exhibition",
        ],
      },
      caseStudies: {
        eyebrow: "Success Stories",
        title: "Case Studies",
        items: [
          {
            title: "Canton Fair 2023",
            desc: "Recruited 850+ international buyers from Europe, South Asia and the Middle East through targeted digital matchmaking.",
            stat: "850+",
            label: "Buyers Recruited",
          },
          {
            title: "ShanghaiTex Matchmaking",
            desc: "Delivered curated B2B meetings for textile & garment buyers, resulting in multiple long-term partnerships and trade deals.",
            stat: "5",
            label: "Deals Closed",
          },
          {
            title: "Yiwu Commodities Fair Support",
            desc: "Provided full buyer support services — invitations, visas, hotel, transport — ensuring top international attendance.",
            stat: "$1M+",
            label: "Largest Order",
          },
        ],
      },
      gallery: {
        eyebrow: "Moments",
        title: "Image Gallery",
        description:
          "Highlights from our global events and bustling trade floors.",
        overlay: "Global Trade Expo",
      },
      industries: {
        eyebrow: "Industries",
        title: "Industries We Serve",
        description:
          "We have deep expertise across a wide range of trade verticals.",
        items: [
          "Consumer Goods",
          "Textiles & Garments",
          "Industrial Manufacturing",
          "Medical Equipment",
          "Building Materials",
          "Rubber & Chemicals",
          "Digital Trade",
          "Smart Technology",
        ],
      },
    },

    globalNetwork: {
      hero: {
        eyebrow: "Worldwide",
        title: "Our Global Network",
        subtitle:
          "Local expertise in every major trading region, ensuring targeted and relevant connections.",
      },
      coverage: {
        eyebrow: "Coverage",
        title: "Global Presence",
        description:
          "Our network spans key regions across Europe, Middle East, South Asia and North America, enabling unmatched access to localized decision-makers.",
      },
      stats: [
        { t: "50+", d: "Countries" },
        { t: "5,000+", d: "Verified Buyers" },
        { t: "15+", d: "Exhibitions" },
      ],
      activeRegions: "Active Regions",
      regions: {
        Europe: ["Hungary", "Germany", "Poland", "Czech Republic"],
        "Middle East": ["Saudi Arabia", "United Arab Emirates (UAE)"],
        "South Asia": ["Pakistan", "Bangladesh", "India"],
        "North America": ["Canada", "United States of America (USA)"],
      },
      model: {
        eyebrow: "Our Approach",
        title: "Network Working Model",
        description:
          "A proven, relationship-driven model that creates lasting connections in every market.",
        steps: [
          "Identify Target Buyers: Analyze event profiles and match specific buyer personas.",
          "Direct Company Visits: Engage key industry players in regional markets.",
          "Association & Chamber Outreach: Partner with local chambers of commerce and trade bodies.",
          "Local Promotions: Run localized advertising and offline promotion events.",
          "Long-Term Relationship Management: Nurture buyers and trade networks beyond single events.",
        ],
      },
    },

    partner: {
      hero: {
        eyebrow: "Grow Together",
        title: "Partner With Us",
        subtitle:
          "Three distinct partnership models tailored to accelerate your international business growth.",
      },
      models: {
        eyebrow: "Pathways",
        title: "How to Collaborate",
        description:
          "Choose the partnership track that aligns with your business goals.",
        items: [
          {
            title: "International Representatives",
            desc: "Represent JU FAIR GLOBAL in your local market. Earn recurring commissions while providing your clients access to premium global trade shows.",
          },
          {
            title: "Exhibition Organizers",
            desc: "Partner with us to fill your show floor and buyer aisles with our global buyer recruitment and matchmaking programs.",
          },
          {
            title: "Exhibitors & Brands",
            desc: "Secure buyer connections, market expansion support, and guaranteed ROI improvement through our VIP exhibitor program.",
          },
        ],
        applyNow: "Apply Now",
      },
      benefits: {
        eyebrow: "Why Partner",
        title: "Partnership Opportunities",
        description:
          "What you can expect when you join the JU FAIR GLOBAL network.",
        items: [
          {
            t: "For Representatives",
            items: [
              "Commission-based business model",
              "Exclusive VIP exhibition access",
              "Sustainable, long-term collaboration",
            ],
          },
          {
            t: "For Organizers",
            items: [
              "Turnkey global promotion campaigns",
              "Dedicated international buyer recruitment",
              "Complete on-site matchmaking programs",
            ],
          },
          {
            t: "For Exhibitors",
            items: [
              "Direct access to pre-qualified buyers",
              "Fast-track market expansion",
              "Maximized exhibition ROI",
            ],
          },
        ],
      },
      cta: {
        title: "Ready to Partner With Us?",
        desc: "Submit your application today. Our partnership team reviews all inquiries and will be in touch within 48 hours to discuss next steps.",
        btn: "Become Our Partner",
      },
    },

    contact: {
      hero: {
        eyebrow: "Get In Touch",
        title: "Contact Us",
        subtitle:
          "We respond to all partnership and recruitment inquiries within one business day.",
      },
      form: {
        title: "Send us a message",
        subtitle:
          "Fill out the form below and our partnership team will reach out to you.",
        fields: {
          name: "Name",
          email: "Email",
          company: "Company",
          country: "Country",
          phone: "Phone (Optional)",
          message: "Message",
          messagePlaceholder:
            "Tell us about your exhibition or buyer recruitment needs...",
        },
        services: {
          label: "Interested Service",
          options: [
            "Buyer Recruitment",
            "Matchmaking",
            "Booth Sales",
            "Partnership",
            "Other",
          ],
        },
        submit: "Send Message",
        success: {
          title: "Message Sent!",
          desc: "Thank you for contacting JU FAIR GLOBAL. Our international trade team will review your message and get back to you within one business day.",
          btnServices: "Our Services",
          btnHome: "Back Home",
        },
      },
      sidebar: {
        contactInfo: "Contact Info",
        hq: "Global Headquarters",
        address: "Shanghai, China",
        phone: "WhatsApp / Direct",
        phoneValue: "+86 189 1690 9892",
        emailSupport: "Email Support",
        emailValue: "info@jufairglobal.com",
        connectWith: "Connect With Us",
      },
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // CHINESE (CN)
  // ─────────────────────────────────────────────────────────────────
  cn: {
    nav: {
      home: "首页",
      about: "关于我们",
      services: "服务项目",
      experience: "成功案例",
      globalNetwork: "全球网络",
      partner: "成为合作伙伴",
      contact: "联系我们",
      becomePartner: "成为合作伙伴",
    },

    footer: {
      tagline:
        "连接买家。赋能展会。创造机遇。",
      company: "公司",
      support: "支持",
      contactInfo: "联系方式",
      links: {
        about: "关于我们",
        services: "服务项目",
        experience: "成功案例",
        partner: "成为合作伙伴",
        contact: "联系我们",
        faqs: "常见问题",
        privacy: "隐私政策",
        terms: "服务条款",
      },
      address: "中国上海",
      phone: "+86 131 6255 5370",
      email: "info@jufairglobal.com",
      copyright: "JU Fair Global. 版权所有。",
      crafted: "专为国际商务精心打造。",
    },

    home: {
      hero: {
        badge: "国际贸易伙伴",
        headline: "连接全球买家与",
        headlineAccent: "全球贸易商机",
        description:
          "JU FAIR GLOBAL 致力于帮助：吸引国际买家、组织商务配对以及创造可量化的贸易成果。",
        btnPartner: "成为合作伙伴",
        btnExplore: "申请买家招募",
        stats: [
          { value: "3,000+", label: "合格买家" },
          { value: "50+", label: "覆盖国家" },
          { value: "10+", label: "合作展会" },
        ],
      },
      services: {
        eyebrow: "我们的服务",
        title: "助力买家拓展全球市场",
        description:
          "从精准买家招募到定制化商务配对，每项服务都致力于推动可量化的国际贸易成果。",
        featured: {
          title: "国际买家招募",
          desc: "利用我们专有的匹配系统，在40多个市场中精准挖掘合格买家，确保正确的决策者出席您的展会。",
          link: "了解买家招募",
          points: [
            "数据库外联与定向推广",
            "邮件营销与直接电话邀约",
            "社交媒体开发 (LinkedIn, Facebook, Instagram)",
            "与商会及行业协会建立战略合作",
          ],
        },
        cards: [
          {
            title: "商务配对",
            desc: "精心策划的一对一B2B会谈，带来真实贸易成果与可量化的投资回报。",
          },
          {
            title: "展会销售",
            desc: "全球销售代理服务，助您吸引优质国际参展商填满展位。",
          },
          {
            title: "买家洞察",
            desc: "可落地的市场洞察与数据分析，助您更快转化贸易商机。",
          },
        ],
        readMore: "了解更多",
      },
      whyChoose: {
        eyebrow: "核心优势",
        title: "为什么选择 JU FAIR GLOBAL",
        description: "我们的专有方法论，确保您的展会获得可量化的贸易成果。",
        items: [
          {
            label: "全球覆盖",
            desc: "在欧洲、中东、南亚和北美等关键区域均有活跃业务分布。",
          },
          {
            label: "行业专长",
            desc: "在贸易、物流以及展会管理方面拥有数十年的复合行业经验。",
          },
          {
            label: "数据驱动招募",
            desc: "利用丰富的买家数据库与先进的数字营销渠道开展定向开发。",
          },
          {
            label: "可量化的贸易成果",
            desc: "专注于推动实际订单落地、合同签约以及经过验证的投资回报。",
          },
        ],
      },
      howItWorks: {
        eyebrow: "工作流程",
        title: "我们如何交付成果",
        description: "四步精简方法论，助您与全球最优质买家建立连接。",
        steps: [
          {
            title: "需求分析",
            desc: "深入分析您的目标买家画像与展会目标。",
          },
          {
            title: "精准定向",
            desc: "基于3000+买家数据库进行专有匹配。",
          },
          {
            title: "多渠道触达",
            desc: "多渠道外联推广与会议精准策划。",
          },
          {
            title: "成果交付",
            desc: "保障会议数量并提供全面的效果报告。",
          },
        ],
      },
      trust: {
        eyebrow: "全球信赖",
        title: "超过3,000位国际买家的信赖之选",
        description:
          "加入依赖 JU FAIR GLOBAL 进行优质买家获取的顶级参展商与展会组织者行列。",
      },
      testimonials: [
        {
          quote:
            "JU FAIR GLOBAL提供了卓越的配对服务体验，我们在展会两天内成功签约了三家重要国际分销商。",
          name: "Sarah Jenkins",
          company: "Global Tech Exhibitions",
        },
        {
          quote:
            "他们的精准买家招募方法彻底改善了我们的参观者质量，参展商反馈有效商机增加了40%。",
          name: "Michael Chen",
          company: "Asia Pacific Trade Board",
        },
        {
          quote:
            "这是我们合作过的最可靠的国际销售代理，报告透明，转化率持续稳定且出色。",
          name: "Elena Rodriguez",
          company: "European Auto Shows",
        },
      ],
      cta: {
        title: "准备好释放您的贸易潜力了吗？",
        description:
          "加入我们的国际代理商、参展商和组织者网络，解锁全球认证买家资源。",
        btn: "成为合作伙伴",
      },
    },

    about: {
      hero: {
        eyebrow: "关于我们",
        title: "JU FAIR GLOBAL",
        subtitle: "JU GLOBAL旗下展览服务部门，成立于2022年，总部位于中国上海。",
      },
      story: {
        eyebrow: "公司背景",
        title: "架构全球贸易的桥梁",
        p1: "作为展览服务部门创立，JU FAIR GLOBAL深植于国际贸易、物流、采购及跨境商业领域的丰富经验。",
        p2: "我们发现了一个关键痛点：买家与供应商在展会期间无法有效对接。我们创建 JU FAIR GLOBAL 弥合这一差距，提供结构化招募、合格配对以及端到端活动支持。",
        missionStatement: "将展会转化为长期商业机会。",
        highlights: [
          "成立于2022年",
          "总部位于中国上海",
          "超过3,000名认证买家",
          "数据驱动的精准匹配",
        ],
      },
      mission: {
        eyebrow: "使命愿景",
        title: "我们的宗旨",
        description: "驱动我们全球运营的核心力量。",
        cards: [
          {
            title: "我们的使命",
            desc: "通过精准且结果驱动的商务配对，紧密连接买家、参展商与组织者。",
          },
          {
            title: "我们的愿景",
            desc: "成为受信赖的全球展览平台与成功协办伙伴的首选之选。",
          },
        ],
      },
      values: {
        eyebrow: "核心价值观",
        title: "我们的准则",
        items: [
          {
            title: "专业",
            desc: "在每一次客户互动与活动部署中践行最高标准。",
          },
          {
            title: "诚信",
            desc: "透明的业务操作，架构值得信赖的长期合作关系。",
          },
          {
            title: "全球协作",
            desc: "无缝桥接国际市场，跨国高效协同。",
          },
          {
            title: "结果导向",
            desc: "专注于输出真实的投资回报率 (ROI) 与贸易转化结果。",
          },
        ],
      },
      timeline: {
        eyebrow: "里程碑",
        title: "发展历程",
        subtitle: "架构国际市场桥梁的传承之路。",
        events: [
          {
            year: "2023",
            t: "公司成立",
            d: "作为JU Global旗下的展览服务部门正式成立。",
          },
          {
            year: "2024",
            t: "首批活动",
            d: "成功举办3场商务配对活动，累计招募3,000多名买家。",
          },
          {
            year: "2025",
            t: "全球扩张",
            d: "网络拓展至欧洲、中东、南亚和北美地区。",
          },
          {
            year: "2026",
            t: "创纪录成果",
            d: "通过平台促成单笔最高订单超过100万美元。",
          },
        ],
      },
    },

    services: {
      hero: {
        eyebrow: "我们的业务",
        title: "买家招募及更多服务",
        subtitle: "全方位服务，为国际参展商和组织者创造可量化的投资回报。",
      },
      items: [
        {
          title: "国际买家招募",
          desc: "精准触达与您的产品和行业完美匹配的国际合格买家。我们利用专有数据库与多渠道外联手段，确保正确的决策者出席您的展会。",
          points: [
            "数据库外联与定向推广",
            "邮件营销与直接电话邀约",
            "社交媒体开发 (LinkedIn, Facebook, Instagram)",
            "搜索推广广告 (Google Ads)",
            "与商会及行业协会建立战略合作关系",
          ],
          floatingLabel: "有保障的",
          floatingValue: "专注回报",
          cta: "立即咨询",
        },
        {
          title: "商务配对",
          desc: "为展会期间的预资质买家提供精心策划的一对一B2B会谈。我们全程负责买家资质审核、会议安排、现场协调、口译服务及展后跟进和贸易报告。",
          points: [
            "展前买家资质审核与匹配筛选",
            "一对一会议日程安排与现场协调",
            "现场口译与翻译服务支持",
            "展后跟进追踪与全面的贸易报告",
          ],
          floatingLabel: "有保障的",
          floatingValue: "专注回报",
          cta: "立即咨询",
        },
        {
          title: "国际买家接待支持",
          desc: "全程支持服务，确保买家顺利出席、积极参与并达成转化。我们从邀请函到展后跟进，提供无缝衔接的全程体验。",
          points: [
            "官方邀请函开具与签证协助支持",
            "专属酒店预订与住宿配套保障",
            "机场接送与当地交通协调安排",
          ],
          floatingLabel: "有保障的",
          floatingValue: "专注回报",
          cta: "立即咨询",
        },
        {
          title: "展会销售代理",
          desc: "全球销售代理服务，帮助您吸引优质国际参展商填满展位。我们负责本地及国际参展商招募、展位销售及营销推广。",
          points: [
            "本地与国际参展商双向精准招募",
            "展会展位销售及赞助活动管理",
            "展会营销推广与B2B销售线索生成",
            "战略合作伙伴开发与跟进",
          ],
          floatingLabel: "有保障的",
          floatingValue: "专注回报",
          cta: "立即咨询",
        },
      ],
    },

    experience: {
      hero: {
        eyebrow: "项目案例",
        title: "我们的成功经验",
        subtitle: "我们所服务的顶级展会及组织者概览。",
      },
      results: {
        eyebrow: "成果数据",
        title: "可量化的成果",
        stats: [
          { n: "3,000+", label: "招募的国际买家数" },
          { n: "3+", label: "举办的主要商务配对活动" },
          { n: "5+", label: "促成的高价值贸易合同" },
          { n: "$1M+", label: "锁定的单笔最大订单值" },
        ],
      },
      exhibitions: {
        eyebrow: "合作伙伴",
        title: "我们服务的展会",
        description: "受到多个行业领先展会及组织者的信赖与认可。",
        names: [
          "中国义乌国际小商品博览会",
          "广交会",
          "义乌创新博览会",
          "上海国际纺织工业展 (ShanghaiTex)",
          "中国国际医疗器械博览会",
          "橡胶技术展览会",
          "上海国际节能展览会",
        ],
      },
      caseStudies: {
        eyebrow: "成功案例",
        title: "案例研究",
        items: [
          {
            title: "广交会 2023",
            desc: "通过精准数字化配对，从欧洲、南亚和中东招募了850多名国际买家。",
            stat: "850+",
            label: "招募买家数",
          },
          {
            title: "ShanghaiTex 商务配对",
            desc: "为纺织品及服装买家提供定制化B2B会谈服务，达成多项长期合作关系与贸易协议。",
            stat: "5",
            label: "签约合同",
          },
          {
            title: "义乌博览会买家接待支持",
            desc: "提供全程买家支持服务——邀请函、签证、酒店、交通，确保顶级国际买家顺利出席。",
            stat: "$1M+",
            label: "最大单笔订单",
          },
        ],
      },
      gallery: {
        eyebrow: "精彩瞬间",
        title: "图片展示",
        description: "我们全球活动与繁忙展会现场的精彩回顾。",
        overlay: "全球贸易展览",
      },
      industries: {
        eyebrow: "服务行业",
        title: "我们服务的行业",
        description: "我们在众多贸易垂直领域拥有深厚的专业积累。",
        items: [
          "消费品",
          "纺织品与服装",
          "工业制造",
          "医疗器械",
          "建筑材料",
          "橡胶与化工",
          "数字贸易",
          "智能科技",
        ],
      },
    },

    globalNetwork: {
      hero: {
        eyebrow: "全球覆盖",
        title: "我们的全球网络",
        subtitle: "深耕每一个主要贸易区域，确保精准且高度相关的商业连接。",
      },
      coverage: {
        eyebrow: "覆盖范围",
        title: "全球布局",
        description:
          "我们的网络覆盖欧洲、中东、南亚和北美的核心区域，实现对本地决策者的无与伦比的精准触达。",
      },
      stats: [
        { t: "40+", d: "覆盖国家" },
        { t: "3,000+", d: "认证买家" },
        { t: "15+", d: "合作展会" },
      ],
      activeRegions: "活跃区域",
      regions: {
        欧洲: ["匈牙利", "德国", "波兰", "捷克共和国"],
        中东: ["沙特阿拉伯", "阿联酋 (UAE)"],
        南亚: ["巴基斯坦", "孟加拉国", "印度"],
        北美洲: ["加拿大", "美国 (USA)"],
      },
      model: {
        eyebrow: "我们的方法",
        title: "网络运行模式",
        description: "一套经过验证的关系驱动模型，在每个市场创造持久连接。",
        steps: [
          "定位目标买家：分析展会展商结构，匹配具体的买家画像。",
          "直接企业拜访：在区域市场实地拜访并接触关键的行业买家。",
          "协会与商会外联：与当地商会及行业团体合作，进行定向推荐。",
          "本地推广活动：开展本地化的媒体推广与线下专场推介会。",
          "长期关系管理：在单次展会之外，持续维护并培育买家贸易网络关系。",
        ],
      },
    },

    partner: {
      hero: {
        eyebrow: "携手共赢",
        title: "与我们合作",
        subtitle: "三种差异化合作模式，量身打造，加速您的国际业务增长。",
      },
      models: {
        eyebrow: "合作路径",
        title: "如何开展合作",
        description: "选择最符合您业务目标的合作模式。",
        items: [
          {
            title: "国际代理商",
            desc: "在您的本地市场代理 JU FAIR GLOBAL，赚取持续佣金，同时为您的客户提供优质全球展会的准入资格。",
          },
          {
            title: "展会组织者",
            desc: "与我们合作，通过我们的全球买家招募和商务配对项目，填满您的展位与买家通道。",
          },
          {
            title: "参展商与品牌",
            desc: "通过我们的VIP参展商项目，获得买家资源对接、市场拓展支持，以及有保障的投资回报提升。",
          },
        ],
        applyNow: "立即申请",
      },
      benefits: {
        eyebrow: "合作优势",
        title: "合作伙伴机遇",
        description: "加入 JU FAIR GLOBAL 网络后，您可以期待获得的支持与回报。",
        items: [
          {
            t: "代理商专属",
            items: [
              "佣金合作模式",
              "专属VIP展会准入资格",
              "长期可持续的业务协同合作",
            ],
          },
          {
            t: "组织者专属",
            items: [
              "一站式全球营销推广活动",
              "专属的国际买家定向招募",
              "完整的现场一站式商务配对计划",
            ],
          },
          {
            t: "参展商专属",
            items: [
              "直接触达预筛选的合格买家",
              "快速通道，轻松助力市场拓展",
              "最大化提升参展投资回报率 (ROI)",
            ],
          },
        ],
      },
      cta: {
        title: "准备好与我们合作了吗？",
        desc: "立即提交申请。我们的合作团队将审核所有询盘，并在48小时内与您联系，商讨后续合作步骤。",
        btn: "成为合作伙伴",
      },
    },

    contact: {
      hero: {
        eyebrow: "联系我们",
        title: "联系我们",
        subtitle: "我们将在一个工作日内回复所有合作与招募咨询。",
      },
      form: {
        title: "给我们发送消息",
        subtitle: "填写以下表单，我们的合作团队将与您取得联系。",
        fields: {
          name: "姓名",
          email: "电子邮箱",
          company: "公司名称",
          country: "国家",
          phone: "联系电话 (选填)",
          message: "您的需求",
          messagePlaceholder: "请描述您的展会或买家招募需求……",
        },
        services: {
          label: "意向服务",
          options: [
            "买家招募",
            "商机配对",
            "展位销售",
            "合作伙伴",
            "其他",
          ],
        },
        submit: "发送消息",
        success: {
          title: "消息已发送！",
          desc: "感谢您联系 JU FAIR GLOBAL。我们的国际贸易团队将审阅您的消息，并在一个工作日内回复您。",
          btnServices: "查看服务",
          btnHome: "返回首页",
        },
      },
      sidebar: {
        contactInfo: "联系方式",
        hq: "全球总部",
        address: "中国上海",
        phone: "WhatsApp / 电话",
        phoneValue: "+86 189 1690 9892",
        emailSupport: "邮箱支持",
        emailValue: "info@jufairglobal.com",
        connectWith: "关注我们",
      },
    },
  },
} as const;

export default translations;

export function t(lang: Lang) {
  return translations[lang];
}
