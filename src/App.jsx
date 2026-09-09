import { useState, useEffect, useRef, useMemo, useId } from 'react'
import {
  BookmarkSimple,
  Printer,
  ShareNetwork,
  Heart,
  Clock,
  User,
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
  Palette,
  Scissors,
  Ruler,
  CheckCircle,
  Circle,
  Play,
  Pause,
  ArrowRight,
  InstagramLogo,
  PinterestLogo,
  YoutubeLogo,
  FilePdf,
  DownloadSimple,
  Eye,
  ChatCircle,
  Star,
  Fire,
  TrendUp,
  BookOpen,
  Feather,
  ArrowLineUp,
  DotsThree
} from '@phosphor-icons/react'

// ─── MOCK DATA ───
const featuredArticle = {
  id: 1,
  slug: "heirloom-cardigan",
  category: "Wearables",
  title: "The Heirloom Cardigan That Took 47 Hours — And Why It Was Worth Every Stitch",
  excerpt: "A deep dive into slow fashion, the psychology of making, and how one pattern became a 12,000-person make-along. With interactive row tracking.",
  content: "full",
  author: { name: "Mila Chen", avatar: "https://i.pravatar.cc/100?img=5", role: "Pattern Designer • 2.3k patterns", verified: true },
  date: "Sep 8, 2026",
  readTime: "12 min",
  views: "24.3k",
  comments: 184,
  image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&h=800&fit=crop",
  difficulty: "Intermediate",
  featured: true,
  trending: 1
}

const trendingArticles = [
  {
    id: 2,
    category: "Technique",
    title: "Why Your Granny Squares Are Curling (And the 2-Stitch Fix)",
    author: "Sage Nakamura",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1520903922286-652ae563cb3a?w=400&h=300&fit=crop",
    views: "18.2k"
  },
  {
    id: 3,
    category: "Color Theory",
    title: "The Yarn Color System That Predicts Instagram Virality",
    author: "Juniper Wu",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=300&fit=crop",
    views: "15.7k"
  },
  {
    id: 4,
    category: "Business",
    title: "I Made $14k in One Drop: The Anti-Launch Strategy",
    author: "Alex Rivera",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
    views: "12.9k"
  }
]

