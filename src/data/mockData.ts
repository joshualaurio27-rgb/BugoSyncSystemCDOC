import { 
  AssistanceProgram, 
  AssistanceApplication, 
  ResidentUser, 
  NotificationItem,
  ComplaintItem,
  AnnouncementItem,
  ActivityLogItem,
  ArchiveItem
} from '../types';

export const BUGO_PUROKS = [
  'Zone 1 - Centro Riverside',
  'Zone 2 - Chapel Area',
  'Zone 3 - Suntingcahon Valley',
  'Zone 4 - Highway View',
  'Zone 5 - Lower Bugo Market',
  'Zone 6 - Upper Bugo Hills',
  'Zone 7 - Mangga Heights',
  'Zone 8 - Cogonan Plains',
  'Zone 9 - Bayside Coastal',
  'Zone 10 - San Miguel Industrial',
];

export const MONTHLY_INCOME_OPTIONS = [
  '₱0 (No Income / Dependent)',
  '₱5,000.00 (Below Minimum Wage / Indigent)',
  '₱8,500.00 (Informal / Low Income)',
  '₱10,000.00 (Minimum Wage Range)',
  '₱15,000.00',
  '₱20,000.00',
  '₱25,000.00',
  '₱30,000.00',
  '₱40,000.00',
  '₱50,000.00',
  '₱75,000.00',
  '₱100,000.00+'
];

export const NATIONALITY_OPTIONS = [
  'Filipino',
  'Dual Citizen (Filipino-Foreign)',
  'Naturalized Filipino',
  'American',
  'Japanese',
  'Korean',
  'Chinese',
  'Canadian',
  'Australian',
  'British',
  'Other Foreign National'
];

export const DEMO_ADMIN_USER: ResidentUser = {
  id: 'admin-juan-delacruz',
  name: 'Brgy. Bugo Admin',
  email: 'admin@bugo.gov.ph',
  username: 'bugo_admin',
  role: 'admin',
  contactNumber: '09171110000',
  purok: 'Zone 1 - Centro Riverside',
  address: 'Barangay Bugo Administrative Complex, Cagayan de Oro City',
  residentIdNumber: 'BG-ADMIN-001',
  isVerified: true,
  registrationStatus: 'Verified',
  registeredDate: '2020-01-01',
  nationality: 'Filipino',
  occupation: 'Barangay Administrator & Secretary'
};

export const DEMO_RESIDENT_USER: ResidentUser = {
  id: 'user-maria-santos',
  name: 'Maria Clara Santos',
  email: 'resident@bugo.gov.ph',
  username: 'mariasantos',
  role: 'resident',
  contactNumber: '09175554321',
  purok: 'Zone 3 - Suntingcahon Valley',
  address: 'Block 4 Lot 12, Suntingcahon Valley, Barangay Bugo, Cagayan de Oro City',
  residentIdNumber: 'BG-2026-04829',
  isVerified: true,
  registrationStatus: 'Verified',
  registeredDate: '2025-03-14',
  householdIncome: '₱8,500.00 (Informal / Low Income)',
  familyMembersCount: 4,
  nationality: 'Filipino',
  voterStatus: 'Registered',
  occupation: 'Self-Employed / Market Vendor',
  age: 34,
  gender: 'Female'
};

// Exactly 3 Sample Residents
export const INITIAL_RESIDENT_RECORDS: ResidentUser[] = [
  {
    id: 'user-maria-santos',
    name: 'Maria Clara Santos',
    email: 'resident@bugo.gov.ph',
    username: 'mariasantos',
    role: 'resident',
    contactNumber: '09175554321',
    purok: 'Zone 3 - Suntingcahon Valley',
    address: 'Block 4 Lot 12, Suntingcahon Valley, Bugo, CDO',
    residentIdNumber: 'BG-2026-04829',
    isVerified: true,
    registrationStatus: 'Verified',
    registeredDate: '2025-03-14',
    householdIncome: '₱8,500.00 (Informal / Low Income)',
    familyMembersCount: 4,
    nationality: 'Filipino',
    voterStatus: 'Registered',
    occupation: 'Self-Employed Vendor',
    age: 34,
    gender: 'Female'
  },
  {
    id: 'user-pedro-reyes',
    name: 'Pedro B. Reyes',
    email: 'pedro.reyes@yahoo.com',
    username: 'pedroreyes',
    role: 'resident',
    contactNumber: '09283337890',
    purok: 'Zone 1 - Centro Riverside',
    address: 'Riverside Lower Bugo, Cagayan de Oro City',
    residentIdNumber: 'BG-2026-01205',
    isVerified: true,
    registrationStatus: 'Verified',
    registeredDate: '2024-08-11',
    householdIncome: '₱5,000.00 (Below Minimum Wage / Indigent)',
    familyMembersCount: 2,
    nationality: 'Filipino',
    voterStatus: 'Registered',
    occupation: 'Senior Resident / Carpenter',
    age: 68,
    gender: 'Male'
  },
  {
    id: 'user-joshua-santos',
    name: 'Joshua C. Santos',
    email: 'joshua.santos@student.edu.ph',
    username: 'joshuasantos',
    role: 'resident',
    contactNumber: '09178881234',
    purok: 'Zone 3 - Suntingcahon Valley',
    address: 'Block 4 Lot 12, Suntingcahon Valley, Bugo, CDO',
    residentIdNumber: 'BG-2026-03319',
    isVerified: true,
    registrationStatus: 'Verified',
    registeredDate: '2025-09-02',
    householdIncome: '₱8,500.00 (Informal / Low Income)',
    familyMembersCount: 4,
    nationality: 'Filipino',
    voterStatus: 'Registered',
    occupation: 'College Student Scholar',
    age: 20,
    gender: 'Male'
  }
];

