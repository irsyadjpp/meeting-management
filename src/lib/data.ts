
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const teamMembers = [
  { id: 1, name: 'Irsyad Jamal Pratama Putra', role: 'Project Director', avatar: findImage('avatar1') },
  { id: 2, name: 'Aris Indro', role: 'Advisor', avatar: findImage('avatar2') },
  { id: 3, name: 'Rizki Karami', role: 'Sekretaris 1 (Strategic)', avatar: findImage('avatar3') },
  { id: 4, name: 'Annisa Syafira', role: 'Sekretaris 2 (Ops)', avatar: findImage('avatar4') },
  { id: 5, name: 'Selvi Yulia', role: 'Bendahara', avatar: findImage('avatar5') },
  { id: 6, name: 'Maria Garcia', role: 'Lead Designer', avatar: findImage('avatar2') },
  { id: 7, name: 'James Smith', role: 'Lead Developer', avatar: findImage('avatar3') },
];

export const steeringCommittee = [
    { name: 'Irsyad Jamal Pratama Putra', role: 'Project Director', tasks: ['Strategy vision', 'External face (PBSI/Sponsor)', 'Final decision maker'], avatar: findImage('avatar1') },
    { name: 'Aris Indro', role: 'Advisor', tasks: ['Strategic consultation', 'Conflict mediation', 'Guardian of values'], avatar: findImage('avatar2') },
    { name: 'Rizki Karami', role: 'Sekretaris 1 (Strategic)', tasks: ['Legal docs', 'Cross-division bridge', 'Meeting leader'], avatar: findImage('avatar3') },
    { name: 'Annisa Syafira', role: 'Sekretaris 2 (Ops)', tasks: ['Data tracking', 'Digital archiving', 'Admin support'], avatar: findImage('avatar4') },
    { name: 'Selvi Yulia', role: 'Bendahara', tasks: ['RAB planning', 'Cash flow gatekeeper', 'Financial report (LPJ)'], avatar: findImage('avatar5') },
];

export const divisions = [
    {
        name: 'Match Control & Integrity',
        coordinator: { name: 'Wicky', role: 'Coordinator (Pengkot PBSI)', tasks: ['Scheduling', 'Referee assignment'], avatar: findImage('avatar1') },
        members: [
            { name: 'Risca Amalia', role: 'MLO', tasks: ['Liaison for officials', 'Field readiness'], avatar: findImage('avatar2') },
            { name: 'Anindiffa', role: 'TPF (Verification Team)', tasks: ['Data validation', 'Fraud detection'], avatar: findImage('avatar3') },
            { name: 'Aulia Febrianto', role: 'TPF (Verification Team)', tasks: ['Data validation', 'Fraud detection'], avatar: findImage('avatar4') },
            { name: 'Faiz Azilla', role: 'TPF (Verification Team)', tasks: ['Data validation', 'Fraud detection'], avatar: findImage('avatar5') },
        ]
    },
    {
        name: 'Commercial (Business)',
        coordinator: { name: 'Ali Wardana', role: 'Sponsorship Liaison', tasks: ['Sponsor deliverables & relations'], avatar: findImage('avatar1')},
        members: [
            { name: '[VACANT]', role: 'Tenant Relations', tasks: [], isVacant: true },
        ]
    },
    {
        name: 'Show & Media (Creative)',
        coordinator: { name: 'Rizki Karami', role: 'Coordinator', tasks: ['Show concept', 'Visual branding'], avatar: findImage('avatar2') },
        members: [
            { name: 'Sarah Maulidina', role: 'Media/Sosmed', tasks: ['Social media management'], avatar: findImage('avatar3') },
            { name: 'Sarah Fatmawati', role: 'Content Creator', tasks: ['Reels/TikTok production'], avatar: findImage('avatar4') },
            { name: 'Rizky Mauludin', role: 'Documentation', tasks: ['Photo/Video coverage'], avatar: findImage('avatar5') },
        ]
    },
    {
        name: 'Operations',
        coordinator: { name: 'Kevin Deriansyah Budiman', role: 'Coordinator', tasks: ['Venue layout', 'Logistics flow'], avatar: findImage('avatar1') },
        members: [
            { name: 'Muhammad Nur Sidiq Buana', role: 'Security', tasks: ['Gate control', 'Crowd safety'], avatar: findImage('avatar2') },
            { name: 'Ananda Putri', role: 'Medic', tasks: ['First aid', 'Injury handling'], avatar: findImage('avatar3') },
            { name: 'Norma Ayu Laras Tyas', role: 'Registration', tasks: ['Athlete check-in'], avatar: findImage('avatar4') },
            { name: 'Muhammad Alfintor', role: 'Logistics', tasks: ['Equipment & cleaning'], avatar: findImage('avatar5') },
        ]
    },
    {
        name: 'IT & Digital',
        coordinator: { name: 'Irsyad Jamal Pratama Putra', role: 'Coordinator', tasks: [], avatar: findImage('avatar1') },
        members: [
            { name: '[VACANT]', role: 'SysAdmin/Live Score', tasks: [], isVacant: true },
        ]
    },
    {
        name: 'Legal',
        coordinator: { name: 'Lidya', role: 'Coordinator', tasks: [], avatar: findImage('avatar2') },
        members: [
            { name: '[VACANT]', role: 'Permits', tasks: [], isVacant: true },
        ]
    }
];

