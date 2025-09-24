// Star constellation animation
class StarField {
  constructor() {
    this.canvas = document.getElementById("starfield");
    this.ctx = this.canvas.getContext("2d");
    this.stars = [];
    this.numStars = 250;
    this.connections = [];
    this.maxDistance = 120;

    this.init();
    this.createStars();
    this.animate();

    // Handle resize
    window.addEventListener("resize", () => this.handleResize());
  }

  init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.6 + 0.4,
      });
    }
  }

  updateStars() {
    this.stars.forEach((star) => {
      star.x += star.vx;
      star.y += star.vy;

      // Wrap around screen
      if (star.x < 0) star.x = this.canvas.width;
      if (star.x > this.canvas.width) star.x = 0;
      if (star.y < 0) star.y = this.canvas.height;
      if (star.y > this.canvas.height) star.y = 0;

      // Subtle opacity pulsing
      star.opacity += (Math.random() - 0.5) * 0.015;
      star.opacity = Math.max(0.3, Math.min(1, star.opacity));
    });
  }

  drawStars() {
    this.stars.forEach((star) => {
      this.ctx.save(); // Save current state
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = "white";
      this.ctx.fill();
      this.ctx.restore(); // Restore state
    });
  }

  drawConnections() {
    this.connections = [];

    for (let i = 0; i < this.stars.length; i++) {
      for (let j = i + 1; j < this.stars.length; j++) {
        const dx = this.stars[i].x - this.stars[j].x;
        const dy = this.stars[i].y - this.stars[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.maxDistance) {
          const opacity =
            ((this.maxDistance - distance) / this.maxDistance) * 0.5;

          this.ctx.beginPath();
          this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
          this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
          this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    // Clear the canvas with a transparent background
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update star positions
    this.updateStars();

    // Draw connections first (behind stars)
    this.drawConnections();

    // Draw stars on top
    this.drawStars();

    // Continue animation
    requestAnimationFrame(() => this.animate());
  }

  handleResize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.createStars();
  }
}

// Mouse interaction effects
class MouseEffects {
  constructor() {
    this.mouse = { x: 0, y: 0 };
    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.createMouseStars();
    });
  }

  createMouseStars() {
    // Create temporary stars that follow mouse
    if (Math.random() < 0.1) {
      const star = document.createElement("div");
      star.style.position = "fixed";
      star.style.left = this.mouse.x + "px";
      star.style.top = this.mouse.y + "px";
      star.style.width = "2px";
      star.style.height = "2px";
      star.style.backgroundColor = "white";
      star.style.borderRadius = "50%";
      star.style.pointerEvents = "none";
      star.style.zIndex = "0";
      star.style.opacity = "0.8";
      star.style.transition = "all 1s ease-out";

      document.body.appendChild(star);

      // Animate and remove
      setTimeout(() => {
        star.style.opacity = "0";
        star.style.transform =
          "scale(0.5) translate(" +
          (Math.random() - 0.5) * 100 +
          "px, " +
          (Math.random() - 0.5) * 100 +
          "px)";
      }, 50);

      setTimeout(() => {
        if (star.parentNode) {
          star.parentNode.removeChild(star);
        }
      }, 1050);
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize starfield on main page
  if (!document.body.classList.contains("about-page-body")) {
    new StarField();
    new MouseEffects();
  }

  // Check if we're on the about page
  if (window.location.pathname.includes("about.html")) {
    initAboutPage();
  }

  // Check if we're on the contact page
  if (window.location.pathname.includes("contact.html")) {
    initContactPage();
  }

  // Add loading animation to name
  const nameTitle = document.querySelector(".name-title");
  if (nameTitle) {
    nameTitle.style.opacity = "0";
    nameTitle.style.transform = "translateY(30px)";
    nameTitle.style.transition = "all 1s ease-out";

    setTimeout(() => {
      nameTitle.style.opacity = "1";
      nameTitle.style.transform = "translateY(0)";
    }, 500);
  }

  // Stagger animation for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link, index) => {
    link.style.opacity = "0";
    link.style.transform = "translateY(20px)";
    link.style.transition = "all 0.6s ease-out";

    setTimeout(() => {
      link.style.opacity = "1";
      link.style.transform = "translateY(0)";
    }, 800 + index * 200);
  });

  // Footer animation
  const footer = document.querySelector(".footer");
  if (footer) {
    footer.style.opacity = "0";
    footer.style.transform = "translateY(20px)";
    footer.style.transition = "all 0.8s ease-out";

    setTimeout(() => {
      footer.style.opacity = "1";
      footer.style.transform = "translateY(0)";
    }, 1400);
  }
});