// Exactly 3 Sample Services
export const INITIAL_PROGRAMS: AssistanceProgram[] = [
  {
    id: 'prog-barangay-clearance',
    title: 'Barangay Clearance & Residency Certification',
    category: 'Clearance & Certification',
    tagline: 'Official administrative certification for employment, postal ID, bank transactions, and legal identification.',
    description: 'Fast-track digital clearance and residency verification issued by the Barangay Bugo Secretariat. Fill up the application form to request an official stamped document.',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=900',
    status: 'Active',
    badgeText: 'Active',
    deadline: 'Year-Round Service',
    targetAudience: 'All Registered Bugo Residents',
    processingTime: '1 - 2 Business Days',
    requirements: [
      'Valid Government ID or Student ID',
      'Proof of Residency (Minimum 6 months in Barangay Bugo)',
      'Specific Purpose statement (e.g. Employment, Bank, School requirement)'
    ],
    eligibilityCriteria: [
      'Bonafide resident residing within Zone 1 to Zone 10 of Barangay Bugo',
      'No pending unresolved blotter record or dispute with Lupon Tagapamayapa'
    ]
  },
  {
    id: 'prog-youth-scholarship',
    title: 'Barangay Educational Scholarship Grant',
    category: 'Education',
    tagline: 'Semester educational financial grant supporting college and senior high students from low-income families.',
    description: 'Financial assistance for tuition and school supplies to empower youth in Bugo. Apply online by filling up the resident registration form with academic proof.',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=900',
    status: 'Open',
    badgeText: 'Open for Applications',
    deadline: 'November 30, 2026',
    targetAudience: 'Senior High School & College Students',
    processingTime: '3 - 5 Business Days',
    requirements: [
      'Certificate of Matriculation or Enrollment Form',
      'Certified Copy of Grades (GWA 83% or higher)',
      'Barangay Certificate of Indigency or Income Statement',
      'Student ID and Parent/Guardian Valid ID'
    ],
    eligibilityCriteria: [
      'Enrolled in an accredited educational institution',
      'Resident of Barangay Bugo for at least 1 year',
      'Household monthly income not exceeding ₱15,000'
    ]
  },
  {
    id: 'prog-medical-subsidy',
    title: 'Medical Assistance & Health Subsidy',
    category: 'Medical',
    tagline: 'Healthcare support and maintenance medicine subsidy for senior citizens, PWDs, and indigent patients.',
    description: 'Direct medical aid reimbursement or health center prescription assistance for urgent diagnostics, laboratory tests, and maintenance medicines.',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=900',
    status: 'Active',
    badgeText: 'Ongoing',
    deadline: 'Rolling Basis (Year-Round)',
    targetAudience: 'Seniors (60+), PWDs, and Indigent Patients',
    processingTime: '2 - 3 Business Days',
    requirements: [
      'Medical Prescription or Clinical Abstract (dated within last 60 days)',
      'Barangay Indigency Slip or Health Center Referral',
      'Senior Citizen OSCA ID or PWD ID or Valid Resident ID',
      'Official Pharmacy / Hospital Billing Estimate'
    ],
    eligibilityCriteria: [
      'Resident of Barangay Bugo',
      'Diagnosed illness or chronic maintenance condition needing support'
    ]
  }
];

