import { useState } from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/common/Button';
import { StatusBadge } from '../../components/common/StatusBadge';

const students = [
  { id: 1, name: 'Abhay Jaswal', email: 'abhay.j@example.edu', studentId: 'CS24-1042', room: 'B-204', course: 'Computer Science', floor: '2nd', status: 'active' },
  { id: 2, name: 'Karan Mehta', email: 'karan.m@example.edu', studentId: 'CS24-1098', room: 'B-208', course: 'Computer Science', floor: '2nd', status: 'active' },
  { id: 3, name: 'Priya Singh', email: 'priya.s@example.edu', studentId: 'IT24-2017', room: 'B-116', course: 'Information Tech.', floor: '1st', status: 'active' },
  { id: 4, name: 'Arjun Verma', email: 'arjun.v@example.edu', studentId: 'ME24-3021', room: 'B-307', course: 'Mechanical Eng.', floor: '3rd', status: 'active' },
  { id: 5, name: 'Neha Sharma', email: 'neha.s@example.edu', studentId: 'EC24-1184', room: 'B-108', course: 'Electronics', floor: '1st', status: 'active' },
  { id: 6, name: 'Rohit Kumar', email: 'rohit.k@example.edu', studentId: 'CS24-1277', room: 'B-212', course: 'Computer Science', floor: '2nd', status: 'active' },
];

