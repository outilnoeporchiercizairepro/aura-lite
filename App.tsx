
import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Activity, 
  Command,
  Database,
  Workflow,
  Sparkles,
  Brain,
  Bot,
  Terminal,
  MessageSquare,
  Network,
  GitBranch,
  Search,
  Mail,
  Slack,
  Globe,
  Code2
} from 'lucide-react';

// --- Shared & Visual System Components ---

const GrainOverlay: React.FC = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.06]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const GlowBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none -z-10 bg-[#05060a]">
    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/15 blur-[120px] rounded-full opacity-60" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full opacity-40" />
    <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-blue-900/10 blur-[100px] rounded-full opacity-30" />
  </div>
);

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 shadow-2xl" />
    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
    <div className="relative z-10 p-8">
      {children}
    </div>
  </div>
);

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="text-center mb-16 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        className="text-gray-400 text-xl max-w-2xl mx-auto font-light leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const HeroVideo: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 my-8 relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-transparent to-purple-500/20 rounded-2xl blur-sm opacity-50" />
      <div className="relative aspect-video rounded-xl overflow-hidden border border-white/20 bg-black shadow-[0_0_100px_rgba(79,70,229,0.3)]">
        <iframe
          className="absolute inset-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Aura Lite - Agents IA & n8n"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

