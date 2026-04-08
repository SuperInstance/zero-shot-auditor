interface Env {
  AUDIT_EVIDENCE: KVNamespace;
  AI: any;
}

interface AuditRequest {
  vessel: string;
  mutation: {
    action: string;
    payload: any;
    timestamp: string;
    actor: string;
  };
}

interface AuditEvidence {
  vessel: string;
  mutation: AuditRequest['mutation'];
  timestamp: string;
  personas: {
    regulator: string;
    attacker: string;
    user: string;
    developer: string;
    auditor: string;
  };
  eu_ai_act: {
    risk_level: 'minimal' | 'limited' | 'high' | 'unacceptable';
    articles: string[];
    compliance_status: 'compliant' | 'requires_review' | 'non_compliant';
  };
  markdown_report: string;
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zero-Shot Auditor</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', sans-serif;
            background: #0a0a0f;
            color: #e2e8f0;
            line-height: 1.6;
            min-height: 100vh;
            padding: 20px;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        header {
            text-align: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 1px solid #1e293b;
        }
        h1 {
            font-size: 2.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 1.2rem;
            color: #94a3b8;
            max-width: 600px;
            margin: 0 auto;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            margin-bottom: 40px;
        }
        .card {
            background: #111827;
            border-radius: 12px;
            padding: 24px;
            border: 1px solid #1e293b;
            transition: transform 0.2s, border-color 0.2s;
        }
        .card:hover {
            transform: translateY(-4px);
            border-color: #6366f1;
        }
        .card h3 {
            color: #6366f1;
            margin-bottom: 12px;
            font-size: 1.3rem;
        }
        .card p {
            color: #cbd5e1;
            font-size: 0.95rem;
        }
        .endpoint {
            background: #0f172a;
            padding: 16px;
            border-radius: 8px;
            margin-top: 12px;
            font-family: monospace;
            border-left: 4px solid #6366f1;
        }
        .method {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 6px;
            font-weight: 600;
            font-size: 0.85rem;
            margin-right: 10px;
        }
        .post { background: #10b981; color: white; }
        .get { background: #3b82f6; color: white; }
        footer {
            text-align: center;
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #1e293b;
            color: #64748b;
            font-size: 0.9rem;
        }
        .fleet {
            color: #6366f1;
            font-weight: 600;
        }
        .badge {
            display: inline-block;
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: 8px;
        }
        .compliant { background: #10b98120; color: #10b981; }
        .review { background: #f59e0b20; color: #f59e0b; }
        .non-compliant { background: #ef444420; color: #ef4444; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Zero-Shot Auditor</h1>
            <p class="subtitle">Every vessel mutation ships with auto-generated compliance evidence. Five-persona audit with EU AI Act mapping.</p>
        </header>
        
        <div class="grid">
            <div class="card">
                <h3>POST /api/audit</h3>
                <p>Submit a vessel mutation for automatic compliance audit. Returns comprehensive evidence from all five personas.</p>
                <div class="endpoint">
                    <span class="method post">POST</span>
                    <code>/api/audit</code>
                </div>
            </div>
            
            <div class="card">
                <h3>GET /api/evidence/:vessel</h3>
                <p>Retrieve audit evidence for a specific vessel. Includes all historical mutations and compliance status.</p>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <code>/api/evidence/{vessel_id}</code>
                </div>
            </div>
            
            <div class="card">
                <h3>GET /api/report</h3>
                <p>Generate and download a comprehensive audit report in markdown format (ZERO-SHOT-AUDIT.md).</p>
                <div class="endpoint">
                    <span class="method get">GET</span>
                    <code>/api/report</code>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h3>Five-Persona Audit System</h3>
            <p>Each mutation is analyzed through five distinct perspectives:</p>
            <ul style="margin-top: 12px; padding-left: 20px; color: #cbd5e1;">
                <li><strong>Regulator:</strong> Compliance with legal frameworks</li>
                <li><strong>Attacker:</strong> Security vulnerability assessment</li>
                <li><strong>User:</strong> Usability and ethical impact</li>
                <li><strong>Developer:</strong> Technical implementation quality</li>
                <li><strong>Auditor:</strong> Evidence completeness and verifiability</li>
            </ul>
        </div>
        
        <footer>
            <p>Part of the <span class="fleet">Fleet</span> ecosystem • Zero-Shot Auditor v1.0 • Every mutation ships with compliance evidence</p>
            <p style="margin-top: 8px;">EU AI Act Mapping: Article 5 (Prohibited Practices), Article 10 (Data Quality), Article 13 (Transparency)</p>
        </footer>
    </div>
</body>
</html>`;

async function generateAuditEvidence(vessel: string, mutation: any, env: Env): Promise<AuditEvidence> {
  const timestamp = new Date().toISOString();
  
  const prompt = `Analyze this vessel mutation through five personas:

Vessel: ${vessel}
Mutation Action: ${mutation.action}
Payload: ${JSON.stringify(mutation.payload)}
Actor: ${mutation.actor}
Timestamp: ${mutation.timestamp}

Generate concise analysis for each persona (max 150 words each):

1. REGULATOR: Focus on legal compliance, regulatory frameworks, and adherence to standards.
2. ATTACKER: Identify security vulnerabilities, exploit potential, and attack vectors.
3. USER: Assess usability impact, ethical considerations, and user experience.
4. DEVELOPER: Evaluate technical implementation, code quality, and maintainability.
5. AUDITOR: Determine evidence completeness, audit trail quality, and verification requirements.

Also assess EU AI Act compliance:
- Risk level: minimal, limited, high, or unacceptable
- Relevant articles (from Articles 5, 10, 13, 16, 29, 52)
- Compliance status: compliant, requires_review, or non_compliant

Return JSON only with this structure:
{
  "personas": {
    "regulator": "analysis",
    "attacker": "analysis", 
    "user": "analysis",
    "developer": "analysis",
    "auditor": "analysis"
  },
  "eu_ai_act": {
    "risk_level": "level",
    "articles": ["art1", "art2"],
    "compliance_status": "status"
  }
}`;

  const aiResponse = await env.AI.run('@cf/meta/llama-3.3-70b-instruct-fp8-fast', {
    prompt: prompt,
    max_tokens: 2000
  });

  let parsedResponse;
  try {
    const jsonMatch = aiResponse.response.match(/\{[\s\S]*\}/);
    parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : {
      personas: {
        regulator: "Analysis generation failed",
        attacker: "Analysis generation failed",
        user: "Analysis generation failed",
        developer: "Analysis generation failed",
        auditor: "Analysis generation failed"
      },
      eu_ai_act: {
        risk_level: "high",
        articles: ["Article 10"],
        compliance_status: "requires_review"
      }
    };
  } catch {
    parsedResponse = {
      personas: {
        regulator: "Analysis generation failed",
        attacker: "Analysis generation failed",
        user: "Analysis generation failed",
        developer: "Analysis generation failed",
        auditor: "Analysis generation failed"
      },
      eu_ai_act: {
        risk_level: "high",
        articles: ["Article 10"],
        compliance_status: "requires_review"
      }
    };
  }

  const markdownReport = `# ZERO-SHOT-AUDIT.md
## Vessel: ${vessel}
### Mutation Audit Report
**Timestamp:** ${timestamp}
**Mutation Action:** ${mutation.action}
**Actor:** ${mutation.actor}

## Five-Persona Analysis

### 1. Regulator Perspective
${parsedResponse.personas.regulator}

### 2. Attacker Perspective  
${parsedResponse.personas.attacker}

### 3. User Perspective
${parsedResponse.personas.user}

### 4. Developer Perspective
${parsedResponse.personas.developer}

### 5. Auditor Perspective
${parsedResponse.personas.auditor}

## EU AI Act Compliance Assessment
**Risk Level:** ${parsedResponse.eu_ai_act.risk_level.toUpperCase()}
**Relevant Articles:** ${parsedResponse.eu_ai_act.articles.join(', ')}
**Compliance Status:** ${parsedResponse.eu_ai_act.compliance_status.toUpperCase()}

## Evidence Metadata
- Audit Generated: ${timestamp}
- Evidence ID: ${vessel}-${Date.now()}
- Audit Method: Zero-Shot AI Analysis

---
*This audit was automatically generated by Zero-Shot Auditor.*`;

  const evidence: AuditEvidence = {
    vessel,
    mutation,
    timestamp,
    personas: parsedResponse.personas,
    eu_ai_act: parsedResponse.eu_ai_act,
    markdown_report: markdownReport
  };

  return evidence;
}

function setSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;");
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  return new Response(response.body, { headers, status: response.status });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === 'GET' && path === '/') {
      const response = new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
      });
      return setSecurityHeaders(response);
    }

    if (request.method === 'GET' && path === '/health') {
      return new Response(JSON.stringify({ status: 'ok' }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST' && path === '/api/audit') {
      try {
        const body: AuditRequest = await request.json();
        
        if (!body.vessel || !body.mutation) {
          return new Response(JSON.stringify({ error: 'Missing vessel or mutation' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const evidence = await generateAuditEvidence(body.vessel, body.mutation, env);
        
        await env.AUDIT_EVIDENCE.put(
          `evidence:${body.vessel}:${Date.now()}`,
          JSON.stringify(evidence),
          { expirationTtl: 604800 }
        );

        await env.AUDIT_EVIDENCE.put(
          `vessel:${body.vessel}:latest`,
          JSON.stringify(evidence)
        );

        const response = new Response(JSON.stringify(evidence), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        });
        return setSecurityHeaders(response);
      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    if (request.method === 'GET' && path.startsWith('/api/evidence/')) {
      const vessel = path.split('/').pop();
      if (!vessel) {
        return new Response(JSON.stringify({ error: 'Vessel ID required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const latest = await env.AUDIT_EVIDENCE.get(`vessel:${vessel}:latest`);
      if (!latest) {
        return new Response(JSON.stringify({ error: 'No evidence found for vessel' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const response = new Response(latest, {
        headers: { 'Content-Type': 'application/json' }
      });
      return setSecurityHeaders(response);
    }

    if (request.method === 'GET' && path === '/api/report') {
      const vessel = url.searchParams.get('vessel');
      
      if (!vessel) {
        return new Response(JSON.stringify({ error: 'Vessel parameter required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const latest = await env.AUDIT_EVIDENCE.get(`vessel:${vessel}:latest`);
      if (!latest) {
        return new Response(JSON.stringify({ error: 'No evidence found for vessel' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const evidence: AuditEvidence = JSON.parse(latest);
      const response = new Response(evidence.markdown_report, {
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          'Content-Disposition': `attachment; filename="ZERO-SHOT-AUDIT-${vessel}.md"`
        }
      });
      return setSecurityHeaders(response);
    }

    const response = new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
    return setSecurityHeaders(response);
  }
};