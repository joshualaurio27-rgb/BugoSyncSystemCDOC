export type UserRole = 'admin' | 'resident' | 'guest';

export interface ResidentUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'admin' | 'resident';
  contactNumber: string;
  purok: string;
  address: string;
  residentIdNumber: string;
  isVerified: boolean;
  registrationStatus?: 'Verified' | 'Pending Approval' | 'Rejected' | 'Banned';
  isBanned?: boolean;
  banReason?: string;
  bannedDate?: string;
  idType?: string;
  frontIdUrl?: string;
  backIdUrl?: string;
  avatarUrl?: string;
  registeredDate: string;
  householdIncome?: string;
  familyMembersCount?: number;
  voterStatus?: 'Registered' | 'Unregistered';
  occupation?: string;
  nationality?: string;
  age?: number;
  gender?: 'Male' | 'Female';
}

export interface ActivityLogItem {
  id: string;
  residentName: string;
  residentIdNumber: string;
  purok: string;
  actionType: 'Time-In' | 'Time-Out' | 'Application Submitted' | 'Status Updated' | 'Clearance Issued' | 'Complaint Filed' | 'Portal Login';
  locationOrService: string;
  timestamp: string;
  officerInCharge: string;
  status: 'Completed' | 'Active' | 'Logged';
  details?: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  originalCategory: 'Resident Record' | 'Service Application' | 'Blotter Report' | 'Notice' | 'Document';
  referenceCode?: string;
  deletedBy: string;
  deletedAt: string;
  reasonForArchive: string;
  originalData: any;
  status: 'Archived';
}

export type ProgramCategory = 'Clearance & Certification' | 'Education' | 'Medical' | 'Financial' | 'Livelihood' | 'General';

export interface AssistanceProgram {
  id: string;
  title: string;
  category: ProgramCategory;
  tagline: string;
  description: string;
  imageUrl: string;
  status: 'Active' | 'Open' | 'Closed';
  badgeText: string;
  deadline: string;
  targetAudience: string;
  processingTime: string;
  requirements: string[];
  eligibilityCriteria: string[];
}

export type ApplicationStatus = 
  | 'Submitted'
  | 'Under Review'
  | 'Documents Verified'
  | 'Approved'
  | 'Ready for Release'
  | 'Completed'
  | 'Rejected';

export interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  fileUrl?: string;
  previewUrl?: string;
  docCategory?: 'Front ID' | 'Back ID' | 'Proof of Residency' | 'Indigency' | 'Income Certificate' | 'General Requirement';
  verified: boolean;
}

export interface StatusHistoryEntry {
  status: ApplicationStatus;
  timestamp: string;
  officerName: string;
  remarks?: string;
}

export interface AssistanceApplication {
  id: string;
  referenceCode: string; // e.g. BUG-2026-8941
  programId: string;
  programTitle: string;
  programCategory: ProgramCategory;
  applicantId: string;
  applicantName: string;
  contactNumber: string;
  email: string;
  purok: string;
  address: string;
  householdMonthlyIncome: string;
  familyMembersCount: number;
  occupation?: string;
  purposeOrDiagnosis: string;
  requestedAmount?: string;
  approvedAmount?: string;
  status: ApplicationStatus;
  submissionDate: string;
  lastUpdated: string;
  documents: UploadedDocument[];
  timeline: StatusHistoryEntry[];
  evaluatorNotes?: string;
  rejectionReason?: string;
  priorityScore: 'Normal' | 'High' | 'Urgent';
}

export interface ComplaintItem {
  id: string;
  title: string;
  description: string;
  reporterName: string;
  reporterId: string;
  contactNumber: string;
  purok: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  category: 'Noise' | 'Sanitation' | 'Infrastructure' | 'Security' | 'Other';
  date: string;
  timeAgo: string;
  adminRemarks?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  description: string;
  category: 'Water' | 'Health' | 'Sports' | 'Assembly' | 'General';
  date: string;
  viewsCount: number;
  iconType: 'water' | 'medical' | 'sports' | 'alert' | 'general';
  isPinned?: boolean;
  status?: 'Published' | 'Pending Approval';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string; // Realistic timestamp like "Just now", "5 mins ago", "Today at 9:30 AM"
  read: boolean;
  type: 'status_update' | 'announcement' | 'registration_approved' | 'registration_submitted';
  applicationRef?: string;
}