function initAboutPage() {
  animateProfileSection();

  animateSkillsOnScroll();

  setupInteractiveTimeline();

  animateTimelineOnLoad();
}

function animateProfileSection() {
  const profileImage = document.querySelector(".profile-image-wrapper");
  const profileSummary = document.querySelector(".profile-summary");

  if (profileImage) {
    profileImage.style.opacity = "0";
    profileImage.style.transform = "translateX(-30px)";
    profileImage.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      profileImage.style.opacity = "1";
      profileImage.style.transform = "translateX(0)";
    }, 200);
  }

  if (profileSummary) {
    profileSummary.style.opacity = "0";
    profileSummary.style.transform = "translateX(30px)";
    profileSummary.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      profileSummary.style.opacity = "1";
      profileSummary.style.transform = "translateX(0)";
    }, 400);
  }
}

function animateSkillsOnScroll() {
  const skillCategories = document.querySelectorAll(".skill-category");

  const observerOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "0";
        entry.target.style.transform = "translateY(20px)";
        entry.target.style.transition =
          "opacity 0.6s ease, transform 0.6s ease";

        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillCategories.forEach((category) => observer.observe(category));
}

function setupInteractiveTimeline() {
  const timelineBars = document.querySelectorAll(".timeline-bar");
  const detailsPanel = document.getElementById("detailsPanel");
  const detailTitle = document.getElementById("detailTitle");
  const detailSubtitle = document.getElementById("detailSubtitle");
  const detailPeriod = document.getElementById("detailPeriod");
  const detailDescription = document.getElementById("detailDescription");
  const detailTech = document.getElementById("detailTech");

  let activeBar = null;

  timelineBars.forEach((bar) => {
    bar.addEventListener("mouseenter", function () {
      if (activeBar) {
        activeBar.classList.remove("active");
      }

      // Add active class to current
      this.classList.add("active");
      activeBar = this;

      // Get data attributes
      const title = this.getAttribute("data-title");
      const subtitle = this.getAttribute("data-subtitle");
      const period = this.getAttribute("data-period");
      const details = this.getAttribute("data-details");
      const tech = this.getAttribute("data-tech");

      // Update details panel
      detailTitle.textContent = title;
      detailSubtitle.textContent = subtitle;
      detailPeriod.textContent = period;
      detailDescription.innerHTML = details;

      // Add tech tags if present
      if (tech) {
        const techArray = tech.split(", ");
        detailTech.innerHTML = techArray
          .map((t) => `<span class="tech-tag">${t}</span>`)
          .join("");
      } else {
        detailTech.innerHTML = "";
      }

      // Show panel
      detailsPanel.classList.add("show");
    });

    // hide details
    bar.addEventListener("mouseleave", function () {
      this.classList.remove("active");
      if (activeBar === this) {
        activeBar = null;
      }

      setTimeout(() => {
        if (!activeBar) {
          detailsPanel.classList.remove("show");
        }
      }, 300);
    });

    bar.addEventListener("click", function (e) {
      e.preventDefault();

      if (this.classList.contains("active")) {
        this.classList.remove("active");
        detailsPanel.classList.remove("show");
        activeBar = null;
      } else {
        timelineBars.forEach((b) => b.classList.remove("active"));

        this.classList.add("active");
        activeBar = this;

        const title = this.getAttribute("data-title");
        const subtitle = this.getAttribute("data-subtitle");
        const period = this.getAttribute("data-period");
        const details = this.getAttribute("data-details");
        const tech = this.getAttribute("data-tech");

        detailTitle.textContent = title;
        detailSubtitle.textContent = subtitle;
        detailPeriod.textContent = period;
        detailDescription.innerHTML = details;

        if (tech) {
          const techArray = tech.split(", ");
          detailTech.innerHTML = techArray
            .map((t) => `<span class="tech-tag">${t}</span>`)
            .join("");
        } else {
          detailTech.innerHTML = "";
        }

        detailsPanel.classList.add("show");
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".timeline-bar") &&
      !e.target.closest(".timeline-details-panel")
    ) {
      if (activeBar) {
        activeBar.classList.remove("active");
        activeBar = null;
      }
      detailsPanel.classList.remove("show");
    }
  });
}

function animateTimelineOnLoad() {
  const timelineAxis = document.querySelector(".timeline-axis");
  const timelineTracks = document.querySelectorAll(".timeline-track");
  const timelineBars = document.querySelectorAll(".timeline-bar");

  // Animate axis first
  if (timelineAxis) {
    timelineAxis.style.opacity = "0";
    timelineAxis.style.transform = "scaleX(0)";
    timelineAxis.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      timelineAxis.style.opacity = "1";
      timelineAxis.style.transform = "scaleX(1)";
    }, 600);
  }

  timelineTracks.forEach((track, index) => {
    track.style.opacity = "0";
    track.style.transform = "translateX(-20px)";
    track.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      track.style.opacity = "1";
      track.style.transform = "translateX(0)";
    }, 800 + index * 200);
  });

  timelineBars.forEach((bar, index) => {
    bar.style.opacity = "0";
    bar.style.transform = "scale(0)";
    bar.style.transition = "opacity 0.5s ease, transform 0.5s ease";

    setTimeout(() => {
      bar.style.opacity = "1";
      bar.style.transform = "scale(1)";
    }, 1200 + index * 100);
  });

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "scale(1) translateX(0)";
      }
    });
  }, observerOptions);

  const timelineSection = document.querySelector(".interactive-timeline");
  if (timelineSection) {
    observer.observe(timelineSection);
  }
}