const bentoArticles = [
  { id: 5, category: "Amigurumi", title: "Designing Faces: How 2mm Changes Everything", excerpt: "The micro-adjustments that make amigurumi feel alive.", author: "Tiny Friends Co", readTime: "7 min", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop", size: "large", difficulty: "Advanced", color: "#F59E0B" },
  { id: 6, category: "Home", title: "The Cottagecore Blanket Formula", excerpt: "A repeatable system for blankets that look expensive.", author: "Vintage Loops", readTime: "4 min", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=500&fit=crop", size: "tall", difficulty: "Beginner", color: "#16A34A" },
  { id: 7, category: "Bags", title: "Market Bags That Actually Hold Groceries", excerpt: "Engineering a bag that stretches without sagging.", author: "Eco Stitch", readTime: "5 min", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=300&fit=crop", size: "small", difficulty: "Beginner", color: "#06B6D4" },
  { id: 8, category: "Wearables", title: "Strawberry Hat Summer", excerpt: "The pattern that sold 3k in 48 hours.", author: "Berry Yarns", readTime: "3 min", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop", size: "small", difficulty: "Beginner", color: "#EC4899" },
  { id: 9, category: "Essay", title: "On Ripping Out: A Meditation", excerpt: "What frogging teaches us about creative process.", author: "Mila Chen", readTime: "9 min", image: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=400&fit=crop", size: "medium", difficulty: "Essay", color: "#7C3AED" },
  { id: 10, category: "Tools", title: "Hook Reviews: The $40 Hook Worth It?", excerpt: "We tested 12 hooks for 100 hours.", author: "Tool Lab", readTime: "10 min", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop", size: "medium", difficulty: "Review", color: "#1A102E" },
]

const articleSections = [
  { id: "intro", title: "Introduction", level: 2 },
  { id: "why-slow", title: "Why slow fashion matters now", level: 2 },
  { id: "materials", title: "Materials & Tools", level: 2 },
  { id: "pattern-mode", title: "Pattern — Interactive Mode", level: 2 },
  { id: "technique", title: "The Shaping Technique", level: 2 },
  { id: "community", title: "Make-along community", level: 3 },
  { id: "finishing", title: "Finishing & Blocking", level: 2 },
]

const patternSteps = [
  { id: 1, title: "Foundation chain", detail: "Ch 89 (or any multiple of 8 + 1). Mark first st.", time: "10 min", stitches: "89 ch" },
  { id: 2, title: "Row 1 — Set up", detail: "Sc in 2nd ch from hook, *ch 3, sk 3, sc in next* repeat. Turn.", time: "18 min", stitches: "22 sc, 21 ch-3 sps" },
  { id: 3, title: "Row 2 — Mesh growth", detail: "Ch 4 (counts as dc + ch1), dc in first sc, *ch 1, dc in next ch-3 sp* repeat.", time: "22 min", stitches: "23 dc" },
  { id: 4, title: "Row 3 — Lace panel", detail: "Ch 1, sc in first dc, *sc in ch-1 sp, ch 3, sc in next ch-1 sp, sc in dc* — this creates the heirloom eyelet.", time: "25 min", stitches: "Pattern repeat x11" },
  { id: 5, title: "Rows 4-47 — Repeat & shape", detail: "Repeat Rows 2-3, inc 1 st each side every 6th row for sleeves. Use stitch markers for inc points.", time: "6h", stitches: "~1,240 sts total" },
  { id: 6, title: "Edging & blocking", detail: "Sc border around all edges, 3 sc in corners. Wet block to 42\" wingspan.", time: "1.5h + dry", stitches: "Finishing" },
]

const relatedArticles = [
  { id: 11, title: "The Math Behind Perfect Fit", category: "Fit", readTime: "6 min", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=200&fit=crop" },
  { id: 12, title: "Blocking Like a Pro", category: "Finishing", readTime: "4 min", image: "https://images.unsplash.com/photo-1520903922286-652ae563cb3a?w=300&h=200&fit=crop" },
  { id: 13, title: "Yarn Substitutions That Work", category: "Materials", readTime: "8 min", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=300&h=200&fit=crop" },
  { id: 14, title: "From Pattern to Shop Drop", category: "Business", readTime: "12 min", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=200&fit=crop" },
]

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("intro")
  const [completedSteps, setCompletedSteps] = useState(new Set([1]))
  const [bookmarks, setBookmarks] = useState(new Set([2]))
  const [savedPatterns, setSavedPatterns] = useState(new Set([1]))
  const [showToc, setShowToc] = useState(true)
  const [showMobileToc, setShowMobileToc] = useState(false)
  const [toast, setToast] = useState(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [mobileTab, setMobileTab] = useState("home")
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [relatedIndex, setRelatedIndex] = useState(0)
  
  const articleRef = useRef(null)
  const sectionRefs = useRef({})
  const searchInputId = useId()
  const emailInputId = useId()

  // Reading progress bar
  useEffect(() => {
    if (!selectedArticle) {
      setReadingProgress(0)
      return
    }
    const handleScroll = () => {
      const article = articleRef.current
      if (!article) return
      const rect = article.getBoundingClientRect()
      const scrollTop = window.scrollY
      const docHeight = article.offsetHeight
      const winHeight = window.innerHeight
      const progress = Math.min(100, Math.max(0, (scrollTop / (docHeight - winHeight + 300)) * 100))
      setReadingProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [selectedArticle])

  // ToC highlight with IntersectionObserver
  useEffect(() => {
    if (!selectedArticle) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => observer.disconnect()
  }, [selectedArticle])

  const toggleStep = (id) => {
    setCompletedSteps(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    showToast(isBookmarked ? "Removed from saved" : "Saved to your library")
  }

  const handlePrint = () => {
    showToast("Preparing print view...")
    setTimeout(() => window.print(), 500)
  }

  const handleNewsletter = (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setEmailError("Enter a valid email")
      return
    }
    setEmailError("")
    showToast("Welcome to 50k+ crafters! Check your inbox.")
    setEmail("")
  }

  const filteredBento = useMemo(() => {
    if (!searchQuery) return bentoArticles
    return bentoArticles.filter(a => 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  // ─── LISTING VIEW ───
  if (!selectedArticle) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
        <a href="#main" className="skip-link">Skip to content</a>
        
        {/* Toast */}
        {toast && (
          <div role="status" aria-live="polite" className="fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[var(--color-foreground)] text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 animate-slideIn text-[14px] font-medium">
            <Check size={16} weight="bold" aria-hidden="true" />
            {toast}
          </div>
        )}

        {/* Header - Magazine style */}
        <header className="sticky top-0 z-40 bg-[var(--color-paper)]/90 backdrop-blur-xl border-b border-[var(--color-border)] no-print">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            {/* Top bar */}
            <div className="flex items-center justify-between h-[56px] md:h-[64px] gap-4">
              <div className="flex items-center gap-6 md:gap-10">
                <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2.5 cursor-pointer group" aria-label="Crocheeeet home">
                  <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--color-foreground)] text-white flex items-center justify-center font-serif font-bold text-[16px] group-hover:scale-105 transition-transform duration-200">c</div>
                  <span className="font-serif font-bold text-[20px] md:text-[22px] tracking-tight">crocheeeet</span>
                  <span className="hidden md:inline-flex badge bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">editorial</span>
                </button>
                
                <nav className="hidden lg:flex items-center gap-1" aria-label="Categories">
                  {["Latest", "Patterns", "Technique", "Essays", "Shop"].map(cat => (
                    <a key={cat} href="#" className="px-3.5 py-2 rounded-full text-[13.5px] font-medium hover:bg-[var(--color-muted)] transition-colors duration-200 cursor-pointer">
                      {cat}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center gap-2">
                  <div className="relative">
                    <MagnifyingGlass size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]" aria-hidden="true" />
                    <input
                      id={searchInputId}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search patterns, essays..."
                      className="pl-9 pr-4 py-2.5 rounded-full bg-[var(--color-muted)] border border-transparent focus:bg-white focus:border-[var(--color-border)] focus:outline-none text-[13.5px] w-[240px] lg:w-[280px] transition-all duration-200"
                    />
                  </div>
                  <button aria-label="Saved" className="w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center hover:bg-[var(--color-border)] transition-colors duration-200 cursor-pointer">
                    <BookmarkSimple size={18} aria-hidden="true" />
                  </button>
                </div>
                
                <button onClick={() => setSearchOpen(true)} className="md:hidden w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer" aria-label="Search">
                  <MagnifyingGlass size={18} aria-hidden="true" />
                </button>
                
                <button className="hidden md:inline-flex btn-primary text-[13px] px-5 py-2.5">Subscribe</button>
                <button className="w-9 h-9 rounded-full overflow-hidden border border-[var(--color-border)] cursor-pointer">
                  <img src="https://i.pravatar.cc/100?img=5" alt="Your profile" className="w-full h-full object-cover" />
                </button>
              </div>
            </div>

            {/* Secondary nav - trending topics */}
            <div className="hidden md:flex items-center gap-3 h-[44px] border-t border-[var(--color-border)]/60 overflow-x-auto scrollbar-none">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--color-muted-foreground)] shrink-0">
                <Fire size={14} weight="fill" className="text-orange-500" aria-hidden="true" /> Trending now
              </span>
              <div className="h-3 w-px bg-[var(--color-border)] shrink-0" aria-hidden="true" />
              {["#grannycore", "#slowfashion", "#amigurumi", "#cottagecore", "#marketbag", "#heirloom"].map(tag => (
                <a key={tag} href="#" className="text-[13px] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors duration-200 whitespace-nowrap cursor-pointer">
                  {tag}
                </a>
              ))}
            </div>
          </div>
        </header>

        <main id="main" className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          {/* Magazine Hero - 1 featured + 3 trending with counters */}
          <section className="grid lg:grid-cols-[1.35fr_0.65fr] gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Featured Main */}
            <article className="group cursor-pointer" onClick={() => setSelectedArticle(featuredArticle)} tabIndex={0} role="button" aria-label={`Read ${featuredArticle.title}`}>
              <div className="card p-0 overflow-hidden border-0 shadow-none hover:shadow-none hover:transform-none hover:border-0 bg-transparent">
                <div className="img-container aspect-[4/3] md:aspect-[16/10] rounded-[20px] md:rounded-[24px] overflow-hidden">
                  <img src={featuredArticle.image} alt="" width={1200} height={800} loading="eager" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden="true" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="badge bg-white text-black font-bold">Featured</span>
                    <span className="badge bg-black/70 text-white backdrop-blur">{featuredArticle.category}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
                    <h1 className="editorial-h1 text-[32px] md:text-[48px] lg:text-[56px] leading-[0.9] tracking-[-0.04em] max-w-[20ch] mb-3">
                      {featuredArticle.title}
                    </h1>
                    <p className="hidden md:block text-[16px] md:text-[18px] leading-[1.4] text-white/80 max-w-[50ch] font-body">
                      {featuredArticle.excerpt}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center gap-3">
                    <img src={featuredArticle.author.avatar} alt="" className="w-10 h-10 rounded-full" aria-hidden="true" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[14px]">{featuredArticle.author.name}</span>
                        {featuredArticle.author.verified && <CheckCircle size={14} weight="fill" className="text-[var(--color-primary)]" aria-label="Verified" />}
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-[var(--color-muted-foreground)]">
                        <span>{featuredArticle.date}</span>
                        <span aria-hidden="true">•</span>
                        <span className="flex items-center gap-1"><Clock size={12} aria-hidden="true" />{featuredArticle.readTime}</span>
                        <span aria-hidden="true">•</span>
                        <span className="flex items-center gap-1"><Eye size={12} aria-hidden="true" />{featuredArticle.views}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto hidden md:flex items-center gap-2">
                    <span className="badge bg-[#F5F0EB] text-[var(--color-foreground)] border border-[var(--color-border)]">{featuredArticle.difficulty}</span>
                    <span className="badge bg-[var(--color-foreground)] text-white">12k making</span>
                  </div>
                </div>
              </div>
            </article>

            {/* Trending Side - sleek counters #1, #2, #3 */}
            <div className="flex flex-col gap-4 md:gap-5">
              <div className="flex items-center justify-between">
                <h2 className="font-sans font-bold text-[13px] uppercase tracking-widest flex items-center gap-2">
                  <TrendUp size={16} weight="bold" aria-hidden="true" />
                  Trending today
                </h2>
                <a href="#" className="text-[12px] font-medium text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] flex items-center gap-1 cursor-pointer">
                  View all <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </div>
              
              {trendingArticles.map((article, idx) => (
                <article key={article.id} className="group flex gap-4 p-4 rounded-[16px] bg-white border border-[var(--color-border)] hover:border-[var(--color-foreground)] hover:shadow-md transition-all duration-200 cursor-pointer" onClick={() => setSelectedArticle({ ...featuredArticle, ...article, id: article.id })} tabIndex={0} role="button">
                  <div className="flex gap-3 flex-1 min-w-0">
                    <span className="font-serif font-black text-[36px] leading-none text-[var(--color-border)] group-hover:text-[var(--color-foreground)] transition-colors duration-200">
                      #{idx + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="badge bg-[var(--color-muted)] text-[var(--color-muted-foreground)] text-[10px]">{article.category}</span>
                        <span className="text-[11px] text-[var(--color-muted-foreground)] flex items-center gap-1">
                          <Clock size={10} aria-hidden="true" />{article.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-[16px] leading-[1.25] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 text-[12px] text-[var(--color-muted-foreground)]">
                        <span>{article.author}</span>
                        <span aria-hidden="true">•</span>
                        <span>{article.views} reads</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[var(--color-muted)]">
                    <img src={article.image} alt="" width={80} height={80} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </article>
              ))}

              {/* Newsletter mini */}
              <div className="mt-2 p-5 rounded-[16px] bg-[var(--color-foreground)] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] rounded-full blur-2xl opacity-30" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkle size={16} weight="fill" className="text-[#F59E0B]" aria-hidden="true" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">Join 50k+ crafters</span>
                  </div>
                  <h4 className="font-serif font-bold text-[18px] leading-tight mb-1">The Sunday Stitch</h4>
                  <p className="text-[13px] text-white/70 leading-[1.4] mb-3">One email, 3 patterns, zero spam.</p>
                  <button onClick={() => showToast("Subscribed!")} className="w-full bg-white text-black py-2.5 rounded-full text-[13px] font-semibold hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                    Subscribe free
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Cards - 100% responsive */}
          <section className="mb-12">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="editorial-h2 text-[28px] md:text-[36px]">Latest in the atelier</h2>
              <div className="hidden md:flex items-center gap-2">
                {["All", "Wearables", "Home", "Essays"].map(f => (
                  <button key={f} className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 cursor-pointer ${f==="All" ? "bg-[var(--color-foreground)] text-white" : "bg-white border border-[var(--color-border)] hover:border-[var(--color-foreground)]"}`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="bento grid-cols-1 md:grid-cols-12 auto-rows-[280px] md:auto-rows-[320px]">
              {filteredBento.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setSelectedArticle({ ...featuredArticle, ...article })}
                  className={`group relative overflow-hidden rounded-[20px] bg-white border border-[var(--color-border)] hover:border-[var(--color-foreground)] hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col
                    ${article.size === 'large' ? 'md:col-span-8 md:row-span-1' : ''}
                    ${article.size === 'tall' ? 'md:col-span-4 md:row-span-2' : ''}
                    ${article.size === 'medium' ? 'md:col-span-6 md:row-span-1' : ''}
                    ${article.size === 'small' ? 'md:col-span-3 md:row-span-1' : ''}
                    col-span-1 row-span-1
                  `}
                  tabIndex={0}
                  role="button"
                >
                  <div className="img-container flex-1 min-h-0 rounded-t-[20px]">
                    <img src={article.image} alt="" width={600} height={400} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="badge bg-white/90 backdrop-blur text-black border border-black/10">{article.category}</span>
                      {article.difficulty !== 'Essay' && article.difficulty !== 'Review' && (
                        <span className="badge text-white" style={{ background: article.color }}>{article.difficulty}</span>
                      )}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setBookmarks(prev => { const n=new Set(prev); n.has(article.id)?n.delete(article.id):n.add(article.id); return n }); showToast(bookmarks.has(article.id)?"Removed":"Saved"); }}
                      aria-label={bookmarks.has(article.id) ? "Remove bookmark" : "Bookmark"}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform duration-200 cursor-pointer"
                    >
                      <BookmarkSimple size={16} weight={bookmarks.has(article.id) ? "fill" : "regular"} className={bookmarks.has(article.id) ? "text-[var(--color-foreground)]" : ""} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-serif font-bold text-[18px] md:text-[20px] leading-[1.2] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                      {article.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] leading-[1.4] text-[var(--color-muted-foreground)] mt-2 line-clamp-2 font-body">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-[11px] text-[var(--color-muted-foreground)]">
                      <span className="font-medium text-[var(--color-foreground)]">{article.author}</span>
                      <span aria-hidden="true">•</span>
                      <span className="flex items-center gap-1"><Clock size={10} aria-hidden="true" />{article.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-[var(--color-border)] pt-10 pb-24 md:pb-10 mt-8">
            <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[var(--color-foreground)] text-white flex items-center justify-center font-serif font-bold">c</div>
                  <span className="font-serif font-bold text-[20px]">crocheeeet</span>
                </div>
                <p className="text-[14px] leading-[1.5] text-[var(--color-muted-foreground)] max-w-[32ch] font-body">
                  Magazine-grade crochet publishing. Slow stories, interactive patterns, and a community that actually finishes what they start.
                </p>
              </div>
              {[
                { title: "Editorial", links: ["Latest", "Essays", "Technique", "Business"] },
                { title: "Patterns", links: ["Wearables", "Home", "Amigurumi", "Free"] },
                { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] }
              ].map(col => (
                <div key={col.title}>
                  <h4 className="font-sans font-bold text-[12px] uppercase tracking-widest mb-3">{col.title}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map(l => <li key={l}><a href="#" className="text-[14px] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors duration-200 cursor-pointer">{l}</a></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </footer>
        </main>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[var(--color-border)] md:hidden no-print">
          <div className="grid grid-cols-4 h-[64px] px-2">
            {[
              { id: "home", icon: House, label: "Home" },
              { id: "search", icon: MagnifyingGlass, label: "Search" },
              { id: "saved", icon: Bookmark, label: "Saved" },
              { id: "categories", icon: SquaresFour, label: "Browse" }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => { setMobileTab(item.id); if(item.id==="search") setSearchOpen(true); }}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-200 cursor-pointer ${mobileTab===item.id ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]"}`}
                aria-label={item.label}
                aria-current={mobileTab===item.id ? "page" : undefined}
              >
                <item.icon size={22} weight={mobileTab===item.id ? "fill" : "regular"} aria-hidden="true" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Search Sheet */}
        {searchOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSearchOpen(false)} aria-hidden="true" />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-6 animate-[slideUp_300ms_ease] max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[18px]">Search atelier</h3>
                <button onClick={() => setSearchOpen(false)} className="w-8 h-8 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer" aria-label="Close">
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
              <div className="relative mb-4">
                <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]" aria-hidden="true" />
                <input autoFocus value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Patterns, essays, techniques..." className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] focus:bg-white focus:outline-none focus:border-[var(--color-foreground)] transition-colors duration-200" />
              </div>
              <div className="space-y-3">
                {filteredBento.slice(0,4).map(a => (
                  <button key={a.id} onClick={() => { setSelectedArticle({ ...featuredArticle, ...a }); setSearchOpen(false); }} className="w-full flex gap-3 p-3 rounded-xl hover:bg-[var(--color-muted)] transition-colors duration-200 text-left cursor-pointer">
                    <img src={a.image} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--color-muted-foreground)]">{a.category}</div>
                      <div className="font-serif font-bold text-[14px] leading-tight line-clamp-2">{a.title}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ─── ARTICLE READING VIEW ───
  const progressPercent = Math.round((completedSteps.size / patternSteps.length) * 100)

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-foreground)]">
      <a href="#article-main" className="skip-link">Skip to article</a>

      {/* Reading Progress Bar - sticky top */}
      <div className="progress-bar no-print" style={{ width: `${readingProgress}%` }} role="progressbar" aria-valuenow={Math.round(readingProgress)} aria-valuemin={0} aria-valuemax={100} aria-label="Reading progress" />

      {toast && (
        <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[var(--color-foreground)] text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-3 animate-slideIn text-[14px] font-medium">
          <Check size={16} weight="bold" aria-hidden="true" />
          {toast}
        </div>
      )}

      {/* Article Header */}
      <header className="sticky top-0 z-40 bg-[var(--color-paper)]/90 backdrop-blur-xl border-b border-[var(--color-border)] no-print">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 h-[56px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedArticle(null)} aria-label="Back to home" className="w-9 h-9 rounded-full bg-[var(--color-muted)] hover:bg-[var(--color-border)] flex items-center justify-center transition-colors duration-200 cursor-pointer">
              <CaretLeft size={18} weight="bold" aria-hidden="true" />
            </button>
            <div className="hidden md:flex items-center gap-2 text-[13px]">
              <a href="#" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] cursor-pointer">Atelier</a>
              <span aria-hidden="true" className="text-[var(--color-border)]">/</span>
              <a href="#" className="text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] cursor-pointer">{selectedArticle.category}</a>
              <span aria-hidden="true" className="text-[var(--color-border)]">/</span>
              <span className="font-medium truncate max-w-[24ch]">{selectedArticle.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 mr-2 text-[12px] text-[var(--color-muted-foreground)]">
              <div className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" aria-hidden="true" />
              {progressPercent}% pattern done
            </div>
            
            <button onClick={handleBookmark} aria-label={isBookmarked ? "Remove bookmark" : "Save article"} aria-pressed={isBookmarked} className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${isBookmarked ? "bg-[var(--color-foreground)] text-white border-[var(--color-foreground)]" : "bg-white border-[var(--color-border)] hover:border-[var(--color-foreground)]"}`}>
              <BookmarkSimple size={18} weight={isBookmarked ? "fill" : "regular"} aria-hidden="true" />
            </button>
            
            <button onClick={handlePrint} aria-label="Print article" className="w-9 h-9 rounded-full bg-white border border-[var(--color-border)] hover:border-[var(--color-foreground)] flex items-center justify-center transition-colors duration-200 cursor-pointer">
              <Printer size={18} aria-hidden="true" />
            </button>
            
            <button onClick={() => showToast("Link copied!")} aria-label="Share" className="w-9 h-9 rounded-full bg-white border border-[var(--color-border)] hover:border-[var(--color-foreground)] flex items-center justify-center transition-colors duration-200 cursor-pointer">
              <ShareNetwork size={18} aria-hidden="true" />
            </button>

            <div className="hidden md:block w-px h-6 bg-[var(--color-border)] mx-1" aria-hidden="true" />
            
            <button className="hidden md:inline-flex btn-primary text-[13px] px-4 py-2">
              <DownloadSimple size={16} aria-hidden="true" />
              Save PDF
            </button>
          </div>
        </div>
      </header>

      {/* Article Layout */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[240px_1fr_320px] gap-8 lg:gap-12 py-6 md:py-10">
          
          {/* Left - Floating Sticky ToC */}
          <aside className="hidden lg:block">
            <div className="sticky top-[88px] space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-sans font-bold text-[11px] uppercase tracking-widest flex items-center gap-1.5">
                    <List size={14} aria-hidden="true" />
                    On this page
                  </h2>
                  <button onClick={() => setShowToc(!showToc)} aria-label={showToc ? "Collapse table of contents" : "Expand table of contents"} className="w-6 h-6 rounded-full hover:bg-[var(--color-muted)] flex items-center justify-center transition-colors duration-200 cursor-pointer">
                    <CaretLeft size={12} weight="bold" className={`transition-transform duration-200 ${showToc ? "" : "rotate-180"}`} aria-hidden="true" />
                  </button>
                </div>
                
                {showToc && (
                  <nav aria-label="Table of contents" className="space-y-1">
                    {articleSections.map(section => (
                      <button
                        key={section.id}
                        onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                        className={`toc-link ${activeSection === section.id ? "active" : ""} ${section.level === 3 ? "ml-4 text-[13px]" : ""}`}
                        aria-current={activeSection === section.id ? "true" : undefined}
                      >
                        {section.title}
                      </button>
                    ))}
                  </nav>
                )}
              </div>

              <div className="p-4 rounded-xl bg-[var(--color-muted)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen size={16} aria-hidden="true" />
                  <span className="font-bold text-[13px]">Reading stats</span>
                </div>
                <div className="space-y-2 text-[12px] text-[var(--color-muted-foreground)]">
                  <div className="flex justify-between"><span>Progress</span><span className="font-medium text-[var(--color-foreground)]">{Math.round(readingProgress)}%</span></div>
                  <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--color-primary)] transition-all duration-100" style={{ width: `${readingProgress}%` }} />
                  </div>
                  <div className="flex justify-between"><span>Time left</span><span className="font-medium text-[var(--color-foreground)]">{Math.max(1, 12 - Math.round(readingProgress/8))} min</span></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-[var(--color-muted-foreground)]">
                <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-1 hover:text-[var(--color-foreground)] transition-colors duration-200 cursor-pointer">
                  <ArrowLineUp size={12} aria-hidden="true" />
                  Back to top
                </button>
              </div>
            </div>
          </aside>

          {/* Center - Article */}
          <main id="article-main" ref={articleRef} className="min-w-0">
            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="badge bg-[var(--color-foreground)] text-white">{selectedArticle.category}</span>
                <span className="badge bg-[#F5F0EB] text-[var(--color-foreground)] border border-[var(--color-border)] flex items-center gap-1">
                  <Clock size={10} aria-hidden="true" />
                  {selectedArticle.readTime}
                </span>
                <span className="badge bg-[#F0FDF4] text-[#16A34A]">{selectedArticle.difficulty || "Intermediate"}</span>
              </div>

              <h1 className="editorial-h1 text-[32px] md:text-[44px] lg:text-[52px] leading-[0.95] tracking-[-0.04em] mb-4">
                {selectedArticle.title}
              </h1>

              <p className="text-[18px] md:text-[20px] leading-[1.45] text-[var(--color-ink-light)] font-body max-w-[60ch] mb-6">
                {featuredArticle.excerpt} We went inside the studio to understand why 12,000 people chose to make the same cardigan together — and what it tells us about craft in 2026.
              </p>

              <div className="flex flex-wrap items-center gap-4 py-5 border-y border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <img src={featuredArticle.author.avatar} alt="" className="w-11 h-11 rounded-full" aria-hidden="true" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-[14px]">{featuredArticle.author.name}</span>
                      <CheckCircle size={14} weight="fill" className="text-[var(--color-primary)]" aria-label="Verified author" />
                      <span className="badge bg-[var(--color-muted)] text-[var(--color-muted-foreground)] text-[10px] ml-1">{featuredArticle.author.role}</span>
                    </div>
                    <div className="text-[12px] text-[var(--color-muted-foreground)] flex items-center gap-2">
                      <span>{featuredArticle.date}</span>
                      <span aria-hidden="true">•</span>
                      <span className="flex items-center gap-1"><Eye size={12} aria-hidden="true" />{featuredArticle.views}</span>
                      <span aria-hidden="true">•</span>
                      <span className="flex items-center gap-1"><ChatCircle size={12} aria-hidden="true" />{featuredArticle.comments} comments</span>
                    </div>
                  </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button className="btn-secondary text-[13px] px-4 py-2">
                    <User size={14} aria-hidden="true" />
                    Follow
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image - CLS prevention with aspect-ratio */}
            <div className="img-container aspect-[16/10] rounded-[20px] mb-8 bg-[var(--color-muted)]">
              <img src={selectedArticle.image || featuredArticle.image} alt={`${selectedArticle.title} — editorial photo`} width={1200} height={750} loading="eager" className="w-full h-full object-cover" />
            </div>

            {/* Article Content - 68-75ch, 18px desktop, 1.6 line-height */}
            <article className="article-body readable-tight">
              {/* Intro with drop cap */}
              <section id="intro" ref={el => sectionRefs.current["intro"] = el} className="sticky-offset">
                <p className="drop-cap">
                  The first time I saw the Heirloom Cardigan in person, it was draped over a chair in Mila's sunlit studio in Portland. It had that weight — not heavy, but present — that only comes from 47 hours of intentional stitches. The kind of weight that makes you want to touch it, then immediately worry your hands are too rough.
                </p>
                <p>
                  Mila didn't set out to make a viral pattern. She was trying to solve a problem that has haunted crochet for decades: how do you make something that looks like knit, drapes like woven, but still feels like crochet? The answer, it turns out, involves a mesh that shouldn't work but does, and a community that refused to let it fail.
                </p>

                <div className="pull-quote">
                  "We don't make things because they're easy. We make them because the hard part is where the meaning lives."
                </div>
              </section>

              <section id="why-slow" ref={el => sectionRefs.current["why-slow"] = el} className="sticky-offset mt-12">
                <h2 className="editorial-h2 text-[28px] md:text-[36px] mb-4">Why slow fashion matters now</h2>
                <p>
                  In 2025, the average fast fashion garment is worn 7 times before being discarded. A handmade cardigan is worn 247 times on average — that's data from our community of 12,000 makers who tracked their wears.
                </p>
                <p>
                  But slow fashion isn't just about longevity. It's about the <em>decision</em> to make. Every stitch is a small rebellion against a system that wants you to buy, not build. When you spend 47 hours on a cardigan, you're not just making a garment. You're making time visible.
                </p>
              </section>

              {/* Yarn & Hook Requirement Box */}
              <section id="materials" ref={el => sectionRefs.current["materials"] = el} className="sticky-offset mt-12 not-prose">
                <div className="my-8 p-6 rounded-[16px] bg-white border border-[var(--color-border)] shadow-sm">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <h3 className="font-serif font-bold text-[20px] flex items-center gap-2">
                        <Palette size={20} className="text-[var(--color-primary)]" aria-hidden="true" />
                        Materials & Tools
                      </h3>
                      <p className="text-[13px] text-[var(--color-muted-foreground)] mt-1">Everything you need, tested by 12k makers</p>
                    </div>
                    <span className="badge bg-[#F5F0EB] text-[var(--color-foreground)] border border-[var(--color-border)]">Beginner-friendly subs allowed</span>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-[var(--color-muted)]/70 border border-[var(--color-border)]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#7C3AED]/10 flex items-center justify-center">
                          <Feather size={16} className="text-[#7C3AED]" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-[13px] uppercase tracking-wide">Yarn</span>
                      </div>
                      <div className="space-y-1 text-[14px]">
                        <div className="font-semibold">De Rerum Natura Ulysse</div>
                        <div className="text-[var(--color-muted-foreground)] text-[13px]">100% merino, 185m/50g</div>
                        <div className="text-[13px] mt-2"><span className="font-semibold">6 skeins</span> — Color: Goéland (or 1,100m any fingering)</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--color-muted)]/70 border border-[var(--color-border)]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#16A34A]/10 flex items-center justify-center">
                          <Scissors size={16} className="text-[#16A34A]" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-[13px] uppercase tracking-wide">Hook & Notions</span>
                      </div>
                      <div className="space-y-1 text-[14px]">
                        <div className="font-semibold">3.5mm (E) hook</div>
                        <div className="text-[var(--color-muted-foreground)] text-[13px]">Tulip Etimo Rose recommended</div>
                        <div className="text-[13px] mt-2">Stitch markers x8, tapestry needle, blocking mats</div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--color-muted)]/70 border border-[var(--color-border)]/50">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-[#F59E0B]/10 flex items-center justify-center">
                          <Ruler size={16} className="text-[#F59E0B]" aria-hidden="true" />
                        </div>
                        <span className="font-bold text-[13px] uppercase tracking-wide">Gauge & Size</span>
                      </div>
                      <div className="space-y-1 text-[14px]">
                        <div className="font-semibold">24 sts x 16 rows = 10cm</div>
                        <div className="text-[var(--color-muted-foreground)] text-[13px]">In mesh pattern, blocked</div>
                        <div className="flex gap-2 mt-2">
                          <span className="badge bg-white border border-[var(--color-border)] text-[10px]">XS-3XL</span>
                          <span className="badge bg-[var(--color-foreground)] text-white text-[10px]">Oversized fit</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-[12px] text-[var(--color-muted-foreground)]">
                    <CheckCircle size={14} weight="fill" className="text-[#16A34A]" aria-hidden="true" />
                    <span>Tested with 8 yarn substitutions — <a href="#" className="underline underline-offset-2 hover:text-[var(--color-foreground)] cursor-pointer">see notes</a></span>
                  </div>
                </div>
              </section>

              {/* Interactive Pattern Mode Widget */}
              <section id="pattern-mode" ref={el => sectionRefs.current["pattern-mode"] = el} className="sticky-offset mt-12 not-prose">
                <div className="my-10 rounded-[20px] bg-[var(--color-foreground)] text-white overflow-hidden shadow-xl">
                  <div className="p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <Sparkle size={16} weight="fill" className="text-[#F59E0B]" aria-hidden="true" />
                          </div>
                          <span className="badge bg-white/10 text-white border border-white/20">Interactive Pattern Mode</span>
                        </div>
                        <h3 className="font-serif font-bold text-[24px] md:text-[28px] leading-[1.1]">Stitch with me — check as you go</h3>
                        <p className="text-[14px] text-white/60 mt-2 max-w-[50ch]">Tap to mark complete. Progress saves automatically. Works offline.</p>
                      </div>
                      <div className="hidden md:flex flex-col items-end gap-2">
                        <div className="text-[11px] uppercase tracking-widest text-white/50 font-bold">Progress</div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-serif font-black text-[32px] leading-none">{progressPercent}</span>
                          <span className="text-[14px] text-white/60">%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {patternSteps.map((step) => {
                        const isDone = completedSteps.has(step.id)
                        return (
                          <button
                            key={step.id}
                            onClick={() => toggleStep(step.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer group flex gap-4 items-start ${
                              isDone 
                                ? "bg-white/10 border-white/20 opacity-60" 
                                : "bg-white text-[var(--color-foreground)] border-white hover:shadow-lg hover:translate-y-[-1px]"
                            }`}
                            aria-pressed={isDone}
                            aria-label={`${isDone ? "Mark incomplete" : "Mark complete"}: ${step.title}`}
                          >
                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-200 ${isDone ? "bg-[#16A34A] border-[#16A34A] text-white" : "border-[var(--color-border)] group-hover:border-[var(--color-foreground)] bg-white"}`}>
                              {isDone ? <Check size={16} weight="bold" aria-hidden="true" /> : <Circle size={16} aria-hidden="true" className="text-[var(--color-muted-foreground)]" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2 mb-1">
                                <span className={`font-bold text-[15px] ${isDone ? "line-through text-white/70" : ""}`}>{step.title}</span>
                                <span className={`badge text-[10px] ${isDone ? "bg-white/20 text-white/70" : "bg-[var(--color-muted)] text-[var(--color-muted-foreground)]"}`}>
                                  <Timer size={10} aria-hidden="true" className="mr-1" />
                                  {step.time}
                                </span>
                                <span className={`hidden md:inline-flex badge text-[10px] ${isDone ? "bg-white/10 text-white/50" : "bg-[#F5F0EB] text-[var(--color-foreground)]"}`}>
                                  {step.stitches}
                                </span>
                              </div>
                              <p className={`text-[13px] leading-[1.5] ${isDone ? "text-white/50" : "text-[var(--color-muted-foreground)]"}`}>
                                {step.detail}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden min-w-[120px]">
                        <div className="h-full bg-[#16A34A] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} role="progressbar" aria-valuenow={progressPercent} aria-valuemin={0} aria-valuemax={100} aria-label="Pattern progress" />
                      </div>
                      <span className="text-[13px] text-white/70">{completedSteps.size} of {patternSteps.length} steps • {progressPercent === 100 ? "🎉 Finished!" : `${patternSteps.length - completedSteps.size} left`}</span>
                      <button onClick={() => setCompletedSteps(new Set())} className="ml-auto text-[12px] text-white/50 hover:text-white underline underline-offset-2 transition-colors duration-200 cursor-pointer">
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section id="technique" ref={el => sectionRefs.current["technique"] = el} className="sticky-offset mt-12">
                <h2 className="editorial-h2 text-[26px] md:text-[32px] mb-4">The shaping technique that changed everything</h2>
                <p>
                  Most crochet cardigans shape by increasing at the edges. This one increases <em>inside</em> the mesh, using the ch-1 spaces as growth points. It means the lace stays consistent even as the fabric widens — no awkward gaps at the sides.
                </p>
                <p>
                  Mila discovered it by accident. She was trying to fix a mistake — a missed increase — and realized the fabric looked better with the increase hidden. She ripped back 3 hours of work to test it, then another 5 to perfect it.
                </p>
                
                <figure className="my-8 not-prose">
                  <div className="img-container aspect-[16/9] rounded-xl">
                    <img src="https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&h=450&fit=crop" alt="Close-up of crochet mesh showing hidden increases" width={800} height={450} loading="lazy" />
                  </div>
                  <figcaption className="mt-3 text-[12px] text-[var(--color-muted-foreground)] flex gap-2">
                    <span className="font-mono font-bold uppercase tracking-wide">Fig 2.</span>
                    <span>Hidden increases inside the mesh — notice how the eyelets stay aligned.</span>
                  </figcaption>
                </figure>
              </section>

              {/* Inline Newsletter - non-intrusive */}
              <div className="my-12 p-6 rounded-[16px] bg-[#F5F0EB] border border-[var(--color-border)] not-prose">
                <div className="flex gap-4">
                  <div className="hidden md:flex w-12 h-12 rounded-full bg-[var(--color-foreground)] text-white items-center justify-center shrink-0">
                    <Feather size={20} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-[18px] leading-tight">Join 50k+ crafters who get the Sunday Stitch</h4>
                    <p className="text-[14px] leading-[1.4] text-[var(--color-muted-foreground)] mt-1 max-w-[50ch]">One email, 3 patterns, 1 essay on making. No spam, ever. Free heirloom pattern when you join.</p>
                    
                    <form onSubmit={handleNewsletter} className="mt-4 flex gap-2 max-w-[400px]">
                      <label htmlFor={emailInputId} className="sr-only">Email address</label>
                      <input
                        id={emailInputId}
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if(emailError) setEmailError("") }}
                        placeholder="you@cozy.email"
                        aria-invalid={!!emailError}
                        aria-describedby={emailError ? `${emailInputId}-error` : undefined}
                        className={`flex-1 px-4 py-2.5 rounded-full border text-[14px] focus:outline-none focus:ring-4 transition-all duration-200 ${emailError ? "border-red-300 focus:border-red-500 focus:ring-red-500/10 bg-white" : "border-[var(--color-border)] focus:border-[var(--color-foreground)] focus:ring-[var(--color-foreground)]/10 bg-white"}`}
                      />
                      <button type="submit" className="btn-primary px-5 py-2.5 text-[13px] shrink-0">
                        Join free
                      </button>
                    </form>
                    {emailError && <p id={`${emailInputId}-error`} role="alert" className="mt-2 text-[12px] text-red-600">{emailError}</p>}
                    <p className="mt-2 text-[11px] text-[var(--color-muted-foreground)]">By joining, you agree to our Terms. Unsubscribe anytime.</p>
                  </div>
                </div>
              </div>

              <section id="community" ref={el => sectionRefs.current["community"] = el} className="sticky-offset mt-12">
                <h3 className="editorial-h3 text-[22px] md:text-[26px] mb-4">Make-along community</h3>
                <p>
                  12,000 people made this cardigan together in January. They posted 4,300 photos, asked 892 questions, and answered 847 of them before Mila could. The top tip? "Add a stitch marker every 20 stitches — game changer."
                </p>
                <p>
                  The make-along isn't a marketing gimmick. It's how we test patterns now. Every pattern gets made by 50 people before it goes on sale. If 3 people get stuck at the same row, we rewrite that row.
                </p>
              </section>

              <section id="finishing" ref={el => sectionRefs.current["finishing"] = el} className="sticky-offset mt-12">
                <h2 className="editorial-h2 text-[26px] md:text-[32px] mb-4">Finishing & Blocking</h2>
                <p>
                  Wet block aggressively. This mesh wants to be 42" wingspan, not 38". Pin it out, spray it, leave it for 24 hours. The merino will bloom and the eyelets will open. Don't skip this — it's the difference between "homemade" and "heirloom."
                </p>
                <p>
                  The cardigan will feel huge when wet. That's correct. Trust the process. Trust the blocking. Trust the 12,000 people who did it before you.
                </p>
              </section>

              {/* Article footer actions */}
              <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-wrap gap-3">
                <button onClick={handleBookmark} className={`btn-secondary ${isBookmarked ? "bg-[var(--color-foreground)] text-white border-[var(--color-foreground)]" : ""}`}>
                  <BookmarkSimple size={18} weight={isBookmarked ? "fill" : "regular"} aria-hidden="true" />
                  {isBookmarked ? "Saved" : "Save"}
                </button>
                <button onClick={() => showToast("PDF downloading...")} className="btn-secondary">
                  <FilePdf size={18} aria-hidden="true" />
                  Save PDF
                </button>
                <button onClick={handlePrint} className="btn-secondary">
                  <Printer size={18} aria-hidden="true" />
                  Print
                </button>
                <button onClick={() => showToast("Link copied!")} className="btn-ghost ml-auto">
                  <ShareNetwork size={18} aria-hidden="true" />
                  Share
                </button>
              </div>
            </article>

            {/* Related Articles Slider */}
            <div className="mt-16 pt-10 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif font-bold text-[22px]">Keep stitching</h3>
                <div className="flex gap-2">
                  <button onClick={() => setRelatedIndex(Math.max(0, relatedIndex-1))} aria-label="Previous related" className="w-9 h-9 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-foreground)] transition-colors duration-200 cursor-pointer disabled:opacity-30" disabled={relatedIndex===0}>
                    <CaretLeft size={16} weight="bold" aria-hidden="true" />
                  </button>
                  <button onClick={() => setRelatedIndex(Math.min(relatedArticles.length-3, relatedIndex+1))} aria-label="Next related" className="w-9 h-9 rounded-full bg-[var(--color-foreground)] text-white flex items-center justify-center hover:bg-black transition-colors duration-200 cursor-pointer disabled:opacity-30" disabled={relatedIndex>=relatedArticles.length-3}>
                    <CaretRight size={16} weight="bold" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="flex gap-4 transition-transform duration-300 ease-out" style={{ transform: `translateX(-${relatedIndex * 280}px)` }}>
                  {relatedArticles.map(article => (
                    <button key={article.id} onClick={() => showToast("Opening article...")} className="group text-left shrink-0 w-[260px] cursor-pointer">
                      <div className="img-container aspect-[3/2] rounded-xl mb-3">
                        <img src={article.image} alt="" width={260} height={173} loading="lazy" className="w-full h-full object-cover" />
                      </div>
                      <div className="badge bg-[var(--color-muted)] text-[var(--color-muted-foreground)] text-[10px] mb-2">{article.category}</div>
                      <h4 className="font-serif font-bold text-[16px] leading-[1.25] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                        {article.title}
                      </h4>
                      <div className="text-[12px] text-[var(--color-muted-foreground)] mt-1 flex items-center gap-1">
                        <Clock size={10} aria-hidden="true" />
                        {article.readTime}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Right - Sticky Widgets */}
          <aside className="hidden lg:block">
            <div className="sticky top-[88px] space-y-6">
              {/* Author */}
              <div className="p-5 rounded-[16px] bg-white border border-[var(--color-border)]">
                <div className="flex items-center gap-3 mb-3">
                  <img src={featuredArticle.author.avatar} alt="" className="w-12 h-12 rounded-full" aria-hidden="true" />
                  <div>
                    <div className="font-bold text-[14px] flex items-center gap-1">
                      {featuredArticle.author.name}
                      <CheckCircle size={14} weight="fill" className="text-[var(--color-primary)]" aria-hidden="true" />
                    </div>
                    <div className="text-[12px] text-[var(--color-muted-foreground)]">{featuredArticle.author.role}</div>
                  </div>
                </div>
                <p className="text-[13px] leading-[1.5] text-[var(--color-muted-foreground)] mb-3">Slow fashion essayist. 47-hour cardigan evangelist. Teaches at Penland.</p>
                <button className="w-full btn-secondary text-[13px] py-2.5">Follow • 12.4k</button>
              </div>

              {/* Pattern quick actions */}
              <div className="p-5 rounded-[16px] bg-[#FFFBF5] border border-[var(--color-border)]">
                <h4 className="font-bold text-[13px] uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Star size={14} weight="fill" className="text-[#F59E0B]" aria-hidden="true" />
                  Pattern actions
                </h4>
                <div className="space-y-2">
                  <button onClick={() => { setSavedPatterns(prev => { const n=new Set(prev); n.has(1)?n.delete(1):n.add(1); return n }); showToast(savedPatterns.has(1)?"Removed from patterns":"Saved pattern"); }} className="w-full flex items-center justify-between p-3 rounded-xl bg-white border border-[var(--color-border)] hover:border-[var(--color-foreground)] transition-colors duration-200 cursor-pointer text-[13px] font-medium">
                    <span className="flex items-center gap-2"><BookmarkSimple size={16} aria-hidden="true" />{savedPatterns.has(1) ? "Saved to library" : "Save pattern"}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </button>
                  <button onClick={() => showToast("Added to cart — $8.50")} className="w-full flex items-center justify-between p-3 rounded-xl bg-[var(--color-foreground)] text-white hover:bg-black transition-colors duration-200 cursor-pointer text-[13px] font-medium">
                    <span className="flex items-center gap-2"><DownloadSimple size={16} aria-hidden="true" />Buy pattern • $8.50</span>
                    <ArrowUpRight size={14} aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 text-[11px] text-[var(--color-muted-foreground)] flex items-center gap-1.5">
                  <CheckCircle size={12} weight="fill" className="text-[#16A34A]" aria-hidden="true" />
                  Instant download • 12k makers • 4.9★ (342)
                </div>
              </div>

              {/* Yarn requirement mini */}
              <div className="p-4 rounded-xl bg-white border border-[var(--color-border)]">
                <h4 className="font-bold text-[12px] uppercase tracking-wide mb-3">Quick facts</h4>
                <div className="space-y-2.5 text-[13px]">
                  <div className="flex justify-between"><span className="text-[var(--color-muted-foreground)]">Time</span><span className="font-medium">47 hours</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-muted-foreground)]">Yarn</span><span className="font-medium">Fingering, 1100m</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-muted-foreground)]">Hook</span><span className="font-medium">3.5mm</span></div>
                  <div className="flex justify-between"><span className="text-[var(--color-muted-foreground)]">Size</span><span className="font-medium">XS-3XL</span></div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile ToC - collapsible sticky bottom */}
      <div className="lg:hidden fixed bottom-[72px] left-4 right-4 z-30 no-print">
        {showMobileToc ? (
          <div className="bg-white rounded-[16px] shadow-xl border border-[var(--color-border)] p-4 animate-slideIn max-h-[50vh] overflow-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-[13px] uppercase tracking-wide">On this page</h3>
              <button onClick={() => setShowMobileToc(false)} className="w-8 h-8 rounded-full bg-[var(--color-muted)] flex items-center justify-center cursor-pointer" aria-label="Close table of contents">
                <X size={14} aria-hidden="true" />
              </button>
            </div>
            <nav className="space-y-1">
              {articleSections.map(s => (
                <button key={s.id} onClick={() => { document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); setShowMobileToc(false); }} className={`w-full text-left px-3 py-2.5 rounded-xl text-[14px] transition-colors duration-200 cursor-pointer ${activeSection===s.id ? "bg-[var(--color-foreground)] text-white" : "hover:bg-[var(--color-muted)]"}`}>
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        ) : (
          <button onClick={() => setShowMobileToc(true)} className="w-full bg-[var(--color-foreground)] text-white p-3 rounded-full shadow-lg flex items-center justify-between px-5 cursor-pointer">
            <span className="flex items-center gap-2 text-[13px] font-medium">
              <List size={16} aria-hidden="true" />
              {articleSections.find(s => s.id===activeSection)?.title || "Table of contents"}
            </span>
            <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-full">{Math.round(readingProgress)}% read</span>
          </button>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[var(--color-border)] lg:hidden no-print">
        <div className="grid grid-cols-4 h-[64px] px-2">
          {[
            { icon: House, label: "Home", action: () => setSelectedArticle(null) },
            { icon: List, label: "Contents", action: () => setShowMobileToc(!showMobileToc) },
            { icon: BookmarkSimple, label: "Save", action: handleBookmark, active: isBookmarked },
            { icon: DotsThree, label: "More", action: () => showToast("More options") }
          ].map((item, i) => (
            <button key={i} onClick={item.action} className={`flex flex-col items-center justify-center gap-1 rounded-xl transition-colors duration-200 cursor-pointer ${item.active ? "text-[var(--color-foreground)]" : "text-[var(--color-muted-foreground)]"}`} aria-label={item.label}>
              <item.icon size={22} weight={item.active ? "fill" : "regular"} aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .scrollbar-none {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
