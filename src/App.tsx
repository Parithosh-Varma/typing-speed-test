import { useState, useEffect, useRef, useCallback } from 'react'

const WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
  'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
  'give', 'day', 'most', 'us', 'find', 'here', 'thing', 'many',
  'those', 'tell', 'very', 'own', 'may', 'still', 'long',
  'much', 'should', 'man', 'last', 'let', 'thought', 'keep',
  'being', 'through', 'never', 'start', 'city', 'tree', 'cross', 'farm',
  'hard', 'story', 'must', 'life', 'half', 'god', 'kind', 'hand', 'high',
  'land', 'home', 'place', 'world', 'great', 'small', 'every', 'found',
  'head', 'stand', 'page', 'letter', 'meet', 'root', 'buy',
  'close', 'night', 'real', 'few', 'north', 'open', 'together',
  'next', 'white', 'children', 'begin', 'got', 'walk', 'example', 'ease',
  'paper', 'group', 'always', 'music', 'both', 'mark', 'book',
  'mile', 'river', 'car', 'feet', 'care', 'second', 'enough',
  'plain', 'girl', 'usual', 'young', 'ready', 'above', 'ever', 'red',
  'list', 'though', 'feel', 'talk', 'bird', 'soon', 'body', 'dog',
  'family', 'direct', 'pose', 'leave', 'song', 'measure', 'door',
  'product', 'black', 'short', 'numeral', 'class', 'wind', 'question',
  'happen', 'complete', 'ship', 'area', 'rock', 'order', 'fire',
  'south', 'problem', 'piece', 'told', 'knew', 'pass', 'since', 'top',
  'whole', 'king', 'space', 'heard', 'best', 'hour', 'better', 'true',
  'during', 'hundred', 'five', 'remember', 'step', 'early', 'hold',
  'west', 'ground', 'interest', 'reach', 'fast', 'verb', 'sing',
  'listen', 'six', 'table', 'travel', 'less', 'morning', 'ten', 'simple',
  'several', 'vowel', 'toward', 'war', 'lay', 'against', 'pattern',
  'slow', 'center', 'love', 'person', 'money', 'serve', 'appear',
  'road', 'map', 'rain', 'rule', 'govern', 'pull', 'cold', 'notice',
  'voice', 'energy', 'hunt', 'probable', 'bed', 'brother', 'egg',
  'ride', 'model', 'vote', 'opinion', 'street', 'wish', 'circle',
  'pair', 'inch', 'multiply', 'nothing', 'course', 'stay', 'wheel',
  'full', 'force', 'blue', 'object', 'decide', 'surface', 'deep',
  'moon', 'island', 'foot', 'system', 'busy', 'record', 'boat',
  'common', 'gold', 'possible', 'plane', 'age', 'dry', 'wonder',
  'laugh', 'thousand', 'ago', 'ran', 'check', 'game', 'shape',
  'equate', 'hot', 'miss', 'brought', 'heat', 'snow', 'tire',
  'bring', 'yes', 'distant', 'fill', 'east', 'paint', 'language',
  'among', 'grand', 'ball', 'yet', 'wave', 'drop', 'heart', 'present',
  'heavy', 'dance', 'engine', 'position', 'arm', 'wide', 'sail',
  'material', 'fraction', 'forest', 'sit', 'race', 'window', 'store',
  'summer', 'train', 'sleep', 'prove', 'lone', 'leg', 'exercise',
  'wall', 'catch', 'mount', 'sky', 'card', 'board', 'joy',
  'outside', 'deal', 'born', 'corner', 'crop', 'modern', 'unit',
  'power', 'town', 'fine', 'certain', 'fly', 'fall', 'lead', 'cry',
  'dark', 'machine', 'note', 'wait', 'plan', 'figure', 'star',
  'box', 'noun', 'field', 'rest', 'correct', 'able', 'pound', 'done',
  'beauty', 'drive', 'stood', 'contain', 'front', 'teach', 'week',
  'final', 'gave', 'green', 'oh', 'quick', 'develop', 'ocean',
  'free', 'minute', 'strong', 'special', 'mind', 'behind', 'clear',
  'tail', 'produce', 'fact', 'lot', 'seat', 'continue', 'track',
  'parent', 'hit', 'section', 'lift', 'cat', 'select', 'wrong',
  'gray', 'bit', 'face', 'elect', 'matter', 'solution', 'sheet',
  'believe', 'finger', 'universe', 'instantiate', 'type', 'program',
  'change', 'error', 'pay', 'result', 'total', 'value', 'report',
  'local', 'sound', 'function', 'return', 'component', 'render',
  'state', 'props', 'hook', 'effect', 'ref', 'context', 'memo',
  'callback', 'async', 'await', 'promise', 'array', 'string',
  'number', 'boolean', 'null', 'undefined', 'import', 'export',
  'default', 'module', 'interface', 'enum', 'const', 'let', 'var',
]