// Exactly 3 Sample Applications
export const INITIAL_APPLICATIONS: AssistanceApplication[] = [
  {
    id: 'app-001',
    referenceCode: 'BUG-2026-8941',
    programId: 'prog-youth-scholarship',
    programTitle: 'Barangay Educational Scholarship Grant',
    programCategory: 'Education',
    applicantId: 'user-maria-santos',
    applicantName: 'Maria Clara Santos (for Joshua Santos)',
    contactNumber: '0917 555 4321',
    email: 'resident@bugo.gov.ph',
    purok: 'Zone 3 - Suntingcahon Valley',
    address: 'Block 4 Lot 12, Suntingcahon Valley, Bugo, CDO',
    householdMonthlyIncome: '₱8,500.00',
    familyMembersCount: 4,
    occupation: 'Self-Employed Vendor',
    purposeOrDiagnosis: '2nd Year BS Computer Science college tuition and books allowance support.',
    requestedAmount: '₱6,000.00',
    approvedAmount: '₱6,000.00',
    status: 'Approved',
    submissionDate: '2026-08-20',
    lastUpdated: '2026-08-28',
    priorityScore: 'High',
    evaluatorNotes: 'Grades and enrollment verified by Education Committee. Approved by Punong Barangay.',
    timeline: [
      {
        status: 'Submitted',
        timestamp: 'Aug 20, 2026 • 10:15 AM',
        officerName: 'Portal Online System',
        remarks: 'Application and academic requirements received.'
      },
      {
        status: 'Under Review',
        timestamp: 'Aug 22, 2026 • 02:30 PM',
        officerName: 'Desk Officer Elena',
        remarks: 'Documents evaluated and submitted to Social Services.'
      },
      {
        status: 'Documents Verified',
        timestamp: 'Aug 25, 2026 • 11:00 AM',
        officerName: 'Kagawad on Education',
        remarks: 'Enrollment certificate confirmed.'
      },
      {
        status: 'Approved',
        timestamp: 'Aug 28, 2026 • 04:15 PM',
        officerName: 'Hon. Juan Dela Cruz (Punong Barangay)',
        remarks: 'Grant officially approved for release.'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        name: 'Certificate_of_Matriculation_2026.pdf',
        type: 'PDF',
        size: '1.2 MB',
        uploadDate: '2026-08-20',
        verified: true
      },
      {
        id: 'doc-2',
        name: 'Official_Transcript_Grades.pdf',
        type: 'PDF',
        size: '840 KB',
        uploadDate: '2026-08-20',
        verified: true
      }
    ]
  },
  {
    id: 'app-002',
    referenceCode: 'BUG-2026-9120',
    programId: 'prog-medical-subsidy',
    programTitle: 'Medical Assistance & Health Subsidy',
    programCategory: 'Medical',
    applicantId: 'user-pedro-reyes',
    applicantName: 'Pedro B. Reyes',
    contactNumber: '0928 333 7890',
    email: 'pedro.reyes@yahoo.com',
    purok: 'Zone 1 - Centro Riverside',
    address: 'Riverside Lower Bugo, Cagayan de Oro City',
    householdMonthlyIncome: '₱5,000.00',
    familyMembersCount: 2,
    occupation: 'Senior Resident',
    purposeOrDiagnosis: 'Monthly maintenance medication reimbursement for Diabetes insulin and Hypertension.',
    requestedAmount: '₱3,500.00',
    status: 'Under Review',
    submissionDate: '2026-08-29',
    lastUpdated: '2026-08-30',
    priorityScore: 'Normal',
    evaluatorNotes: 'Medical prescription verified with Bugo Health Center doctor. Under social committee review.',
    timeline: [
      {
        status: 'Submitted',
        timestamp: 'Aug 29, 2026 • 09:00 AM',
        officerName: 'Portal Online System',
        remarks: 'Medical request and OSCA Senior ID submitted.'
      },
      {
        status: 'Under Review',
        timestamp: 'Aug 30, 2026 • 01:15 PM',
        officerName: 'Health Desk Officer',
        remarks: 'Prescription reviewed by Barangay Medical Officer.'
      }
    ],
    documents: [
      {
        id: 'doc-3',
        name: 'OSCA_Senior_ID.jpg',
        type: 'Image',
        size: '1.8 MB',
        uploadDate: '2026-08-29',
        verified: true
      },
      {
        id: 'doc-4',
        name: 'Medical_Prescription_Aug2026.pdf',
        type: 'PDF',
        size: '650 KB',
        uploadDate: '2026-08-29',
        verified: true
      }
    ]
  },
  {
    id: 'app-003',
    referenceCode: 'BUG-2026-7452',
    programId: 'prog-barangay-clearance',
    programTitle: 'Barangay Clearance & Residency Certification',
    programCategory: 'Clearance & Certification',
    applicantId: 'user-joshua-santos',
    applicantName: 'Joshua C. Santos',
    contactNumber: '0917 888 1234',
    email: 'joshua.santos@student.edu.ph',
    purok: 'Zone 3 - Suntingcahon Valley',
    address: 'Block 4 Lot 12, Suntingcahon Valley, Bugo, CDO',
    householdMonthlyIncome: '₱8,500.00',
    familyMembersCount: 4,
    occupation: 'Student',
    purposeOrDiagnosis: 'Internship / On-the-Job Training clearance requirement for university placement.',
    status: 'Submitted',
    submissionDate: '2026-08-31',
    lastUpdated: '2026-08-31',
    priorityScore: 'Normal',
    evaluatorNotes: 'New submission pending initial verification by desk officer.',
    timeline: [
      {
        status: 'Submitted',
        timestamp: 'Just now',
        officerName: 'Portal Online System',
        remarks: 'Digital clearance registration form submitted.'
      }
    ],
    documents: [
      {
        id: 'doc-5',
        name: 'University_OJT_Letter.pdf',
        type: 'PDF',
        size: '420 KB',
        uploadDate: '2026-08-31',
        verified: false
      }
    ]
  }
];

