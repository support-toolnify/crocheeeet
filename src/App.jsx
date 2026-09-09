import { useState, useEffect, useRef, useMemo, useId } from 'react'
import {
  BookmarkSimple,
  Printer,
  ShareNetwork,
  Check,
  CaretLeft,
  CaretRight,
  MagnifyingGlass,
  House,
  Bookmark,
  SquaresFour,
  List,
  X,
  ArrowUpRight,
  Sparkle,
  Timer,
  CheckCircle,
  Circle,
  ArrowRight,
  FilePdf,
  DownloadSimple,
  Eye,
  ChatCircle,
  Star,
  Fire,
  BookOpen,
  Feather,
  ArrowLineUp,
  DotsThree,
  Plus,
  Minus,
  Heart,
  Clock,
  User,
  TrendUp
} from '@phosphor-icons/react'

// ─── DATA ───
const featured = {
  id: 1,
  category: "Cover Story",
  title: "The 47-Hour Cardigan That Broke Our Community — In the Best Way",
  excerpt: "How a single mesh technique turned into a 12,000-person make-along, and what it taught us about slow fashion in 2026.",
  author: { name: "Mila Chen", avatar: "https://i.pravatar.cc/100?img=5", role: "Designer in Residence" },
  date: "Sep 8",
  readTime: "12 min",
  views: "24.3k",
  image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1400&h=900&fit=crop",
  difficulty: "Intermediate"
}

