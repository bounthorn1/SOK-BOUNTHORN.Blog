import { useState } from 'react';
import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
const EnvelopeFormIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const TagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const PenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
const QuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);
const PenNibIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const BugIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
);
const SpinnerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
const LocationPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
);

const CONTACT_INFO = [
  { Icon: EmailIcon, label: 'Email Us', value: 'sokbounthorn18@gmail.com', sub: 'We reply within 24 hours' },
  { Icon: LocationIcon, label: 'Location', value: 'Phnom Penh Cambodia', sub: 'Working remotely worldwide' },
  { Icon: ClockIcon, label: 'Response Time', value: 'Within 24 Hours', sub: 'Monday - Friday' },
];

const SOCIAL_LINKS = [
  { Icon: TwitterIcon, label: 'Twitter', href: '#' },
  { Icon: InstagramIcon, label: 'Instagram', href: '#' },
  { Icon: GithubIcon, label: 'GitHub', href: '#' },
  { Icon: LinkedInIcon, label: 'LinkedIn', href: '#' },
];

const QUICK_INFO = [
  { Icon: QuestionIcon, title: 'General Questions', email: 'sokbounthorn18@gmail.com' },
  { Icon: PenNibIcon, title: 'Submit a Story', email: 'wsokbounthorn18@gmail.com' },
  { Icon: BugIcon, title: 'Report a Bug', email: 'sokbounthorn18@gmail.com' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 5000);
    }, 1500);
  };

  return (
    <div>

      {/* HERO */}
      <section className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://www.agoda.com/wp-content/uploads/2024/04/siem-reap-cambodia-angkor-wat-1244x700.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
        </div>
        <div className="absolute top-10 left-10 sm:top-16 sm:left-20 pointer-events-none">
          <span className="block font-display text-[5rem] sm:text-[8rem] font-black text-white/[0.05] leading-none select-none -rotate-6">SAY</span>
        </div>
        <div className="absolute bottom-10 right-10 sm:bottom-16 sm:right-20 pointer-events-none">
          <span className="block font-display text-[4rem] sm:text-[6rem] font-black text-white/[0.04] leading-none select-none rotate-6">HI</span>
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 text-center py-20">
          <RevealSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full mb-6">
              <EmailIcon />
              Contact
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">Get In Touch</h1>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">Have a question, feedback, or just want to say hello? We would love to hear from you.</p>
          </RevealSection>
        </div>
      </section>

      {/* CONTACT CARDS */}
      <section className="relative z-10 -mt-10 sm:-mt-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <RevealSection delay={100}>
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
              {CONTACT_INFO.map((info, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 shadow-lg shadow-black/10 border border-gray-100 dark:border-slate-700 text-center hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mx-auto mb-4 text-orange-500">
                    <info.Icon />
                  </div>
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-1">{info.label}</h3>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white mb-0.5">{info.value}</p>
                  <p className="text-xs text-gray-400 dark:text-slate-500">{info.sub}</p>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            <div className="lg:col-span-3">
              <RevealSection>
                <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest">Send a Message</span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-[1.15] mt-2 mb-2">We Are All Ears</h2>
                <p className="text-gray-500 dark:text-slate-400 text-sm mb-8">Fill out the form below and we will get back to you as soon as possible.</p>
              </RevealSection>

              {sent && (
                <RevealSection>
                  <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 text-white"><CheckIcon /></div>
                    <div>
                      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Message sent successfully!</p>
                      <p className="text-xs text-emerald-600 dark:text-emerald-500">We will get back to you within 24 hours.</p>
                    </div>
                  </div>
                </RevealSection>
              )}

              <RevealSection delay={100}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Your Name</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 dark:text-slate-600"><UserIcon /></div>
                        <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-slate-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Email Address</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 dark:text-slate-600"><EnvelopeFormIcon /></div>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="john@example.com" className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-slate-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Subject</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 dark:text-slate-600"><TagIcon /></div>
                      <input type="text" name="subject" value={form.subject} onChange={handleChange} required placeholder="What is this about?" className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-slate-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 mb-2">Message</label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-3.5 text-gray-300 dark:text-slate-600"><PenIcon /></div>
                      <textarea name="message" value={form.message} onChange={handleChange} required rows="6" placeholder="Tell us what is on your mind..." className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-gray-800 dark:text-white text-sm placeholder:text-gray-300 dark:placeholder:text-slate-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-500/10 focus:bg-white dark:focus:bg-slate-900 transition-all outline-none resize-none"></textarea>
                    </div>
                  </div>
                  <button type="submit" disabled={sending} className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30 hover:scale-[1.01] active:scale-[0.99]">
                    {sending ? (
                      <><span className="animate-spin"><SpinnerIcon /></span><span>Sending...</span></>
                    ) : (
                      <><SendIcon /><span>Send Message</span></>
                    )}
                  </button>
                </form>
              </RevealSection>
            </div>

            <div className="lg:col-span-2">
              <RevealSection delay={200}>
                <div className="sticky top-24 space-y-6">
                  <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 aspect-[4/3] bg-slate-100 dark:bg-slate-800 relative">
                    <img src="https://raw.githubusercontent.com/bounthorn1/Image/refs/heads/main/17180042317139.jpg" alt="Map" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white dark:bg-slate-900 rounded-xl px-5 py-3 shadow-lg flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white"><LocationPinIcon /></div>
                        <div>
                          <p className="text-xs font-bold text-gray-800 dark:text-white">Phnom Penh</p>
                          <p className="text-[10px] text-gray-400">Cambodia</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-4">Quick Info</h3>
                    <div className="space-y-4">
                      {QUICK_INFO.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 mt-0.5 text-orange-500"><item.Icon /></div>
                          <div>
                            <p className="text-xs font-semibold text-gray-800 dark:text-white">{item.title}</p>
                            <p className="text-xs text-gray-400 dark:text-slate-500">{item.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-4">Follow Us</h3>
                    <div className="flex gap-2">
                      {SOCIAL_LINKS.map((social, i) => (
                        <a key={i} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-400 dark:text-slate-500 hover:text-orange-500 hover:border-orange-300 dark:hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all duration-200 hover:scale-110">
                          <social.Icon />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="text-center mb-10">
              <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest">Before You Ask</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2 mb-4">Common Questions</h2>
            </div>
          </RevealSection>
          <div className="space-y-3">
            {[
              { q: 'How long does it take to get a response?', a: 'We typically respond within 24 hours on business days. For urgent matters, we try to get back to you even sooner.' },
              { q: 'Can I submit a guest post?', a: 'Absolutely! Send us an email at sokbounthorn18@gmail.com with a brief pitch and we will review it within a few days.' },
              { q: 'Do you offer advertising or sponsorships?', a: 'We keep Inkwell ad-free to preserve the reading experience. We do not accept sponsored content at this time.' },
              { q: 'I found a bug on the site. What should I do?', a: 'Please email sokbounthorn18@gmail.com with a description of the issue and we will fix it as soon as possible.' },
            ].map((faq, i) => (
              <RevealSection key={i} delay={i * 60}>
                <details className="group bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                  <summary className="flex items-center justify-between px-5 sm:px-6 py-4 cursor-pointer select-none list-none">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white pr-4">{faq.q}</span>
                    <div className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 group-open:bg-orange-500 transition-colors duration-200 text-orange-500 group-open:text-white">
                      <span className="group-open:hidden"><PlusIcon /></span>
                      <span className="hidden group-open:block"><MinusIcon /></span>
                    </div>
                  </summary>
                  <div className="px-5 sm:px-6 pb-4">
                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <RevealSection>
        <section className="relative overflow-hidden bg-orange-500">
          <div className="absolute inset-0"><img src="https://picsum.photos/seed/contact-cta-warm/1600/500.jpg" alt="" className="w-full h-full object-cover mix-blend-overlay opacity-10" /></div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight mb-2">Prefer Reading First?</h2>
              <p className="text-orange-100 text-sm sm:text-base">Check out our latest stories before reaching out.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/blog" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-orange-500 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-lg"><BookOpenIcon /> Browse Stories</Link>
              <Link to="/" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/20">Back to Home</Link>
            </div>
          </div>
        </section>
      </RevealSection>

    </div>
  );
}