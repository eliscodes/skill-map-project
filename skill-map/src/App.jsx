import { useState, useMemo } from "react";

// ─── DATA MODEL ────────────────────────────────────────────────────────────────

const LEVELS = {
  none: { label: "—", icon: "·", color: "#2a2d35", textColor: "#555", value: 0 },
  learning: { label: "Learning", icon: "🌱", color: "#1a2e1a", textColor: "#4ade80", border: "#22c55e", value: 1 },
  independent: { label: "Independent", icon: "✅", color: "#1a2442", textColor: "#60a5fa", border: "#3b82f6", value: 2 },
  coach: { label: "Coach", icon: "⭐", color: "#2a1f0a", textColor: "#fbbf24", border: "#f59e0b", value: 3 },
};

const CATEGORIES = {
  frontend: { label: "Frontend", color: "#8b5cf6" },
  backend: { label: "Backend", color: "#3b82f6" },
  infrastructure: { label: "Infra & DevOps", color: "#f97316" },
  quality: { label: "Quality", color: "#ec4899" },
  leadership: { label: "Leadership", color: "#14b8a6" },
};

const SKILLS = [
  { id: "react", name: "React", category: "frontend" },
  { id: "typescript", name: "TypeScript", category: "frontend" },
  { id: "css", name: "CSS / Design", category: "frontend" },
  { id: "nodejs", name: "Node.js", category: "backend" },
  { id: "postgres", name: "PostgreSQL", category: "backend" },
  { id: "graphql", name: "GraphQL", category: "backend" },
  { id: "docker", name: "Docker", category: "infrastructure" },
  { id: "k8s", name: "Kubernetes", category: "infrastructure" },
  { id: "cicd", name: "CI/CD", category: "infrastructure" },
  { id: "testing", name: "Testing", category: "quality" },
  { id: "security", name: "Security", category: "quality" },
  { id: "architecture", name: "Architecture", category: "leadership" },
  { id: "mentoring", name: "Mentoring", category: "leadership" },
];

const TEAM = [
  { id: "person1", name: "Adam", role: "Frontend Engineer", avatar: "AA" },
  { id: "person2", name: "Bob", role: "Backend Engineer", avatar: "BB" },
  { id: "person3", name: "Chris", role: "Backend Engineer", avatar: "CC" },
  { id: "person3", name: "Dave", role: "Full Stack", avatar: "DD" },
  { id: "person4", name: "Ema", role: "Backend Engineer", avatar: "EE" },
  { id: "person5", name: "Felix", role: "QA Engineer", avatar: "FF" },
  { id: "person6", name: "Greg", role: "Frontend Engineer", avatar: "GG" },
  { id: "person7", name: "Holly", role: "Frontend ENgineer", avatar: "HH" },
  { id: "person8", name: "Iris", role: "Backend Engineer", avatar: "II" },
  { id: "person9", name: "Jay", role: "Consultant", avatar: "JJ" },
  { id: "person10", name: "Kev", role: "Teamlead", avatar: "KK" },
  { id: "person11", name: "Leo", role: "PM", avatar: "LL" },
  { id: "person12", name: "Mona", role: "PM", avatar: "MM" },
  { id: "person13", name: "Nina", role: "PM", avatar: "NN" },
];

