// In-memory mock database for Admin CMS
// Shared singleton across requests in development server

if (!globalThis._mockDb) {
  globalThis._mockDb = {
    sections: {
      "home-hero": {
        key: "home-hero",
        data: {
          badge: "New Admissions 2026-2027",
          title: "Navigate Your Global Education Pathway",
          subtitle: "Partnering with over 200 accredited global universities to help students find their true potential.",
          video: {
            id: "m-video-1",
            name: "campus-preview.mp4",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
          },
          slides: [
            {
              headline: "Top Tier Australian Universities",
              description: "Explore scholarship opportunities up to 50% for international students.",
            },
            {
              headline: "Fast-Track Visa Assistance",
              description: "Comprehensive visa processing with higher success rates and personalized guidance.",
            },
            {
              headline: "Career & Internship Support",
              description: "Connect with global alumni networks and top tech/business employers.",
            },
          ],
        },
        updatedAt: new Date().toISOString(),
      },
      "why-choose-us": {
        key: "why-choose-us",
        data: {
          tab1Title: "Experienced Counselors",
          tab1Content: "<p>Our counselors have over 10 years of experience in guiding students toward prestigious universities in Australia, the UK, Canada, and the USA.</p>",
          tab2Title: "Global Network",
          tab2Content: "<p>We partner directly with leading institutions, giving students access to fast-tracked application assessments and exclusive fee waivers.</p>",
          tab3Title: "Complete Support",
          tab3Content: "<p>From SOP writing and financial documentation to mock visa interviews and pre-departure briefings, we are with you at every step.</p>",
        },
        updatedAt: new Date().toISOString(),
      },
      settings: {
        key: "settings",
        data: {
          siteName: "Novaris Consultancy",
          siteUrl: "https://novaris.example.com",
          logo: {
            id: "m3",
            name: "novarislogo.png",
            url: "/novarislogo.png",
          },
          socials: {
            facebook: "https://facebook.com/novaris",
            twitter: "https://twitter.com/novaris",
            linkedin: "https://linkedin.com/company/novaris",
            instagram: "https://instagram.com/novaris",
          },
          scripts: {
            headScripts: "<!-- Google Analytics -->",
            bodyScripts: "<!-- Chat Widget Script -->",
          },
          seo: {
            metaTitle: "Novaris Global Education & Visa Consultancy",
            metaDescription: "Trusted abroad study consultancy offering end-to-end admission guidance.",
          },
        },
        updatedAt: new Date().toISOString(),
      },
    },
    collections: {
      blogs: [
        {
          id: "blog-1",
          title: "Guide to Studying in Australia: 2026 Edition",
          slug: "guide-to-studying-in-australia-2026",
          author: "Sarah Jenkins",
          publishDate: "2026-03-15",
          coverImage: {
            id: "m1",
            name: "hero-banner-main.jpg",
            url: "/novarislogo.png",
          },
          excerpt: "Everything you need to know about student visas, living costs, and universities in Australia.",
          content: "<p>Australia remains one of the premier destinations for international students due to its high living standards and world-class universities.</p>",
          isFeatured: true,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
        {
          id: "blog-2",
          title: "Top 5 Scholarships in the UK for STEM Majors",
          slug: "top-5-uk-scholarships-stem",
          author: "David Rahman",
          publishDate: "2026-04-01",
          coverImage: {
            id: "m2",
            name: "melbourne-campus.jpg",
            url: "/novarislogo.png",
          },
          excerpt: "Find funded scholarship opportunities across top UK Russell Group institutions.",
          content: "<p>Studying STEM fields in the UK can be affordable with scholarships like GREAT, Chevening, and Commonwealth awards.</p>",
          isFeatured: false,
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        },
      ],
      events: [
        {
          id: "event-1",
          title: "Global Education Expo 2026",
          date: "2026-06-20",
          location: "Novaris Grand Ballroom, Dhaka & Virtual",
          bannerImage: {
            id: "m4",
            name: "visa-consultation-photo.jpg",
            url: "/novarislogo.png",
          },
          description: "<p>Meet representatives from 40+ leading universities. On-spot assessments and scholarship interviews available.</p>",
          capacity: 500,
          registrationOpen: true,
          createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
        },
        {
          id: "event-2",
          title: "Canada Study & Work Visa Seminar",
          date: "2026-07-10",
          location: "Online Webinar",
          bannerImage: {
            id: "m3",
            name: "partner-university-badge.png",
            url: "/novarislogo.png",
          },
          description: "<p>Learn about SDS stream requirements, post-graduation work permits (PGWP), and permanent residency pathways.</p>",
          capacity: 250,
          registrationOpen: false,
          createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        },
      ],
    },
    galleryFolders: [
      { _id: "f-1", name: "Banners", createdAt: new Date().toISOString() },
      { _id: "f-2", name: "Events", createdAt: new Date().toISOString() },
    ],
    galleryFiles: [
      {
        _id: "m1",
        name: "hero-banner-main.jpg",
        filename: "hero-banner-main.jpg",
        originalName: "hero-banner-main.jpg",
        url: "/novarislogo.png",
        path: "/novarislogo.png",
        size: 1024 * 240,
        mimeType: "image/png",
        folderId: "f-1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m2",
        name: "melbourne-campus.jpg",
        filename: "melbourne-campus.jpg",
        originalName: "melbourne-campus.jpg",
        url: "/novarislogo.png",
        path: "/novarislogo.png",
        size: 1024 * 380,
        mimeType: "image/png",
        folderId: "f-1",
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m3",
        name: "partner-university-badge.png",
        filename: "partner-university-badge.png",
        originalName: "partner-university-badge.png",
        url: "/novarislogo.png",
        path: "/novarislogo.png",
        size: 1024 * 95,
        mimeType: "image/png",
        folderId: null,
        createdAt: new Date().toISOString(),
      },
      {
        _id: "m4",
        name: "visa-consultation-photo.jpg",
        filename: "visa-consultation-photo.jpg",
        originalName: "visa-consultation-photo.jpg",
        url: "/novarislogo.png",
        path: "/novarislogo.png",
        size: 1024 * 510,
        mimeType: "image/png",
        folderId: "f-2",
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

export const mockDb = globalThis._mockDb;
