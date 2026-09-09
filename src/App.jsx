import { useState, useEffect, useRef, useId } from 'react'
import {
  Heart,
  ShoppingBag,
  ShoppingCart,
  Star,
  Users,
  MagnifyingGlass,
  Funnel,
  Play,
  Pause,
  CaretLeft,
  CaretRight,
  Check,
  Sparkle,
  Handbag,
  BookOpen,
  Timer,
  Palette,
  ChatCircle,
  ArrowRight,
  Plus,
  Minus,
  X,
  InstagramLogo,
  PinterestLogo,
  YoutubeLogo
} from '@phosphor-icons/react'

// Mock data - crochet patterns
const patterns = [
  { id: 1, title: "Cozy Cloud Cardigan", category: "Wearables", price: 8.5, rating: 4.9, reviews: 342, author: "Mila Stitches", image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop", color: "#7C3AED", difficulty: "Intermediate", time: "20h", featured: true },
  { id: 2, title: "Strawberry Bucket Hat", category: "Accessories", price: 5.0, rating: 5.0, reviews: 521, author: "Berry Yarns", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop", color: "#EC4899", difficulty: "Beginner", time: "4h", featured: true },
  { id: 3, title: "Heirloom Granny Square", category: "Home", price: 6.0, rating: 4.8, reviews: 189, author: "Vintage Loops", image: "https://images.unsplash.com/photo-1520903922286-652ae563cb3a?w=400&h=400&fit=crop", color: "#16A34A", difficulty: "Beginner", time: "12h", featured: false },
  { id: 4, title: "Amigurumi Fox Family", category: "Toys", price: 12.0, rating: 4.9, reviews: 412, author: "Tiny Friends Co", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop", color: "#F59E0B", difficulty: "Advanced", time: "15h", featured: true },
  { id: 5, title: "Sunset Market Bag", category: "Bags", price: 4.5, rating: 4.7, reviews: 278, author: "Eco Stitch", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop", color: "#06B6D4", difficulty: "Beginner", time: "6h", featured: false },
  { id: 6, title: "Cottagecore Blanket", category: "Home", price: 9.0, rating: 5.0, reviews: 633, author: "Mila Stitches", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=400&h=400&fit=crop", color: "#7C3AED", difficulty: "Intermediate", time: "35h", featured: true },
]

const testimonials = [
  { id: 1, name: "Sage Nakamura", role: "Pattern Designer • 2.3k sales", avatar: "https://i.pravatar.cc/100?img=5", quote: "Crocheeeet tripled my pattern income. The community actually reads instructions and leaves photos. It's not just a marketplace, it's a studio." },
  { id: 2, name: "Alex Rivera", role: "Beginner • 12 projects", avatar: "https://i.pravatar.cc/100?img=8", quote: "I learned to crochet here last winter. The stitch counter saved me from ripping out 200 stitches. Now I'm selling my own beanies." },
  { id: 3, name: "Juniper Wu", role: "Shop Owner • Portland", avatar: "https://i.pravatar.cc/100?img=26", quote: "We source handmade stock from Crocheeeet sellers. Quality curation is insane. Every piece feels like it has a story, because it does." },
]

const categories = [
  { name: "Wearables", count: "2.4k", icon: Handbag, color: "bg-[#7C3AED]", light: "bg-[#F5F3FF]" },
  { name: "Home Cozy", count: "1.8k", icon: BookOpen, color: "bg-[#16A34A]", light: "bg-[#F0FDF4]" },
  { name: "Amigurumi", count: "3.1k", icon: Heart, color: "bg-[#EC4899]", light: "bg-[#FDF2F8]" },
  { name: "Bags", count: "892", icon: ShoppingBag, color: "bg-[#F59E0B]", light: "bg-[#FFFBEB]" },
]

export default function App() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [favorites, setFavorites] = useState(new Set([1, 4]))
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [isCarouselPaused, setIsCarouselPaused] = useState(false)
  const [stitchCount, setStitchCount] = useState(24)
  const [rowCount, setRowCount] = useState(3)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [showToast, setShowToast] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const carouselRef = useRef(null)
  const liveRegionId = useId()
  const searchId = useId()
  const emailId = useId()

  const filteredPatterns = patterns.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.author.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Carousel auto-rotate with pause on focus/hover/reduced motion
  useEffect(() => {
    if (isCarouselPaused) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isCarouselPaused, testimonials.length])

  // Keyboard nav for carousel
  const handleCarouselKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setTestimonialIndex(prev => (prev + 1) % testimonials.length)
    }
  }

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    showToastMessage(favorites.has(id) ? "Removed from favorites" : "Added to favorites")
  }

  const addToCart = (pattern) => {
    setCart(prev => {
      if (prev.find(p => p.id === pattern.id)) return prev
      return [...prev, pattern]
    })
    showToastMessage(`${pattern.title} added to bag`)
  }

  const showToastMessage = (message) => {
    setShowToast(message)
    setTimeout(() => setShowToast(null), 3000)
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError("Please enter a valid email address")
      return
    }
    setEmailError("")
    showToastMessage("Welcome to the cozy club! Check your email.")
    setEmail("")
  }

  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0)

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] selection:bg-[var(--color-secondary)] selection:text-[var(--color-foreground)]">
      {/* Skip link - accessibility */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Toast - aria-live */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {showToast && (
          <div 
            role="status" 
            aria-live="polite"
            className="pointer-events-auto bg-[var(--color-foreground)] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-[slideIn_200ms_ease] min-w-[300px]"
          >
            <div className="bg-[var(--color-accent)] rounded-full p-1">
              <Check size={16} weight="bold" className="text-white" aria-hidden="true" />
            </div>
            <span className="font-medium">{showToast}</span>
          </div>
        )}
      </div>

      {/* Header - sticky, safe area, 44px touch targets */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[64px] md:h-[72px] gap-4">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <a href="#" className="flex items-center gap-3 cursor-pointer group" aria-label="Crocheeeet home">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] flex items-center justify-center text-white font-display text-xl font-bold group-hover:scale-105 transition-transform duration-200 shadow-md">
                  c
                </div>
                <span className="font-display text-[28px] md:text-[32px] font-bold tracking-tight">crocheeeet</span>
                <span className="hidden md:inline-flex badge bg-[var(--color-muted)] text-[var(--color-muted-foreground)] ml-1">eee</span>
              </a>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                {["Market", "Learn", "Community", "Journal"].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="btn-ghost text-[15px] font-medium">
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Search - visible label, error near field pattern */}
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-[360px] mx-4">
              <div className="relative w-full">
                <label htmlFor={searchId} className="sr-only">Search patterns</label>
                <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]" aria-hidden="true" />
                <input
                  id={searchId}
                  type="search"
                  placeholder="Search cozy patterns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)]/50 focus:bg-white focus:border-[var(--color-primary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all duration-200 text-[14px]"
                />
              </div>
            </div>

            {/* Actions - 44x44 min, 8px spacing */}
            <div className="flex items-center gap-2">
              <button 
                aria-label="Favorites"
                className="relative w-11 h-11 rounded-xl bg-[var(--color-muted)] hover:bg-[var(--color-border)] flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <Heart size={20} weight={favorites.size > 0 ? "fill" : "regular"} className={favorites.size > 0 ? "text-[#EC4899]" : ""} aria-hidden="true" />
                {favorites.size > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#EC4899] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center" aria-label={`${favorites.size} favorites`}>
                    {favorites.size}
                  </span>
                )}
              </button>

              <button 
                onClick={() => setCartOpen(true)}
                aria-label={`Shopping bag, ${cart.length} items`}
                className="relative w-11 h-11 rounded-xl bg-[var(--color-foreground)] text-white hover:bg-black flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-md"
              >
                <ShoppingBag size={20} weight="regular" aria-hidden="true" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              <div className="hidden md:flex items-center gap-2 ml-2 pl-3 border-l border-[var(--color-border)]">
                <button className="btn-secondary py-2 px-4 text-sm">Log in</button>
                <button className="btn-primary py-2 px-5 text-sm">Join club</button>
              </div>

              {/* Mobile menu */}
              <button aria-label="Open menu" className="lg:hidden w-11 h-11 rounded-xl bg-[var(--color-muted)] flex items-center justify-center cursor-pointer ml-1">
                <Users size={20} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        {/* HERO - Vibrant & Block-based, large type 32px+, 48px+ gaps, animated patterns */}
        <section className="relative overflow-hidden">
          {/* Animated pattern background */}
          <div className="absolute inset-0 pattern-dots opacity-[0.4] pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-background)] pointer-events-none" aria-hidden="true" />
          
          {/* Geometric shapes - block layout */}
          <div className="absolute top-20 right-[10%] w-32 h-32 bg-[var(--color-secondary)] rounded-[24px] rotate-12 opacity-20 hidden lg:block" aria-hidden="true" />
          <div className="absolute bottom-20 left-[5%] w-20 h-20 bg-[var(--color-accent)] rounded-full opacity-20 hidden lg:block" aria-hidden="true" />

          <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center py-12 md:py-20 lg:py-28">
              {/* Hero content */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 bg-white border border-[var(--color-border)] rounded-full px-4 py-2 shadow-sm">
                  <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" aria-hidden="true" />
                  <span className="text-[13px] font-semibold tracking-wide uppercase text-[var(--color-muted-foreground)]">New • 423 patterns this week</span>
                </div>

                <div className="space-y-6">
                  <h1 className="font-display leading-[0.9] tracking-[-0.03em]">
                    <span className="block">Stitch.</span>
                    <span className="block text-[var(--color-primary)]">Share.</span>
                    <span className="block relative">
                      Shop.
                      <span className="absolute -top-2 -right-8 md:-right-12 bg-[var(--color-accent)] text-white font-sans text-[14px] md:text-[16px] font-bold px-3 py-1 rounded-full rotate-3 shadow-md">
                        eee!
                      </span>
                    </span>
                  </h1>
                  
                  <p className="text-[18px] md:text-[20px] leading-[1.5] text-[var(--color-muted-foreground)] max-w-[48ch] font-medium">
                    The marketplace that feels like your favorite yarn store. 
                    <span className="text-[var(--color-foreground)] font-semibold"> Extra cozy with three e's.</span> Discover indie patterns, track every row, and sell what you make.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="btn-primary text-[16px] px-8 py-4 rounded-full shadow-lg hover:shadow-xl">
                    <span>Explore patterns</span>
                    <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </button>
                  <button className="btn-secondary rounded-full px-8 py-4 bg-white">
                    <Play size={18} weight="fill" aria-hidden="true" />
                    <span>How it works</span>
                  </button>
                </div>

                {/* Social proof - trust signals */}
                <div className="flex items-center gap-6 pt-4">
                  <div className="flex -space-x-2" aria-hidden="true">
                    {[1,2,3,4].map(i => (
                      <img key={i} src={`https://i.pravatar.cc/40?img=${i+10}`} alt="" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
                    ))}
                  </div>
                  <div className="text-[14px] leading-tight">
                    <div className="flex items-center gap-1 font-semibold">
                      <Star size={16} weight="fill" className="text-[#F59E0B]" aria-hidden="true" />
                      <span>4.9/5 from 12.4k makers</span>
                    </div>
                    <div className="text-[var(--color-muted-foreground)]">Trusted by indie shops worldwide</div>
                  </div>
                </div>
              </div>

              {/* Hero visual - bento box grid */}
              <div className="relative lg:h-[640px]">
                <div className="grid grid-cols-2 gap-4 h-full">
                  {/* Large featured card */}
                  <div className="col-span-2 md:col-span-1 md:row-span-2 group">
                    <div className="card p-0 h-full min-h-[320px] md:min-h-0 overflow-hidden border-2 hover:border-[var(--color-primary)]">
                      <div className="img-container aspect-[4/3] md:aspect-auto md:h-[70%]">
                        <img 
                          src={patterns[0].image} 
                          alt={`${patterns[0].title} crochet pattern preview showing texture details`}
                          loading="eager"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-sm">
                          Featured
                        </div>
                        <button 
                          onClick={() => toggleFavorite(patterns[0].id)}
                          aria-label={favorites.has(patterns[0].id) ? `Remove ${patterns[0].title} from favorites` : `Add ${patterns[0].title} to favorites`}
                          aria-pressed={favorites.has(patterns[0].id)}
                          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer"
                        >
                          <Heart size={18} weight={favorites.has(patterns[0].id) ? "fill" : "regular"} className={favorites.has(patterns[0].id) ? "text-[#EC4899]" : "text-gray-600"} aria-hidden="true" />
                        </button>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-sans font-bold text-[18px] leading-tight">{patterns[0].title}</h3>
                          <span className="font-bold text-[var(--color-primary)]">${patterns[0].price}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-[var(--color-muted-foreground)]">
                          <span>{patterns[0].author}</span>
                          <span aria-hidden="true">•</span>
                          <span className="flex items-center gap-1"><Star size={12} weight="fill" className="text-[#F59E0B]" aria-hidden="true" /> {patterns[0].rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Small cards stack */}
                  <div className="col-span-2 md:col-span-1 grid grid-rows-2 gap-4">
                    <div className="card p-0 overflow-hidden flex">
                      <div className="img-container w-[45%] aspect-square">
                        <img src={patterns[1].image} alt="" width={200} height={200} loading="lazy" />
                      </div>
                      <div className="p-3 flex-1 flex flex-col justify-center">
                        <h4 className="font-bold text-[14px] leading-tight">{patterns[1].title}</h4>
                        <p className="text-[12px] text-[var(--color-muted-foreground)] mt-1">{patterns[1].time} • {patterns[1].difficulty}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-[13px] font-bold">${patterns[1].price}</span>
                          <span className="badge bg-[#FDF2F8] text-[#EC4899] text-[10px]">Hot</span>
                        </div>
                      </div>
                    </div>

                    {/* Stitch counter demo - micro-interaction */}
                    <div className="card bg-[var(--color-foreground)] text-white p-4 flex flex-col justify-between border-[var(--color-foreground)]">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-widest opacity-70">Row counter</span>
                        <Timer size={16} aria-hidden="true" className="opacity-70" />
                      </div>
                      <div className="space-y-3 mt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-[42px] leading-none">{rowCount}</span>
                          <span className="text-[14px] opacity-70">/ 24 rows</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-300" style={{ width: `${(rowCount/24)*100}%` }} role="progressbar" aria-valuenow={rowCount} aria-valuemin={0} aria-valuemax={24} aria-label="Rows completed" />
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => setRowCount(Math.max(0, rowCount-1))} aria-label="Decrease row count" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors duration-200 cursor-pointer">
                            <Minus size={14} weight="bold" aria-hidden="true" />
                          </button>
                          <button onClick={() => setRowCount(Math.min(24, rowCount+1))} aria-label="Increase row count" className="w-8 h-8 rounded-full bg-white text-[var(--color-foreground)] hover:bg-gray-100 flex items-center justify-center transition-colors duration-200 cursor-pointer">
                            <Plus size={14} weight="bold" aria-hidden="true" />
                          </button>
                          <span className="ml-auto text-[12px] opacity-70 flex items-center gap-1">
                            <Sparkle size={12} aria-hidden="true" /> {stitchCount} sts
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem statement - conversion focused */}
        <section className="block-section bg-white border-y border-[var(--color-border)]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="badge bg-[var(--color-muted)] text-[var(--color-muted-foreground)] mb-4">The problem</span>
              <h2 className="leading-[0.95] mb-6">
                Pattern PDFs are stuck in 2012. <br />
                <span className="text-[var(--color-muted-foreground)]">Your creativity isn't.</span>
              </h2>
              <p className="text-[18px] leading-[1.6] text-[var(--color-muted-foreground)]">
                Endless scrolling through blurry photos, no row counter, no community. You buy a pattern, get a PDF, and you're on your own. 
                Crocheeeet fixes that with live patterns that track your progress, show your place, and connect you to 40k makers who've made it before.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: BookOpen, title: "Live patterns", desc: "Not PDFs. Interactive charts that highlight your current row, count stitches, and work offline." },
                { icon: Users, title: "Make-alongs", desc: "Join timed challenges. See others' progress. Get help when you're stuck at 2am." },
                { icon: ShoppingBag, title: "Sell instantly", desc: "Upload a pattern, set a price. We handle VAT, files, and piracy protection. You keep 85%." }
              ].map((f, i) => (
                <div key={i} className="group">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-muted)] group-hover:bg-[var(--color-primary)] group-hover:text-white flex items-center justify-center transition-colors duration-200 mb-4">
                    <f.icon size={24} weight="regular" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans font-bold text-[20px] mb-2">{f.title}</h3>
                  <p className="text-[15px] leading-[1.5] text-[var(--color-muted-foreground)]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories - Bento Box Grid */}
        <section id="market" className="block-section">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="mb-3">Find your next obsession</h2>
                <p className="text-[var(--color-muted-foreground)] text-[18px] max-w-[50ch]">Hand-picked categories. No AI slop. Every pattern tested by a human.</p>
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Pattern categories">
                {["All", "Wearables", "Home", "Toys", "Accessories", "Bags"].map(cat => (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-5 py-2.5 rounded-full font-medium text-[14px] transition-all duration-200 cursor-pointer min-h-[44px] ${
                      activeCategory === cat 
                        ? "bg-[var(--color-foreground)] text-white shadow-md" 
                        : "bg-white border border-[var(--color-border)] hover:border-[var(--color-foreground)] hover:bg-[var(--color-muted)]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name === "Home Cozy" ? "Home" : cat.name === "Amigurumi" ? "Toys" : cat.name)}
                  className={`card text-left p-5 ${cat.light} hover:shadow-lg group border-0 min-h-[140px] flex flex-col justify-between cursor-pointer`}
                  aria-label={`Browse ${cat.name} category, ${cat.count} patterns`}
                >
                  <div className={`w-10 h-10 rounded-xl ${cat.color} text-white flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                    <cat.icon size={20} weight="regular" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-bold text-[18px]">{cat.name}</div>
                    <div className="text-[13px] text-[var(--color-muted-foreground)]">{cat.count} patterns</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Marketplace grid - product cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPatterns.map((pattern) => (
                <article
                  key={pattern.id}
                  className="card p-0 overflow-hidden group flex flex-col"
                  tabIndex={0}
                  aria-label={`${pattern.title} by ${pattern.author}, ${pattern.rating} stars, $${pattern.price}`}
                >
                  <div className="img-container aspect-[4/3] relative">
                    <img
                      src={pattern.image}
                      alt={`${pattern.title} - ${pattern.category} crochet pattern, ${pattern.difficulty} level, ${pattern.time}`}
                      loading="lazy"
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm">
                        {pattern.category}
                      </span>
                      {pattern.featured && (
                        <span className="bg-[var(--color-primary)] text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(pattern.id) }}
                        aria-label={favorites.has(pattern.id) ? `Remove ${pattern.title} from favorites` : `Add ${pattern.title} to favorites`}
                        aria-pressed={favorites.has(pattern.id)}
                        className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                      >
                        <Heart size={18} weight={favorites.has(pattern.id) ? "fill" : "regular"} className={favorites.has(pattern.id) ? "text-[#EC4899]" : "text-gray-600"} aria-hidden="true" />
                      </button>
                    </div>

                    {/* Quick add - appears on hover/focus */}
                    <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 translate-y-2 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-200">
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(pattern) }}
                        className="w-full bg-[var(--color-foreground)] text-white py-2.5 rounded-xl font-semibold text-[14px] flex items-center justify-center gap-2 shadow-lg hover:bg-black transition-colors duration-200 cursor-pointer"
                      >
                        <ShoppingBag size={16} aria-hidden="true" />
                        Add to bag • ${pattern.price}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1 gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-sans font-bold text-[18px] leading-tight line-clamp-2 flex-1">
                        {pattern.title}
                      </h3>
                      <span className="font-bold text-[18px] text-[var(--color-primary)] shrink-0">${pattern.price}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[13px]">
                      <img src={`https://i.pravatar.cc/24?u=${pattern.author}`} alt="" className="w-6 h-6 rounded-full" aria-hidden="true" />
                      <span className="text-[var(--color-muted-foreground)] truncate">{pattern.author}</span>
                      <span className="w-1 h-1 bg-[var(--color-border)] rounded-full shrink-0" aria-hidden="true" />
                      <span className="flex items-center gap-1 font-medium shrink-0">
                        <Star size={14} weight="fill" className="text-[#F59E0B]" aria-hidden="true" />
                        {pattern.rating}
                        <span className="text-[var(--color-muted-foreground)] font-normal">({pattern.reviews})</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-auto pt-2">
                      <span className={`badge text-[10px] ${pattern.difficulty === 'Beginner' ? 'bg-[#F0FDF4] text-[#16A34A]' : pattern.difficulty === 'Intermediate' ? 'bg-[#FFFBEB] text-[#D97706]' : 'bg-[#FDF2F8] text-[#EC4899]'}`}>
                        {pattern.difficulty}
                      </span>
                      <span className="badge bg-[var(--color-muted)] text-[var(--color-muted-foreground)] text-[10px]">
                        <Timer size={10} aria-hidden="true" className="mr-1" />
                        {pattern.time}
                      </span>
                      <span className="ml-auto text-[12px] text-[var(--color-muted-foreground)] flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: pattern.color }} aria-hidden="true" />
                        Yarn
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPatterns.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[var(--color-muted)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Funnel size={24} className="text-[var(--color-muted-foreground)]" aria-hidden="true" />
                </div>
                <h3 className="font-sans font-bold text-[20px] mb-2">No patterns found</h3>
                <p className="text-[var(--color-muted-foreground)] mb-4">Try adjusting your search or category</p>
                <button onClick={() => { setActiveCategory("All"); setSearchQuery("") }} className="btn-secondary">Clear filters</button>
              </div>
            )}
          </div>
        </section>

        {/* Testimonials - accessible carousel */}
        <section className="block-section bg-white border-y border-[var(--color-border)]" aria-labelledby="testimonials-heading">
          <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="badge bg-[#F5F3FF] text-[var(--color-primary)] mb-4">Social proof</span>
                <h2 id="testimonials-heading" className="max-w-[18ch] leading-[0.95]">Makers who actually make money here</h2>
              </div>

              {/* Carousel controls - WCAG: pause/stop, keyboard, announce position */}
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => setIsCarouselPaused(!isCarouselPaused)}
                  aria-label={isCarouselPaused ? "Play testimonials carousel" : "Pause testimonials carousel"}
                  className="w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-muted)] transition-colors duration-200 cursor-pointer"
                >
                  {isCarouselPaused ? <Play size={16} weight="fill" aria-hidden="true" /> : <Pause size={16} weight="fill" aria-hidden="true" />}
                </button>
                <button
                  onClick={() => setTestimonialIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous testimonial"
                  className="w-11 h-11 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:bg-[var(--color-muted)] transition-colors duration-200 cursor-pointer"
                >
                  <CaretLeft size={16} weight="bold" aria-hidden="true" />
                </button>
                <button
                  onClick={() => setTestimonialIndex(prev => (prev + 1) % testimonials.length)}
                  aria-label="Next testimonial"
                  className="w-11 h-11 rounded-full bg-[var(--color-foreground)] text-white flex items-center justify-center hover:bg-black transition-colors duration-200 cursor-pointer"
                >
                  <CaretRight size={16} weight="bold" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Carousel */}
            <div 
              ref={carouselRef}
              className="relative"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocus={() => setIsCarouselPaused(true)}
              onBlur={() => setIsCarouselPaused(false)}
              onKeyDown={handleCarouselKeyDown}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Testimonials"
              aria-live="off"
            >
              {/* Live region for screen readers */}
              <div id={liveRegionId} className="sr-only" aria-live="polite" aria-atomic="true">
                Testimonial {testimonialIndex + 1} of {testimonials.length}: {testimonials[testimonialIndex].quote} by {testimonials[testimonialIndex].name}
              </div>

              <div className="overflow-hidden rounded-[24px] bg-[var(--color-muted)]">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${testimonialIndex * 100}%)` }}
                >
                  {testimonials.map((t) => (
                    <div
                      key={t.id}
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${t.name}, ${testimonialIndex + 1} of ${testimonials.length}`}
                      className="w-full shrink-0 grid md:grid-cols-[1.1fr_0.9fr] gap-0"
                    >
                      <div className="p-8 md:p-12 flex flex-col justify-center gap-6 bg-white">
                        <div className="flex gap-1" aria-label={`5 out of 5 stars`}>
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} weight="fill" className="text-[#F59E0B]" aria-hidden="true" />
                          ))}
                        </div>
                        <blockquote className="text-[20px] md:text-[24px] leading-[1.4] font-medium">
                          "{t.quote}"
                        </blockquote>
                        <div className="flex items-center gap-4 pt-2">
                          <img src={t.avatar} alt="" width={48} height={48} className="w-12 h-12 rounded-full object-cover" aria-hidden="true" />
                          <div>
                            <div className="font-bold text-[16px]">{t.name}</div>
                            <div className="text-[13px] text-[var(--color-muted-foreground)]">{t.role}</div>
                          </div>
                          <div className="ml-auto hidden md:flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide bg-[#F0FDF4] text-[#16A34A] px-3 py-1 rounded-full">
                            <Check size={12} weight="bold" aria-hidden="true" />
                            Verified
                          </div>
                        </div>
                      </div>
                      <div className="bg-[#F5F3FF] p-8 md:p-12 flex flex-col justify-center relative overflow-hidden min-h-[320px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-secondary)]/20 rounded-full blur-3xl" aria-hidden="true" />
                        <div className="relative space-y-6">
                          <div className="inline-flex items-center gap-2 bg-white rounded-full px-3 py-1 text-[12px] font-bold shadow-sm">
                            <span className="w-2 h-2 bg-[#16A34A] rounded-full" aria-hidden="true" />
                            Live make-along • 234 makers
                          </div>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              {[1,2,3].map(i => (
                                <div key={i} className="w-16 h-16 rounded-xl bg-white shadow-sm overflow-hidden">
                                  <img src={`https://picsum.photos/100/100?random=${i+t.id}`} alt="" className="w-full h-full object-cover" loading="lazy" />
                                </div>
                              ))}
                              <div className="w-16 h-16 rounded-xl bg-[var(--color-foreground)] text-white flex flex-col items-center justify-center text-[10px] font-bold leading-tight">
                                <span className="text-[18px]">+12</span>
                                <span>photos</span>
                              </div>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-[var(--color-border)]">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-6 h-6 rounded-full bg-[#F5F3FF] flex items-center justify-center">
                                  <ChatCircle size={12} weight="fill" className="text-[var(--color-primary)]" aria-hidden="true" />
                                </div>
                                <span className="text-[12px] font-bold">Community tip</span>
                              </div>
                              <p className="text-[13px] leading-[1.4] text-[var(--color-muted-foreground)]">
                                "I added a stitch marker every 20 sts — game changer for this pattern!"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial slides">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={i === testimonialIndex}
                    aria-label={`Go to testimonial ${i + 1}`}
                    onClick={() => setTestimonialIndex(i)}
                    className={`transition-all duration-200 cursor-pointer rounded-full ${
                      i === testimonialIndex 
                        ? "w-8 h-2 bg-[var(--color-foreground)]" 
                        : "w-2 h-2 bg-[var(--color-border)] hover:bg-[var(--color-muted-foreground)]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Community + CTA - vibrant block */}
        <section className="block-section relative overflow-hidden">
          <div className="absolute inset-0 bg-[var(--color-foreground)]" aria-hidden="true" />
          <div className="absolute inset-0 pattern-grid opacity-10" aria-hidden="true" />
          <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-[var(--color-primary)] rounded-full blur-[80px] opacity-30" aria-hidden="true" />
          <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] bg-[var(--color-accent)] rounded-full blur-[80px] opacity-20" aria-hidden="true" />

          <div className="relative max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2">
                  <Palette size={16} weight="regular" aria-hidden="true" />
                  <span className="text-[13px] font-semibold tracking-wide uppercase">Community • 40,231 makers</span>
                </div>
                
                <h2 className="text-white leading-[0.9]">
                  Your WIP <br />
                  deserves a <br />
                  <span className="text-[var(--color-secondary)]">standing ovation.</span>
                </h2>

                <p className="text-[18px] leading-[1.5] text-white/70 max-w-[50ch]">
                  Share progress, get unstuck, and find your people. Crocheeeet isn't a feed — it's a circle. No algorithm, just humans who love yarn.
                </p>

                <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10">
                  {[
                    { value: "12.4k", label: "Patterns sold" },
                    { value: "89%", label: "Finish rate" },
                    { value: "4.9★", label: "Avg rating" }
                  ].map(s => (
                    <div key={s.label}>
                      <div className="font-display text-[36px] leading-none">{s.value}</div>
                      <div className="text-[13px] text-white/60 uppercase tracking-wide font-semibold mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="btn-primary bg-white text-[var(--color-foreground)] hover:bg-gray-100 px-8 py-4 rounded-full">
                    Join 40k makers
                    <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </button>
                  <button className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white px-8 py-4 rounded-full">
                    View gallery
                  </button>
                </div>
              </div>

              {/* Newsletter - forms & feedback: visible labels, error near field */}
              <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-2xl">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-sans font-bold text-[28px] leading-tight">Get the cozy dispatch</h3>
                    <p className="text-[15px] text-[var(--color-muted-foreground)] mt-2 leading-[1.5]">
                      One email a week. New patterns, make-alongs, and shop tips. No spam, ever. Unsubscribe anytime.
                    </p>
                  </div>

                  <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-4">
                    <div>
                      <label htmlFor={emailId} className="block text-[13px] font-semibold mb-2 uppercase tracking-wide">
                        Email address
                      </label>
                      <div className="relative">
                        <input
                          id={emailId}
                          type="email"
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError("") }}
                          placeholder="you@cozy.email"
                          aria-invalid={!!emailError}
                          aria-describedby={emailError ? `${emailId}-error` : undefined}
                          className={`w-full px-4 py-3.5 rounded-xl border bg-white text-[16px] transition-all duration-200 focus:outline-none focus:ring-4 ${
                            emailError 
                              ? "border-[var(--color-destructive)] focus:border-[var(--color-destructive)] focus:ring-[var(--color-destructive)]/10" 
                              : "border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
                          }`}
                        />
                      </div>
                      {emailError && (
                        <p id={`${emailId}-error`} role="alert" className="mt-2 text-[13px] text-[var(--color-destructive)] flex items-center gap-1.5">
                          <X size={14} weight="bold" aria-hidden="true" />
                          {emailError}
                        </p>
                      )}
                      <p className="mt-2 text-[12px] text-[var(--color-muted-foreground)]">
                        By joining, you agree to our Terms and Privacy. We use cookies for analytics.
                      </p>
                    </div>

                    <button type="submit" className="btn-primary w-full py-4 rounded-xl text-[16px] justify-center">
                      <Sparkle size={18} weight="fill" aria-hidden="true" />
                      Join the cozy club
                    </button>

                    <div className="flex items-center gap-3 pt-2 text-[12px] text-[var(--color-muted-foreground)]">
                      <div className="flex -space-x-1" aria-hidden="true">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[var(--color-muted)] flex items-center justify-center text-[10px]">🧶</div>
                        ))}
                      </div>
                      <span>Join 8,429 makers getting this weekly</span>
                    </div>
                  </form>

                  <div className="bg-[var(--color-muted)] rounded-xl p-4 flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                      <BookOpen size={18} weight="regular" aria-hidden="true" />
                    </div>
                    <div className="text-[13px] leading-[1.4]">
                      <div className="font-semibold">Free this week: The Cozy Check pattern</div>
                      <div className="text-[var(--color-muted-foreground)]">Subscribe and get a $8 pattern free. Beginner-friendly, 6h.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - semantic, accessible */}
      <footer className="bg-white border-t border-[var(--color-border)]">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="py-12 grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white font-display font-bold">c</div>
                <span className="font-display text-[24px] font-bold">crocheeeet</span>
              </div>
              <p className="text-[14px] leading-[1.5] text-[var(--color-muted-foreground)] max-w-[32ch]">
                The playful marketplace for crochet lovers. Stitch, share, shop. Extra cozy with three e's. Built for the cozy internet.
              </p>
              <div className="flex gap-2">
                {[
                  { icon: InstagramLogo, label: "Instagram" },
                  { icon: PinterestLogo, label: "Pinterest" },
                  { icon: YoutubeLogo, label: "YouTube" }
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-full bg-[var(--color-muted)] hover:bg-[var(--color-foreground)] hover:text-white flex items-center justify-center transition-colors duration-200 cursor-pointer">
                    <s.icon size={18} weight="regular" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {[
              { title: "Market", links: ["All patterns", "New releases", "Free patterns", "Gift cards"] },
              { title: "Learn", links: ["Stitch library", "Row counter", "Beginner guide", "YouTube"] },
              { title: "Company", links: ["About", "Careers", "Press", "Contact"] }
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-bold text-[14px] uppercase tracking-wide mb-4">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-[14px] text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)] transition-colors duration-200 cursor-pointer">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="py-6 border-t border-[var(--color-border)] flex flex-wrap gap-4 items-center justify-between text-[12px] text-[var(--color-muted-foreground)]">
            <div className="flex flex-wrap gap-4">
              <span>© 2026 crocheeeet, Inc.</span>
              <a href="#" className="hover:text-[var(--color-foreground)] underline underline-offset-4 cursor-pointer">Privacy</a>
              <a href="#" className="hover:text-[var(--color-foreground)] underline underline-offset-4 cursor-pointer">Terms</a>
              <a href="#" className="hover:text-[var(--color-foreground)] underline underline-offset-4 cursor-pointer">Sitemap</a>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#16A34A] rounded-full animate-pulse" aria-hidden="true" />
              <span>All systems cozy • 99.9% uptime</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCartOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 top-0 h-full w-full max-w-[420px] bg-white shadow-2xl flex flex-col animate-[slideInRight_300ms_ease]">
            <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
              <h2 className="font-sans font-bold text-[20px]">Your bag • {cart.length}</h2>
              <button onClick={() => setCartOpen(false)} aria-label="Close bag" className="w-9 h-9 rounded-full bg-[var(--color-muted)] flex items-center justify-center hover:bg-[var(--color-border)] transition-colors duration-200 cursor-pointer">
                <X size={18} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-[var(--color-muted)] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ShoppingBag size={24} className="text-[var(--color-muted-foreground)]" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold">Your bag is empty</h3>
                  <p className="text-[14px] text-[var(--color-muted-foreground)] mt-1">Add some cozy patterns</p>
                </div>
              ) : (
                cart.map(p => (
                  <div key={p.id} className="flex gap-4 p-3 rounded-xl border border-[var(--color-border)]">
                    <img src={p.image} alt="" width={64} height={64} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[14px] truncate">{p.title}</h4>
                      <p className="text-[12px] text-[var(--color-muted-foreground)]">{p.author}</p>
                      <p className="font-bold text-[14px] mt-1">${p.price}</p>
                    </div>
                    <button onClick={() => setCart(prev => prev.filter(i => i.id !== p.id))} aria-label={`Remove ${p.title} from bag`} className="w-8 h-8 rounded-full hover:bg-[var(--color-muted)] flex items-center justify-center self-start transition-colors duration-200 cursor-pointer">
                      <X size={14} aria-hidden="true" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-[var(--color-border)] space-y-4 bg-[var(--color-muted)]/30">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[var(--color-muted-foreground)]">Subtotal</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="btn-primary w-full py-4 rounded-xl justify-center">
                  Checkout • ${cartTotal.toFixed(2)}
                </button>
                <p className="text-[11px] text-center text-[var(--color-muted-foreground)]">Secure checkout • Instant download • VAT included</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
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
