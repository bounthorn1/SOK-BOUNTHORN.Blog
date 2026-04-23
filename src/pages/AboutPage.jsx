import { Link } from 'react-router-dom';
import RevealSection from '../components/RevealSection';

// ===== Inline SVG Icons =====
const FeatherIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" x2="2" y1="8" y2="22"/><line x1="17.5" x2="9" y1="15" y2="15"/></svg>
);
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
);
const LockOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
);
const CompassIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);
const BanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" x2="19.07" y1="4.93" y2="19.07"/></svg>
);
const SpellCheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);
const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c.922 0 1.668-.746 1.668-1.668C19.678 5.508 16.282 2 12 2z"/></svg>
);
const HandHeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 3.5 2.5 2-1L12 2l4.5 4.5-2 1L12 5Z"/></svg>
);
const QuoteLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
);
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const MinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
);
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);
const PenNibIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
);
const BookOpenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);

const VALUES = [
  { Icon: FeatherIcon, title: 'ការសរសេរពិតប្រាកដ', desc: 'រាល់អត្ថបទត្រូវបានសរសេរដោយភាពស្មោះត្រង់ និងការយកចិត្តទុកដាក់ — គ្មានការទាក់ទាញចុចបោកបញ្ឆោត គ្មានល្បិច SEO មានតែគំនិតពិតៗពីមនុស្សពិតៗប៉ុណ្ណោះ' },
  { Icon: HeartIcon, title: 'បង្កើតឡើងដោយក្តីស្រឡាញ់', desc: 'ប្លក់នេះមានអត្ថិភាព ព្រោះយើងជឿថារឿងរ៉ាវដែលមានអត្ថន័យ គួរតែមានទីកន្លែងស្រស់ស្អាតសម្រាប់រស់នៅ។ រាល់ភីកសែលត្រូវបានរចនាឡើងដោយចេតនាច្បាស់លាស់' },
  { Icon: LockOpenIcon, title: 'ឥតគិតថ្លៃជារៀងរហូត', desc: 'គ្មានការបិទខ្ទប់ការចូលប្រើ គ្មានការជាវសេវា គ្មានចំណាយលាក់កំបាំង។ រាល់រឿងរ៉ាវអាចចូលអានបានដោយសេរីសម្រាប់គ្រប់គ្នា ជានិច្ច.' },
  { Icon: UsersIcon, title: 'សហគមន៍ជាអាទិភាពដំបូង', desc: "យើងមិនមែនកំពុងបង្កើតអ្នកទស្សនាទេ — យើងកំពុងថែរក្សា និងអភិវឌ្ឍសហគមន៍អ្នកអាន និងអ្នកសរសេរ ដែលយកចិត្តទុកដាក់លើភាពជ្រាលជ្រៅ" },
  { Icon: LeafIcon, title: 'មាតិកាយឺត', desc: 'យើងបដិសេធសម្ពាធក្នុងការបោះពុម្ពផ្សាយរៀងរាល់ថ្ងៃ។ គុណភាពលើសបរិមាណ ជានិច្ច។ រាល់រឿងរ៉ាវទទួលបានពេលវេលាដែលវាសមនឹងទទួល.' },
  { Icon: CompassIcon, title: 'ទស្សនៈបើកចំហ', desc: 'យើងស្វាគមន៍ទស្សនៈចម្រុះ និងការពិតដែលអាចធ្វើឲ្យមិនស្រួលចិត្ត។ ការរីកចម្រើនកើតឡើងនៅក្រៅតំបន់សុវត្ថិភាពរបស់អ្នក.' },
];

