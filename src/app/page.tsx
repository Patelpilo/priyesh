'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, Download, Eye, ChevronRight, Brain, Code, Database, BarChart3, Zap, Cpu, ArrowRight, Briefcase, Target, TrendingUp, Settings, Terminal, Network, Sparkles, Layers, CircuitBoard, Bot, Binary, Menu, X } from 'lucide-react'

const skills = {
  aiML: { skills: ['Machine Learning', 'Deep Learning', 'TensorFlow', 'Keras', 'CNN', 'Transfer Learning', 'Fine-Tuning', 'Computer Vision', 'GANs', 'VAEs', 'Prompt Engineering', 'RAG Systems', 'LLM Fine-Tuning', 'GPT Models', 'LLaMA', 'BERT', 'Qwen', 'Diffusion Models', 'AI Automation', 'Bias Mitigation'], level: 95 },
  programming: { skills: ['Python', 'C', 'HTML', 'CSS', 'JavaScript'], level: 92 },
  databases: { skills: ['MySQL', 'MongoDB', 'Oracle SQL'], level: 85 },
  webDev: { skills: ['Django', 'Flask', 'API Development'], level: 88 },
  automation: { skills: ['BeautifulSoup', 'Selenium', 'Playwright', 'Web Scraping'], level: 90 },
  dataAnalytics: { skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Feature Engineering', 'Power BI'], level: 88 }
}

const projects = [
  {
    id: 1,
    title: 'RAG-Powered Chatbot System',
    description: 'Advanced Retrieval-Augmented Generation chatbot with vector embeddings, semantic search, and real-time document processing.',
    technologies: ['Python', 'LangChain', 'OpenAI GPT', 'Pinecone', 'FastAPI', 'React'],
    features: ['Vector Database Integration', 'Semantic Search', 'Multi-Document Support', 'Real-time Responses', 'Custom Context Management', 'Performance Monitoring'],
    github: 'https://github.com/priyeshbhalala/rag-chatbot',
    demo: '#',
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 2,
    title: 'AI Resume Builder & Optimizer',
    description: 'Intelligent resume building platform that uses LLMs to optimize resumes for specific job descriptions and industries.',
    technologies: ['Python', 'OpenAI API', 'Next.js', 'Prisma', 'Tailwind CSS'],
    features: ['ATS-Friendly Templates', 'Job Description Analysis', 'AI-Powered Suggestions', 'Keyword Optimization', 'Export Multiple Formats', 'Real-time Preview'],
    github: 'https://github.com/priyeshbhalala/ai-resume-builder',
    demo: '#',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 3,
    title: 'Multi-PDF Chat Assistant',
    description: 'Conversational AI assistant that can ingest multiple PDFs and answer queries across all documents with contextual awareness.',
    technologies: ['Python', 'LlamaIndex', 'Qwen', 'ChromaDB', 'Next.js', 'WebSocket'],
    features: ['Batch PDF Processing', 'Cross-Document Reasoning', 'Citation Generation', 'Context Management', 'Document Ranking', 'Interactive Chat Interface'],
    github: 'https://github.com/priyeshbhalala/multi-pdf-chat',
    demo: '#',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 4,
    title: 'Fabric Classification Using Deep Learning',
    description: 'CNN-based fabric classification system using transfer learning with MobileNetV2 for textile industry quality control.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'MobileNetV2', 'OpenCV'],
    features: ['CNN Architecture', 'Transfer Learning', 'Data Augmentation', 'Label Smoothing', 'Dropout Regularization', 'Confidence Scores'],
    github: 'https://github.com/priyeshbhalala/fabric-classification',
    demo: '#',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 5,
    title: 'Customer Segmentation for E-Commerce',
    description: 'K-Means clustering and RFM analysis solution for targeted marketing strategies and customer insights.',
    technologies: ['Python', 'Scikit-Learn', 'SQL', 'Pandas', 'NumPy'],
    features: ['K-Means Clustering', 'RFM Analysis', 'Customer Segmentation', 'Marketing Intelligence', 'Recommendation Strategy', 'Data Visualization'],
    github: 'https://github.com/priyeshbhalala/customer-segmentation',
    demo: '#',
    color: 'from-violet-500 to-purple-500'
  },
  {
    id: 6,
    title: 'Health Management Analytics Dashboard',
    description: 'Interactive healthcare analytics dashboard with KPI monitoring and advanced SQL queries for data-driven decisions.',
    technologies: ['Power BI', 'Oracle SQL', 'ETL', 'Data Modeling'],
    features: ['Interactive Dashboard', 'Advanced SQL Queries', 'KPI Monitoring', 'Healthcare Analytics', 'Data Visualization', 'Real-time Updates'],
    github: 'https://github.com/priyeshbhalala/health-dashboard',
    demo: '#',
    color: 'from-cyan-500 to-blue-500'
  }
]

const floatingIcons = [
  { icon: Brain, delay: 0, left: '8%', size: 32, top: '20%' },
  { icon: Cpu, delay: 0.5, left: '85%', size: 36, top: '25%' },
  { icon: Code, delay: 1, left: '12%', size: 28, top: '60%' },
  { icon: Database, delay: 1.5, left: '88%', size: 30, top: '55%' },
  { icon: Zap, delay: 2, left: '5%', size: 24, top: '40%' },
  { icon: BarChart3, delay: 2.5, left: '92%', size: 26, top: '35%' },
  { icon: Network, delay: 0.3, left: '20%', size: 28, top: '15%' },
  { icon: Terminal, delay: 1.2, left: '75%', size: 28, top: '70%' },
  { icon: CircuitBoard, delay: 1.8, left: '80%', size: 32, top: '20%' },
  { icon: Binary, delay: 2.2, left: '15%', size: 24, top: '75%' }
]

// Matrix rain effect component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height / fontSize
    }

    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(17, 24, 39, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = fontSize + 'px monospace'

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)]

        // Gradient colors for matrix effect
        const gradient = ctx.createLinearGradient(0, drops[i] * fontSize - 50, 0, drops[i] * fontSize)
        gradient.addColorStop(0, 'rgba(34, 197, 94, 0)')
        gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.8)')
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)')
        ctx.fillStyle = gradient

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        drops[i]++
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-20" />
}