const INITIAL_RATINGS = {
  person1: { react: "coach", typescript: "coach", css: "coach", nodejs: "independent", postgres: "learning", graphql: "independent", docker: "learning", k8s: "none", cicd: "learning", testing: "independent", security: "learning", architecture: "independent", mentoring: "coach" },
  person2: { react: "learning", typescript: "independent", css: "learning", nodejs: "coach", postgres: "coach", graphql: "coach", docker: "independent", k8s: "learning", cicd: "independent", testing: "independent", security: "independent", architecture: "independent", mentoring: "independent" },
  person3: { react: "independent", typescript: "independent", css: "independent", nodejs: "independent", postgres: "independent", graphql: "learning", docker: "independent", k8s: "none", cicd: "independent", testing: "coach", security: "learning", architecture: "learning", mentoring: "learning" },
  person4: { react: "none", typescript: "learning", css: "none", nodejs: "independent", postgres: "independent", graphql: "none", docker: "coach", k8s: "coach", cicd: "coach", testing: "independent", security: "coach", architecture: "independent", mentoring: "independent" },
  person5: { react: "learning", typescript: "independent", css: "learning", nodejs: "learning", postgres: "independent", graphql: "none", docker: "learning", k8s: "none", cicd: "independent", testing: "coach", security: "independent", architecture: "none", mentoring: "learning" },
  person6: { react: "independent", typescript: "learning", css: "independent", nodejs: "none", postgres: "none", graphql: "none", docker: "learning", k8s: "none", cicd: "none", testing: "learning", security: "none", architecture: "none", mentoring: "none" },
  person7: { react: "coach", typescript: "coach", css: "coach", nodejs: "independent", postgres: "learning", graphql: "independent", docker: "learning", k8s: "none", cicd: "learning", testing: "independent", security: "learning", architecture: "independent", mentoring: "coach" },
  person8: { react: "learning", typescript: "independent", css: "learning", nodejs: "coach", postgres: "coach", graphql: "coach", docker: "independent", k8s: "learning", cicd: "independent", testing: "independent", security: "independent", architecture: "independent", mentoring: "independent" },
  person9: { react: "independent", typescript: "independent", css: "independent", nodejs: "independent", postgres: "independent", graphql: "learning", docker: "independent", k8s: "none", cicd: "independent", testing: "coach", security: "learning", architecture: "learning", mentoring: "learning" },
  person10: { react: "none", typescript: "learning", css: "none", nodejs: "independent", postgres: "independent", graphql: "none", docker: "coach", k8s: "coach", cicd: "coach", testing: "independent", security: "coach", architecture: "independent", mentoring: "independent" },
  person11: { react: "learning", typescript: "independent", css: "learning", nodejs: "learning", postgres: "independent", graphql: "none", docker: "learning", k8s: "none", cicd: "independent", testing: "coach", security: "independent", architecture: "none", mentoring: "learning" },
  person12: { react: "independent", typescript: "learning", css: "independent", nodejs: "none", postgres: "none", graphql: "none", docker: "learning", k8s: "none", cicd: "none", testing: "learning", security: "none", architecture: "none", mentoring: "none" },
  person13: { react: "learning", typescript: "independent", css: "learning", nodejs: "learning", postgres: "independent", graphql: "none", docker: "learning", k8s: "none", cicd: "independent", testing: "coach", security: "independent", architecture: "none", mentoring: "learning" },
  person14: { react: "independent", typescript: "learning", css: "independent", nodejs: "none", postgres: "none", graphql: "none", docker: "learning", k8s: "none", cicd: "none", testing: "learning", security: "none", architecture: "none", mentoring: "none" },
};

const INITIAL_GROWTH = {
  adam: ["k8s", "security"],
  bob: ["react", "architecture"],
  chris: ["graphql", "architecture"],
  dave: ["react", "graphql"],
  ema: ["react", "docker"],
  felix: ["react", "architecture"],
  greg: ["graphql", "architecture"],
  holly: ["react", "graphql"],
  iris: ["react", "docker"],
  jay: ["nodejs", "testing", "typescript"],
  kev: ["react", "architecture"],
  leo: ["graphql", "architecture"],
  mona: ["react", "graphql"],
  nina: ["react", "docker"],
};

// ─── HOOKS ─────────────────────────────────────────────────────────────────────

function useSkillMap() {
  const [ratings, setRatings] = useState(INITIAL_RATINGS);
  const [growthInterest, setGrowthInterest] = useState(INITIAL_GROWTH);

  const setRating = (userId, skillId, level) => {
    setRatings(prev => ({ ...prev, [userId]: { ...prev[userId], [skillId]: level } }));
  };

  const toggleGrowth = (userId, skillId) => {
    setGrowthInterest(prev => {
      const curr = prev[userId] || [];
      return { ...prev, [userId]: curr.includes(skillId) ? curr.filter(s => s !== skillId) : [...curr, skillId] };
    });
  };

  const busFactorRisks = useMemo(() => {
    return SKILLS.filter(skill => {
      const experts = TEAM.filter(p => ["coach", "independent"].includes(ratings[p.id]?.[skill.id]));
      return experts.length <= 1;
    });
  }, [ratings]);

  const mentoringPairs = useMemo(() => {
    const pairs = [];
    SKILLS.forEach(skill => {
      const coaches = TEAM.filter(p => ratings[p.id]?.[skill.id] === "coach");
      const learners = TEAM.filter(p => growthInterest[p.id]?.includes(skill.id) && ratings[p.id]?.[skill.id] !== "coach");
      coaches.forEach(coach => {
        learners.forEach(learner => {
          if (coach.id !== learner.id) pairs.push({ skill, coach, learner });
        });
      });
    });
    return pairs.slice(0, 8);
  }, [ratings, growthInterest]);

  const skillCoverage = useMemo(() => {
    const total = SKILLS.length;
    const covered = SKILLS.filter(skill =>
      TEAM.some(p => ["coach", "independent"].includes(ratings[p.id]?.[skill.id]))
    ).length;
    return Math.round((covered / total) * 100);
  }, [ratings]);

  return { ratings, growthInterest, setRating, toggleGrowth, busFactorRisks, mentoringPairs, skillCoverage };
}

// ─── COMPONENTS ────────────────────────────────────────────────────────────────