const trending = [
  { id: 2, n: "01", category: "Technique", title: "Why your granny squares curl — and the 2-stitch fix", author: "Sage Nakamura", time: "5 min", img: "https://images.unsplash.com/photo-1520903922286-652ae563cb3a?w=400&h=400&fit=crop" },
  { id: 3, n: "02", category: "Color", title: "A yarn color system that predicts virality", author: "Juniper Wu", time: "8 min", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop" },
  { id: 4, n: "03", category: "Business", title: "I made $14k in one drop without launching", author: "Alex Rivera", time: "6 min", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop" },
]

const feed = [
  { id: 5, cat: "Amigurumi", title: "Designing faces: how 2mm changes everything", exc: "The micro-adjustments that make amigurumi feel alive.", author: "Tiny Friends Co", time: "7 min", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=800&h=600&fit=crop", span: "lg:col-span-7" },
  { id: 6, cat: "Essay", title: "On ripping out: a meditation on frogging", exc: "What undoing 6 hours of work teaches you about control.", author: "Mila Chen", time: "9 min", img: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=800&fit=crop", span: "lg:col-span-5 lg:row-span-2" },
  { id: 7, cat: "Home", title: "The cottagecore blanket formula", exc: "A repeatable system for blankets that look expensive.", author: "Vintage Loops", time: "4 min", img: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=600&h=600&fit=crop", span: "lg:col-span-4" },
  { id: 8, cat: "Bags", title: "Market bags that actually hold groceries", exc: "Engineering stretch without sag.", author: "Eco Stitch", time: "5 min", img: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=400&fit=crop", span: "lg:col-span-3" },
  { id: 9, cat: "Wearables", title: "Strawberry hat summer", exc: "The 3k-in-48h pattern.", author: "Berry Yarns", time: "3 min", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop", span: "lg:col-span-5" },
  { id: 10, cat: "Tools", title: "Hook review: is the $40 hook worth it?", exc: "100 hours of testing, 12 hooks.", author: "Tool Lab", time: "10 min", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop", span: "lg:col-span-7" },
]

const sections = [
  { id: "intro", t: "Introduction" },
  { id: "materials", t: "Materials" },
  { id: "pattern", t: "Pattern Mode" },
  { id: "technique", t: "Shaping" },
  { id: "community", t: "Community" },
]

const steps = [
  { id: 1, title: "Foundation", d: "Ch 89 (multiple of 8 +1). Mark first st.", time: "10m", st: "89 ch" },
  { id: 2, title: "Row 1 — Setup", d: "Sc in 2nd ch, *ch3, sk3, sc* repeat. Turn.", time: "18m", st: "22 sc" },
  { id: 3, title: "Row 2 — Mesh", d: "Ch4 (=dc+ch1), dc in sc, *ch1, dc in ch-3 sp* repeat.", time: "22m", st: "23 dc" },
  { id: 4, title: "Row 3 — Eyelet", d: "Sc in dc, *sc in ch-1, ch3, sc in ch-1, sc in dc* — heirloom lace.", time: "25m", st: "x11 rep" },
  { id: 5, title: "Rows 4-47 — Repeat", d: "Repeat Rows 2-3, inc 1 each side every 6th row. Mark inc.", time: "6h", st: "~1.2k sts" },
  { id: 6, title: "Finish", d: "Sc border, 3sc corners. Wet block to 42\" wingspan.", time: "1.5h", st: "Blocking" },
]

const related = [
  { id: 11, cat: "Fit", title: "The math behind perfect fit", time: "6 min", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop" },
  { id: 12, cat: "Finish", title: "Blocking like a pro", time: "4 min", img: "https://images.unsplash.com/photo-1520903922286-652ae563cb3a?w=400&h=300&fit=crop" },
  { id: 13, cat: "Yarn", title: "Substitutions that work", time: "8 min", img: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=300&fit=crop" },
  { id: 14, cat: "Shop", title: "From pattern to drop", time: "12 min", img: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop" },
]

export default function App() {
  const [article, setArticle] = useState(null)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState("intro")
  const [done, setDone] = useState(new Set([1]))
  const [saved, setSaved] = useState(false)
  const [toast, setToast] = useState(null)
  const [email, setEmail] = useState("")
  const [showToc, setShowToc] = useState(false)
  const [q, setQ] = useState("")
  const [relIdx, setRelIdx] = useState(0)
  
  const articleRef = useRef(null)
  const refs = useRef({})
  const emailId = useId()

  // Progress
  useEffect(() => {
    if (!article) return
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const h = el.offsetHeight - window.innerHeight + 200
      const p = Math.min(100, Math.max(0, (window.scrollY / h) * 100))
      setProgress(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [article])

  // ToC observer
  useEffect(() => {
    if (!article) return
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: "-30% 0px -60% 0px" })
    Object.values(refs.current).forEach(r => r && obs.observe(r))
    return () => obs.disconnect()
  }, [article])

  const notify = (m) => { setToast(m); setTimeout(() => setToast(null), 2800) }

  const filtered = useMemo(() => {
    if (!q) return feed
    return feed.filter(f => f.title.toLowerCase().includes(q.toLowerCase()))
  }, [q])

  const pct = Math.round((done.size / steps.length) * 100)

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FFFCF8] text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
        {toast && (
          <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0A0A0B] text-white px-5 py-3 rounded-full text-[13px] font-medium shadow-[0_16px_32px_rgba(0,0,0,0.2)] flex items-center gap-2 animate-[in_200ms_ease]">
            <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center"><Check size={12} weight="bold" /></div>
            {toast}
          </div>
        )}

        {/* Header — ultra minimal, 2026 */}
        <header className="sticky top-0 z-40 bg-[#FFFCF8]/80 backdrop-blur-[20px] border-b border-[#0A0A0B]/[0.06]">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
            <div className="flex items-center gap-10">
              <button onClick={() => setArticle(null)} className="flex items-center gap-2.5 group cursor-pointer" aria-label="Home">
                <div className="w-7 h-7 rounded-full bg-[#0A0A0B] text-white grid place-items-center font-serif font-bold text-[14px] group-hover:scale-105 transition-transform duration-200">c</div>
                <span className="font-serif font-[750] text-[18px] tracking-[-0.02em]">crocheeeet</span>
                <span className="hidden md:inline text-[10px] font-medium tracking-widest uppercase px-2 py-0.5 rounded-full bg-[#0A0A0B]/5 border border-[#0A0A0B]/10">ATELIER</span>
              </button>
              <nav className="hidden lg:flex items-center gap-1">
                {["Latest","Patterns","Technique","Essays","Shop"].map(n => (
                  <a key={n} href="#" className="px-3.5 py-2 rounded-full text-[13px] font-[500] tracking-[-0.01em] text-[#0A0A0B]/70 hover:text-[#0A0A0B] hover:bg-[#0A0A0B]/[0.04] transition-all duration-200 cursor-pointer">{n}</a>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-[#0A0A0B]/[0.04] border border-[#0A0A0B]/[0.06]">
                <div className="pl-3 pr-1 flex items-center gap-2">
                  <MagnifyingGlass size={14} className="text-[#0A0A0B]/40" />
                  <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search atelier" className="bg-transparent outline-none text-[13px] w-[160px] placeholder:text-[#0A0A0B]/40" />
                </div>
                <button className="w-7 h-7 rounded-full bg-white shadow-sm grid place-items-center cursor-pointer hover:shadow transition-shadow duration-200"><ArrowRight size={14} /></button>
              </div>
              <button className="hidden md:inline-flex h-9 px-5 rounded-full bg-[#0A0A0B] text-white text-[13px] font-medium tracking-[-0.01em] hover:bg-black transition-colors duration-200 cursor-pointer">Subscribe</button>
              <button className="w-9 h-9 rounded-full bg-[#0A0A0B]/[0.06] grid place-items-center hover:bg-[#0A0A0B]/10 transition-colors duration-200 cursor-pointer md:hidden" onClick={() => notify("Search coming soon")} aria-label="Search"><MagnifyingGlass size={18} /></button>
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#0A0A0B]/10"><img src="https://i.pravatar.cc/100?img=5" alt="" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </header>

        <main className="max-w-[1280px] mx-auto px-5 md:px-8">
          {/* Magazine Hero — 2026 style: big image, big type, no heavy overlay */}
          <section className="pt-8 md:pt-14 pb-12 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 md:gap-12 items-start">
            {/* Featured */}
            <button onClick={() => setArticle(featured)} className="group text-left cursor-pointer">
              <div className="relative aspect-[4/3] md:aspect-[1.2/1] rounded-[28px] md:rounded-[32px] overflow-hidden bg-[#F5F0EB]">
                <img src={featured.image} alt="" width={1400} height={900} className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-60" />
                <div className="absolute top-5 left-5 flex gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-white text-[11px] font-medium tracking-wide uppercase">Cover</span>
                  <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur text-white text-[11px] font-medium tracking-wide uppercase border border-white/10">{featured.category}</span>
                </div>
              </div>
              <div className="pt-6 max-w-[60ch]">
                <h1 className="font-serif font-[800] text-[32px] md:text-[48px] leading-[0.92] tracking-[-0.04em] group-hover:tracking-[-0.045em] transition-all duration-300">
                  {featured.title}
                </h1>
                <p className="mt-4 text-[16px] md:text-[18px] leading-[1.5] tracking-[-0.01em] text-[#0A0A0B]/60 font-[450]">
                  {featured.excerpt}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <img src={featured.author.avatar} alt="" className="w-9 h-9 rounded-full" />
                  <div className="text-[13px] leading-[1.2]">
                    <div className="font-medium tracking-[-0.01em] flex items-center gap-1.5">{featured.author.name} <span className="w-3.5 h-3.5 rounded-full bg-[#0A0A0B] text-white grid place-items-center"><Check size={8} weight="bold" /></span></div>
                    <div className="text-[#0A0A0B]/50 flex items-center gap-2 mt-0.5"><span>{featured.date}</span><span className="w-0.5 h-0.5 rounded-full bg-[#0A0A0B]/20" /><span>{featured.readTime}</span><span className="w-0.5 h-0.5 rounded-full bg-[#0A0A0B]/20" /><span>{featured.views}</span></div>
                  </div>
                </div>
              </div>
            </button>

            {/* Trending — sleek 01 02 03 */}
            <div className="lg:pt-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#0A0A0B] text-white grid place-items-center"><TrendUp size={14} weight="bold" /></div>
                <h2 className="font-[650] text-[12px] tracking-[0.14em] uppercase">Trending today</h2>
                <div className="h-px flex-1 bg-[#0A0A0B]/10 ml-2" />
              </div>
              <div className="space-y-1">
                {trending.map(t => (
                  <button key={t.id} onClick={() => setArticle({ ...featured, ...t, title: t.title })} className="group w-full flex gap-5 py-5 border-b border-[#0A0A0B]/[0.06] last:border-0 text-left cursor-pointer">
                    <span className="font-serif font-[250] text-[56px] leading-none tracking-[-0.05em] text-[#0A0A0B]/10 group-hover:text-[#0A0A0B]/20 transition-colors duration-300">{t.n}</span>
                    <div className="flex-1 min-w-0 pt-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-medium tracking-[0.12em] uppercase px-2 py-1 rounded-full bg-[#0A0A0B]/[0.06]">{t.category}</span>
                        <span className="text-[11px] text-[#0A0A0B]/40">{t.time}</span>
                      </div>
                      <h3 className="font-serif font-[600] text-[18px] leading-[1.2] tracking-[-0.02em] group-hover:tracking-[-0.025em] transition-all duration-300 line-clamp-2">{t.title}</h3>
                      <div className="mt-2 text-[12px] text-[#0A0A0B]/50">{t.author}</div>
                    </div>
                    <div className="w-[88px] h-[88px] rounded-[16px] overflow-hidden bg-[#F5F0EB] shrink-0">
                      <img src={t.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-[20px] bg-[#0A0A0B] text-white p-6 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-[200px] h-[200px] bg-white/10 rounded-full blur-[40px]" />
                <div className="relative flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 grid place-items-center shrink-0"><Sparkle size={18} weight="fill" className="text-[#FFD60A]" /></div>
                  <div>
                    <div className="text-[11px] tracking-[0.14em] uppercase opacity-60 font-medium">Join 50k+ crafters</div>
                    <div className="font-serif font-[650] text-[18px] leading-tight mt-1">The Sunday Stitch — one email, zero spam.</div>
                    <button onClick={() => notify("Subscribed!")} className="mt-4 h-9 px-4 rounded-full bg-white text-black text-[13px] font-medium hover:bg-[#F5F0EB] transition-colors duration-200 cursor-pointer">Subscribe free</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento — modern, no heavy borders, soft */}
          <section className="pb-24">
            <div className="flex items-baseline justify-between mb-8">
              <h2 className="font-serif font-[750] text-[28px] md:text-[32px] tracking-[-0.03em]">Latest in the atelier</h2>
              <div className="hidden md:flex items-center gap-2">
                {["All","Wearables","Home","Essays"].map(f => (
                  <button key={f} className={`h-8 px-4 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer ${f==="All" ? "bg-[#0A0A0B] text-white" : "bg-[#0A0A0B]/[0.06] text-[#0A0A0B]/70 hover:bg-[#0A0A0B]/10 hover:text-[#0A0A0B]"}`}>{f}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 auto-rows-[320px]">
              {filtered.map(p => (
                <button key={p.id} onClick={() => setArticle({ ...featured, ...p, title: p.title })} className={`group relative text-left rounded-[24px] overflow-hidden bg-white border border-[#0A0A0B]/[0.06] hover:border-[#0A0A0B]/10 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] hover:-translate-y-[2px] transition-all duration-300 cursor-pointer flex flex-col ${p.span}`}>
                  <div className="relative flex-1 min-h-0 overflow-hidden bg-[#F5F0EB]">
                    <img src={p.img} alt="" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-[10px] font-medium tracking-wide uppercase border border-black/5">{p.cat}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif font-[650] text-[19px] leading-[1.2] tracking-[-0.02em] line-clamp-2 group-hover:tracking-[-0.025em] transition-all duration-300">{p.title}</h3>
                    <p className="mt-2 text-[13.5px] leading-[1.4] text-[#0A0A0B]/50 line-clamp-2">{p.exc}</p>
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-[#0A0A0B]/40"><span className="text-[#0A0A0B]/70 font-medium">{p.author}</span><span className="w-0.5 h-0.5 rounded-full bg-[#0A0A0B]/20" /><span>{p.time}</span></div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <footer className="border-t border-[#0A0A0B]/[0.06] py-12 flex flex-wrap gap-8 justify-between text-[13px] text-[#0A0A0B]/50">
            <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-[#0A0A0B] text-white grid place-items-center font-serif font-bold text-[12px]">c</div><span className="font-medium text-[#0A0A0B]">crocheeeet © 2026</span><span>— The editorial atelier</span></div>
            <div className="flex gap-6"><a href="#" className="hover:text-[#0A0A0B] transition-colors cursor-pointer">Privacy</a><a href="#" className="hover:text-[#0A0A0B] transition-colors cursor-pointer">Terms</a><a href="#" className="hover:text-[#0A0A0B] transition-colors cursor-pointer">Instagram</a></div>
          </footer>
        </main>

        {/* Mobile bottom nav — floating pill 2026 */}
        <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#0A0A0B] text-white shadow-[0_16px_32px_rgba(0,0,0,0.2)]">
            {[
              { icon: House, active: true },
              { icon: MagnifyingGlass, active: false },
              { icon: Bookmark, active: false },
              { icon: SquaresFour, active: false },
            ].map((it,i) => (
              <button key={i} className={`w-11 h-11 rounded-full grid place-items-center transition-colors duration-200 cursor-pointer ${it.active ? "bg-white text-black" : "text-white/60 hover:text-white"}`} aria-label="nav"><it.icon size={18} weight={it.active ? "fill" : "regular"} /></button>
            ))}
          </div>
        </div>

        <style>{`@keyframes in{from{transform:translate(-50%,8px);opacity:0}to{transform:translate(-50%,0);opacity:1}} .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`}</style>
      </div>
    )
  }

  // ─── ARTICLE VIEW — 2026 editorial ───
  return (
    <div className="min-h-screen bg-[#FFFCF8] text-[#0A0A0B]">
      {/* Progress */}
      <div className="fixed top-0 left-0 h-[2px] bg-[#0A0A0B] z-[100] transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} role="progressbar" aria-valuenow={Math.round(progress)} />

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#0A0A0B] text-white px-5 py-3 rounded-full text-[13px] font-medium shadow-[0_16px_32px_rgba(0,0,0,0.2)] flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-white text-black grid place-items-center"><Check size={12} weight="bold" /></div>{toast}
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#FFFCF8]/80 backdrop-blur-[20px] border-b border-[#0A0A0B]/[0.06]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 h-[60px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setArticle(null)} className="w-9 h-9 rounded-full bg-[#0A0A0B]/[0.06] hover:bg-[#0A0A0B]/10 grid place-items-center transition-colors duration-200 cursor-pointer" aria-label="Back"><CaretLeft size={18} weight="bold" /></button>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-[#0A0A0B]/50"><span>Atelier</span><span className="opacity-30">/</span><span className="text-[#0A0A0B] font-medium truncate max-w-[28ch]">{article.title}</span></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden md:flex items-center gap-2 text-[11px] font-medium tracking-wide uppercase px-3 py-1.5 rounded-full bg-[#0A0A0B]/[0.06]"><span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />{pct}% done</span>
            <button onClick={() => { setSaved(!saved); notify(saved ? "Removed" : "Saved to library") }} aria-pressed={saved} className={`w-9 h-9 rounded-full border grid place-items-center transition-all duration-200 cursor-pointer ${saved ? "bg-[#0A0A0B] text-white border-[#0A0A0B]" : "bg-white border-[#0A0A0B]/10 hover:border-[#0A0A0B]/20"}`} aria-label="Save"><BookmarkSimple size={18} weight={saved ? "fill" : "regular"} /></button>
            <button onClick={() => notify("Print view ready")} className="w-9 h-9 rounded-full bg-white border border-[#0A0A0B]/10 hover:border-[#0A0A0B]/20 grid place-items-center transition-colors duration-200 cursor-pointer" aria-label="Print"><Printer size={18} /></button>
            <button onClick={() => notify("Link copied")} className="w-9 h-9 rounded-full bg-white border border-[#0A0A0B]/10 hover:border-[#0A0A0B]/20 grid place-items-center transition-colors duration-200 cursor-pointer" aria-label="Share"><ShareNetwork size={18} /></button>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[200px_1fr_300px] gap-10 lg:gap-14 py-8 md:py-12">
          {/* ToC — modern line indicator */}
          <aside className="hidden lg:block">
            <div className="sticky top-[92px]">
              <div className="text-[11px] font-[600] tracking-[0.14em] uppercase text-[#0A0A0B]/40 mb-4">On this page</div>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-[#0A0A0B]/10" />
                <nav className="space-y-1">
                  {sections.map(s => (
                    <button key={s.id} onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })} className={`relative w-full text-left pl-4 py-2 text-[13px] leading-[1.3] transition-all duration-200 cursor-pointer ${active===s.id ? "text-[#0A0A0B] font-[550]" : "text-[#0A0A0B]/50 hover:text-[#0A0A0B]/80"}`}>
                      {active===s.id && <div className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#0A0A0B] rounded-full" />}
                      {s.t}
                    </button>
                  ))}
                </nav>
              </div>
              <div className="mt-8 p-4 rounded-[16px] bg-[#0A0A0B]/[0.03] border border-[#0A0A0B]/[0.06]">
                <div className="text-[11px] uppercase tracking-wide font-medium opacity-60 mb-2">Reading</div>
                <div className="h-1 rounded-full bg-[#0A0A0B]/10 overflow-hidden"><div className="h-full bg-[#0A0A0B] transition-all duration-100" style={{ width: `${progress}%` }} /></div>
                <div className="mt-2 text-[12px] text-[#0A0A0B]/50">{Math.round(progress)}% • {Math.max(1, 12-Math.round(progress/8))} min left</div>
              </div>
            </div>
          </aside>

          {/* Article */}
          <main ref={articleRef} className="min-w-0">
            <div className="mb-8">
              <div className="flex gap-2 mb-5">
                <span className="px-3 py-1 rounded-full bg-[#0A0A0B] text-white text-[11px] font-medium tracking-wide uppercase">{article.category}</span>
                <span className="px-3 py-1 rounded-full bg-[#0A0A0B]/[0.06] text-[11px] font-medium tracking-wide uppercase">{article.readTime || "12 min"}</span>
              </div>
              <h1 className="font-serif font-[800] text-[36px] md:text-[52px] leading-[0.92] tracking-[-0.04em] max-w-[18ch]">{article.title}</h1>
              <p className="mt-5 text-[18px] md:text-[20px] leading-[1.5] tracking-[-0.01em] text-[#0A0A0B]/60 max-w-[48ch] font-[450]">How a single mesh technique turned into a 12,000-person make-along, and what it taught us about slow fashion in 2026.</p>
              <div className="mt-7 flex items-center gap-3 py-6 border-y border-[#0A0A0B]/[0.06]">
                <img src={featured.author.avatar} alt="" className="w-10 h-10 rounded-full" />
                <div className="text-[13px] leading-[1.2]"><div className="font-medium flex items-center gap-1.5">{featured.author.name}<span className="w-3.5 h-3.5 rounded-full bg-[#0A0A0B] text-white grid place-items-center"><Check size={8} weight="bold" /></span></div><div className="text-[#0A0A0B]/50 mt-0.5">{featured.date} • {featured.views} reads</div></div>
                <button className="ml-auto h-8 px-4 rounded-full bg-[#0A0A0B]/[0.06] hover:bg-[#0A0A0B]/10 text-[13px] font-medium transition-colors duration-200 cursor-pointer">Follow</button>
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-[#F5F0EB] mb-10">
              <img src={article.image || featured.image} alt="" width={1200} height={750} className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Content — 68-75ch, 18px/1.7 */}
            <div className="max-w-[68ch] mx-auto">
              <div className="font-serif text-[18px] leading-[1.7] tracking-[-0.01em] text-[#0A0A0B]/90 space-y-6">
                <section id="intro" ref={el => refs.current["intro"]=el} className="scroll-mt-28">
                  <p className="first-letter:font-serif first-letter:font-[800] first-letter:text-[3.2em] first-letter:float-left first-letter:mr-2 first-letter:leading-[0.8] first-letter:tracking-[-0.03em]">
                    The first time I saw the Heirloom Cardigan in person, it was draped over a chair in Mila's sunlit studio. It had that weight — not heavy, but present — that only comes from 47 hours of intentional stitches.
                  </p>
                  <p className="text-[#0A0A0B]/70">Mila didn't set out to make a viral pattern. She was solving a problem that has haunted crochet for decades: how do you make something that looks like knit, drapes like woven, but still feels like crochet?</p>
                  <div className="my-10 py-8 border-y border-[#0A0A0B]/[0.06]"><div className="font-serif font-[550] text-[24px] leading-[1.25] tracking-[-0.02em] italic max-w-[28ch]">"We don't make things because they're easy. We make them because the hard part is where the meaning lives."</div><div className="mt-3 text-[12px] tracking-wide uppercase opacity-50 font-medium">— Mila Chen, from the studio</div></div>
                </section>

                <section id="materials" ref={el => refs.current["materials"]=el} className="scroll-mt-28">
                  <h2 className="font-serif font-[700] text-[28px] tracking-[-0.03em] mt-12 mb-4">Materials & Tools</h2>
                  <div className="not-prose grid md:grid-cols-3 gap-3 my-8">
                    {[
                      { k: "Yarn", v: "De Rerum Natura Ulysse", sub: "100% merino • 185m/50g • 6 skeins Goéland", c: "bg-[#F5F0EB]" },
                      { k: "Hook", v: "3.5mm Tulip Etimo Rose", sub: "Stitch markers x8 • Tapestry needle", c: "bg-[#FFFBF5]" },
                      { k: "Gauge", v: "24 sts × 16 rows = 10cm", sub: "Blocked mesh • XS-3XL oversized", c: "bg-[#F5F0EB]" },
                    ].map(b => (
                      <div key={b.k} className={`rounded-[16px] border border-[#0A0A0B]/[0.06] p-4 ${b.c}`}>
                        <div className="text-[10px] tracking-[0.12em] uppercase font-medium opacity-50 mb-2">{b.k}</div>
                        <div className="font-medium text-[14px] leading-tight">{b.v}</div>
                        <div className="text-[12px] leading-[1.4] opacity-60 mt-1">{b.sub}</div>
                      </div>
                    ))}
                  </div>
                </section>

                <section id="pattern" ref={el => refs.current["pattern"]=el} className="scroll-mt-28">
                  <h2 className="font-serif font-[700] text-[28px] tracking-[-0.03em] mt-12 mb-2">Pattern — Interactive Mode</h2>
                  <p className="text-[14px] text-[#0A0A0B]/50 mb-6">Tap to mark complete. Saves automatically. Works offline.</p>
                  
                  <div className="not-prose rounded-[20px] border border-[#0A0A0B]/[0.08] bg-white shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden">
                    <div className="p-5 md:p-6 flex items-center justify-between border-b border-[#0A0A0B]/[0.06] bg-[#FFFCF8]">
                      <div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-[#0A0A0B] text-white grid place-items-center"><Sparkle size={14} weight="fill" /></div><div className="font-medium text-[14px]">Stitch with me</div><span className="text-[11px] px-2 py-0.5 rounded-full bg-[#0A0A0B]/5 border border-[#0A0A0B]/10">{pct}%</span></div>
                      <div className="h-1.5 w-24 rounded-full bg-[#0A0A0B]/10 overflow-hidden hidden md:block"><div className="h-full bg-[#0A0A0B] transition-all duration-300" style={{ width: `${pct}%` }} /></div>
                    </div>
                    <div className="divide-y divide-[#0A0A0B]/[0.06]">
                      {steps.map(s => {
                        const d = done.has(s.id)
                        return (
                          <button key={s.id} onClick={() => setDone(prev => { const n=new Set(prev); n.has(s.id)?n.delete(s.id):n.add(s.id); return n })} className={`w-full text-left p-4 md:p-5 flex gap-4 hover:bg-[#0A0A0B]/[0.02] transition-colors duration-200 cursor-pointer ${d ? "opacity-50" : ""}`}>
                            <div className={`w-6 h-6 rounded-full border grid place-items-center shrink-0 mt-0.5 transition-all duration-200 ${d ? "bg-[#0A0A0B] border-[#0A0A0B] text-white" : "border-[#0A0A0B]/15 bg-white"}`}>{d ? <Check size={12} weight="bold" /> : <span className="w-1 h-1 rounded-full bg-[#0A0A0B]/20" />}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap"><span className={`font-medium text-[14px] tracking-[-0.01em] ${d ? "line-through" : ""}`}>{s.title}</span><span className="text-[11px] px-2 py-0.5 rounded-full bg-[#0A0A0B]/5 border border-[#0A0A0B]/5">{s.time}</span><span className="text-[11px] text-[#0A0A0B]/40">{s.st}</span></div>
                              <div className="text-[13px] leading-[1.5] text-[#0A0A0B]/60 mt-1">{s.d}</div>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </section>

                <section id="technique" ref={el => refs.current["technique"]=el} className="scroll-mt-28">
                  <h2 className="font-serif font-[700] text-[28px] tracking-[-0.03em] mt-12 mb-4">The shaping trick</h2>
                  <p>Most cardigans increase at the edges. This one increases <em>inside</em> the mesh, using ch-1 spaces as growth points. Lace stays consistent as fabric widens — no gaps at sides.</p>
                  <p className="text-[#0A0A0B]/70">Mila found it fixing a mistake. A missed increase looked better hidden. She ripped 3 hours, then 5 more to perfect it.</p>
                </section>

                <div className="my-12 rounded-[20px] bg-[#0A0A0B]/[0.03] border border-[#0A0A0B]/[0.06] p-6 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A0A0B] text-white grid place-items-center shrink-0"><Feather size={16} /></div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-[600] text-[16px] leading-tight">Join 50k+ crafters — The Sunday Stitch</div>
                    <div className="text-[13px] leading-[1.4] opacity-60 mt-1 max-w-[42ch]">One email, 3 patterns, 1 essay. Free heirloom pattern when you join.</div>
                    <form onSubmit={e => { e.preventDefault(); if(!email.includes('@')) return; notify("Welcome to 50k+!"); setEmail("") }} className="mt-4 flex gap-2 max-w-[360px]">
                      <input id={emailId} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@cozy.email" className="flex-1 h-10 px-4 rounded-full bg-white border border-[#0A0A0B]/10 outline-none focus:border-[#0A0A0B]/20 text-[13px] transition-colors duration-200" />
                      <button className="h-10 px-5 rounded-full bg-[#0A0A0B] text-white text-[13px] font-medium hover:bg-black transition-colors duration-200 cursor-pointer">Join</button>
                    </form>
                  </div>
                </div>

                <section id="community" ref={el => refs.current["community"]=el} className="scroll-mt-28">
                  <h2 className="font-serif font-[700] text-[28px] tracking-[-0.03em] mt-12 mb-4">Make-along community</h2>
                  <p>12,000 people made this together in January. 4,300 photos, 892 questions, 847 answered before Mila could. Top tip: "Marker every 20 sts — game changer."</p>
                </section>

                <div className="mt-12 pt-8 border-t border-[#0A0A0B]/[0.06] flex gap-2">
                  <button onClick={() => { setSaved(!saved); notify(saved ? "Removed" : "Saved") }} className={`h-10 px-4 rounded-full border text-[13px] font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer ${saved ? "bg-[#0A0A0B] text-white border-[#0A0A0B]" : "bg-white border-[#0A0A0B]/10 hover:border-[#0A0A0B]/20"}`}><BookmarkSimple size={16} weight={saved ? "fill" : "regular"} />{saved ? "Saved" : "Save"}</button>
                  <button onClick={() => notify("PDF downloading")} className="h-10 px-4 rounded-full bg-white border border-[#0A0A0B]/10 hover:border-[#0A0A0B]/20 text-[13px] font-medium flex items-center gap-2 transition-colors duration-200 cursor-pointer"><FilePdf size={16} />PDF</button>
                  <button onClick={() => notify("Link copied")} className="h-10 w-10 rounded-full bg-white border border-[#0A0A0B]/10 hover:border-[#0A0A0B]/20 grid place-items-center transition-colors duration-200 cursor-pointer ml-auto" aria-label="Share"><ShareNetwork size={16} /></button>
                </div>
              </div>

              {/* Related — modern slider */}
              <div className="mt-16 pt-10 border-t border-[#0A0A0B]/[0.06] max-w-[68ch] mx-auto">
                <div className="flex items-center justify-between mb-6"><h3 className="font-serif font-[700] text-[20px] tracking-[-0.02em]">Keep stitching</h3><div className="flex gap-2"><button onClick={() => setRelIdx(Math.max(0, relIdx-1))} disabled={relIdx===0} className="w-8 h-8 rounded-full border border-[#0A0A0B]/10 grid place-items-center hover:border-[#0A0A0B]/20 disabled:opacity-30 transition-colors cursor-pointer"><CaretLeft size={14} weight="bold" /></button><button onClick={() => setRelIdx(Math.min(related.length-2, relIdx+1))} disabled={relIdx>=related.length-2} className="w-8 h-8 rounded-full bg-[#0A0A0B] text-white grid place-items-center hover:bg-black disabled:opacity-30 transition-colors cursor-pointer"><CaretRight size={14} weight="bold" /></button></div></div>
                <div className="overflow-hidden"><div className="flex gap-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ transform: `translateX(-${relIdx*280}px)` }}>{related.map(r => (<button key={r.id} onClick={() => notify("Opening...")} className="shrink-0 w-[260px] text-left group cursor-pointer"><div className="aspect-[3/2] rounded-[16px] overflow-hidden bg-[#F5F0EB]"><img src={r.img} alt="" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" /></div><div className="mt-3 text-[10px] tracking-[0.12em] uppercase font-medium opacity-50">{r.cat}</div><div className="font-serif font-[600] text-[15px] leading-[1.25] tracking-[-0.01em] mt-1 line-clamp-2 group-hover:tracking-[-0.015em] transition-all duration-300">{r.title}</div><div className="text-[11px] opacity-50 mt-1">{r.time}</div></button>))}</div></div>
              </div>
            </div>
          </main>

          {/* Right — minimal */}
          <aside className="hidden lg:block">
            <div className="sticky top-[92px] space-y-4">
              <div className="rounded-[16px] border border-[#0A0A0B]/[0.06] p-4 bg-white">
                <div className="flex items-center gap-3"><img src={featured.author.avatar} alt="" className="w-10 h-10 rounded-full" /><div><div className="font-medium text-[13px]">{featured.author.name}</div><div className="text-[11px] opacity-50">{featured.author.role}</div></div></div>
                <button className="mt-4 w-full h-9 rounded-full bg-[#0A0A0B]/[0.06] hover:bg-[#0A0A0B]/10 text-[13px] font-medium transition-colors cursor-pointer">Follow</button>
              </div>
              <div className="rounded-[16px] bg-[#0A0A0B] text-white p-4">
                <div className="text-[11px] tracking-[0.12em] uppercase opacity-60 font-medium mb-3">Quick facts</div>
                <div className="space-y-2 text-[13px]"><div className="flex justify-between"><span className="opacity-60">Time</span><span>47h</span></div><div className="flex justify-between"><span className="opacity-60">Yarn</span><span>1100m fing.</span></div><div className="flex justify-between"><span className="opacity-60">Hook</span><span>3.5mm</span></div></div>
                <button onClick={() => notify("Added to cart — $8.50")} className="mt-4 w-full h-9 rounded-full bg-white text-black text-[13px] font-medium hover:bg-[#F5F0EB] transition-colors cursor-pointer">Buy pattern • $8.50</button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile ToC pill */}
      <div className="lg:hidden fixed bottom-[88px] left-4 right-4 z-30">
        <button onClick={() => setShowToc(!showToc)} className="w-full h-12 rounded-full bg-[#0A0A0B] text-white shadow-[0_16px_32px_rgba(0,0,0,0.2)] flex items-center justify-between px-5 cursor-pointer">
          <span className="flex items-center gap-2 text-[13px] font-medium"><List size={16} />{sections.find(s=>s.id===active)?.t || "Contents"}</span><span className="text-[11px] px-2.5 py-1 rounded-full bg-white/15">{Math.round(progress)}%</span>
        </button>
        {showToc && (
          <div className="mt-3 rounded-[20px] bg-white border border-[#0A0A0B]/10 shadow-[0_16px_40px_rgba(0,0,0,0.12)] p-2 max-h-[50vh] overflow-auto animate-[in_200ms_ease]">
            {sections.map(s => (
              <button key={s.id} onClick={() => { document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); setShowToc(false) }} className={`w-full text-left px-4 py-3 rounded-full text-[14px] transition-colors cursor-pointer ${active===s.id ? "bg-[#0A0A0B] text-white" : "hover:bg-[#0A0A0B]/[0.06]"}`}>{s.t}</button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40">
        <div className="flex items-center gap-1 p-1.5 rounded-full bg-[#0A0A0B] text-white shadow-[0_16px_32px_rgba(0,0,0,0.2)]">
          <button onClick={() => setArticle(null)} className="w-11 h-11 rounded-full bg-white text-black grid place-items-center cursor-pointer"><House size={18} weight="fill" /></button>
          <button onClick={() => setShowToc(!showToc)} className="w-11 h-11 rounded-full grid place-items-center text-white/60 hover:text-white transition-colors cursor-pointer"><List size={18} /></button>
          <button onClick={() => { setSaved(!saved); notify(saved ? "Removed" : "Saved") }} className={`w-11 h-11 rounded-full grid place-items-center transition-colors cursor-pointer ${saved ? "bg-white text-black" : "text-white/60 hover:text-white"}`}><BookmarkSimple size={18} weight={saved ? "fill" : "regular"} /></button>
          <button onClick={() => notify("Share")} className="w-11 h-11 rounded-full grid place-items-center text-white/60 hover:text-white transition-colors cursor-pointer"><DotsThree size={18} /></button>
        </div>
      </div>

      <style>{`@keyframes in{from{transform:translate(-50%,8px);opacity:0}to{transform:translate(-50%,0);opacity:1}} .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`}</style>
    </div>
  )
}
