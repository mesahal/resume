"""Build the house demo's resume from confirmed public portfolio facts."""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4

root = Path(__file__).resolve().parents[1]
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='Name', fontName='Helvetica-Bold', fontSize=26, leading=31, textColor=HexColor('#233f3c'), spaceAfter=5))
styles.add(ParagraphStyle(name='Role', fontName='Helvetica', fontSize=12, leading=17, textColor=HexColor('#344fc0'), spaceAfter=8))
styles.add(ParagraphStyle(name='SectionLabel', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=HexColor('#344fc0'), spaceBefore=10, spaceAfter=6))
styles.add(ParagraphStyle(name='Entry', fontName='Helvetica-Bold', fontSize=10.5, leading=13, spaceAfter=3))
styles.add(ParagraphStyle(name='Copy', fontName='Helvetica', fontSize=9.2, leading=12.2, spaceAfter=4, textColor=HexColor('#253330')))
styles.add(ParagraphStyle(name='MetaLine', fontName='Helvetica', fontSize=8.4, leading=12, spaceAfter=5, textColor=HexColor('#53635e')))
flow=[]
def p(text, style='Copy'):
    return Paragraph(text, styles[style])
def section(title): flow.append(p(title.upper(), 'SectionLabel'))
def entry(title, meta, text): flow.append(KeepTogether([p(title,'Entry'),p(meta,'MetaLine'),p(text)]))
flow += [p('Md Sahal','Name'), p('Software Engineer II','Role'),p('Dhaka, Bangladesh | <link href="mailto:mdsahal.info@gmail.com">mdsahal.info@gmail.com</link>','MetaLine'),p('<link href="https://github.com/mesahal">github.com/mesahal</link> | <link href="https://www.linkedin.com/in/me-sahal/">linkedin.com/in/me-sahal</link> | <link href="https://mdsahal.netlify.app/">mdsahal.netlify.app</link>','MetaLine')]
section('Profile')
flow.append(p('Software engineer building web applications, backend services, and mobile experiences. Professional contributions span restaurant website tools, remittance operations, iOS interfaces, and data-processing workflows. Independent developer of the published Android game Word Detective: Word Puzzle.'))
section('Experience')
entry('Brain Station 23 - Software Engineer II', 'Current title | Company tenure: April 2024 - Present', 'Contribute to web and mobile products, REST APIs, integrations, and data workflows. Work includes Accelera GP - Noshinow website-builder controls, My Butterfly iOS interfaces and API integration, City Remit backend services, and Omnizia batch processing and assisted summaries.')
entry('Synesis IT - Trainee Programmer', 'August 2023 - March 2024', 'Contributed to Convay, an enterprise video-conferencing platform: meeting scheduling APIs, recording alerts, and improvements to real-time sessions.')
entry('BdOSN Girls Programming Camp - Programming Instructor', '2020 - 2021', 'Taught algorithms, data structures, and competitive programming through online programming classes.')
section('Selected work')
entry('Accelera GP - Noshinow', 'Professional team contribution | Next.js, React, TypeScript, Tailwind CSS', 'Website-builder improvements covering configurable headers, rich-text formatting, galleries, and consistency between editing and published content.')
entry('Word Detective: Word Puzzle', 'Independent Android product | Flutter, Dart, Supabase', 'Built and published a word game with offline puzzles and online duels. <link color="#344fc0" href="https://play.google.com/store/apps/details?id=com.mdsahal.worddetective">View on Google Play</link>.')
entry('My Butterfly', 'Professional iOS contribution | Swift, SwiftUI, Xcode', 'Contributed user interfaces, API integration, and application delivery workflows. <link color="#344fc0" href="https://apps.apple.com/sg/app/my-butterfly/id6800672279">View on the App Store</link>.')
section('Skills')
flow.append(p('<b>Backend:</b> Java, Spring Boot, REST APIs, Spring Security, Spring Data JPA, Spring Batch<br/><b>Web &amp; mobile:</b> React, Next.js, TypeScript, JavaScript, Vue, Tailwind CSS, SwiftUI, Flutter, Dart<br/><b>Data &amp; delivery:</b> Oracle, MySQL, PostgreSQL, Supabase, Git, Docker, Jenkins, CI/CD, Linux<br/><b>AI workflows:</b> OpenAI API, Claude Code, Cursor, ChatGPT'))
section('Education')
entry('Jahangirnagar University - BSc in Information Technology', 'February 2018 - March 2023 | CGPA 3.51 / 4.00', 'Institute of Information Technology')
# Keep the resume concise: secondary schooling, writing, and the wider archive remain on the website.
def footer(canvas, doc):
    canvas.setFont('Helvetica',8);canvas.setFillColor(HexColor('#67756f'));canvas.drawString(44,28,'Md Sahal | Updated October 2026');canvas.drawRightString(A4[0]-44,28,str(doc.page))
SimpleDocTemplate(str(root/'public/resume-2026.pdf'),pagesize=A4,rightMargin=44,leftMargin=44,topMargin=30,bottomMargin=40,title='Md Sahal - Software Engineer II',author='Md Sahal').build(flow,onFirstPage=footer,onLaterPages=footer)