// --- Animations ---

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const arcScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const arcOpacity = useTransform(scrollYProgress, [0, 0.4], [0.7, 0.1]);

  return (
    <div className="relative min-h-screen selection:bg-indigo-500/40 text-white selection:text-white overflow-x-hidden">
      <GrainOverlay />
      <GlowBackground />

      {/* Navigation */}
      <nav className="fixed top-4 md:top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4">
        <div className="bg-[#0a0c14]/40 backdrop-blur-2xl border border-white/10 px-4 md:px-8 py-2 md:py-3 rounded-full flex items-center gap-4 md:gap-10 shadow-2xl">
          <div className="flex items-center">
            <img src="/lite.png" alt="Aura Lite" className="h-10 md:h-14 w-auto object-contain" />
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
            <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="#agents" className="hover:text-white transition-colors">Agents</a>
            <a href="#pricing" className="hover:text-white transition-colors">Tarif</a>
          </div>
          <button className="hidden md:block text-xs font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-1.5 rounded-full transition-all">
            Dashboard
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 md:pt-44 pb-20 flex flex-col items-center justify-start min-h-[90vh]">
        <motion.div 
          style={{ scale: arcScale, opacity: arcOpacity }}
          className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[150%] aspect-[2/1] bg-[radial-gradient(ellipse_at_center,_rgba(79,70,229,0.3)_0%,_transparent_75%)] rounded-[100%] pointer-events-none -z-10"
        />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-black tracking-[0.5em] uppercase shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                ORCHESTRATION D'AGENTS IA
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 max-w-5xl leading-[0.95]">
              Construis et livre des automatisations n8n exploitables, <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40">avec une vraie compréhension de l'IA.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-gray-400 text-base md:text-lg max-w-2xl mb-10 font-light leading-relaxed opacity-80">
              Aura Lite donne les bases opérationnelles en automatisation et agents IA pour passer à l'action, créer de la valeur et préparer une montée en échelle structurée.
            </motion.p>

            <HeroVideo />

            <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { icon: <Bot size={14} />, label: "Agentisation" },
                { icon: <Brain size={14} />, label: "Raisonnement IA" },
                { icon: <Terminal size={14} />, label: "Tool-Calling" },
                { icon: <Layers size={14} />, label: "Multi-Agents" },
              ].map((token, idx) => (
                <div key={idx} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-gray-300 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  <span className="text-indigo-500">{token.icon}</span>
                  <span>{token.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 items-center">
              <motion.button 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group overflow-hidden px-10 py-5 rounded-xl bg-indigo-600 text-white font-bold transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative flex items-center gap-3 text-lg">
                  Commencer avec Aura Lite <ArrowRight size={20} />
                </span>
              </motion.button>
              <button 
                onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 rounded-xl bg-white/[0.02] border border-white/10 text-white font-bold transition-all hover:bg-white/[0.06] hover:border-white/20 text-lg backdrop-blur-xl"
              >
                Voir le programme
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NEW: Blueprint Section - Visualizing the Engine */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="relative rounded-[40px] border border-white/10 bg-[#080910] p-10 md:p-20 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.15),_transparent_70%)] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <GitBranch className="text-indigo-400" />, title: "Orchestration", desc: "Logique de décision" },
                  { icon: <Database className="text-purple-400" />, title: "Mémoire", desc: "Context Stores RAG" },
                  { icon: <Terminal className="text-cyan-400" />, title: "Tools", desc: "APIs & Functions" },
                  { icon: <Network className="text-blue-400" />, title: "Systèmes", desc: "Flux Multi-Agents" }
                ].map((blueprint, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm group hover:border-indigo-500/30 transition-all">
                    <div className="mb-4">{blueprint.icon}</div>
                    <h4 className="text-white font-bold text-sm mb-1">{blueprint.title}</h4>
                    <p className="text-gray-500 text-xs">{blueprint.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-indigo-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">ARCHITECTURE TECHNIQUE</span>
              <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">Le moteur de <br /> l'Agent Intelligent.</h3>
              <p className="text-gray-400 text-lg leading-relaxed font-light mb-8">
                Contrairement aux workflows classiques, un agent Aura Lite est conçu comme une entité capable de <strong>percevoir son environnement</strong>, de planifier et d'agir via des outils tiers connectés sur n8n.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-[#080910] bg-indigo-600 flex items-center justify-center text-[10px] font-bold">
                      {i === 4 ? <Plus size={12} /> : `M${i}`}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 font-medium">Structure modulaire éprouvée</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Agentic Toolbox Grid - Visualizing Tools */}
      <section id="agents" className="py-24 container mx-auto px-4 max-w-7xl">
        <SectionHeader title="La Toolbox de l'Agent." subtitle="Quels outils vos agents peuvent-ils manipuler ?" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { icon: <Search />, label: "Google Search", color: "from-blue-500" },
            { icon: <Slack />, label: "Slack", color: "from-purple-500" },
            { icon: <Mail />, label: "Gmail", color: "from-red-500" },
            { icon: <Globe />, label: "Web Browsing", color: "from-emerald-500" },
            { icon: <Database />, label: "PostgreSQL", color: "from-indigo-500" },
            { icon: <Code2 />, label: "Python/JS", color: "from-yellow-500" },
            { icon: <MessageSquare />, label: "WhatsApp", color: "from-green-500" },
            { icon: <Layers />, label: "Vector DB", color: "from-orange-500" },
            { icon: <Command />, label: "CRM", color: "from-cyan-500" },
            { icon: <Bot />, label: "Sub-Agents", color: "from-pink-500" },
            { icon: <Terminal />, label: "Custom API", color: "from-gray-500" },
            { icon: <Brain />, label: "Reasoning", color: "from-violet-500" }
          ].map((tool, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col items-center justify-center text-center backdrop-blur-md group cursor-default"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color}/20 flex items-center justify-center mb-4 border border-white/5 group-hover:border-white/20 transition-all`}>
                <div className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">{tool.icon}</div>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tool.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section 2: Bullets Content */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { text: "Logique d'Agent autonome au coeur de n8n", icon: <Bot size={20} /> },
            { text: "Compréhension réelle de la structure des LLM", icon: <Brain size={20} /> },
            { text: "Construction de Tool-Kits pour vos automatisations", icon: <Terminal size={20} /> },
            { text: "Transition vers des systèmes multi-agents complexes", icon: <Activity size={20} /> }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard className="h-full border-t border-t-indigo-500/10">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 text-indigo-400">
                  {item.icon}
                </div>
                <p className="text-gray-200 text-base font-medium leading-relaxed">{item.text}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NEW: Multi-Agent Collaboration Visual */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <GlassCard className="text-center">
            <div className="w-12 h-12 bg-indigo-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/30">
               <Search className="text-indigo-400" />
            </div>
            <h4 className="text-white font-bold mb-3">Agent Chercheur</h4>
            <p className="text-gray-500 text-sm">Récupère et synthétise les données brutes du web et des APIs.</p>
          </GlassCard>
          
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-1 h-20 bg-gradient-to-b from-indigo-500 to-purple-500 opacity-20 hidden lg:block" />
            <div className="p-4 rounded-full bg-white/5 border border-white/10 text-indigo-500 animate-pulse">
              <Zap size={24} />
            </div>
            <div className="text-[10px] font-bold text-indigo-400 tracking-[0.4em] uppercase">COLLABORATION</div>
            <div className="w-1 h-20 bg-gradient-to-t from-indigo-500 to-purple-500 opacity-20 hidden lg:block" />
          </div>

          <GlassCard className="text-center">
            <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
               <Code2 className="text-purple-400" />
            </div>
            <h4 className="text-white font-bold mb-3">Agent Exécuteur</h4>
            <p className="text-gray-500 text-sm">Formate, code et déploie les résultats dans vos outils métier.</p>
          </GlassCard>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-24 container mx-auto px-4 max-w-5xl">
        <SectionHeader title="Roadmap Agentique" subtitle="Votre parcours vers l'autonomie technique." />
        
        <div className="flex justify-center gap-2 mb-16 h-12 items-end">
          {[0.3, 0.6, 1, 0.7, 0.5, 0.8, 0.4].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0, opacity: 0 }}
              whileInView={{ height: h * 48, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              className="w-2 rounded-full bg-gradient-to-t from-indigo-600 to-purple-500 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
            />
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {[
            {
              step: "Phase 01",
              title: "Fondations & Logique LLM",
              points: [
                "Structure d'un LLM et mécanismes d'attention",
                "Logiques d'automatisation avancées sur n8n"
              ],
              icon: <Brain className="text-indigo-400" />
            },
            {
              step: "Phase 02",
              title: "Conception d'Agents",
              points: [
                "Construction d'agents autonomes (Reasoning)",
                "Implémentation du Tool-Calling (Utilisation d'outils)"
              ],
              icon: <Bot className="text-purple-400" />
            },
            {
              step: "Phase 03",
              title: "Systèmes Multi-Agents",
              points: [
                "Collaboration entre agents spécialisés",
                "Déploiement de workflows de production stables"
              ],
              icon: <Layers className="text-cyan-400" />
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.1 }}
              className="relative"
            >
              <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-indigo-500/40 to-transparent opacity-40" />
              
              <div className="bg-[#0a0c14]/40 backdrop-blur-3xl border border-white/10 p-10 rounded-2xl hover:bg-white/[0.04] transition-all group shadow-xl">
                <div className="flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-all">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-indigo-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">{item.step}</div>
                    <h4 className="text-2xl font-bold mb-5 text-white">{item.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.points.map((p, pi) => (
                        <div key={pi} className="flex items-center gap-3 text-gray-400">
                          <div className="w-1 h-1 rounded-full bg-indigo-500" />
                          <span className="text-base font-light">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ce que tu obtiens */}
      <section className="py-24 container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-10 tracking-tighter leading-[0.9]"
            >
              L'arsenal <br /> <span className="text-indigo-500">Aura Lite.</span>
            </motion.h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md font-light leading-relaxed">
              Tout le nécessaire pour passer de "celui qui bidouille" à "celui qui orchestre" des intelligences artificielles au service du business.
            </p>
            <div className="p-8 rounded-2xl bg-indigo-600/[0.03] border border-indigo-500/20 backdrop-blur-xl">
               <div className="flex items-center gap-3 mb-3">
                  <ShieldCheck size={18} className="text-indigo-500" />
                  <span className="font-bold text-sm text-white uppercase tracking-widest">Maîtrise Opérationnelle</span>
               </div>
               <p className="text-gray-400 text-sm">Modules focalisés sur la stabilité : vos agents ne "hallucinent" pas en production.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {[
              "Architecture d'Agents IA sur n8n",
              "Concepts de Memory & Vector Stores",
              "Framework de Tool-calling (Usage d'APIs)",
              "Templates Multi-Agents prêts à l'emploi",
              "Compréhension technique des LLMs majeurs"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-5 p-6 rounded-xl bg-white/[0.02] border border-white/10 group hover:border-indigo-500/30 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30 group-hover:bg-indigo-500 transition-all">
                  <Check size={14} className="text-indigo-400 group-hover:text-white" />
                </div>
                <span className="text-gray-200 text-lg font-light">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Block */}
      <section className="py-24 relative overflow-hidden text-center">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative p-12 md:p-20 rounded-[48px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl"
          >
            <div className="text-indigo-500/30 mb-10 flex justify-center">
              <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
                <path d="M0 15V0H15V15H7.5L11.25 30H3.75L0 15ZM25 15V0H40V15H32.5L36.25 30H28.75L25 15Z" />
              </svg>
            </div>
            <h3 className="text-2xl md:text-4xl font-medium text-white italic leading-snug mb-10">
              “L'automatisation du futur ne sera pas faite de triggers et d'actions, mais d'agents capables de comprendre un objectif et de s'auto-organiser pour l'atteindre via n8n.”
            </h3>
            <div className="flex flex-col items-center gap-4">
              <div className="h-[1px] w-16 bg-indigo-500/50" />
              <span className="text-indigo-400 font-bold tracking-[0.6em] text-[9px] uppercase">AURA LITE MANIFESTE</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 container mx-auto px-4 text-center">
        <SectionHeader title="Investissement." subtitle="Devenez l'architecte de vos propres agents." />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative max-w-xl mx-auto"
        >
          <div className="absolute inset-[-1px] bg-gradient-to-br from-indigo-500/40 via-transparent to-purple-600/40 rounded-[33px] blur-[1px] opacity-30" />
          
          <div className="relative p-12 md:p-16 rounded-[32px] border border-white/10 bg-[#070811] shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
            
            <div className="mb-10">
               <h4 className="text-7xl font-bold text-white mb-3 tracking-tighter">500 €</h4>
               <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-[0.2em] text-[10px]">
                 — accès immédiat
               </div>
            </div>

            <p className="text-gray-400 text-lg mb-12 font-light leading-relaxed">
              Maîtrisez les agents IA et n8n. Accès autonome et complet au socle technique Aura.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-6 rounded-xl bg-indigo-600 text-white font-bold text-xl transition-all shadow-xl hover:bg-indigo-500 mb-6"
            >
              Rejoindre Aura Lite
            </motion.button>
            <div className="text-gray-600 text-[10px] uppercase tracking-widest font-bold">Paiement sécurisé par Stripe</div>
          </div>
        </motion.div>
      </section>

      {/* Final Footer */}
      <footer className="py-20 border-t border-white/5 relative">
        <div className="container mx-auto px-4 max-w-7xl">
           <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-center md:text-left">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-center md:justify-start">
                  <img src="/lite.png" alt="Aura Lite" className="h-12 md:h-16 w-auto object-contain" />
                </div>
                <p className="text-gray-500 text-sm font-light">
                  Architecture d'Agents IA & Automatisation n8n.
                </p>
              </div>

              <div className="flex gap-6 md:gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
                <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
                <a href="#pricing" className="hover:text-white transition-colors">Tarif</a>
                <a href="#agents" className="hover:text-white transition-colors">Agents</a>
              </div>
           </div>

           <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-600 text-[10px] uppercase tracking-widest font-medium">
              © 2024 Aura Academy. Tous droits réservés.
           </div>
        </div>
      </footer>
    </div>
  );
}

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