// Circuit board pattern component
function CircuitPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const paths: Array<{ x: number; y: number; path: number[] }> = []
    const pathCount = 15

    // Generate circuit paths
    for (let i = 0; i < pathCount; i++) {
      const startX = Math.random() * canvas.width
      const startY = Math.random() * canvas.height
      const path = [startX, startY]

      let currentX = startX
      let currentY = startY

      for (let j = 0; j < 5; j++) {
        const direction = Math.random()
        if (direction < 0.5) {
          currentX += (Math.random() - 0.5) * 200
        } else {
          currentY += (Math.random() - 0.5) * 200
        }
        path.push(currentX, currentY)
      }

      paths.push({ x: startX, y: startY, path })
    }

    let animationId: number
    let time = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      paths.forEach((pathData, i) => {
        const progress = (Math.sin(time * 0.5 + i * 0.5) + 1) / 2

        // Draw path
        ctx.beginPath()
        ctx.moveTo(pathData.path[0], pathData.path[1])

        for (let j = 2; j < pathData.path.length; j += 2) {
          ctx.lineTo(pathData.path[j], pathData.path[j + 1])
        }

        const gradient = ctx.createLinearGradient(
          pathData.path[0],
          pathData.path[1],
          pathData.path[pathData.path.length - 2],
          pathData.path[pathData.path.length - 1]
        )
        gradient.addColorStop(0, `rgba(168, 85, 247, ${0.1 + progress * 0.2})`)
        gradient.addColorStop(0.5, `rgba(236, 72, 153, ${0.2 + progress * 0.3})`)
        gradient.addColorStop(1, `rgba(59, 130, 246, ${0.1 + progress * 0.2})`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw nodes at corners
        for (let j = 0; j < pathData.path.length; j += 2) {
          const nodeProgress = (Math.sin(time + j * 0.5) + 1) / 2
          const size = 3 + nodeProgress * 3

          ctx.beginPath()
          ctx.arc(pathData.path[j], pathData.path[j + 1], size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(168, 85, 247, ${0.3 + nodeProgress * 0.4})`
          ctx.fill()

          // Glow effect
          const glow = ctx.createRadialGradient(
            pathData.path[j],
            pathData.path[j + 1],
            0,
            pathData.path[j],
            pathData.path[j + 1],
            size * 3
          )
          glow.addColorStop(0, `rgba(236, 72, 153, ${0.2 + nodeProgress * 0.3})`)
          glow.addColorStop(1, 'rgba(236, 72, 153, 0)')
          ctx.beginPath()
          ctx.arc(pathData.path[j], pathData.path[j + 1], size * 3, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }
      })

      time += 0.02
      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-15" />
}

// Neural network visualization component
function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const nodes: Array<{ x: number; y: number; vx: number; vy: number; pulse: number; pulseSpeed: number }> = []
    const nodeCount = 12
    const layers = [2, 4, 4, 2] // Neural network layers

    let currentX = 0
    const layerWidth = canvas.width / (layers.length + 1)

    // Create nodes in a neural network pattern
    layers.forEach((nodeCountInLayer, layerIndex) => {
      const layerY = canvas.height / 2
      const layerHeight = canvas.height * 0.6
      const spacing = layerHeight / (nodeCountInLayer + 1)

      for (let i = 0; i < nodeCountInLayer; i++) {
        nodes.push({
          x: layerWidth * (layerIndex + 1),
          y: layerY - (layerHeight / 2) + spacing * (i + 1),
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          pulse: 0,
          pulseSpeed: 0.02 + Math.random() * 0.03
        })
      }
    })

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections between adjacent layers
      let nodeIndex = 0
      for (let l = 0; l < layers.length - 1; l++) {
        const currentLayerStart = nodeIndex
        const currentLayerEnd = nodeIndex + layers[l]
        const nextLayerStart = currentLayerEnd
        const nextLayerEnd = nextLayerStart + layers[l + 1]

        for (let i = currentLayerStart; i < currentLayerEnd; i++) {
          for (let j = nextLayerStart; j < nextLayerEnd; j++) {
            const node1 = nodes[i]
            const node2 = nodes[j]
            const distance = Math.sqrt(
              Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
            )

            // Pulse connection opacity
            const pulse = Math.sin(Date.now() * 0.001 + i + j) * 0.5 + 0.5
            const opacity = 0.05 + pulse * 0.15

            ctx.beginPath()
            ctx.moveTo(node1.x, node1.y)
            ctx.lineTo(node2.x, node2.y)
            const gradient = ctx.createLinearGradient(node1.x, node1.y, node2.x, node2.y)
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`)
            gradient.addColorStop(0.5, `rgba(236, 72, 153, ${opacity * 1.5})`)
            gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
        nodeIndex += layers[l]
      }

      // Draw and animate nodes
      nodes.forEach((node, i) => {
        // Gentle floating motion
        node.x += node.vx
        node.y += node.vy
        node.pulse += node.pulseSpeed

        // Boundary check
        const layerWidth = canvas.width / (layers.length + 1)
        const layerIndex = Math.floor(i / layers[Math.floor(i / nodeCount)])
        const minX = layerWidth * (Math.floor(i / layers[0]) + 1) - 30
        const maxX = layerWidth * (Math.floor(i / layers[0]) + 1) + 30

        if (node.x < minX || node.x > maxX) node.vx *= -1
        if (node.y < 50 || node.y > canvas.height - 50) node.vy *= -1

        // Pulsing node size
        const pulseSize = Math.sin(node.pulse) * 2 + 4

        // Draw node glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, pulseSize * 3)
        glow.addColorStop(0, `rgba(139, 92, 246, 0.3)`)
        glow.addColorStop(0.5, `rgba(236, 72, 153, 0.15)`)
        glow.addColorStop(1, 'rgba(139, 92, 246, 0)')
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize * 3, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)'
        ctx.lineWidth = 2
        ctx.stroke()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-30" />
}



// Floating particles component - client-side only to avoid hydration mismatch
function FloatingParticles({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: string; y: string; duration: number; delay: number }>>([])
  const isMountedRef = useRef(false)

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      const newParticles = Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100 + '%',
        y: Math.random() * 100 + '%',
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2
      }))

      // Set particles in next tick
      requestAnimationFrame(() => {
        setParticles(newParticles)
      })
    }
  }, [count])

  if (particles.length === 0) return null

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-purple-500/30 rounded-full"
          style={{
            left: particle.x,
            top: particle.y
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay
          }}
        />
      ))}
    </>
  )
}

