import { useState, useRef, useEffect } from "react";

var PHONE = "918904608193";
function WA(msg) { return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg); }
var TEL = "tel:+918904608193";

var RED = "#D42B2B";
var REDLIGHT = "#E8433A";
var DARK = "#0f1117";
var DARKER = "#0a0b0f";
var CARD = "rgba(255,255,255,0.04)";
var BORDER = "rgba(255,255,255,0.08)";
var GLASS = "rgba(255,255,255,0.06)";

function useInView(ref) {
  var state = useState(false);
  var isVisible = state[0];
  var setIsVisible = state[1];
  useEffect(function() {
    var node = ref.current;
    if (!node) return;
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { setIsVisible(true); }
    }, { threshold: 0.1 });
    observer.observe(node);
    return function() { observer.disconnect(); };
  });
  return isVisible;
}

function AnimatedSection(props) {
  var ref = useRef(null);
  var isVisible = useInView(ref);
  var delay = props.delay || 0;
  return (
    <div ref={ref} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.8s ease " + delay + "s, transform 0.8s ease " + delay + "s",
    }}>
      {props.children}
    </div>
  );
}

function Counter(props) {
  var state = useState(0);
  var count = state[0];
  var setCount = state[1];
  var ref = useRef(null);
  var isVisible = useInView(ref);
  var target = parseInt(props.target) || 0;

  useEffect(function() {
    if (!isVisible) return;
    var duration = 2000;
    var steps = 60;
    var increment = target / steps;
    var current = 0;
    var timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return function() { clearInterval(timer); };
  }, [isVisible, target]);

  return <span ref={ref}>{count}</span>;
}

function NISLogo(props) {
  var size = props.size || 48;
  var h = size * 1.4;
  return <img src="/logo.png" alt="NIS Logo" width={size} height={h} style={{ objectFit: "contain", display: "block" }} />;
}

function Icon(props) {
  var t = props.type;
  var c = props.color || RED;
  var s = props.size || 20;
  if (t === "menu") return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>;
  if (t === "close") return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
  if (t === "phone") return <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  if (t === "whatsapp") return <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>;
  if (t === "mappin") return <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  if (t === "star") return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={c} stroke={c} strokeWidth="1" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
  if (t === "shield") return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke={c} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
  if (t === "zap") return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke={c} strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
  if (t === "truck") return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke={c} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
  if (t === "clock") return <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke={c} strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
  if (t === "arrow") return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>;
  return null;
}

var products = [
  { name: "MS Plates", desc: "Mild Steel plates in various thicknesses (5mm to 100mm). IS 2062 Grade.", sizes: "1250x2500mm, 1500x3000mm, custom", img: "/ms-plates.jpg" },
  { name: "MS Rounds", desc: "Round bars for construction, fabrication and machining. All standard diameters.", sizes: "10mm to 300mm dia", img: "/round-discs.jpg" },
  { name: "Structural Steel", desc: "I-Beams, H-Beams, Channels, Angles and Joists for construction.", sizes: "ISMB, ISMC, ISA - all standard", img: "/precision-cutting.jpg" },
  { name: "Structural Plates", desc: "Heavy-duty plates for structural applications. High tensile and boiler quality.", sizes: "6mm to 120mm, custom cut", img: "/ms-rounds.jpg" },
];

var services = [
  { name: "Industrial Fabrication", desc: "Custom steel fabrication for industrial structures, frames, platforms, and heavy equipment components. End-to-end project execution.", img: "/precision-cutting.jpg" },
  { name: "Oxyfuel Cutting", desc: "Precision oxy-acetylene cutting for thick MS plates and structural steel. Ideal for heavy sections up to 300mm.", img: "/oxyfuel-cutting.jpg" },
  { name: "Plasma Cutting", desc: "High-precision CNC and manual plasma cutting for intricate profiles, cleaner edges, and faster turnaround.", img: "/plasma-cutting.jpg" },
  { name: "Sheet Steel Fabrication", desc: "Bending, rolling, welding, and finishing of sheet steel for enclosures, ducts, hoppers, and custom assemblies.", img: "/ms-rounds.jpg" },
];

var testimonials = [
  { name: "Rajesh Patil", co: "Patil Engineering Works", text: "Reliable supplier with consistent quality. Their plasma cutting service saved us weeks of time on our last project." },
  { name: "Suresh Kulkarni", co: "KMC Constructions", text: "National Industrial Services has been our go-to for structural steel for over 3 years. Competitive pricing and prompt delivery." },
  { name: "Anand Joshi", co: "Joshi Fabricators", text: "Excellent oxyfuel cutting accuracy. The team is knowledgeable and always delivers on time." },
];