// Exactly 3 Sample Complaints
export const INITIAL_COMPLAINTS: ComplaintItem[] = [
  {
    id: 'comp-1',
    title: 'Noise Disturbance at Zone 4',
    description: 'Loud karaoke past 10PM, disturbing sleeping infants and working residents near the chapel corner.',
    reporterName: 'Maria C.',
    reporterId: 'user-maria-santos',
    contactNumber: '0917 555 4321',
    purok: 'Zone 4 - Highway View',
    status: 'Pending',
    category: 'Noise',
    date: '2026-08-31',
    timeAgo: '15 mins ago'
  },
  {
    id: 'comp-2',
    title: 'Uncollected Garbage near Basketball Court',
    description: 'Trash bins overflowing near the basketball court after the weekend tournament. Needs collection.',
    reporterName: 'Pedro R.',
    reporterId: 'user-pedro-reyes',
    contactNumber: '0928 333 7890',
    purok: 'Zone 2 - Chapel Area',
    status: 'In Progress',
    category: 'Sanitation',
    date: '2026-08-31',
    timeAgo: '2 hours ago',
    adminRemarks: 'Eco-Tanod assigned. Truck scheduled for afternoon pickup.'
  },
  {
    id: 'comp-3',
    title: 'Broken Streetlight at Zone 1 Alleyway',
    description: 'Streetlight near the chapel was repaired and replaced with a new LED fixture.',
    reporterName: 'Joshua S.',
    reporterId: 'user-joshua-santos',
    contactNumber: '0917 888 1234',
    purok: 'Zone 1 - Centro Riverside',
    status: 'Resolved',
    category: 'Infrastructure',
    date: '2026-08-30',
    timeAgo: 'Yesterday at 4:15 PM',
    adminRemarks: 'Barangay electrician replaced LED fixture.'
  }
];

// Exactly 3 Sample Announcements
export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann-1',
    title: 'Scheduled Water Interruption (Zone 1 to Zone 3)',
    description: 'Zones 1-3 will experience low to no water pressure from 1:00 PM to 5:00 PM due to main pipe repairs and maintenance by COWD.',
    category: 'Water',
    date: 'Today',
    viewsCount: 845,
    iconType: 'water',
    isPinned: true,
    status: 'Published'
  },
  {
    id: 'ann-2',
    title: 'Free Community Medical & Dental Mission',
    description: 'Annual medical mission at the Barangay Bugo Covered Court starting at 8:00 AM. Free general checkups, vitamins, and pediatric consults.',
    category: 'Health',
    date: 'Oct 15',
    viewsCount: 1204,
    iconType: 'medical',
    isPinned: false,
    status: 'Published'
  },
  {
    id: 'ann-3',
    title: 'Inter-Zone Youth Basketball Tournament Registration',
    description: 'Registration is now open for the SK Youth Basketball Tournament. Submit team rosters to the SK Secretariat before Oct 10.',
    category: 'Sports',
    date: 'Oct 10',
    viewsCount: 960,
    iconType: 'sports',
    isPinned: false,
    status: 'Published'
  }
];

