import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import './App.css'

const noResponses = [
  'Okay... but what if I ask nicely?',
  'That button does not mean what you think it means',
  'My heart cannot handle that answer.',
  'Let us pretend you did not click that.',
  'Error 404: No not found.',
  'Be honest... you smiled just now.'
]

const noLabels = [
  'NO',
  'Are you sure?',
  'Really sure??',
  'Last chance',
  'Wait--nope!',
  'That hurts'
]

const storyCompliments = [
  'You make everything better.',
  'I am lucky to have you.',
  'You are my favorite person.',
  'You glow from the inside out.',
  'You feel like home.'
]

const instructionLines = [
  'Tap to open',
  'Something special is inside...',
  'Open with care',
  'For you.'
]

const storyItems = [
  {
    icon: '🍝',
    title: 'Dinner',
    text: 'Good food, long talks, no rush.'
  },
  {
    icon: '✨',
    title: 'Walk under the stars',
    text: 'Just us. The night. And stolen glances.'
  },
  {
    icon: '🍰',
    title: 'Dessert + cuddles',
    text: 'Sweet things. Warm hugs.'
  }
]

const dateStops = [
  {
    id: 'photobooth',
    title: 'Photobooth',
    image: '/date-images/photobooth.png',
    lines: ['Let’s make silly faces.', 'Smile too much.', 'And keep photos we’ll never delete.']
  },
  {
    id: 'arcade',
    title: 'Arcade',
    image: '/date-images/arcade.png',
    lines: ['You vs me.', 'No mercy.', 'Winner gets a kiss.']
  },
  {
    id: 'dinner',
    title: 'Dinner',
    image: '/date-images/dinner.png',
    lines: ['Good food.', 'Long talks.', 'Just us.']
  }
]

const outfitItems = [
  { icon: '👗', text: 'Something comfy... but also dangerously cute' },
  { icon: '🧣', text: 'A soft layer I can borrow' },
  { icon: '👟', text: 'Shoes made for wandering together' },
  { icon: '💫', text: 'Bonus points if it makes you feel confident' }
]

const personalMessage =
  "Hi lalove,\nI made this simple little website just for you. Who would've thought we'd come this far? Seven months together, I'm so happy and grateful that I get to celebrate Valentine's Day with you.\n\nThese past seven months weren't always perfect. We had our ups and downs, but no matter what, we always found our way back to each other. And that's what matters most to me. We choose each other every single day, and I'd do it again and again without hesitation.\n\nSo from the moment you're reading this, I just want you to know how much you mean to me. With all my heart, I want to ask you something special...\nWill you be my Valentine?"

const questionWords = 'Will you be my Valentine?'.split(' ')

const monthsStory = [
  {
    title: 'Month 1 - The Beginning',
    text: 'This is where everything started. New feelings. Nervous smiles. And the moment I realized... this was different.',
    note: 'You made the ordinary feel electric.',
    caption: 'This is where it all started.'
  },
  {
    title: 'Month 2 - Getting Comfortable',
    text: 'We started talking more. Laughing more. Being ourselves without pretending.',
    note: 'Your laugh became my favorite sound.',
    caption: 'We felt easy together.'
  },
  {
    title: 'Month 3 - Small Moments, Big Meaning',
    text: 'It was not about big things. It was the small moments. The ones that stayed with me.',
    note: 'The little things with you feel huge.',
    caption: 'Not big moments. Just ours.'
  },
  {
    title: 'Month 4 - Becoming Us',
    text: 'Somewhere along the way, me and you became us. And that felt right.',
    note: 'Us looks really good on us.',
    caption: 'This felt like home.'
  },
  {
    title: 'Month 5 - Trust & Growth',
    text: 'We learned each other. We grew. And we chose each other every day.',
    note: 'Choosing you feels easy.',
    caption: 'Growing together felt natural.'
  },
  {
    title: 'Month 6 - Comfort & Love',
    text: 'By now, you felt like home. Safe. Comforting. Exactly where I wanted to be.',
    note: 'Home is you.',
    caption: 'By now, you felt like home.'
  },
  {
    title: 'Month 7 - Here We Are',
    text: 'Seven months with you. And I would not change a single moment. This is just the beginning.',
    note: 'Best story I have ever been in.',
    caption: 'Every photo is a moment I am grateful for.'
  }
]

const monthImages = [
  [
    { src: '/images/months/month-1/photo-1.jpg', date: 'Month 1' },
    { src: '/images/months/month-1/photo-2.jpg', date: 'Month 1' },
    { src: '/images/months/month-1/photo-3.jpg', date: 'Month 1' }
  ],
  [
    { src: '/images/months/month-2/photo-1.jpg', date: 'Month 2' },
    { src: '/images/months/month-2/photo-2.jpg', date: 'Month 2' },
    { src: '/images/months/month-2/photo-3.jpg', date: 'Month 2' }
  ],
  [
    { src: '/images/months/month-3/photo-1.jpg', date: 'Month 3' },
    { src: '/images/months/month-3/photo-2.jpg', date: 'Month 3' },
    { src: '/images/months/month-3/photo-3.jpg', date: 'Month 3' }
  ],
  [
    { src: '/images/months/month-4/photo-1.jpg', date: 'Month 4' },
    { src: '/images/months/month-4/photo-2.jpg', date: 'Month 4' },
    { src: '/images/months/month-4/photo-3.jpg', date: 'Month 4' }
  ],
  [
    { src: '/images/months/month-5/photo-1.jpg', date: 'Month 5' },
    { src: '/images/months/month-5/photo-2.jpg', date: 'Month 5' },
    { src: '/images/months/month-5/photo-3.jpg', date: 'Month 5' }
  ],
  [
    { src: '/images/months/month-6/photo-1.jpg', date: 'Month 6' },
    { src: '/images/months/month-6/photo-2.jpg', date: 'Month 6' },
    { src: '/images/months/month-6/photo-3.jpg', date: 'Month 6' }
  ],
  [
    { src: '/images/months/month-7/photo-1.jpg', date: 'Month 7' },
    { src: '/images/months/month-7/photo-2.jpg', date: 'Month 7' },
    { src: '/images/months/month-7/photo-3.jpg', date: 'Month 7' },
    { src: '/images/months/month-7/photo-4.jpg', date: 'Month 7' }
  ]
]

