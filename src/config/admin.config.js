/**
 * Admin Panel Configuration
 * This is the ONLY per-project configuration file.
 * The entire nav tree, sidebar, forms, validation schemas, and lists are driven by this file.
 */

const createSectionHeader = (groupTitle = "Section Header") => ({
  name: "sectionHeader",
  type: "group",
  title: groupTitle,
  fields: [
    {
      name: "title",
      type: "text",
      label: "Heading Title",
      placeholder: "e.g. Empowering Global Education",
      required: true,
      colSpan: 1,
    },
    {
      name: "highlightText",
      type: "text",
      label: "Highlight Text (Accent Word)",
      placeholder: "e.g. Global Education",
      colSpan: 1,
    },
    {
      name: "description",
      type: "textarea",
      label: "Section Description",
      placeholder: "Brief contextual summary for this section",
      colSpan: 2,
    },
  ],
});

export const adminConfig = {
  brand: {
    name: "Creative Education",
    subLabel: "ADMIN PANEL",
    logo: "/novarislogo.png",
    siteUrl: "/",
  },

  nav: [
    {
      label: "Home Page",
      icon: "Home",
      children: [
        { label: "Home Banner", key: "home-hero", type: "singleton" },
        { label: "Why Choose Us", key: "why-choose-us", type: "singleton" },
        { label: "Step-by-Step Path", key: "step-by-step", type: "singleton" },
        { label: "Global Partners", key: "global-partners", type: "singleton" },
        { label: "Certificates", key: "certificates", type: "singleton" },
      ],
    },
    {
      label: "About Page",
      icon: "Info",
      children: [
        { label: "About Hero", key: "about-hero", type: "singleton" },
        { label: "CEO Message", key: "ceo-message", type: "singleton" },
      ],
    },
    {
      label: "Services Page",
      icon: "Briefcase",
      children: [
        { label: "Services Hero", key: "services-hero", type: "singleton" },
        { label: "Core Services", key: "core-services", type: "singleton" },
        { label: "Pre & Post Visa", key: "pre-post-visa", type: "singleton" },
        { label: "Our Commitment", key: "our-commitment", type: "singleton" },
      ],
    },
    {
      label: "Countries",
      icon: "Globe",
      key: "countries",
      type: "collection",
    },
    {
      label: "Testimonials",
      icon: "MessageSquareQuote",
      children: [
        { label: "Page Header", key: "testimonials-header", type: "singleton" },
        { label: "Student Testimonials", key: "testimonials-items", type: "collection" },
      ],
    },
    {
      label: "Events",
      icon: "Calendar",
      key: "events",
      type: "collection",
    },
    {
      label: "Blogs",
      icon: "FileText",
      key: "blogs",
      type: "collection",
    },
    {
      label: "FAQ",
      icon: "HelpCircle",
      key: "faq",
      type: "collection",
    },
    {
      label: "Featured Videos",
      icon: "Video",
      key: "featured-videos",
      type: "collection",
    },
    {
      label: "Contact Us",
      icon: "Mail",
      key: "contact-us",
      type: "singleton",
    },
    {
      label: "Media Gallery",
      icon: "Images",
      key: "gallery",
      type: "gallery",
    },
    {
      label: "Legal Pages",
      icon: "ShieldAlert",
      children: [
        { label: "Privacy Policy", key: "privacy-policy", type: "singleton" },
        { label: "Terms & Conditions", key: "terms", type: "singleton" },
      ],
    },
    {
      label: "Settings",
      icon: "Settings",
      key: "settings",
      type: "singleton",
    },
  ],

  singletons: [
    {
      key: "home-hero",
      label: "Home Banner",
      fields: [
        {
          name: "video",
          type: "video",
          label: "Hero Video Asset",
          description: "Select MP4 background video from the gallery.",
          colSpan: 2,
        },
        {
          name: "slides",
          type: "repeater",
          label: "Banner Slides Carousel",
          description: "Slides displayed across the homepage hero banner.",
          required: true,
          itemTitleField: "headline",
          defaultItem: {
            headline: "Study at Top Ranked Global Universities",
            description: "Personalized admission and visa guidance tailored to your goals.",
          },
          fields: [
            {
              name: "headline",
              type: "text",
              label: "Slide Headline",
              required: true,
              colSpan: 2,
            },
            {
              name: "description",
              type: "textarea",
              label: "Slide Description",
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      key: "why-choose-us",
      label: "Why Choose Us",
      fields: [
        {
          name: "tabs",
          type: "tabs",
          label: "Why Choose Us Tabs",
          tabs: [
            {
              id: "trust-features",
              label: "1) Trust Features",
              fields: [
                createSectionHeader("Trust Features Header"),
                {
                  name: "cards",
                  type: "repeater",
                  label: "Feature Cards",
                  itemTitleField: "title",
                  defaultItem: { title: "Feature Title", description: "" },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Card Title",
                      required: true,
                      colSpan: 2,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Description",
                      colSpan: 2,
                    },
                  ],
                },
              ],
            },
            {
              id: "education-stats",
              label: "2) Global Education Stats",
              fields: [
                {
                  name: "stats",
                  type: "repeater",
                  label: "Key Stats & Metrics",
                  itemTitleField: "label",
                  defaultItem: { icon: "GraduationCap", value: "98%", label: "Visa Success" },
                  fields: [
                    {
                      name: "icon",
                      type: "select",
                      label: "Lucide Icon",
                      options: [
                        { value: "GraduationCap", label: "Graduation Cap" },
                        { value: "Globe", label: "Globe" },
                        { value: "Award", label: "Award" },
                        { value: "Building2", label: "University Building" },
                        { value: "Users", label: "Users / Students" },
                        { value: "CheckCircle", label: "Check Circle" },
                        { value: "Star", label: "Star" },
                        { value: "BookOpen", label: "Book Open" },
                      ],
                      colSpan: 1,
                    },
                    {
                      name: "value",
                      type: "text",
                      label: "Metric Value",
                      placeholder: "e.g. 200+ or 98%",
                      required: true,
                      colSpan: 1,
                    },
                    {
                      name: "label",
                      type: "text",
                      label: "Metric Label",
                      placeholder: "e.g. Partner Universities",
                      required: true,
                      colSpan: 2,
                    },
                  ],
                },
              ],
            },
            {
              id: "comparison-table",
              label: "3) Comparison Table",
              fields: [
                {
                  name: "usColumnTitle",
                  type: "text",
                  label: "Our Column Title",
                  default: "Creative Education",
                  colSpan: 1,
                },
                {
                  name: "othersColumnTitle",
                  type: "text",
                  label: "Competitor Column Title",
                  default: "Other Agencies",
                  colSpan: 1,
                },
                {
                  name: "rows",
                  type: "repeater",
                  label: "Comparison Features",
                  itemTitleField: "feature",
                  defaultItem: { feature: "Direct University Representation", us: true, others: false },
                  fields: [
                    {
                      name: "feature",
                      type: "text",
                      label: "Feature Name",
                      required: true,
                      colSpan: 2,
                    },
                    {
                      name: "us",
                      type: "toggle",
                      label: "Offered by Us",
                      colSpan: 1,
                    },
                    {
                      name: "others",
                      type: "toggle",
                      label: "Offered by Others",
                      colSpan: 1,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "step-by-step",
      label: "Step-by-Step Path",
      fields: [
        createSectionHeader(),
        {
          name: "steps",
          type: "repeater",
          label: "Roadmap Steps",
          itemTitleField: "title",
          defaultItem: { title: "Step Title", description: "" },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Step Title",
              required: true,
              colSpan: 1,
            },
            {
              name: "image",
              type: "image",
              label: "Step Illustration / Icon",
              colSpan: 1,
            },
            {
              name: "description",
              type: "textarea",
              label: "Step Details",
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      key: "global-partners",
      label: "Global Partners",
      fields: [
        createSectionHeader(),
        {
          name: "partners",
          type: "repeater",
          label: "Partner Institutions",
          itemTitleField: "name",
          defaultItem: { name: "Partner University", url: "" },
          fields: [
            {
              name: "name",
              type: "text",
              label: "Partner Name",
              required: true,
              colSpan: 1,
            },
            {
              name: "url",
              type: "url",
              label: "Website URL",
              placeholder: "https://...",
              colSpan: 1,
            },
            {
              name: "logo",
              type: "image",
              label: "Partner Logo",
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      key: "certificates",
      label: "Certificates",
      fields: [
        createSectionHeader(),
        {
          name: "certificates",
          type: "repeater",
          label: "Certifications & Accreditations",
          itemTitleField: "title",
          defaultItem: { title: "Accreditation" },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Certificate Title",
              required: true,
              colSpan: 1,
            },
            {
              name: "image",
              type: "image",
              label: "Certificate Image / Seal",
              colSpan: 1,
            },
          ],
        },
      ],
    },
    {
      key: "about-hero",
      label: "About Hero",
      fields: [
        createSectionHeader(),
        {
          name: "image",
          type: "image",
          label: "About Hero Image",
          colSpan: 2,
        },
        {
          name: "body",
          type: "richtext",
          label: "About Narrative Body",
          colSpan: 2,
        },
      ],
    },
    {
      key: "ceo-message",
      label: "CEO Message",
      fields: [
        {
          name: "name",
          type: "text",
          label: "CEO Name",
          placeholder: "e.g. Dr. Arthur Vance",
          required: true,
          colSpan: 1,
        },
        {
          name: "designation",
          type: "text",
          label: "Designation",
          placeholder: "e.g. Founder & Chief Executive Officer",
          required: true,
          colSpan: 1,
        },
        {
          name: "photo",
          type: "image",
          label: "CEO Portrait Photo",
          colSpan: 1,
        },
        {
          name: "signature",
          type: "image",
          label: "Signature Graphic",
          colSpan: 1,
        },
        {
          name: "message",
          type: "richtext",
          label: "CEO Message Statement",
          colSpan: 2,
        },
      ],
    },
    {
      key: "services-hero",
      label: "Services Hero",
      fields: [
        createSectionHeader(),
        {
          name: "image",
          type: "image",
          label: "Services Banner Graphic",
          colSpan: 2,
        },
      ],
    },
    {
      key: "core-services",
      label: "Core Services",
      fields: [
        createSectionHeader(),
        {
          name: "services",
          type: "repeater",
          label: "Service Offerings",
          itemTitleField: "title",
          defaultItem: { title: "University Admissions", link: "/services/admissions", description: "" },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Service Name",
              required: true,
              colSpan: 1,
            },
            {
              name: "link",
              type: "text",
              label: "Link / Target URL",
              placeholder: "/services/example",
              colSpan: 1,
            },
            {
              name: "description",
              type: "textarea",
              label: "Service Summary",
              colSpan: 2,
            },
            {
              name: "image",
              type: "image",
              label: "Service Image / Icon",
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      key: "pre-post-visa",
      label: "Pre & Post Visa",
      fields: [
        createSectionHeader(),
        {
          name: "visaTabs",
          type: "tabs",
          label: "Visa Support Stages",
          tabs: [
            {
              id: "pre-visa",
              label: "Pre Visa Support",
              fields: [
                {
                  name: "preVisaSteps",
                  type: "repeater",
                  label: "Pre-Visa Assistance Items",
                  itemTitleField: "title",
                  defaultItem: { title: "Document Checklist Preparation", description: "" },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Item Title",
                      required: true,
                      colSpan: 2,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Description",
                      colSpan: 2,
                    },
                  ],
                },
              ],
            },
            {
              id: "post-visa",
              label: "Post Visa Support",
              fields: [
                {
                  name: "postVisaSteps",
                  type: "repeater",
                  label: "Post-Visa Assistance Items",
                  itemTitleField: "title",
                  defaultItem: { title: "Accommodation & Airport Pick-Up", description: "" },
                  fields: [
                    {
                      name: "title",
                      type: "text",
                      label: "Item Title",
                      required: true,
                      colSpan: 2,
                    },
                    {
                      name: "description",
                      type: "textarea",
                      label: "Description",
                      colSpan: 2,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "our-commitment",
      label: "Our Commitment",
      fields: [
        createSectionHeader(),
        {
          name: "points",
          type: "repeater",
          label: "Commitment Points",
          itemTitleField: "title",
          defaultItem: { title: "100% Genuine Guidance", description: "" },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Point Title",
              required: true,
              colSpan: 2,
            },
            {
              name: "description",
              type: "textarea",
              label: "Detailed Commitment",
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      key: "testimonials-header",
      label: "Testimonials Header",
      fields: [createSectionHeader("Testimonials Page Header")],
    },
    {
      key: "contact-us",
      label: "Contact Us",
      fields: [
        createSectionHeader("Contact Page Header"),
        {
          name: "address",
          type: "textarea",
          label: "Office Address",
          placeholder: "Level 4, House 12, Road 4, Banani, Dhaka-1213",
          colSpan: 2,
        },
        {
          name: "phones",
          type: "repeater",
          label: "Telephone & Mobile Contacts",
          itemTitleField: "phone",
          defaultItem: { phone: "+880 1700-000000", label: "Helpline" },
          fields: [
            {
              name: "phone",
              type: "text",
              label: "Phone Number",
              required: true,
              colSpan: 1,
            },
            {
              name: "label",
              type: "text",
              label: "Label",
              placeholder: "e.g. Hotline, Front Desk",
              colSpan: 1,
            },
          ],
        },
        {
          name: "emails",
          type: "repeater",
          label: "Email Contacts",
          itemTitleField: "email",
          defaultItem: { email: "info@creativeeducation.com", label: "Admissions" },
          fields: [
            {
              name: "email",
              type: "email",
              label: "Email Address",
              required: true,
              colSpan: 1,
            },
            {
              name: "label",
              type: "text",
              label: "Department",
              placeholder: "e.g. Visa Team, Info",
              colSpan: 1,
            },
          ],
        },
        {
          name: "whatsapp",
          type: "text",
          label: "WhatsApp Number",
          placeholder: "+8801700000000",
          colSpan: 1,
        },
        {
          name: "officeHours",
          type: "text",
          label: "Business Hours",
          placeholder: "Sun - Thu: 9:30 AM - 6:30 PM",
          colSpan: 1,
        },
        {
          name: "mapEmbedUrl",
          type: "textarea",
          label: "Google Maps Embed Source / iframe URL",
          placeholder: "https://www.google.com/maps/embed?...",
          colSpan: 2,
        },
      ],
    },
    {
      key: "privacy-policy",
      label: "Privacy Policy",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Policy Title",
          required: true,
          default: "Privacy Policy",
          colSpan: 1,
        },
        {
          name: "lastUpdated",
          type: "date",
          label: "Last Updated Date",
          required: true,
          colSpan: 1,
        },
        {
          name: "body",
          type: "richtext",
          label: "Policy Body Text",
          colSpan: 2,
        },
      ],
    },
    {
      key: "terms",
      label: "Terms & Conditions",
      fields: [
        {
          name: "title",
          type: "text",
          label: "Document Title",
          required: true,
          default: "Terms & Conditions",
          colSpan: 1,
        },
        {
          name: "lastUpdated",
          type: "date",
          label: "Last Updated Date",
          required: true,
          colSpan: 1,
        },
        {
          name: "body",
          type: "richtext",
          label: "Terms Body Text",
          colSpan: 2,
        },
      ],
    },
    {
      key: "settings",
      label: "Global Settings",
      fields: [
        {
          name: "siteName",
          type: "text",
          label: "Website Name",
          required: true,
          default: "Creative Education",
          colSpan: 1,
        },
        {
          name: "logo",
          type: "image",
          label: "Primary Logo",
          colSpan: 1,
        },
        {
          name: "favicon",
          type: "image",
          label: "Browser Favicon",
          colSpan: 1,
        },
        {
          name: "seo",
          type: "group",
          title: "Global SEO Meta",
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: "Default Meta Title",
              colSpan: 2,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "Default Meta Description",
              colSpan: 2,
            },
            {
              name: "ogImage",
              type: "image",
              label: "Social Share Card (og:image)",
              colSpan: 2,
            },
          ],
        },
        {
          name: "settingsTabs",
          type: "tabs",
          label: "Socials & Scripts",
          tabs: [
            {
              id: "socials-tab",
              label: "Social Media Accounts",
              fields: [
                {
                  name: "facebook",
                  type: "url",
                  label: "Facebook URL",
                  placeholder: "https://facebook.com/...",
                  colSpan: 1,
                },
                {
                  name: "whatsapp",
                  type: "url",
                  label: "WhatsApp URL",
                  placeholder: "https://wa.me/...",
                  colSpan: 1,
                },
                {
                  name: "instagram",
                  type: "url",
                  label: "Instagram URL",
                  placeholder: "https://instagram.com/...",
                  colSpan: 1,
                },
                {
                  name: "linkedin",
                  type: "url",
                  label: "LinkedIn URL",
                  placeholder: "https://linkedin.com/company/...",
                  colSpan: 1,
                },
                {
                  name: "youtube",
                  type: "url",
                  label: "YouTube Channel URL",
                  placeholder: "https://youtube.com/...",
                  colSpan: 1,
                },
                {
                  name: "twitter",
                  type: "url",
                  label: "X / Twitter URL",
                  placeholder: "https://x.com/...",
                  colSpan: 1,
                },
              ],
            },
            {
              id: "scripts-tab",
              label: "Custom Code & Scripts",
              fields: [
                {
                  name: "headScripts",
                  type: "textarea",
                  label: "Header Scripts (<head>)",
                  placeholder: "<!-- Google Analytics, Meta Pixel, etc. -->",
                  colSpan: 2,
                },
                {
                  name: "bodyScripts",
                  type: "textarea",
                  label: "Body Scripts (before </body>)",
                  placeholder: "<!-- Live chat, marketing tags, etc. -->",
                  colSpan: 2,
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  collections: [
    {
      key: "countries",
      label: "Countries",
      listColumns: [
        { key: "name", label: "Country Name" },
        { key: "flag", label: "Flag" },
        { key: "status", label: "Status" },
      ],
      fields: [
        {
          name: "name",
          type: "text",
          label: "Country Name",
          required: true,
          colSpan: 1,
        },
        {
          name: "slug",
          type: "text",
          label: "URL Slug",
          required: true,
          placeholder: "e.g. australia",
          colSpan: 1,
        },
        {
          name: "status",
          type: "select",
          label: "Publication Status",
          default: "published",
          options: [
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ],
          colSpan: 1,
        },
        {
          name: "flag",
          type: "image",
          label: "Country Flag",
          colSpan: 1,
        },
        {
          name: "banner",
          type: "image",
          label: "Country Banner Image",
          colSpan: 2,
        },
        {
          name: "description",
          type: "richtext",
          label: "Country Overview & Study Opportunities",
          colSpan: 2,
        },
        {
          name: "highlights",
          type: "repeater",
          label: "Key Highlights / Requirements",
          itemTitleField: "title",
          defaultItem: { title: "Post-Study Work Rights", description: "" },
          fields: [
            {
              name: "title",
              type: "text",
              label: "Highlight Title",
              required: true,
              colSpan: 2,
            },
            {
              name: "description",
              type: "textarea",
              label: "Description",
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      key: "testimonials-items",
      label: "Student Testimonials",
      listColumns: [
        { key: "name", label: "Student Name" },
        { key: "country", label: "Country" },
        { key: "rating", label: "Rating" },
      ],
      fields: [
        {
          name: "name",
          type: "text",
          label: "Student Name",
          required: true,
          colSpan: 1,
        },
        {
          name: "country",
          type: "text",
          label: "Destination Country",
          placeholder: "e.g. Australia",
          required: true,
          colSpan: 1,
        },
        {
          name: "university",
          type: "text",
          label: "Enrolled University",
          placeholder: "e.g. University of Melbourne",
          colSpan: 1,
        },
        {
          name: "rating",
          type: "number",
          label: "Rating (1 to 5)",
          placeholder: "5",
          required: true,
          colSpan: 1,
        },
        {
          name: "photo",
          type: "image",
          label: "Student Photo",
          colSpan: 1,
        },
        {
          name: "videoUrl",
          type: "url",
          label: "Video Testimonial URL",
          placeholder: "https://youtube.com/watch?v=...",
          colSpan: 1,
        },
        {
          name: "message",
          type: "textarea",
          label: "Student Review Message",
          required: true,
          colSpan: 2,
        },
      ],
    },
    {
      key: "events",
      label: "Events",
      listColumns: [
        { key: "title", label: "Event Title" },
        { key: "date", label: "Event Date" },
        { key: "location", label: "Location" },
        { key: "status", label: "Status" },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          label: "Event Title",
          required: true,
          colSpan: 1,
        },
        {
          name: "slug",
          type: "text",
          label: "URL Slug",
          required: true,
          placeholder: "global-education-expo-2026",
          colSpan: 1,
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
          label: "Venue / Platform",
          required: true,
          placeholder: "Grand Ballroom or Zoom Webinar",
          colSpan: 1,
        },
        {
          name: "registrationUrl",
          type: "url",
          label: "Registration Link",
          placeholder: "https://...",
          colSpan: 1,
        },
        {
          name: "status",
          type: "select",
          label: "Status",
          default: "published",
          options: [
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ],
          colSpan: 1,
        },
        {
          name: "banner",
          type: "image",
          label: "Event Banner Image",
          colSpan: 2,
        },
        {
          name: "description",
          type: "richtext",
          label: "Event Details & Itinerary",
          colSpan: 2,
        },
      ],
    },
    {
      key: "blogs",
      label: "Blogs",
      listColumns: [
        { key: "title", label: "Title" },
        { key: "category", label: "Category" },
        { key: "publishedAt", label: "Published Date" },
        { key: "status", label: "Status" },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          label: "Article Title",
          required: true,
          colSpan: 1,
        },
        {
          name: "slug",
          type: "text",
          label: "URL Slug",
          required: true,
          placeholder: "complete-uk-student-visa-guide",
          colSpan: 1,
        },
        {
          name: "category",
          type: "text",
          label: "Category",
          placeholder: "Visa Guidance",
          required: true,
          colSpan: 1,
        },
        {
          name: "publishedAt",
          type: "date",
          label: "Published Date",
          required: true,
          colSpan: 1,
        },
        {
          name: "status",
          type: "select",
          label: "Status",
          default: "published",
          options: [
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ],
          colSpan: 1,
        },
        {
          name: "cover",
          type: "image",
          label: "Cover Image",
          colSpan: 1,
        },
        {
          name: "excerpt",
          type: "textarea",
          label: "Summary Excerpt",
          maxLength: 250,
          colSpan: 2,
        },
        {
          name: "content",
          type: "richtext",
          label: "Full Article Content",
          colSpan: 2,
        },
        {
          name: "seo",
          type: "group",
          title: "SEO Metadata",
          fields: [
            {
              name: "metaTitle",
              type: "text",
              label: "SEO Title",
              colSpan: 2,
            },
            {
              name: "metaDescription",
              type: "textarea",
              label: "SEO Description",
              colSpan: 2,
            },
          ],
        },
      ],
    },
    {
      key: "faq",
      label: "FAQ",
      listColumns: [
        { key: "question", label: "Question" },
        { key: "category", label: "Category" },
      ],
      fields: [
        {
          name: "question",
          type: "text",
          label: "Question",
          required: true,
          colSpan: 2,
        },
        {
          name: "category",
          type: "text",
          label: "Category",
          placeholder: "e.g. Visa Process, Scholarships",
          required: true,
          colSpan: 1,
        },
        {
          name: "order",
          type: "number",
          label: "Display Order",
          placeholder: "1",
          colSpan: 1,
        },
        {
          name: "answer",
          type: "richtext",
          label: "Answer",
          colSpan: 2,
        },
      ],
    },
    {
      key: "featured-videos",
      label: "Featured Videos",
      listColumns: [
        { key: "title", label: "Video Title" },
        { key: "url", label: "Video URL" },
      ],
      fields: [
        {
          name: "title",
          type: "text",
          label: "Video Title",
          required: true,
          colSpan: 1,
        },
        {
          name: "order",
          type: "number",
          label: "Display Order",
          placeholder: "1",
          colSpan: 1,
        },
        {
          name: "url",
          type: "url",
          label: "Video Link (YouTube / Vimeo / MP4)",
          required: true,
          placeholder: "https://youtube.com/watch?v=...",
          colSpan: 2,
        },
        {
          name: "thumbnail",
          type: "image",
          label: "Thumbnail Image",
          colSpan: 2,
        },
      ],
    },
  ],
};

export default adminConfig;