type GameState = 'idle' | 'playing' | 'finished'

interface Stats {
  wpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number
  totalChars: number
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') return 'dark'
      if (saved === 'light') return 'light'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })
  const [duration, setDuration] = useState<15 | 30 | 60>(30)
  const [gameState, setGameState] = useState<GameState>('idle')
  const [timeLeft, setTimeLeft] = useState(30)
  const [text, setText] = useState('')
  const [input, setInput] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [stats, setStats] = useState<Stats>({ wpm: 0, accuracy: 0, correctChars: 0, incorrectChars: 0, totalChars: 0 })
  const [bestScore, setBestScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('bestScore') || '0', 10)
    }
    return 0
  })

  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<number | null>(null)

  const generateText = useCallback(() => {
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 60).join(' ')
  }, [])

  useEffect(() => {
    setText(generateText())
  }, [generateText])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    if (gameState !== 'playing') return
    if (timeLeft <= 0) {
      finishGame()
      return
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft, gameState])

  // Automatically focus on mount or when clicking anywhere on the typing container
  const focusInput = () => {
    hiddenInputRef.current?.focus()
    setIsFocused(true)
  }

  useEffect(() => {
    if (gameState === 'playing') {
      focusInput()
    }
  }, [gameState])

  const finishGame = () => {
    setGameState('finished')
    const elapsed = duration - timeLeft || duration
    const correctChars = countCorrectChars()
    const totalChars = input.length
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0
    const wpm = Math.round((correctChars / 5) / (elapsed / 60))

    const newStats = {
      wpm: Math.max(0, wpm),
      accuracy,
      correctChars,
      incorrectChars: totalChars - correctChars,
      totalChars,
    }
    setStats(newStats)

    if (newStats.wpm > bestScore) {
      setBestScore(newStats.wpm)
      localStorage.setItem('bestScore', String(newStats.wpm))
    }
  }

  const countCorrectChars = () => {
    let correct = 0
    for (let i = 0; i < input.length; i++) {
      if (input[i] === text[i]) correct++
    }
    return correct
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (gameState === 'idle') {
      setGameState('playing')
      setTimeLeft(duration)
      startTimeRef.current = Date.now()
    }
    setInput(val)

    if (val.length >= text.length) {
      finishGame()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      resetGame()
    }
  }

  const resetGame = () => {
    setGameState('idle')
    setTimeLeft(duration)
    setInput('')
    setText(generateText())
    startTimeRef.current = null
    focusInput()
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Calculate live stats
  const getLiveWPM = () => {
    if (!startTimeRef.current || input.length === 0) return 0
    const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60
    const correct = countCorrectChars()
    return Math.round((correct / 5) / elapsed) || 0
  }

  const getLiveAccuracy = () => {
    if (input.length === 0) return 100
    const correct = countCorrectChars()
    return Math.round((correct / input.length) * 100)
  }

  const getPerformanceFeedback = (wpm: number) => {
    if (wpm >= 80) return 'Godly speed! You are a master typist. ⚡'
    if (wpm >= 60) return 'Incredible speed! Highly professional typist. 🔥'
    if (wpm >= 40) return 'Great job! Above average typing speed. 👍'
    return 'Good start! Practice makes perfect. Keep pushing! 🌱'
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center transition-colors duration-300" onKeyDown={handleKeyDown}>
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-border bg-card/60 backdrop-blur-md w-full">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-border shadow-sm" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">Typing Speed Test</h1>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/parithosh-varma/typing-speed-test"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-all border border-border bg-background hover:bg-muted text-foreground rounded-lg shadow-sm hover:border-muted-foreground/30"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span className="hidden sm:inline">Repo</span>
          </a>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 border border-border bg-background hover:bg-muted text-foreground rounded-lg transition-all hover:border-muted-foreground/30 shadow-sm"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4.5 h-4.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-5xl px-6 sm:px-8 py-12 sm:py-20 flex flex-col justify-center">
        {gameState !== 'finished' ? (
          <>
            {/* Header / Config Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              {/* Dynamic timer or placeholder */}
              <div className="flex items-center gap-6">
                {gameState === 'playing' ? (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary font-mono text-lg font-bold animate-pulse">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                      {timeLeft}s
                    </div>
                    <div className="flex items-center gap-4 text-sm font-mono text-muted-foreground">
                      <div>WPM: <span className="font-bold text-foreground">{getLiveWPM()}</span></div>
                      <div>Acc: <span className="font-bold text-foreground">{getLiveAccuracy()}%</span></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">Configuration</div>
                )}
              </div>

              {/* Duration Options */}
              <div className="flex items-center gap-1 bg-muted p-1 rounded-xl border border-border">
                {([15, 30, 60] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDuration(d); setTimeLeft(d); }}
                    disabled={gameState === 'playing'}
                    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                      duration === d
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground disabled:opacity-50'
                    }`}
                  >
                    {d}s
                  </button>
                ))}
              </div>
            </div>

            {/* Hidden Input field for focusing */}
            <input
              ref={hiddenInputRef}
              type="text"
              value={input}
              onChange={handleInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="absolute opacity-0 pointer-events-none"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />

            {/* Words Box */}
            <div
              onClick={focusInput}
              className={`relative border-2 rounded-2xl bg-card p-8 sm:p-12 min-h-[14rem] shadow-sm hover:shadow-md transition-all duration-300 cursor-text select-none ${
                isFocused ? 'border-primary shadow-primary/5' : 'border-border'
              }`}
            >
              {/* Overlay when unfocused */}
              {!isFocused && (
                <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px] rounded-2xl flex items-center justify-center z-10 transition-all duration-300">
                  <div className="text-center px-4 py-3 bg-card border border-border rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-primary"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M6 12h.01"/><path d="M18 12h.01"/><path d="M6 16h.01"/><path d="M10 16h4"/><path d="M18 16h.01"/></svg>
                    <span className="text-sm font-semibold tracking-tight text-foreground">Click or press any key to focus</span>
                  </div>
                </div>
              )}

              {/* Characters typing rendering */}
              <div className="font-mono text-xl sm:text-2xl lg:text-3xl leading-relaxed tracking-wide text-justify select-none break-words">
                {text.split('').map((char, index) => {
                  let charClass = 'text-muted-foreground/40' // default untyped
                  let isCurrent = index === input.length

                  if (index < input.length) {
                    charClass = input[index] === char ? 'text-foreground font-medium' : 'text-destructive bg-destructive/10 border-b-2 border-destructive'
                  }

                  return (
                    <span key={index} className="relative inline">
                      {isCurrent && isFocused && (
                        <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary animate-[pulse_1s_infinite]"></span>
                      )}
                      <span className={`${charClass} transition-colors duration-100`}>{char}</span>
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Tab restart shortcut hint */}
            <div className="flex justify-center mt-6">
              <button
                onClick={resetGame}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-muted-foreground/20 rounded-xl bg-card shadow-sm active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
                Restart Test <kbd className="px-1.5 py-0.5 text-xs font-mono bg-muted border border-border rounded shadow-sm">Tab</kbd>
              </button>
            </div>
          </>
        ) : (
          /* Finished Dashboard */
          <div className="w-full max-w-4xl border border-border rounded-3xl bg-card p-8 sm:p-12 shadow-xl animate-[fadeIn_0.4s_ease-out]">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-8 h-8"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"/><path d="M12 2a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z"/></svg>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">Test Complete!</h2>
              <p className="text-muted-foreground text-lg sm:text-xl font-medium px-4">{getPerformanceFeedback(stats.wpm)}</p>
            </div>

            {/* Performance Stats Dashboard Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="border border-border rounded-2xl bg-background/50 p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="text-5xl sm:text-6xl font-black font-mono text-primary tracking-tight">{stats.wpm}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-2 font-bold uppercase tracking-widest">WPM</div>
              </div>
              <div className="border border-border rounded-2xl bg-background/50 p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300">
                <div className="text-5xl sm:text-6xl font-black font-mono text-foreground tracking-tight">{stats.accuracy}%</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-2 font-bold uppercase tracking-widest">Accuracy</div>
              </div>
              <div className="border border-border rounded-2xl bg-background/50 p-6 text-center hover:shadow-lg hover:border-green-500/20 transition-all duration-300">
                <div className="text-5xl sm:text-6xl font-black font-mono text-green-500 tracking-tight">{stats.correctChars}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-2 font-bold uppercase tracking-widest">Correct</div>
              </div>
              <div className="border border-border rounded-2xl bg-background/50 p-6 text-center hover:shadow-lg hover:border-destructive/20 transition-all duration-300">
                <div className="text-5xl sm:text-6xl font-black font-mono text-destructive tracking-tight">{stats.incorrectChars}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-2 font-bold uppercase tracking-widest">Errors</div>
              </div>
            </div>

            {/* Personal best */}
            {bestScore > 0 && (
              <div className="flex items-center justify-center gap-3 p-5 border border-border rounded-2xl bg-muted/50 mb-10 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 text-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span className="text-base text-muted-foreground font-semibold">Personal Best:</span>
                <span className="text-2xl font-black text-primary font-mono">{bestScore} WPM</span>
              </div>
            )}

            {/* Restart Button */}
            <div className="flex justify-center">
              <button
                onClick={resetGame}
                className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold rounded-2xl bg-primary text-primary-foreground transition-all duration-200 shadow-md shadow-primary/10 hover:opacity-95 hover:shadow-lg hover:shadow-primary/20 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>
                Try Again
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full text-center py-8 border-t border-border text-sm text-muted-foreground">
        <p>Built with ❤️ by <a href="https://github.com/parithosh-varma" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Parithosh Varma</a></p>
      </footer>
    </div>
  )
}

export default App