export function WardenStudentsPage() {
  const [search, setSearch] = useState('');
  const [floorFilter, setFloorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.studentId.toLowerCase().includes(search.toLowerCase());
    const matchesFloor = floorFilter === 'all' || s.floor === floorFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesFloor && matchesStatus;
  });

  return (
    <div className="dashboard-page warden-page" style={{ background: `
      radial-gradient(ellipse 60% 40% at 85% 10%, var(--accent-muted), transparent 50%),
      radial-gradient(ellipse 50% 35% at 10% 90%, var(--success-muted), transparent 45%),
      var(--bg)
    ` }}>
      <Navbar variant="warden" />
      
      <main className="management-shell" style={{ maxWidth: '1360px', margin: '0 auto', padding: 'var(--space-8) var(--space-4) var(--space-16)' }}>
        <section className="management-heading" style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--space-5)', 
          padding: 'var(--space-5) var(--space-2) var(--space-6)' 
        }}>
          <div>
            <p className="eyebrow" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-xs)',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              <span className="eyebrow-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }}></span>
              WARDEN PORTAL • BLOCK B
            </p>
            <h1 style={{ fontSize: 'clamp(40px, 8vw, 70px)', lineHeight: 0.94, letterSpacing: '-0.04em', fontWeight: 600 }}>
              Resident <em>students.</em>
            </h1>
            <p style={{ maxWidth: '560px', marginTop: 'var(--space-3)', color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 'var(--leading-relaxed)' }}>
              View and manage students residing in Block B.
            </p>
          </div>
        </section>

        <section className="directory-kpis" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <article className="kpi-card" style={{ padding: 'var(--space-4) var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
            <span className="kpi-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>TOTAL RESIDENTS</span>
            <strong className="kpi-value" style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--text-primary)' }}>118</strong>
          </article>
          <article className="kpi-card" style={{ padding: 'var(--space-4) var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
            <span className="kpi-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>ACTIVE</span>
            <strong className="kpi-value" style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--text-primary)' }}>114</strong>
          </article>
          <article className="kpi-card" style={{ padding: 'var(--space-4) var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
            <span className="kpi-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>ON LEAVE</span>
            <strong className="kpi-value" style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--text-primary)' }}>4</strong>
          </article>
          <article className="kpi-card" style={{ padding: 'var(--space-4) var(--space-4)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
            <span className="kpi-label" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-1)' }}>COMPLAINTS THIS MONTH</span>
            <strong className="kpi-value" style={{ display: 'block', fontSize: 'var(--text-3xl)', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 700, color: 'var(--text-primary)' }}>24</strong>
          </article>
        </section>

        <section className="directory-card" style={{ padding: 'var(--space-5)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xs)' }}>
          <div className="directory-toolbar" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--surface-secondary)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <div className="search-box" style={{ flex: 1, minWidth: 0, maxWidth: '400px', position: 'relative' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true" style={{ position: 'absolute', left: 'var(--space-3)', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input 
                type="search" 
                placeholder="Search students by name or ID..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: '100%', height: '44px', padding: '0 var(--space-4) 0 44px', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}
              />
            </div>
            <div className="filter-group" style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <select 
                value={floorFilter} 
                onChange={(e) => setFloorFilter(e.target.value)}
                className="filter-select"
                style={{ height: '44px', padding: '0 var(--space-10) 0 var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', cursor: 'pointer', appearance: 'none', minWidth: '160px' }}
              >
                <option value="all">All floors</option>
                <option value="Ground">Ground floor</option>
                <option value="1st">1st floor</option>
                <option value="2nd">2nd floor</option>
                <option value="3rd">3rd floor</option>
              </select>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
                style={{ height: '44px', padding: '0 var(--space-10) 0 var(--space-4)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', background: 'var(--surface)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)', cursor: 'pointer', appearance: 'none', minWidth: '160px' }}
              >
                <option value="all">All status</option>
                <option value="active">Active</option>
                <option value="leave">On leave</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="table-wrap" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table className="student-table" style={{ width: '100%', borderCollapse: 'collapse', minWidth: '720px' }}>
              <thead>
                <tr>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>STUDENT</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>STUDENT ID</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>ROOM</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>COURSE</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>FLOOR</th>
                  <th style={{ padding: 'var(--space-3) var(--space-3)', textAlign: 'left', color: 'var(--text-muted)', fontSize: 'var(--text-xs)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} style={{ transition: 'background var(--transition-fast)' }}>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)' }}>
                      <div className="person-cell" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <span className="table-avatar" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center', flex: 'none', borderRadius: '50%', background: 'var(--surface-tertiary)', color: 'var(--text-primary)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                          {student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </span>
                        <div>
                          <strong style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{student.name}</strong>
                          <small style={{ display: 'block', marginTop: '2px', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>{student.email}</small>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{student.studentId}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{student.room}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{student.course}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>{student.floor}</td>
                    <td style={{ padding: 'var(--space-3) var(--space-3)', borderBottom: '1px solid var(--border-subtle)', fontSize: 'var(--text-sm)', whiteSpace: 'nowrap' }}>
                      <StatusBadge status={student.status} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-student-list" style={{ display: 'grid', gap: 0 }}>
            {filteredStudents.map(student => (
              <article key={student.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-2)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="person-cell" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <span className="table-avatar" style={{ width: '36px', height: '36px', display: 'grid', placeItems: 'center', flex: 'none', borderRadius: '50%', background: 'var(--surface-tertiary)', color: 'var(--text-primary)', fontSize: 'var(--text-xs)', fontWeight: 700 }}>
                    {student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                  <div>
                    <strong>{student.name}</strong>
                    <small style={{ display: 'block' }}>{student.studentId} · {student.room} · {student.floor} Floor</small>
                  </div>
                </div>
                <StatusBadge status={student.status} size="sm" />
              </article>
            ))}
          </div>

          <div className="pagination" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-2)', color: 'var(--text-muted)', fontSize: 'var(--text-xs)' }}>
            <span>Showing 1–6 of 118 students</span>
            <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
              <button aria-label="Previous page" style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>←</button>
              <b style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--text-primary)', borderRadius: 'var(--radius-sm)', background: 'var(--text-primary)', color: 'var(--text-inverse)', fontSize: 'var(--text-xs)', fontWeight: 600 }}>1</b>
              <button aria-label="Page 2" style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>2</button>
              <button aria-label="Page 3" style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>3</button>
              <button aria-label="Next page" style={{ width: '34px', height: '34px', display: 'grid', placeItems: 'center', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', fontSize: 'var(--text-xs)', fontWeight: 600, cursor: 'pointer' }}>→</button>
            </div>
          </div>
        </section>
      </main>

      <Footer variant="warden" />
    </div>
  );
}