export const meetings = [
  {
    id: '1',
    title: 'Rapat Koordinasi: Persiapan BCC 2026',
    date: new Date(),
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    attendees: steeringCommittee.map((m, i) => ({ ...m, id: i+1 })),
    status: 'Live',
    agenda: [
      'Finalisasi Visi & Misi Acara (15 min)',
      'Pembahasan Anggaran & Sponsor Utama (20 min)',
      'Penetapan Koordinator Divisi (30 min)',
      'Q&A dan Langkah Selanjutnya (15 min)',
    ],
    minutes: null,
    isSyncedToGoogle: true,
    googleMeetLink: 'https://meet.google.com/bcc-2026-meet',
  },
  {
    id: '2',
    title: 'Weekly Design Sync',
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    startTime: '2:00 PM',
    endTime: '3:00 PM',
    attendees: [teamMembers[1], teamMembers[0]],
    status: 'Completed',
    minutes: `**Summary:**\nThe team reviewed the new user onboarding flow. Maria presented wireframes, and Alex provided feedback on scope alignment.\n\n**Decisions:**\n- Proceed with Option B for the welcome screen.\n- A/B test the tutorial placement.\n\n**Action Items:**\n- [ACTION] @Maria to finalize high-fidelity mockups by EOD Friday.\n- [ ] @Alex to prepare the product spec for the new flow.`,
    isSyncedToGoogle: false,
    googleMeetLink: null,
  },
  {
    id: '3',
    title: 'Development Stand-up',
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
    startTime: '9:00 AM',
    endTime: '9:15 AM',
    attendees: [teamMembers[2], teamMembers[3], teamMembers[4]],
    status: 'Upcoming',
    minutes: 'Quick updates from everyone. No blockers reported.',
    isSyncedToGoogle: false,
    googleMeetLink: null,
  },
    {
    id: '4',
    title: 'Marketing Strategy Session',
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    startTime: '1:00 PM',
    endTime: '2:30 PM',
    attendees: [teamMembers[0], teamMembers[1]],
    status: 'Upcoming',
    agenda: [
        'Campaign brainstorming (45 min)',
        'Budget allocation (30 min)',
        'Next steps (15 min)'
    ],
    minutes: null,
    isSyncedToGoogle: false,
    googleMeetLink: null,
  },
];

export const presentationSlides = [
  findImage('slide1'),
  findImage('slide2'),
  findImage('slide3'),
];

export const getMeetingById = (id: string) => meetings.find(m => m.id === id);