const Avatar = ({ person, size = 32 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: "linear-gradient(135deg, #3b4a6b, #1e2a4a)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, color: "#93a3c4",
    border: "1px solid #2d3a55", flexShrink: 0, fontFamily: "'DM Mono', monospace",
  }}>{person.avatar}</div>
);

const LevelBadge = ({ level, size = "md", onClick, isGrowth }) => {
  const l = LEVELS[level] || LEVELS.none;
  const pad = size === "sm" ? "4px 8px" : "6px 12px";
  const fs = size === "sm" ? 11 : 12;
  return (
    <div onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: pad, borderRadius: 6, cursor: onClick ? "pointer" : "default",
      background: l.color, border: `1px solid ${l.border || "#2a2d35"}`,
      color: l.textColor, fontSize: fs, fontWeight: 600, fontFamily: "'DM Mono', monospace",
      transition: "all 0.15s", position: "relative",
      outline: isGrowth ? `2px solid #22c55e` : "none", outlineOffset: 2,
    }}>
      <span>{l.icon}</span>
      {size !== "xs" && <span>{l.label}</span>}
      {isGrowth && <span style={{ position: "absolute", top: -6, right: -6, fontSize: 9, background: "#22c55e", color: "#000", borderRadius: 3, padding: "1px 3px" }}>GROW</span>}
    </div>
  );
};

