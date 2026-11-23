/**
 * Admin Panel Configuration
 * This is the ONLY per-project configuration file.
 * The entire sidebar, forms, validation schemas, and lists are driven by this file.
 */

export const adminConfig = {
  brand: {
    name: "Novaris CMS",
    logo: "/novarislogo.png",
    siteUrl: "/",
  },

  singletons: [
    {
      key: "home-hero",
      label: "Home Hero",
      group: "Homepage",
      icon: "Sparkles",
      description: "Manage homepage hero banner, video preview, and feature slides.",
      fields: [
        {
          name: "badge",
          type: "text",
          label: "Hero Badge",
          placeholder: "e.g. Admissions Open 2026",
          colSpan: 1,
        },
        {
          name: "title",
          type: "text",
          label: "Headline Title",
          placeholder: "e.g. Navigate Your Global Education",
          required: true,
          colSpan: 1,
        },
        {
          name: "subtitle",
          type: "textarea",
          label: "Hero Subtitle",
          placeholder: "A brief welcoming subtitle for the hero section",
          colSpan: 2,
        },
        {
          name: "video",
          type: "video",
          label: "Background Video Asset",
          description: "Select or upload an MP4 video asset from the media gallery.",
          colSpan: 2,
        },
        {
          name: "slides",
          type: "repeater",
          label: "Hero Highlights Carousel",
          description: "Draggable highlight cards shown below the main headline.",
          itemTitleField: "headline",
          defaultItem: {
            headline: "New Highlight",
            description: "",
          },
          fields: [
            {
              name: "headline",
              type: "text",
              label: "Slide Headline",
              required: true,
              placeholder: "e.g. Top 100 Partner Universities",
            },
            {
              name: "description",
              type: "textarea",
              label: "Slide Description",
              placeholder: "Details about this highlight",
            },
          ],
        },
      ],
    },
    {
      key: "why-choose-us",
      label: "Why Choose Us",
      group: "Homepage",
      icon: "Award",
      description: "Configure key differentiator tabs and content pillars.",
      fields: [
        {
          name: "sectionTitle",
          type: "text",
          label: "Section Title",
          placeholder: "Why Students Choose Novaris",
          required: true,
          colSpan: 2,
        },
        {
          name: "tabsContent",
          type: "tabs",
          label: "Feature Tabs",
          tabs: [
            {
              id: "tab-counselors",
              label: "Counselors",
              fields: [
                {
                  name: "tab1Title",
                  type: "text",
                  label: "Tab 1 Heading",
                  placeholder: "Certified Global Counselors",
                  required: true,
                  colSpan: 2,
                },
                {
                  name: "tab1Content",
                  type: "richtext",
                  label: "Tab 1 Rich Content",
                  colSpan: 2,
                },
              ],
            },
            {
              id: "tab-network",
              label: "Global Network",
              fields: [
                {
                  name: "tab2Title",
                  type: "text",
                  label: "Tab 2 Heading",
                  placeholder: "200+ Direct University Partnerships",
                  required: true,
                  colSpan: 2,
                },
                {
                  name: "tab2Content",
                  type: "richtext",
                  label: "Tab 2 Rich Content",
                  colSpan: 2,
                },
              ],
            },
            {
              id: "tab-support",
              label: "Complete Support",
              fields: [
                {
                  name: "tab3Title",
                  type: "text",
                  label: "Tab 3 Heading",
                  placeholder: "End-to-End Visa & Travel Assistance",
                  required: true,
                  colSpan: 2,
                },
                {
                  name: "tab3Content",
                  type: "richtext",
                  label: "Tab 3 Rich Content",
                  colSpan: 2,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "settings",
      label: "Site Settings",
      group: "System",
      icon: "Settings",
      description: "Configure global site details, social links, and tracking scripts.",
      fields: [
        {
          name: "siteName",
          type: "text",
          label: "Website Name",
          placeholder: "Novaris Global Education",
          required: true,
          colSpan: 1,
        },
        {
          name: "siteUrl",
          type: "url",
          label: "Production URL",
          placeholder: "https://novaris.example.com",
          colSpan: 1,
        },
        {
          name: "logo",
          type: "image",
          label: "Brand Logo",
          description: "Upload brand logo from the media gallery.",
          colSpan: 2,
        },
        {
          name: "socials",
          type: "group",
          title: "Social Media Accounts",
          fields: [
            {
              name: "facebook",
              type: "url",
              label: "Facebook URL",
              placeholder: "https://facebook.com/your-page",
              colSpan: 1,
            },
            {
              name: "twitter",
              type: "url",
              label: "X / Twitter URL",
              placeholder: "https://x.com/your-handle",
              colSpan: 1,
            },
            {
              name: "linkedin",
              type: "url",
              label: "LinkedIn URL",
              placeholder: "https://linkedin.com/company/your-company",
              colSpan: 1,
            },
            {
              name: "instagram",
              type: "url",
              label: "Instagram URL",
              placeholder: "https://instagram.com/your-account",
              colSpan: 1,
            },
          ],
        },
        {
          name: "scripts",
          type: "group",
          title: "Custom Code & Tracking Scripts",
          fields: [
            {
              name: "headScripts",
              type: "textarea",
              label: "Header Scripts (<head>)",
              placeholder: "<!-- Google Tag Manager, analytics, etc. -->",
              colSpan: 2,
            },
            {
              name: "bodyScripts",
              type: "textarea",
              label: "Footer Scripts (before </body>)",
              placeholder: "<!-- Live chat widget, pixel snippets, etc. -->",
              colSpan: 2,
            },
          ],
        },
        {
          name: "seo",
          type: "group",
          title: "Default SEO Meta",
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: "Meta Title",
              placeholder: "Default page title",
              colSpan: 2,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Meta Description",
              placeholder: "Brief description for search engines",
              maxLength: 160,
              colSpan: 2,
            },
          ],
        },
      ],
    },
  ],

  collections: [
    {
      key: "blogs",
      label: "Blogs",
      group: "Content",
      icon: "FileText",
      description: "Manage articles, study guides, and scholarship announcements.",
      listColumns: [
        { key: "title", label: "Title" },
        { key: "author", label: "Author" },
        { key: "publishDate", label: "Published" },
        { key: "isFeatured", label: "Featured" },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          label: "Blog Title",
          placeholder: "e.g. Guide to Studying in Australia: 2026 Edition",
          required: true,
          colSpan: 2,
        },
        {
          name: "slug",
          type: "text",
          label: "URL Slug",
          placeholder: "guide-to-studying-in-australia-2026",
          required: true,
          colSpan: 1,
        },
        {
          name: "author",
          type: "text",
          label: "Author Name",
          placeholder: "e.g. Sarah Jenkins",
          required: true,
          colSpan: 1,
        },
        {
          name: "publishDate",
          type: "date",
          label: "Publish Date",
          required: true,
          colSpan: 1,
        },
        {
          name: "isFeatured",
          type: "toggle",
          label: "Feature on Homepage",
          description: "When enabled, this article will appear in featured carousels.",
          colSpan: 1,
        },
        {
          name: "coverImage",
          type: "image",
          label: "Cover Image",
          description: "Choose a blog banner from the media gallery.",
          colSpan: 2,
        },
        {
          name: "excerpt",
          type: "textarea",
          label: "Short Excerpt",
          placeholder: "Summary for cards and social previews",
          maxLength: 250,
          colSpan: 2,
        },
        {
          name: "content",
          type: "richtext",
          label: "Article Body",
          colSpan: 2,
        },
      ],
    },
    {
      key: "events",
      label: "Events",
      group: "Content",
      icon: "Calendar",
      description: "Manage upcoming webinars, expos, and university spot assessments.",
      listColumns: [
        { key: "title", label: "Event Name" },
        { key: "date", label: "Event Date" },
        { key: "location", label: "Location" },
        { key: "registrationOpen", label: "Registration" },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          label: "Event Name",
          placeholder: "e.g. Global Education Expo 2026",
          required: true,
          colSpan: 2,
        },
        {
          name: "date",
          type: "date",
          label: "Event Date",
          required: true,
          colSpan: 1,
        },
        {
          name: "location",
          type: "text",
          label: "Location / Venue",
          placeholder: "e.g. Grand Ballroom or Online Webinar",
          required: true,
          colSpan: 1,
        },
        {
          name: "capacity",
          type: "number",
          label: "Maximum Attendees",
          placeholder: "500",
          colSpan: 1,
        },
        {
          name: "registrationOpen",
          type: "toggle",
          label: "Accepting Registrations",
          description: "Allow visitors to submit registration forms for this event.",
          colSpan: 1,
        },
        {
          name: "bannerImage",
          type: "image",
          label: "Event Banner Image",
          colSpan: 2,
        },
        {
          name: "description",
          type: "richtext",
          label: "Event Details & Schedule",
          colSpan: 2,
        },
      ],
    },
  ],
};

export default adminConfig;
