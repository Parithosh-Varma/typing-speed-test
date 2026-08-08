import { useState, useEffect, useRef, useCallback } from 'react'

const WORDS = [
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
  'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
  'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
  'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
  'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see',
  'other', 'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over',
  'think', 'also', 'back', 'after', 'use', 'two', 'how', 'our', 'work',
  'first', 'well', 'way', 'even', 'new', 'want', 'because', 'any', 'these',
  'give', 'day', 'most', 'us', 'find', 'here', 'thing', 'many', 'well',
  'those', 'tell', 'one', 'very', 'her', 'own', 'may', 'still', 'long',
  'much', 'should', 'man', 'find', 'last', 'let', 'thought', 'keep',
  'being', 'through', 'never', 'start', 'city', 'tree', 'cross', 'farm',
  'hard', 'story', 'must', 'life', 'half', 'god', 'kind', 'hand', 'high',
  'land', 'home', 'place', 'world', 'great', 'small', 'every', 'found',
  'head', 'stand', 'own', 'page', 'letter', 'meet', 'root', 'buy',
  'close', 'night', 'real', 'life', 'few', 'north', 'open', 'together',
  'next', 'white', 'children', 'begin', 'got', 'walk', 'example', 'ease',
  'paper', 'group', 'always', 'music', 'those', 'both', 'mark', 'book',
  'letter', 'mile', 'river', 'car', 'feet', 'care', 'second', 'enough',
  'plain', 'girl', 'usual', 'young', 'ready', 'above', 'ever', 'red',
  'list', 'though', 'feel', 'talk', 'bird', 'soon', 'body', 'dog',
  'family', 'direct', 'pose', 'leave', 'song', 'measure', 'door',
  'product', 'black', 'short', 'numeral', 'class', 'wind', 'question',
  'happen', 'complete', 'ship', 'area', 'half', 'rock', 'order', 'fire',
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
  'wall', 'catch', 'mount', 'wish', 'sky', 'card', 'board', 'joy',
  'outside', 'deal', 'born', 'corner', 'crop', 'modern', 'pull',
  'cold', 'notice', 'unit', 'power', 'town', 'fine', 'certain',
  'fly', 'fall', 'lead', 'cry', 'dark', 'machine', 'note', 'wait',
  'plan', 'figure', 'star', 'box', 'noun', 'field', 'rest', 'correct',
  'able', 'pound', 'done', 'beauty', 'drive', 'stood', 'contain',
  'front', 'teach', 'week', 'final', 'gave', 'green', 'oh', 'quick',
  'develop', 'ocean', 'free', 'minute', 'strong', 'special', 'mind',
  'behind', 'clear', 'tail', 'produce', 'fact', 'street', 'inch',
  'nothing', 'lot', 'stay', 'seat', 'continue', 'track', 'parent',
  'hit', 'section', 'record', 'ship', 'area', 'lift', 'cat', 'select',
  'rock', 'wrong', 'gray', 'bit', 'face', 'elect', 'wish', 'matter',
  'class', 'fire', 'south', 'solution', 'sheet', 'believe', 'finger',
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
  const [stats, setStats] = useState<Stats>({ wpm: 0, accuracy: 0, correctChars: 0, incorrectChars: 0, totalChars: 0 })
  const [bestScore, setBestScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('bestScore') || '0', 10)
    }
    return 0
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<number | null>(null)

  const generateText = useCallback(() => {
    const shuffled = [...WORDS].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 50).join(' ')
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

  const startGame = () => {
    setGameState('playing')
    setTimeLeft(duration)
    setInput('')
    setText(generateText())
    startTimeRef.current = Date.now()
    setTimeout(() => inputRef.current?.focus(), 50)
  }

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
    if (gameState !== 'playing') return
    const val = e.target.value
    setInput(val)

    if (!startTimeRef.current) {
      startTimeRef.current = Date.now()
    }

    if (val.length >= text.length) {
      finishGame()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      if (gameState === 'idle' || gameState === 'finished') {
        startGame()
      }
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const progress = gameState === 'playing' ? ((duration - timeLeft) / duration) * 100 : gameState === 'finished' ? 100 : 0
  const circumference = 2 * Math.PI * 54
  const strokeDashoffset = circumference - (progress / 100) * circumference

  const words = text.split(' ')
  const typedWords = input.split(' ')

  const getWordStatus = (wordIndex: number) => {
    if (wordIndex >= typedWords.length) return 'pending'
    if (typedWords[wordIndex] === words[wordIndex]) return 'correct'
    return 'incorrect'
  }

  const getCurrentWordIndex = () => {
    const typed = input.split(' ')
    if (input.endsWith(' ') || input.length === 0) return typed.length
    return typed.length - 1
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" onKeyDown={handleKeyDown}>
      <header className="sticky top-0 z-50 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-8 h-8 rounded-full object-cover border border-border shadow-sm" />
          <h1 className="text-lg font-semibold tracking-tight">Typing Speed Test</h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/parithosh-varma/typing-speed-test"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors border border-border bg-background hover:bg-muted text-foreground rounded-md shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center w-9 h-9 border border-border bg-background hover:bg-muted text-foreground rounded-md transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            )}
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">Test Your Speed</h2>
          <p className="text-muted-foreground text-lg sm:text-xl">See how fast you can type. Press <kbd className="px-2.5 py-1 text-sm font-mono bg-muted border border-border rounded">Tab</kbd> to start.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          {([15, 30, 60] as const).map((d) => (
            <button
              key={d}
              onClick={() => { setDuration(d); if (gameState === 'idle') setTimeLeft(d) }}
              disabled={gameState === 'playing'}
              className={`px-6 py-3 text-base font-medium rounded-lg transition-all duration-200 border ${
                duration === d
                  ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25'
                  : 'bg-background text-foreground border-border hover:bg-muted hover:border-muted-foreground/20'
              } ${gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {d}s
            </button>
          ))}
          <button
            onClick={startGame}
            disabled={gameState === 'playing'}
            className={`px-8 py-3 text-base font-semibold rounded-lg transition-all duration-200 bg-primary text-primary-foreground shadow-md shadow-primary/25 ${
              gameState === 'playing' ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 active:scale-95'
            }`}
          >
            {gameState === 'finished' ? 'Restart' : 'Start'}
          </button>
        </div>

        {gameState === 'playing' && (
          <div className="flex justify-center mb-10">
            <div className="relative">
              <svg className="w-32 h-32 sm:w-40 sm:h-40 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/50"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000 ease-linear"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl sm:text-5xl font-bold font-mono text-foreground tabular-nums">{timeLeft}</span>
                <span className="text-xs sm:text-sm text-muted-foreground mt-1">seconds</span>
              </div>
            </div>
          </div>
        )}

        {gameState === 'idle' && (
          <div className="flex justify-center mb-10">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-dashed border-muted-foreground/20 flex items-center justify-center">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/40 mx-auto mb-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                <span className="text-xs text-muted-foreground/60">Press Tab</span>
              </div>
            </div>
          </div>
        )}

        <div className="border border-border rounded-2xl bg-card p-6 sm:p-8 lg:p-10 mb-10 shadow-sm">
          <div className="font-mono text-lg sm:text-xl lg:text-2xl leading-loose tracking-wide select-none min-h-[8rem]">
            {words.map((word, wordIndex) => {
              const status = getWordStatus(wordIndex)
              const isCurrent = wordIndex === getCurrentWordIndex()
              
              return (
                <span key={wordIndex} className="inline-block mr-3 mb-2">
                  {word.split('').map((char, charIndex) => {
                    const globalIndex = text.indexOf(word) + charIndex
                    let charClass = 'text-muted-foreground/60'
                    
                    if (status === 'correct') {
                      charClass = 'text-primary'
                    } else if (status === 'incorrect') {
                      charClass = 'text-destructive'
                    } else if (isCurrent && globalIndex === input.length) {
                      charClass = 'text-foreground border-b-2 border-primary animate-pulse'
                    }
                    
                    return (
                      <span key={charIndex} className={`${charClass} transition-colors duration-100`}>
                        {char}
                      </span>
                    )
                  })}
                </span>
              )
            })}
          </div>
          
          <div className="relative mt-6">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInput}
              disabled={gameState !== 'playing'}
              placeholder={gameState === 'playing' ? 'Start typing...' : 'Press Start or Tab to begin'}
              className="w-full px-6 py-4 text-lg font-mono bg-background border-2 border-input rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {gameState === 'playing' && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <span className="text-sm font-mono text-muted-foreground">
                  {input.length}/{text.length}
                </span>
              </div>
            )}
          </div>
        </div>

        {gameState === 'finished' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
            <div className="border border-border rounded-2xl bg-card p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-primary">{stats.wpm}</div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">WPM</div>
            </div>
            <div className="border border-border rounded-2xl bg-card p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-foreground"><path d="M20 6 9 17l-5-5"/></svg>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-foreground">{stats.accuracy}%</div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">Accuracy</div>
            </div>
            <div className="border border-border rounded-2xl bg-card p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-green-500"><path d="m5 12 5 5L20 7"/></svg>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-green-500">{stats.correctChars}</div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">Correct</div>
            </div>
            <div className="border border-border rounded-2xl bg-card p-6 sm:p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-destructive"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </div>
              <div className="text-4xl sm:text-5xl font-bold text-destructive">{stats.incorrectChars}</div>
              <div className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">Errors</div>
            </div>
          </div>
        )}

        {bestScore > 0 && (
          <div className="flex items-center justify-center gap-3 p-5 border border-border rounded-2xl bg-muted/50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-primary"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span className="text-base text-muted-foreground">Personal Best: </span>
            <span className="text-xl font-bold text-primary">{bestScore} WPM</span>
          </div>
        )}
      </main>

      <footer className="text-center py-8 border-t border-border text-sm text-muted-foreground">
        <p>Built by <a href="https://github.com/parithosh-varma" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Parithosh Varma</a></p>
      </footer>
    </div>
  )
}

export default App
