import { nanoid } from "@reduxjs/toolkit";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { BsPhoneFill } from "react-icons/bs";
const FORM_SECTIONS = {
  INTRO: "intro",
  OBJECTIVE: "objective",
  SKILLS: "skills",
  PROJECT: "projects",
  EDUCATION: "education",
  EXPERIENCE: "experience",
  CERTIFICATIONS: "certifications",
  INTERNSHIP: "internship"
}

// Projects state structur
const project = [
  {
    displayQuestion: "Project Name",
    id: nanoid(),
    type: "text",
    answer: "",
    isFilled: false,
  },
  {
    displayQuestion: "Project Description",
    id: nanoid(),
    type: "textarea",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
  {
    displayQuestion: "Tech Stack",
    id: nanoid(),
    type: "text",
    answer: ""
  },
  { displayQuestion: "Live Link", id: nanoid(), type: "url", answer: "" }

];


const experience = [
  {
    displayQuestion: "Company Name",
    id: nanoid(),
    type: "text",
    answer: "",
    isFilled: false,
  },
  {
    displayQuestion: "Role / Position",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Start Date",
    id: nanoid(),
    type: "date",
    answer: "",
  },
  { displayQuestion: "End Date", id: nanoid(), type: "date", answer: "" },
  {
    displayQuestion: "description",
    id: nanoid(),
    type: "textarea",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
];

const intro = [
  {
    displayQuestion: "First Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Last Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  { displayQuestion: "Git Link", id: nanoid(), type: "url", answer: "", icon: "gitHub" },
  {
    displayQuestion: "LinkedIn Link",
    id: nanoid(),
    type: "url",
    answer: "",
    icon: "linkedIn",
  },
  { displayQuestion: "email", id: nanoid(), type: "email", answer: "", icon: "email" },
  {
    displayQuestion: "Phone Number",
    id: "mobile",
    type: "number",
    answer: "",
    icon: "phone"
  },
]

const objective = [
  {
    displayQuestion: "Objecive",
    id: nanoid(),
    type: "textarea",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  },
];

// using isMultiselect
const skills = {
  languages: [
    {
      displayQuestion: "Languages",
      id: "languages",
      type: "text",
      answer: "",
      isMultiSelect: true,
    },
  ],

  frameworks: [
    {
      displayQuestion: "Frameworks",
      id: "frameworks",
      type: "text",
      answer: "",
      isMultiSelect: true,
    },
  ],

  database: [
    {
      displayQuestion: "Databases",
      id: "database",
      type: "text",
      answer: "",
      isMultiSelect: true,
      canSkip: true,
    },
  ],

  others: [
    {
      displayQuestion: "Other tools",
      id: "others",
      type: "text",
      answer: "",
      isMultiSelect: true,
      canSkip: true,
    },
  ],
};

const education = {
  school: [
    {
      displayQuestion: "10th CGPA/Percentage",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "School Name",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Type Of Board",
      id: nanoid(),
      type: "text",
      answer: ""
    },
    {
      displayQuestion: "Start Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
    {
      displayQuestion: "End Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
  ],

  higherSchool: [
    {
      displayQuestion: "12th CGPA/Percentage",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Education Type",
      id: nanoid(),
      element: "select", //  makes it dropdown
      type: "text",
      answer: "12th", // default selected value
      options: [
        { value: "12th", label: "12th" },
        { value: "diploma", label: "Diploma" },
        { value: "intermediate", label: "Intermediate" },
      ],
    },
    {
      displayQuestion: "Junior College Name",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Type Of Stream",
      id: nanoid(),
      type: "text",
      answer: ""
    },
    {
      displayQuestion: "Start Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
    {
      displayQuestion: "End Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
  ],

  Degree: [
    {
      displayQuestion: "Degree CGPA/Percentage",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "College Name",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    //   If key element is present then display the given element or else input or text editory
    {
      displayQuestion: "Degree Type",
      id: nanoid(),
      element: "select",
      type: "text",
      answer: "",
      options: [
        { value: "iti", label: "ITI" },
        { value: "ug", label: "Undergraduate (UG)" },
        { value: "ba", label: "B.A" },
        { value: "bsc", label: "B.Sc" },
        { value: "bcom", label: "B.Com" },
        { value: "bba", label: "BBA" },
        { value: "bca", label: "BCA" },
        { value: "btech", label: "B.Tech / B.E" },
        { value: "llb", label: "LLB" },
        { value: "mbbs", label: "MBBS" },
      ],
    },
    {
      displayQuestion: "Branch",
      id: nanoid(),
      type: "text",
      answer: "",
    },
    {
      displayQuestion: "Start Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
    {
      displayQuestion: "End Date",
      id: nanoid(),
      type: "date",
      answer: "",
    },
  ],
}

const certifications = [
  {
    displayQuestion: "Certification Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Verify Link",
    id: nanoid(),
    type: "url",
    answer: "",
  },

  {
    displayQuestion: "Description",
    id: nanoid(),
    type: "text",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
    isLastForm: true,

  },
]

const intership = [
  {
    displayQuestion: "Certification Name",
    id: nanoid(),
    type: "text",
    answer: "",
  },
  {
    displayQuestion: "Start Date",
    id: nanoid(),
    type: "date",
    answer: "",
  },
  {
    displayQuestion: "End Date",
    id: nanoid(),
    type: "date",
    answer: "",
  },
  {
    displayQuestion: "Description",
    id: nanoid(),
    type: "text",
    answer: "",
    isEditorEnabled: true,
    aiEnabled: true,
  }
]


const SKIPPABLE_FORMS = { CERTIFICATIONS: FORM_SECTIONS.CERTIFICATIONS, INTERNSHIP: FORM_SECTIONS.INTERNSHIP }


const initialState = {
  intro,

  objective,

  skills,

  projects: {
    project1: [...project],
    project2: [...project],
    project3: [...project],
  },

  education,

  certifications,

  // Lets add internship for one more template
  // intership,

  renderingQuestions: intro,
  currentForm: FORM_SECTIONS.INTRO
}


// Templates
const TEMPLATES_ID = {
  TEMPLATE_1: "template_1",
  TEMPLATE_2: "template_2"

}

const templates = [
  {
    id: TEMPLATES_ID.TEMPLATE_1,
    src: "https://njvawavweamzvvakmsgn.supabase.co/storage/v1/object/public/accioresume/resume.png",
  },
  { id: TEMPLATES_ID.TEMPLATE_2, src: "https://njvawavweamzvvakmsgn.supabase.co/storage/v1/object/public/accioresume/templateShumit.png" },
];

const SECTION_TITLES = {
  [FORM_SECTIONS.INTRO]: "Personal Information",
  [FORM_SECTIONS.OBJECTIVE]: "Career Objective",
  [FORM_SECTIONS.SKILLS]: "Technical Skills",
  [FORM_SECTIONS.EXPERIENCE]: "Work Experience",
  [FORM_SECTIONS.PROJECT]: "Projects",
  [FORM_SECTIONS.EDUCATION]: "Education",
  [FORM_SECTIONS.CERTIFICATIONS]: "Certifications",
  [FORM_SECTIONS.INTERNSHIP]: "Internship",
};

// Label formatters  --
function getLabel(section, key) {
  if (section === FORM_SECTIONS.PROJECT) {
    return "Project";
  }
  else if (section === FORM_SECTIONS.EXPERIENCE) {
    return "Experience";
  }
  else if (section === FORM_SECTIONS.SKILLS) {
    if (key === "languages") return "Languages ";
    if (key === "frameworks") return "Frameworks & Libraries";
    if (key === "database") return "Databases";
    if (key === "others") return "Other Tools";
    return key;
  }
  else if (section === FORM_SECTIONS.EDUCATION) {
    if (key === "school") return "10th Standard ";
    if (key === "higherSchool") return "12th / Diploma";
    if (key === "Degree") return "Degree / Graduation";
    return key;
  }
  else if (section === FORM_SECTIONS.INTERNSHIP) {
    if (key === "company") return "Company";
    if (key === "role") return "Role";
    if (key === "duration") return "Duration";
    if (key === "description") return "Description";
    return key;
  }
  else {
    return key;
  }
}




// Skills options data
const skillsOptions = {
  languages: [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
    { value: "ruby", label: "Ruby" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "dart", label: "Dart" },
    { value: "r", label: "R" },
    { value: "matlab", label: "MATLAB" },
    { value: "perl", label: "Perl" },
    { value: "scala", label: "Scala" },
    { value: "bash", label: "Bash" },
    { value: "sql", label: "SQL" }
  ],

  frameworks: [
    // Frontend
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue.js" },
    { value: "svelte", label: "Svelte" },
    { value: "gatsby", label: "Gatsby.js" },

    // Backend
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express.js" },
    { value: "nestjs", label: "NestJS" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "fastapi", label: "FastAPI" },
    { value: "springboot", label: "Spring Boot" },
    { value: "laravel", label: "Laravel" },
    { value: "dotnet", label: ".NET" },
    { value: "rubyrails", label: "Ruby on Rails" },

    // Mobile
    { value: "reactnative", label: "React Native" },
    { value: "flutter", label: "Flutter" },

    // Desktop
    { value: "electron", label: "Electron.js" }
  ],

  database: [
    { value: "mysql", label: "MySQL" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mongodb", label: "MongoDB" },
    { value: "redis", label: "Redis" },
    { value: "sqlite", label: "SQLite" },
    { value: "oracle", label: "Oracle" },
    { value: "mariadb", label: "MariaDB" },
    { value: "firebase", label: "Firebase" },
    { value: "dynamodb", label: "DynamoDB" },
    { value: "cassandra", label: "Cassandra" },
    { value: "neodb", label: "Neo4j" },
    { value: "couchdb", label: "CouchDB" },
    { value: "elasticsearch", label: "Elasticsearch" }
  ],

  others: [
    // DevOps
    { value: "git", label: "Git" },
    { value: "github", label: "GitHub" },
    { value: "gitlab", label: "GitLab" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "jenkins", label: "Jenkins" },
    { value: "ansible", label: "Ansible" },
    { value: "terraform", label: "Terraform" },
    { value: "nginx", label: "Nginx" },
    { value: "apache", label: "Apache" },

    // Cloud
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "gcp", label: "GCP" },
    { value: "vercel", label: "Vercel" },
    { value: "netlify", label: "Netlify" },
    { value: "cloudflare", label: "Cloudflare" },

    // Tools
    { value: "webpack", label: "Webpack" },
    { value: "vite", label: "Vite" },
    { value: "babel", label: "Babel" },
    { value: "postman", label: "Postman" },
    { value: "swagger", label: "Swagger" },
    { value: "jira", label: "Jira" },
    { value: "notion", label: "Notion" },
    { value: "figma", label: "Figma" },
    { value: "canva", label: "Canva" },
    { value: "sass", label: "SASS" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "materialui", label: "Material UI" },
    { value: "chakraui", label: "Chakra UI" },

    // Testing
    { value: "jest", label: "Jest" },
    { value: "cypress", label: "Cypress" },
    { value: "selenium", label: "Selenium" },
    { value: "pytest", label: "PyTest" },
    { value: "junit", label: "JUnit" },

    // ML/AI
    { value: "tensorflow", label: "TensorFlow" },
    { value: "pytorch", label: "PyTorch" },
    { value: "pandas", label: "Pandas" },
    { value: "numpy", label: "NumPy" },
    { value: "opencv", label: "OpenCV" },

    // Cybersecurity
    { value: "nmap", label: "Nmap" },
    { value: "burpsuite", label: "Burp Suite" },
    { value: "owasp", label: "OWASP" }
  ]
};

// Custom syles for react-select component

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#22c55e" : "#d1d5db",
    borderWidth: "1px",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(34, 197, 94, 0.1)" : "none",
    "&:hover": {
      borderColor: "#22c55e",
    },
    minHeight: "42px",
    padding: "2px",
  }),

  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#dcfce7",
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: "#166534",
    fontWeight: "500",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#166534",
    ":hover": {
      backgroundColor: "#22c55e",
      color: "white",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af",
  }),

  // 🔥 REQUIRED FOR DROPDOWN TO SHOW PROPERLY
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  menuList: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
  menuPortal: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};


// Validate form to fill all required fields
function isRequiredFieldsFilled(section) {
    console.log(section,'section')
  if (!section) return false;

  // Some answers (especially from text editor) may
  // contain HTML tags such as <p></p> or &nbsp; even when empty.
  // This clean() function removes:
  //  1) all HTML tags using a simple regex
  //  2) &nbsp; (HTML space)
  // Then trims whitespace to check if the field is truly filled.
  // --------------------------------------------------------------
  const clean = (val = "") => {
    return val
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();
  };

  // Function to check if a single item is valid
  const checkItem = (item) => {
    if (item?.canSkip) return true;     // Optional field → skip validation
    if (item?.isLastForm) return true;  // Last-form marker → skip validation

    return Boolean(clean(item?.answer)); // Check filled after cleaning HTML
  };

  // IF THE SECTION IS AN ARRAY
  if (Array.isArray(section)) {
    const check = section.every((item) => checkItem(item));
    return check;
  }

  // IF THE SECTION IS AN OBJECT (nested sections)
  if (typeof section === "object") {
    const check = Object.values(section).every((subArray) => {
      // HERE SUBARRAYS ARE IN ARRAY FORMAT ACCORDING TO DS IN constant.js
      const subArrCheck = subArray.every((item) => checkItem(item));
      return subArrCheck;
    });
    return check;
  }

  return false;
}



// Validate form to fill all required fields
function validateField(item, allItems = []) {
  const value = String(item?.answer || "").trim();


  // EMAIL VALIDATION

  if (item.type === "mail") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      return { valid: false, message: "Please enter a valid email address" };
    }
  }


  // LINKEDIN VALIDATION

  if (item.displayQuestion?.toLowerCase().includes("linkedin")) {
    if (!value.startsWith("https://www.linkedin.com/")) {
      return {
        valid: false,
        message: "LinkedIn link must start with https://www.linkedin.com/",
      };
    }
  }


  // GITHUB VALIDATION

  if (item.displayQuestion?.toLowerCase().includes("git")) {
    if (!value.startsWith("https://github.com/")) {
      return {
        valid: false,
        message: "GitHub link must start with https://github.com/",
      };
    }
  }


  // GENERAL URL VALIDATION

  if (item.type === "url") {
    try {
      new URL(value);
    } catch {
      return { valid: false, message: "Please enter a valid URL" };
    }
  }


  // PHONE NUMBER VALIDATION

  if (item.type === "number") {
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(value)) {
      return {
        valid: false,
        message: "Phone number must be exactly 10 digits",
      };
    }
  }


  // START DATE VALIDATION (start <= end)
  if (item.type === "date" && item.displayQuestion.toLowerCase().includes("start")) {
    const endItem = allItems.find(i =>
      i.type === "date" &&
      i.displayQuestion.toLowerCase().includes("end")
    );

    if (endItem?.answer) {
      const start = new Date(value);
      const end = new Date(endItem.answer);

      if (start >= end) {
        return {
          valid: false,
          message: "Start Date cannot be after End Date",
        };
      }
    }
  }

  // IF NOTHING FAILED

  return { valid: true, message: "" };
}


function shortenUrl(url) {
  try {
    const u = new URL(url);

    let path = u.pathname.replace(/\/$/, ""); // remove trailing slash
    const parts = path.split("/").filter((item) => item); //


    if (u.hostname.includes("github.com")) {
      return `github.com/${parts[0]}`;
    }

    if (u.hostname.includes("linkedin.com")) {
      const clean = parts[1]?.split("-").slice(0, 2).join("-");
      return `linkedin.com/in/${clean}`;
    }

    return `${u.hostname}/${parts[0] || ""}`;
  } catch (e) {
    return url;
  }
}


const ROUTES_PATH = {HOME : "/",FORM_SECTIONS : "/userDetails",PREVIEW :"/preview", RESUME_SUCCESS:"/resume-success"}



export { SECTION_TITLES, getLabel, templates, TEMPLATES_ID, initialState, SKIPPABLE_FORMS, experience, FORM_SECTIONS, skillsOptions, customStyles, isRequiredFieldsFilled, validateField, shortenUrl, ROUTES_PATH }