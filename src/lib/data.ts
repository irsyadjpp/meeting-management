import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id);

export const teamMembers = [
  { id: 1, name: 'Alex Johnson', role: 'Project Manager', avatar: findImage('avatar1') },
  { id: 2, name: 'Maria Garcia', role: 'Lead Designer', avatar: findImage('avatar2') },
  { id: 3, name: 'James Smith', role: 'Lead Developer', avatar: findImage('avatar3') },
  { id: 4, name: 'Patricia Williams', role: 'QA Engineer', avatar: findImage('avatar4') },
  { id: 5, name: 'Robert Brown', role: 'DevOps Specialist', avatar: findImage('avatar5') },
];

export const meetings = [
  {
    id: '1',
    title: 'Project Phoenix: Q3 Kick-off',
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    attendees: teamMembers,
    status: 'Upcoming',
    agenda: [
      'Review of Q2 Performance (15 min)',
      'Introduction to Q3 Goals (20 min)',
      'Sprint 1 Planning & Task Division (30 min)',
      'Open Floor for Q&A (15 min)',
    ],
    minutes: null,
  },
  {
    id: '2',
    title: 'Weekly Design Sync',
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    startTime: '2:00 PM',
    endTime: '3:00 PM',
    attendees: [teamMembers[1], teamMembers[0]],
    status: 'Completed',
    minutes: `**Summary:**\nThe team reviewed the new user onboarding flow. Maria presented wireframes, and Alex provided feedback on scope alignment.\n\n**Decisions:**\n- Proceed with Option B for the welcome screen.\n- A/B test the tutorial placement.\n\n**Action Items:**\n- [ACTION] @Maria to finalize high-fidelity mockups by EOD Friday.\n- [ ] @Alex to prepare the product spec for the new flow.`
  },
  {
    id: '3',
    title: 'Development Stand-up',
    date: new Date(),
    startTime: '9:00 AM',
    endTime: '9:15 AM',
    attendees: [teamMembers[2], teamMembers[3], teamMembers[4]],
    status: 'Completed',
    minutes: 'Quick updates from everyone. No blockers reported.'
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
    minutes: null
  },
];

export const presentationSlides = [
  findImage('slide1'),
  findImage('slide2'),
  findImage('slide3'),
];

export const getMeetingById = (id: string) => meetings.find(m => m.id === id);