export const DEMOGRAPHICS_DATA = [
  { ageGroup: '0-12', count: 2100, label: 'Children (0-12)', percent: '13.6%' },
  { ageGroup: '13-25', count: 4200, label: 'Youth (13-25)', percent: '27.2%' },
  { ageGroup: '26-40', count: 4900, label: 'Young Adults (26-40)', percent: '31.8%' },
  { ageGroup: '41-59', count: 2800, label: 'Middle Age (41-59)', percent: '18.2%' },
  { ageGroup: '60+', count: 1420, label: 'Seniors (60+)', percent: '9.2%' },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'user-maria-santos',
    title: 'Application Approved: Educational Scholarship',
    message: 'Your application BUG-2026-8941 for Barangay Educational Scholarship Grant has been approved by Punong Barangay.',
    timestamp: '2 hours ago',
    read: false,
    type: 'status_update',
    applicationRef: 'BUG-2026-8941'
  },
  {
    id: 'notif-2',
    userId: 'user-pedro-reyes',
    title: 'Medical Aid Application Under Review',
    message: 'Application BUG-2026-9120 has been received and is undergoing validation with the Barangay Health Desk.',
    timestamp: '5 hours ago',
    read: false,
    type: 'status_update',
    applicationRef: 'BUG-2026-9120'
  },
  {
    id: 'notif-3',
    userId: 'all',
    title: 'New Service Open: Barangay Educational Scholarship 2026',
    message: 'Applications are now open for the 2026 educational grant. Apply online through the Resident Portal.',
    timestamp: 'Yesterday at 9:00 AM',
    read: true,
    type: 'announcement'
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLogItem[] = [
  {
    id: 'act-001',
    residentName: 'Maria Clara Santos',
    residentIdNumber: 'BG-2026-04829',
    purok: 'Zone 3 - Suntingcahon Valley',
    actionType: 'Time-In',
    locationOrService: 'Front Desk - Window 2 (Indigency Section)',
    timestamp: '2026-08-31 08:35 AM',
    officerInCharge: 'Desk Officer Elena',
    status: 'Completed',
    details: 'Physical submission of student clearance documents.'
  },
  {
    id: 'act-002',
    residentName: 'Pedro B. Reyes',
    residentIdNumber: 'BG-2026-01205',
    purok: 'Zone 1 - Centro Riverside',
    actionType: 'Time-In',
    locationOrService: 'Health Center Consultation Desk',
    timestamp: '2026-08-31 09:15 AM',
    officerInCharge: 'Barangay Health Worker Rosita',
    status: 'Active',
    details: 'Senior citizen blood pressure checkup and insulin subsidy verification.'
  },
  {
    id: 'act-003',
    residentName: 'Joshua C. Santos',
    residentIdNumber: 'BG-PENDING-098',
    purok: 'Zone 3 - Suntingcahon Valley',
    actionType: 'Portal Login',
    locationOrService: 'Resident Online Web Portal',
    timestamp: '2026-08-31 10:02 AM',
    officerInCharge: 'System Security Auth',
    status: 'Logged',
    details: 'Online profile verification check and OJT clearance submission.'
  }
];

export const INITIAL_ARCHIVED_ITEMS: ArchiveItem[] = [
  {
    id: 'arch-001',
    title: 'Expired Barangay Business Permit (2025 Cycle)',
    originalCategory: 'Document',
    referenceCode: 'BG-BUS-2025-0199',
    deletedBy: 'Admin Secretary',
    deletedAt: '2026-01-15 04:00 PM',
    reasonForArchive: 'Annual cycle renewal completed. Prior year document safely archived.',
    originalData: { applicant: 'Bugo Sari-Sari Store', zone: 'Zone 5' },
    status: 'Archived'
  },
  {
    id: 'arch-002',
    title: 'Duplicated Resident Registration (Draft)',
    originalCategory: 'Resident Record',
    referenceCode: 'BG-DRAFT-8811',
    deletedBy: 'Hon. Juan Dela Cruz',
    deletedAt: '2026-08-10 11:30 AM',
    reasonForArchive: 'Resident submitted duplicate registration form online; primary profile verified.',
    originalData: { residentName: 'Roberto Gomez', zone: 'Zone 2' },
    status: 'Archived'
  },
  {
    id: 'arch-003',
    title: 'Settled Boundary Fence Mediation Blotter',
    originalCategory: 'Blotter Report',
    referenceCode: 'BLOTTER-2026-004',
    deletedBy: 'Lupon Tagapamayapa',
    deletedAt: '2026-08-25 03:20 PM',
    reasonForArchive: 'Amicable settlement reached and signed by both parties at Purok 4.',
    originalData: { complainant: 'Zone 4 Resident', respondent: 'Zone 4 Neighbor' },
    status: 'Archived'
  }
];
