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
      mainNav: "Main navigation",
      menuToggle: "Toggle menu",
      languageSelector: "Language selector",
      skipToContent: "Skip to main content",
    },

    notFound: {
      title: "Page not found",
      desc: "The page you are looking for does not exist or has been moved.",
      goHome: "Go home",
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
          { value: "11", label: "Countries" },
          { value: "7", label: "Exhibitions" },
        ],
      },
      services: {
        eyebrow: "What We Offer",
        title: "Helping Buyers Expand Globally",
        description:
          "From targeted buyer recruitment to curated matchmaking — every service is designed to drive measurable international trade outcomes.",
        featured: {
          title: "International Buyer Recruitment",
          desc: "Qualified buyer sourcing across four global regions using our proprietary matching system. We guarantee the right decision-makers at your event.",
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
        stepLabel: "Step",
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
      // Verifiable outcomes rather than testimonials. Each figure is the one
      // published in the matching case study on /experience, so the two pages
      // corroborate each other.
      proof: {
        eyebrow: "Proven Results",
        title: "What That Work Actually Produced",
        description:
          "Three engagements, and the numbers they returned. The same figures appear in full on our experience page.",
        items: [
          {
            event: "Canton Fair 2023",
            stat: "850+",
            label: "Buyers recruited",
            desc: "International buyers recruited from Europe, South Asia and the Middle East through targeted outreach and digital matchmaking.",
          },
          {
            event: "ShanghaiTex",
            stat: "5",
            label: "Trade deals closed",
            desc: "Curated one-to-one meetings for textile and garment buyers, which became multi-year supply partnerships rather than single orders.",
          },
          {
            event: "Yiwu Commodities Fair",
            stat: "$1M+",
            label: "Largest single order",
            desc: "End-to-end buyer support — invitation letters, visas, hotels and transport — so confirmed buyers actually arrived and bought.",
          },
        ],
        cta: "See the full case studies",
      },
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
            year: "2022",
            t: "Founded",
            d: "Established as the exhibition services division of JU Global.",
          },
          {
            year: "2023",
            t: "First Events",
            d: "Successfully ran 3 matchmaking events and recruited 3,000+ buyers.",
          },
          {
            year: "2024",
            t: "Global Expansion",
            d: "Expanded network across Europe, Middle East, South Asia and North America.",
          },
          {
            year: "2025",
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
        captions: [
          "Delegation gathered for a national pavilion inauguration ceremony",
          "International buyers and organizers in conversation on the show floor",
          "Visitor trying a VR headset at a technology exhibitor's stand",
          "Crowd of visitors around an innovation stand at a trade exhibition",
        ],
        lightbox: {
          dialog: "Exhibition photo gallery",
          previous: "Previous photo",
          next: "Next photo",
          close: "Close gallery",
        },
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
        { t: "11", d: "Countries" },
        { t: "3,000+", d: "Verified Buyers" },
        { t: "7", d: "Exhibitions" },
      ],
      activeRegions: "Active Regions",
      map: {
        liveCorridor: "Live Global Trade Corridor",
        allHubs: "All Hubs",
        hq: "Shanghai HQ",
        globalHq: "Global HQ",
        regionalHub: "Regional Hub",
        tradeCorridor: "Trade Corridor",
        hint: "Drag the globe, or pick a hub",
        selectHub: "View hub details",
      },
      hubs: {
        shanghai: { label: "JU FAIR HQ (Shanghai)", region: "East Asia", buyers: "1,200+ Global Partners" },
        frankfurt: { label: "Europe Hub (Frankfurt)", region: "Europe", buyers: "850+ Verified Buyers" },
        dubai: { label: "Middle East Hub (Dubai)", region: "Middle East", buyers: "600+ Verified Buyers" },
        newyork: { label: "North America Hub (New York)", region: "North America", buyers: "750+ Verified Buyers" },
        saopaulo: { label: "South America Hub (São Paulo)", region: "Latin America", buyers: "400+ Verified Buyers" },
        nairobi: { label: "Africa Hub (Nairobi)", region: "Africa", buyers: "350+ Verified Buyers" },
        sydney: { label: "Asia-Pacific Hub (Sydney)", region: "Oceania", buyers: "500+ Verified Buyers" },
      },
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
        sending: "Sending…",
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
        phoneValue: "+86 131 6255 5370",
        emailSupport: "Email Support",
        emailValue: "info@jufairglobal.com",
        connectWith: "Connect With Us",
        mapTitle: "Our office location on the map",
      },
    },

    faqs: {
      hero: {
        eyebrow: "Questions & Answers",
        title: "Frequently Asked Questions",
        subtitle:
          "How buyer recruitment is scoped, priced and reported — answered the way we would answer it on a call.",
      },
      groups: [
        {
          title: "Buyer recruitment",
          items: [
            {
              q: "What does international buyer recruitment actually include?",
              a: "Database outreach and targeted campaigns, email marketing, direct phone invitations, prospecting on LinkedIn, Facebook and Instagram, paid search advertising, and partnerships with trade associations and chambers of commerce. Buyers are approached individually against your event's product profile — not added to a mass mailing.",
            },
            {
              q: "How do you qualify a buyer before the exhibition?",
              a: "Every buyer is screened before the event: what the company actually trades in, whether the contact holds a purchasing role, their sourcing volume, and whether they genuinely intend to travel. Only screened buyers are scheduled into matchmaking, which is why a shorter confirmed list is worth more than a long unverified one.",
            },
            {
              q: "How far in advance should we start?",
              a: "As soon as your dates are confirmed. Recruitment runs in stages — sourcing, screening, invitation, then visas and travel — and markets that need visas require the longest runway. Exact timelines are quoted per event and per target region.",
            },
            {
              q: "How much does buyer recruitment cost?",
              a: "It is quoted per event, because the scope changes with the number of target markets, the buyer volume you need and how much travel support is involved. Tell us the exhibition, your target regions and your buyer target, and you will get a written scope and price. Regional representatives work on a commission basis instead.",
            },
          ],
        },
        {
          title: "At the exhibition",
          items: [
            {
              q: "Do you schedule the meetings, or only bring the buyers?",
              a: "We schedule them. Matchmaking includes one-on-one meeting coordination between your team and screened buyers, with on-site interpretation and translation support so a language gap never ends a promising conversation.",
            },
            {
              q: "Do you help buyers with visas, hotels and transport?",
              a: "Yes. Buyer support covers official invitation letters and visa assistance, hotel booking and accommodation, and airport pickup with local transport coordination. This is the part that decides whether a confirmed buyer actually arrives.",
            },
            {
              q: "Which industries do you cover?",
              a: "Consumer goods, textiles and garments, industrial manufacturing, medical equipment, building materials, rubber and chemicals, digital trade and smart technology.",
            },
          ],
        },
        {
          title: "Results and working with us",
          items: [
            {
              q: "What do we receive after the event?",
              a: "Post-event follow-up tracking and a trade report: meetings held, buyer feedback, and the orders and contracts in progress. We measure the work on order placement and contracts signed rather than badge scans or footfall.",
            },
            {
              q: "Which regions do you recruit buyers from?",
              a: "Four regions and eleven countries: Europe (Hungary, Germany, Poland, the Czech Republic), the Middle East (Saudi Arabia and the UAE), South Asia (Pakistan, Bangladesh, India) and North America (Canada and the USA) — each worked by a team based in that market.",
            },
            {
              q: "Can you represent our exhibition in a market?",
              a: "Yes. Exhibition sales representation covers local and international exhibitor recruitment, booth sales and sponsorship management, event marketing and B2B lead generation, and developing strategic partnerships on your behalf.",
            },
            {
              q: "How do we become a partner?",
              a: "There are three tracks: regional representatives work on commission with VIP exhibition access; organisers get turnkey global promotion, buyer recruitment and on-site matchmaking; exhibitors get direct access to pre-qualified buyers. Send us a message and we will route it to the right team.",
            },
            {
              q: "Do you work in Chinese and English?",
              a: "Both. Our team operates bilingually, this website is published in English and Simplified Chinese, and on-site interpretation is part of the matchmaking service.",
            },
          ],
        },
      ],
      cta: {
        title: "Still have a question?",
        desc: "Send it to our Shanghai team. We reply to every enquiry within one business day.",
        btn: "Contact us",
      },
    },

    exhibitions: {
      common: {
        eyebrow: "Exhibition Services",
        resultTitle: "What we delivered",
        approachTitle: "What the engagement involved",
        reachTitle: "Who we brought",
        servicesLink: "See all four services",
        experienceLink: "More case studies",
        ctaTitle: "Exhibiting or organising here?",
        ctaDesc:
          "Tell us the event, your target markets and the buyer volume you need, and you will get a written scope and price. We reply within one business day.",
        ctaBtn: "Talk to our team",
      },
      items: [
        {
          event: "Canton Fair",
          title: "Buyer Recruitment for Canton Fair",
          subtitle:
            "We recruit qualified international buyers for Canton Fair exhibitors and bring them to the stand — screened, scheduled and expecting to buy.",
          stat: "850+",
          statLabel: "Buyers recruited",
          summary:
            "Across our Canton Fair work we recruited more than 850 international buyers from Europe, South Asia and the Middle East, using targeted outreach paired with digital matchmaking rather than general visitor promotion.",
          approach: [
            "Buyer sourcing against the exhibitor's actual product range, not a generic attendee list",
            "Multi-channel outreach — database campaigns, email, direct phone invitations and social prospecting",
            "Pre-event screening: what the company trades in, whether the contact buys, and whether they will travel",
            "Digital matchmaking ahead of the show, so meetings are confirmed before anyone flies",
          ],
          reach:
            "Buyers came from three of our four regions — Europe, South Asia and the Middle East — recruited by teams based in those markets rather than by remote mailshots.",
        },
        {
          event: "ShanghaiTex",
          title: "B2B Matchmaking for ShanghaiTex",
          subtitle:
            "Curated one-to-one meetings between textile and garment buyers and the exhibitors who can actually supply them.",
          stat: "5",
          statLabel: "Trade deals closed",
          summary:
            "At ShanghaiTex our work was matchmaking rather than headcount: curated B2B meetings for textile and garment buyers that produced five closed trade deals, several of which became multi-year supply partnerships rather than one-off orders.",
          approach: [
            "Buyer qualification against textile and garment sourcing requirements specifically",
            "One-to-one meeting scheduling and on-site coordination for both sides",
            "On-site interpretation and translation, so a language gap never ends a viable negotiation",
            "Post-event follow-up tracking until orders either closed or were formally dropped",
          ],
          reach:
            "Textiles and garments is one of the eight sectors our buyer network covers, alongside industrial manufacturing — the two sectors that have produced our largest deals to date.",
        },
        {
          event: "Yiwu Commodities Fair",
          title: "International Buyer Support for Yiwu Commodities Fair",
          subtitle:
            "Invitation letters, visas, hotels and transport — the logistics that decide whether a confirmed buyer actually arrives.",
          stat: "$1M+",
          statLabel: "Largest single order",
          summary:
            "For the China Yiwu International Commodities Fair we ran end-to-end buyer support, and the engagement produced the largest single order we have secured to date, at over one million US dollars.",
          approach: [
            "Official invitation letters and visa assistance for every confirmed buyer",
            "Hotel booking and accommodation handled on the buyer's behalf",
            "Airport pickup and local transport coordination for arrival and departure",
            "Attendance tracking, so a drop-out is known in time to be replaced rather than discovered on the day",
          ],
          reach:
            "This is the part of the work that decides attendance. A recruited buyer who cannot get a visa, or who lands with no transport, is not a buyer — which is why support is a service in its own right rather than an afterthought.",
        },
      ],
    },

    legal: {
      updated: "Last updated",
      updatedDate: "18 September 2026",
      privacy: {
        hero: {
          eyebrow: "Legal",
          title: "Privacy Policy",
          subtitle:
            "What this website collects, who processes it, and how to have it removed.",
        },
        sections: [
          {
            h: "Who we are",
            p: [
              "JU FAIR GLOBAL is the exhibition services division of JU GLOBAL, based in Shanghai, China. For any question about this policy, or about data we hold, write to info@jufairglobal.com.",
            ],
          },
          {
            h: "What this website collects",
            p: [
              "Only what you type into the contact form: your name, company, country, email address, an optional phone number, the service you are interested in, and your message.",
              "There are no user accounts and no login on this website, so nothing else about you is collected or stored by us.",
            ],
          },
          {
            h: "Why we collect it",
            p: [
              "To reply to your enquiry and to deliver the service you asked about. We do not sell your details, rent them, or add you to a marketing list you did not ask for.",
            ],
          },
          {
            h: "Who else processes it",
            p: [
              "Form delivery. The contact form is submitted to Web3Forms, which delivers it to our inbox, so your submission passes through their systems.",
              "Map. The office map on the contact page is embedded from a third-party map provider (Amap or Google Maps). Loading it lets that provider see your IP address and browser details, as with any embedded map.",
              "These two providers act as processors for that narrow purpose only. Beyond them, we do not share your enquiry with anyone. Fonts are served from this website itself, so no font provider sees you.",
            ],
          },
          {
            // Tagged so /privacy can substitute the paragraphs below when an
            // analytics provider is switched on. See legal.privacy.analytics.
            id: "cookies",
            h: "Cookies, analytics and tracking",
            p: [
              "This website sets no advertising or tracking cookies, and runs no analytics.",
              "The only thing stored in your browser is a single entry remembering your language choice, English or Chinese, so you do not have to set it again. You can clear it at any time through your browser's site-data settings.",
            ],
          },
          {
            h: "How long we keep it",
            p: [
              "For as long as it takes to handle your enquiry and any business relationship that follows from it, and after that only where a record has to be kept for accounting or legal reasons.",
            ],
          },
          {
            h: "Our legal basis for processing",
            p: [
              "Where the GDPR applies, we rely on your consent — given by submitting the contact form — and on our legitimate interest in responding to business enquiries addressed to us. Where the PIPL applies, we rely on your consent and on the necessity of processing to enter into or perform a contract at your request.",
              "You can withdraw consent at any time by emailing us. Withdrawing it does not affect anything already done on the basis of it, and it will normally mean we can no longer progress your enquiry.",
            ],
          },
          {
            h: "Your rights",
            p: [
              "Whatever jurisdiction you are in, you may ask us to confirm what we hold about you, to give you a copy of it, to correct it if it is wrong, or to delete it. Email info@jufairglobal.com and tell us the address you used, so we can find the right record. We will respond within 30 days.",
              "If the GDPR applies to you, you additionally have the right to restrict how we process your data, to object to processing carried out on the basis of legitimate interest, to receive your data in a portable format, and to lodge a complaint with your national supervisory authority. You do not need to go through us first to complain.",
              "If the PIPL applies to you, you additionally have the right to an explanation of how we handle your information, and to have it transferred to another handler where that is technically feasible.",
              "We do not charge for any of this, and we will not ask you to justify the request.",
            ],
          },
          {
            h: "Automated decisions and profiling",
            p: [
              "There are none. Nothing on this website scores, ranks, segments or profiles you, and no decision affecting you is taken automatically.",
            ],
          },
          {
            h: "Where your data is handled",
            p: [
              "We operate from Shanghai, China, so an enquiry sent to us is handled there. The providers named above may process it on servers in other countries.",
            ],
          },
          {
            h: "Changes to this policy",
            p: [
              "If this policy changes we will update the date at the top of this page. Material changes will be described here rather than made quietly.",
            ],
          },
        ],
        // Substituted into the "cookies" section above when an analytics
        // provider is configured, so the published policy always describes
        // what the site is actually doing. Both options are cookieless.
        analytics: {
          cloudflare: [
            "This website uses Cloudflare Web Analytics to count page views. It sets no cookies, stores no identifiers, and cannot be used to recognise you across sites or across visits.",
            "No advertising or tracking cookies are set. The only thing stored in your browser is a single entry remembering your language choice, English or Chinese, so you do not have to set it again. You can clear it at any time through your browser's site-data settings.",
          ],
          plausible: [
            "This website uses Plausible Analytics to count page views. It sets no cookies, stores no identifiers, and cannot be used to recognise you across sites or across visits.",
            "No advertising or tracking cookies are set. The only thing stored in your browser is a single entry remembering your language choice, English or Chinese, so you do not have to set it again. You can clear it at any time through your browser's site-data settings.",
          ],
        },
      },
      terms: {
        hero: {
          eyebrow: "Legal",
          title: "Terms of Service",
          subtitle: "Terms covering use of this website and how engagements are contracted.",
        },
        sections: [
          {
            h: "About these terms",
            p: [
              "These terms cover your use of www.jufairglobal.com. By using the website you accept them. They do not replace a signed service agreement — where the two differ, the signed agreement governs.",
            ],
          },
          {
            h: "The figures and case studies on this site",
            p: [
              "Buyer numbers, deal values, country counts and case studies are drawn from our own records of completed work. They describe what has happened, not what is promised.",
              "Actual results depend on your product, your pricing, your target market and the exhibition itself. Nothing on this website is a guarantee of a particular number of buyers, meetings or orders.",
            ],
          },
          {
            h: "Enquiries are not a contract",
            p: [
              "Sending the contact form, or receiving a reply or an indicative price from us, does not create a binding engagement. Services begin under a separate written scope agreed by both sides.",
            ],
          },
          {
            h: "Intellectual property",
            p: [
              "The text, layout, photography, logos and marks on this website belong to JU FAIR GLOBAL or are used with permission. You are welcome to read the site and share links to it. Republishing the content, or using our name or marks to present yourself as us or as our appointed agent, requires our written permission.",
              "Third-party names, including exhibition and trade fair names, remain the property of their owners and appear here only to describe work we have done.",
            ],
          },
          {
            h: "Links and embedded content",
            p: [
              "This website links to social platforms and embeds a third-party map. We do not control those services and are not responsible for their content or their terms.",
            ],
          },
          {
            h: "Availability",
            p: [
              "We aim to keep the website available and accurate, but we do not guarantee uninterrupted access, and content may be updated or corrected at any time without notice.",
            ],
          },
          {
            h: "Liability",
            p: [
              "To the extent the law allows, we are not liable for loss arising from reliance on website content alone, or from the website being unavailable. Liability for services we actually deliver is governed by the agreement covering those services.",
              "Nothing here limits liability that cannot be limited by law.",
            ],
          },
          {
            h: "Governing law",
            p: [
              "These terms are governed by the laws of the People's Republic of China, and disputes relating to this website fall to the competent courts of Shanghai.",
            ],
          },
          {
            h: "Changes to these terms",
            p: [
              "We may update these terms. The date at the top of this page shows when they last changed, and continuing to use the website after a change means you accept the updated version.",
            ],
          },
          {
            h: "If part of this is unenforceable",
            p: [
              "If any clause here turns out to be invalid or unenforceable, the rest stays in force. The invalid clause is treated as replaced by the nearest enforceable equivalent rather than voiding the whole document.",
            ],
          },
          {
            h: "Contact",
            p: ["Questions about these terms: info@jufairglobal.com."],
          },
        ],
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
      mainNav: "主导航",
      menuToggle: "切换菜单",
      languageSelector: "语言选择",
      skipToContent: "跳转到主要内容",
    },

    notFound: {
      title: "页面未找到",
      desc: "您访问的页面不存在或已被移动。",
      goHome: "返回首页",
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
          { value: "11", label: "覆盖国家" },
          { value: "7", label: "合作展会" },
        ],
      },
      services: {
        eyebrow: "我们的服务",
        title: "助力买家拓展全球市场",
        description:
          "从精准买家招募到定制化商务配对，每项服务都致力于推动可量化的国际贸易成果。",
        featured: {
          title: "国际买家招募",
          desc: "利用我们专有的匹配系统，在全球四大区域精准挖掘合格买家，确保正确的决策者出席您的展会。",
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
        stepLabel: "步骤",
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
      // 以可核实的成果替代客户评价，数字与「成功案例」页面完全一致。
      proof: {
        eyebrow: "实际成果",
        title: "这些工作带来了什么",
        description:
          "三个服务案例及其实际数据。完整内容见「成功案例」页面。",
        items: [
          {
            event: "2023 年广交会",
            stat: "850+",
            label: "邀约买家",
            desc: "通过精准开发与线上配对，从欧洲、南亚与中东邀约到 850 多位国际买家。",
          },
          {
            event: "上海国际纺织工业展",
            stat: "5",
            label: "促成订单",
            desc: "为纺织与服装类买家安排一对一洽谈，最终形成多年期供应合作，而非一次性订单。",
          },
          {
            event: "义乌国际小商品博览会",
            stat: "$1M+",
            label: "最大单笔订单",
            desc: "提供邀请函、签证、酒店与交通的全流程买家接待，确保已确认的买家真正到场并完成采购。",
          },
        ],
        cta: "查看完整案例",
      },
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
            year: "2022",
            t: "公司成立",
            d: "作为JU Global旗下的展览服务部门正式成立。",
          },
          {
            year: "2023",
            t: "首批活动",
            d: "成功举办3场商务配对活动，累计招募3,000多名买家。",
          },
          {
            year: "2024",
            t: "全球扩张",
            d: "网络拓展至欧洲、中东、南亚和北美地区。",
          },
          {
            year: "2025",
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
        captions: [
          "国家馆开馆仪式上的参展代表团",
          "国际买家与主办方在展馆内洽谈",
          "观众在科技展商展台体验 VR 设备",
          "观众围观展会上的创新展台",
        ],
        lightbox: {
          dialog: "展会图片库",
          previous: "上一张",
          next: "下一张",
          close: "关闭图片库",
        },
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
        { t: "11", d: "覆盖国家" },
        { t: "3,000+", d: "认证买家" },
        { t: "7", d: "合作展会" },
      ],
      activeRegions: "活跃区域",
      map: {
        liveCorridor: "全球贸易通道实时动态",
        allHubs: "全部枢纽",
        hq: "上海总部",
        globalHq: "全球总部",
        regionalHub: "区域枢纽",
        tradeCorridor: "贸易通道",
        hint: "拖动地球，或选择枢纽",
        selectHub: "查看枢纽详情",
      },
      hubs: {
        shanghai: { label: "JU FAIR 总部（上海）", region: "东亚", buyers: "1,200+ 全球合作伙伴" },
        frankfurt: { label: "欧洲枢纽（法兰克福）", region: "欧洲", buyers: "850+ 认证买家" },
        dubai: { label: "中东枢纽（迪拜）", region: "中东", buyers: "600+ 认证买家" },
        newyork: { label: "北美枢纽（纽约）", region: "北美洲", buyers: "750+ 认证买家" },
        saopaulo: { label: "南美枢纽（圣保罗）", region: "拉丁美洲", buyers: "400+ 认证买家" },
        nairobi: { label: "非洲枢纽（内罗毕）", region: "非洲", buyers: "350+ 认证买家" },
        sydney: { label: "亚太枢纽（悉尼）", region: "大洋洲", buyers: "500+ 认证买家" },
      },
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
        sending: "发送中……",
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
        phoneValue: "+86 131 6255 5370",
        emailSupport: "邮箱支持",
        emailValue: "info@jufairglobal.com",
        connectWith: "关注我们",
        mapTitle: "我们的办公地点地图",
      },
    },

    faqs: {
      hero: {
        eyebrow: "问题与解答",
        title: "常见问题",
        subtitle:
          "买家邀约如何界定范围、如何收费、如何交付报告——这里按我们电话沟通时的说法直接写清。",
      },
      groups: [
        {
          title: "买家邀约",
          items: [
            {
              q: "国际买家邀约具体包含哪些工作？",
              a: "买家数据库定向开发与精准营销、邮件营销、电话直邀、LinkedIn / Facebook / Instagram 社媒开发、搜索引擎付费广告，以及与各国行业协会和商会建立合作。我们会依据展会的产品定位逐一对接买家，而不是群发邮件。",
            },
            {
              q: "参展前你们如何筛选买家？",
              a: "每位买家在会前都会经过核实：公司真实经营的品类、联系人是否具备采购决策权、采购量级，以及是否确有来华意愿。只有通过核实的买家才会进入配对排期——这也是为什么一份较短的确认名单，价值高于一份很长但未经核实的名单。",
            },
            {
              q: "需要提前多久启动？",
              a: "展期一旦确定即可启动。邀约工作分阶段推进：资源筛选、买家核实、正式邀约，再到签证与行程，其中需要办理签证的市场所需周期最长。具体时间表按展会与目标区域单独评估。",
            },
            {
              q: "买家邀约如何收费？",
              a: "按展会单独报价，因为目标市场数量、需要的买家数量以及行程接待的深度都会改变工作范围。请告知展会名称、目标区域与买家数量目标，我们会提供书面的服务范围与价格。地区代表则采用佣金合作模式。",
            },
          ],
        },
        {
          title: "展会现场",
          items: [
            {
              q: "你们只负责把买家请来，还是也安排洽谈？",
              a: "洽谈由我们安排。商贸配对包含展商与已核实买家之间的一对一洽谈排期与现场协调，并提供现场口译与翻译支持，避免语言问题中断有潜力的谈判。",
            },
            {
              q: "是否协助买家办理签证、酒店与接送？",
              a: "提供。买家接待支持包含正式邀请函与签证协助、酒店预订与住宿安排，以及机场接送与当地交通协调。这一环节直接决定已确认的买家最终是否真的到场。",
            },
            {
              q: "覆盖哪些行业？",
              a: "消费品、纺织与服装、工业制造、医疗器械、建筑材料、橡胶与化工、数字贸易，以及智能科技。",
            },
          ],
        },
        {
          title: "结果与合作方式",
          items: [
            {
              q: "展会结束后我们会收到什么？",
              a: "会后跟进追踪与贸易报告：实际洽谈场次、买家反馈，以及正在推进的订单与合同。我们以订单成交和合同签署衡量工作成效，而不是以扫码量或人流量衡量。",
            },
            {
              q: "买家主要来自哪些区域？",
              a: "四大区域、11 个国家：欧洲（匈牙利、德国、波兰、捷克）、中东（沙特阿拉伯、阿联酋）、南亚（巴基斯坦、孟加拉国、印度）与北美（加拿大、美国），每个市场均由当地团队负责。",
            },
            {
              q: "你们能否在某个市场代理我们的展会？",
              a: "可以。展位销售与招展代理包含本地及国际展商招募、展位销售与赞助管理、展会推广与 B2B 商机开发，并代表主办方拓展战略合作。",
            },
            {
              q: "如何成为合作伙伴？",
              a: "共三种模式：地区代表采用佣金合作并享 VIP 展会通道；主办方可获得一站式全球推广、买家邀约与现场配对；展商则可直接对接经筛选的优质买家。请通过联系表单留言，我们会转交对应团队。",
            },
            {
              q: "你们能用中文和英文沟通吗？",
              a: "都可以。团队以中英双语工作，本网站同时提供英文与简体中文版本，现场口译也包含在配对服务中。",
            },
          ],
        },
      ],
      cta: {
        title: "还有其他问题？",
        desc: "欢迎直接联系我们的上海团队，所有咨询均在一个工作日内回复。",
        btn: "联系我们",
      },
    },

    exhibitions: {
      common: {
        eyebrow: "展会服务",
        resultTitle: "我们交付了什么",
        approachTitle: "具体做了哪些工作",
        reachTitle: "我们带来了谁",
        servicesLink: "查看四项核心服务",
        experienceLink: "更多成功案例",
        ctaTitle: "正在筹备这个展会？",
        ctaDesc:
          "请告知展会名称、目标市场与所需买家数量，我们会提供书面的服务范围与报价，并在一个工作日内回复。",
        ctaBtn: "联系我们的团队",
      },
      items: [
        {
          event: "广交会",
          title: "广交会国际买家邀约",
          subtitle:
            "为广交会展商邀约经筛选的国际买家，并把他们带到展位前——身份已核实、洽谈已排期、带着采购意向而来。",
          stat: "850+",
          statLabel: "邀约买家",
          summary:
            "在广交会的服务中，我们从欧洲、南亚与中东邀约到 850 多位国际买家。采用的是结合线上配对的精准定向开发，而非面向大众的观众推广。",
          approach: [
            "依据展商的真实产品线筛选买家，而不是套用通用的观众名单",
            "多渠道开发：数据库定向营销、邮件、电话直邀与社媒开发",
            "会前核实：公司真实经营的品类、联系人是否具备采购决策权、是否确有来华意愿",
            "展前线上配对，确保买家出行前洽谈已经确认",
          ],
          reach:
            "买家来自我们四大区域中的三个——欧洲、南亚与中东，由常驻当地市场的团队直接邀约，而非远程群发邮件。",
        },
        {
          event: "上海国际纺织工业展",
          title: "上海国际纺织工业展 B2B 商贸配对",
          subtitle:
            "为纺织与服装类买家与真正具备供货能力的展商，安排一对一精准洽谈。",
          stat: "5",
          statLabel: "促成订单",
          summary:
            "在上海国际纺织工业展，我们的工作重点是配对质量而非到场人数：为纺织与服装类买家安排的一对一洽谈促成了 5 笔贸易订单，其中数笔发展为多年期供应合作，而非一次性成交。",
          approach: [
            "依据纺织与服装类采购需求对买家进行专项资质核实",
            "为买卖双方安排一对一洽谈排期与现场协调",
            "提供现场口译与翻译，避免语言问题中断有潜力的谈判",
            "会后持续跟进，直至订单成交或明确终止",
          ],
          reach:
            "纺织与服装是我们买家网络覆盖的八大行业之一，与工业制造并列——这两个行业也贡献了我们迄今最大的成交金额。",
        },
        {
          event: "义乌国际小商品博览会",
          title: "义乌国际小商品博览会海外买家接待",
          subtitle:
            "邀请函、签证、酒店与交通——决定已确认的买家最终是否真的到场的关键环节。",
          stat: "$1M+",
          statLabel: "最大单笔订单",
          summary:
            "在中国义乌国际小商品博览会，我们提供全流程海外买家接待服务，该项目也促成了我们迄今金额最大的单笔订单，超过 100 万美元。",
          approach: [
            "为每位已确认买家出具正式邀请函并协助办理签证",
            "代为预订酒店并安排住宿",
            "协调机场接送与当地交通，覆盖抵达与离境全程",
            "跟踪到场情况，使临时取消能够被及时发现并补位，而不是当天才知道",
          ],
          reach:
            "这一环节直接决定到场率。一位办不下签证、或落地后无人接送的买家，实际上并不构成买家——这也是我们把接待支持作为独立服务而非附带环节的原因。",
        },
      ],
    },

    legal: {
      updated: "最后更新",
      updatedDate: "2026 年 9 月 18 日",
      privacy: {
        hero: {
          eyebrow: "法律条款",
          title: "隐私政策",
          subtitle: "本网站收集哪些信息、由谁处理，以及如何申请删除。",
        },
        sections: [
          {
            h: "我们是谁",
            p: [
              "JU FAIR GLOBAL 是 JU GLOBAL 旗下的展会服务部门，位于中国上海。如对本政策或我们持有的数据有任何疑问，请发送邮件至 info@jufairglobal.com。",
            ],
          },
          {
            h: "本网站收集哪些信息",
            p: [
              "仅收集您在联系表单中填写的内容：姓名、公司、国家或地区、邮箱、选填的电话号码、您感兴趣的服务，以及您的留言。",
              "本网站没有用户注册与登录功能，因此我们不会收集或存储除上述以外的其他个人信息。",
            ],
          },
          {
            h: "为什么收集这些信息",
            p: [
              "仅用于回复您的咨询，以及提供您所询问的服务。我们不会出售或出租您的信息，也不会把您加入您未主动订阅的营销名单。",
            ],
          },
          {
            h: "还有谁会处理这些信息",
            p: [
              "表单投递。联系表单通过 Web3Forms 投递至我们的邮箱，您提交的内容会经由其系统传输。",
              "地图。联系页面的办公地点地图由第三方地图服务（高德地图或 Google 地图）嵌入。加载该地图时，服务商会获取您的 IP 地址与浏览器信息，这与任何嵌入式地图相同。",
              "上述两家服务商仅在各自的有限用途内作为数据处理方。除此之外，我们不会将您的咨询内容提供给任何第三方。网站字体由本站自行托管，不会有字体服务商获取您的信息。",
            ],
          },
          {
            id: "cookies",
            h: "Cookie、统计与追踪",
            p: [
              "本网站不设置任何广告或追踪类 Cookie，也未接入任何流量统计服务。",
              "浏览器中保存的唯一一项数据，是用于记住您语言选择（英文或中文）的本地记录，以免您每次访问都需重新设置。您可随时通过浏览器的网站数据设置将其清除。",
            ],
          },
          {
            h: "保留多久",
            p: [
              "在处理您的咨询以及由此产生的业务往来所需的期间内保留；此后仅在财务或法律上必须留存记录的范围内继续保存。",
            ],
          },
          {
            h: "我们处理信息的法律依据",
            p: [
              "在适用 GDPR 的情形下，我们依据您的同意（通过提交联系表单作出）以及我们回应向本公司发出的商务咨询的正当利益进行处理。在适用《个人信息保护法》的情形下，我们依据您的同意，以及为应您的要求订立或者履行合同所必需进行处理。",
              "您可随时通过邮件撤回同意。撤回不影响撤回前基于同意已进行的处理，但通常意味着我们将无法继续推进您的咨询。",
            ],
          },
          {
            h: "您的权利",
            p: [
              "无论您位于何地，您都可以要求我们确认所持有的关于您的信息、向您提供副本、更正其中的错误，或将其删除。请发送邮件至 info@jufairglobal.com，并注明您提交表单时使用的邮箱地址，以便我们定位相应记录。我们将在 30 日内答复。",
              "若 GDPR 适用于您，您还有权限制我们的处理行为、对基于正当利益进行的处理提出反对、以可携带的格式获取您的数据，并向您所在国家的监管机构投诉。您无需先经过我们即可投诉。",
              "若《个人信息保护法》适用于您，您还有权要求我们对个人信息处理规则作出解释说明，并在技术可行的情况下要求将您的个人信息转移至其他处理者。",
              "上述请求均不收取费用，我们也不会要求您说明理由。",
            ],
          },
          {
            h: "自动化决策与画像",
            p: [
              "本网站不存在自动化决策与画像。我们不会对您进行评分、排序、分群或画像，也不会以自动化方式作出任何对您产生影响的决定。",
            ],
          },
          {
            h: "数据处理地点",
            p: [
              "我们的团队位于中国上海，您发送的咨询在该地处理。上述服务商可能在其他国家的服务器上处理相关数据。",
            ],
          },
          {
            h: "政策变更",
            p: [
              "本政策如有修订，我们会更新本页顶部的日期。涉及实质性变更的内容将在本页明确说明，而非悄然改动。",
            ],
          },
        ],
        analytics: {
          cloudflare: [
            "本网站使用 Cloudflare Web Analytics 统计页面访问量。它不设置任何 Cookie、不存储任何标识符，也无法用于跨网站或跨访问识别您的身份。",
            "本网站不设置任何广告或追踪类 Cookie。浏览器中保存的唯一一项数据，是用于记住您语言选择（英文或中文）的本地记录，以免您每次访问都需重新设置。您可随时通过浏览器的网站数据设置将其清除。",
          ],
          plausible: [
            "本网站使用 Plausible Analytics 统计页面访问量。它不设置任何 Cookie、不存储任何标识符，也无法用于跨网站或跨访问识别您的身份。",
            "本网站不设置任何广告或追踪类 Cookie。浏览器中保存的唯一一项数据，是用于记住您语言选择（英文或中文）的本地记录，以免您每次访问都需重新设置。您可随时通过浏览器的网站数据设置将其清除。",
          ],
        },
      },
      terms: {
        hero: {
          eyebrow: "法律条款",
          title: "服务条款",
          subtitle: "适用于本网站的使用，以及服务合作的签约方式。",
        },
        sections: [
          {
            h: "关于本条款",
            p: [
              "本条款适用于您对 www.jufairglobal.com 的使用。使用本网站即表示您接受本条款。本条款不替代双方签署的服务协议；如两者存在差异，以签署的协议为准。",
            ],
          },
          {
            h: "网站所载数据与案例",
            p: [
              "网站列示的买家数量、订单金额、覆盖国家数量与服务案例，均来自我们对已完成项目的记录。它们描述的是已经发生的事实，而非对未来结果的承诺。",
              "实际效果取决于您的产品、报价、目标市场以及展会本身。本网站的任何内容均不构成对特定买家数量、洽谈场次或订单成交的保证。",
            ],
          },
          {
            h: "咨询不构成合同",
            p: [
              "提交联系表单，或收到我们的回复与初步报价，均不构成具有约束力的合作关系。服务须在双方另行确认的书面服务范围下开展。",
            ],
          },
          {
            h: "知识产权",
            p: [
              "本网站的文字、版式、图片、标识与商标归 JU FAIR GLOBAL 所有，或经授权使用。欢迎您阅读本站并分享本站链接。若需转载网站内容，或使用我们的名称与标识对外表明自身为本公司或本公司授权代理，须事先取得我们的书面许可。",
              "展会名称等第三方名称仍归其各自所有者所有，本站引用仅用于说明我们已完成的工作。",
            ],
          },
          {
            h: "外部链接与嵌入内容",
            p: [
              "本网站包含社交平台链接并嵌入了第三方地图服务。我们无法控制这些服务，亦不对其内容或其自身条款负责。",
            ],
          },
          {
            h: "网站可用性",
            p: [
              "我们会尽力保持网站可正常访问且内容准确，但不保证服务不中断，网站内容也可能随时更新或更正而不另行通知。",
            ],
          },
          {
            h: "责任范围",
            p: [
              "在法律允许的范围内，对于仅依据网站内容作出决定所产生的损失，或因网站无法访问所产生的损失，我们不承担责任。我们实际提供的服务，其责任范围以相应的服务协议为准。",
              "本条款不限制依法不可限制的责任。",
            ],
          },
          {
            h: "适用法律",
            p: [
              "本条款适用中华人民共和国法律。与本网站相关的争议由上海有管辖权的法院管辖。",
            ],
          },
          {
            h: "条款变更",
            p: [
              "我们可能会更新本条款。本页顶部的日期表示最近一次修订时间；变更后继续使用本网站，即视为您接受更新后的版本。",
            ],
          },
          {
            h: "条款可分割性",
            p: [
              "若本条款中的任何条文被认定为无效或不可执行，其余条文继续有效。该条文将被视为由最接近的可执行条文替代，而非导致整份条款失效。",
            ],
          },
          {
            h: "联系方式",
            p: ["如对本条款有疑问，请联系 info@jufairglobal.com。"],
          },
        ],
      },
    },
  },
} as const;

export default translations;

export function t(lang: Lang) {
  return translations[lang];
}