function initContactPage() {
  animateContactElements();

  setupContactForm();

  const resumeBtn = document.querySelector(".resume-download-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", downloadResume);
  }
}

function animateContactElements() {
  const contactHeader = document.querySelector(".contact-header");
  if (contactHeader) {
    contactHeader.style.opacity = "0";
    contactHeader.style.transform = "translateY(-20px)";
    contactHeader.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      contactHeader.style.opacity = "1";
      contactHeader.style.transform = "translateY(0)";
    }, 300);
  }

  const infoSection = document.querySelector(".contact-info-section");
  if (infoSection) {
    infoSection.style.opacity = "0";
    infoSection.style.transform = "translateX(-30px)";
    infoSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      infoSection.style.opacity = "1";
      infoSection.style.transform = "translateX(0)";
    }, 500);
  }

  const formSection = document.querySelector(".contact-form-section");
  if (formSection) {
    formSection.style.opacity = "0";
    formSection.style.transform = "translateX(30px)";
    formSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";

    setTimeout(() => {
      formSection.style.opacity = "1";
      formSection.style.transform = "translateX(0)";
    }, 700);
  }

  const contactCards = document.querySelectorAll(".contact-card");
  contactCards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 800 + index * 100);
  });
}

function setupContactForm() {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      const subject = encodeURIComponent(
        data.subject || "Contact Form Submission"
      );
      const body = encodeURIComponent(
        `Name: ${data.firstName} ${data.lastName}\n` +
          `Email: ${data.email}\n` +
          `Message Type: ${data.messageType}\n\n` +
          `Message:\n${data.message}`
      );

      window.location.href = `mailto:vigneshpakkam@gmail.com?subject=${subject}&body=${body}`;

      if (formMessage) {
        formMessage.innerHTML =
          "Thank you for your message! Your email client should open with the pre-filled message.";
        formMessage.className = "form-message success";
        formMessage.style.display = "block";

        setTimeout(() => {
          contactForm.reset();
          formMessage.style.display = "none";
        }, 5000);
      }
    });

    const inputs = contactForm.querySelectorAll(".contact-input");
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.style.transform = "scale(1.02)";
        this.parentElement.style.transition = "transform 0.3s ease";
      });

      input.addEventListener("blur", function () {
        this.parentElement.style.transform = "scale(1)";
      });
    });
  }
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "../assets/files/resume.pdf";
  link.download = "Vignesh_Pakkam_Saravanan_Resume.pdf";
  link.target = "_blank";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const btn = document.querySelector(".resume-download-btn");
  if (btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
    btn.style.background = "linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)";

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = "";
    }, 2000);
  }
}
window.downloadResume = downloadResume;