var navLinks = ["Home", "Products", "Services", "About", "Contact"];

function Header(props) {
  var scrollState = useState(false);
  var scrolled = scrollState[0];
  var setScrolled = scrollState[1];
  useEffect(function() {
    var h = function() { setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", h);
    return function() { window.removeEventListener("scroll", h); };
  }, []);

  return (
    <header style={{ background: scrolled ? "rgba(10,11,15,0.95)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent", position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all 0.3s ease" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: scrolled ? "8px 20px" : "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "padding 0.3s ease" }}>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }} onClick={function() { props.navigate("Home"); }}>
          <NISLogo size={36} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: 2, lineHeight: 1.1 }}>NATIONAL</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,0.5)", letterSpacing: 4, fontWeight: 600 }}>INDUSTRIAL SERVICES</div>
          </div>
        </div>
        <nav className="desktop-nav">
          {navLinks.map(function(l) {
            return <button key={l} onClick={function() { props.navigate(l); }} className="nav-btn" style={{ background: props.page === l ? RED : "transparent", color: props.page === l ? "#fff" : "rgba(255,255,255,0.7)", border: "none", padding: "8px 16px", borderRadius: 8, fontWeight: 500, fontSize: 14, cursor: "pointer", transition: "all 0.2s" }}>{l}</button>;
          })}
          <a href={TEL} style={{ background: "linear-gradient(135deg, " + RED + ", " + REDLIGHT + ")", color: "#fff", padding: "8px 18px", borderRadius: 8, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}><Icon type="phone" size={16} /> Call Now</a>
        </nav>
        <button onClick={function() { props.setMenuOpen(!props.menuOpen); }} className="mobile-menu-btn" style={{ background: "none", border: "none", color: RED, cursor: "pointer" }}>
          {props.menuOpen ? <Icon type="close" /> : <Icon type="menu" />}
        </button>
      </div>
      {props.menuOpen && (
        <div style={{ background: "rgba(10,11,15,0.98)", backdropFilter: "blur(20px)", padding: "10px 20px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(function(l) {
            return <button key={l} onClick={function() { props.navigate(l); }} style={{ background: props.page === l ? RED : "transparent", color: props.page === l ? "#fff" : "rgba(255,255,255,0.7)", border: "none", padding: "14px 16px", borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: "pointer", textAlign: "left" }}>{l}</button>;
          })}
          <a href={TEL} style={{ background: "linear-gradient(135deg, " + RED + ", " + REDLIGHT + ")", color: "#fff", padding: "14px 16px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center", marginTop: 8 }}>Call Now</a>
        </div>
      )}
    </header>
  );
}

