import { useState, useRef } from "react";

const PHONE = "918904608193";
const WA = (msg) => "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(msg);
const TEL = "tel:+918904608193";

function Icon({ type }) {
  const icons = {
    menu: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    close: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    phone: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    whatsapp: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
    mappin: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    star: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#F97316" stroke="#F97316" strokeWidth="1" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    shield: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="#F97316" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    zap: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="#F97316" strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    truck: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="#F97316" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    clock: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="#F97316" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  };
  return icons[type] || null;
}

var products = [
  { name: "MS Plates", desc: "Mild Steel plates in various thicknesses (5mm to 100mm). IS 2062 Grade. Custom sizes available.", sizes: "1250x2500mm, 1500x3000mm, custom" },
  { name: "MS Rounds", desc: "Round bars for construction, fabrication and machining. All standard diameters available.", sizes: "10mm to 300mm dia" },
  { name: "Structural Steel", desc: "I-Beams, H-Beams, Channels, Angles and Joists for construction and industrial use.", sizes: "ISMB, ISMC, ISA - all standard" },
  { name: "Structural Plates", desc: "Heavy-duty plates for structural applications. High tensile and boiler quality available.", sizes: "6mm to 120mm, custom cut" },
];

var services = [
  { name: "Industrial Fabrication", desc: "Custom steel fabrication for industrial structures, frames, platforms, and heavy equipment components. End-to-end project execution." },
  { name: "Oxyfuel Cutting", desc: "Precision oxy-acetylene cutting for thick MS plates and structural steel. Ideal for heavy sections up to 300mm." },
  { name: "Plasma Cutting", desc: "High-precision CNC and manual plasma cutting for intricate profiles, cleaner edges, and faster turnaround." },
  { name: "Sheet Steel Fabrication", desc: "Bending, rolling, welding, and finishing of sheet steel for enclosures, ducts, hoppers, and custom assemblies." },
];

var testimonials = [
  { name: "Rajesh Patil", co: "Patil Engineering Works", text: "Reliable supplier with consistent quality. Their plasma cutting service saved us weeks of time on our last project." },
  { name: "Suresh Kulkarni", co: "KMC Constructions", text: "National Industrial Services has been our go-to for structural steel for over 3 years. Competitive pricing and prompt delivery." },
  { name: "Anand Joshi", co: "Joshi Fabricators", text: "Excellent oxyfuel cutting accuracy. The team is knowledgeable and always delivers on time." },
];

var statsList = [
  { num: "15+", label: "Years Experience" },
  { num: "500+", label: "Projects Completed" },
  { num: "200+", label: "Happy Clients" },
  { num: "4", label: "Cutting Services" },
];

var navLinks = ["Home", "Products", "Services", "About", "Contact"];

function Header({ page, navigate, menuOpen, setMenuOpen }) {
  return (
    <header style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)", borderBottom: "3px solid #F97316", position: "sticky", top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ cursor: "pointer" }} onClick={function() { navigate("Home"); }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#F97316", letterSpacing: 1 }}>NATIONAL</div>
          <div style={{ fontSize: 11, color: "#ccc", letterSpacing: 3, marginTop: -2 }}>INDUSTRIAL SERVICES</div>
        </div>
        <nav className="desktop-nav">
          {navLinks.map(function(l) {
            return (
              <button key={l} onClick={function() { navigate(l); }} style={{ background: page === l ? "#F97316" : "transparent", color: page === l ? "#000" : "#ddd", border: "none", padding: "8px 16px", borderRadius: 6, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>{l}</button>
            );
          })}
          <a href={TEL} style={{ background: "#F97316", color: "#000", padding: "8px 14px", borderRadius: 6, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}><Icon type="phone" /> Call Now</a>
        </nav>
        <button onClick={function() { setMenuOpen(!menuOpen); }} className="mobile-menu-btn" style={{ background: "none", border: "none", color: "#F97316", cursor: "pointer" }}>
          {menuOpen ? <Icon type="close" /> : <Icon type="menu" />}
        </button>
      </div>
      {menuOpen && (
        <div style={{ background: "#111", padding: "10px 20px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map(function(l) {
            return (
              <button key={l} onClick={function() { navigate(l); }} style={{ background: page === l ? "#F97316" : "transparent", color: page === l ? "#000" : "#ddd", border: "none", padding: "12px 16px", borderRadius: 6, fontWeight: 600, fontSize: 15, cursor: "pointer", textAlign: "left" }}>{l}</button>
            );
          })}
          <a href={TEL} style={{ background: "#F97316", color: "#000", padding: "12px 16px", borderRadius: 6, fontWeight: 700, fontSize: 15, textDecoration: "none", textAlign: "center", marginTop: 8 }}>Call Now</a>
        </div>
      )}
    </header>
  );
}

function FooterSection({ navigate }) {
  return (
    <footer style={{ background: "#0d0d0d", borderTop: "3px solid #F97316", padding: "40px 20px 20px", color: "#aaa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 30 }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#F97316" }}>NATIONAL</div>
          <div style={{ fontSize: 10, color: "#888", letterSpacing: 3 }}>INDUSTRIAL SERVICES</div>
          <p style={{ marginTop: 12, fontSize: 13, lineHeight: 1.6 }}>Your trusted partner for quality steel supply and industrial fabrication in Belagavi, Karnataka.</p>
        </div>
        <div>
          <h4 style={{ color: "#F97316", marginBottom: 12, fontSize: 14 }}>Quick Links</h4>
          {navLinks.map(function(l) {
            return <div key={l}><button onClick={function() { navigate(l); }} style={{ background: "none", border: "none", color: "#aaa", cursor: "pointer", padding: "4px 0", fontSize: 13 }}>{l}</button></div>;
          })}
        </div>
        <div>
          <h4 style={{ color: "#F97316", marginBottom: 12, fontSize: 14 }}>Contact</h4>
          <div style={{ fontSize: 13, lineHeight: 2 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}><span style={{ marginTop: 2 }}><Icon type="mappin" /></span> 350-3D, Near Khadarwadi Cross, Khanapur Road, Udyambag, Belagavi 590008</div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon type="phone" /> +91 89046 08193</div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 30, paddingTop: 20, borderTop: "1px solid #222", fontSize: 12, color: "#555" }}>
        {"© 2026 National Industrial Services. All rights reserved."}
      </div>
    </footer>
  );
}

function WhatsAppFab() {
  return (
    <a href={WA("Hi, I would like to enquire about your products and services.")} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 99, background: "#25D366", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", cursor: "pointer" }}>
      <Icon type="whatsapp" />
    </a>
  );
}

function HomePage({ navigate }) {
  return (
    <div>
      <section style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #111 50%, #1a0a00 100%)", padding: "60px 20px 50px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 50% 0%, rgba(249,115,22,0.15) 0%, transparent 60%)" }} />
        <div style={{ position: "relative", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(249,115,22,0.15)", color: "#F97316", padding: "6px 18px", borderRadius: 20, fontSize: 12, fontWeight: 600, marginBottom: 16, border: "1px solid rgba(249,115,22,0.3)" }}>Belagavi's Trusted Steel Partner</div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, margin: "0 0 16px" }}>Quality Steel Supply &<br /><span style={{ color: "#F97316" }}>Industrial Fabrication</span></h1>
          <p style={{ color: "#aaa", fontSize: 16, maxWidth: 600, margin: "0 auto 30px", lineHeight: 1.6 }}>MS Plates, Rounds, Structurals and Expert Cutting Services - Oxyfuel, Plasma and Custom Fabrication for every industrial need.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA("Hi, I would like to get a quote for steel products.")} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>Get Quote on WhatsApp</a>
            <button onClick={function() { navigate("Products"); }} style={{ background: "transparent", color: "#F97316", padding: "14px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, border: "2px solid #F97316", cursor: "pointer" }}>View Products</button>
          </div>
        </div>
      </section>

      <section style={{ background: "#F97316", padding: "0 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
          {statsList.map(function(s, i) {
            return (
              <div key={i} style={{ textAlign: "center", padding: "24px 10px", borderRight: i < 3 ? "1px solid rgba(0,0,0,0.15)" : "none" }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#000" }}>{s.num}</div>
                <div style={{ fontSize: 12, color: "#000", opacity: 0.7, fontWeight: 600 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: "#111", padding: "50px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Why Choose Us?</h2>
          <p style={{ textAlign: "center", color: "#888", marginBottom: 40, fontSize: 14 }}>Delivering quality and reliability since day one</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {[
              { icon: "shield", title: "Premium Quality", desc: "IS 2062 certified steel. Every product meets industry standards." },
              { icon: "zap", title: "Precision Cutting", desc: "Advanced Plasma and Oxyfuel cutting for accurate profiles." },
              { icon: "truck", title: "Reliable Delivery", desc: "On-time delivery across Belagavi and surrounding districts." },
              { icon: "clock", title: "Quick Turnaround", desc: "Fast quotes and rapid order fulfillment for urgent needs." },
            ].map(function(item, i) {
              return (
                <div key={i} style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 24, textAlign: "center" }}>
                  <div style={{ marginBottom: 12 }}><Icon type={item.icon} /></div>
                  <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ color: "#888", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "#0d0d0d", padding: "50px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Our Products</h2>
          <p style={{ textAlign: "center", color: "#888", marginBottom: 40, fontSize: 14 }}>Premium steel for every industrial application</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {products.map(function(p, i) {
              return (
                <div key={i} style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 24 }}>
                  <h3 style={{ color: "#F97316", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{p.name}</h3>
                  <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.5, marginBottom: 8 }}>{p.desc}</p>
                  <div style={{ color: "#666", fontSize: 12, marginBottom: 16 }}>Sizes: {p.sizes}</div>
                  <button onClick={function() { window.open(WA("Hi, I am interested in " + p.name + ". Please share pricing and availability."), "_blank"); }} style={{ background: "#25D366", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer", width: "100%" }}>Enquire on WhatsApp</button>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: 30 }}>
            <button onClick={function() { navigate("Products"); }} style={{ background: "transparent", color: "#F97316", border: "2px solid #F97316", padding: "12px 30px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>View All Products</button>
          </div>
        </div>
      </section>

      <section style={{ background: "#111", padding: "50px 20px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 40 }}>What Our Clients Say</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {testimonials.map(function(t, i) {
              return (
                <div key={i} style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 24 }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>{[1,2,3,4,5].map(function(j) { return <Icon key={j} type="star" />; })}</div>
                  <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>{'"' + t.text + '"'}</p>
                  <div style={{ color: "#F97316", fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "#666", fontSize: 12 }}>{t.co}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #F97316 0%, #ea580c 100%)", padding: "50px 20px", textAlign: "center" }}>
        <h2 style={{ color: "#000", fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Ready to Get Started?</h2>
        <p style={{ color: "rgba(0,0,0,0.7)", fontSize: 15, marginBottom: 24 }}>Get an instant quote on WhatsApp or call us directly</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href={WA("Hi, I would like to get a quote.")} target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", padding: "14px 30px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>WhatsApp Us</a>
          <a href={TEL} style={{ background: "#000", color: "#F97316", padding: "14px 30px", borderRadius: 8, fontWeight: 700, textDecoration: "none", fontSize: 15 }}>Call +91 89046 08193</a>
        </div>
      </section>
    </div>
  );
}

function ProductsPage() {
  return (
    <div style={{ background: "#0d0d0d", padding: "40px 20px", minHeight: "60vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Our <span style={{ color: "#F97316" }}>Products</span></h1>
        <p style={{ color: "#888", marginBottom: 40, fontSize: 14 }}>Premium quality steel products for industrial and construction applications</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {products.map(function(p, i) {
            return (
              <div key={i} style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 28 }}>
                <h2 style={{ color: "#F97316", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{p.name}</h2>
                <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                <div style={{ background: "#111", borderRadius: 8, padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#888" }}>
                  <strong style={{ color: "#F97316" }}>Sizes: </strong>{p.sizes}
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={function() { window.open(WA("Hi, I am interested in " + p.name + ". Please share pricing and availability."), "_blank"); }} style={{ flex: 1, background: "#25D366", color: "#fff", border: "none", padding: "12px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>WhatsApp</button>
                  <a href={TEL} style={{ flex: 1, background: "#F97316", color: "#000", padding: "12px", borderRadius: 6, fontWeight: 600, fontSize: 13, textDecoration: "none", textAlign: "center" }}>Call</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <div style={{ background: "#0d0d0d", padding: "40px 20px", minHeight: "60vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Our <span style={{ color: "#F97316" }}>Services</span></h1>
        <p style={{ color: "#888", marginBottom: 40, fontSize: 14 }}>End-to-end industrial fabrication and cutting solutions</p>
        {services.map(function(s, i) {
          return (
            <div key={i} style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 28, marginBottom: 20 }}>
              <h2 style={{ color: "#F97316", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{s.name}</h2>
              <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>{s.desc}</p>
              <button onClick={function() { window.open(WA("Hi, I would like to enquire about your " + s.name + " service. Please share details."), "_blank"); }} style={{ background: "#25D366", color: "#fff", border: "none", padding: "12px 24px", borderRadius: 6, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>Enquire on WhatsApp</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div style={{ background: "#0d0d0d", padding: "40px 20px", minHeight: "60vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>About <span style={{ color: "#F97316" }}>Us</span></h1>
        <p style={{ color: "#888", marginBottom: 30, fontSize: 14 }}>Your trusted steel partner in Belagavi</p>
        <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 32 }}>
          <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
            <strong style={{ color: "#F97316" }}>National Industrial Services</strong> is a Belagavi-based steel supply and industrial fabrication company located in the heart of Udyambag's industrial belt. We specialize in supplying premium-grade MS Plates, MS Rounds, Structural Steel, and Structural Plates to construction firms, fabricators, and manufacturers across Karnataka and Goa.
          </p>
          <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
            Our state-of-the-art cutting services - including Oxyfuel Cutting, Plasma Cutting, and Sheet Steel Fabrication - ensure precision and reliability for every project, from small-scale custom work to large industrial orders.
          </p>
          <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.8, marginBottom: 30 }}>
            With a commitment to quality, competitive pricing, and prompt delivery, we have built lasting relationships with hundreds of clients who trust us for their most critical projects.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 16 }}>
            {statsList.map(function(s, i) {
              return (
                <div key={i} style={{ background: "#111", borderRadius: 8, padding: 20, textAlign: "center", border: "1px solid #333" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#F97316" }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: "#888", fontWeight: 600 }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
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
    <div style={{ background: "#0d0d0d", padding: "40px 20px", minHeight: "60vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Contact <span style={{ color: "#F97316" }}>Us</span></h1>
        <p style={{ color: "#888", marginBottom: 40, fontSize: 14 }}>Get in touch for quotes, orders, or any enquiries</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 30 }}>
          <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 28 }}>
            <h2 style={{ color: "#F97316", fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Quick Quote Request</h2>
            <p style={{ color: "#888", fontSize: 13, marginBottom: 20 }}>Fill in the details below and send directly via WhatsApp</p>
            {[
              { key: "name", placeholder: "Your Name *", type: "text" },
              { key: "phone", placeholder: "Phone Number *", type: "tel" },
              { key: "product", placeholder: "Product / Service Required *", type: "text" },
              { key: "qty", placeholder: "Quantity / Size", type: "text" },
            ].map(function(f) {
              return (
                <input key={f.key} type={f.type} placeholder={f.placeholder} value={quoteForm[f.key]} onChange={function(e) { updateField(f.key, e.target.value); }} style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 8, padding: "12px 14px", color: "#fff", fontSize: 14, marginBottom: 12, outline: "none", boxSizing: "border-box" }} />
              );
            })}
            <textarea placeholder="Additional Details..." value={quoteForm.details} onChange={function(e) { updateField("details", e.target.value); }} rows={3} style={{ width: "100%", background: "#111", border: "1px solid #333", borderRadius: 8, padding: "12px 14px", color: "#fff", fontSize: 14, marginBottom: 16, outline: "none", resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" }} />
            <button onClick={sendQuote} disabled={!isValid} style={{ width: "100%", background: isValid ? "#25D366" : "#333", color: isValid ? "#fff" : "#666", border: "none", padding: "14px", borderRadius: 8, fontWeight: 700, fontSize: 15, cursor: isValid ? "pointer" : "not-allowed" }}>Send Quote Request via WhatsApp</button>
          </div>
          <div>
            <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, padding: 28, marginBottom: 20 }}>
              <h2 style={{ color: "#F97316", fontSize: 20, fontWeight: 800, marginBottom: 20 }}>Visit Us</h2>
              <div style={{ color: "#ccc", fontSize: 14, lineHeight: 2 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                  <span style={{ color: "#F97316", marginTop: 2 }}><Icon type="mappin" /></span>
                  <span>350-3D, Near Khadarwadi Cross,<br />Khanapur Road, Udyambag,<br />Belagavi, Karnataka 590008</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                  <span style={{ color: "#F97316" }}><Icon type="phone" /></span>
                  <a href={TEL} style={{ color: "#ccc", textDecoration: "none" }}>+91 89046 08193</a>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <a href={WA("Hi! I would like to know more about National Industrial Services.")} target="_blank" rel="noopener noreferrer" style={{ flex: 1, background: "#25D366", color: "#fff", padding: "12px", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center" }}>WhatsApp</a>
                <a href={TEL} style={{ flex: 1, background: "#F97316", color: "#000", padding: "12px", borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: "none", textAlign: "center" }}>Call Now</a>
              </div>
            </div>
            <div style={{ background: "#1a1a1a", border: "1px solid #222", borderRadius: 12, overflow: "hidden", height: 220 }}>
              <iframe title="Location" src="https://maps.google.com/maps?q=15.83,74.52&z=15&output=embed" width="100%" height="220" style={{ border: 0 }} allowFullScreen loading="lazy" />
            </div>
          </div>
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

  var PageComponent;
  if (page === "Products") { PageComponent = ProductsPage; }
  else if (page === "Services") { PageComponent = ServicesPage; }
  else if (page === "About") { PageComponent = AboutPage; }
  else if (page === "Contact") { PageComponent = ContactPage; }
  else { PageComponent = function() { return <HomePage navigate={navigate} />; }; }

  return (
    <div ref={topRef} style={{ fontFamily: "Inter, Segoe UI, system-ui, sans-serif", background: "#0d0d0d", minHeight: "100vh", color: "#fff" }}>
      <style>{
        ".desktop-nav { display: flex; gap: 8px; align-items: center; }" +
        ".mobile-menu-btn { display: none; }" +
        "@media (max-width: 768px) {" +
        "  .desktop-nav { display: none !important; }" +
        "  .mobile-menu-btn { display: block !important; }" +
        "}" +
        "* { box-sizing: border-box; margin: 0; }" +
        "input::placeholder, textarea::placeholder { color: #555; }"
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