function App() {
  // Snoopy Mode States
  const [snoopyPhase, setSnoopyPhase] = useState(0)
  const [snoopyTypedText, setSnoopyTypedText] = useState('')
  const [snoopyBounce, setSnoopyBounce] = useState(false)
  const [snoopyPose, setSnoopyPose] = useState(0) // For random GIF changes
  const [snoopyYawn, setSnoopyYawn] = useState(false)
  const [snoopyTap, setSnoopyTap] = useState(false)
  const [showNoReactionCard, setShowNoReactionCard] = useState(false)
  const [showNoShock, setShowNoShock] = useState(false)
  const [noReactionStage, setNoReactionStage] = useState<'early' | 'mid' | 'late'>('early')
  const [lastNoResponse, setLastNoResponse] = useState<string | null>(null)
  const [pinInput, setPinInput] = useState('')
  const [pinHints, setPinHints] = useState(0)
  const [correctPin] = useState('070525')
  const [pinShake, setPinShake] = useState(false)
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [sparklePops, setSparklePops] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [heartPops, setHeartPops] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [snoopyPeekVisible, setSnoopyPeekVisible] = useState(false)
  const [outfitClicks, setOutfitClicks] = useState(0)
  const [outfitCompliment, setOutfitCompliment] = useState<string | null>(null)
  const [locationRevealed, setLocationRevealed] = useState(false)
  const [mapPinPulse, setMapPinPulse] = useState(false)
  const [_snoopySleeping, _setSnoopySleeping] = useState(false)
  const [heartbeatPulse, setHeartbeatPulse] = useState(false)
  const [snoopyDetective, setSnoopyDetective] = useState(false)
  const [stickyNotes, setStickyNotes] = useState<string[]>([])
  const [dateStep, setDateStep] = useState(0)
  const [dateIntroText, setDateIntroText] = useState('')
  const [photoboothBW, setPhotoboothBW] = useState(false)
  const [photoboothCountdown, setPhotoboothCountdown] = useState<string | null>(null)
  const [arcadeMessage, setArcadeMessage] = useState<string | null>(null)
  const [dinnerWhisper, setDinnerWhisper] = useState<string | null>(null)
  // Original States
  const [isOpen, setIsOpen] = useState(false)
  const [isAccepted, setIsAccepted] = useState(false)
  const [noCount, setNoCount] = useState(0)
  const [noResponse, setNoResponse] = useState<string | null>(null)
  const [wiggleKey, setWiggleKey] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [typedMessage, setTypedMessage] = useState('')
  const [storyCompliment, setStoryCompliment] = useState<string | null>(null)
  const [instructionIndex, setInstructionIndex] = useState(0)
  const [showWaitMessage, setShowWaitMessage] = useState(false)
  const [isHoveringCard, setIsHoveringCard] = useState(false)
  const [isOpening, setIsOpening] = useState(false)
  const [showOpenBurst, setShowOpenBurst] = useState(false)
  const [showQuestion, setShowQuestion] = useState(false)
  const [questionShakeKey, setQuestionShakeKey] = useState(0)
  const [sadPulse, setSadPulse] = useState(false)
  const [showYesPop, setShowYesPop] = useState(false)
  const [yesDissolve, setYesDissolve] = useState(false)
  const [showStoryIntro, setShowStoryIntro] = useState(false)
  const [unlockLocation, setUnlockLocation] = useState(false)
  const [storyPage, setStoryPage] = useState(0)
  const [wearTypedText, setWearTypedText] = useState('')
  const [wearShowFinal, setWearShowFinal] = useState(false)
  const [wearGlowPos, setWearGlowPos] = useState({ x: 50, y: 50 })
  const [revealStep, setRevealStep] = useState(0)
  const [showPlanText, setShowPlanText] = useState(false)
  const [snoopyNod, setSnoopyNod] = useState(false)
  const [showContinue, setShowContinue] = useState(false)
  const [isPageTransitioning, setIsPageTransitioning] = useState(false)
  const [pageDirection, setPageDirection] = useState<1 | -1>(1)
  const [heartWipeActive, setHeartWipeActive] = useState(false)
  const [revealedMonths, setRevealedMonths] = useState<boolean[]>(Array(7).fill(false))
  const [monthPhotoIndex, setMonthPhotoIndex] = useState<number[]>(Array(7).fill(0))
  const [monthPhotoLoaded, setMonthPhotoLoaded] = useState<boolean[][]>(
    monthImages.map((month) => Array(month.length).fill(false))
  )
  const [contractTypedText, setContractTypedText] = useState('')
  const [contractSigned, setContractSigned] = useState(false)
  const [showAgreementSigned, setShowAgreementSigned] = useState(false)
  const [showSnoopyCelebration, setShowSnoopyCelebration] = useState(false)
  const [showFinalThanks, setShowFinalThanks] = useState(false)
  const sparkleIdRef = useRef(0)
  const heartIdRef = useRef(0)

  const storyComplimentTimer = useRef<number | null>(null)
  const snoopyWaitTimer = useRef<number | null>(null)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const loveMeter = Math.min(100, noCount * 16)
  const yesScale = Math.min(1.25, 1 + noCount * 0.05)
  const dramaLevel = Math.min(6, noCount)
  const noScale = 1
  const yesGlow = Math.min(1, 0.35 + noCount * 0.12)
  const warmth = Math.min(0.16, noCount * 0.03)

  const currentNoLabel = useMemo(() => {
    return noLabels[Math.min(noLabels.length - 1, noCount)]
  }, [noCount])

  // Snoopy idle behaviors
  useEffect(() => {
    if (snoopyPhase === 0 || snoopyPhase === 1) {
      snoopyWaitTimer.current = window.setTimeout(() => {
        setSnoopyYawn(true)
        window.setTimeout(() => setSnoopyYawn(false), 2000)
      }, 12000)
      
      const tapTimer = window.setTimeout(() => {
        setSnoopyTap(true)
        window.setTimeout(() => setSnoopyTap(false), 1500)
      }, 8000)
      
      return () => {
        if (snoopyWaitTimer.current) window.clearTimeout(snoopyWaitTimer.current)
        window.clearTimeout(tapTimer)
      }
    }
  }, [snoopyPhase])

  useEffect(() => {
    if (snoopyPhase === 0) {
      window.setTimeout(() => {
        setSnoopyBounce(true)
        window.setTimeout(() => setSnoopyPhase(1), 600)
      }, 400)
    } else if (snoopyPhase === 1) {
      const fullText = "Hi! 👋\n\nMy friend Kevin has something important to ask you…\n\nAre you ready?"
      let index = 0
      const timer = window.setInterval(() => {
        index += 1
        setSnoopyTypedText(fullText.slice(0, index))
        if (index >= fullText.length) {
          window.clearInterval(timer)
          window.setTimeout(() => setSnoopyPhase(2), 1000)
        }
      }, 25)
      return () => window.clearInterval(timer)
    } else if (snoopyPhase === 2) {
      window.setTimeout(() => setSnoopyPhase(3), 1200)
    }
  }, [snoopyPhase])

  // Card parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const tiltX = ((y - centerY) / centerY) * 5
      const tiltY = ((centerX - x) / centerX) * 5
      setCardTilt({ x: tiltX, y: tiltY })
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    
    if (isHoveringCard && !isOpen) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    } else {
      setCardTilt({ x: 0, y: 0 })
    }
  }, [isHoveringCard, isOpen])

  // Snoopy always present
  useEffect(() => {
    if (isAccepted) {
      setSnoopyPeekVisible(true)
    }
  }, [isAccepted])

  // Detective Snoopy for PIN section
  useEffect(() => {
    if (snoopyPhase === 3) {
      setSnoopyDetective(true)
    } else {
      setSnoopyDetective(false)
    }
  }, [snoopyPhase])

  // Sticky notes for hints
  useEffect(() => {
    if (pinHints > 0 && snoopyPhase === 3) {
      const hint = getSnoopyHint(pinHints - 1)
      setStickyNotes((prev) => [...prev, hint])
    }
  }, [pinHints, snoopyPhase])

  // Heartbeat pulse for love letter
  useEffect(() => {
    if (storyPage === 4 && isAccepted) {
      setHeartbeatPulse(true)
    } else {
      setHeartbeatPulse(false)
    }
  }, [storyPage, isAccepted])

  const getSnoopyHint = (attempt: number) => {
    const hints = [
      "Hmm... close... but think about us 🤔",
      "It is a date that means a lot...\nnot a birthday though 📅",
      "The day everything changed 💫",
      "Seven months ago... remember? 🗓️",
      "It is not just numbers.\nIt is a memory. 💖",
      "You have got this! 🎉"
    ]
    return hints[Math.min(attempt, hints.length - 1)]
  }

  const handlePinInput = (digit: string) => {
    if (pinInput.length < 6) {
      const newPin = pinInput + digit
      setPinInput(newPin)

      if (newPin === correctPin) {
        window.setTimeout(() => setSnoopyPhase(4), 800)
      }
    }
  }

  const handlePinBackspace = () => {
    setPinInput(pinInput.slice(0, -1))
  }

  const handlePinWrong = () => {
    setPinShake(true)
    setPinHints((prev) => prev + 1)
    window.setTimeout(() => {
      setPinShake(false)
    }, 600)
  }

  const handleSnoopyClick = () => {
    setSnoopyPose((prev) => (prev + 1) % 3)
    createSparklePop(mousePos.x, mousePos.y)
  }

  const createSparklePop = (x: number, y: number) => {
    const id = sparkleIdRef.current++
    setSparklePops((prev) => [...prev, { id, x, y }])
    window.setTimeout(() => {
      setSparklePops((prev) => prev.filter((p) => p.id !== id))
    }, 600)
  }

  const createHeartPop = (x: number, y: number) => {
    const id = heartIdRef.current++
    setHeartPops((prev) => [...prev, { id, x, y }])
    window.setTimeout(() => {
      setHeartPops((prev) => prev.filter((p) => p.id !== id))
    }, 800)
  }

  const handleOutfitClick = (e: React.MouseEvent) => {
    setOutfitClicks((prev) => prev + 1)
    createHeartPop(e.clientX, e.clientY)
    
    if (outfitClicks >= 2) {
      const easterEggCompliments = [
        'You look amazing in everything!',
        'Seriously, you are stunning.',
        'I cannot wait to see you.',
        'You are going to take my breath away.'
      ]
      setOutfitCompliment(easterEggCompliments[Math.floor(Math.random() * easterEggCompliments.length)])
      window.setTimeout(() => setOutfitCompliment(null), 3000)
    }
  }

  const handleLocationReveal = () => {
    setLocationRevealed(true)
    setMapPinPulse(true)
    createSparklePop(window.innerWidth / 2, window.innerHeight / 2)
    setShowPlanText(true)
    setRevealStep(0)
    window.setTimeout(() => setRevealStep(1), 600)
    window.setTimeout(() => setRevealStep(2), 1400)
    window.setTimeout(() => setRevealStep(3), 2200)
    window.setTimeout(() => setSnoopyNod(true), 2800)
    window.setTimeout(() => setSnoopyNod(false), 3600)
  }

  useEffect(() => {
    if (!isAccepted) return

    if (storyComplimentTimer.current) {
      window.clearInterval(storyComplimentTimer.current)
    }

    storyComplimentTimer.current = window.setInterval(() => {
      const next = storyCompliments[Math.floor(Math.random() * storyCompliments.length)]
      setStoryCompliment(next)
      window.setTimeout(() => setStoryCompliment(null), 2800)
    }, 7000)

    return () => {
      if (storyComplimentTimer.current) window.clearInterval(storyComplimentTimer.current)
    }
  }, [isAccepted])

  useEffect(() => {
    if (isOpen) return
    const rotation = window.setInterval(() => {
      setInstructionIndex((prev) => (prev + 1) % instructionLines.length)
    }, 3800)

    return () => window.clearInterval(rotation)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) return
    setShowWaitMessage(false)
    const timer = window.setTimeout(() => setShowWaitMessage(true), 9000)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    setShowQuestion(false)
    const timer = window.setTimeout(() => setShowQuestion(true), 800)
    return () => window.clearTimeout(timer)
  }, [isOpen])

  const startLoveLetterTyping = () => {
    setTypedMessage('')
    setShowStoryIntro(false)
    window.setTimeout(() => setShowStoryIntro(true), 400)

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setTypedMessage(personalMessage.slice(0, index))
      if (index >= personalMessage.length) {
        window.clearInterval(timer)
      }
    }, 28)

    return () => window.clearInterval(timer)
  }

  useEffect(() => {
    if (!isAccepted || storyPage !== 4) return
    return startLoveLetterTyping()
  }, [isAccepted, storyPage])

  useEffect(() => {
    if (!isAccepted) return
    setShowContinue(false)
    const timer = window.setTimeout(() => setShowContinue(true), 1200)
    return () => window.clearTimeout(timer)
  }, [isAccepted, storyPage])

  useEffect(() => {
    if (storyPage !== 2) return
    setWearTypedText('')
    setWearShowFinal(false)
    const fullText = 'Wear what makes you comfortable.\n\nThat’s it.\n\nThat’s the theme.'
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setWearTypedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        window.clearInterval(timer)
        window.setTimeout(() => setWearShowFinal(true), 600)
      }
    }, 30)
    return () => window.clearInterval(timer)
  }, [storyPage])

  useEffect(() => {
    if (storyPage !== 5) return
    setContractTypedText('')
    setContractSigned(false)
    setShowAgreementSigned(false)
    setShowSnoopyCelebration(false)
    setShowFinalThanks(false)

    const fullText =
      'I, Maria Elyzah Charlize G. Brondial,\n' +
      "hereby agree to officially be Kevin’s Valentine\n" +
      'for this very special day 💖\n\n' +
      'This includes (but is not limited to):\n' +
      '• Smiling a little more than usual\n' +
      '• Sharing laughs, food, and moments\n' +
      '• Making memories worth keeping\n' +
      '• Being my favorite person for the day 😌\n\n' +
      'Signed with love and consent,\n' +
      'because this comes from the heart.'

    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setContractTypedText(fullText.slice(0, index))
      if (index >= fullText.length) {
        window.clearInterval(timer)
      }
    }, 22)

    return () => window.clearInterval(timer)
  }, [storyPage])
  useEffect(() => {
    if (storyPage !== 1) return
    setDateStep(0)
    setDateIntroText('')
    const full = "So… here's how I imagined our first Valentine’s together 💕"
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setDateIntroText(full.slice(0, index))
      if (index >= full.length) {
        window.clearInterval(timer)
      }
    }, 28)
    return () => window.clearInterval(timer)
  }, [storyPage])

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    setIsOpening(true)
    setShowOpenBurst(true)
    createSparklePop(window.innerWidth / 2, window.innerHeight / 2)
    window.setTimeout(() => setIsOpening(false), 1200)
    window.setTimeout(() => setShowOpenBurst(false), 1400)
  }

  const handleNoClick = (e: React.MouseEvent) => {
    const nextCount = noCount + 1
    setNoCount(nextCount)
    // Escalation without pressure
    const stage: 'early' | 'mid' | 'late' = nextCount <= 2 ? 'early' : nextCount <= 5 ? 'mid' : 'late'
    setNoReactionStage(stage)

    const pool = [
      'Okay… but what if I ask extra nicely? 🥺',
      "That answer just hurt Snoopy's feelings.",
      "Let's pretend that didn’t happen 😌",
      'My heart says try again.',
      'Hmm… suspicious choice.',
      'Be honest… you smiled just now.',
      "Error 404: 'No' not supported."
    ]

    let text = pool[Math.floor(Math.random() * pool.length)]
    if (lastNoResponse && pool.length > 1) {
      let guard = 0
      while (text === lastNoResponse && guard < 6) {
        text = pool[Math.floor(Math.random() * pool.length)]
        guard += 1
      }
    }
    setLastNoResponse(text)
    setNoResponse(text)
    setWiggleKey((prev) => prev + 1)
    setQuestionShakeKey((prev) => prev + 1)
    setSadPulse(true)
    createSparklePop(e.clientX, e.clientY)
    window.setTimeout(() => setSadPulse(false), 600)

    if (nextCount === 2) {
      setShowYesPop(true)
      window.setTimeout(() => setShowYesPop(false), 700)
    }

    // Reaction card (center stage)
    setShowNoReactionCard(true)
    window.setTimeout(() => {
      setShowNoReactionCard(false)
    }, 2600)

    // Snoopy shocked beat
    setShowNoShock(true)
    window.setTimeout(() => setShowNoShock(false), 1200)
  }

  const handleYesClick = (e: React.MouseEvent) => {
    if (isAccepted) return
    setYesDissolve(true)
    setIsAccepted(true)
    setShowCelebration(true)
    createHeartPop(e.clientX, e.clientY)

    confetti({
      particleCount: 160,
      spread: 72,
      origin: { y: 0.6 },
      colors: ['#E491C9', '#982598', '#F7B6D8', '#FFD1E8']
    })

    window.setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.45 },
        scalar: 1.1,
        colors: ['#E491C9', '#982598', '#F7B6D8']
      })
    }, 380)

    window.setTimeout(() => setShowCelebration(false), 2400)
    window.setTimeout(() => {
      document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
    }, 700)
    window.setTimeout(() => setUnlockLocation(true), 2200)
  }

  const handleNextPage = () => {
    if (storyPage >= 5) return
    setPageDirection(1)
    if (storyPage === 0) {
      setHeartWipeActive(true)
      window.setTimeout(() => setHeartWipeActive(false), 700)
    }
    setIsPageTransitioning(true)
    window.setTimeout(() => {
      setStoryPage((prev) => prev + 1)
      setIsPageTransitioning(false)
    }, 650)
  }

  const handlePrevPage = () => {
    if (storyPage <= 0) return
    setPageDirection(-1)
    setIsPageTransitioning(true)
    window.setTimeout(() => {
      setStoryPage((prev) => Math.max(0, prev - 1))
      setIsPageTransitioning(false)
    }, 650)
  }

  const handleMonthReveal = (index: number) => {
    setRevealedMonths((prev) => {
      const next = [...prev]
      next[index] = true
      return next
    })
  }

  const handleMonthPhotoNext = (index: number, direction: 1 | -1) => {
    setMonthPhotoIndex((prev) => {
      const next = [...prev]
      const max = monthImages[index].length
      next[index] = (next[index] + direction + max) % max
      return next
    })
  }

  const handleMonthPhotoLoad = (monthIndex: number, photoIndex: number, loaded: boolean) => {
    setMonthPhotoLoaded((prev) => {
      const next = prev.map((row) => [...row])
      next[monthIndex][photoIndex] = loaded
      return next
    })
  }

  const revealedCount = revealedMonths.filter(Boolean).length

  const pageVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction > 0 ? 120 : -120,
      scale: direction > 0 ? 0.98 : 1.02,
      opacity: 0
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1
    },
    exit: (direction: 1 | -1) => ({
      x: direction > 0 ? -120 : 120,
      scale: direction > 0 ? 1.02 : 0.98,
      opacity: 0
    })
  }

  return (
    <div
      className={`app-shell ${isAccepted ? 'accepted' : ''} ${isOpening ? 'opening' : ''} ${
        sadPulse ? 'sad' : ''
      } ${isOpen ? 'opened' : ''}`}
    >
      <div className="bg-gradient" />
      <div className="warmth-overlay" style={{ opacity: warmth }} aria-hidden="true" />
      <div className="vignette" />
      <div className="soft-grain" />
      <div className="ambient-glow" />
      <div
        className={`floating-hearts ${isOpening ? 'paused' : ''} ${isOpen ? 'slow' : ''}`}
        aria-hidden="true"
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <span key={index} style={{ '--i': index } as CSSProperties}>
            💗
          </span>
        ))}
      </div>
      <div className={`sparkle-layer ${isOpening ? 'boost' : ''}`} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} style={{ '--i': index } as CSSProperties} />
        ))}
      </div>

      {/* Floating Flower Rose Stickers */}
      <div className="floating-rose-stickers" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => (
          <img
            key={index}
            src="snoopy-gifs/Flower Rose Sticker.gif"
            alt="Rose"
            className="floating-rose"
            style={{ '--i': index } as CSSProperties}
          />
        ))}
      </div>

      {/* Sparkle Pops */}
      {sparklePops.map((pop) => (
        <div
          key={pop.id}
          className="sparkle-pop"
          style={{ left: `${pop.x}px`, top: `${pop.y}px` }}
        />
      ))}

      {/* Heart Pops */}
      {heartPops.map((pop) => (
        <div
          key={pop.id}
          className="heart-pop"
          style={{ left: `${pop.x}px`, top: `${pop.y}px` }}
        >
          💖
        </div>
      ))}

      {/* Snoopy Always Present */}
      {snoopyPeekVisible && (
        <motion.div
          className="snoopy-peek"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
        >
          <img src="snoopy-gifs/snoopy-wave.gif" alt="Snoopy" className="snoopy-peek-img" />
        </motion.div>
      )}

      <main className="stage">
        <AnimatePresence mode="wait">
          {snoopyPhase < 4 ? (
            <motion.div
              key="snoopy"
              className="snoopy-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className={`snoopy-character ${snoopyYawn ? 'snoopy-yawn' : ''} ${snoopyTap ? 'snoopy-tap' : ''}`}
                animate={
                  snoopyBounce
                    ? { y: [0, -30, 0] }
                    : snoopyYawn
                      ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }
                      : snoopyTap
                        ? { y: [0, -10, 0], x: [0, 5, -5, 0] }
                        : { y: [0, -5, 0] }
                }
                transition={
                  snoopyBounce
                    ? { duration: 0.6 }
                    : snoopyYawn || snoopyTap
                      ? { duration: 0.5 }
                      : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                }
                onClick={handleSnoopyClick}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={
                    snoopyPhase === 0 ? 'snoopy-gifs/snoopy-wave.gif'
                    : snoopyPhase === 1 ? 'snoopy-gifs/snoopy-wave.gif'
                    : snoopyPhase === 2 ? 'snoopy-gifs/snoopy-excited-bounce.gif'
                    : snoopyPhase === 3 ? 'snoopy-gifs/snoopy-detective.gif'
                    : snoopyPose === 0 ? 'snoopy-gifs/snoopy-wave.gif'
                    : snoopyPose === 1 ? 'snoopy-gifs/snoopy-happy-dance.gif'
                    : 'snoopy-gifs/snoopy-excited-bounce.gif'
                  }
                  alt="Snoopy"
                  className="snoopy-gif"
                />
              </motion.div>

              {snoopyPhase === 1 && (
                <motion.div
                  className="snoopy-bubble"
                  initial={{ opacity: 0, scale: 0.8, x: -50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <p className="snoopy-text">{snoopyTypedText}</p>
                </motion.div>
              )}

              {snoopyPhase === 2 && (
                <>
                  <motion.div className="snoopy-bubble" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><p className="snoopy-text">But before that...<br />Are you ready?</p></motion.div>
                  <motion.div className="snoopy-buttons" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <button className="snoopy-btn snoopy-yes" onClick={() => setSnoopyPhase(3)}>I'm ready! 💖</button>
                    <button className="snoopy-btn snoopy-wait" onClick={() => setSnoopyPhase(3)}>Wait… what? 😳</button>
                  </motion.div>
                </>
              )}

              {snoopyPhase === 3 && (
                <motion.div className="pin-section" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                  <motion.div className="snoopy-bubble">
                    <p className="snoopy-text">WAIT WAIT WAIT!!</p>
                    <p className="snoopy-text" style={{ fontSize: '0.95rem', marginTop: '0.6rem' }}>
                      Kevin told me to make sure you are really the right person.
                    </p>
                    <p className="snoopy-text" style={{ fontSize: '0.95rem', marginTop: '0.4rem' }}>
                      So... I need a PIN.
                    </p>
                  </motion.div>

                  <div className={`pin-card ${pinShake ? 'shake' : ''}`}>
                    <p className="pin-label">Enter the 6-digit PIN</p>
                    <p className="pin-sublabel">You will know it... I promise</p>

                    <div className="pin-hearts">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <motion.span key={index} className={`pin-heart ${pinInput.length > index ? 'filled' : ''}`} animate={pinInput.length > index ? { scale: 1.1 } : { scale: 1 }}>
                          {pinInput.length > index ? '❤️' : '🤍'}
                        </motion.span>
                      ))}
                    </div>

                    <div className="pin-keypad">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <button key={num} className="pin-key" onClick={() => handlePinInput(String(num))} disabled={pinInput.length >= 6}>{num}</button>
                      ))}
                      <button className="pin-key pin-key-zero" onClick={() => handlePinInput('0')} disabled={pinInput.length >= 6}>0</button>
                      <button className="pin-key pin-key-backspace" onClick={handlePinBackspace} disabled={pinInput.length === 0}>⌫</button>
                    </div>

                    {pinInput.length === 6 && (
                      <motion.button className={`pin-submit ${pinInput === correctPin ? 'correct' : 'incorrect'}`} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} onClick={() => { if (pinInput !== correctPin) { handlePinWrong(); setPinInput('') } }}>
                        {pinInput === correctPin ? 'UNLOCK' : 'CHECK'}
                      </motion.button>
                    )}

                    {stickyNotes.length > 0 && (
                      <div className="sticky-notes-stack">
                        <motion.div style={{ width: '100px', height: '100px', margin: '1rem auto' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <img src="snoopy-gifs/snoopy-thinking.gif" alt="Snoopy thinking hint" className="snoopy-story-gif" />
                        </motion.div>
                        {stickyNotes.map((note, idx) => (
                          <motion.div
                            key={idx}
                            className="sticky-note"
                            initial={{ opacity: 0, y: 20, rotate: -5 }}
                            animate={{ opacity: 1, y: 0, rotate: -2 + idx * 2 }}
                            style={{ zIndex: stickyNotes.length - idx }}
                          >
                            {note}
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {snoopyPhase === 4 && (
                <motion.div className="snoopy-completion" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                  <motion.div className="snoopy-character" animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}>
                    <img src="snoopy-gifs/snoopy-cheer.gif" alt="Snoopy cheering" className="snoopy-gif" />
                  </motion.div>
                  <motion.div className="snoopy-bubble" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}><p className="snoopy-text">YAY!! YOU GOT IT!!</p><p className="snoopy-text" style={{ fontSize: '0.95rem', marginTop: '0.6rem' }}>Kevin really chose the right person...</p></motion.div>
                  <motion.p className="snoopy-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Okay... now I will let him take it from here</motion.p>
                  <motion.button className="snoopy-next-btn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} onClick={() => setIsOpen(true)}>Continue with Kevin →</motion.button>
                </motion.div>
              )}
            </motion.div>
          ) : !isAccepted ? (
            <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <motion.div
                ref={cardRef}
                className={`card-shell ${isOpen ? 'open' : 'idle'} ${isHoveringCard ? 'hovered' : ''}`}
                onClick={handleOpen}
                onMouseEnter={() => setIsHoveringCard(true)}
                onMouseLeave={() => {
                  setIsHoveringCard(false)
                  setCardTilt({ x: 0, y: 0 })
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  transform: isHoveringCard && !isOpen
                    ? `perspective(1000px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`
                    : undefined
                }}
              >
                <div className="card-lid" />
                <div className="card-body">
                  <div className="card-ribbon" />
                  <div className="card-seal" />
                  <div className="inner-glow" />
                  {!isOpen && (
                    <div className="closed-message">
                      <AnimatePresence mode="wait">
                        <motion.p key={instructionIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }}>
                          {instructionLines[instructionIndex]}
                        </motion.p>
                      </AnimatePresence>
                      {showWaitMessage && <motion.span className="wait-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Do not keep it waiting...</motion.span>}
                    </div>
                  )}

                  {isOpen && (
                    <div className="card-content">
                      {showOpenBurst && (
                        <div className="open-burst" aria-hidden="true">
                          {Array.from({ length: 8 }).map((_, index) => (
                            <span key={index}>💖</span>
                          ))}
                        </div>
                      )}
                      {showQuestion && (
                        <motion.h1
                          key={questionShakeKey}
                          className={`question shimmer ${sadPulse ? 'shake' : ''}`}
                          initial={{ opacity: 0, y: 18, letterSpacing: '0.12em' }}
                          animate={{ opacity: 1, y: 0, letterSpacing: '0.02em' }}
                          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
                        >
                          <motion.span className="question-line" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
                            {questionWords.map((word) => (
                              <motion.span key={word} className="question-word" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                                {word}
                              </motion.span>
                            ))}
                          </motion.span>
                        </motion.h1>
                      )}

                      {showQuestion && (
                        <>
                      {snoopyPhase >= 4 && (
                        <motion.div
                          className="snoopy-behind-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                        >
                          <img src="snoopy-gifs/snoopy-holding-heart.gif" alt="Snoopy with heart" className="snoopy-peek-card" />
                        </motion.div>
                      )}

                      {/* NO reaction card (center stage, pops in/out) */}
                      <AnimatePresence>
                        {showNoReactionCard && noResponse && (
                          <motion.div
                            key={`no-card-${wiggleKey}`}
                            className="no-reaction-card"
                            initial={{ opacity: 0, scale: 0.8, y: 12 }}
                            animate={{ opacity: 1, scale: [1.05, 1], y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -8 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                          >
                            <p className="no-reaction-text">{noResponse}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <div className="question-buttons">
                          <motion.button
                          className={`btn yes-btn ${showYesPop ? 'pop' : ''} btn-glow-active`}
                          style={{
                            transform: `scale(${yesScale})`,
                            boxShadow: `0 0 ${24 * yesGlow}px rgba(228, 145, 201, ${yesGlow})`
                          }}
                            onClick={handleYesClick}
                          initial={{ opacity: 0, scale: 0.6, x: -40 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          transition={{ delay: 0.35, type: 'spring', stiffness: 80 }}
                          whileHover={{ scale: yesScale * 1.03 }}
                          >
                            YES 💕
                          </motion.button>

                          <motion.button
                            className={`btn no-btn drama-${dramaLevel}`}
                          style={{ transform: `scale(${noScale})` }}
                            onClick={handleNoClick}
                            key={wiggleKey}
                          initial={{ opacity: 0, scale: 0.6, x: 40 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          transition={{ delay: 0.45, type: 'spring', stiffness: 100 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          NO 😢
                          </motion.button>
                      </div>

                      {/* Snoopy shocked pop-in (visual comedy beat) */}
                      <AnimatePresence>
                        {showNoShock && (
                          <motion.div
                            className="no-shock-snoopy"
                            initial={{ opacity: 0, x: 26, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 18, y: 6, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                          >
                            <img
                              src="snoopy-gifs/snoopy-shocked.gif"
                              alt="Snoopy shocked"
                              className="no-shock-snoopy-gif"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {noCount > 0 && snoopyPhase >= 4 && (
                        <motion.div
                          className="snoopy-gasp"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          key={noCount}
                        >
                          <img src="snoopy-gifs/snoopy-shocked.gif" alt="Snoopy shocked" className="snoopy-gasp-gif" />
                        </motion.div>
                          )}

                          {noCount > 0 && (
                            <motion.div className="love-meter" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                              <div className="meter-bar">
                                <motion.div className="meter-fill" style={{ width: `${loveMeter}%` }} animate={{ width: `${loveMeter}%` }} />
                              </div>
                            </motion.div>
                          )}
                        </>
                      )}

                      {showCelebration && (
                        <>
                          <motion.div 
                            style={{ width: '200px', height: '200px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                          >
                            <img src="snoopy-gifs/snoopy-happy-dance.gif" alt="Snoopy happy dance" className="snoopy-story-gif" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                          </motion.div>
                          <div className="celebration-text" style={{ animation: 'fadeInOut 2.4s ease-in-out' }}>YAYYYY!!! 💖✨</div>
                        </>
                      )}

                      {yesDissolve && <div className="yes-dissolve" />}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      {isAccepted && (
        <section id="story" className={`story-pages page-${storyPage}`}>
          {storyPage > 0 && (
            <button className="back-button" onClick={handlePrevPage}>
              <img src="/back-button.png" alt="Back" />
            </button>
          )}
          <AnimatePresence mode="wait">
            {storyPage === 0 && (
              <motion.div
                key="seven-months"
                className="story-page seven-months-page"
                custom={pageDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
              >
                <motion.div style={{ width: '130px', height: '130px', margin: '0 auto 1rem' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <img src="snoopy-gifs/snoopy-walking.gif" alt="Snoopy walking timeline" className="snoopy-story-gif" />
                </motion.div>
                <div className="quiet-hearts">{Array.from({ length: 10 }).map((_, i) => <span key={i}>💗</span>)}</div>
                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>OUR 7 MONTHS TOGETHER</motion.h2>

                <motion.div className="months-timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  {monthsStory.map((month, index) => {
                    const photos = monthImages[index]
                    const activeIndex = monthPhotoIndex[index]
                    const isMonthEmpty = monthPhotoLoaded[index].every((loaded) => !loaded)
                    return (
                      <div key={month.title} className="month-node">
                        <button className={`month-heart ${revealedMonths[index] ? 'revealed' : ''}`} onClick={() => handleMonthReveal(index)}>💗</button>
                        <div className="month-card">
                          <strong>{month.title}</strong>
                          <p>{revealedMonths[index] ? month.text : 'Tap the heart to reveal this month.'}</p>
                          {revealedMonths[index] && <span className="hidden-note">{month.note}</span>}
                          {revealedMonths[index] && isMonthEmpty && (
                            <div className="month-empty-hint">
                              <img src="snoopy-gifs/snoopy-pointing.gif" alt="Snoopy pointing" />
                              <span>Memories go here 🐾💖</span>
                            </div>
                          )}
                          {revealedMonths[index] && (
                            <div className={`month-carousel style-${index + 1}`}>
                              <div className="carousel-stage">
                                {index === 0 && (
                                  <div className="polaroid-stack">
                                    {photos.map((photo, photoIndex) => {
                                      const loaded = monthPhotoLoaded[index][photoIndex]
                                      return (
                                        <button
                                          key={photo.src}
                                          className={`polaroid ${photoIndex === activeIndex ? 'active' : ''} ${
                                            loaded ? '' : 'placeholder'
                                          }`}
                                          onClick={() => setMonthPhotoIndex((prev) => {
                                            const next = [...prev]
                                            next[index] = photoIndex
                                            return next
                                          })}
                                        >
                                          {!loaded && (
                                            <div className="photo-placeholder">
                                              <span className="photo-placeholder-heart">♡</span>
                                              <span className="photo-placeholder-text">The beginning…</span>
                                            </div>
                                          )}
                                          <img
                                            src={photo.src}
                                            alt={`Month ${index + 1} photo ${photoIndex + 1}`}
                                            className="photo-asset"
                                            onLoad={() => handleMonthPhotoLoad(index, photoIndex, true)}
                                            onError={() => handleMonthPhotoLoad(index, photoIndex, false)}
                                            style={{ opacity: loaded ? 1 : 0 }}
                                          />
                                          <span className="polaroid-date">{photo.date}</span>
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                                {index === 1 && (
                                  <div className="memory-stack">
                                    {photos.map((photo, photoIndex) => {
                                      const loaded = monthPhotoLoaded[index][photoIndex]
                                      return (
                                        <button
                                          key={photo.src}
                                          className={`stack-card ${photoIndex === activeIndex ? 'active' : ''} ${
                                            loaded ? '' : 'placeholder'
                                          }`}
                                          style={{ zIndex: photoIndex === activeIndex ? 3 : 1 }}
                                          onClick={() => setMonthPhotoIndex((prev) => {
                                            const next = [...prev]
                                            next[index] = photoIndex
                                            return next
                                          })}
                                        >
                                          {!loaded && (
                                            <div className="photo-placeholder">
                                              <span className="photo-placeholder-heart">♡</span>
                                              <span className="photo-placeholder-text">More memories soon…</span>
                                            </div>
                                          )}
                                          <img
                                            src={photo.src}
                                            alt={`Month ${index + 1} photo ${photoIndex + 1}`}
                                            className="photo-asset"
                                            onLoad={() => handleMonthPhotoLoad(index, photoIndex, true)}
                                            onError={() => handleMonthPhotoLoad(index, photoIndex, false)}
                                            style={{ opacity: loaded ? 1 : 0 }}
                                          />
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                                {index === 2 && (
                                  <div className="film-strip">
                                    {photos.map((photo, photoIndex) => {
                                      const loaded = monthPhotoLoaded[index][photoIndex]
                                      return (
                                        <button
                                          key={photo.src}
                                          className={`film-frame ${photoIndex === activeIndex ? 'active' : ''} ${
                                            loaded ? '' : 'placeholder'
                                          }`}
                                          onClick={() => setMonthPhotoIndex((prev) => {
                                            const next = [...prev]
                                            next[index] = photoIndex
                                            return next
                                          })}
                                        >
                                          {!loaded && (
                                            <div className="photo-placeholder">
                                              <span className="photo-placeholder-heart">♡</span>
                                              <span className="photo-placeholder-text">Frame {photoIndex + 1}</span>
                                            </div>
                                          )}
                                          <img
                                            src={photo.src}
                                            alt={`Month ${index + 1} photo ${photoIndex + 1}`}
                                            className="photo-asset"
                                            onLoad={() => handleMonthPhotoLoad(index, photoIndex, true)}
                                            onError={() => handleMonthPhotoLoad(index, photoIndex, false)}
                                            style={{ opacity: loaded ? 1 : 0 }}
                                          />
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                                {index === 3 && (
                                  <div className="split-carousel">
                                    <button
                                      className={`split-photo ${monthPhotoLoaded[index][activeIndex] ? '' : 'placeholder'}`}
                                      onClick={() => setMonthPhotoIndex((prev) => {
                                        const next = [...prev]
                                        next[index] = (activeIndex + 1) % photos.length
                                        return next
                                      })}
                                    >
                                      {!monthPhotoLoaded[index][activeIndex] && (
                                        <div className="photo-placeholder">
                                          <span className="photo-placeholder-heart">♡</span>
                                          <span className="photo-placeholder-text">This felt different.</span>
                                        </div>
                                      )}
                                      <img
                                        src={photos[activeIndex].src}
                                        alt={`Month ${index + 1} photo ${activeIndex + 1}`}
                                        className="photo-asset"
                                        onLoad={() => handleMonthPhotoLoad(index, activeIndex, true)}
                                        onError={() => handleMonthPhotoLoad(index, activeIndex, false)}
                                        style={{ opacity: monthPhotoLoaded[index][activeIndex] ? 1 : 0 }}
                                      />
                                    </button>
                                    <p className="split-caption">{month.caption}</p>
                                  </div>
                                )}
                                {index === 4 && (
                                  <button
                                    className={`heart-mask ${monthPhotoLoaded[index][activeIndex] ? '' : 'placeholder'}`}
                                    onClick={() => setMonthPhotoIndex((prev) => {
                                      const next = [...prev]
                                      next[index] = (activeIndex + 1) % photos.length
                                      return next
                                    })}
                                  >
                                    {!monthPhotoLoaded[index][activeIndex] && (
                                      <div className="photo-placeholder">
                                        <span className="photo-placeholder-heart">♡</span>
                                        <span className="photo-placeholder-text">Love grows here</span>
                                      </div>
                                    )}
                                    <img
                                      src={photos[activeIndex].src}
                                      alt={`Month ${index + 1} photo ${activeIndex + 1}`}
                                      className="photo-asset"
                                      onLoad={() => handleMonthPhotoLoad(index, activeIndex, true)}
                                      onError={() => handleMonthPhotoLoad(index, activeIndex, false)}
                                      style={{ opacity: monthPhotoLoaded[index][activeIndex] ? 1 : 0 }}
                                    />
                                  </button>
                                )}
                                {index === 5 && (
                                  <button
                                    className={`fade-slide ${monthPhotoLoaded[index][activeIndex] ? '' : 'placeholder'}`}
                                    onClick={() => setMonthPhotoIndex((prev) => {
                                      const next = [...prev]
                                      next[index] = (activeIndex + 1) % photos.length
                                      return next
                                    })}
                                  >
                                    {!monthPhotoLoaded[index][activeIndex] && (
                                      <div className="photo-placeholder">
                                        <span className="photo-placeholder-heart">♡</span>
                                        <span className="photo-placeholder-text">Some moments don’t need words.</span>
                                      </div>
                                    )}
                                    <img
                                      src={photos[activeIndex].src}
                                      alt={`Month ${index + 1} photo ${activeIndex + 1}`}
                                      className="photo-asset"
                                      onLoad={() => handleMonthPhotoLoad(index, activeIndex, true)}
                                      onError={() => handleMonthPhotoLoad(index, activeIndex, false)}
                                      style={{ opacity: monthPhotoLoaded[index][activeIndex] ? 1 : 0 }}
                                    />
                                  </button>
                                )}
                                {index === 6 && (
                                  <div className="collage-grid">
                                    {photos.map((photo, photoIndex) => {
                                      const loaded = monthPhotoLoaded[index][photoIndex]
                                      return (
                                        <button
                                          key={photo.src}
                                          className={`collage-tile ${photoIndex === activeIndex ? 'active' : ''} ${
                                            loaded ? '' : 'placeholder'
                                          }`}
                                          onClick={() => setMonthPhotoIndex((prev) => {
                                            const next = [...prev]
                                            next[index] = photoIndex
                                            return next
                                          })}
                                        >
                                          {!loaded && (
                                            <div className="photo-placeholder">
                                              <span className="photo-placeholder-heart">♡</span>
                                              <span className="photo-placeholder-text">Photo here</span>
                                            </div>
                                          )}
                                          <img
                                            src={photo.src}
                                            alt={`Month ${index + 1} photo ${photoIndex + 1}`}
                                            className="photo-asset"
                                            onLoad={() => handleMonthPhotoLoad(index, photoIndex, true)}
                                            onError={() => handleMonthPhotoLoad(index, photoIndex, false)}
                                            style={{ opacity: loaded ? 1 : 0 }}
                                          />
                                        </button>
                                      )
                                    })}
                                  </div>
                                )}
                              </div>
                              <div className="carousel-controls">
                                <button onClick={() => handleMonthPhotoNext(index, -1)}>←</button>
                                <span>{activeIndex + 1}/{photos.length}</span>
                                <button onClick={() => handleMonthPhotoNext(index, 1)}>→</button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </motion.div>

                <motion.div className="relationship-meter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                  <p className="meter-label">Our Love Story</p>
                  <div className="meter-bar">
                    <motion.div className="meter-fill" animate={{ width: `${(revealedCount / 7) * 100}%` }} transition={{ duration: 0.6 }} />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {storyPage === 1 && (
              <motion.div
                key="date"
                className="story-page story-page-date date-journey"
                custom={pageDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
              >
                <div className="date-journey-bg" aria-hidden="true" />
                <div className="date-journey-hearts" aria-hidden="true">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i}>💗</span>
                  ))}
                      </div>
                <motion.h2 className="date-journey-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  Our Date
                </motion.h2>
                <p className="date-journey-intro">{dateIntroText}</p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={dateStops[dateStep].id}
                    className="date-card"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                  >
                    <div className="date-card-image">
                      <div
                        className={`date-image-frame ${dateStops[dateStep].id} ${photoboothBW ? 'bw' : ''}`}
                        onClick={() => {
                          if (dateStops[dateStep].id === 'photobooth') {
                            setPhotoboothCountdown('3…')
                            window.setTimeout(() => setPhotoboothCountdown('2…'), 500)
                            window.setTimeout(() => setPhotoboothCountdown('1…'), 1000)
                            window.setTimeout(() => setPhotoboothCountdown('📸'), 1400)
                            window.setTimeout(() => setPhotoboothCountdown(null), 1800)
                          }
                          if (dateStops[dateStep].id === 'arcade') {
                            const options = ['You win 💗', 'Rematch?']
                            setArcadeMessage(options[Math.floor(Math.random() * options.length)])
                            window.setTimeout(() => setArcadeMessage(null), 1600)
                          }
                          if (dateStops[dateStep].id === 'dinner') {
                            const options = ['Take your time.', 'This part matters.']
                            setDinnerWhisper(options[Math.floor(Math.random() * options.length)])
                            window.setTimeout(() => setDinnerWhisper(null), 1800)
                          }
                        }}
                      >
                        <img src={dateStops[dateStep].image} alt={dateStops[dateStep].title} />
                        <div className="date-image-overlay">
                          <span>Memories loading…</span>
                        </div>
                        {photoboothCountdown && dateStops[dateStep].id === 'photobooth' && (
                          <div className="photobooth-countdown">{photoboothCountdown}</div>
                        )}
                        {arcadeMessage && dateStops[dateStep].id === 'arcade' && (
                          <div className="arcade-pop">{arcadeMessage}</div>
                        )}
                        {dinnerWhisper && dateStops[dateStep].id === 'dinner' && (
                          <div className="dinner-whisper">{dinnerWhisper}</div>
                        )}
                      </div>

                      {dateStops[dateStep].id === 'photobooth' && (
                        <button className="bw-toggle" onClick={() => setPhotoboothBW((prev) => !prev)}>
                          {photoboothBW ? 'Color' : 'B&W'}
                        </button>
                      )}
                    </div>

                    <div className="date-card-content">
                      <motion.h3
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {dateStops[dateStep].title}
                      </motion.h3>
                      <motion.div
                        className="date-lines"
                        initial="hidden"
                        animate="visible"
                        variants={{
                          visible: { transition: { staggerChildren: 0.12 } }
                        }}
                      >
                        {dateStops[dateStep].lines.map((line) => (
                          <motion.p key={line} variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}>
                            {line}
                          </motion.p>
                  ))}
                </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="date-nav">
                  <button
                    className="date-nav-btn"
                    disabled={dateStep === 0}
                    onClick={() => setDateStep((prev) => Math.max(0, prev - 1))}
                  >
                    ←
                  </button>
                  <span>{dateStep + 1} / {dateStops.length}</span>
                  <button
                    className="date-nav-btn"
                    disabled={dateStep === dateStops.length - 1}
                    onClick={() => setDateStep((prev) => Math.min(dateStops.length - 1, prev + 1))}
                  >
                    →
                  </button>
                </div>

                <div className="date-snoopy">
                  <img
                    src={
                      dateStops[dateStep].id === 'arcade'
                        ? 'snoopy-gifs/snoopy-cheer.gif'
                        : dateStops[dateStep].id === 'dinner'
                          ? 'snoopy-gifs/snoopy-hug-heart.gif'
                          : 'snoopy-gifs/snoopy-holding-heart.gif'
                    }
                    alt="Snoopy reaction"
                  />
                </div>

                {dateStep === dateStops.length - 1 && (
                  <div className="date-exit-note">
                    <p>And the best part?</p>
                    <p>I get to spend it with you.</p>
                  </div>
                )}
              </motion.div>
            )}

            {storyPage === 2 && (
              <motion.div
                key="outfit"
                className="story-page story-page-outfit wear-section"
                custom={pageDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
              >
                <div className="wear-bg" aria-hidden="true" />
                <div className="wear-vignette" aria-hidden="true" />
                <div className="wear-dust" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
                <motion.p
                  className="wear-intro"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  One more thing…
                </motion.p>

                <motion.div
                  className="wear-hero"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  onMouseMove={(e) => {
                    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
                    const x = ((e.clientX - rect.left) / rect.width) * 100
                    const y = ((e.clientY - rect.top) / rect.height) * 100
                    setWearGlowPos({ x, y })
                  }}
                  onMouseLeave={() => setWearGlowPos({ x: 50, y: 50 })}
                  onClick={(e) => createHeartPop(e.clientX, e.clientY)}
                  style={{ '--x': `${wearGlowPos.x}%`, '--y': `${wearGlowPos.y}%` } as CSSProperties}
                >
                  <img src="/what-to-wear/snoopy-dress.png" alt="Snoopy in a dress" />
                </motion.div>
                <p className="wear-caption">Even Snoopy dressed up for this.</p>

                <motion.div
                  className="wear-text"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <p className="wear-type">{wearTypedText}</p>
                  {wearShowFinal && <p className="wear-final">Black 🖤</p>}
                </motion.div>
              </motion.div>
            )}

            {storyPage === 3 && (
              <motion.div
                key="location"
                className="story-page story-page-location mystery-map"
                custom={pageDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
              >
                <div className="fog-overlay" />
                <div className="map-question-layer" aria-hidden="true">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i}>{i % 2 === 0 ? '❔' : '💗'}</span>
                  ))}
                </div>

                <motion.div className={`map-snoopy-hero ${snoopyNod ? 'nod' : ''}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <img src="snoopy-gifs/snoopy-pointing.gif" alt="Snoopy pointing" />
                  <span>I know the plan… but you have to reveal it 💕</span>
                </motion.div>

                <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>Where We are Going</motion.h2>

                <motion.div className="map-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  {!locationRevealed && (
                    <motion.button
                      className="unlock-button reveal-plan-btn"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ delay: 0.6 }}
                      onMouseEnter={(e) => {
                        setSnoopyNod(true)
                        window.setTimeout(() => setSnoopyNod(false), 600)
                        createSparklePop(e.clientX - 20, e.clientY - 8)
                      }}
                      onClick={handleLocationReveal}
                    >
                      <span className="reveal-pin" aria-hidden="true">📍</span>
                      Reveal Location
                    </motion.button>
                  )}

                  {locationRevealed && (
                    <motion.div className="map-reveal-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      Okay… here’s where we’re going 💖
                    </motion.div>
                  )}
                </motion.div>

                <div className="location-cards">
                  {revealStep >= 1 && (
                    <motion.div className="location-card photobooth" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
                      <div className="location-image">
                        <img src="/where-are-we-going/photobooth-placeholder.png" alt="Photobooth placeholder" />
                        <span className="photo-flash" />
                        <span className="snoopy-peek">🐶</span>
                      </div>
                      <div className="location-info">
                        <h3>Life Four Cuts</h3>
                        <p className="location-sub">SM Legazpi</p>
                        <p>So we can keep a memory… one smile, four frames, forever ours 📸💖</p>
                      </div>
                    </motion.div>
                  )}

                  {revealStep >= 2 && (
                    <motion.div className="location-card arcade" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                      <div className="location-image">
                        <img src="/where-are-we-going/arcade-placeholder.png" alt="Arcade placeholder" />
                      </div>
                      <div className="location-info">
                        <h3>World of Fun</h3>
                        <p className="location-sub">SM Legazpi</p>
                        <p>A little competition… a lot of laughs… and maybe I’ll let you win 😉🎮</p>
                      </div>
                    </motion.div>
                  )}

                  {revealStep >= 3 && (
                    <motion.div className="location-card dinner" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <div className="location-image">
                        <img src="/where-are-we-going/dinner-placeholder.png" alt="Dinner placeholder" />
                        <span className="candle-glow" />
                      </div>
                      <div className="location-info">
                        <h3>Café Fabrika</h3>
                        <p className="location-sub">Daraga, Albay</p>
                        <p>Where everything slows down… good food, soft talks, and just us 🍝🖤</p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {revealStep >= 3 && (
                  <div className="location-final">
                    <p>Three places. One night. With you. 💖</p>
                  </div>
                )}
              </motion.div>
            )}

            {storyPage === 4 && (
              <motion.div
                key="message"
                className={`story-page story-page-letter ${heartbeatPulse ? 'heartbeat-bg' : ''}`}
                custom={pageDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
              >
                <motion.div style={{ width: '130px', height: '130px', margin: '1rem auto' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <img src="snoopy-gifs/snoopy-hug-heart.gif" alt="Snoopy hugging heart" className="snoopy-story-gif" />
                </motion.div>
                {showStoryIntro && (
                  <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    A Love Letter
                  </motion.h2>
                )}
                <motion.div
                  className="love-letter-paper"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.p
                    className="typed-message"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                  {typedMessage}
                    {typedMessage.length > 0 && typedMessage.length < personalMessage.length && (
                      <span className="typing-cursor" />
                    )}
                </motion.p>
                  {typedMessage.length === personalMessage.length && (
                    <motion.div
                      className="signature"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      — Kevin
                    </motion.div>
                  )}
                  {typedMessage.length === personalMessage.length && (
                    <motion.span
                      className="heart-stamp"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1, type: 'spring' }}
                    >
                      ❤️
                    </motion.span>
                  )}
                </motion.div>
                <motion.button
                  className="replay-letter-btn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: typedMessage.length === personalMessage.length ? 1 : 0 }}
                  onClick={() => {
                    startLoveLetterTyping()
                  }}
                >
                  🔄 Replay Letter
                </motion.button>
              </motion.div>
            )}

            {storyPage === 5 && (
              <motion.div
                key="contract"
                className="story-page contract-page"
                custom={pageDirection}
                variants={pageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6 }}
              >
                <div className="contract-bg" aria-hidden="true" />
                <div className="contract-hearts" aria-hidden="true">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <span key={i}>💗</span>
                    ))}
                  </div>

                <div className="contract-card">
                  <h2 className="contract-title">Valentine Agreement 💕</h2>
                  <p className="contract-text">{contractTypedText}</p>

                  <div className="contract-signature">
                    <p>Name:</p>
                    <span className="contract-name">Maria Elyzah Charlize G. Brondial</span>
                  </div>

                  <div className="contract-fingerprint-area">
                    <span className="contract-sign-hint">Sign here 💗</span>
                    <button
                      className={`contract-fingerprint ${contractSigned ? 'signed' : ''}`}
                      onClick={() => {
                        if (contractSigned) return
                        setContractSigned(true)
                        setShowAgreementSigned(true)
                        confetti({
                          particleCount: 140,
                          spread: 80,
                          origin: { y: 0.6 },
                          colors: ['#E491C9', '#982598', '#F7B6D8']
                        })
                        window.setTimeout(() => setShowSnoopyCelebration(true), 500)
                        window.setTimeout(() => setShowFinalThanks(true), 1800)
                      }}
                    >
                      <img src="/contract/fingerprint.png" alt="Fingerprint signature" />
                      <span className="contract-seal">
                        <img src="/contract/heart-seal.png" alt="Heart seal" />
                      </span>
                    </button>
                  </div>

                  {showAgreementSigned && <p className="agreement-signed">Agreement Signed 💖</p>}
                </div>

                {showSnoopyCelebration && (
                  <div className="contract-snoopy-pop">
                    <img src="snoopy-gifs/snoopy-happy-dance.gif" alt="Snoopy celebrating" />
                    <div className="contract-bubble">
                      <p>IT’S OFFICIAL!!! 🎉💖</p>
                      <p>Kevin is VERY happy right now 😄🐾</p>
                    </div>
                  </div>
                )}

                {showFinalThanks && (
                  <p className="contract-final-line">Thank you for choosing me.</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {showContinue && storyPage < 5 && <button className="continue-button" onClick={handleNextPage}>Continue →</button>}
          {isPageTransitioning && <div className="page-overlay" />}
          {heartWipeActive && <div className="heart-wipe" />}
        </section>
      )}

    </div>
  )
}

export default App
