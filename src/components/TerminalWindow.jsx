import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, CornerDownLeft, Sparkles, Copy, Check, RotateCcw, Compass } from 'lucide-react';

const PRESET_COMMANDS = [
  { label: 'cd /skills', cmd: 'cd /skills' },
  { label: 'cd /work', cmd: 'cd /work' },
  { label: 'cd /about', cmd: 'cd /about' },
  { label: 'cd /contact', cmd: 'cd /contact' },
  { label: 'cd ~', cmd: 'cd ~' },
  { label: 'whoami', cmd: 'whoami' },
  { label: 'cat bio.json', cmd: 'cat bio.json' },
  { label: 'help', cmd: 'help' },
  { label: 'clear', cmd: 'clear' },
];

const INITIAL_HISTORY = [
  {
    type: 'input',
    text: 'dhruv-cli --init',
  },
  {
    type: 'output',
    isJson: true,
    content: {
      status: '200 OK — CLI ROUTER READY',
      developer: 'Dhruv Kalathiya',
      role: 'Full-Stack Web Developer',
      navigation_tip: 'Type "cd /skills", "cd /work", "cd /about", "cd /contact" or click the chips to navigate pages!',
      available_pages: ['/skills', '/work', '/about', '/contact', '/'],
    },
  },
];

const TerminalWindow = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(INITIAL_HISTORY);
  const [inputVal, setInputVal] = useState('');
  const [copied, setCopied] = useState(false);
  const terminalBodyRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll terminal body to bottom on new output
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleNavigation = (path, pathName) => {
    const responseObj = {
      status: '302 FOUND / REDIRECT',
      command: `cd ${path}`,
      target_page: pathName,
      message: `🚀 Navigating to ${pathName} page...`,
    };

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: `cd ${path}` },
      { type: 'output', isJson: true, content: responseObj },
    ]);
    setInputVal('');

    setTimeout(() => {
      navigate(path);
    }, 400);
  };

  const executeCommand = (cmdStr) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    if (trimmed === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    // Route Navigation Handlers
    if (trimmed === 'cd /skills' || trimmed === 'cd skills' || trimmed === 'goto skills' || trimmed === 'skills') {
      handleNavigation('/skills', 'Skills & Tech Stack');
      return;
    }

    if (trimmed === 'cd /work' || trimmed === 'cd work' || trimmed === 'goto work' || trimmed === 'work' || trimmed === 'cd /projects' || trimmed === 'projects') {
      handleNavigation('/work', 'Featured Projects');
      return;
    }

    if (trimmed === 'cd /about' || trimmed === 'cd about' || trimmed === 'goto about' || trimmed === 'about') {
      handleNavigation('/about', 'About Dhruv');
      return;
    }

    if (trimmed === 'cd /contact' || trimmed === 'cd contact' || trimmed === 'goto contact' || trimmed === 'contact') {
      handleNavigation('/contact', 'Contact & Socials');
      return;
    }

    if (trimmed === 'cd /' || trimmed === 'cd ~' || trimmed === 'cd home' || trimmed === 'goto home' || trimmed === 'home') {
      handleNavigation('/', 'Home');
      return;
    }

    let responseObj = null;

    switch (trimmed) {
      case 'whoami':
        responseObj = {
          name: 'Dhruv Kalathiya',
          title: 'Full-Stack Developer & Computer Science Student',
          university: 'LJIET (Lok Jagruti Institute of Engineering & Technology)',
          location: 'Surat, Gujarat, India',
          bio: 'Passionate about building full-stack applications with clean code, elegant UI, and robust REST backends.',
        };
        break;

      case 'cat bio.json':
        responseObj = {
          developer: 'Dhruv Kalathiya',
          focus_areas: ['Frontend UX Engineering', 'REST API Architecture', 'Database Design'],
          frontend: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'GSAP Animation', 'HTML5/CSS3'],
          backend: ['Python', 'Django REST Framework', 'Flask', 'Node.js', 'Express.js'],
          database: ['MySQL', 'PostgreSQL', 'Relational Schemas'],
        };
        break;

      case 'npm run list-stack':
        responseObj = {
          command: 'npm run list-stack',
          status: 'SUCCESS',
          packages: [
            { name: 'react', version: '^18.3.1', role: 'UI Framework' },
            { name: 'django', version: '^5.0', role: 'Python Backend' },
            { name: 'nodejs', version: 'LTS', role: 'Runtime API Environment' },
            { name: 'tailwindcss', version: '^3.4', role: 'Styling & Design System' },
            { name: 'gsap', version: '^3.12', role: 'Interactive Physics & Animations' },
          ],
        };
        break;

      case 'curl /api/contact':
        responseObj = {
          status: '200 OK',
          email: 'kalathiyadhruv74@gmail.com',
          linkedin: 'https://www.linkedin.com/in/dhruv-kalathiya-1606603a3',
          github: 'https://github.com/kalathiyadhruv74-afk',
          location: 'Surat, India (Available Remote / Worldwide)',
        };
        break;

      case 'help':
        responseObj = {
          navigation_commands: [
            { cmd: 'cd /skills', description: 'Switch to Skills page' },
            { cmd: 'cd /work', description: 'Switch to Work / Projects page' },
            { cmd: 'cd /about', description: 'Switch to About page' },
            { cmd: 'cd /contact', description: 'Switch to Contact page' },
            { cmd: 'cd ~', description: 'Return to Home page' },
          ],
          info_commands: [
            { cmd: 'whoami', description: 'Print developer identity details' },
            { cmd: 'cat bio.json', description: 'Display full profile breakdown' },
            { cmd: 'npm run list-stack', description: 'List tech stack & dependencies' },
            { cmd: 'curl /api/contact', description: 'Get contact endpoints' },
            { cmd: 'clear', description: 'Clear terminal screen' },
          ],
        };
        break;

      default:
        responseObj = {
          error: `zsh: command not found: ${trimmed}`,
          suggestion: 'Type "cd /skills", "cd /work", "cd /about", "cd /contact" or type "help".',
        };
        break;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'input', text: trimmed },
      { type: 'output', isJson: true, content: responseObj },
    ]);
    setInputVal('');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handleChipClick = (cmd) => {
    executeCommand(cmd);
  };

  const copyTerminalOutput = () => {
    const textContent = history
      .map((item) =>
        item.type === 'input'
          ? `➜ dhruv-portfolio git:(main) $ ${item.text}`
          : JSON.stringify(item.content, null, 2)
      )
      .join('\n');

    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetTerminal = () => {
    setHistory(INITIAL_HISTORY);
    setInputVal('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Quick Action & Navigation Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <span className="text-xs font-mono text-[#A1A1AA] uppercase tracking-wider mr-2 flex items-center space-x-1.5">
          <Compass className="w-3.5 h-3.5 text-[#F5F1E8]" />
          <span>CLI Router Shortcuts:</span>
        </span>
        {PRESET_COMMANDS.map((c) => (
          <button
            key={c.cmd}
            onClick={() => handleChipClick(c.cmd)}
            className={`text-xs font-mono px-3 py-1.5 rounded-md transition-all duration-200 hover:scale-105 active:scale-95 border ${
              c.cmd.startsWith('cd')
                ? 'bg-[#F5F1E8] text-[#141416] border-[#F5F1E8] font-bold hover:bg-[#EBE5D9]'
                : 'bg-[#1E1E22] hover:bg-[#26262B] border-white/15 text-[#F5F1E8]'
            }`}
            data-cursor="hover"
          >
            ${c.label}
          </button>
        ))}
      </div>

      {/* Terminal Window Container */}
      <div className="w-full rounded-xl overflow-hidden border border-white/15 bg-[#141416] shadow-2xl font-mono text-xs sm:text-sm">
        
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-[#1E1E22] border-b border-white/10 flex items-center justify-between select-none">
          
          {/* Left Traffic Light Buttons */}
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block shadow-inner cursor-pointer" onClick={() => setHistory([])} title="Clear Terminal" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block shadow-inner cursor-pointer" onClick={resetTerminal} title="Reset Terminal" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block shadow-inner" title="CLI Router Active" />
            <span className="text-xs text-[#A1A1AA] ml-2 hidden sm:inline-block">
              dhruv@surat-macbook: ~/portfolio (zsh)
            </span>
          </div>

          {/* Center Title (Mobile) */}
          <span className="text-[11px] text-[#A1A1AA] sm:hidden truncate max-w-[140px]">
            zsh — cli-router
          </span>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-3">
            <button
              onClick={resetTerminal}
              className="text-[#A1A1AA] hover:text-[#F5F1E8] transition-colors"
              title="Reset Terminal"
              data-cursor="hover"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={copyTerminalOutput}
              className="text-[#A1A1AA] hover:text-[#F5F1E8] transition-colors flex items-center space-x-1"
              title="Copy Output"
              data-cursor="hover"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400">Copied</span>
                </>
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold tracking-wider uppercase">
              ROUTER READY
            </span>
          </div>

        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          onClick={() => inputRef.current?.focus()}
          className="p-5 sm:p-6 min-h-[320px] max-h-[460px] overflow-y-auto space-y-4 text-[#F5F1E8] leading-relaxed cursor-text selection:bg-[#F5F1E8] selection:text-[#141416]"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5 animate-fadeIn">
              {item.type === 'input' ? (
                <div className="flex items-center space-x-1.5 sm:space-x-2 text-[#F5F1E8] text-[11px] sm:text-xs md:text-sm overflow-x-auto">
                  <span className="text-emerald-400 font-bold shrink-0">➜</span>
                  <span className="text-cyan-300 font-semibold shrink-0">dhruv</span>
                  <span className="text-[#A1A1AA] shrink-0 hidden sm:inline">git:(<span className="text-rose-400">main</span>)</span>
                  <span className="text-amber-300 font-bold shrink-0">$</span>
                  <span className="font-semibold text-white break-all">{item.text}</span>
                </div>
              ) : (
                <div className="pl-2 sm:pl-6 text-[#A1A1AA]">
                  {item.isJson ? (
                    <pre className="text-[11px] sm:text-xs md:text-sm font-mono overflow-x-auto p-3 rounded-md bg-[#1E1E22]/70 border border-white/10 text-emerald-300/90 whitespace-pre-wrap max-w-full">
                      {JSON.stringify(item.content, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-xs sm:text-sm">{item.content}</p>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Command Prompt Form Input Line */}
          <form onSubmit={handleFormSubmit} className="flex items-center space-x-1.5 sm:space-x-2 pt-2 text-[11px] sm:text-xs md:text-sm">
            <span className="text-emerald-400 font-bold shrink-0">➜</span>
            <span className="text-cyan-300 font-semibold shrink-0">dhruv</span>
            <span className="text-[#A1A1AA] shrink-0 hidden sm:inline">git:(<span className="text-rose-400">main</span>)</span>
            <span className="text-amber-300 font-bold shrink-0">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type 'cd /skills', 'cd /work', 'cd /about', 'cd /contact'..."
              className="flex-1 bg-transparent text-white focus:outline-none placeholder-[#A1A1AA]/40 font-mono text-xs sm:text-sm caret-[#F5F1E8]"
            />
            <button type="submit" className="text-[#A1A1AA] hover:text-white transition-colors" title="Execute Command">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Terminal Footer Info Bar */}
        <div className="px-4 py-2 bg-[#1E1E22]/80 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A1A1AA]">
          <span className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-[#F5F1E8]" />
            <span>Interactive CLI Page Router</span>
          </span>
          <span>UTF-8 | ZSH 5.9</span>
        </div>

      </div>
    </div>
  );
};

export default TerminalWindow;
