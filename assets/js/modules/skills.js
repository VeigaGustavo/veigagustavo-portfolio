const gustavoAntunes = {
  technologies: {
    frontEnd: {
      languages: ["JavaScript", "Python", "Java", "Dart"],
      frameworks: ["React", "Flutter"],
      styling: ["Bootstrap", "Styled Components"]
    },
    backEnd: {
      languages: ["JavaScript", "Python", "Java"],
      frameworks: ["Node.js", "Express", "Spring"]
    },
    databases: ["MongoDB", "MySQL", "PostgreSQL"],
    devOps: ["Linux", "Git", "Docker"]
  },
  areasOfInterest: [
    "Desenvolvimento Full Stack",
    "DevOps",
    "E-commerce"
  ]
};

function highlight(obj, indent = 0) {
  const pad = n => '  '.repeat(n);
  if (Array.isArray(obj)) {
    if (obj.length > 0 && obj.length <= 4 && obj.every(i => typeof i === 'string')) {
      return `<span class="bracket">[</span><span class="inline-array">${obj.map((v, i) => `<span class="string">\"${v}\"</span>${i < obj.length-1 ? ',' : ''}`).join(' ')}</span><span class="bracket">]</span>`;
    }
    return `<span class="bracket">[</span>${obj.map((v, i) => `\n${pad(indent+1)}${highlight(v, indent+1)}${i < obj.length-1 ? ',' : ''}`).join('')}\n${pad(indent)}<span class="bracket">]</span>`;
  }
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    return `<span class="bracket">{</span>${entries.map(([k, v], i) => `\n${pad(indent+1)}<span class="property">${k}</span>: ${highlight(v, indent+1)}${i < entries.length-1 ? ',' : ''}`).join('')}\n${pad(indent)}<span class="bracket">}</span>`;
  }
  if (typeof obj === 'string') return `<span class="string">\"${obj}\"</span>`;
  if (typeof obj === 'number') return `<span class="number">${obj}</span>`;
  if (typeof obj === 'boolean') return `<span class="keyword">${obj}</span>`;
  return String(obj);
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('code').innerHTML = `<span class="keyword">const</span> <span class="variable">gustavoAntunes</span> <span class="operator">=</span> ${highlight(gustavoAntunes)}<span class="operator">;</span>`;
});