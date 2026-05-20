/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import {
  Phone,
  MapPin,
  Clock,
  Globe,
  Share2,
  Navigation,
  Star,
  StarHalf,
  CheckCircle2,
  ChevronDown,
  FlaskConical,
  ClipboardCheck,
  Microscope as MicroscopeIcon,
  Info,
  Search,
  HeartPulse,
  ArrowRight,
  X,
  ThumbsUp,
  Quote,
  MessageSquare,
  Smartphone,
  Download,
  Bookmark,
  ExternalLink,
  Sparkles,
  Award,
  ShieldCheck,
  Heart,
  ChevronRight,
  Copy,
  Check,
  Activity,
  CheckCircle,
  FileText,
  Percent,
  HelpCircle,
  ShieldAlert,
  LayoutGrid,
  CheckSquare,
  Scale,
  TrendingUp,
  Users,
  Shield,
  Zap,
  BadgeCheck,
  Timer,
  TestTube,
  HomeIcon,
  Building2,
  ChevronUp
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation as SwiperNavigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { generateHealthPackagesPDF } from './services/pdfService';

const packagesData = [
  {
    title: "Complete Care Vital",
    price: "₹1499",
    marketPrice: "₹2998",
    discount: "50% OFF",
    parametersCount: 31,
    image: "/images/service_card_vital.png",
    description: "Essential wellness screen for baseline health. Ideal for annual monitoring of vital organ markers and metabolism.",
    tests: [
      "Complete Hemogram (CBC) - 24 parameters",
      "Blood Glucose (Fasting)",
      "Lipid Profile (Basic Cholesterol check)",
      "Kidney Function Test (BUN, Creatinine, Uric Acid)",
      "Liver Function Test (Bilirubin, SGOT, SGPT)",
      "Urine Routine Analysis"
    ],
    preparation: "Requires 10-12 hours overnight fasting. Water is allowed.",
    tat: "Same Day (within 12 hours)"
  },
  {
    title: "Complete Care Essential",
    price: "₹2299",
    marketPrice: "₹4598",
    discount: "50% OFF",
    parametersCount: 75,
    image: "/images/service_card_active.png",
    description: "Comprehensive mid-level screening. Adds crucial thyroid indicators, vitamin deficiencies, and bone health markers.",
    tests: [
      "All Vital Parameters included",
      "Thyroid Profile (Total T3, Total T4, TSH)",
      "Vitamin D3 (25-Hydroxy)",
      "Vitamin B12 (Cyanocobalamin)",
      "Iron Deficiency Profile (Iron, TIBC, Transferrin)",
      "Bone & Mineral Screen (Calcium, Phosphorus)"
    ],
    preparation: "Requires 10-12 hours overnight fasting. Avoid tea/coffee in morning.",
    tat: "Within 18-24 hours"
  },
  {
    title: "Complete Care Premium",
    price: "₹4499",
    marketPrice: "₹8998",
    discount: "50% OFF",
    parametersCount: 111,
    image: "/images/service_card_premium.png",
    description: "Our gold-standard health assessment. Incorporates advanced cardiac risk indicators, stress hormones, pancreatic assays, and doctor reviews.",
    tests: [
      "All Essential Parameters included",
      "HbA1c (3-Month Average Glucose)",
      "Cardiac Risk Markers (hs-CRP, ApoA1, ApoB, Lp(a))",
      "Cortisol (Stress Hormone)",
      "Total IgE (Allergen Response)",
      "Amylase & Lipase (Pancreatic Function)",
      "Gender Specific: PSA (Men) / CA-125 (Women)",
      "Free Doctor Tele-Consultation Review"
    ],
    preparation: "Strict 12 hours fasting required. Morning medications should be discussed with doctor first.",
    tat: "Within 24 hours"
  },
  {
    title: "Diabetes & Cardiac Care",
    price: "₹1999",
    marketPrice: "₹3998",
    discount: "50% OFF",
    parametersCount: 62,
    image: "/images/service_card_active.png",
    description: "Targeted evaluation for individuals with a family history or symptoms of heart disease or high blood sugar.",
    tests: [
      "HbA1c (Average Blood Sugar)",
      "Lipid Profile (Full cholesterol subclasses)",
      "High Sensitivity CRP (Cardiac Plaque Plausibility)",
      "Kidney Filtration & Electrolyte Levels",
      "Uric Acid & Serum Creatinine"
    ],
    preparation: "Requires 10-12 hours fasting. Standard medications may be taken.",
    tat: "Same Day (within 12 hours)"
  }
];

const placePhotos = [
  "https://lh3.googleusercontent.com/p/AF1QipNF_HXEqUhlY6DUKJksoRw_n0SFMPA-uoXpsMb3=w1080-h600-p-k-no",
  "https://lh3.googleusercontent.com/p/AF1QipPhNppeDZ5NwpOBL8s6XoZYDjD6idQNb7DMo3m4=w1080-h600-p-k-no",
  "https://lh3.googleusercontent.com/p/AF1QipO30qPwhE04m0R9F2_JzN85N4iA6h5a-5v0c5E=w1080-h600-p-k-no"
];

const serviceCategories = [
  {
    name: "Full Body Checkups & Screening",
    icon: "HeartPulse",
    description: "Comprehensive multi-parameter health screens to monitor baseline vital systems.",
    tests: [
      { name: "Complete Care Vital (31 Parameters)", price: "₹1499", tat: "12 Hours" },
      { name: "Complete Care Essential (75 Parameters)", price: "₹2299", tat: "24 Hours" },
      { name: "Complete Care Premium (111 Parameters)", price: "₹4499", tat: "24 Hours" },
      { name: "Diabetes & Cardiac Care (62 Parameters)", price: "₹1999", tat: "12 Hours" }
    ]
  },
  {
    name: "Diabetes & Endocrinology",
    icon: "FlaskConical",
    description: "Evaluating glucose metabolism and endocrine system function.",
    tests: [
      { name: "HbA1c (Glycated Hemoglobin)", price: "₹350", tat: "12 Hours" },
      { name: "Blood Glucose Fasting & PP", price: "₹150", tat: "6 Hours" },
      { name: "Insulin (Fasting)", price: "₹850", tat: "24 Hours" }
    ]
  },
  {
    name: "Thyroid Profile",
    icon: "Activity",
    description: "Evaluating thyroid hormone levels to monitor metabolic rates.",
    tests: [
      { name: "Thyroid Profile (Total T3, T4, TSH)", price: "₹550", tat: "12 Hours" },
      { name: "Thyroid Stimulating Hormone (TSH) Ultra-sensitive", price: "₹300", tat: "12 Hours" },
      { name: "Anti-TPO Antibody", price: "₹1200", tat: "24 Hours" }
    ]
  },
  {
    name: "Kidney & Urinary Function",
    icon: "ClipboardCheck",
    description: "Screening renal filtration rate, electrolytes, and waste excretion efficiency.",
    tests: [
      { name: "Kidney Function Test (KFT)", price: "₹850", tat: "12 Hours" },
      { name: "Serum Creatinine", price: "₹220", tat: "6 Hours" },
      { name: "Uric Acid", price: "₹250", tat: "6 Hours" }
    ]
  },
  {
    name: "Liver & Digestive Wellness",
    icon: "MicroscopeIcon",
    description: "Monitoring liver enzyme balance and protein synthesis capacity.",
    tests: [
      { name: "Liver Function Test (LFT)", price: "₹850", tat: "12 Hours" },
      { name: "Bilirubin (Total, Direct & Indirect)", price: "₹250", tat: "6 Hours" },
      { name: "SGOT & SGPT Assay", price: "₹300", tat: "6 Hours" }
    ]
  },
  {
    name: "Vitamins & Nutritional Health",
    icon: "Sparkles",
    description: "Analyzing core micro-nutritional indices that govern bone strength and cognitive health.",
    tests: [
      { name: "Vitamin D3 (25-Hydroxy)", price: "₹1250", tat: "24 Hours" },
      { name: "Vitamin B12 (Cyanocobalamin)", price: "₹950", tat: "24 Hours" },
      { name: "Iron Deficiency Profile", price: "₹750", tat: "12 Hours" }
    ]
  }
];

const patientQueries = [
  {
    q: "How can I book a blood test home collection in Mohali Sector 69?",
    a: "Booking home sample collection is quick and easy. You can click 'Book Online' on our portal, call us directly at 091154 59115, or message us on WhatsApp. Our NABL certified phlebotomist will visit your home at your preferred time slot for a completely sterile sample collection."
  },
  {
    q: "What is the difference between Agilus Diagnostics and SRL Diagnostics?",
    a: "Agilus Diagnostics is the new brand name for SRL Diagnostics. The transition brings even more advanced automation and faster report delivery while maintaining the same clinical trust, NABL accreditations, and expert pathology team that you have relied on in Mohali Sector 69."
  },
  {
    q: "Is fasting required for a full body checkup?",
    a: "Yes, for comprehensive health checks like Complete Care Vital Pro, 10 to 12 hours of overnight fasting is mandatory. You may drink plain water, but avoid tea, coffee, juice, food, or morning medications until your blood sample is collected."
  },
  {
    q: "How long does it take to get test reports online?",
    a: "Most routine reports (such as Thyroid Profile, HbA1c, Complete Hemogram, Kidney, and Liver tests) are finalized within 12 to 24 hours. Reports are delivered directly to your registered email and WhatsApp number as verified PDFs."
  },
  {
    q: "Are the reports valid for consulting doctors anywhere in India?",
    a: "Absolutely. Our testing is carried out under NABL (National Accreditation Board for Testing and Calibration Laboratories) and ISO guidelines. These reports are accepted by all major hospitals, clinical specialists, and health authorities across India."
  }
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [pageLoading, setPageLoading] = useState(true);
  const [selectedTestForBooking, setSelectedTestForBooking] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "packages" | "services" | "tests" | "reviews" | "qa" | "about">("overview");
  
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isHoursExpanded, setIsHoursExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Full Body Checkups & Screening");
  const [expandedQuery, setExpandedQuery] = useState<number | null>(0);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [testSearchQuery, setTestSearchQuery] = useState("");
  const [packageSubTab, setPackageSubTab] = useState<"cards" | "compare" | "labs" | "prep" | "report">("cards");
  const [expandedPackageIdx, setExpandedPackageIdx] = useState<number | null>(null);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<"idle" | "submitting" | "success">("idle");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    date?: string;
    time?: string;
  }>({});

  const searchRef = useRef<HTMLDivElement>(null);
  const leftSidebarRef = useRef<HTMLDivElement>(null);

  // SEO Schema Injection
  useEffect(() => {
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalBusiness",
      "name": "Agilus Diagnostics Mohali Sector 69",
      "alternateName": ["SRL Diagnostics Mohali", "Agilus Diagnostics Mohali"],
      "image": "https://lh3.googleusercontent.com/p/AF1QipNF_HXEqUhlY6DUKJksoRw_n0SFMPA-uoXpsMb3=w1080-h600-p-k-no",
      "logo": "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHu6TqEOOin4neExE5u0dvA46IgHsNbp06tv7KCprrGpPkYmyzTuH6dlbFy5oug9NSUhMKU3CQuvT8sqwqTOPf-mUD470_B24edMLjwZ91kLK9_F7_tAAbDkGIw8BXEAyvgied8jskoHh4",
      "telephone": "09115459115",
      "email": "info@agilusdiagnostics.com",
      "url": window.location.origin,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Booth No. 12, GMADA Market, Sector 69",
        "addressLocality": "Sahibzada Ajit Singh Nagar (Mohali)",
        "addressRegion": "Punjab",
        "postalCode": "160069",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.6893",
        "longitude": "76.7128"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "07:00",
          "closes": "20:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "07:00",
          "closes": "14:00"
        }
      ],
      "hasMap": "https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic",
      "sameAs": [
        "https://www.justdial.com/Chandigarh/Srl-Diagnostics-Home-Collection-Partner-GMADA-Market-Sector-69-Mohali/0172PX172-X172-191011114251-I8W6_BZDET",
        "https://www.sulekha.com/agilus-diagnostics-sector-69-mohali-chandigarh-contact-address",
        "https://www.indiamart.com/srl-diagnostics-mohali-sector69"
      ]
    };

    const scriptId = "seo-schema-ldjson";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = scriptId;
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(schemaData);

    const timer = setTimeout(() => setPageLoading(false), 600);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Handle click outside search suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleDirection = () => window.open("https://maps.app.goo.gl/p6kqrRWojY97Sd327?g_st=ic", "_blank");
  const handleCall = () => window.location.href = "tel:9115459115";
  const handleWhatsApp = () => window.open("https://wa.me/9115459115?text=Hi, I want to book a blood test in Mohali Sector 69.", "_blank");
  const handleGMBReviewRedirect = () => window.open("https://search.google.com/local/writereview?placeid=ChIJ0XR5dPn9DzoRYWbvsme9beU", "_blank");
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Agilus Diagnostics Mohali - Sector 69',
        text: 'NABL Accredited Lab with Free Home Collection in Mohali.',
        url: window.location.href,
      }).catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText("Booth No. 12, GMADA Market, Sector 69, Mohali, Punjab 160069");
    alert("Address copied to clipboard!");
  };

  const handleDownloadPDF = () => {
    generateHealthPackagesPDF(packagesData);
  };

  const openBookingForTest = (testName: string) => {
    setSelectedTestForBooking(testName);
    if (window.innerWidth >= 1024) {
      const el = document.getElementById("desktop-booking-form");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-4", "ring-[#FFC20E]/50");
        setTimeout(() => {
          el.classList.remove("ring-4", "ring-[#FFC20E]/50");
        }, 1500);
      }
    } else {
      setIsBookingOpen(true);
    }
  };

  const closeBooking = () => {
    setIsBookingOpen(false);
    setBookingStatus("idle");
    setFormData({ name: "", phone: "", email: "", date: "", time: "" });
    setFormErrors({});
    setSelectedTestForBooking("");
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: typeof formErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Full name is required";
    } else if (formData.name.trim().length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (formData.phone.replace(/[^0-9]/g, "").length < 10) {
      errors.phone = "Enter a valid phone number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address";
    }

    if (!formData.date) {
      errors.date = "Preferred date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.date = "Date cannot be in the past";
      }
    }

    if (!formData.time) {
      errors.time = "Preferred time slot is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setBookingStatus("submitting");

    setTimeout(() => {
      setBookingStatus("success");
      const whatsappNumber = "9115459115";
      const message = `*Agilus Diagnostics Mohali Appointment*\n\n${selectedTestForBooking ? `*Test/Package:* ${selectedTestForBooking}\n` : ''}*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || 'Not Provided'}\n*Date:* ${formData.date}\n*Time:* ${formData.time}\n\nPlease confirm my booking.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");
    }, 1000);
  };

  const searchSuggestions = [
    { name: "Full Body Checkup", subtext: "Wellness & Prevention", tab: "packages" as const, isTestDetail: false },
    { name: "Thyroid Profile", subtext: "T3, T4, TSH Screening", tab: "services" as const, isTestDetail: false },
    { name: "Diabetes Screening", subtext: "Sugar & HbA1c", tab: "services" as const, isTestDetail: false },
    { name: "Lipid Profile", subtext: "Cholesterol & Heart Health", tab: "services" as const, isTestDetail: false },
    { name: "Vitamin D3 Test", subtext: "Bone & Immunity", tab: "services" as const, isTestDetail: false },
  ];

  const matchingTests = searchQuery ? testMenu.filter((t) => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.code.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5).map((t) => ({
    name: t.name,
    subtext: `Clinical Test • ₹${t.mrp} • TAT: ${t.tat}`,
    tab: "tests" as const,
    isTestDetail: true
  })) : [];

  const filteredSuggestions = [
    ...searchSuggestions.filter((item) =>
      searchQuery ? (
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtext.toLowerCase().includes(searchQuery.toLowerCase())
      ) : true
    ),
    ...matchingTests
  ];

  const testMenu = [
    {
      code: "5569",
      name: "(1→3) BETA D GLUCAN (BDG), SERUM",
      mrp: "7500",
      method: "Protease Zymogen-Based Colorimetric",
      tat: "24-48 Hours",
      sample: "Serum (5 ML), 2-8°C Preferred",
      preparation: "Overnight fasting recommended but not mandatory.",
    },
    {
      code: "DOCS",
      name: "11-DEOXYCORTICOSTERONE",
      mrp: "22020",
      method: "LC-MSMS",
      tat: "3-5 Days",
      sample: "Serum (3 ML), Frozen (-20°C)",
      preparation: "Patient should be at rest 30 mins before sample collection.",
    },
    {
      code: "3190",
      name: "17 ALPHA HYDROXYPROGESTERONE",
      mrp: "1850",
      method: "CLIA",
      tat: "12-24 Hours",
      sample: "Serum (3 ML), 2-8°C (Stable for 3 Days)",
      preparation: "Morning sample (8-10 AM) preferred.",
    },
    {
      code: "DCORT",
      name: "11-DEOXYCORTISOL",
      mrp: "13100",
      method: "LC-MSMS",
      tat: "4-6 Days",
      sample: "Serum (3 ML), Frozen",
      preparation: "No specific preparation required.",
    },
    {
      code: "3313",
      name: "17 KETOSTEROIDS, 24 HRS URINE",
      mrp: "6300",
      method: "Column Chromatography",
      tat: "2-3 Days",
      sample: "24 Hrs Urine (30 ML ALIQUOT), 2-8°C",
      preparation: "Avoid certain fruits (bananas/citrus) 48 hrs prior.",
    },
    {
      code: "1282VGN",
      name: "AEROBIC SUSCEPTIBILITY GRAM NEGATIVE",
      mrp: "1300",
      method: "Microdilution",
      tat: "48-72 Hours",
      sample: "Pure Culture Isolate, Room Temp/Refrigerated",
      preparation: "Culture must be in log-phase growth.",
    },
    {
      code: "8425",
      name: "24 HRS URINARY CITRATE",
      mrp: "4000",
      method: "Spectrophotometry",
      tat: "24 Hours",
      sample: "24 Hrs Urine (5 ML ALIQUOT), 2-8°C",
      preparation: "Maintain normal fluid intake during collection.",
    },
    {
      code: "10310",
      name: "ADVANCED B CELL ACUTE LYMPHOCYTIC LEUKEMIA PANEL",
      mrp: "25000",
      method: "Ploidy Analysis + FISH",
      tat: "7-10 Days",
      sample: "Bone Marrow Aspirate / Peripheral Blood in Sodium Heparin",
      preparation: "Clinical history and previous morphology reports mandatory.",
    },
  ];

  const filteredTests = testMenu.filter((test) =>
    test.name.toLowerCase().includes(testSearchQuery.toLowerCase()) ||
    test.code.toLowerCase().includes(testSearchQuery.toLowerCase())
  );

  const allReviews = [
    {
      name: "Rahul Sharma",
      rating: 5,
      date: "2 weeks ago",
      comment: "Excellent service. The home collection was very smooth and the reports were delivered on time via email and WhatsApp. Very professional phlebotomist.",
    },
    {
      name: "Pooja Verma",
      rating: 5,
      date: "1 month ago",
      comment: "One of the best labs in Mohali. Clean environment and the staff was very helpful. Highly recommended for full body checkups.",
    },
    {
      name: "Amit Gupta",
      rating: 5,
      date: "3 weeks ago",
      comment: "Very accurate results and fast reporting. I have been visiting this lab for 2 years now, never disappointed.",
    },
    {
      name: "Sneha Kapoor",
      rating: 4,
      date: "1 month ago",
      comment: "Professional staff and affordable prices. The home collection service is a life saver for my parents.",
    },
    {
      name: "Vikram Singh",
      rating: 5,
      date: "2 months ago",
      comment: "SRL Mohali has state of the art equipment. The lab is very clean and follows all safety protocols.",
    },
    {
      name: "Deepak Malhotra",
      rating: 5,
      date: "5 days ago",
      comment: "Prompt response for home collection and very gentle blood extraction. Highly recommended for anyone in Sector 69.",
    },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "HeartPulse":
        return <HeartPulse className="w-5 h-5 text-srl-gold" />;
      case "FlaskConical":
        return <FlaskConical className="w-5 h-5 text-srl-blue" />;
      case "Activity":
        return <Activity className="w-5 h-5 text-emerald-500" />;
      case "ClipboardCheck":
        return <ClipboardCheck className="w-5 h-5 text-indigo-500" />;
      case "MicroscopeIcon":
        return <MicroscopeIcon className="w-5 h-5 text-rose-500" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-[#5f6368]" />;
    }
  };

  const renderPackagesHub = () => {
    return (
      <div className="bg-white rounded-3xl p-6 border border-[#dadce0]/50 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-srl-blue flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-srl-gold" />
              <span>Agilus Certified Wellness Profiles</span>
            </h3>
            <p className="text-xs text-google-grey">Preventive screening profiles featuring detailed clinical parameters and NABL credentials.</p>
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="text-xs font-bold text-srl-blue border border-[#dadce0] hover:bg-google-light-grey px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <Download className="w-4 h-4 text-srl-gold" />
            <span>PDF Catalog</span>
          </button>
        </div>

        {/* Sub-Tab Navigation */}
        <div className="flex border-b border-[#dadce0] overflow-x-auto no-scrollbar scroll-smooth gap-1">
          {[
            { id: "cards", label: "Popular Packages", icon: "LayoutGrid" },
            { id: "compare", label: "Parameter Checklist", icon: "CheckSquare" },
            { id: "labs", label: "Compare with Other Labs", icon: "Scale" },
            { id: "prep", label: "Fasting & Sample Prep", icon: "Clock" },
            { id: "report", label: "Visual Smart Report Preview", icon: "FileText" }
          ].map((subTab) => {
            const isActive = packageSubTab === subTab.id;
            return (
              <button
                key={subTab.id}
                onClick={() => setPackageSubTab(subTab.id as any)}
                className={`whitespace-nowrap px-4 py-2.5 text-xs font-bold transition-all flex items-center gap-2 border-b-2 ${
                  isActive 
                    ? "border-srl-blue text-srl-blue" 
                    : "border-transparent text-google-grey hover:text-srl-blue"
                }`}
              >
                {subTab.id === "cards" && <LayoutGrid className="w-3.5 h-3.5" />}
                {subTab.id === "compare" && <CheckSquare className="w-3.5 h-3.5" />}
                {subTab.id === "labs" && <Scale className="w-3.5 h-3.5" />}
                {subTab.id === "prep" && <Clock className="w-3.5 h-3.5" />}
                {subTab.id === "report" && <FileText className="w-3.5 h-3.5" />}
                <span>{subTab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content 1: Cards */}
        {packageSubTab === "cards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {packagesData.map((pkg, idx) => {
              const isExpanded = expandedPackageIdx === idx;
              return (
                <div key={idx} className="border border-[#dadce0] rounded-2xl overflow-hidden hover:border-srl-blue transition-all flex flex-col justify-between bg-white relative hover:shadow-lg group">
                  
                  {/* Image Banner */}
                  <div className="h-32 w-full overflow-hidden relative bg-slate-100">
                    <img 
                      src={pkg.image} 
                      alt={`${pkg.title} package banner`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <span className="bg-agilus-red text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                        {pkg.discount}
                      </span>
                      <span className="bg-srl-blue text-white text-[10px] font-black px-2.5 py-0.5 rounded-md shadow border border-white/20">
                        {pkg.parametersCount} Parameters
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-black text-[#202124] tracking-tight group-hover:text-srl-blue transition-colors">
                          {pkg.title}
                        </h4>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-black text-srl-blue block">{pkg.price}</span>
                          <span className="text-[10px] text-google-grey line-through">{pkg.marketPrice}</span>
                        </div>
                      </div>
                      
                      <p className="text-[11px] text-google-grey mt-2 leading-relaxed h-12 overflow-hidden">
                        {pkg.description}
                      </p>

                      {/* Quick details */}
                      <div className="grid grid-cols-2 gap-2 mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <div>
                          <span className="text-[9px] font-black text-srl-blue uppercase block tracking-wider">Fasting Prep</span>
                          <span className="text-[10px] text-google-grey font-medium line-clamp-1">{pkg.preparation}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-srl-blue uppercase block tracking-wider">Report TAT</span>
                          <span className="text-[10px] text-google-grey font-medium">{pkg.tat}</span>
                        </div>
                      </div>

                      {/* Tests checklist preview */}
                      <div className="mt-4">
                        <button 
                          onClick={() => setExpandedPackageIdx(isExpanded ? null : idx)}
                          className="text-[10px] font-bold text-srl-blue hover:underline flex items-center gap-1 text-left"
                        >
                          <span>{isExpanded ? "Hide parameters list" : `View all ${pkg.tests.length} categories`}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                        
                        {isExpanded ? (
                          <ul className="text-[10px] text-google-grey mt-2.5 space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-[#dadce0]/30 max-h-48 overflow-y-auto">
                            {pkg.tests.map((item, tIdx) => (
                              <li key={tIdx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                                <span className="leading-tight">{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="text-[10px] text-google-grey mt-2 space-y-1">
                            {pkg.tests.slice(0, 3).map((item, tIdx) => (
                              <li key={tIdx} className="flex items-center gap-1.5">
                                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                <span className="truncate">{item}</span>
                              </li>
                            ))}
                            {pkg.tests.length > 3 && (
                              <li className="text-srl-blue font-bold text-[9px] mt-0.5">
                                +{pkg.tests.length - 3} More parameters covered...
                              </li>
                            )}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button 
                        onClick={() => openBookingForTest(pkg.title)}
                        className="bg-srl-blue text-white text-xs font-bold py-2 rounded-xl transition-all active:scale-95 text-center shadow-sm hover:bg-srl-blue/90"
                      >
                        Book Online
                      </button>
                      <a 
                        href={`https://wa.me/919115459115?text=Hello%20Agilus%20Diagnostics%20Mohali,%20I%20want%20to%20book%20the%20${encodeURIComponent(pkg.title)}%20package.%20Please%20schedule%20home%20collection.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold py-2 rounded-xl transition-all active:scale-95 text-center flex items-center justify-center gap-1 shadow-sm"
                      >
                        WhatsApp Book
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab Content 2: Parameter Checklist */}
        {packageSubTab === "compare" && (
          <div className="border border-[#dadce0] rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#dadce0]">
                    <th className="p-3.5 font-bold text-[#202124] min-w-[180px]">Health Parameters</th>
                    <th className="p-3.5 font-bold text-center text-srl-blue">Vital (31)</th>
                    <th className="p-3.5 font-bold text-center text-[#202124]">Essential (75)</th>
                    <th className="p-3.5 font-bold text-center text-[#202124]">Premium (111)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]/50 text-[11px] text-google-grey">
                  {[
                    { name: "Complete Hemogram (CBC - Anemia & Infection check)", v: true, e: true, p: true },
                    { name: "Blood Sugar Fasting (Diabetes index)", v: true, e: true, p: true },
                    { name: "Lipid Profile (Cholesterol, Triglycerides, HDL/LDL)", v: true, e: true, p: true },
                    { name: "Kidney Function (Urea, Creatinine, Electrolytes)", v: true, e: true, p: true },
                    { name: "Liver Function (Bilirubin, SGOT, SGPT, Proteins)", v: true, e: true, p: true },
                    { name: "Urine Routine (Filtration & UTIs)", v: true, e: true, p: true },
                    { name: "Thyroid Profile (TSH, T3, T4 - Metabolism)", v: false, e: true, p: true },
                    { name: "Vitamin D3 & Vitamin B12 (Bone & Energy)", v: false, e: true, p: true },
                    { name: "Iron Deficiency Profile (Ferritin & Iron binding)", v: false, e: true, p: true },
                    { name: "Cardiac Risk Assessors (hs-CRP, Apolipoproteins)", v: false, e: false, p: true },
                    { name: "Cortisol (Adrenal Stress Hormone level)", v: false, e: false, p: true },
                    { name: "Total IgE (Allergy & Environmental response)", v: false, e: false, p: true },
                    { name: "Cancer Screening Marker (PSA for Men / CA-125 for Women)", v: false, e: false, p: true },
                    { name: "Amylase & Lipase (Pancreatic Function)", v: false, e: false, p: true },
                    { name: "Free Doctor Tele-consultation Review", v: false, e: false, p: true }
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-[#202124]">{row.name}</td>
                      <td className="p-3 text-center">
                        {row.v ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-rose-400 font-bold">-</span>}
                      </td>
                      <td className="p-3 text-center">
                        {row.e ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-rose-400 font-bold">-</span>}
                      </td>
                      <td className="p-3 text-center">
                        {row.p ? <Check className="w-4 h-4 text-emerald-500 mx-auto" /> : <span className="text-rose-400 font-bold">-</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-3.5 text-center border-t border-[#dadce0]">
              <p className="text-[10px] text-google-grey font-bold">Need help choosing a package? Contact our diagnostics advisor in Mohali at <a href="tel:09115459115" className="text-srl-blue hover:underline">091154 59115</a></p>
            </div>
          </div>
        )}

        {/* Tab Content 3: Lab Comparison */}
        {packageSubTab === "labs" && (
          <div className="border border-[#dadce0] rounded-2xl overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-[#dadce0]">
                    <th className="p-3.5 font-bold text-[#202124]">Feature / Specification</th>
                    <th className="p-3.5 font-bold text-srl-blue">Agilus Diagnostics Mohali</th>
                    <th className="p-3.5 font-bold text-google-grey">Local Independent Labs</th>
                    <th className="p-3.5 font-bold text-google-grey">Online Aggregator Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dadce0]/50 text-[11px] text-google-grey">
                  {[
                    { f: "Pricing for 100+ Parameters", a: "₹4,499 (Value for Money)", l: "₹5,500+", o: "₹3,999 (No Local Lab)" },
                    { f: "Clinical Accreditation", a: "NABL Accredited & CAP Legacy", l: "Varies (Mostly unaccredited)", o: "Third party partner labs only" },
                    { f: "Home Collection Staff", a: "Certified Phlebotomists", l: "General compounders", o: "Freelance gig workers" },
                    { f: "Report turnaround time (TAT)", a: "Guaranteed within 12-24 Hours", l: "36 - 48 Hours", o: "24 - 48 Hours (Transit lag)" },
                    { f: "WhatsApp Delivery", a: "Instant PDF delivery on tap", l: "Manual email or collect printout", o: "App download required" },
                    { f: "Doctor consultation review", a: "Included Free in Premium", l: "Additional ₹500+", o: "AI-generated text brief only" }
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-semibold text-[#202124]">{row.f}</td>
                      <td className="p-3 font-bold text-srl-blue bg-srl-blue/5">{row.a}</td>
                      <td className="p-3">{row.l}</td>
                      <td className="p-3">{row.o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content 4: Fasting & Prep */}
        {packageSubTab === "prep" && (
          <div className="bg-slate-50 rounded-2xl p-5 border border-[#dadce0]/60 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-srl-blue/10 flex items-center justify-center text-srl-blue shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#202124]">Interactive Pre-Test Preparation Guide</h4>
                <p className="text-[10px] text-google-grey">Ensuring your sample is drawn under accurate physiological baselines.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {[
                {
                  step: "1",
                  title: "Fasting Mandate",
                  desc: "Requires 10-12 hours of strict fasting. Eat your dinner by 8 PM if sample is booked for 8 AM next morning."
                },
                {
                  step: "2",
                  title: "Hydration Check",
                  desc: "Drink plenty of plain water to keep veins hydrated for easier blood draw. Avoid juices, tea, or coffee."
                },
                {
                  step: "3",
                  title: "Medications",
                  desc: "Do not stop chronic blood pressure or heart medications unless advised by your clinician. Discuss at sample draw."
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-[#dadce0]/50 space-y-2 shadow-2xs">
                  <span className="text-[10px] font-black text-srl-blue uppercase tracking-widest block bg-srl-blue/5 w-6 h-6 rounded-full flex items-center justify-center">
                    {step.step}
                  </span>
                  <h5 className="text-[11px] font-black text-[#202124]">{step.title}</h5>
                  <p className="text-[10px] text-google-grey leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content 5: Smart Report Preview */}
        {packageSubTab === "report" && (
          <div className="border border-[#dadce0] rounded-2xl overflow-hidden bg-white p-5 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-xs font-black text-srl-blue">Agilus Color-Coded Smart Diagnostics Report</h4>
                <p className="text-[10px] text-google-grey">Interactive preview of how your clinical parameters are plotted for easy understanding.</p>
              </div>
              <span className="text-[9px] font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Standard Inclusion
              </span>
            </div>

            {/* Mock Visual Indicators */}
            <div className="space-y-4 pt-1 max-w-lg mx-auto">
              {[
                { name: "Fasting Blood Glucose", value: "95 mg/dL", status: "Normal", color: "bg-emerald-500 animate-pulse", barWidth: "45%", desc: "Ideal glucose levels (range: 70 - 100 mg/dL). Metabolism is optimal." },
                { name: "Vitamin D3 (25-Hydroxy)", value: "18.2 ng/mL", status: "Deficient", color: "bg-amber-400", barWidth: "25%", desc: "Low level detected (range: 30 - 100 ng/mL). Supplementation recommended." },
                { name: "Total Cholesterol", value: "242 mg/dL", status: "High Risk", color: "bg-rose-500", barWidth: "85%", desc: "Elevated levels (range: < 200 mg/dL). High cardiovascular plaque warning." }
              ].map((ind, idx) => (
                <div key={idx} className="space-y-1.5 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#202124]">{ind.name}</span>
                    <span className="font-mono font-bold text-google-grey">{ind.value}</span>
                  </div>
                  
                  {/* Range progress bar */}
                  <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden relative">
                    <div className={`h-full rounded-full ${ind.color}`} style={{ width: ind.barWidth }} />
                  </div>
                  
                  <div className="flex justify-between items-center text-[9px]">
                    <span className="text-google-grey">{ind.desc}</span>
                    <span className={`font-black uppercase tracking-wider ${
                      ind.status === "Normal" 
                        ? "text-emerald-500" 
                        : ind.status === "Deficient" 
                        ? "text-amber-500" 
                        : "text-rose-500"
                    }`}>{ind.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen w-full bg-slate-50 font-sans text-[#202124] flex flex-col overflow-hidden relative">
      
      {/* 1. Global Page Preloader with Agilus Theme */}
      <AnimatePresence>
        {pageLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-srl-blue/20" />
                <div className="absolute inset-0 rounded-full border-4 border-t-srl-blue animate-spin" />
              </div>
              <p className="text-base font-black uppercase tracking-widest text-srl-blue flex items-center gap-1 animate-pulse">
                <span>Agilus</span>
                <span className="text-srl-gold">Diagnostics</span>
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#5f6368]">
                2050 GMB Interface
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Futuristic 2050 Agilus styled Top Header */}
      <header className="h-[64px] bg-white/80 backdrop-blur-md border-b border-[#dadce0]/50 px-4 flex items-center justify-between z-30 shrink-0 shadow-xs">
        <div className="flex items-center gap-6 flex-1 max-w-2xl">
          {/* Agilus Branded Header Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="125" height="24" fill="none" viewBox="0 0 218 42" className="w-[110px] h-auto shrink-0">
              <path fill="#0075BB" d="M16.553 25.342h-4.054v-.81c-1.251.98-2.77 1.451-4.324 1.451C4.189 25.983 0 22.941 0 17.738s4.189-8.246 8.175-8.246c1.553 0 3.073.472 4.324 1.452v-.81h-4.054zM8.276 13.009c-2.33 0-4.223 2.13-4.223 4.732 0 2.601 1.893 4.731 4.223 4.731s4.223-2.13 4.223-4.731c0-2.605-1.892-4.732-4.223-4.732M37.498 26.41c0 4.562-3.717 7.94-8.276 7.94a8.24 8.24 0 0 1-7.164-4.124l3.412-1.994c.71 1.52 2.13 2.568 3.752 2.568 2.33 0 4.222-1.791 4.222-4.393V24.08c-1.251.98-2.77 1.452-4.324 1.452-3.986 0-8.175-3.042-8.175-8.245 0-5.204 4.19-8.246 8.175-8.246c1.553 0 3.073.475 4.324 1.452v-.81h4.054zm-8.276-13.855c-2.33 0-4.223 2.13-4.223 4.732 0 2.601 1.892 4.731 4.223 4.731s4.222-2.13 4.222-4.732c0-2.601-1.892-4.731-4.222-4.731M46.284 4.39H42.23V-.002h4.053zm0 20.952H42.23V10.136h4.053zM55.065 25.342h-4.053V-.002h4.053zM74.324 25.34h-4.053v-.776c-1.014 1.081-2.466 1.451-3.82 1.451-3.344 0-6.654-2.635-6.654-6.454v-9.426h4.053v9.429c0 1.621 1.249 2.805 3.04 2.805 1.892 0 3.378-1.486 3.378-3.175v-9.06h4.053V25.34zM88.073 14.97c-.573-1.486-2.028-2.198-3.31-2.198-1.184 0-2.195.607-2.195 1.689 0 .607.407 1.014 1.251 1.217l2.972.642c2.195.508 4.528 1.42 4.528 4.596 0 3.344-3.141 5.135-6.384 5.135-2.94 0-5.946-1.486-6.892-4.528l3.243-1.184c.709 1.621 2.265 2.33 3.615 2.33 1.317 0 2.5-.675 2.5-1.824 0-.54-.407-.913-1.251-1.116l-2.972-.641c-2.194-.472-4.46-1.486-4.46-4.664 0-3.31 2.94-4.969 6.048-4.969 2.77 0 5.64 1.353 6.553 4.087z"></path>
              <path fill="#76C58F" d="M115.246 24.413h3.067c.034 0 1.418.006 1.449.01l8.251-8.172-8.122-8.042h-4.525l8.042 8.042z"></path>
              <path fill="#FFCB05" d="M106.305 24.413h3.067c.034 0 1.421.006 1.448.01l8.252-8.172-8.122-8.042h-4.522l8.042 8.042z"></path>
              <path fill="#ED1C24" d="M97.371 24.413h3.067c.034 0 1.418.006 1.449.01l8.251-8.172-8.125-8.042h-4.522l8.042 8.042z"></path>
              <path fill="#0075BB" d="M47.244 38.627h-.965v-.882c-.48.688-1.23 1.122-2.123 1.122-1.557 0-2.883-1.325-2.883-2.956 0-1.627 1.326-2.956 2.883-2.956.89 0 1.64.435 2.123 1.122V29.58h.965zm-2.99-4.824c-1.11 0-2.013.94-2.013 2.111s.904 2.112 2.013 2.112c1.11 0 2.025-.94 2.025-2.112 0-1.17-.915-2.111-2.025-2.111M52.523 31.03h-.964v-1.446h.964zm0 7.598h-.964V33.2h.964zM62.447 38.626h-.965v-.882c-.48.688-1.23 1.122-2.123 1.122-1.557 0-2.882-1.325-2.882-2.956 0-1.627 1.325-2.956 2.882-2.956.893 0 1.64.435 2.123 1.122v-.878h.965zm-2.99-4.824c-1.11 0-2.013.94-2.013 2.111s.904 2.112 2.013 2.112c1.11 0 2.025-.94 2.025-2.112 0-1.171-.915-2.111-2.025-2.111M72.368 39.045C72.368 40.89 70.8 42 69.233 42c-1.014 0-2.025-.472-2.617-1.483l.783-.447a2.1 2.1 0 0 0 1.856 1.073c1.085 0 2.145-.783 2.145-2.1v-1.3c-.48.688-1.23 1.122-2.123 1.122-1.557 0-2.883-1.325-2.883-2.956 0-1.627 1.326-2.956 2.883-2.956.89 0 1.64.435 2.123 1.122v-.878h.965v5.847zm-2.99-5.243c-1.11 0-2.013.94-2.013 2.111s.904 2.112 2.013 2.112c1.11 0 2.025-.94 2.025-2.112 0-1.171-.915-2.111-2.025-2.111M81.632 38.627h-.965V35.19c0-.82-.617-1.4-1.446-1.4-.881 0-1.569.712-1.569 1.557v3.28h-.965v-5.429h.965v.65c.398-.603 1.06-.89 1.723-.89 1.122 0 2.257.795 2.257 2.232zM88.543 38.866a2.96 2.96 0 0 1-2.953-2.956 2.96 2.96 0 0 1 2.953-2.956 2.96 2.96 0 0 1 2.956 2.956 2.965 2.965 0 0 1-2.956 2.956m0-5.064c-1.098 0-1.991.94-1.991 2.111s.893 2.112 1.99 2.112c1.098 0 1.992-.94 1.992-2.112-.003-1.171-.894-2.111-1.991-2.111M97.33 38.867c-.977 0-1.979-.46-2.244-1.338l.832-.327c.278.639.783.857 1.375.857.604 0 1.18-.314 1.18-.94 0-.314-.215-.58-.76-.7l-1.015-.227c-.795-.17-1.4-.617-1.4-1.557 0-1.134.965-1.677 1.967-1.677.916 0 1.859.447 2.112 1.325l-.833.327a1.37 1.37 0 0 0-1.279-.844c-.555 0-1.035.314-1.035.869 0 .265.194.613.542.687l1.023.228c.87.195 1.628.543 1.628 1.594.006 1.168-1.033 1.723-2.093 1.723M105.793 34.043h-.965v4.584h-.965v-4.584h-.965V33.2h.965V29.58h.965V33.2h.965zM110.594 31.03h-.965v-1.446h.965zm0 7.598h-.965V33.2h.965zM120.034 37.384c-.567.927-1.495 1.482-2.543 1.482a2.96 2.96 0 0 1-2.956-2.956 2.96 2.96 0 0 1 2.956-2.956c1.048 0 1.979.555 2.543 1.483l-.783.447c-.397-.7-1.035-1.098-1.772-1.098-1.122 0-1.979.953-1.979 2.124 0 1.18.857 2.124 1.979 2.124.737 0 1.375-.398 1.772-1.097zM125.881 38.867c-.977 0-1.979-.46-2.244-1.338l.832-.327c.277.639.783.857 1.375.857.604 0 1.18-.314 1.18-.94 0-.314-.215-.58-.761-.7l-1.014-.227c-.795-.17-1.4-.617-1.4-1.557 0-1.134.965-1.677 1.967-1.677.915 0 1.859.447 2.111 1.325l-.832.327a1.37 1.37 0 0 0-1.279-.844c-.555 0-1.036.314-1.036.869 0 .265.194.613.543.687l1.023.228c.869.195 1.628.543 1.628 1.594.006 1.168-1.033 1.723-2.093 1.723"></path>
            </svg>
            <div className="flex flex-col select-none">
              <span className="text-[8px] font-bold text-google-grey tracking-wider uppercase leading-none">
                Sector 69, Mohali
              </span>
              <span className="text-[6.5px] text-[#202124] font-semibold leading-none mt-1 opacity-60">
                (formerly SRL Diagnostics)
              </span>
            </div>
          </div>

          {/* GMB live status widget */}
          <div className="hidden lg:flex items-center gap-2 bg-srl-blue/5 border border-srl-blue/10 px-3.5 py-1.5 rounded-full select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-bold text-srl-blue uppercase tracking-widest leading-none">
              Zero wait time • 3 Phlebotomists Active
            </span>
          </div>

          {/* GMB Search Input Card */}
          <div ref={searchRef} className="relative hidden md:block flex-1 max-w-md">
            <div className="flex items-center bg-white border border-[#dadce0] rounded-full px-4 py-2 hover:shadow-md focus-within:shadow-md transition-shadow">
              <Search className="w-4 h-4 text-google-grey mr-3" />
              <input
                type="text"
                placeholder="Search Agilus Diagnostics (formerly SRL) Mohali..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchSuggestions(true);
                }}
                onFocus={() => setShowSearchSuggestions(true)}
                className="w-full bg-transparent border-none outline-none text-sm text-[#202124] placeholder-google-grey"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="p-1 hover:bg-google-light-grey rounded-full">
                  <X className="w-3.5 h-3.5 text-google-grey" />
                </button>
              )}
            </div>

            {/* Suggestions dropdown */}
            <AnimatePresence>
              {showSearchSuggestions && filteredSuggestions.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-white border border-[#dadce0] rounded-2xl shadow-xl z-50 overflow-hidden"
                >
                  {filteredSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (item.isTestDetail) {
                          navigate(`/tests/${encodeURIComponent(item.name)}`);
                        } else {
                          setActiveTab(item.tab);
                          if (item.tab === "services" && item.name !== "Full Body Checkup") {
                            setExpandedCategory(item.name);
                          }
                        }
                        setShowSearchSuggestions(false);
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-google-light-grey flex items-center gap-3 transition-colors border-b border-google-border last:border-0"
                    >
                      {item.isTestDetail ? (
                        <FlaskConical className="w-4 h-4 text-srl-blue shrink-0 animate-pulse" />
                      ) : (
                        <MapPin className="w-4 h-4 text-srl-blue shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-[#202124]">{item.name}</p>
                        <p className="text-xs text-google-grey">{item.subtext}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Global Navigation CTAs */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleDownloadPDF} 
            className="text-xs font-bold text-srl-blue bg-srl-blue/5 hover:bg-srl-blue/10 px-4 py-2.5 rounded-full border border-srl-blue/20 transition-all flex items-center gap-1.5 active:scale-95 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF Catalog</span>
          </button>
          <button 
            onClick={() => openBookingForTest("")}
            className="text-xs font-black bg-srl-blue hover:bg-[#00376e] text-white px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-1.5"
          >
            <ClipboardCheck className="w-3.5 h-3.5 text-srl-gold" />
            <span>Book Dispatch</span>
          </button>
        </div>
      </header>

      {/* 3. Split Layout Grid (Optimized for Mobile/Desktop layout split) */}
      <main className="flex-1 flex overflow-hidden w-full relative">
        
        {/* ========================================================
            COLUMN 1: Google Business Profile Panel (Sticky/Desktop Left)
           ======================================================== */}
        <aside ref={leftSidebarRef} className="w-full lg:w-[400px] bg-white h-full border-r border-[#dadce0]/50 flex flex-col shrink-0 overflow-y-auto no-scrollbar relative z-10">
          
          {/* Cover Gallery Swiper */}
          <div className="w-full aspect-[16/10] relative bg-google-light-grey overflow-hidden group shrink-0">
            <Swiper
              modules={[Autoplay, SwiperNavigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="w-full h-full"
            >
              {placePhotos.map((url, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={url}
                    alt={`Agilus Diagnostics Lab Mohali Sector 69 photo ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full border border-white/20 select-none">
              Agilus Diagnostics Mohali
            </div>
            <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-[#202124] text-[10px] font-bold px-3 py-1.5 rounded-full shadow border border-google-border flex items-center gap-1 select-none">
              <Sparkles className="w-3 h-3 text-srl-blue" />
              <span>GMB Verified Partner</span>
            </div>
          </div>

          {/* Business Profile Identity Card */}
          <div className="p-5 border-b border-[#dadce0]/50">
            <h1 className="text-xl font-black text-srl-blue mb-1 leading-tight tracking-tight flex items-center gap-1.5">
              <span>Agilus Diagnostics Mohali</span>
              <CheckCircle2 className="w-4.5 h-4.5 text-srl-blue shrink-0 fill-srl-blue/10" />
            </h1>
            <p className="text-xs font-bold text-srl-gold mb-3 uppercase tracking-wider">
              Pathology Lab & Home Collection Partner
            </p>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold text-srl-gold">4.9</span>
              <div className="flex items-center gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-srl-gold text-srl-gold" />
                ))}
                <StarHalf className="w-3.5 h-3.5 fill-srl-gold text-srl-gold" />
              </div>
              <span className="text-[11px] font-bold text-srl-blue hover:underline cursor-pointer" onClick={() => {
                setActiveTab("reviews");
                const clinicalHub = document.getElementById("clinical-hub-center");
                if (clinicalHub) {
                  clinicalHub.scrollTo({ top: 900, behavior: "smooth" });
                }
              }}>
                438 Google reviews
              </span>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-google-grey">
              <span>Diagnostics Center</span>
              <span>•</span>
              <span className="text-emerald-600 font-bold">Open 24/7 Dispatch</span>
              <span>•</span>
              <span>Closes 8 PM (Center)</span>
            </div>
          </div>

          {/* GMB Round Action Buttons Row */}
          <div className="px-4 py-3.5 border-b border-[#dadce0]/50 flex justify-between gap-1 bg-white select-none shrink-0">
            <button onClick={handleDirection} className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-9 h-9 rounded-2xl bg-srl-blue/5 hover:bg-srl-blue hover:text-white flex items-center justify-center text-srl-blue transition-all border border-srl-blue/10 active:scale-90">
                <Navigation className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-srl-blue uppercase tracking-wider group-hover:underline">Directions</span>
            </button>

            <button onClick={handleCall} className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-9 h-9 rounded-2xl bg-srl-blue/5 hover:bg-srl-blue hover:text-white flex items-center justify-center text-srl-blue transition-all border border-srl-blue/10 active:scale-90">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-srl-blue uppercase tracking-wider group-hover:underline">Call</span>
            </button>

            <button onClick={handleWhatsApp} className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-9 h-9 rounded-2xl bg-emerald-500/5 hover:bg-emerald-500 hover:text-white flex items-center justify-center text-emerald-600 transition-all border border-emerald-500/10 active:scale-90">
                <Smartphone className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-wider group-hover:underline">WhatsApp</span>
            </button>

            <button onClick={() => setIsSaved(!isSaved)} className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all border active:scale-90 ${isSaved ? "bg-srl-gold/10 border-srl-gold text-srl-gold" : "bg-srl-blue/5 hover:bg-srl-blue hover:text-white border-srl-blue/10 text-srl-blue"}`}>
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-srl-gold" : ""}`} />
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-wider group-hover:underline ${isSaved ? "text-srl-gold" : "text-srl-blue"}`}>
                {isSaved ? "Saved" : "Save"}
              </span>
            </button>

            <button onClick={handleShare} className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-9 h-9 rounded-2xl bg-srl-blue/5 hover:bg-srl-blue hover:text-white flex items-center justify-center text-srl-blue transition-all border border-srl-blue/10 active:scale-90">
                {isCopied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
              </div>
              <span className="text-[9px] font-bold text-srl-blue uppercase tracking-wider group-hover:underline">
                {isCopied ? "Copied" : "Share"}
              </span>
            </button>
          </div>

          {/* Business Detailed Specifications list */}
          <div className="p-5 border-b border-[#dadce0]/50 space-y-4 text-xs">
            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-google-grey mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-[#202124] font-medium leading-normal">
                  Booth No. 12, GMADA Market, Sector 69, Mohali, Punjab 160069
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <button onClick={copyAddress} className="text-[10px] font-bold text-srl-blue flex items-center gap-1 hover:underline">
                    <Copy className="w-3 h-3" />
                    <span>Copy Address</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Operating Hours dropdown */}
            <div className="flex items-start gap-3 border-t border-[#dadce0]/50 pt-3">
              <Clock className="w-4 h-4 text-google-grey mt-0.5 shrink-0" />
              <div className="flex-1">
                <button
                  onClick={() => setIsHoursExpanded(!isHoursExpanded)}
                  className="flex items-center gap-1.5 text-[#202124] font-medium hover:underline text-left"
                >
                  <span className="text-emerald-600 font-bold">Open</span>
                  <span>• Closes 8:00 PM</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-google-grey transition-transform duration-300 ${isHoursExpanded ? "rotate-180" : ""}`} />
                </button>
                
                <AnimatePresence>
                  {isHoursExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-2 text-[10px] text-google-grey space-y-1.5 max-w-xs bg-google-light-grey p-2.5 rounded-xl border border-google-border"
                    >
                      {[
                        { day: "Monday", hours: "7:00 AM – 8:00 PM" },
                        { day: "Tuesday", hours: "7:00 AM – 8:00 PM" },
                        { day: "Wednesday", hours: "7:00 AM – 8:00 PM" },
                        { day: "Thursday", hours: "7:00 AM – 8:00 PM" },
                        { day: "Friday", hours: "7:00 AM – 8:00 PM" },
                        { day: "Saturday", hours: "7:00 AM – 8:00 PM" },
                        { day: "Sunday", hours: "7:00 AM – 2:00 PM" },
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between font-medium">
                          <span className="font-bold text-[#202124]">{item.day}</span>
                          <span>{item.hours}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3 border-t border-[#dadce0]/50 pt-3">
              <Phone className="w-4 h-4 text-google-grey mt-0.5 shrink-0" />
              <div>
                <a href="tel:9115459115" className="text-srl-blue font-bold hover:underline text-sm">
                  091154 59115
                </a>
                <p className="text-[10px] text-google-grey mt-0.5">Call for Free Home Collection Booking</p>
              </div>
            </div>

            {/* Accreditations summary */}
            <div className="flex items-start gap-3 border-t border-[#dadce0]/50 pt-3">
              <Award className="w-4 h-4 text-srl-gold mt-0.5 shrink-0" />
              <div>
                <p className="text-[#202124] font-medium">NABL Accredited & ISO Certified Laboratory</p>
                <p className="text-[10px] text-google-grey mt-0.5">Certified Clinical Grade Diagnostics</p>
              </div>
            </div>
          </div>

          {/* Sticky Tab Navigation Row (For Mobile Viewport redirection) */}
          <div className="sticky top-0 bg-white border-b border-google-border z-20 flex overflow-x-auto no-scrollbar shrink-0 select-none shadow-sm lg:hidden">
            {(["overview", "packages", "services", "tests", "reviews", "qa", "about"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 shrink-0 transition-colors ${
                  activeTab === tab 
                    ? "border-srl-blue text-srl-blue font-black" 
                    : "border-transparent text-google-grey hover:text-google-dark"
                }`}
              >
                {tab === "qa" ? "Q&A" : tab === "tests" ? "Tests & Prices" : tab === "packages" ? "Wellness Packages" : tab}
              </button>
            ))}
          </div>

          {/* Mobile-Only dynamic content wrapper */}
          <div className="flex-1 bg-white p-5 space-y-6 pb-24 lg:hidden">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-bold text-[#202124] uppercase tracking-wider mb-2">About Agilus Diagnostics</h3>
                  <p className="text-xs text-google-grey leading-relaxed">
                    Agilus Diagnostics Mohali (Sector 69 Center - formerly SRL Diagnostics) is Sahibzada Ajit Nagar's premier pathology clinic. We offer a high-quality clinical diagnostic portfolio comprising blood test screening, corporate wellness checks, molecular genetics testing, and full-spectrum pathology under stringent NABL standards.
                  </p>
                </div>
                {/* Free Home collection alert promo */}
                <div className="bg-srl-blue/5 border border-srl-blue/10 rounded-2xl p-4 flex gap-3">
                  <Percent className="w-5 h-5 text-srl-gold shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="text-xs font-bold text-[#202124]">Free Home Sample Collection Today</h4>
                    <p className="text-[10px] text-google-grey mt-1">Get sterile sample extraction in Sector 69 and nearby sectors in Mohali. Flat 15% off first booking.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "packages" && renderPackagesHub()}

            {activeTab === "services" && (
              <div className="space-y-3">
                {serviceCategories.map((category, index) => {
                  const isOpen = expandedCategory === category.name;
                  return (
                    <div key={index} className="border border-google-border rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => setExpandedCategory(isOpen ? null : category.name)}
                        className="w-full text-left p-3.5 flex items-center justify-between bg-google-light-grey/40"
                      >
                        <span className="text-xs font-bold text-srl-blue">{category.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="p-3 border-t border-google-border/50 space-y-2">
                          {category.tests.map((test, tIdx) => (
                            <div key={tIdx} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                              <div className="flex-1 cursor-pointer" onClick={() => navigate(`/tests/${encodeURIComponent(test.name)}`)}>
                                <p className="font-semibold text-[#202124] hover:text-srl-blue hover:underline flex items-center gap-1">
                                  <span>{test.name}</span>
                                  <Sparkles className="w-3 h-3 text-srl-gold shrink-0" />
                                </p>
                                <span className="text-[9px] text-google-grey">TAT: {test.tat} • Click to view details</span>
                              </div>
                              <button onClick={() => openBookingForTest(test.name)} className="text-[9px] font-black bg-srl-blue text-white px-2.5 py-1 rounded-md ml-2 shrink-0">
                                Book
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "tests" && (
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-google-grey absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search 30+ clinical tests..."
                    value={testSearchQuery}
                    onChange={(e) => setTestSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 border border-google-border rounded-xl text-xs outline-none focus:border-srl-blue focus:ring-1 focus:ring-srl-blue/10 bg-white"
                  />
                  {testSearchQuery && (
                    <button 
                      onClick={() => setTestSearchQuery("")}
                      className="absolute right-3 top-2.5 text-xs text-google-grey hover:text-srl-blue font-bold"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="max-h-[500px] overflow-y-auto space-y-2.5 pr-1 no-scrollbar">
                  {filteredTests.length > 0 ? (
                    filteredTests.map((test, index) => (
                      <div key={index} className="border border-google-border/70 rounded-xl p-3 bg-slate-50/50 space-y-1.5 hover:border-srl-blue/30 transition-colors">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1 cursor-pointer" onClick={() => navigate(`/tests/${encodeURIComponent(test.name)}`)}>
                            <span className="text-[8px] font-black text-google-grey uppercase tracking-widest block hover:underline">Code: {test.code}</span>
                            <p className="text-xs font-bold text-[#202124] leading-snug hover:text-srl-blue hover:underline flex items-center gap-1">
                              <span>{test.name}</span>
                              <Sparkles className="w-3.5 h-3.5 text-srl-gold shrink-0" />
                            </p>
                            <span className="text-[9px] text-srl-blue font-semibold block mt-0.5">Click to view details</span>
                          </div>
                          <span className="text-[10px] font-mono text-srl-gold font-bold whitespace-nowrap bg-srl-gold/10 px-2 py-0.5 rounded-md border border-srl-gold/20">₹{test.mrp}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[9px] text-google-grey border-t border-google-border/30 pt-1.5">
                          <p><span className="font-bold text-[#202124]">Method:</span> {test.method}</p>
                          <p><span className="font-bold text-[#202124]">TAT:</span> {test.tat}</p>
                          <p className="col-span-2"><span className="font-bold text-[#202124]">Sample:</span> {test.sample}</p>
                          <p className="col-span-2"><span className="font-bold text-[#202124]">Preparation:</span> {test.preparation}</p>
                        </div>
                        <button onClick={() => openBookingForTest(test.name)} className="w-full bg-srl-blue hover:bg-[#00376e] text-white text-[10px] font-black py-2 rounded-xl mt-1.5 transition-all">
                          Book Sample Collection
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-google-grey text-center py-6">No clinical tests match your search.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <button onClick={handleGMBReviewRedirect} className="w-full py-2 border border-srl-blue text-srl-blue text-xs font-bold rounded-xl flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-srl-blue" />
                  <span>Write Google Review</span>
                </button>
                {allReviews.map((rev, index) => (
                  <div key={index} className="border border-google-border rounded-xl p-3">
                    <p className="text-xs font-bold text-[#202124]">{rev.name}</p>
                    <p className="text-[10px] text-google-grey mt-1">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "qa" && (
              <div className="space-y-3">
                {patientQueries.map((faq, index) => (
                  <div key={index} className="border border-google-border rounded-xl p-3">
                    <p className="text-xs font-bold text-[#202124]">Q: {faq.q}</p>
                    <p className="text-[10px] text-google-grey mt-1">A: {faq.a}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "about" && (
              <div className="space-y-4 text-xs text-google-grey">
                <p>NABL Accreditation & ISO Certified diagnostic protocols followed at Agilus Diagnostics Mohali.</p>
                <div className="aspect-video bg-google-light-grey rounded-xl overflow-hidden relative">
                  <img src="https://lh3.googleusercontent.com/p/AF1QipPhNppeDZ5NwpOBL8s6XoZYDjD6idQNb7DMo3m4=w1200-h800-p-k-no" alt="Clinical Room" className="w-full h-full object-cover" />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ========================================================
            COLUMN 2: Modern Clinical Hub & DEKSTOP FORM (Desktop Center)
           ======================================================== */}
        <section id="clinical-hub-center" className="hidden lg:flex flex-1 h-full overflow-y-auto bg-premium-gradient p-6 space-y-6 flex-col no-scrollbar thin-scrollbar">
          
          {/* ============================================================
              PREMIUM HERO SECTION - Full conversion-focused desktop banner
          ============================================================ */}
          <div className="hero-dark-bg rounded-3xl p-8 shadow-deep relative overflow-hidden group">
            {/* Decorative glow blobs */}
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-srl-gold/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-agilus-green/6 rounded-full blur-3xl pointer-events-none" />
            
            {/* Header row */}
            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2">
                <span className="chip-gold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span>2050 Premium GMB Experience</span>
                </span>
              </div>
              <span className="text-[9px] font-black text-emerald-300 bg-emerald-900/30 border border-emerald-500/30 px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                Live · NABL Lab #12
              </span>
            </div>

            {/* Main headline */}
            <div className="mt-5 relative z-10">
              <h2 className="text-3xl font-black text-white leading-[1.15] tracking-tight">
                Agilus Diagnostics Mohali
                <span className="block text-srl-gold mt-1">Sector 69 Premier Hub</span>
              </h2>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed max-w-xl font-medium">
                Punjab's most trusted pathology chain — formerly SRL Diagnostics — now reimagined as{" "}
                <span className="text-white font-bold">Agilus Diagnostics</span>. NABL accredited, home collection certified, 
                and 24-hour report delivery. Book in 30 seconds.
              </p>
            </div>

            {/* Stat chips row */}
            <div className="grid grid-cols-4 gap-3 mt-6 relative z-10">
              {[
                { label: "Google Reviews", value: "438", icon: <Star className="w-4 h-4 text-srl-gold fill-srl-gold" />, sub: "4.9 ★ avg" },
                { label: "Tests Available", value: "1500+", icon: <TestTube className="w-4 h-4 text-agilus-green" />, sub: "NABL certified" },
                { label: "Home Collections", value: "Daily", icon: <HomeIcon className="w-4 h-4 text-sky-400" />, sub: "Free in Sector 69" },
                { label: "Report TAT", value: "12-24h", icon: <Timer className="w-4 h-4 text-srl-gold" />, sub: "WhatsApp PDF" },
              ].map((stat, idx) => (
                <div key={idx} className="stat-chip hover:bg-white/15 transition-colors duration-200 cursor-default">
                  <div className="flex items-center gap-1.5 mb-1">
                    {stat.icon}
                    <span className="text-sm font-black">{stat.value}</span>
                  </div>
                  <span className="text-[9px] font-bold text-white/60 uppercase tracking-wider block text-center">{stat.label}</span>
                  <span className="text-[9px] text-srl-gold font-bold mt-0.5">{stat.sub}</span>
                </div>
              ))}
            </div>

            {/* Trust badges + CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 relative z-10">
              <div className="flex flex-wrap gap-2">
                {["NABL Accredited", "CAP Legacy", "ISO 15189", "Free Home Collection"].map((badge) => (
                  <span key={badge} className="text-[9px] font-bold text-white/70 bg-white/8 border border-white/12 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Check className="w-2.5 h-2.5 text-agilus-green" />
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="https://wa.me/919115459115?text=Hi%20Agilus%20Diagnostics%2C%20I%20want%20to%20book%20a%20home%20collection%20in%20Mohali%20Sector%2069"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-[11px] py-2.5 px-5 rounded-xl"
                >
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                  WhatsApp Now
                </a>
                <button
                  onClick={() => openBookingForTest("")}
                  className="text-[11px] font-black text-srl-blue bg-srl-gold hover:bg-srl-gold-dark py-2.5 px-5 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-lg active:scale-95"
                >
                  <ClipboardCheck className="w-3.5 h-3.5" />
                  Book Dispatch
                </button>
              </div>
            </div>
          </div>

          {/* ========================================================
              DEDICATED INLINE DESKTOP BOOKING FORM
             ======================================================== */}
          <div 
            id="desktop-booking-form" 
            className="section-card p-6 relative transition-all duration-300 hover:shadow-lift border border-[#dadce0]/60"
          >
            {/* Gradient accent top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-srl-blue via-srl-gold to-agilus-green rounded-t-3xl" />
            
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-base font-black text-srl-blue flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-srl-gold fill-srl-gold/10" />
                  <span>Instant Home Dispatch Scheduler</span>
                </h3>
                <p className="text-xs text-google-grey">Book sterile phlebotomy collection directly from this terminal.</p>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
                Live Dispatches Active
              </span>
            </div>

            {bookingStatus === "success" ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-200">
                  <Check className="w-7 h-7 text-emerald-600" />
                </div>
                <h4 className="text-lg font-black text-srl-blue mb-1">Appointment Dispatch Scheduled!</h4>
                <p className="text-xs text-google-grey mb-6 max-w-sm mx-auto">
                  We are now redirecting you to WhatsApp to instantly coordinate the sample collection time slot.
                </p>
                <button
                  onClick={closeBooking}
                  className="bg-srl-blue hover:bg-[#00376e] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow transition-colors"
                >
                  Schedule Another Test
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-srl-blue uppercase tracking-wider flex items-center gap-1">
                      <span>Full Name *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="John Doe"
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border outline-none text-xs transition-all bg-white/70 ${formErrors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      <Sparkles className="w-3.5 h-3.5 text-google-grey absolute left-3 top-3.5" />
                    </div>
                    {formErrors.name && <p className="text-[9px] text-red-500 font-bold">{formErrors.name}</p>}
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-srl-blue uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="9115459115"
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border outline-none text-xs transition-all bg-white/70 ${formErrors.phone ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <Phone className="w-3.5 h-3.5 text-google-grey absolute left-3 top-3.5" />
                    </div>
                    {formErrors.phone && <p className="text-[9px] text-red-500 font-bold">{formErrors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {/* Test selection dropdown selector */}
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-srl-blue uppercase tracking-wider">
                      Select Test or Package *
                    </label>
                    <div className="relative">
                      <select
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border outline-none text-xs transition-all bg-white/70 border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue appearance-none"
                        value={selectedTestForBooking}
                        onChange={(e) => setSelectedTestForBooking(e.target.value)}
                      >
                        <option value="">Select test or package (Optional)</option>
                        <optgroup label="Wellness Packages">
                          {packagesData.map((pkg, idx) => (
                            <option key={idx} value={pkg.title}>{pkg.title} ({pkg.price})</option>
                          ))}
                        </optgroup>
                        <optgroup label="Clinical Pathology Tests">
                          {testMenu.map((test, idx) => (
                            <option key={idx} value={test.name}>{test.name} (₹{test.mrp})</option>
                          ))}
                        </optgroup>
                      </select>
                      <FlaskConical className="w-3.5 h-3.5 text-google-grey absolute left-3 top-3.5" />
                      <ChevronDown className="w-3.5 h-3.5 text-google-grey absolute right-3 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Email address optional */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-srl-blue uppercase tracking-wider">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border outline-none text-xs transition-all bg-white/70 border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Date field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-srl-blue uppercase tracking-wider">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none text-xs transition-all bg-white/70 ${formErrors.date ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                    {formErrors.date && <p className="text-[9px] text-red-500 font-bold">{formErrors.date}</p>}
                  </div>

                  {/* Time field */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-srl-blue uppercase tracking-wider">
                      Time Slot *
                    </label>
                    <select
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none text-xs transition-all bg-white/70 ${formErrors.time ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    >
                      <option value="">Select slot</option>
                      <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM</option>
                      <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                      <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                      <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                      <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                    </select>
                    {formErrors.time && <p className="text-[9px] text-red-500 font-bold">{formErrors.time}</p>}
                  </div>
                </div>

                {/* Quick Selection Pills */}
                <div className="pt-2 select-none">
                  <span className="text-[9px] font-bold text-google-grey uppercase tracking-wider block mb-2">Quick selector pills:</span>
                  <div className="flex flex-wrap gap-2">
                    {["Full Body Checkup", "Thyroid Profile", "Diabetes Screening", "Lipid Profile", "Vitamin D3 Test"].map((pill) => (
                      <button
                        key={pill}
                        type="button"
                        onClick={() => setSelectedTestForBooking(pill)}
                        className={`text-[9px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                          selectedTestForBooking === pill
                            ? "bg-srl-gold/15 border-srl-gold text-srl-blue font-black"
                            : "bg-white border-google-border text-google-grey hover:border-srl-blue hover:text-srl-blue"
                        }`}
                      >
                        {pill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={bookingStatus === "submitting"}
                  className="w-full bg-srl-blue hover:bg-[#00376e] text-white py-3.5 rounded-2xl font-black text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 glow-blue hover:glow-gold"
                >
                  {bookingStatus === "submitting" ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Verifying Dispatch Protocols...</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4 text-srl-gold" />
                      <span>Book Appointment via WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Wellness Packages comparing list */}
          {renderPackagesHub()}

          {/* Interactive Pathology Services Grid */}
          <div className="section-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-srl-blue flex items-center gap-2">
                  <MicroscopeIcon className="w-5 h-5 text-srl-gold" />
                  <span>Clinical Test Portfolio By Category</span>
                </h3>
                <p className="text-xs text-google-grey mt-0.5">Click any category to expand pricing, TAT & specimen requirements.</p>
              </div>
              <span className="chip-blue">{serviceCategories.length} Categories</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {serviceCategories.map((category, idx) => {
                const isOpen = expandedCategory === category.name;
                const bgColors = ["bg-sky-50","bg-indigo-50","bg-emerald-50","bg-violet-50","bg-rose-50","bg-amber-50"];
                return (
                  <div key={idx} className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                    isOpen ? "border-srl-blue/40 shadow-card" : "border-[#dadce0]/60 hover:border-srl-blue/30"
                  }`}>
                    <button
                      onClick={() => setExpandedCategory(isOpen ? null : category.name)}
                      className={`w-full text-left p-4 flex items-center justify-between transition-colors ${
                        isOpen ? "bg-srl-blue/5" : "bg-slate-50/60 hover:bg-slate-100/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${bgColors[idx % bgColors.length]} border border-current/10`}>
                          {renderIcon(category.icon)}
                        </div>
                        <div>
                          <span className="text-xs font-bold text-[#202124] block">{category.name}</span>
                          <span className="text-[9px] text-google-grey">{category.tests.length} tests</span>
                        </div>
                      </div>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180 text-srl-blue" : "text-google-grey"}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3 bg-white space-y-2 border-t border-[#dadce0]/40">
                        <p className="text-[10px] text-google-grey mb-2 leading-relaxed">{category.description}</p>
                        {category.tests.map((test, tIdx) => (
                          <div key={tIdx} className="flex justify-between items-center text-[11px] p-2.5 bg-slate-50/80 rounded-xl hover:bg-slate-100 transition-colors">
                            <div className="flex-1 cursor-pointer" onClick={() => navigate(`/tests/${encodeURIComponent(test.name)}`)}>
                              <p className="font-bold text-[#202124] hover:text-srl-blue hover:underline transition-colors">{test.name}</p>
                              <span className="text-[9px] text-google-grey">TAT: {test.tat} • Tap to view</span>
                            </div>
                            <div className="flex items-center gap-2 ml-2 shrink-0">
                              <span className="font-mono text-srl-blue font-black text-xs bg-srl-blue/5 px-2 py-0.5 rounded-lg">{test.price}</span>
                              <button onClick={() => openBookingForTest(test.name)} className="text-[9px] bg-srl-blue text-white px-2.5 py-1.5 rounded-lg font-bold hover:bg-srl-blue-dark transition-colors active:scale-95">
                                Book
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Clinical Test Directory with Real-time Search */}
          <div className="section-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-base font-black text-srl-blue flex items-center gap-2">
                  <Search className="w-5 h-5 text-srl-gold" />
                  <span>Clinical Pathology Test Directory</span>
                </h3>
                <p className="text-xs text-google-grey">Search and filter our complete test menu of certified clinical assays.</p>
              </div>
              
              {/* Real-time search bar */}
              <div className="relative w-full sm:w-72 shrink-0">
                <Search className="w-4 h-4 text-google-grey absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search by test name or code..."
                  value={testSearchQuery}
                  onChange={(e) => setTestSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2 border border-google-border rounded-xl text-xs outline-none focus:border-srl-blue focus:ring-2 focus:ring-srl-blue/10 bg-slate-50 hover:bg-slate-100/50 transition-colors"
                />
                {testSearchQuery && (
                  <button
                    onClick={() => setTestSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-google-grey hover:text-srl-blue font-bold"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3 no-scrollbar">
              {filteredTests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredTests.map((test, index) => (
                    <div 
                      key={index} 
                      className="border border-google-border/60 hover:border-srl-blue/30 rounded-2xl p-4 bg-slate-50/30 hover:bg-white transition-all flex flex-col justify-between hover:shadow-sm"
                    >
                      <div>
                        <div className="flex justify-between items-start gap-2 mb-2">
                          <div className="pr-2">
                            <span className="text-[9px] font-black text-google-grey uppercase tracking-widest block">Code: {test.code}</span>
                            <h4 className="text-xs font-black text-[#202124] leading-snug">{test.name}</h4>
                          </div>
                          <span className="text-xs font-mono text-srl-gold font-bold bg-srl-gold/10 border border-srl-gold/20 px-2 py-0.5 rounded-lg whitespace-nowrap">₹{test.mrp}</span>
                        </div>
                        
                        <div className="space-y-1.5 text-[10px] text-google-grey border-t border-google-border/40 pt-2 mb-4">
                          <p><span className="font-bold text-[#202124]">Methodology:</span> {test.method}</p>
                          <p><span className="font-bold text-[#202124]">Specimen Requirement:</span> {test.sample}</p>
                          <p><span className="font-bold text-[#202124]">Patient Preparation:</span> {test.preparation}</p>
                          <p><span className="font-bold text-[#202124]">Turnaround Time:</span> {test.tat}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => openBookingForTest(test.name)}
                        className="w-full bg-srl-blue hover:bg-[#00376e] text-white py-2 rounded-xl text-xs font-bold transition-all active:scale-95 text-center flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-srl-gold" />
                        <span>Select Test</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-google-border/60 rounded-2xl bg-slate-50/20">
                  <HelpCircle className="w-8 h-8 text-google-grey mx-auto mb-2 opacity-50" />
                  <p className="text-xs font-bold text-google-grey">No matching clinical tests found</p>
                  <p className="text-[10px] text-google-grey mt-0.5">Try searching with a different term or test code.</p>
                </div>
              )}
            </div>
          </div>

          <div className="section-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-srl-blue flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-srl-gold" />
                  <span>Patient Query Solver &amp; GMB FAQs</span>
                </h3>
                <p className="text-xs text-google-grey mt-0.5">Real diagnostic queries answered by our medical team for Google-assisted decisions.</p>
              </div>
              <span className="chip-blue">{patientQueries.length} FAQs</span>
            </div>

            <div className="space-y-2">
              {patientQueries.map((item, idx) => {
                const isOpen = expandedQuery === idx;
                return (
                  <div key={idx} className="faq-item">
                    <button
                      onClick={() => setExpandedQuery(isOpen ? null : idx)}
                      className="faq-trigger"
                    >
                      <span className="text-xs font-bold text-[#202124] pr-4">{item.q}</span>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-250 ${isOpen ? "rotate-180 text-srl-blue" : "text-google-grey"}`} />
                    </button>
                    {isOpen && (
                      <div className="faq-content">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Patient reviews grid & Google review redirect button */}
          <div className="section-card p-6 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-black text-srl-blue flex items-center gap-2">
                  <Star className="w-5 h-5 text-srl-gold fill-srl-gold" />
                  <span>Real Patient Testimonials</span>
                </h3>
                <p className="text-xs text-google-grey mt-0.5">Authentic verified reviews from our Google Business Profile page.</p>
              </div>
              <button 
                onClick={handleGMBReviewRedirect}
                className="text-[11px] font-bold bg-srl-blue hover:bg-srl-blue-dark text-white px-4 py-2 rounded-xl transition-all shadow active:scale-95 flex items-center gap-1.5"
              >
                <Star className="w-3 h-3 fill-srl-gold text-srl-gold" />
                <span>Write Review</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {allReviews.slice(0, 4).map((rev, idx) => (
                <div key={idx} className="review-card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-[#202124] block">{rev.name}</span>
                      <span className="text-[9px] text-google-grey">{rev.date}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-srl-gold text-srl-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-google-grey italic leading-relaxed">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            COLUMN 3: Premium Maps Sidebar & 2050 HUD Overlay (Desktop Right)
           ======================================================== */}
        <section className="hidden lg:flex w-[350px] border-l border-[#dadce0]/50 bg-white h-full flex-col shrink-0 relative overflow-hidden">
          
          {/* Static Preview Map Iframe */}
          <div className="flex-1 w-full relative bg-[#e5e3df]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.730303867623!2d76.7127651768846!3d30.689318625902334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffd747970d1%3A0xe54dbe0db2df665c!2sSRL%20Lab%20Mohali%20-%20Home%20Collection!5e0!3m2!1sen!2sin!4v1716167812543!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sidebar Google Maps location"
            />
            
            {/* 2050 Live GMB HUD Monitor overlay */}
            <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-md border border-[#dadce0]/70 p-3 rounded-2xl shadow-lg select-none">
              <div className="flex items-center gap-1.5 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-srl-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-srl-gold"></span>
                </span>
                <span className="text-[9px] font-black text-srl-blue uppercase tracking-widest">
                  Live Dispatch Monitor
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px] text-google-grey font-bold">
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  <p className="text-[8px] uppercase tracking-wider text-google-grey">Center traffic</p>
                  <p className="text-[#202124] text-xs font-black">Clear (0 min wait)</p>
                </div>
                <div className="bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                  <p className="text-[8px] uppercase tracking-wider text-google-grey">Dispatches Today</p>
                  <p className="text-[#202124] text-xs font-black">12 Completed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Place card panel */}
          <div className="p-5 border-t border-[#dadce0]/50 bg-white shadow-lg space-y-3.5 shrink-0">
            <h3 className="text-sm font-black text-srl-blue leading-snug">
              Agilus Diagnostics Sector 69
            </h3>
            <p className="text-xs text-google-grey leading-relaxed">
              Booth No. 12, GMADA Market, Sector 69, Mohali, Punjab 160069
            </p>

            <div className="flex gap-2">
              <button 
                onClick={handleDirection}
                className="flex-1 bg-srl-blue hover:bg-[#00376e] text-white py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-1 border border-transparent"
              >
                <Navigation className="w-3.5 h-3.5 text-srl-gold" />
                <span>Directions</span>
              </button>
              <button 
                onClick={handleCall}
                className="flex-1 border border-[#dadce0] hover:bg-google-light-grey text-srl-blue py-2 rounded-xl text-xs font-bold transition-all active:scale-95 flex items-center justify-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-srl-gold" />
                <span>Call Lab</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#dadce0]/50 px-3 py-2 flex gap-2 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] pb-safe">
        <button 
          onClick={handleCall}
          className="flex-1 border border-[#dadce0] text-srl-blue py-3 rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all hover:bg-srl-blue/5 hover:border-srl-blue/30"
        >
          <Phone className="w-4 h-4 text-srl-blue" />
          <span className="font-bold text-[9px] uppercase tracking-wider">Call</span>
        </button>
        <button 
          onClick={handleDirection}
          className="flex-1 border border-[#dadce0] text-srl-blue py-3 rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all hover:bg-srl-blue/5 hover:border-srl-blue/30"
        >
          <Navigation className="w-4 h-4 text-srl-blue" />
          <span className="font-bold text-[9px] uppercase tracking-wider">Maps</span>
        </button>
        <a
          href="https://wa.me/919115459115?text=Hi%20Agilus%20Diagnostics%20Mohali%2C%20I%20need%20to%20book%20a%20test."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#25D366] text-white py-3 rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all"
        >
          <Smartphone className="w-4 h-4" />
          <span className="font-bold text-[9px] uppercase tracking-wider">WhatsApp</span>
        </a>
        <button 
          onClick={() => openBookingForTest("")}
          className="flex-[1.5] bg-srl-blue text-white py-3 rounded-2xl flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all shadow-md"
        >
          <ClipboardCheck className="w-4 h-4 text-srl-gold" />
          <span className="font-black text-[9px] uppercase tracking-widest">Book Now</span>
        </button>
      </div>

      {/* 5. Booking Modal (Reservation Dialogue for Mobile) */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBooking}
              className="absolute inset-0 bg-black/45 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden z-10"
            >
              <div className="bg-srl-blue p-6 text-white flex justify-between items-center border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold">Book Lab Appointment</h3>
                  <p className="text-white/80 text-xs mt-0.5">
                    Agilus Diagnostics Mohali • Sector 69 Center
                  </p>
                </div>
                <button
                  onClick={closeBooking}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {bookingStatus === "success" ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold mb-2 text-[#202124]">
                      Booking Confirmed!
                    </h4>
                    <p className="text-xs text-google-grey mb-8">
                      Our customer support team is redirecting you to WhatsApp to coordinate the collection slot.
                    </p>
                    <button
                      onClick={closeBooking}
                      className="w-full bg-srl-blue text-white py-3 rounded-xl font-bold text-xs"
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4" noValidate>
                    
                    {selectedTestForBooking && (
                      <div className="bg-srl-blue/5 p-4 rounded-xl border border-srl-blue/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black text-srl-blue uppercase tracking-wider block">Selected Test / Package</span>
                          <span className="text-xs font-bold text-[#202124]">{selectedTestForBooking}</span>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setSelectedTestForBooking("")}
                          className="text-[9px] font-bold text-google-grey hover:text-red-500 uppercase tracking-widest bg-white px-2 py-1 rounded border border-[#dadce0]"
                        >
                          Clear
                        </button>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-google-grey uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm transition-all ${formErrors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {formErrors.name && <p className="text-[10px] text-red-500 font-bold">{formErrors.name}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-google-grey uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="9115459115"
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm transition-all ${formErrors.phone ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      {formErrors.phone && <p className="text-[10px] text-red-500 font-bold">{formErrors.phone}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-google-grey uppercase tracking-wider">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none text-sm transition-all ${formErrors.email ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      {formErrors.email && <p className="text-[10px] text-red-500 font-bold">{formErrors.email}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-google-grey uppercase tracking-wider">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          className={`w-full px-4 py-2.5 rounded-xl border outline-none text-xs transition-all ${formErrors.date ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                        {formErrors.date && <p className="text-[10px] text-red-500 font-bold">{formErrors.date}</p>}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-google-grey uppercase tracking-wider">
                          Time Slot *
                        </label>
                        <select
                          className={`w-full px-4 py-2.5 rounded-xl border outline-none text-xs transition-all ${formErrors.time ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-google-border focus:ring-2 focus:ring-srl-blue/20 focus:border-srl-blue"}`}
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        >
                          <option value="">Select slot</option>
                          <option value="07:00 AM - 09:00 AM">07:00 AM - 09:00 AM</option>
                          <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
                          <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
                          <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
                          <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
                          <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
                        </select>
                        {formErrors.time && <p className="text-[10px] text-red-500 font-bold">{formErrors.time}</p>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={bookingStatus === "submitting"}
                      className="w-full bg-srl-blue hover:bg-[#00376e] text-white py-3 rounded-xl font-bold text-xs transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      {bookingStatus === "submitting" ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <span>Confirm & Open WhatsApp</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <Analytics />
    </div>
  );
}
