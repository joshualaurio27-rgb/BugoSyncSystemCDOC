import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  ResidentUser, 
  AssistanceProgram, 
  AssistanceApplication, 
  ApplicationStatus,
  UploadedDocument,
  ComplaintItem,
  AnnouncementItem,
  NotificationItem,
  ActivityLogItem,
  ArchiveItem
} from '../types';
import { 
  DEMO_ADMIN_USER, 
  DEMO_RESIDENT_USER, 
  INITIAL_PROGRAMS, 
  INITIAL_APPLICATIONS, 
  INITIAL_RESIDENT_RECORDS, 
  INITIAL_COMPLAINTS, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_ARCHIVED_ITEMS
} from '../data/mockData';

export type AdminTabType = 'dashboard' | 'residents' | 'status-tracking' | 'announcements' | 'archives' | 'settings';
export type ResidentTabType = 'dashboard' | 'services' | 'complaints' | 'announcements' | 'settings' | 'help' | 'profile';
export type AuthViewType = 'welcome' | 'login' | 'register' | 'guest';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  authView: AuthViewType;
  setAuthView: (view: AuthViewType) => void;
  currentUser: ResidentUser | null;
  setCurrentUser: (user: ResidentUser | null) => void;
  
  // Navigation Tabs
  adminTab: AdminTabType;
  setAdminTab: (tab: AdminTabType) => void;
  residentTab: ResidentTabType;
  setResidentTab: (tab: ResidentTabType) => void;

  // Search & Global Modals
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isProfileDrawerOpen: boolean;
  setIsProfileDrawerOpen: (open: boolean) => void;

  // Data Collections
  programs: AssistanceProgram[];
  applications: AssistanceApplication[];
  residentsList: ResidentUser[];
  complaints: ComplaintItem[];
  announcements: AnnouncementItem[];
  notifications: NotificationItem[];
  activityLogs: ActivityLogItem[];
  archivedItems: ArchiveItem[];

  // Auth Operations
  loginWithCredentials: (email: string, pass: string) => { success: boolean; message?: string };
  loginAsDemoAdmin: () => void;
  loginAsDemoResident: () => void;
  loginAsGuest: () => void;
  logout: () => void;
  registerResidentAccount: (data: any) => { success: boolean; message?: string; residentId?: string };
  updateUserProfile: (updates: Partial<ResidentUser>) => void;

  // Admin Approval, Verification & Banning Operations
  approveResidentRegistration: (residentId: string) => void;
  rejectResidentRegistration: (residentId: string, reason?: string) => void;
  banResidentAccount: (residentId: string, reason: string) => void;
  unbanResidentAccount: (residentId: string) => void;
  verifyResidentAccount: (residentId: string) => void;
  addNewResidentRecord: (data: Partial<ResidentUser>) => void;

  // Activity Logs & Archive Operations
  logActivity: (log: Omit<ActivityLogItem, 'id' | 'timestamp'>) => void;
  archiveRecord: (item: Omit<ArchiveItem, 'id' | 'deletedAt' | 'status'>) => void;
  restoreArchivedItem: (id: string) => void;
  deleteArchivedItemPermanently: (id: string) => void;

  // Service Application & Status Tracking Operations (Strictly Admin Status Management)
  submitAssistanceApplication: (data: any) => string;
  verifyApplicationDocument: (appId: string, docId: string, isVerified: boolean) => void;
  updateApplicationStatus: (
    appId: string, 
    newStatus: ApplicationStatus, 
    officerName?: string, 
    remarks?: string, 
    approvedAmount?: string
  ) => void;

  // Complaint & Announcement Operations
  addComplaint: (data: Omit<ComplaintItem, 'id' | 'date' | 'timeAgo' | 'status'>) => void;
  updateComplaintStatus: (id: string, status: 'Pending' | 'In Progress' | 'Resolved', remarks?: string) => void;
  addAnnouncement: (data: Omit<AnnouncementItem, 'id' | 'viewsCount'>) => void;
  
  // Notification Operations
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (title: string, message: string, userId?: string, type?: NotificationItem['type'], applicationRef?: string) => void;

  // Selection state for viewing/editing
  selectedApplicationForReview: AssistanceApplication | null;
  setSelectedApplicationForReview: (app: AssistanceApplication | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & Role State
  const [role, setRole] = useState<UserRole>('guest');
  const [authView, setAuthView] = useState<AuthViewType>('welcome');
  const [currentUser, setCurrentUser] = useState<ResidentUser | null>(null);

  const [adminTab, setAdminTab] = useState<AdminTabType>('dashboard');
  const [residentTab, setResidentTab] = useState<ResidentTabType>('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Core Data
  const [programs, setPrograms] = useState<AssistanceProgram[]>(INITIAL_PROGRAMS);
  const [applications, setApplications] = useState<AssistanceApplication[]>(INITIAL_APPLICATIONS);
  const [residentsList, setResidentsList] = useState<ResidentUser[]>(INITIAL_RESIDENT_RECORDS);
  const [complaints, setComplaints] = useState<ComplaintItem[]>(INITIAL_COMPLAINTS);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activityLogs, setActivityLogs] = useState<ActivityLogItem[]>(INITIAL_ACTIVITY_LOGS);
  const [archivedItems, setArchivedItems] = useState<ArchiveItem[]>(INITIAL_ARCHIVED_ITEMS);

  const [selectedApplicationForReview, setSelectedApplicationForReview] = useState<AssistanceApplication | null>(null);
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  // Realistic time helper
  const getRealisticTime = (): string => {
    return 'Just now';
  };

  const addNotificationDir = (
    title: string, 
    message: string, 
    userId: string = 'all', 
    type: NotificationItem['type'] = 'status_update', 
    applicationRef?: string
  ) => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      title,
      message,
      timestamp: getRealisticTime(),
      read: false,
      type,
      applicationRef
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addNotification = addNotificationDir;

  // Log activity
  const logActivity = (entry: Omit<ActivityLogItem, 'id' | 'timestamp'>) => {
    const now = new Date();
    const formatted = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newLog: ActivityLogItem = {
      ...entry,
      id: `act-${Date.now()}`,
      timestamp: formatted
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Archive a record
  const archiveRecord持 = (item: Omit<ArchiveItem, 'id' | 'deletedAt' | 'status'>) => {
    const now = new Date();
    const formatted = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newArch: ArchiveItem = {
      ...item,
      id: `arch-${Date.now()}`,
      deletedAt: formatted,
      status: 'Archived'
    };
    setArchivedItems(prev => [newArch, ...prev]);
    logActivity({
      residentName: item.deletedBy || 'Admin Juan Dela Cruz',
      residentIdNumber: 'BG-ADMIN-001',
      purok: 'Administrative Office',
      actionType: 'Status Updated',
      locationOrService: 'Archives & Records Unit',
      officerInCharge: item.deletedBy || 'Admin Secretary',
      status: 'Completed',
      details: `Archived record "${item.title}" (${item.originalCategory}). Reason: ${item.reasonForArchive}`
    });
  };

  const archiveRecord = archiveRecord持;

  const restoreArchivedItem = (id: string) => {
    const item = archivedItems.find(a => a.id === id);
    if (!item) return;

    setArchivedItems(prev => prev.filter(a => a.id !== id));
    logActivity({
      residentName: currentUser?.name || 'Admin',
      residentIdNumber: 'BG-ADMIN-001',
      purok: 'Administrative Office',
      actionType: 'Status Updated',
      locationOrService: 'Archives & Records Unit',
      officerInCharge: 'Admin Staff',
      status: 'Completed',
      details: `Restored archived item "${item.title}" back to active database.`
    });
  };

  const deleteArchivedItemPermanently = (id: string) => {
    setArchivedItems(prev => prev.filter(a => a.id !== id));
  };

  const updateUserProfile = (updates: Partial<ResidentUser>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setResidentsList(prev => prev.map(r => r.id === currentUser.id ? { ...r, ...updates } : r));
  };

  const loginAsGuest = () => {
    setAuthView('guest');
  };

  // Auth Operations
  const loginWithCredentials = (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Check Admin
    if (cleanEmail === 'admin@bugo.gov.ph' || cleanEmail === 'admin') {
      setCurrentUser(DEMO_ADMIN_USER);
      setRole('admin');
      setAdminTab('dashboard');
      return { success: true };
    }

    // Check existing residents
    const foundResident = residentsList.find(r => r.email.toLowerCase() === cleanEmail);
    if (foundResident) {
      if (foundResident.isBanned || foundResident.registrationStatus === 'Banned') {
        return {
          success: false,
          message: `Your account has been banned by the Barangay Administration. Reason: ${foundResident.banReason || 'Policy or document violation.'}`
        };
      }
      setCurrentUser(foundResident);
      setRole('resident');
      setResidentTab('dashboard');
      return { success: true };
    }

    // Demo resident fallback
    if (cleanEmail.includes('resident') || cleanEmail.includes('maria')) {
      setCurrentUser(DEMO_RESIDENT_USER);
      setRole('resident');
      setResidentTab('dashboard');
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid credentials. Use admin@bugo.gov.ph or resident@bugo.gov.ph to sign in.' 
    };
  };

  const loginAsDemoAdmin = () => {
    setCurrentUser(DEMO_ADMIN_USER);
    setRole('admin');
    setAdminTab('dashboard');
  };

  const loginAsDemoResident = () => {
    setCurrentUser(DEMO_RESIDENT_USER);
    setRole('resident');
    setResidentTab('dashboard');
  };

  const logout = () => {
    setRole('guest');
    setAuthView('welcome');
    setCurrentUser(null);
    setSelectedApplicationForReview(null);
  };

  // Resident Account Registration
  const registerResidentAccount = (data: any) => {
    const newId = `user-${Date.now()}`;
    const generatedIdNumber = `BG-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newResident: ResidentUser = {
      id: newId,
      name: data.name,
      email: data.email,
      username: data.email.split('@')[0],
      role: 'resident',
      contactNumber: data.contactNumber,
      purok: data.purok,
      address: data.address,
      residentIdNumber: generatedIdNumber,
      isVerified: false,
      registrationStatus: 'Pending Approval',
      registeredDate: new Date().toISOString().split('T')[0],
      householdIncome: data.householdIncome || '₱8,500.00 (Informal / Low Income)',
      familyMembersCount: Number(data.familyMembersCount) || 4,
      nationality: data.nationality || 'Filipino',
      voterStatus: data.voterStatus || 'Registered',
      occupation: data.occupation || 'Resident',
      age: data.age || 28,
      gender: data.gender || 'Female'
    };

    setResidentsList(prev => [newResident, ...prev]);
    setCurrentUser(newResident);
    setRole('resident');
    setResidentTab('dashboard');

    // Notify Admin of new registration needing approval
    addNotification(
      'New Resident Registration Submitted',
      `${newResident.name} (${newResident.purok}) submitted an account registration and is awaiting admin approval.`,
      'admin-juan-delacruz',
      'registration_submitted'
    );

    // Notify Resident of pending verification
    addNotification(
      'Account Registered Successfully',
      `Welcome to Barangay Bugo Portal, ${newResident.name}! Your account is currently pending administrative verification.`,
      newResident.id,
      'registration_submitted'
    );

    return { success: true, residentId: newId };
  };

  // Admin approves resident registration / signed in account
  const approveResidentRegistration = (residentId: string) => {
    setResidentsList(prev => prev.map(res => {
      if (res.id === residentId) {
        return {
          ...res,
          isVerified: true,
          registrationStatus: 'Verified',
          isBanned: false,
          banReason: undefined
        };
      }
      return res;
    }));

    const targetUser = residentsList.find(r => r.id === residentId);
    if (targetUser) {
      addNotification(
        'Resident Account Verified & Approved',
        `Official verification complete for ${targetUser.name}. You can now avail all official services and certificates.`,
        targetUser.id,
        'registration_approved'
      );
    }
  };

  const verifyResidentAccount = approveResidentRegistration;

  // Admin bans resident account
  const banResidentAccount = (residentId: string, reason: string) => {
    const now = new Date().toISOString().split('T')[0];
    setResidentsList(prev => prev.map(res => {
      if (res.id === residentId) {
        return {
          ...res,
          isVerified: false,
          isBanned: true,
          registrationStatus: 'Banned',
          banReason: reason || 'Administrative decision / policy violation',
          bannedDate: now
        };
      }
      return res;
    }));

    logActivity({
      residentName: 'Hon. Juan Dela Cruz (Admin)',
      residentIdNumber: 'BG-ADMIN-001',
      purok: 'Administrative Office',
      actionType: 'Status Updated',
      locationOrService: 'Citizen Registry Compliance',
      officerInCharge: 'Barangay Secretary',
      status: 'Completed',
      details: `Account ID ${residentId} was banned. Reason: ${reason}`
    });
  };

  // Admin unbans resident account
  const unbanResidentAccount = (residentId: string) => {
    setResidentsList(prev => prev.map(res => {
      if (res.id === residentId) {
        return {
          ...res,
          isVerified: true,
          isBanned: false,
          registrationStatus: 'Verified',
          banReason: undefined,
          bannedDate: undefined
        };
      }
      return res;
    }));

    logActivity({
      residentName: 'Hon. Juan Dela Cruz (Admin)',
      residentIdNumber: 'BG-ADMIN-001',
      purok: 'Administrative Office',
      actionType: 'Status Updated',
      locationOrService: 'Citizen Registry Compliance',
      officerInCharge: 'Barangay Secretary',
      status: 'Completed',
      details: `Account ID ${residentId} was unbanned and restored to verified status.`
    });
  };

  // Admin rejects resident registration
  const rejectResidentRegistration = (residentId: string, reason?: string) => {
    setResidentsList(prev => prev.map(res => {
      if (res.id === residentId) {
        return {
          ...res,
          isVerified: false,
          registrationStatus: 'Rejected'
        };
      }
      return res;
    }));

    const targetUser = residentsList.find(r => r.id === residentId);
    if (targetUser) {
      addNotification(
        'Resident Account Registration Update',
        `Registration for ${targetUser.name} could not be verified. Remarks: ${reason || 'Incomplete residency documents.'}`,
        targetUser.id,
        'status_update'
      );
    }
  };

  const addNewResidentRecord = (data: Partial<ResidentUser>) => {
    const newRecord: ResidentUser = {
      id: `res-${Date.now()}`,
      name: data.name || 'New Resident',
      email: data.email || 'resident@bugo.gov.ph',
      username: (data.name || 'user').toLowerCase().replace(/\s+/g, ''),
      role: 'resident',
      contactNumber: data.contactNumber || '0917 000 0000',
      purok: data.purok || 'Zone 1 - Centro Riverside',
      address: data.address || 'Barangay Bugo, CDO',
      residentIdNumber: `BG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      isVerified: true,
      registrationStatus: 'Verified',
      registeredDate: new Date().toISOString().split('T')[0],
      householdIncome: data.householdIncome || '₱8,500.00',
      familyMembersCount: 4,
      voterStatus: 'Registered',
      occupation: data.occupation || 'Resident',
      age: 30,
      gender: 'Female'
    };
    setResidentsList(prev => [newRecord, ...prev]);
  };

  // Resident submits Service Application
  const submitAssistanceApplication = (applicationData: any): string => {
    const randomCode = `BUG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    const newApp: AssistanceApplication = {
      id: `app-${Date.now()}`,
      referenceCode: randomCode,
      programId: applicationData.programId || 'prog-barangay-clearance',
      programTitle: applicationData.programTitle || 'Barangay Service Request',
      programCategory: applicationData.programCategory || applicationData.category || 'Clearance & Certification',
      applicantId: applicationData.applicantId || currentUser?.id || 'user-maria-santos',
      applicantName: applicationData.applicantName || currentUser?.name || 'Resident Applicant',
      contactNumber: applicationData.contactNumber || currentUser?.contactNumber || '0917 555 4321',
      email: applicationData.email || currentUser?.email || 'resident@bugo.gov.ph',
      purok: applicationData.purok || currentUser?.purok || 'Zone 1 - Centro Riverside',
      address: applicationData.address || currentUser?.address || 'Barangay Bugo, Cagayan de Oro City',
      householdMonthlyIncome: applicationData.householdMonthlyIncome || '₱8,500.00',
      familyMembersCount: Number(applicationData.familyMembersCount) || 4,
      occupation: applicationData.occupation || currentUser?.occupation || 'Resident',
      purposeOrDiagnosis: applicationData.purposeOrDiagnosis || applicationData.purpose || 'Official service request.',
      requestedAmount: applicationData.requestedAmount || '',
      approvedAmount: applicationData.approvedAmount,
      status: 'Submitted',
      submissionDate: formattedDate,
      lastUpdated: formattedDate,
      priorityScore: applicationData.priorityScore || 'Normal',
      documents: (applicationData.documents || []).map((d: any, index: number) => ({
        id: d.id || `doc-${Date.now()}-${index}`,
        name: d.name || 'Submitted_Document.pdf',
        type: d.type || 'PDF',
        size: d.size || '1.2 MB',
        uploadDate: formattedDate,
        verified: false,
        fileUrl: d.url || '#'
      })),
      timeline: [
        {
          status: 'Submitted',
          timestamp: 'Just now',
          officerName: 'Portal Online System',
          remarks: 'Service registration fill-up form submitted and queued for Barangay Admin evaluation.'
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);

    // Push live realistic notification to Admin
    addNotification(
      'New Service Application Submitted',
      `New request ${newApp.referenceCode} for "${newApp.programTitle}" submitted by ${newApp.applicantName} (${newApp.purok}).`,
      'admin-juan-delacruz',
      'status_update',
      newApp.referenceCode
    );

    // Push notification to Resident
    addNotification(
      'Service Application Received',
      `Your request ${newApp.referenceCode} for "${newApp.programTitle}" has been submitted successfully to Barangay Bugo.`,
      newApp.applicantId,
      'status_update',
      newApp.referenceCode
    );

    return randomCode;
  };

  // Admin updates Application Status in Status Tracking
  const updateApplicationStatus = (
    appId: string, 
    newStatus: ApplicationStatus, 
    officerName: string = 'Hon. Juan Dela Cruz (Brgy. Admin)', 
    remarks?: string,
    approvedAmount?: string
  ) => {
    const formattedDate = new Date().toISOString().split('T')[0];

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const newTimelineEntry = {
          status: newStatus,
          timestamp: 'Just now',
          officerName,
          remarks: remarks || `Status updated to ${newStatus}`
        };

        const updatedApp: AssistanceApplication = {
          ...app,
          status: newStatus,
          lastUpdated: formattedDate,
          approvedAmount: approvedAmount || app.approvedAmount,
          timeline: [newTimelineEntry, ...app.timeline],
          evaluatorNotes: remarks || app.evaluatorNotes
        };

        // Notify the applicant
        addNotification(
          `Application Update: ${newStatus}`,
          `Your application ${app.referenceCode} (${app.programTitle}) status is now "${newStatus}". Remarks: ${remarks || 'Review processed by Barangay Administrator.'}`,
          app.applicantId,
          'status_update',
          app.referenceCode
        );

        return updatedApp;
      }
      return app;
    }));
  };

  // Admin verifies or un-verifies individual uploaded application document
  const verifyApplicationDocument = (appId: string, docId: string, isVerified: boolean) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          documents: app.documents.map(doc => doc.id === docId ? { ...doc, verified: isVerified } : doc)
        };
      }
      return app;
    }));

    if (selectedApplicationForReview && selectedApplicationForReview.id === appId) {
      setSelectedApplicationForReview(prev => {
        if (!prev) return null;
        return {
          ...prev,
          documents: prev.documents.map(doc => doc.id === docId ? { ...doc, verified: isVerified } : doc)
        };
      });
    }
  };

  // Complaints
  const addComplaint = (data: Omit<ComplaintItem, 'id' | 'date' | 'timeAgo' | 'status'>) => {
    const newComp: ComplaintItem = {
      ...data,
      id: `comp-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      timeAgo: 'Just now',
      status: 'Pending'
    };
    setComplaints(prev => [newComp, ...prev]);

    addNotification(
      'New Community Report Filed',
      `Complaint regarding "${newComp.title}" in ${newComp.purok} reported by ${newComp.reporterName}.`,
      'admin-juan-delacruz',
      'status_update'
    );
  };

  const updateComplaintStatus = (id: string, status: 'Pending' | 'In Progress' | 'Resolved', remarks?: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status,
          adminRemarks: remarks || c.adminRemarks
        };
      }
      return c;
    }));
  };

  // Announcements
  const addAnnouncement = (data: Omit<AnnouncementItem, 'id' | 'viewsCount'>) => {
    const newAnn: AnnouncementItem = {
      ...data,
      id: `ann-${Date.now()}`,
      viewsCount: 1,
      date: 'Today',
      status: 'Published'
    };
    setAnnouncements(prev => [newAnn, ...prev]);

    addNotification(
      `New Announcement: ${newAnn.title}`,
      newAnn.description.slice(0, 100) + '...',
      'all',
      'announcement'
    );
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        authView,
        setAuthView,
        currentUser,
        setCurrentUser,
        adminTab,
        setAdminTab,
        residentTab,
        setResidentTab,
        searchQuery,
        setSearchQuery,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isProfileDrawerOpen,
        setIsProfileDrawerOpen,
        programs,
        applications,
        residentsList,
        complaints,
        announcements,
        notifications,
        activityLogs,
        archivedItems,
        loginWithCredentials,
        loginAsDemoAdmin,
        loginAsDemoResident,
        loginAsGuest,
        logout,
        registerResidentAccount,
        updateUserProfile,
        approveResidentRegistration,
        rejectResidentRegistration,
        banResidentAccount,
        unbanResidentAccount,
        verifyResidentAccount,
        addNewResidentRecord,
        logActivity,
        archiveRecord,
        restoreArchivedItem,
        deleteArchivedItemPermanently,
        submitAssistanceApplication,
        verifyApplicationDocument,
        updateApplicationStatus,
        addComplaint,
        updateComplaintStatus,
        addAnnouncement,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
        selectedApplicationForReview,
        setSelectedApplicationForReview
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
