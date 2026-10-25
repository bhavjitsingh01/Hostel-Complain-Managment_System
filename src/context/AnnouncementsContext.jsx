import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getAnnouncements, saveAnnouncements, generateId, formatDate } from '../utils/storage';

const AnnouncementsContext = createContext(null);

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: generateId('ANN'),
    title: 'Water supply maintenance — Block B',
    message: 'Water supply will be temporarily unavailable in Block B from 2:00 PM to 4:00 PM today for scheduled maintenance.',
    priority: 'urgent',
    audience: 'Block B students',
    createdAt: '18 Aug 2026',
    createdAtFull: '18 Aug 2026 · 10:20 AM',
    status: 'published',
    author: 'R. Sharma',
  },
  {
    id: generateId('ANN'),
    title: 'Hostel maintenance inspection',
    message: 'Routine room inspection will take place this Friday from 10:00 AM. Please ensure your room is accessible.',
    priority: 'important',
    audience: 'Block B students',
    createdAt: '15 Aug 2026',
    createdAtFull: '15 Aug 2026 · 2:00 PM',
    status: 'published',
    author: 'R. Sharma',
  },
  {
    id: generateId('ANN'),
    title: 'Wi-Fi maintenance completed',
    message: 'Network maintenance for Block B has been completed successfully. Report any remaining issues.',
    priority: 'important',
    audience: 'Block B students',
    createdAt: '12 Aug 2026',
    createdAtFull: '12 Aug 2026 · 4:30 PM',
    status: 'published',
    author: 'R. Sharma',
  },
  {
    id: generateId('ANN'),
    title: 'Mess feedback survey',
    message: 'Please share your feedback on the mess facilities by completing the survey before August 20.',
    priority: 'normal',
    audience: 'Block B students',
    createdAt: '08 Aug 2026',
    createdAtFull: '08 Aug 2026 · 11:00 AM',
    status: 'published',
    author: 'R. Sharma',
  },
  {
    id: generateId('ANN'),
    title: 'Weekend visitor timings updated',
    message: 'Visitor hours for weekends have been updated. Check the notice board for new timings.',
    priority: 'normal',
    audience: 'Block B students',
    createdAt: '05 Aug 2026',
    createdAtFull: '05 Aug 2026 · 3:00 PM',
    status: 'published',
    author: 'R. Sharma',
  },
  {
    id: generateId('ANN'),
    title: 'New laundry schedule',
    message: 'Laundry machine schedule has been revised for the new semester. Slots are now bookable online.',
    priority: 'normal',
    audience: 'Block B students',
    createdAt: '01 Aug 2026',
    createdAtFull: '01 Aug 2026 · 9:00 AM',
    status: 'published',
    author: 'R. Sharma',
  },
];

export function AnnouncementsProvider({ children }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    const stored = await getAnnouncements();
    if (stored && stored.length > 0) {
      setAnnouncements(stored);
    } else {
      await saveAnnouncements(DEFAULT_ANNOUNCEMENTS);
      setAnnouncements(DEFAULT_ANNOUNCEMENTS);
    }
    setLoading(false);
  };

  const createAnnouncement = useCallback(async (announcementData, author) => {
    const newAnnouncement = {
      id: generateId('ANN'),
      ...announcementData,
      createdAt: formatDate(),
      createdAtFull: formatDateTime(),
      status: announcementData.publish === 'draft' ? 'draft' : 'published',
      author,
    };
    
    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    await saveAnnouncements(updated);
    return newAnnouncement;
  }, [announcements]);

  const updateAnnouncement = useCallback(async (id, updates) => {
    const updated = announcements.map(a => 
      a.id === id ? { ...a, ...updates } : a
    );
    setAnnouncements(updated);
    await saveAnnouncements(updated);
    return updated.find(a => a.id === id);
  }, [announcements]);

  const deleteAnnouncement = useCallback(async (id) => {
    const updated = announcements.filter(a => a.id !== id);
    setAnnouncements(updated);
    await saveAnnouncements(updated);
  }, [announcements]);

  const getAnnouncement = useCallback((id) => {
    return announcements.find(a => a.id === id);
  }, [announcements]);

  const value = {
    announcements,
    loading,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    getAnnouncement,
  };

  return (
    <AnnouncementsContext.Provider value={value}>
      {children}
    </AnnouncementsContext.Provider>
  );
}

function formatDateTime() {
  return new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function useAnnouncements() {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
  }
  return context;
}