const DIFFERENT_ITEMS = [
  { Icon: BanIcon, title: 'គ្មាន Algorithms គ្មានភាពរំខាន', desc: "ព័ត៌មាននៅលើទំព័ររបស់អ្នកមិនត្រូវបានកែប្រែ ឬគ្រប់គ្រងដោយអាល់ហ្គូរីធម៍ទេ។ រឿងរ៉ាវបង្ហាញតាមលំដាប់ពេលវេលា — ដូចជារបៀបដែលការអានគួរតែដំណើរការ." },
  { Icon: SpellCheckIcon, title: 'កែសម្រួលដោយការយកចិត្តទុកដាក់', desc: 'រាល់ការផ្ញើអត្ថបទត្រូវបានពិនិត្យដោយផ្តោតលើគុណភាព មិនមែនលើសក្តានុពលការចូលរួមទេ។ យើងយកចិត្តទុកដាក់លើសិល្បៈនៃការសរសេរ មិនមែនចំនួនការចុចទេ' },
  { Icon: PaletteIcon, title: 'បទពិសោធន៍អានដ៏ល្អផូរផង', desc: 'អក្សររចនាស្អាត ប្លង់ដែលបានគិតគូរ និងគ្មានភាពរំខាន។ ការអាននៅលើ Inkwell មានអារម្មណ៍ដូចជាកំពុងកាន់សៀវភៅដែលបានផលិតយ៉ាងប្រណិត' },
  { Icon: HandHeartIcon, title: 'ងាយស្រួលសម្រាប់អ្នកសរសេរ', desc: 'អ្នកសរសេររក្សាសិទ្ធិជាម្ចាស់ពេញលេញ។ គ្មានកិច្ចសន្យាដាក់កម្រិត គ្មានការចាក់សោមាតិកា។ ពាក្យសម្តីរបស់អ្នកគឺជារបស់អ្នកជានិច្ច' },
];

const TIMELINE = [
  { year: '2023', title: 'សេចក្តីព្រាងដំបូង', desc: 'បានចាប់ផ្តើមដូចជាកំណត់ហេតុផ្ទាល់ខ្លួន — មុំស្ងប់ស្ងាត់មួយសម្រាប់រៀបចំគំនិតអំពីជីវិត ការច្នៃប្រឌិត និងពិភពលោក' },
  { year: '2023', title: 'ការបើកទ្វារ', desc: 'Iបានអញ្ជើញមិត្តភក្តិឲ្យសរសេរ។ រឿងរ៉ាវពីអ្នកអញ្ជើញដំបូងបានមកដល់ ហើយអ្វីមួយពិសេសបានចាប់ផ្តើមកើតឡើង' },
  { year: '2024', title: 'ស្វែងរកសំឡេងរបស់យើង', desc: 'បានកំណត់អ្វីដែលធ្វើឲ្យយើងខុសប្លែក៖ ភាពជ្រាលជ្រៅលើសល្បឿន អត្ថន័យលើសលេខស្ថិតិ មនុស្សលើសអាល់ហ្គូរីធម៍' },
  { year: '2024', title: 'រីកចម្រើនជាមួយគ្នា', desc: 'បានឈានដល់ចំណុចសំខាន់ដំបូងនៃអ្នកអាន។ សហគមន៍បានរីកចម្រើនដោយធម្មជាតិ — មួយរឿងរ៉ាវដែលមានការគិតគូរម្តងៗ' },
  { year: '2025', title: 'ជំពូកបន្ទាប់', desc: 'ពង្រីកប្រធានបទ កែលម្អបទពិសោធន៍ការអាន និងរក្សាភាពស្មោះត្រង់ចំពោះអ្វីដែលសំខាន់បំផុត៖ រឿងរ៉ាវ' },
];