function CellEditor({ userId, skillId, currentLevel, isGrowth, onSetRating, onToggleGrowth, onClose }) {
  const order = ["none", "learning", "independent", "coach"];
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#13161e", border: "1px solid #2d3348", borderRadius: 16,
        padding: 28, minWidth: 320, boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
      }}>
        <div style={{ color: "#f0f4ff", fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6, opacity: 0.5 }}>
          {SKILLS.find(s => s.id === skillId)?.name}
        </div>
        <div style={{ color: "#f0f4ff", fontFamily: "system-ui", fontSize: 16, fontWeight: 600, marginBottom: 20 }}>
          Wie ist dein Level?
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {order.map(lvl => {
            const l = LEVELS[lvl];
            const active = currentLevel === lvl;
            return (
              <button key={lvl} onClick={() => { onSetRating(userId, skillId, lvl); onClose(); }} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                borderRadius: 10, border: active ? `2px solid ${l.border || "#444"}` : "1px solid #2d3348",
                background: active ? l.color : "transparent", cursor: "pointer",
                color: active ? l.textColor : "#8090b0", fontFamily: "system-ui", fontSize: 14,
                transition: "all 0.15s", textAlign: "left",
              }}>
                <span style={{ fontSize: 18 }}>{l.icon}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{l.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.6 }}>
                    {lvl === "none" && "Noch kein Wissen vorhanden"}
                    {lvl === "learning" && "Mit Unterstützung möglich"}
                    {lvl === "independent" && "Eigenständig einsetzbar"}
                    {lvl === "coach" && "Experte — kann andere coachen"}
                  </div>
                </div>
                {active && <div style={{ marginLeft: "auto", color: l.textColor }}>✓</div>}
              </button>
            );
          })}
        </div>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #2d3348" }}>
          <button onClick={() => { onToggleGrowth(userId, skillId); onClose(); }} style={{
            width: "100%", padding: "10px 16px", borderRadius: 8,
            border: `1px solid ${isGrowth ? "#22c55e" : "#2d3348"}`,
            background: isGrowth ? "rgba(34,197,94,0.1)" : "transparent",
            color: isGrowth ? "#22c55e" : "#8090b0", cursor: "pointer",
            fontFamily: "system-ui", fontSize: 14, fontWeight: 500,
            display: "flex", alignItems: "center", gap: 8, justifyContent: "center",
          }}>
            🌱 {isGrowth ? "Wachstumsziel entfernen" : "Als Wachstumsziel markieren"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ ratings, busFactorRisks, mentoringPairs, skillCoverage, growthInterest, onNavigate }) {
  const totalCoaches = SKILLS.reduce((acc, skill) => {
    return acc + TEAM.filter(p => ratings[p.id]?.[skill.id] === "coach").length;
  }, 0);
  const growthCount = Object.values(growthInterest).flat().length;

  const statCards = [
    { label: "Skill Coverage", value: `${skillCoverage}%`, sub: `${SKILLS.length} Skills im Team`, color: "#3b82f6", icon: "◈" },
    { label: "Bus Factor Risks", value: busFactorRisks.length, sub: "Skills mit 1 Experten", color: "#ef4444", icon: "⚠" },
    { label: "Coach Expertise", value: totalCoaches, sub: "Coach-Level Ratings", color: "#f59e0b", icon: "⭐" },
    { label: "Growth Goals", value: growthCount, sub: "Wachstumsinteressen", color: "#22c55e", icon: "🌱" },
  ];

  const categoryStats = Object.entries(CATEGORIES).map(([catId, cat]) => {
    const catSkills = SKILLS.filter(s => s.category === catId);
    const levels = { coach: 0, independent: 0, learning: 0, none: 0 };
    catSkills.forEach(skill => {
      TEAM.forEach(p => {
        const lvl = ratings[p.id]?.[skill.id] || "none";
        levels[lvl]++;
      });
    });
    const total = catSkills.length * TEAM.length;
    const strength = ((levels.coach * 3 + levels.independent * 2 + levels.learning) / (total * 3)) * 100;
    return { ...cat, id: catId, strength: Math.round(strength), skills: catSkills.length, levels };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {statCards.map((card, i) => (
          <div key={i} style={{
            background: "#13161e", border: "1px solid #1e2438",
            borderRadius: 14, padding: "20px 22px",
            borderLeft: `3px solid ${card.color}`,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ color: "#6b7a99", fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>{card.label.toUpperCase()}</div>
              <div style={{ fontSize: 18, opacity: 0.7 }}>{card.icon}</div>
            </div>
            <div style={{ color: card.color, fontSize: 36, fontWeight: 800, fontFamily: "'DM Mono', monospace", lineHeight: 1.1, marginTop: 8 }}>{card.value}</div>
            <div style={{ color: "#4a5568", fontSize: 12, marginTop: 4 }}>{card.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Category Strengths */}
        <div style={{ background: "#13161e", border: "1px solid #1e2438", borderRadius: 14, padding: 22 }}>
          <div style={{ color: "#f0f4ff", fontWeight: 700, fontSize: 15, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#6b7a99" }}>◈</span> Skill Stärke nach Kategorie
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {categoryStats.map(cat => (
              <div key={cat.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color }} />
                    <span style={{ color: "#c0cce8", fontSize: 13, fontWeight: 500 }}>{cat.label}</span>
                    <span style={{ color: "#3a4560", fontSize: 11, fontFamily: "'DM Mono', monospace" }}>{cat.skills} skills</span>
                  </div>
                  <span style={{ color: cat.color, fontSize: 13, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{cat.strength}%</span>
                </div>
                <div style={{ height: 6, background: "#1a1e2e", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${cat.strength}%`, background: cat.color, borderRadius: 4, transition: "width 0.6s ease" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bus Factor Risks */}
        <div style={{ background: "#13161e", border: "1px solid #1e2438", borderRadius: 14, padding: 22 }}>
          <div style={{ color: "#f0f4ff", fontWeight: 700, fontSize: 15, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#ef4444" }}>⚠</span> Bus Factor Risiken
          </div>
          <div style={{ color: "#4a5568", fontSize: 12, marginBottom: 16 }}>Skills mit nur 1 kompetenten Person</div>
          {busFactorRisks.length === 0 ? (
            <div style={{ color: "#22c55e", fontSize: 14, padding: "20px 0", textAlign: "center" }}>✓ Keine kritischen Risiken!</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {busFactorRisks.map(skill => {
                const cat = CATEGORIES[skill.category];
                const expert = TEAM.find(p => ["coach", "independent"].includes(ratings[p.id]?.[skill.id]));
                return (
                  <div key={skill.id} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "8px 12px", borderRadius: 8, background: "rgba(239,68,68,0.05)",
                    border: "1px solid rgba(239,68,68,0.15)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: 2, background: cat.color }} />
                      <span style={{ color: "#c0cce8", fontSize: 13 }}>{skill.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {expert ? <Avatar person={expert} size={22} /> : <span style={{ color: "#ef4444", fontSize: 11 }}>niemand</span>}
                      <span style={{ color: "#ef4444", fontSize: 11, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>RISK</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mentoring Matches */}
      <div style={{ background: "#13161e", border: "1px solid #1e2438", borderRadius: 14, padding: 22 }}>
        <div style={{ color: "#f0f4ff", fontWeight: 700, fontSize: 15, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "#22c55e" }}>↔</span> Mentoring Matches
        </div>
        <div style={{ color: "#4a5568", fontSize: 12, marginBottom: 16 }}>Automatische Paare: Coach → Wachstumsziel</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {mentoringPairs.map((pair, i) => {
            const cat = CATEGORIES[pair.skill.category];
            return (
              <div key={i} style={{
                padding: "12px 14px", borderRadius: 10, background: "#0d1017",
                border: "1px solid #1e2438",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <div style={{ width: 6, height: 6, borderRadius: 2, background: cat.color }} />
                  <span style={{ color: cat.color, fontSize: 11, fontWeight: 600 }}>{pair.skill.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Avatar person={pair.coach} size={24} />
                  <span style={{ color: "#f59e0b", fontSize: 10 }}>⭐</span>
                  <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #f59e0b33, #22c55e33)" }} />
                  <span style={{ color: "#22c55e", fontSize: 10 }}>🌱</span>
                  <Avatar person={pair.learner} size={24} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                  <span style={{ color: "#6b7a99", fontSize: 10 }}>{pair.coach.name.split(" ")[0]}</span>
                  <span style={{ color: "#6b7a99", fontSize: 10 }}>{pair.learner.name.split(" ")[0]}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SkillMatrix({ ratings, growthInterest, setRating, toggleGrowth }) {
  const [editing, setEditing] = useState(null);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [filter, setFilter] = useState("all");

  const filteredSkills = filter === "all" ? SKILLS : SKILLS.filter(s => s.category === filter);

  return (
    <div>
      {editing && (
        <CellEditor
          {...editing}
          isGrowth={growthInterest[editing.userId]?.includes(editing.skillId)}
          onSetRating={setRating}
          onToggleGrowth={toggleGrowth}
          onClose={() => setEditing(null)}
        />
      )}

      {/* Category filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        <button onClick={() => setFilter("all")} style={{
          padding: "6px 14px", borderRadius: 8, border: "1px solid",
          borderColor: filter === "all" ? "#3b82f6" : "#2d3348",
          background: filter === "all" ? "rgba(59,130,246,0.1)" : "transparent",
          color: filter === "all" ? "#60a5fa" : "#6b7a99", cursor: "pointer", fontSize: 12, fontWeight: 600,
        }}>Alle Skills</button>
        {Object.entries(CATEGORIES).map(([id, cat]) => (
          <button key={id} onClick={() => setFilter(id)} style={{
            padding: "6px 14px", borderRadius: 8, border: "1px solid",
            borderColor: filter === id ? cat.color : "#2d3348",
            background: filter === id ? `${cat.color}18` : "transparent",
            color: filter === id ? cat.color : "#6b7a99", cursor: "pointer", fontSize: 12, fontWeight: 600,
          }}>{cat.label}</button>
        ))}
      </div>

      {/* Matrix */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 800 }}>
          <thead>
            <tr>
              <th style={{ padding: "10px 16px", textAlign: "left", color: "#3a4560", fontSize: 11, fontFamily: "'DM Mono', monospace", letterSpacing: 1, fontWeight: 400, width: 160 }}>PERSON</th>
              {filteredSkills.map(skill => {
                const cat = CATEGORIES[skill.category];
                return (
                  <th key={skill.id} style={{
                    padding: "8px 6px", textAlign: "center", fontSize: 11,
                    color: hoveredCol === skill.id ? cat.color : "#4a5568",
                    fontFamily: "'DM Mono', monospace", fontWeight: 500,
                    borderBottom: hoveredCol === skill.id ? `2px solid ${cat.color}` : "2px solid transparent",
                    transition: "all 0.15s", minWidth: 90,
                  }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                      <div style={{ width: 4, height: 4, borderRadius: 1, background: cat.color, opacity: 0.7 }} />
                      {skill.name}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TEAM.map((person, pi) => (
              <tr key={person.id} onMouseEnter={() => setHoveredRow(person.id)} onMouseLeave={() => setHoveredRow(null)} style={{
                background: hoveredRow === person.id ? "rgba(255,255,255,0.02)" : "transparent",
                transition: "background 0.1s",
              }}>
                <td style={{ padding: "10px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar person={person} size={32} />
                    <div>
                      <div style={{ color: "#c0cce8", fontSize: 13, fontWeight: 600 }}>{person.name}</div>
                      <div style={{ color: "#3a4560", fontSize: 11 }}>{person.role}</div>
                    </div>
                  </div>
                </td>
                {filteredSkills.map(skill => {
                  const level = ratings[person.id]?.[skill.id] || "none";
                  const isGrowth = growthInterest[person.id]?.includes(skill.id);
                  const l = LEVELS[level];
                  const isHighlighted = hoveredRow === person.id || hoveredCol === skill.id;
                  return (
                    <td key={skill.id} style={{ padding: "6px 4px", textAlign: "center" }}
                      onMouseEnter={() => setHoveredCol(skill.id)}
                      onMouseLeave={() => setHoveredCol(null)}>
                      <div onClick={() => setEditing({ userId: person.id, skillId: skill.id, currentLevel: level })}
                        style={{
                          display: "inline-flex", alignItems: "center", justifyContent: "center",
                          width: 72, height: 36, borderRadius: 8, cursor: "pointer",
                          background: l.color,
                          border: isGrowth ? "2px solid #22c55e" : `1px solid ${isHighlighted ? (l.border || "#3a4560") : "#1e2438"}`,
                          transition: "all 0.15s", fontSize: 16,
                          transform: isHighlighted && level !== "none" ? "scale(1.05)" : "scale(1)",
                          position: "relative",
                        }}>
                        {level === "none" ? <span style={{ color: "#2a3050", fontSize: 18 }}>·</span> : <span>{l.icon}</span>}
                        {isGrowth && <span style={{
                          position: "absolute", top: -5, right: -5, width: 10, height: 10,
                          background: "#22c55e", borderRadius: "50%", border: "1px solid #0d1017",
                        }} />}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 20, marginTop: 24, padding: "16px 20px", background: "#13161e", borderRadius: 10, border: "1px solid #1e2438", alignItems: "center", flexWrap: "wrap" }}>
        <span style={{ color: "#3a4560", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>LEGENDE:</span>
        {Object.entries(LEVELS).filter(([k]) => k !== "none").map(([key, l]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 28, height: 20, borderRadius: 4, background: l.color, border: `1px solid ${l.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>{l.icon}</div>
            <span style={{ color: "#6b7a99", fontSize: 12 }}>{l.label}</span>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ color: "#6b7a99", fontSize: 12 }}>Wachstumsziel</span>
        </div>
        <span style={{ color: "#3a4560", fontSize: 12, marginLeft: "auto" }}>Klick auf eine Zelle zum Bearbeiten</span>
      </div>
    </div>
  );
}

function PersonProfile({ person, ratings, growthInterest, toggleGrowth, setRating }) {
  const [editing, setEditing] = useState(null);
  const personRatings = ratings[person.id] || {};
  const personGrowth = growthInterest[person.id] || [];

  const byCategory = Object.entries(CATEGORIES).map(([catId, cat]) => ({
    ...cat, id: catId,
    skills: SKILLS.filter(s => s.category === catId).map(skill => ({
      ...skill, level: personRatings[skill.id] || "none", isGrowth: personGrowth.includes(skill.id),
    })),
  }));

  const coachCount = Object.values(personRatings).filter(l => l === "coach").length;
  const indCount = Object.values(personRatings).filter(l => l === "independent").length;
  const learnCount = Object.values(personRatings).filter(l => l === "learning").length;

  return (
    <div>
      {editing && (
        <CellEditor {...editing}
          isGrowth={growthInterest[editing.userId]?.includes(editing.skillId)}
          onSetRating={setRating} onToggleGrowth={toggleGrowth} onClose={() => setEditing(null)} />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: "24px", background: "#13161e", borderRadius: 14, border: "1px solid #1e2438" }}>
        <Avatar person={person} size={56} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f0f4ff", fontSize: 22, fontWeight: 700 }}>{person.name}</div>
          <div style={{ color: "#6b7a99", fontSize: 14 }}>{person.role}</div>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {[{ val: coachCount, label: "Coach", color: "#f59e0b", icon: "⭐" }, { val: indCount, label: "Independent", color: "#3b82f6", icon: "✅" }, { val: learnCount, label: "Learning", color: "#22c55e", icon: "🌱" }].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ color: s.color, fontSize: 24, fontWeight: 800, fontFamily: "'DM Mono', monospace" }}>{s.val}</div>
              <div style={{ color: "#4a5568", fontSize: 11 }}>{s.icon} {s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
        {byCategory.map(cat => (
          <div key={cat.id} style={{ background: "#13161e", borderRadius: 14, border: "1px solid #1e2438", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid #1e2438", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color }} />
              <span style={{ color: cat.color, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{cat.label.toUpperCase()}</span>
            </div>
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
              {cat.skills.map(skill => (
                <div key={skill.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "#8090b0", fontSize: 13 }}>{skill.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {skill.isGrowth && <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600 }}>WACHSTUM</span>}
                    <LevelBadge level={skill.level} size="sm" isGrowth={skill.isGrowth}
                      onClick={() => setEditing({ userId: person.id, skillId: skill.id, currentLevel: skill.level })} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillDetail({ skill, ratings, growthInterest }) {
  const cat = CATEGORIES[skill.category];
  const people = TEAM.map(p => ({ ...p, level: ratings[p.id]?.[skill.id] || "none", isGrowth: growthInterest[p.id]?.includes(skill.id) }))
    .sort((a, b) => LEVELS[b.level].value - LEVELS[a.level].value);

  const dist = { coach: 0, independent: 0, learning: 0, none: 0 };
  people.forEach(p => dist[p.level]++);
  const coaches = people.filter(p => p.level === "coach");
  const learners = people.filter(p => p.isGrowth && p.level !== "coach");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ padding: "24px", background: "#13161e", borderRadius: 14, border: "1px solid #1e2438", borderLeft: `4px solid ${cat.color}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color }} />
          <span style={{ color: cat.color, fontSize: 12, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>{cat.label.toUpperCase()}</span>
        </div>
        <div style={{ color: "#f0f4ff", fontSize: 28, fontWeight: 800 }}>{skill.name}</div>
        <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
          {Object.entries(dist).filter(([k]) => k !== "none").map(([lvl, count]) => {
            const l = LEVELS[lvl];
            return (
              <div key={lvl} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 8, background: l.color, border: `1px solid ${l.border}` }}>
                <span>{l.icon}</span>
                <span style={{ color: l.textColor, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{count}</span>
                <span style={{ color: l.textColor, fontSize: 12, opacity: 0.7 }}>{l.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: "#13161e", borderRadius: 14, border: "1px solid #1e2438", padding: 20 }}>
          <div style={{ color: "#f0f4ff", fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <span>👥</span> Team Übersicht
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {people.map(p => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar person={p} size={30} />
                  <div>
                    <div style={{ color: "#c0cce8", fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                    <div style={{ color: "#3a4560", fontSize: 11 }}>{p.role}</div>
                  </div>
                </div>
                <LevelBadge level={p.level} size="sm" isGrowth={p.isGrowth} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {coaches.length > 0 && learners.length > 0 && (
            <div style={{ background: "#13161e", borderRadius: 14, border: "1px solid #1e2438", padding: 20 }}>
              <div style={{ color: "#f0f4ff", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>↔ Mentoring Möglichkeiten</div>
              {coaches.map(coach => (
                <div key={coach.id}>
                  {learners.map(learner => (
                    <div key={learner.id} style={{
                      display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                      background: "#0d1017", borderRadius: 8, marginBottom: 8,
                    }}>
                      <Avatar person={coach} size={26} />
                      <span style={{ color: "#f59e0b", fontSize: 12 }}>⭐ coacht</span>
                      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, #f59e0b44, #22c55e44)" }} />
                      <span style={{ color: "#22c55e", fontSize: 12 }}>🌱</span>
                      <Avatar person={learner} size={26} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <div style={{ background: "#13161e", borderRadius: 14, border: "1px solid #1e2438", padding: 20 }}>
            <div style={{ color: "#f0f4ff", fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Level Verteilung</div>
            {Object.entries(dist).filter(([k]) => k !== "none").map(([lvl, count]) => {
              const l = LEVELS[lvl];
              const pct = (count / TEAM.length) * 100;
              return (
                <div key={lvl} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ color: l.textColor, fontSize: 12 }}>{l.icon} {l.label}</span>
                    <span style={{ color: l.textColor, fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{count}/{TEAM.length}</span>
                  </div>
                  <div style={{ height: 4, background: "#1a1e2e", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: l.border || "#333", borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP SHELL ─────────────────────────────────────────────────────────────────

export default function SkillMap() {
  const [view, setView] = useState("dashboard");
  const [dark, setDark] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [dark, setDark] = useState(true);
  const { ratings, growthInterest, setRating, toggleGrowth, busFactorRisks, mentoringPairs, skillCoverage } = useSkillMap();

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "◈" },
    { id: "matrix", label: "Skill Matrix", icon: "▦" },
    { id: "team", label: "Team", icon: "◎" },
    { id: "skills", label: "Skills", icon: "◆" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#0a0c12", color: "#f0f4ff",
      fontFamily: "'Syne', system-ui, sans-serif",
      display: "flex", flexDirection: "column",
      filter: dark ? "none" : "invert(1) hue-rotate(180deg)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0a0c12; }
        ::-webkit-scrollbar-thumb { background: #2d3348; border-radius: 3px; }
        button { font-family: 'Syne', system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <header style={{
        padding: "0 32px", height: 56, display: "flex", alignItems: "center",
        borderBottom: "1px solid #13161e", background: "#0a0c12",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginRight: 40 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
          }}>◈</div>
          <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>Skill<span style={{ color: "#3b82f6" }}>Map</span></span>
        </div>

        <nav style={{ display: "flex", gap: 2, flex: 1 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setView(item.id); setSelectedPerson(null); setSelectedSkill(null); }} style={{
              padding: "6px 16px", borderRadius: 8, border: "none", cursor: "pointer",
              background: view === item.id ? "#13161e" : "transparent",
              color: view === item.id ? "#f0f4ff" : "#6b7a99",
              fontSize: 13, fontWeight: view === item.id ? 600 : 400,
              display: "flex", alignItems: "center", gap: 6, transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 11, opacity: 0.7 }}>{item.icon}</span> {item.label}
            </button>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {busFactorRisks.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 20 }}>
              <span style={{ fontSize: 12 }}>⚠</span>
              <span style={{ color: "#ef4444", fontSize: 12, fontWeight: 600 }}>{busFactorRisks.length} Risks</span>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 20 }}>
            <span style={{ color: "#60a5fa", fontSize: 12, fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>{skillCoverage}%</span>
            <span style={{ color: "#6b7a99", fontSize: 12 }}>Coverage</span>
          </div>
          <span style={{ color: "#6b7a99", fontSize: 12 }}>Coverage</span>
          </div>
          <button onClick={() => setDark(d => !d)} style={{
            padding: "4px 12px", borderRadius: 20, border: "1px solid #2d3348",
            background: "transparent", color: "#6b7a99", cursor: "pointer", fontSize: 12,
          }}>
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, padding: "32px", maxWidth: 1400, width: "100%", margin: "0 auto" }}>
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, color: "#3a4560", fontSize: 12, fontFamily: "'DM Mono', monospace" }}>
          <span onClick={() => { setSelectedPerson(null); setSelectedSkill(null); }} style={{ cursor: view !== "dashboard" ? "pointer" : "default", transition: "color 0.1s" }}
            onMouseEnter={e => e.target.style.color = "#6b7a99"} onMouseLeave={e => e.target.style.color = "#3a4560"}>
            {navItems.find(n => n.id === view)?.label}
          </span>
          {selectedPerson && <><span>/</span><span style={{ color: "#c0cce8" }}>{selectedPerson.name}</span></>}
          {selectedSkill && <><span>/</span><span style={{ color: "#c0cce8" }}>{selectedSkill.name}</span></>}
        </div>

        {view === "dashboard" && (
          <Dashboard ratings={ratings} busFactorRisks={busFactorRisks} mentoringPairs={mentoringPairs}
            skillCoverage={skillCoverage} growthInterest={growthInterest} onNavigate={setView} />
        )}

        {view === "matrix" && (
          <SkillMatrix ratings={ratings} growthInterest={growthInterest} setRating={setRating} toggleGrowth={toggleGrowth} />
        )}

        {view === "team" && !selectedPerson && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {TEAM.map(person => {
              const pr = ratings[person.id] || {};
              const coachCount = Object.values(pr).filter(l => l === "coach").length;
              const indCount = Object.values(pr).filter(l => l === "independent").length;
              const growthCount = (growthInterest[person.id] || []).length;
              const strength = ((coachCount * 3 + indCount * 2) / (SKILLS.length * 3)) * 100;
              return (
                <div key={person.id} onClick={() => setSelectedPerson(person)} style={{
                  background: "#13161e", border: "1px solid #1e2438", borderRadius: 14,
                  padding: 20, cursor: "pointer", transition: "all 0.2s",
                }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2438"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <Avatar person={person} size={44} />
                    <div>
                      <div style={{ color: "#f0f4ff", fontWeight: 700, fontSize: 15 }}>{person.name}</div>
                      <div style={{ color: "#6b7a99", fontSize: 12 }}>{person.role}</div>
                    </div>
                  </div>
                  <div style={{ height: 4, background: "#1a1e2e", borderRadius: 2, marginBottom: 12 }}>
                    <div style={{ height: "100%", width: `${strength}%`, background: "linear-gradient(to right, #3b82f6, #8b5cf6)", borderRadius: 2 }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#f59e0b", fontSize: 12 }}>⭐ {coachCount}</span>
                    <span style={{ color: "#3b82f6", fontSize: 12 }}>✅ {indCount}</span>
                    <span style={{ color: "#22c55e", fontSize: 12 }}>🌱 {growthCount} goals</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === "team" && selectedPerson && (
          <PersonProfile person={selectedPerson} ratings={ratings} growthInterest={growthInterest}
            toggleGrowth={toggleGrowth} setRating={setRating} />
        )}

        {view === "skills" && !selectedSkill && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {Object.entries(CATEGORIES).map(([catId, cat]) => (
              <div key={catId}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, padding: "6px 0" }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: cat.color }} />
                  <span style={{ color: cat.color, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{cat.label.toUpperCase()}</span>
                </div>
                {SKILLS.filter(s => s.category === catId).map(skill => {
                  const coaches = TEAM.filter(p => ratings[p.id]?.[skill.id] === "coach").length;
                  const inds = TEAM.filter(p => ratings[p.id]?.[skill.id] === "independent").length;
                  const isRisk = coaches + inds <= 1;
                  return (
                    <div key={skill.id} onClick={() => setSelectedSkill(skill)} style={{
                      background: "#13161e", border: `1px solid ${isRisk ? "rgba(239,68,68,0.3)" : "#1e2438"}`,
                      borderRadius: 10, padding: "12px 16px", marginBottom: 8, cursor: "pointer",
                      transition: "all 0.15s",
                    }} onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = isRisk ? "rgba(239,68,68,0.3)" : "#1e2438"; }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ color: "#c0cce8", fontWeight: 600, fontSize: 14 }}>{skill.name}</span>
                        {isRisk && <span style={{ color: "#ef4444", fontSize: 10, fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>⚠ RISK</span>}
                      </div>
                      <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                        <span style={{ color: "#f59e0b", fontSize: 12 }}>⭐ {coaches}</span>
                        <span style={{ color: "#3b82f6", fontSize: 12 }}>✅ {inds}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}

        {view === "skills" && selectedSkill && (
          <SkillDetail skill={selectedSkill} ratings={ratings} growthInterest={growthInterest} />
        )}
      </main>
    </div>
  );
}
