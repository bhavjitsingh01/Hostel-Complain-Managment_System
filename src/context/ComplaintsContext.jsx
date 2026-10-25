import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getComplaints, saveComplaints, generateId, formatDate, formatDateTime } from '../utils/storage';

const ComplaintsContext = createContext(null);

const DEFAULT_COMPLAINTS = [
  {
    id: 'HC-2026-00124',
    studentId: 'CS24-1042',
    studentName: 'Abhay Jaswal',
    title: 'Wi-Fi not working in room',
    description: 'The Wi-Fi connection in my room has been unstable since yesterday evening. Other students on the same floor are also experiencing slow speeds.',
    category: 'Internet',
    location: { hostel: 'Block B', room: 'B-204', floor: '2' },
    priority: 'medium',
    status: 'in-progress',
    createdAt: '16 Aug 2026',
    createdAtFull: '16 Aug 2026 · 9:42 AM',
    updatedAt: '16 Aug 2026 · 10:25 AM',
    assignedTo: 'R. Sharma',
    assignedTeam: 'IT Support - Team 01',
    timeline: [
      { label: 'Submitted', time: '16 Aug · 9:42 AM', completed: true },
      { label: 'Under Review', time: '16 Aug · 11:10 AM', completed: true },
      { label: 'Assigned', time: '16 Aug · 2:30 PM', completed: true },
      { label: 'In Progress', time: 'Today · 10:25 AM', completed: false, current: true },
      { label: 'Resolved', time: 'Waiting', completed: false, pending: true },
    ],
  },
  {
    id: 'HC-2026-00118',
    studentId: 'CS24-1042',
    studentName: 'Abhay Jaswal',
    title: 'Water leakage in bathroom',
    description: 'There is continuous water leakage from the bathroom tap connection. The floor remains wet and water is collecting near the door.',
    category: 'Plumbing',
    location: { hostel: 'Block B', room: 'B-204', floor: '2' },
    priority: 'high',
    status: 'pending',
    createdAt: '14 Aug 2026',
    createdAtFull: '14 Aug 2026 · 9:42 AM',
    updatedAt: '14 Aug 2026 · 11:10 AM',
    assignedTo: 'R. Sharma',
    assignedTeam: 'Plumbing - Team 02',
    timeline: [
      { label: 'Submitted', time: '14 Aug · 9:42 AM', completed: true },
      { label: 'Under Review', time: '14 Aug · 11:10 AM', completed: true },
      { label: 'Assigned', time: '14 Aug · 2:30 PM', completed: true },
      { label: 'Pending Action', time: 'Today · 10:25 AM', completed: false, current: true },
      { label: 'Resolved', time: 'Waiting', completed: false, pending: true },
    ],
  },
  {
    id: 'HC-2026-00107',
    studentId: 'CS24-1042',
    studentName: 'Abhay Jaswal',
    title: 'Ceiling fan making noise',
    description: 'The ceiling fan in my room has been making a loud humming noise since last week.',
    category: 'Electrical',
    location: { hostel: 'Block B', room: 'B-204', floor: '2' },
    priority: 'low',
    status: 'resolved',
    createdAt: '09 Aug 2026',
    createdAtFull: '09 Aug 2026 · 2:15 PM',
    updatedAt: '12 Aug 2026 · 10:30 AM',
    assignedTo: 'R. Sharma',
    assignedTeam: 'Electrical - Team 01',
    timeline: [
      { label: 'Submitted', time: '09 Aug · 2:15 PM', completed: true },
      { label: 'Under Review', time: '10 Aug · 9:30 AM', completed: true },
      { label: 'Assigned', time: '10 Aug · 11:00 AM', completed: true },
      { label: 'In Progress', time: '11 Aug · 2:00 PM', completed: true },
      { label: 'Resolved', time: '12 Aug · 10:30 AM', completed: true, current: true },
    ],
  },
  {
    id: 'HC-2026-00129',
    studentId: 'CS24-1042',
    studentName: 'Abhay Jaswal',
    title: 'Flickering tube light',
    description: 'The tube light in my study area flickers constantly, causing eye strain.',
    category: 'Electrical',
    location: { hostel: 'Block B', room: 'B-204', floor: '2' },
    priority: 'medium',
    status: 'new',
    createdAt: '18 Aug 2026',
    createdAtFull: '18 Aug 2026 · 8:30 AM',
    updatedAt: '18 Aug 2026 · 8:30 AM',
    assignedTo: null,
    assignedTeam: null,
    timeline: [
      { label: 'Submitted', time: '18 Aug · 8:30 AM', completed: true, current: true },
      { label: 'Under Review', time: 'Waiting', completed: false, pending: true },
      { label: 'Assigned', time: 'Waiting', completed: false, pending: true },
      { label: 'In Progress', time: 'Waiting', completed: false, pending: true },
      { label: 'Resolved', time: 'Waiting', completed: false, pending: true },
    ],
  },
  {
    id: 'HC-2026-00095',
    studentId: 'CS24-1042',
    studentName: 'Abhay Jaswal',
    title: 'Corridor cleanliness issue',
    description: 'The corridor outside my room has not been cleaned in several days. There is dust and debris accumulating.',
    category: 'Cleanliness',
    location: { hostel: 'Block B', room: 'B-204', floor: '2' },
    priority: 'low',
    status: 'in-progress',
    createdAt: '02 Aug 2026',
    createdAtFull: '02 Aug 2026 · 4:20 PM',
    updatedAt: '05 Aug 2026 · 9:00 AM',
    assignedTo: 'R. Sharma',
    assignedTeam: 'Housekeeping - Team 01',
    timeline: [
      { label: 'Submitted', time: '02 Aug · 4:20 PM', completed: true },
      { label: 'Under Review', time: '03 Aug · 10:00 AM', completed: true },
      { label: 'Assigned', time: '03 Aug · 2:00 PM', completed: true },
      { label: 'In Progress', time: '05 Aug · 9:00 AM', completed: false, current: true },
      { label: 'Resolved', time: 'Waiting', completed: false, pending: true },
    ],
  },
];

