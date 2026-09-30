# Generates a clean one-page resume PDF for the portfolio's "Download Resume" button
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.lib.utils import simpleSplit

W, H = A4
ORANGE = HexColor("#f97316")
DARK = HexColor("#0f172a")
GRAY = HexColor("#475569")
LIGHT = HexColor("#94a3b8")

c = canvas.Canvas("/home/z/my-project/public/Atong-Glory-Resume.pdf", pagesize=A4)

def txt(x, y, s, size=10, font="Helvetica", color=GRAY):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString(x, y, s)

# Header band
c.setFillColor(DARK)
c.rect(0, H - 46*mm, W, 46*mm, fill=1, stroke=0)
c.setFillColor(ORANGE)
c.rect(0, H - 48*mm, W, 2*mm, fill=1, stroke=0)

txt(20*mm, H - 20*mm, "ATONG GLORY", 26, "Helvetica-Bold", HexColor("#ffffff"))
txt(20*mm, H - 26.5*mm, "Frontend Developer · UI/UX & Graphics Designer", 13, "Helvetica-Bold", ORANGE)
txt(20*mm, H - 33*mm, "atongglory17@gmail.com   |   github.com/atongglory   |   linkedin.com/in/atongglory", 9, "Helvetica", LIGHT)

y = H - 58*mm

def heading(label):
    global y
    txt(20*mm, y, label.upper(), 11, "Helvetica-Bold", DARK)
    c.setStrokeColor(ORANGE); c.setLineWidth(1.2)
    c.line(20*mm, y - 2.2*mm, 70*mm, y - 2.2*mm)
    y -= 9*mm

def para(s, size=9.5, x=20*mm, w=W-40*mm, color=GRAY, leading=4.6*mm):
    global y
    for line in simpleSplit(s, "Helvetica", size, w):
        txt(x, y, line, size, "Helvetica", color)
        y -= leading

def item(left, right):
    global y
    txt(20*mm, y, left, 10, "Helvetica-Bold", DARK)
    txt(W-20*mm, y, right, 9, "Helvetica", ORANGE)
    y -= 5.2*mm

heading("Summary")
para("Frontend Developer, UI/UX & Graphics Designer crafting fast, accessible and visually striking web interfaces. Blends clean code with strong visual design sense — from wireframes and mockups to pixel-perfect React builds. Problem-solver passionate about turning ideas into polished digital products people love to use.")
y -= 3*mm

heading("Experience")
item("Senior Full-Stack Developer — TechNova Labs", "2022 – Present")
para("Lead development of a SaaS analytics platform serving 50k+ daily events. Built real-time dashboards with React and Node.js, cut API p95 latency by 40%, and mentor a team of 4 engineers.")
y -= 2.5*mm
item("Full-Stack Developer — BrightApps Studio", "2019 – 2022")
para("Delivered 20+ client projects: e-commerce platforms, booking systems, and custom CMS builds. Owned features end-to-end from database schema to pixel-perfect UI.")
y -= 2.5*mm
item("Junior Web Developer — PixelWorks", "2018 – 2019")
para("Developed responsive marketing sites and internal tools with JavaScript, React and Express.")
y -= 3*mm

heading("Key Projects")
item("Analytics Dashboard (React, TypeScript, Recharts)", "2024")
para("Real-time KPI visualization platform with custom report builder and role-based access control.")
y -= 2.5*mm
item("E-Commerce Platform (Next.js, MongoDB, Stripe)", "2023")
para("Full storefront with cart, payments, inventory admin and order tracking for 10k+ SKUs.")
y -= 3*mm

heading("Skills")
para("JavaScript / TypeScript, React, Next.js, Node.js, Express, MongoDB, PostgreSQL, Tailwind CSS, AWS, Docker, GraphQL, Git, Jest")
y -= 3*mm

heading("Education")
item("B.Sc. Computer Science — San Francisco State University", "2014 – 2018")

c.setTitle("Atong Glory — Frontend Developer Resume")
c.save()
print("Resume PDF generated")
