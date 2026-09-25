import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_pdf(output_path):
    # Standard 0.35 in margins for compact 1-page fit
    margin = 25  # points (~0.35 in)
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=margin,
        rightMargin=margin,
        topMargin=22,
        bottomMargin=20,
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    name_style = ParagraphStyle(
        'DocName',
        fontName='Helvetica-Bold',
        fontSize=15.5,
        leading=17,
        alignment=1, # Center
        textColor=colors.HexColor('#0f172a'),
    )
    
    contact_style = ParagraphStyle(
        'DocContact',
        fontName='Helvetica',
        fontSize=8.0,
        leading=10.5,
        alignment=1,
        textColor=colors.HexColor('#334155'),
    )
    
    sec_title_style = ParagraphStyle(
        'DocSectionTitle',
        fontName='Helvetica-Bold',
        fontSize=9.2,
        leading=11.5,
        textColor=colors.HexColor('#0f172a'),
        textTransform='uppercase',
        spaceBefore=0,
        spaceAfter=0,
    )
    
    item_title_style = ParagraphStyle(
        'DocItemTitle',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=10.5,
        textColor=colors.HexColor('#0f172a'),
    )

    item_date_style = ParagraphStyle(
        'DocItemDate',
        fontName='Helvetica-Bold',
        fontSize=8.0,
        leading=10.5,
        alignment=2, # Right
        textColor=colors.HexColor('#475569'),
    )
    
    item_subtitle_style = ParagraphStyle(
        'DocItemSubtitle',
        fontName='Helvetica',
        fontSize=8.0,
        leading=9.5,
        textColor=colors.HexColor('#334155'),
    )
    
    tech_stack_style = ParagraphStyle(
        'DocTechStack',
        fontName='Helvetica-Oblique',
        fontSize=7.8,
        leading=9.5,
        textColor=colors.HexColor('#1d4ed8'),
    )
    
    body_style = ParagraphStyle(
        'DocBody',
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=colors.HexColor('#334155'),
        alignment=4, # Justified
    )
    
    bullet_style = ParagraphStyle(
        'DocBullet',
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=colors.HexColor('#334155'),
        leftIndent=10,
        firstLineIndent=-7,
        alignment=4,
    )

    skill_label_style = ParagraphStyle(
        'DocSkillLabel',
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=9.8,
        textColor=colors.HexColor('#0f172a'),
    )

    skill_val_style = ParagraphStyle(
        'DocSkillVal',
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=colors.HexColor('#334155'),
    )

    story = []

    # 1. Header
    story.append(Paragraph("SYED MUHAMMAD AYYAN IBRAR", name_style))
    story.append(Spacer(1, 2))
    contact_text = (
        'Lahore, Pakistan &nbsp;|&nbsp; +92 322 0621975 &nbsp;|&nbsp; '
        '<a href="mailto:syedmuhammadayyanibrar@gmail.com"><font color="#1d4ed8">syedmuhammadayyanibrar@gmail.com</font></a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/ayyan-ibrar"><font color="#1d4ed8">linkedin.com/in/ayyan-ibrar</font></a> &nbsp;|&nbsp; '
        '<a href="https://github.com/syedmuhammadayyanibrar"><font color="#1d4ed8">github.com/syedmuhammadayyanibrar</font></a> &nbsp;|&nbsp; '
        '<a href="https://syedmuhammadayyanibrar.github.io/resume/"><font color="#1d4ed8">syedmuhammadayyanibrar.github.io/resume</font></a>'
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor('#0f172a'), spaceBefore=1, spaceAfter=4))

    # Helper function for section headings
    def add_section_header(title):
        story.append(Paragraph(title, sec_title_style))
        story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor('#cbd5e1'), spaceBefore=1, spaceAfter=3))

    # 2. Professional Summary
    add_section_header("Professional Summary")
    summary_text = (
        "<b>Enterprise AI Systems Engineer</b> specializing in deterministic multi-agent federations, automated regulatory governance, "
        "and high-stakes decision workflows. Experienced in engineering autonomous contract lifecycle systems (CAS), EU AI Act compliance "
        "auditing (ComplianceOps), and multi-agent commercial deal bargaining using Python, FastAPI, LangGraph, Google Gemini, and PostgreSQL. "
        "Demonstrated expertise in eliminating hallucination risk in high-liability environments and accelerating commercial business cycles."
    )
    story.append(Paragraph(summary_text, body_style))
    story.append(Spacer(1, 4))

    # 3. Experience (First as advised)
    add_section_header("Professional Experience")
    
    # Exp 1
    exp1_row = [
        Paragraph("<b>Freelance AI Systems Engineer</b> &nbsp;|&nbsp; Self-Employed", item_title_style),
        Paragraph("2024 – Present", item_date_style)
    ]
    t_exp1 = Table([exp1_row], colWidths=[430, 130])
    t_exp1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp1)
    story.append(Paragraph("• Architected and deployed production-grade agentic AI pipelines and backend services for commercial clients, integrating LLMs with deterministic validation schemas and PostgreSQL persistence.", bullet_style))
    story.append(Paragraph("• Designed automated data-ingestion and validation workflows for heterogeneous data sources, reducing downstream processing overhead by 60% and enforcing cryptographic audit trails.", bullet_style))
    story.append(Paragraph("• Implemented dual-key human authorization safety controllers preventing unauthorized external API writes in enterprise integrations with Slack and Linear.", bullet_style))
    story.append(Spacer(1, 2))

    # Exp 2
    exp2_row = [
        Paragraph("<b>Advanced AI Bootcamp Fellow</b> &nbsp;|&nbsp; Ghulam Ishaq Khan Institute (GIKI) • Grade A", item_title_style),
        Paragraph("2026", item_date_style)
    ]
    t_exp2 = Table([exp2_row], colWidths=[430, 130])
    t_exp2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_exp2)
    story.append(Paragraph("• Completed rigorous engineering program focused on applied multi-agent architectures, LLM orchestration, evaluation harnesses, and production MLOps deployment.", bullet_style))
    story.append(Spacer(1, 4))

    # 4. Featured Enterprise Projects
    add_section_header("Featured Enterprise Projects")

    # Project 1: CAS
    p1_row = [
        Paragraph("<b>Contract Agentic Society (CAS) — Enterprise Contract Lifecycle Mesh</b>", item_title_style),
        Paragraph('<a href="https://github.com/syedmuhammadayyanibrar/CAS"><font color="#1d4ed8">github.com/.../CAS</font></a>', item_date_style)
    ]
    t_p1 = Table([p1_row], colWidths=[430, 130])
    t_p1.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_p1)
    story.append(Paragraph("Python 3.12, FastAPI, Google Gemini API, Fastn MCP Nervous System, PostgreSQL, asyncpg, Docker, React", tech_stack_style))
    story.append(Paragraph("• Architected a federation of 6 autonomous agent societies (Contract, Risk, Negotiation, Compliance, Obligation, Dispute) to automate B2B contract lifecycles from intake to post-signature monitoring, <b>reducing review turnaround by 75%</b>.", bullet_style))
    story.append(Paragraph("• Engineered an adversarial Risk Intelligence debate pipeline (Prosecution vs. Defense) that stress-tests clauses, eliminating ungrounded alarms with <b>100% benchmark defense grounding</b>.", bullet_style))
    story.append(Paragraph("• Integrated enterprise nervous system via <b>Fastn MCP workflows</b>, automating DocuSign intake, Slack risk escalation, and Google Calendar SLA milestone tracking.", bullet_style))
    story.append(Paragraph("• Built automated benchmark suite evaluating clause extraction completeness (100%) and liability calibration across diverse commercial agreements.", bullet_style))
    story.append(Spacer(1, 2))

    # Project 2: ComplianceOps
    p2_row = [
        Paragraph("<b>ComplianceOps — Evidence-Driven AI Compliance Auditor</b>", item_title_style),
        Paragraph('<a href="https://github.com/syedmuhammadayyanibrar/compliance-ops"><font color="#1d4ed8">github.com/.../compliance-ops</font></a>', item_date_style)
    ]
    t_p2 = Table([p2_row], colWidths=[430, 130])
    t_p2.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_p2)
    story.append(Paragraph("LangGraph, Python, FastAPI, Next.js, pgvector, PostgreSQL, Slack API, Linear API", tech_stack_style))
    story.append(Paragraph("• Developed an autonomous compliance auditing platform for enterprise AI systems under the <b>EU AI Act</b>, eliminating manual multi-week audit cycles.", bullet_style))
    story.append(Paragraph("• Orchestrated stateful LangGraph workflows that gather evidence across GitHub repositories and Google Drive policies with <b>99.3% evidence accuracy</b>.", bullet_style))
    story.append(Paragraph("• Enforced deterministic safety gate requiring dual-key human approval before Linear remediation ticket execution, achieving <b>100.0% policy gate compliance</b> across 8 evaluation metrics.", bullet_style))
    story.append(Spacer(1, 2))

    # Project 3: Negotiation Engine
    p3_row = [
        Paragraph("<b>Autonomous B2B Deal &amp; Procurement Negotiation Engine</b>", item_title_style),
        Paragraph('<a href="https://github.com/syedmuhammadayyanibrar/negotiation_agent"><font color="#1d4ed8">github.com/.../negotiation_agent</font></a>', item_date_style)
    ]
    t_p3 = Table([p3_row], colWidths=[430, 130])
    t_p3.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_p3)
    story.append(Paragraph("LangGraph, Groq LLM, FastAPI, Redis Checkpoints, Qdrant Vector DB, PostgreSQL, LangSmith", tech_stack_style))
    story.append(Paragraph("• Engineered a decentralized multi-agent bargaining engine where buyer and vendor agents autonomously negotiate enterprise vendor contracts and cloud SLA agreements to prevent commercial deadlocks.", bullet_style))
    story.append(Paragraph("• Implemented an asynchronous <b>17-message state-machine protocol</b> with sequence enforcement, message deduplication, and coalition formation resolving deadlocked multi-party disputes.", bullet_style))
    story.append(Paragraph("• Developed behavioral trust modeling in Qdrant tracking counterparty concession velocity and contradictory claims across deal sessions, penalizing bad-faith posturing.", bullet_style))
    story.append(Spacer(1, 2))

    # Project 4: AuraSight
    p4_row = [
        Paragraph("<b>AuraSight — Edge-Native Voice Transaction &amp; Accounting System</b>", item_title_style),
        Paragraph('<a href="https://github.com/syedmuhammadayyanibrar/AuraSight"><font color="#1d4ed8">github.com/.../AuraSight</font></a>', item_date_style)
    ]
    t_p4 = Table([p4_row], colWidths=[430, 130])
    t_p4.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_p4)
    story.append(Paragraph("Kotlin, Jetpack Compose, Whisper ONNX, Gemma 4, CameraX, SQLite / Room, Android SDK", tech_stack_style))
    story.append(Paragraph("• Built an offline-first multimodal retail transaction assistant enabling visually impaired shopkeepers to independently manage billing, currency verification, and credit ledgers (<i>Khata</i>) in Urdu.", bullet_style))
    story.append(Paragraph("• Designed constrained function-calling architecture enforcing deterministic schema execution for financial calculations, guaranteeing <b>zero arithmetic hallucinations</b>.", bullet_style))
    story.append(Paragraph("• Integrated local Whisper ONNX speech-to-text with physical hardware volume triggers for fast, reliable operation in noisy environments.", bullet_style))
    story.append(Spacer(1, 4))

    # 5. Education & Honors
    add_section_header("Education &amp; Honors")
    edu_row = [
        Paragraph("<b>The Islamia University of Bahawalpur</b> &nbsp;|&nbsp; Bachelor of Science in Artificial Intelligence • <b>CGPA: 3.76</b>", item_title_style),
        Paragraph("2022 – 2026", item_date_style)
    ]
    t_edu = Table([edu_row], colWidths=[430, 130])
    t_edu.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('BOTTOMPADDING', (0,0), (-1,-1), 0), ('TOPPADDING', (0,0), (-1,-1), 0)]))
    story.append(t_edu)
    story.append(Paragraph("<b>Honors:</b> Recipient of Prime Minister's Laptop Scheme Award (National Merit Scholarship). Coursework: Multi-Agent Systems, Natural Language Processing, Deep Learning, Game Theory, Data Structures &amp; Algorithms.", body_style))
    story.append(Spacer(1, 4))

    # 6. Technical Skills
    add_section_header("Technical Skills")
    skills_data = [
        [Paragraph("<b>Agent Orchestration:</b>", skill_label_style), Paragraph("Multi-Agent Federations, LangGraph, State Machines, Google Gemini API, Fastn MCP, Tool-Calling, RAG, Adversarial Verification", skill_val_style)],
        [Paragraph("<b>Backend &amp; Infrastructure:</b>", skill_label_style), Paragraph("Python 3.12 (Advanced AsyncIO), FastAPI, PostgreSQL, asyncpg, Redis, Qdrant, ChromaDB, pgvector, Docker, PyTest, CI/CD", skill_val_style)],
        [Paragraph("<b>Governance &amp; Safety:</b>", skill_label_style), Paragraph("EU AI Act Compliance, Dual-Key HITL Authorization, Expected Calibration Error (ECE), Behavioral Trust Modeling, OWASP Top 10", skill_val_style)],
        [Paragraph("<b>Edge &amp; Mobile AI:</b>", skill_label_style), Paragraph("On-Device Whisper ONNX, Gemma 4 Multimodal, CameraX, Kotlin, Jetpack Compose, SQLite / Room", skill_val_style)],
    ]
    t_skills = Table(skills_data, colWidths=[125, 435])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0.5),
        ('TOPPADDING', (0,0), (-1,-1), 0.5),
    ]))
    story.append(t_skills)

    doc.build(story)
    print(f"Generated successfully: {output_path}")

if __name__ == '__main__':
    out_pdf = r"C:\Users\syedm\resume\Ayyan_Ibrar_Resume.pdf"
    generate_pdf(out_pdf)