export function ComplaintsProvider({ children }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    const stored = await getComplaints();
    if (stored && stored.length > 0) {
      setComplaints(stored);
    } else {
      await saveComplaints(DEFAULT_COMPLAINTS);
      setComplaints(DEFAULT_COMPLAINTS);
    }
    setLoading(false);
  };

  const getComplaint = useCallback((id) => {
    return complaints.find(c => c.id === id);
  }, [complaints]);

  const getStudentComplaints = useCallback((studentId) => {
    return complaints.filter(c => c.studentId === studentId);
  }, [complaints]);

  const createComplaint = useCallback(async (complaintData, student) => {
    const newComplaint = {
      id: generateId('HC'),
      studentId: student.id,
      studentName: student.name,
      ...complaintData,
      status: 'new',
      createdAt: formatDate(),
      createdAtFull: formatDateTime(),
      updatedAt: formatDateTime(),
      assignedTo: null,
      assignedTeam: null,
      timeline: [
        { label: 'Submitted', time: formatDateTime(), completed: true, current: true },
        { label: 'Under Review', time: 'Waiting', completed: false, pending: true },
        { label: 'Assigned', time: 'Waiting', completed: false, pending: true },
        { label: 'In Progress', time: 'Waiting', completed: false, pending: true },
        { label: 'Resolved', time: 'Waiting', completed: false, pending: true },
      ],
    };
    
    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    await saveComplaints(updated);
    return newComplaint;
  }, [complaints]);

  const updateComplaint = useCallback(async (id, updates) => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, ...updates, updatedAt: formatDateTime() } : c
    );
    setComplaints(updated);
    await saveComplaints(updated);
    return updated.find(c => c.id === id);
  }, [complaints]);

  const updateComplaintStatus = useCallback(async (id, status, wardenName = null) => {
    const complaint = complaints.find(c => c.id === id);
    if (!complaint) return null;
    
    const timeline = [...complaint.timeline];
    const statusOrder = ['new', 'pending', 'in-progress', 'resolved'];
    const currentIndex = statusOrder.indexOf(complaint.status);
    const newIndex = statusOrder.indexOf(status);
    
    for (let i = 0; i <= newIndex && i < timeline.length; i++) {
      timeline[i] = {
        ...timeline[i],
        completed: true,
        current: i === newIndex,
        pending: i > newIndex,
        time: i <= currentIndex ? timeline[i].time : formatDateTime(),
      };
    }
    
    const updates = { status, timeline, updatedAt: formatDateTime() };
    if (wardenName) updates.assignedTo = wardenName;
    
    return updateComplaint(id, updates);
  }, [complaints, updateComplaint]);

  const assignComplaint = useCallback(async (id, assignedTo, assignedTeam) => {
    return updateComplaint(id, { assignedTo, assignedTeam, updatedAt: formatDateTime() });
  }, [updateComplaint]);

  const deleteComplaint = useCallback(async (id) => {
    const updated = complaints.filter(c => c.id !== id);
    setComplaints(updated);
    await saveComplaints(updated);
  }, [complaints]);

  const value = {
    complaints,
    loading,
    getComplaint,
    getStudentComplaints,
    createComplaint,
    updateComplaint,
    updateComplaintStatus,
    assignComplaint,
    deleteComplaint,
  };

  return (
    <ComplaintsContext.Provider value={value}>
      {children}
    </ComplaintsContext.Provider>
  );
}

export function useComplaints() {
  const context = useContext(ComplaintsContext);
  if (!context) {
    throw new Error('useComplaints must be used within a ComplaintsProvider');
  }
  return context;
}