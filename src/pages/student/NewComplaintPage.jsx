import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintsContext';
import { useToast } from '../../context/ToastContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { Input, Textarea, Select, FieldGrid, FormSubmit } from '../../components/common/Form';

export function NewComplaintPage() {
  const { user } = useAuth();
  const { createComplaint } = useComplaints();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    hostel: 'Block B',
    room: 'B-204',
    floor: '',
    priority: 'medium',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.hostel) newErrors.hostel = 'Please select a hostel';
    if (!formData.room.trim()) newErrors.room = 'Room number is required';
    if (!formData.floor) newErrors.floor = 'Please select a floor';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const complaint = await createComplaint(formData, user);
      showToast('Complaint submitted successfully!', 'success');
      navigate(`/student/complaints/${complaint.id}`);
    } catch (error) {
      showToast('Failed to submit complaint', 'error');
    }
    setLoading(false);
  };

  const categories = [
    { value: 'Electrical', label: 'Electrical' },
    { value: 'Plumbing', label: 'Plumbing' },
    { value: 'Cleanliness', label: 'Cleanliness' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Internet', label: 'Internet' },
    { value: 'Security', label: 'Security' },
    { value: 'Water', label: 'Water' },
    { value: 'Other', label: 'Other' },
  ];

  const hostels = [
    { value: 'Block B', label: 'Block B' },
    { value: 'Block A', label: 'Block A' },
    { value: 'Block C', label: 'Block C' },
  ];

  const floors = [
    { value: '', label: 'Select floor' },
    { value: 'Ground', label: 'Ground floor' },
    { value: '1', label: '1st floor' },
    { value: '2', label: '2nd floor' },
    { value: '3', label: '3rd floor' },
  ];

  return (
    <div className="dashboard-page" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="student" />
      
      <main className="complaint-shell" style={{ maxWidth: '900px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
        <div className="complaint-header" style={{ marginBottom: 'var(--space-6)' }}>
          <p className="eyebrow" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-3)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            <span className="eyebrow-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}></span>
            NEW COMPLAINT
          </p>
          <h1 style={{ fontSize: 'clamp(38px, 6vw, 56px)', lineHeight: 'var(--leading-tight)', letterSpacing: '-0.03em', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
            Tell us what&rsquo;s <em>wrong.</em>
          </h1>
          <p className="complaint-subtitle" style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)', maxWidth: '640px' }}>
            Give us a few details and your complaint will be routed to the right hostel team.
          </p>
        </div>

        <form className="complaint-form" onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--space-5)' }}>
          <section className="complaint-section" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
            <div className="section-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="section-number" style={{ flex: '0 0 40px', display: 'grid', placeItems: 'center', width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>01</span>
              <div className="section-titles" style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 'var(--space-1)' }}>What happened?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>Choose a category and describe the issue.</p>
              </div>
            </div>

            <div className="section-grid" style={{ display: 'grid', gap: 'var(--space-4)', gridTemplateColumns: '1fr 1fr' }}>
              <Select
                label="Complaint category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={categories}
                placeholder="Select a category"
                error={errors.category}
                hint="Choose the type of issue you're reporting"
              />
              <Input
                label="Complaint title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Wi-Fi not working in my room"
                error={errors.title}
                hint="A brief, descriptive title for your complaint"
              />
            </div>

            <Textarea
              label="Describe the problem"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell us what happened, when you noticed it, and anything that may help us resolve it."
              error={errors.description}
              hint="Be specific. This helps the warden resolve the issue faster."
              rows={8}
              className="field-full"
            />
          </section>

          <section className="complaint-section" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
            <div className="section-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="section-number" style={{ flex: '0 0 40px', display: 'grid', placeItems: 'center', width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>02</span>
              <div className="section-titles" style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 'var(--space-1)' }}>Where is the issue?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>Help us identify where the problem is located.</p>
              </div>
            </div>

            <FieldGrid columns={3}>
              <Select
                label="Hostel / Block"
                name="hostel"
                value={formData.hostel}
                onChange={handleChange}
                options={hostels}
                error={errors.hostel}
              />
              <Input
                label="Room number"
                name="room"
                value={formData.room}
                onChange={handleChange}
                error={errors.room}
              />
              <Select
                label="Floor"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                options={floors}
                error={errors.floor}
              />
            </FieldGrid>
          </section>

          <section className="complaint-section" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)' }}>
            <div className="section-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="section-number" style={{ flex: '0 0 40px', display: 'grid', placeItems: 'center', width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>03</span>
              <div className="section-titles" style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 'var(--space-1)' }}>How urgent is it?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>Let us know how quickly this issue needs attention.</p>
              </div>
            </div>

            <fieldset className="priority-fieldset" style={{ border: 0, padding: 0, margin: 0 }} role="radiogroup" aria-label="Priority level">
              <div className="priority-options-grid" style={{ display: 'grid', gap: 'var(--space-3)', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {['low', 'medium', 'high'].map(priority => (
                  <label key={priority} className="priority-card" style={{ cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="priority"
                      value={priority}
                      checked={formData.priority === priority}
                      onChange={handleChange}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <div className={`priority-card-content ${formData.priority === priority ? 'checked' : ''}`} style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 'var(--space-1)',
                      minHeight: '72px',
                      padding: 'var(--space-4)',
                      border: `2px solid ${formData.priority === priority ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: 'var(--radius-lg)',
                      background: formData.priority === priority ? 'var(--accent-light)' : 'var(--surface)',
                      transition: 'border-color var(--transition-fast), background var(--transition-fast), box-shadow var(--transition-fast)',
                    }}>
                      <b style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </b>
                      <small style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
                        {priority === 'low' ? 'Minor issue, can wait' : priority === 'medium' ? 'Needs attention soon' : 'Urgent, requires immediate action'}
                      </small>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>
          </section>

          <section className="complaint-section complaint-section-review" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-5)', borderTop: '2px solid var(--border)' }}>
            <div className="section-header" style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-4)', marginBottom: 'var(--space-5)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--border-subtle)' }}>
              <span className="section-number" style={{ flex: '0 0 40px', display: 'grid', placeItems: 'center', width: '40px', height: '40px', borderRadius: 'var(--radius-full)', background: 'var(--accent-light)', color: 'var(--accent)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>04</span>
              <div className="section-titles" style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 'var(--space-1)' }}>Ready to submit?</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)' }}>Review your complaint details before submitting.</p>
              </div>
            </div>

            <div className="review-grid" style={{ display: 'grid', gap: 'var(--space-3)', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div className="review-item" style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <span className="review-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>Category</span>
                <strong className="review-value" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{formData.category || '—'}</strong>
              </div>
              <div className="review-item" style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', gridColumn: '1 / -1' }}>
                <span className="review-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>Title</span>
                <strong className="review-value" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>{formData.title || '—'}</strong>
              </div>
              <div className="review-item" style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <span className="review-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>Location</span>
                <strong className="review-value" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {formData.hostel} · {formData.room} · {formData.floor || '—'}
                </strong>
              </div>
              <div className="review-item" style={{ padding: 'var(--space-4)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
                <span className="review-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>Priority</span>
                <strong className="review-value" style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                </strong>
              </div>
            </div>
          </section>

          <div className="complaint-actions" style={{ marginTop: 'var(--space-4)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="primary" size="lg" loading={loading} style={{ minWidth: '200px' }}>
              <span className="btn-text">Submit complaint</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
          </div>
        </form>
      </main>

      <Footer variant="student" />
    </div>
  );
}