function FooterSection(props) {
  return (
    <footer style={{ background: DARKER, borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px 20px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 40 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <NISLogo size={32} />
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>NATIONAL</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", letterSpacing: 4 }}>INDUSTRIAL SERVICES</div>
            </div>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>Your trusted partner for quality steel supply and industrial fabrication in Belagavi, Karnataka.</p>
        </div>
        <div>
          <h4 style={{ color: "#fff", marginBottom: 16, fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>QUICK LINKS</h4>
          {navLinks.map(function(l) {
            return <div key={l} style={{ marginBottom: 4 }}><button onClick={function() { props.navigate(l); }} className="footer-link" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "6px 0", fontSize: 14, transition: "color 0.2s" }}>{l}</button></div>;
          })}
        </div>
        <div>
          <h4 style={{ color: "#fff", marginBottom: 16, fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>CONTACT</h4>
          <div style={{ fontSize: 14, lineHeight: 2, color: "rgba(255,255,255,0.5)" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}><span style={{ marginTop: 4, color: RED }}><Icon type="mappin" size={16} /></span> 350-3D, Near Khadarwadi Cross, Khanapur Road, Udyambag, Belagavi 590008</div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8 }}><span style={{ color: RED }}><Icon type="phone" size={16} /></span> +91 89046 08193</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 40, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
        {"© 2026 National Industrial Services. All rights reserved."}
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a href={WA("Hi, I would like to enquire about your products and services.")} target="_blank" rel="noopener noreferrer" className="wa-fab" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 99, background: "#25D366", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 24px rgba(37,211,102,0.4)", cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}>
      <Icon type="whatsapp" />
    </a>
  );
}

function HomePage(props) {
  return (
    <div>
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/plasma-cutting.jpg)", backgroundSize: "cover", backgroundPosition: "center", transform: "scale(1.05)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(180deg, rgba(10,11,15,0.7) 0%, rgba(10,11,15,0.85) 50%, rgba(10,11,15,0.98) 100%)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto", textAlign: "center", padding: "120px 20px 80px" }}>
          <AnimatedSection>
            <div style={{ display: "inline-block", background: "rgba(212,43,43,0.12)", color: RED, padding: "8px 20px", borderRadius: 50, fontSize: 13, fontWeight: 600, marginBottom: 24, border: "1px solid rgba(212,43,43,0.2)", backdropFilter: "blur(10px)", letterSpacing: 1 }}>BELAGAVI'S TRUSTED STEEL PARTNER</div>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, margin: "0 0 20px", letterSpacing: -1 }}>Quality Steel Supply &<br /><span style={{ background: "linear-gradient(135deg, " + RED + ", " + REDLIGHT + ")", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Industrial Fabrication</span></h1>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 18, maxWidth: 560, margin: "0 auto 36px", lineHeight: 1.7, fontWeight: 400 }}>MS Plates, Rounds, Structurals and Expert Cutting Services - Oxyfuel, Plasma and Custom Fabrication for every industrial need.</p>
          </AnimatedSection>
          <AnimatedSection delay={0.45}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={WA("Hi, I would like to get a quote for steel products.")} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: "#25D366", color: "#fff", padding: "16px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 4px 20px rgba(37,211,102,0.3)" }}>Get Quote on WhatsApp</a>
              <button onClick={function() { props.navigate("Products"); }} className="btn-outline" style={{ background: "rgba(255,255,255,0.08)", color: "#fff", padding: "16px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15, border: "1px solid rgba(255,255,255,0.15)", cursor: "pointer", backdropFilter: "blur(10px)", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8 }}>View Products <Icon type="arrow" /></button>
            </div>
          </AnimatedSection>
        </div>
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
          <div style={{ width: 28, height: 44, border: "2px solid rgba(255,255,255,0.2)", borderRadius: 14, display: "flex", justifyContent: "center", paddingTop: 8 }}>
            <div style={{ width: 3, height: 10, background: "rgba(255,255,255,0.4)", borderRadius: 2, animation: "scroll 2s infinite" }} />
          </div>
        </div>
      </section>

      <section style={{ background: DARK, padding: "0 20px", position: "relative", zIndex: 2, marginTop: -40 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(135deg, " + RED + ", #991b1b)", borderRadius: 20, padding: "8px", boxShadow: "0 20px 60px rgba(212,43,43,0.2)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
            {[
              { num: "30", suffix: "+", label: "Years Experience" },
              { num: "500", suffix: "+", label: "Projects Completed" },
              { num: "200", suffix: "+", label: "Happy Clients" },
              { num: "4", suffix: "", label: "Cutting Services" },
            ].map(function(s, i) {
              return (
                <div key={i} style={{ textAlign: "center", padding: "28px 10px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none" }}>
                  <div style={{ fontSize: 36, fontWeight: 900, color: "#fff" }}><Counter target={s.num} />{s.suffix}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500, marginTop: 4, letterSpacing: 0.5 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: DARK, padding: "80px 20px 60px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>WHY CHOOSE US</div>
              <h2 style={{ color: "#fff", fontSize: 34, fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>Built on Trust & Precision</h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 16, maxWidth: 500, margin: "0 auto" }}>Delivering quality and reliability since day one</p>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { icon: "shield", title: "Premium Quality", desc: "IS 2062 certified steel. Every product meets industry standards." },
              { icon: "zap", title: "Precision Cutting", desc: "Advanced Plasma and Oxyfuel cutting for accurate profiles." },
              { icon: "truck", title: "Reliable Delivery", desc: "On-time delivery across Belagavi and surrounding districts." },
              { icon: "clock", title: "Quick Turnaround", desc: "Fast quotes and rapid order fulfillment for urgent needs." },
            ].map(function(item, i) {
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="feature-card" style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 16, padding: "32px 24px", textAlign: "center", transition: "all 0.3s ease", cursor: "default", backdropFilter: "blur(10px)" }}>
                    <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(212,43,43,0.08)", border: "1px solid rgba(212,43,43,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Icon type={item.icon} /></div>
                    <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{item.title}</h3>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: DARKER, padding: "80px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>OUR PRODUCTS</div>
              <h2 style={{ color: "#fff", fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>Premium Steel Products</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {products.map(function(p, i) {
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="product-card" style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 16, overflow: "hidden", transition: "all 0.3s ease", backdropFilter: "blur(10px)" }}>
                    <div className="img-container" style={{ width: "100%", height: 200, overflow: "hidden", position: "relative" }}>
                      <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(transparent, rgba(10,11,15,0.8))" }} />
                    </div>
                    <div style={{ padding: "20px 22px 24px" }}>
                      <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.name}</h3>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</p>
                      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 18, padding: "6px 10px", background: "rgba(255,255,255,0.04)", borderRadius: 6, display: "inline-block" }}>Sizes: {p.sizes}</div>
                      <button onClick={function() { window.open(WA("Hi, I am interested in " + p.name + ". Please share pricing and availability."), "_blank"); }} style={{ background: "#25D366", color: "#fff", border: "none", padding: "11px 20px", borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%", transition: "all 0.2s" }}>Enquire on WhatsApp</button>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
          <AnimatedSection delay={0.3}>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button onClick={function() { props.navigate("Products"); }} className="btn-outline" style={{ background: "transparent", color: RED, border: "2px solid " + RED, padding: "14px 36px", borderRadius: 12, fontWeight: 700, cursor: "pointer", fontSize: 15, transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: 8 }}>View All Products <Icon type="arrow" /></button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ background: DARK, padding: "80px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
              <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>TESTIMONIALS</div>
              <h2 style={{ color: "#fff", fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>What Our Clients Say</h2>
            </div>
          </AnimatedSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {testimonials.map(function(t, i) {
              return (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 16, padding: "28px 24px", backdropFilter: "blur(10px)", height: "100%" }}>
                    <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>{[1,2,3,4,5].map(function(j) { return <Icon key={j} type="star" />; })}</div>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>{'"' + t.text + '"'}</p>
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16 }}>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginTop: 2 }}>{t.co}</div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", padding: "100px 20px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "url(/oxyfuel-cutting.jpg)", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(135deg, rgba(185,28,28,0.88) 0%, rgba(10,11,15,0.92) 100%)" }} />
        <AnimatedSection>
          <div style={{ position: "relative", textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
            <h2 style={{ color: "#fff", fontSize: 38, fontWeight: 900, marginBottom: 16, letterSpacing: -0.5 }}>Ready to Get Started?</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 17, marginBottom: 32, lineHeight: 1.6 }}>Get an instant quote on WhatsApp or call us directly</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={WA("Hi, I would like to get a quote.")} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "16px 36px", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 16, boxShadow: "0 4px 24px rgba(37,211,102,0.3)" }}>WhatsApp Us</a>
              <a href={TEL} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", padding: "16px 36px", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 16, backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>Call +91 89046 08193</a>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}

function ProductsPage() {
  return (
    <div style={{ background: DARKER, padding: "100px 20px 60px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>OUR PRODUCTS</div>
          <h1 style={{ color: "#fff", fontSize: 38, fontWeight: 900, marginBottom: 12, letterSpacing: -0.5 }}>Premium Steel Products</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 50, fontSize: 16 }}>Quality steel for industrial and construction applications</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {products.map(function(p, i) {
            return (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="product-card" style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 16, overflow: "hidden", backdropFilter: "blur(10px)" }}>
                  <div className="img-container" style={{ width: "100%", height: 220, overflow: "hidden" }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }} />
                  </div>
                  <div style={{ padding: "24px" }}>
                    <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{p.name}</h2>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                      <strong style={{ color: RED }}>Sizes: </strong>{p.sizes}
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={function() { window.open(WA("Hi, I am interested in " + p.name + ". Please share pricing and availability."), "_blank"); }} style={{ flex: 1, background: "#25D366", color: "#fff", border: "none", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>WhatsApp</button>
                      <a href={TEL} style={{ flex: 1, background: "linear-gradient(135deg, " + RED + ", " + REDLIGHT + ")", color: "#fff", padding: "12px", borderRadius: 10, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center" }}>Call</a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div style={{ background: DARKER, padding: "100px 20px 60px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>OUR SERVICES</div>
          <h1 style={{ color: "#fff", fontSize: 38, fontWeight: 900, marginBottom: 12, letterSpacing: -0.5 }}>Fabrication & Cutting Solutions</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 50, fontSize: 16 }}>End-to-end industrial fabrication and cutting solutions</p>
        </AnimatedSection>
        {services.map(function(s, i) {
          var isReversed = i % 2 === 1;
          return (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="service-card" style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 20, overflow: "hidden", marginBottom: 24, display: "flex", flexDirection: isReversed ? "row-reverse" : "row", flexWrap: "wrap", backdropFilter: "blur(10px)" }}>
                <div className="img-container" style={{ width: 360, minHeight: 240, flexShrink: 0, overflow: "hidden" }}>
                  <img src={s.img} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }} />
                </div>
                <div style={{ flex: 1, padding: "36px 32px", minWidth: 280, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 14 }}>{s.name}</h2>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{s.desc}</p>
                  <div>
                    <button onClick={function() { window.open(WA("Hi, I would like to enquire about your " + s.name + " service. Please share details."), "_blank"); }} style={{ background: "#25D366", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>Enquire on WhatsApp</button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ background: DARKER, padding: "100px 20px 60px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>ABOUT US</div>
          <h1 style={{ color: "#fff", fontSize: 38, fontWeight: 900, marginBottom: 12, letterSpacing: -0.5 }}>Your Trusted Steel Partner</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 40, fontSize: 16 }}>Belagavi's leading steel supplier since 1996</p>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 20, overflow: "hidden", backdropFilter: "blur(10px)" }}>
            <div style={{ width: "100%", height: 300, overflow: "hidden", position: "relative" }}>
              <img src="/plasma-cutting.jpg" alt="Our Workshop" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(transparent, rgba(10,11,15,0.9))" }} />
            </div>
            <div style={{ padding: "36px 36px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
                <NISLogo size={48} />
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: 2 }}>NATIONAL</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 4 }}>INDUSTRIAL SERVICES</div>
                </div>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
                <strong style={{ color: RED }}>National Industrial Services</strong> is a Belagavi-based steel supply and industrial fabrication company located in the heart of Udyambag's industrial belt. We specialize in supplying premium-grade MS Plates, MS Rounds, Structural Steel, and Structural Plates to construction firms, fabricators, and manufacturers across Karnataka and Goa.
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
                Our state-of-the-art cutting services - including Oxyfuel Cutting, Plasma Cutting, and Sheet Steel Fabrication - ensure precision and reliability for every project, from small-scale custom work to large industrial orders.
              </p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, lineHeight: 1.8, marginBottom: 36 }}>
                With a commitment to quality, competitive pricing, and prompt delivery, we have built lasting relationships with hundreds of clients who trust us for their most critical projects.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                {[
                  { num: "30", suffix: "+", label: "Years Experience" },
                  { num: "500", suffix: "+", label: "Projects Completed" },
                  { num: "200", suffix: "+", label: "Happy Clients" },
                  { num: "4", suffix: "", label: "Cutting Services" },
                ].map(function(s, i) {
                  return (
                    <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "20px 16px", textAlign: "center", border: "1px solid " + BORDER }}>
                      <div style={{ fontSize: 28, fontWeight: 900, color: RED }}><Counter target={s.num} />{s.suffix}</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

function ContactPage() {
  var formState = useState({ name: "", phone: "", product: "", qty: "", details: "" });
  var quoteForm = formState[0];
  var setQuoteForm = formState[1];

  function sendQuote() {
    var msg = "Quote Request - National Industrial Services\n\nName: " + quoteForm.name + "\nPhone: " + quoteForm.phone + "\nProduct/Service: " + quoteForm.product + "\nQuantity: " + quoteForm.qty + "\nDetails: " + quoteForm.details;
    window.open(WA(msg), "_blank");
  }

  function updateField(key, value) {
    var updated = Object.assign({}, quoteForm);
    updated[key] = value;
    setQuoteForm(updated);
  }

  var isValid = quoteForm.name && quoteForm.phone && quoteForm.product;

  return (
    <div style={{ background: DARKER, padding: "100px 20px 60px", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ color: RED, fontSize: 13, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>GET IN TOUCH</div>
          <h1 style={{ color: "#fff", fontSize: 38, fontWeight: 900, marginBottom: 12, letterSpacing: -0.5 }}>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 50, fontSize: 16 }}>Get in touch for quotes, orders, or any enquiries</p>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          <AnimatedSection delay={0.1}>
            <div style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 20, padding: 32, backdropFilter: "blur(10px)" }}>
              <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Quick Quote Request</h2>
              {[
                { key: "name", placeholder: "Your Name *", type: "text" },
                { key: "phone", placeholder: "Phone Number *", type: "tel" },
                { key: "product", placeholder: "Product / Service Required *", type: "text" },
                { key: "qty", placeholder: "Quantity / Size", type: "text" },
              ].map(function(f) {
                return <input key={f.key} type={f.type} placeholder={f.placeholder} value={quoteForm[f.key]} onChange={function(e) { updateField(f.key, e.target.value); }} className="form-input" style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 15, marginBottom: 12, outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }} />;
              })}
              <textarea placeholder="Additional Details..." value={quoteForm.details} onChange={function(e) { updateField("details", e.target.value); }} rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 15, marginBottom: 20, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
              <button onClick={sendQuote} disabled={!isValid} style={{ width: "100%", background: isValid ? "#25D366" : "rgba(255,255,255,0.06)", color: isValid ? "#fff" : "rgba(255,255,255,0.3)", border: "none", padding: "16px", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: isValid ? "pointer" : "not-allowed" }}>Send Quote via WhatsApp</button>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div>
              <div style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 20, padding: 32, marginBottom: 20, backdropFilter: "blur(10px)" }}>
                <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 24 }}>Visit Us</h2>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 2 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ color: RED, marginTop: 4 }}><Icon type="mappin" size={18} /></span>
                    <span>350-3D, Near Khadarwadi Cross,<br />Khanapur Road, Udyambag,<br />Belagavi, Karnataka 590008</span>
                  </div>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ color: RED }}><Icon type="phone" size={18} /></span>
                    <a href={TEL} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none" }}>+91 89046 08193</a>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                  <a href={WA("Hi! I would like to know more about National Industrial Services.")} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "#25D366", color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none", textAlign: "center" }}>WhatsApp</a>
                  <a href={TEL} style={{ flex: 1, background: "linear-gradient(135deg, " + RED + ", " + REDLIGHT + ")", color: "#fff", padding: "14px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none", textAlign: "center" }}>Call Now</a>
                </div>
              </div>
              <div style={{ background: GLASS, border: "1px solid " + BORDER, borderRadius: 20, overflow: "hidden", height: 220 }}>
                <iframe title="Location" src="https://maps.google.com/maps?q=15.83,74.52&z=15&output=embed" width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  var pageState = useState("Home");
  var page = pageState[0];
  var setPage = pageState[1];
  var menuState = useState(false);
  var menuOpen = menuState[0];
  var setMenuOpen = menuState[1];
  var topRef = useRef(null);

  function navigate(p) {
    setPage(p);
    setMenuOpen(false);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <div ref={topRef} style={{ fontFamily: "Inter, -apple-system, system-ui, sans-serif", background: DARKER, minHeight: "100vh", color: "#fff" }}>
      <style>{
        ".desktop-nav { display: flex; gap: 4px; align-items: center; }" +
        ".mobile-menu-btn { display: none; }" +
        "@media (max-width: 768px) {" +
        "  .desktop-nav { display: none !important; }" +
        "  .mobile-menu-btn { display: block !important; }" +
        "  .service-card { flex-direction: column !important; }" +
        "  .service-card .img-container { width: 100% !important; min-height: 200px !important; }" +
        "}" +
        "* { box-sizing: border-box; margin: 0; }" +
        "input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }" +
        ".form-input:focus { border-color: " + RED + " !important; }" +
        ".product-card:hover img, .service-card:hover img { transform: scale(1.08); }" +
        ".product-card:hover, .feature-card:hover { border-color: rgba(212,43,43,0.3) !important; transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }" +
        ".nav-btn:hover { color: #fff !important; }" +
        ".footer-link:hover { color: #fff !important; }" +
        ".wa-fab:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(37,211,102,0.5); }" +
        ".btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(37,211,102,0.4) !important; }" +
        ".btn-outline:hover { background: " + RED + " !important; color: #fff !important; border-color: " + RED + " !important; }" +
        "html { scroll-behavior: smooth; }" +
        "@keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(10px); } }" +
        "@keyframes scroll { 0% { opacity:1; transform:translateY(0); } 100% { opacity:0; transform:translateY(10px); } }"
      }</style>
      <Header page={page} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {page === "Home" && <HomePage navigate={navigate} />}
      {page === "Products" && <ProductsPage />}
      {page === "Services" && <ServicesPage />}
      {page === "About" && <AboutPage />}
      {page === "Contact" && <ContactPage />}
      <FooterSection navigate={navigate} />
      <WhatsAppFab />
    </div>
  );
}