// Interactive skill radar chart component
function SkillRadar({ skill, level }: { skill: string; level: number }) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (level / 100) * circumference

  return (
    <div className="relative w-28 h-28">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="8"
        />
        {/* Animated progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="50%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      {/* Skill name in center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-lg font-bold text-white"
        >
          {level}%
        </motion.span>
      </div>
    </div>
  )
}

// Typing animation component
function TypingAnimation({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [reverse, setReverse] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const updateState = () => {
      if (subIndex === words[index].length + 1 && !reverse) {
        requestAnimationFrame(() => setReverse(true))
      } else if (subIndex === 0 && reverse) {
        requestAnimationFrame(() => {
          setReverse(false)
          setIndex((prev) => (prev + 1) % words.length)
        })
      } else {
        setSubIndex((prev) => prev + (reverse ? -1 : 1))
      }
    }

    timeoutId = setTimeout(updateState, reverse ? 50 : 100)

    return () => clearTimeout(timeoutId)
  }, [subIndex, index, reverse, words])

  useEffect(() => {
    const blinkTimeout = setTimeout(() => setBlink((prev) => !prev), 500)
    return () => clearTimeout(blinkTimeout)
  }, [blink])

  return (
    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
      {`${words[index].substring(0, subIndex)}${blink ? '|' : ''}`}
    </span>
  )
}

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Construct the message
    const text = formData.message
    
    // WhatsApp URL
    const whatsappUrl = `https://wa.me/919067247116?text=${text}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.9])
  const particlesRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Particle animation
  useEffect(() => {
    const canvas = particlesRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; opacity: number }> = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`
        ctx.fill()

        // Connect particles
        particles.slice(i + 1).forEach(other => {
          const dx = particle.x - other.x
          const dy = particle.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 150)})`
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950 text-white">
      {/* Matrix Rain Effect - Bottom Layer */}
      <MatrixRain />

      {/* Circuit Board Pattern - Middle Layer */}
      <CircuitPattern />

      {/* Particle Canvas */}
      <canvas
        ref={particlesRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />

      {/* Neural Network Background - Top Layer */}
      <NeuralNetworkBackground />

      {/* Floating background gradient */}
      <motion.div
        className="fixed top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: 'spring', damping: 20 }}
      />
      <motion.div
        className="fixed bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none z-0"
        animate={{
          x: mousePosition.x * -0.02,
          y: mousePosition.y * -0.02,
        }}
        transition={{ type: 'spring', damping: 20 }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.a
            href="#about"
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Brain size={28} className="text-purple-400" />
              </motion.div>
              PB
            </div>
          </motion.a>

          {/* Desktop nav links */}
          <div className="hidden md:flex gap-1 items-center bg-white/5 rounded-full px-2 py-1 border border-white/10">
            {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group px-3 py-1.5 rounded-full hover:bg-white/10"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          {/* Hamburger button - mobile only */}
          <motion.button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
            suppressHydrationWarning
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Slide-in Drawer */}
      <motion.div
        id="mobile-nav-drawer"
        initial={{ x: '100%' }}
        animate={{ x: mobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
        className="fixed top-0 right-0 h-full w-72 z-[60] bg-gray-950/95 backdrop-blur-2xl border-l border-white/10 flex flex-col pt-6 pb-10 shadow-2xl"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 pb-6 border-b border-white/10">
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Menu
          </div>
          <motion.button
            id="mobile-menu-close"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all"
            whileTap={{ scale: 0.9 }}
            aria-label="Close menu"
            suppressHydrationWarning
          >
            <X size={20} />
          </motion.button>
        </div>
        {/* Drawer nav links */}
        <nav className="flex flex-col gap-1 px-4 mt-6">
          {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : 30 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium text-base"
            >
              <ChevronRight size={16} className="text-purple-400" />
              {item}
            </motion.a>
          ))}
        </nav>
        {/* Drawer footer social icons */}
        <div className="mt-auto px-6 pt-6 border-t border-white/10 flex gap-4">
          <a href="https://github.com/Patelpilo" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors">
            <Github size={20} className="text-gray-400 hover:text-purple-400" />
          </a>
          <a href="https://linkedin.com/in/priyesh-bhalala-60ba0330b" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors">
            <Linkedin size={20} className="text-gray-400 hover:text-purple-400" />
          </a>
          <a href="mailto:bhalalapriyesh90@gmail.com" className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors">
            <Mail size={20} className="text-gray-400 hover:text-purple-400" />
          </a>
        </div>
      </motion.div>

      {/* Mobile drawer backdrop */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Hero Section */}
      <motion.section
        id="about"
        className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Neural network background effect */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Data flow animation lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
          {[0, 1, 2].map((i) => (
            <motion.line
              key={i}
              x1="0"
              y1={`${20 + i * 30}%`}
              x2="100%"
              y2={`${50 + i * 10}%`}
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="1000"
              strokeDashoffset={1000}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
            />
          ))}
        </svg>

        <div className="max-w-5xl mx-auto text-center relative z-10 w-full">
          {/* Floating icons */}
          {floatingIcons.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                className="absolute text-purple-400/30"
                style={{ left: item.left, top: item.top }}
                initial={{ y: 0, opacity: 0, scale: 0 }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.8, 1.1, 0.8],
                  rotate: [0, 360, 0],
                }}
                transition={{
                  duration: 4 + index * 0.3,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Icon size={item.size} />
              </motion.div>
            )
          })}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/40 backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={16} className="text-purple-400" />
              </motion.span>
              <span className="text-purple-300 text-sm font-medium">AI/ML Engineer & Python Developer</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 leading-tight"
          >
            <motion.span
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Priyesh Bhalala
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg sm:text-2xl md:text-3xl text-gray-300 mb-4 sm:mb-6 font-light h-8 sm:h-10"
          >
            <TypingAnimation words={['Generative AI Enthusiast', 'Machine Learning Engineer', 'Python Developer', 'Full-Stack AI Engineer']} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2"
          >
            Building <span className="text-purple-400 font-semibold">intelligent systems</span>, <span className="text-pink-400 font-semibold">AI-powered applications</span>, and scalable software solutions with Machine Learning, Generative AI, and Python.
          </motion.p>

          {/* Tech badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {['TensorFlow', 'PyTorch', 'LangChain', 'OpenAI', 'Python', 'FastAPI'].map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-purple-500/50 hover:text-purple-400 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full px-4 sm:px-0"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-white shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 overflow-hidden"
              suppressHydrationWarning
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                <Layers size={20} />
                View Projects
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>
            <motion.a
              href="./Priyesh_Bhalala_AIML_Resume_v4.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white backdrop-blur-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
              suppressHydrationWarning
            >
              <Eye size={20} />
              View Resume
            </motion.a>
            <motion.a
              href="./Priyesh_Bhalala_AIML_Resume_v4.pdf"
              download="Priyesh_Bhalala_AIML_Resume.pdf"
              whileHover={{ scale: 1.05, borderColor: 'rgba(168, 85, 247, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white backdrop-blur-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all cursor-pointer"
              suppressHydrationWarning
            >
              <Download size={20} />
              Download Resume
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: 'rgba(236, 72, 153, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white backdrop-blur-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              suppressHydrationWarning
            >
              <Mail size={20} />
              Contact Me
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-500"
            >
              <span className="text-xs">Scroll to explore</span>
              <ChevronRight size={20} className="rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-gray-400 text-lg">My journey in AI and Machine Learning</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-start"
          >
            <div className="space-y-6">
              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm a passionate AI/ML Engineer and Python Developer pursuing my M.Sc. in Artificial Intelligence at Parul University (2024–2026). My journey in technology began with a Bachelor of Computer Applications from Marwadi University (2021–2024).
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <p className="text-gray-300 text-lg leading-relaxed">
                  With hands-on experience in Machine Learning, Deep Learning, Computer Vision, and Generative AI, I specialize in developing intelligent systems using TensorFlow, Transformers, and modern AI frameworks.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I'm deeply passionate about Large Language Models, RAG systems, AI Automation, and building full-stack AI applications that solve real-world problems. My goal is to leverage cutting-edge AI technologies to create impactful solutions.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl border border-purple-500/20">
                <div className="flex items-center gap-4 mb-3">
                  <Brain className="text-purple-400" size={28} />
                  <h3 className="text-xl font-semibold">AI & Machine Learning</h3>
                </div>
                <p className="text-gray-400">Deep Learning, Computer Vision, CNN, Transfer Learning, Fine-Tuning</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-xl border border-pink-500/20">
                <div className="flex items-center gap-4 mb-3">
                  <Cpu className="text-pink-400" size={28} />
                  <h3 className="text-xl font-semibold">Generative AI</h3>
                </div>
                <p className="text-gray-400">LLMs, RAG Systems, Prompt Engineering, GPT, LLaMA, BERT</p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent backdrop-blur-xl border border-blue-500/20">
                <div className="flex items-center gap-4 mb-3">
                  <Zap className="text-blue-400" size={28} />
                  <h3 className="text-xl font-semibold">Automation & Development</h3>
                </div>
                <p className="text-gray-400">Python, Web Scraping, Data Analytics, Full-Stack AI Applications</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
              <Sparkles size={16} className="text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Expertise</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-gray-400 text-lg">Technologies and tools I work with</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {Object.entries({
              'AI & ML': { icon: Brain, data: skills.aiML, gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/30', accent: 'bg-purple-500' },
              'Programming': { icon: Code, data: skills.programming, gradient: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/30', accent: 'bg-orange-500' },
              'Databases': { icon: Database, data: skills.databases, gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/30', accent: 'bg-green-500' },
              'Web Dev': { icon: Zap, data: skills.webDev, gradient: 'from-violet-500/20 to-purple-500/20', border: 'border-violet-500/30', accent: 'bg-violet-500' },
              'Automation': { icon: Terminal, data: skills.automation, gradient: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/30', accent: 'bg-yellow-500' },
              'Data Analytics': { icon: BarChart3, data: skills.dataAnalytics, gradient: 'from-blue-500/20 to-indigo-500/20', border: 'border-blue-500/30', accent: 'bg-blue-500' }
            }).map(([title, data], index) => {
              const Icon = data.icon as any
              return (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
                  className="p-6 rounded-2xl bg-gradient-to-br ${data.gradient} backdrop-blur-xl border ${data.border} transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="p-3 rounded-xl bg-gradient-to-br ${data.gradient} border ${data.border}"
                      >
                        <Icon className="text-purple-400" size={24} />
                      </motion.div>
                      <h3 className="text-lg font-semibold">{title}</h3>
                    </div>
                    <div className="relative">
                      <SkillRadar skill={title} level={data.data.level} />
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${data.data.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      className={`h-2 rounded-full ${data.accent} relative overflow-hidden`}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/30"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {data.data.skills.map((skill: string, skillIndex: number) => (
                      <motion.span
                        key={skill}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 + (skillIndex * 0.05) }}
                        className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300 hover:bg-white/20 transition-all cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
              <Briefcase size={16} className="text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Career Journey</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Experience
            </h2>
            <p className="text-gray-400 text-lg">Building solutions that drive innovation</p>
          </motion.div>

          <div className="relative">
            {/* Animated Timeline Line */}
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 origin-top"
            />

            {/* Experience Item */}
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative pl-8 md:pl-0 md:pr-1/2 md:text-right mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
                className="absolute left-[-5px] md:left-1/2 md:transform md:-translate-x-1/2 w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-4 border-gray-950 shadow-lg shadow-purple-500/50 z-10"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 ml-4 md:ml-0 md:mr-8 group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-medium mb-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                      </span>
                      January 2024 – December 2024
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Python Developer</h3>
                    <div className="text-pink-400 font-medium text-lg">Innovativecode IT Solutions</div>
                  </div>
                  <div className="hidden md:flex">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                      <Briefcase size={32} className="text-purple-400" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/20 flex-shrink-0">
                      <Target size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">Web Scraping Solutions</div>
                      <div className="text-xs text-gray-400">Built advanced scrapers using BeautifulSoup and Playwright</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-pink-500/20 flex-shrink-0">
                      <TrendingUp size={18} className="text-pink-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">Automation Excellence</div>
                      <div className="text-xs text-gray-400">Automated large-scale data collection workflows</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-purple-500/20 flex-shrink-0">
                      <Settings size={18} className="text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">Performance Optimization</div>
                      <div className="text-xs text-gray-400">Enhanced scraper reliability and efficiency</div>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all duration-300"
                  >
                    <div className="p-2 rounded-lg bg-pink-500/20 flex-shrink-0">
                      <Cpu size={18} className="text-pink-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">Production Deployment</div>
                      <div className="text-xs text-gray-400">Deployed and debugged production systems</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 sm:mt-12"
          >
            {[
              { icon: Code, label: 'Projects', value: '10+' },
              { icon: Database, label: 'Data Sources', value: '50+' },
              { icon: TrendingUp, label: 'Efficiency', value: '85%' },
              { icon: Briefcase, label: 'Months Exp', value: '12' }
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-purple-500/30 text-center transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 mb-3">
                    <Icon size={24} className="text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingParticles count={20} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
              <Bot size={16} className="text-purple-400" />
              <span className="text-purple-400 text-sm font-medium">Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg">AI-powered applications and solutions</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {projects.map((project, index) => {
              const projectIcons: any = {
                0: Brain,
                1: Bot,
                2: Network,
                3: Cpu,
                4: BarChart3,
                5: Database
              }
              const ProjectIcon = projectIcons[index as keyof typeof projectIcons] || Brain
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: 'spring' }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03, 
                    boxShadow: '0 20px 40px rgba(168, 85, 247, 0.3)',
                    transition: { duration: 0.3 }
                  }}
                  className="group rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden transition-all duration-300"
                >
                  {/* Project Image/Gradient with animation */}
                  <div className={`h-56 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    {/* Animated overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="p-8 rounded-3xl bg-black/40 backdrop-blur-md border border-white/20 relative"
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          <ProjectIcon size={56} className="text-white" />
                        </motion.div>
                        {/* Glowing effect */}
                        <div className="absolute inset-0 blur-2xl bg-purple-500/50 rounded-3xl opacity-50" />
                      </motion.div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    {/* Badge */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                      className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-xs font-medium text-white"
                    >
                      {index < 3 ? 'Featured' : 'Project'}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    {/* Glowing border effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: `linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))`,
                        filter: 'blur(20px)'
                      }}
                    />
                    
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors relative z-10">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed relative z-10">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                      {project.technologies.slice(0, 4).map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          className="px-3 py-1 bg-purple-500/20 rounded-lg text-xs text-purple-300 border border-purple-500/20 hover:border-purple-500/50 transition-colors"
                        >
                          {tech}
                        </motion.span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-white/10 rounded-lg text-xs text-gray-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Key Features with animated icons */}
                    <div className="space-y-2 mb-6 relative z-10">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <motion.div
                          key={feature}
                          initial={{ x: -20, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                          className="flex items-center gap-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
                        >
                          <motion.div
                            whileHover={{ x: 3 }}
                            className="flex items-center gap-2"
                          >
                            <ChevronRight size={12} className="text-purple-400 flex-shrink-0" />
                            <span className="truncate">{feature}</span>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Education
            </h2>
            <p className="text-gray-400 text-lg">Academic background and qualifications</p>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ x: 8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold">M.Sc. Artificial Intelligence</h3>
                <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-400 text-sm font-medium">
                  2024 – 2026
                </span>
              </div>
              <div className="text-pink-400 font-medium mb-3">Parul University</div>
              <p className="text-gray-400">
                Specializing in advanced Machine Learning, Deep Learning, Computer Vision, and Generative AI. Focusing on cutting-edge AI research and practical implementations.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ x: 8 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-xl border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <h3 className="text-2xl font-bold">Bachelor of Computer Applications</h3>
                <span className="px-4 py-2 bg-pink-500/20 rounded-full text-pink-400 text-sm font-medium">
                  2021 – 2024
                </span>
              </div>
              <div className="text-pink-400 font-medium mb-3">Marwadi University</div>
              <p className="text-gray-400">
                Built strong foundation in computer science, programming, software development, and algorithms. Developed expertise in Python and web technologies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-lg">Let's connect and build something amazing together</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <motion.a
                href="mailto:bhalalapriyesh90@gmail.com"
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Mail className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Email</div>
                  <div className="text-white group-hover:text-purple-400 transition-colors">bhalalapriyesh90@gmail.com</div>
                </div>
              </motion.a>

              <motion.a
                href="https://linkedin.com/in/priyesh-bhalala-60ba0330b"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Linkedin className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">LinkedIn</div>
                  <div className="text-white group-hover:text-purple-400 transition-colors">linkedin.com/in/priyesh-bhalala-60ba0330b</div>
                </div>
              </motion.a>

              <motion.a
                href="https://github.com/Patelpilo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Github className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">GitHub</div>
                  <div className="text-white group-hover:text-purple-400 transition-colors">github.com/Patelpilo</div>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ x: 8 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <Mail className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Location</div>
                  <div className="text-white">India</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
            >
              <form className="space-y-6" onSubmit={handleContactSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="your@email.com"
                    suppressHydrationWarning
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Your message..."
                    suppressHydrationWarning
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                  suppressHydrationWarning
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 sm:py-12 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <motion.div
                className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                Priyesh Bhalala
              </motion.div>
            </div>

            <div className="text-gray-400 text-sm">
              © 2026 Priyesh Bhalala. Building the future with AI.
            </div>

            <div className="flex gap-4">
              <motion.a
                href="https://github.com/Patelpilo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors"
              >
                <Github size={20} className="text-gray-400 hover:text-purple-400" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/priyesh-bhalala-60ba0330b"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors"
              >
                <Linkedin size={20} className="text-gray-400 hover:text-purple-400" />
              </motion.a>
              <motion.a
                href="mailto:bhalalapriyesh90@gmail.com"
                whileHover={{ scale: 1.1, y: -2 }}
                className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-colors"
              >
                <Mail size={20} className="text-gray-400 hover:text-purple-400" />
              </motion.a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}