export default function AboutPage() {
  return (
    <div>

      {/* HERO */}
      <section className="relative min-h-[55vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/12/4c/ca/2c.jpg" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70"></div>
        </div>
        <div className="absolute top-10 right-10 sm:top-16 sm:right-20 pointer-events-none">
          <span className="block font-display text-[5rem] sm:text-[8rem] font-black text-white/[0.05] leading-none select-none rotate-6">អំពី</span>
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 text-center py-20">
          <RevealSection>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-widest rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              អំពីយើង
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-4">
              រឿងរ៉ាវនៅពីក្រោយ<br />
              <span className="text-orange-300">ដំណើររបស់យើង</span>
            </h1>
            <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              កន្លែងសម្រាប់ការសរសេរដោយគិតពិចារណា ទស្សនៈស្មោះត្រង់ និងពេលវេលាស្ងប់ស្ងាត់ដែលបង្កើតអត្តសញ្ញាណរបស់យើង
            </p>
          </RevealSection>
        </div>
      </section>

      {/* INTRO — WHO WE ARE */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <RevealSection>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img src="https://raw.githubusercontent.com/bounthorn1/Image/refs/heads/main/Gemini_Generated_Image_kjek25kjek25kjek.png" alt="Writing desk" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -right-5 sm:-bottom-6 sm:-right-6 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
                  <img src="https://raw.githubusercontent.com/bounthorn1/Image/refs/heads/main/Gemini_Generated_Image_3op6603op6603op6.png" alt="Coffee cup" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-4 -left-4 bg-orange-500 text-white rounded-xl px-4 py-3 shadow-lg shadow-orange-500/30">
                  <p className="text-2xl font-display font-black leading-none">បង្កើតនៅឆ្នាំ.</p>
                  <p className="text-xs font-semibold uppercase tracking-widest">2023</p>
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={150}>
              <div>
                <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest">យើងជានរណា</span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-[1.15] mt-2 mb-5">
                  លើសពីប្លក់ធម្មតា —<br />
                  <span className="text-orange-500">ទីសក្ការៈសម្រាប់រឿងរ៉ាវ</span>
                </h2>
                <div className="space-y-4 text-gray-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                  <p>BOUNTHORN.Blog បានកើតឡើងពីជំនឿដ៏សាមញ្ញមួយ៖ នៅក្នុងពិភពលោកដែលផ្តោតលើល្បឿន និងភាពល្បីភ្លាមៗ គួរតែមានកន្លែងមួយដែលការសរសេរអាចដកដង្ហើមបាន។ កន្លែងដែលរឿងរ៉ាវមិនចាំបាច់ប្រកួតប្រជែងដើម្បីទទួលបានការយកចិត្តទុកដាក់ — វាត្រឹមតែត្រូវការភាពពិតប៉ុណ្ណោះ</p>
                  <p>យើងបានចាប់ផ្តើមដូចជាកំណត់ហេតុផ្ទាល់ខ្លួន មុំស្ងប់ស្ងាត់មួយសម្រាប់រៀបចំគំនិតអំពីជីវិត ការច្នៃប្រឌិត ការបាត់បង់ និងភាពអស្ចារ្យ។ ប៉ុន្តែមានអ្វីមួយកើតឡើងនៅលើផ្លូវនោះ — មនុស្សផ្សេងទៀតបានចាប់ផ្តើមមានអារម្មណ៍ពាក់ព័ន្ធ។ ពួកគេចាប់ផ្តើមចែករំលែករឿងរ៉ាវរបស់ពួកគេផ្ទាល់។ ហើយអ្វីដែលធ្លាប់ជាសំឡេងខ្សឹបខ្សៀវ បានក្លាយជាការសន្ទនា</p>
                  <p>សព្វថ្ងៃ Inkwell គឺជាសហគមន៍កំពុងរីកចម្រើននៃអ្នកសរសេរ និងអ្នកអាន ដែលជឿថារឿងរ៉ាវល្អបំផុតមិនមែនជារឿងដែលមានសំឡេងខ្លាំងបំផុតទេ — តែជារឿងដែលស្មោះត្រង់បំផុត។ យើងមិនតាមដាននិន្នាការ។ យើងមិនបង្កើនប្រសិទ្ធភាពសម្រាប់អាល់ហ្គូរីធម៍ទេ។ យើងសរសេរអ្វីដែលមានអត្ថន័យពិតប្រាកដ​ ។.</p>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link to="/blog" className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg shadow-orange-500/25">
                    អានរឿងរ៉ាវរបស់យើង <ArrowRightIcon />
                  </Link>
                  <Link to="/create" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 font-semibold text-sm rounded-xl hover:border-orange-300 hover:text-orange-600 dark:hover:border-orange-500 dark:hover:text-orange-400 transition-all">
                    <PenNibIcon /> ចែករំលែករឿងរ៉ាវរបស់អ្នក
                  </Link>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <RevealSection>
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://picsum.photos/seed/about-stats-bg/1600/500.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
              {[
                { number: '500+', label: 'Stories Published' },
                { number: '50+', label: 'Writers' },
                { number: '10K+', label: 'Monthly Readers' },
                { number: '100%', label: 'Free to Read' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-1">{stat.number}</p>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-bold">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* VALUES */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest">អ្វីដែលយើងជឿជាក់</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2 mb-4">តម្លៃស្នូលរបស់យើង</h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">Tទាំងនេះមិនមែនគ្រាន់តែជាពាក្យនៅលើទំព័រទេ — វាជាគោលការណ៍ដែលណែនាំរាល់រឿងរ៉ាវដែលយើងផ្សព្វផ្សាយ និងរាល់ការសម្រេចចិត្តដែលយើងធ្វើ ។.</p>
            </div>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {VALUES.map((val, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 sm:p-7 border border-gray-100 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center mb-5 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <val.Icon />
                  </div>
                  <h3 className="font-display text-base font-bold text-gray-900 dark:text-white mb-2">{val.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{val.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="bg-slate-50 dark:bg-slate-800 py-16 sm:py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <RevealSection>
              <div>
                <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest">ហេតុអ្វីដែល BOUNTHORN</span>
                <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white leading-[1.15] mt-2 mb-5">
                  អ្វីដែលធ្វើឱ្យយើងខុស<br />
                  <span className="text-orange-500">ពីគ្នា</span>
                </h2>
                <div className="space-y-6">
                  {DIFFERENT_ITEMS.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 text-orange-500">
                        <item.Icon />
                      </div>
                      <div>
                        <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/6e/59/34/caption.jpg?w=1400&h=-1&s=1" alt="Reading nook" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-xl">
                  <img src="https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1280,h_720/w_79,x_14,y_14,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/zov0u6w4i5l6iovmnafw/AngkorWatFullDayTourwithMonkBlessing.webp" alt="Bookshelf" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500">
                      <QuoteLeftIcon />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-800 dark:text-white italic">"ការសរសេរល្អបំផុត</p>
                      <p className="text-xs font-semibold text-gray-800 dark:text-white italic">មានអារម្មណ៍ដូចជាកំពុងនិយាយ</p>
                      <p className="text-xs font-semibold text-gray-800 dark:text-white italic">មានអារម្មណ៍ដូចជាកំពុងនិយាយ."</p>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest">ដំណើររបស់យើង</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2 mb-4">របៀបដែលវាទាំងអស់បានចាប់ផ្តើម</h2>
              <p className="text-gray-500 dark:text-slate-400 text-sm sm:text-base leading-relaxed">ពីកំណត់ហេតុផ្ទាល់ខ្លួន ទៅកាន់សហគមន៍កំពុងរីកចម្រើន — នេះជារឿងរ៉ាវរបស់ BOUNTHORN BlOG ជាប្រការទៅមួយប្រការ</p>
            </div>
          </RevealSection>
          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700"></div>
            {TIMELINE.map((item, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className={`relative flex items-start gap-6 sm:gap-0 mb-10 last:mb-0 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-orange-500 border-4 border-white dark:border-slate-900 shadow-md z-10 mt-1.5"></div>
                  <div className={`ml-10 sm:ml-0 sm:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'sm:pr-0 sm:text-right' : 'sm:pl-0 sm:text-left'}`}>
                    <span className="inline-block text-orange-500 text-[11px] font-bold uppercase tracking-widest mb-1">{item.year}</span>
                    <h3 className="font-display text-base font-bold text-gray-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]"></div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <RevealSection>
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://picsum.photos/seed/about-testimonial-bg/1600/500.jpg" alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/55"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
            <div className="text-orange-500/40 mb-6"><QuoteLeftIcon /></div>
            <blockquote className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug mb-6">
              "BOUNTHORN.BLOG គឺជាប្លក់តែមួយគត់ដែលខ្ញុំអាន ហើយខ្ញុំមានអារម្មណ៍ថាអ្នកសរសេរពិតជាយកចិត្តទុកដាក់ចំពោះអ្វីដែលពួកគេកំពុងនិយាយ រាល់អត្ថបទធ្វើឲ្យខ្ញុំគិតបន្តរយៈពេលជាច្រើនថ្ងៃ"
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                <img src="https://picsum.photos/seed/about-reviewer/80/80.jpg" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">Sarah Chen</p>
                <p className="text-[11px] text-white/50">Reader since 2023</p>
              </div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* FAQ */}
      <section className="bg-white dark:bg-slate-900 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <RevealSection>
            <div className="text-center mb-12">
              <span className="text-orange-500 text-[11px] font-bold uppercase tracking-widest">FAQ</span>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-2">សំណួរដែលសួរញឹកញាប់</h2>
            </div>
          </RevealSection>
          <div className="space-y-4">
            {[
              { q: 'តើអ្នកណាក៏អាចសរសេរឲ្យ BOUNTHORN.BLOG បានទេ?', a: "បាទ/ចាស! យើងស្វាគមន៍ការផ្ញើអត្ថបទពីគ្រប់គ្នា។ មិនថាអ្នកជាអ្នកសរសេរដែលមានបទពិសោធន៍ ឬកំពុងចែករំលែករឿងរ៉ាវដំបូងរបស់អ្នកទេ យើងពិនិត្យរាល់អត្ថបទដោយការយកចិត្តទុកដាក់ និងការគោរពដូចគ្នា ។" },
              { q: 'តើវាពិតជាឥតគិតថ្លៃមែនទេ?', a: 'ពេញលេញ។ គ្មានការបិទខ្ទប់ការចូលប្រើ គ្មានកម្រិតសេវាពិសេស (premium tiers) គ្មានល្បិច “សាកល្បងឥតគិតថ្លៃ” ទេ។ រាល់រឿងរ៉ាវនៅលើ Inkwell អាចអានបានដោយសេរី ជានិច្ច — បានតែងតែជាដូច្នេះ និងនឹងនៅតែជាដូច្នេះជានិច្ច' },
              { q: 'តើអ្នកជ្រើសរើសរឿងរ៉ាវណាដែលត្រូវផ្សាយយ៉ាងដូចម្តេច?', a: 'យើងស្វែងរកភាពពិតប្រាកដ សិល្បៈនៃការសរសេរ និងភាពជ្រាលជ្រៅ។ យើងមិនយកចិត្តទុកដាក់លើប្រធានបទដែលកំពុងពេញនិយម ឬកម្រិតពាក្យគន្លឹះទេ។ ប្រសិនបើរឿងរ៉ាវមានភាពស្មោះត្រង់ និងសរសេរបានល្អ វានឹងមានទីកន្លែងនៅទីនេះ' },
              { q: 'តើអ្នកសរសេររក្សាសិទ្ធិជាម្ចាស់លើស្នាដៃរបស់ពួកគេទេ?', a: 'ពិតជាមែន។ អ្នកសរសេររក្សាសិទ្ធិជាម្ចាស់ពេញលេញ។ យើងមិនដែលបិទខ្ទប់មាតិកា ឬស្នើសុំសិទ្ធិផ្តាច់មុខទេ។ ពាក្យសម្តីរបស់អ្នកគឺជារបស់អ្នកជានិច្ច' },
              { q: 'តើខ្ញុំអាចគាំទ្រ BOUNTHORN.BLOG ដោយរបៀបណា?', a: 'វិធីល្អបំផុតគឺការអាន ចែករំលែករឿងរ៉ាវដែលអ្នកស្រឡាញ់ និងពិចារណាសរសេររឿងរបស់អ្នកផ្ទាល់។ ការប្រាប់បន្តពីមាត់មួយទៅមាត់មួយ គឺជាខ្សែជីវិតសំខាន់របស់ការបោះពុម្ពផ្សាយឯករាជ្យ' },
            ].map((faq, i) => (
              <RevealSection key={i} delay={i * 60}>
                <details className="group bg-slate-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                  <summary className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 cursor-pointer select-none list-none">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white pr-4">{faq.q}</span>
                    <div className="w-7 h-7 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center shrink-0 group-open:bg-orange-500 transition-colors duration-200 text-orange-500 group-open:text-white">
                      <span className="group-open:hidden"><PlusIcon /></span>
                      <span className="hidden group-open:block"><MinusIcon /></span>
                    </div>
                  </summary>
                  <div className="px-5 sm:px-6 pb-4 sm:pb-5">
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
          <div className="absolute inset-0">
            <img src="https://picsum.photos/seed/about-cta-orange/1600/500.jpg" alt="" className="w-full h-full object-cover mix-blend-overlay opacity-10" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-white leading-tight mb-2">ត្រៀមខ្លួនរួចហើយដើម្បីចូលរួមឬនៅ?</h2>
              <p className="text-orange-100 text-sm sm:text-base">ចាប់ផ្តើមអាន ឬចែករំលែករឿងរ៉ាវដំបូងរបស់អ្នក — វាឥតគិតថ្លៃ</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link to="/blog" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-orange-500 font-semibold text-sm rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                <BookOpenIcon /> អានរឿងរ៉ាវ
              </Link>
              <Link to="/create" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/15 text-white font-semibold text-sm rounded-xl hover:bg-white/25 transition-colors border border-white/20">
                <PenNibIcon /> ចាប់ផ្តើមសរសេរ
              </Link>
            </div>
          </div>
        </section>
      </RevealSection>

    </div>
  );
}