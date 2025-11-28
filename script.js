// Get elements
const yellowButton = document.querySelector(".yellow-button");
const gameWrapper = document.querySelector(".game-wrapper");
const pageContent = document.querySelector(".page-content");

// Add click event listener to yellow button
yellowButton.addEventListener("click", function () {
  // Hide game-wrapper
  gameWrapper.style.opacity = "0";
  gameWrapper.style.visibility = "hidden";
  gameWrapper.style.transition = "opacity 600ms ease, visibility 600ms ease";

  // Show page-content
  setTimeout(function () {
    pageContent.classList.add("active");
  }, 100);
});

/* Slider drag behavior for contact-slider */
document.addEventListener("DOMContentLoaded", () => {
  const dragParent = document.getElementById("drag-parent");
  if (!dragParent) return;
  const handle = dragParent.querySelector(".device__btn.drag--handle");
  if (!handle) return;

  let dragging = false;
  let startX = 0;
  let offset = 0;

  const parentRect = () => dragParent.getBoundingClientRect();
  const handleRect = () => handle.getBoundingClientRect();

  function setHandleX(x) {
    const max = parentRect().width - handleRect().width - 8;
    const clamped = Math.max(0, Math.min(x, max));
    // Preserve vertical centering (translateY(-50%)) while moving horizontally.
    handle.style.transform = `translate3d(${clamped}px, -50%, 0)`;
    offset = clamped;
    return clamped;
  }

  function resetSlider() {
    handle.style.transition = "transform 360ms cubic-bezier(.2,.9,.2,1)";
    setHandleX(0);
    dragParent.classList.remove("active");
  }

  function onPointerDown(e) {
    dragging = true;
    // prevent default to avoid page scrolling / focus shifts while dragging
    e.preventDefault && e.preventDefault();
    startX = (e.clientX || (e.touches && e.touches[0].clientX)) - offset;
    handle.setPointerCapture && handle.setPointerCapture(e.pointerId);
    handle.style.transition = "none";
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    e.preventDefault && e.preventDefault();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    offset = clientX - startX;
    setHandleX(offset);
  }

  function onPointerUp(e) {
    if (!dragging) return;
    dragging = false;
    const max = parentRect().width - handleRect().width - 8;
    const current = setHandleX(offset);
    // enable smooth snapping
    handle.style.transition = "transform 260ms ease";
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);

    if (current >= max * 0.75) {
      // Snap to end and activate
      setHandleX(max);
      dragParent.classList.add("active");

      // Show contact popup
      const contactPopup = document.querySelector(".c-contact");
      if (contactPopup) {
        contactPopup.classList.add("active");
      }

      // Reset slider after delay
      setTimeout(() => {
        resetSlider();
      }, 260);
    } else {
      // Snap back
      resetSlider();
    }
  }

  // Don't use passive so we can prevent default behavior if needed.
  handle.addEventListener("pointerdown", onPointerDown);
});

/* Face image controller based on selections */
document.addEventListener("DOMContentLoaded", () => {
  const faceImage = document.querySelector(".face-image");

  // State varijable
  let selectedColor = 0; // 0=pink, 1=purple, 2=yellow, 3=cream
  let selectedSwitch = 0; // 0=none, 1=graphic, 2=motion, 3=webflow
  let yearsClicked = 0; // 0=no, 1=yes

  // Funkcija za ažuriranje slike sa TV "No Signal" efektom
  function updateFaceImage() {
    if (faceImage) {
      const screen = document.querySelector(".main-device-screen");

      // Sakrij sliku i prikaži static
      faceImage.classList.add("tv-hidden");
      if (screen) {
        screen.classList.add("tv-static");
      }

      // Promeni sliku dok je static aktivan
      setTimeout(() => {
        faceImage.src = `faces/${selectedColor}_${selectedSwitch}_${yearsClicked}.png`;
      }, 100);

      // Ukloni static i prikaži novu sliku sa fade-in
      setTimeout(() => {
        if (screen) {
          screen.classList.remove("tv-static");
        }
        faceImage.classList.remove("tv-hidden");
        faceImage.classList.add("tv-fadein");

        // Ukloni fade-in klasu nakon završetka
        setTimeout(() => {
          faceImage.classList.remove("tv-fadein");
        }, 300);
      }, 200);
    }
  }

  /* Toggle switches functionality */
  const toggles = document.querySelectorAll(".toggle-input");

  toggles.forEach((toggle, index) => {
    toggle.addEventListener("change", function () {
      const toggleItem = this.closest(".toggle-item");
      const toggleText = toggleItem.querySelector(".toggle-text").textContent;

      if (this.checked) {
        console.log(`${toggleText} - ENABLED`);

        // Uncheck all other toggles (samo jedan može biti aktivan)
        toggles.forEach((t, i) => {
          if (i !== index) {
            t.checked = false;
          }
        });

        // Set selected switch (1-based, so add 1 to index)
        selectedSwitch = index + 1;
      } else {
        console.log(`${toggleText} - DISABLED`);
        // If unchecked, set to 0
        selectedSwitch = 0;
      }

      updateFaceImage();
    });
  });

  /* Lock card-2 functionality */
  const lockButton2 = document.querySelector(".lock-info-2 .lock-button");
  const lockInfo2 = document.querySelector(".lock-info-2");
  const lockDoors2 = document.querySelector(".lock-doors-2");
  const card2ContentDesktop = document.querySelector(".card-2-content-desktop");
  const card2ContentMobile = document.querySelector(".card-2-content-mobile");
  const lockCardContainer2 = document.querySelector(".lock-card-container-2");

  if (
    lockButton2 &&
    lockDoors2 &&
    lockInfo2 &&
    lockCardContainer2
  ) {
    lockButton2.addEventListener("click", function () {
      // Add unlocking class to container
      lockCardContainer2.classList.add("unlocking");

      // Hide lock button
      lockInfo2.classList.add("hidden");

      // Open the doors
      lockDoors2.classList.add("opening");

      // Show appropriate content based on screen size
      setTimeout(() => {
        if (window.innerWidth <= 1024) {
          // Mobile: show split container
          if (card2ContentMobile) {
            card2ContentMobile.classList.add("visible");
          }
        } else {
          // Desktop: show social media
          if (card2ContentDesktop) {
            card2ContentDesktop.classList.add("visible");
          }
        }
      }, 300);
    });
  }

  /* Lock card-3 functionality */
  const lockButton3 = document.querySelector(".lock-info-3 .lock-button");
  const lockInfo3 = document.querySelector(".lock-info-3");
  const lockDoors3 = document.querySelector(".lock-doors-3");
  const portfolioContent = document.querySelector(".portfolio-content");
  const lockCardContainer3 = document.querySelector(".lock-card-container-3");

  if (
    lockButton3 &&
    lockDoors3 &&
    portfolioContent &&
    lockInfo3 &&
    lockCardContainer3
  ) {
    lockButton3.addEventListener("click", function () {
      // Add unlocking class to container
      lockCardContainer3.classList.add("unlocking");

      // Hide lock button
      lockInfo3.classList.add("hidden");

      // Open the doors
      lockDoors3.classList.add("opening");

      // Show portfolio content after doors open
      setTimeout(() => {
        portfolioContent.classList.add("visible");
      }, 300);
    });
  }

  /* Lock card-4 functionality */
  const lockButton4 = document.querySelector(".lock-info-4 .lock-button");
  const lockInfo4 = document.querySelector(".lock-info-4");
  const lockDoors4 = document.querySelector(".lock-doors-4");
  const colorButtonsContent = document.querySelector(".color-buttons-content");
  const lockCardContainer4 = document.querySelector(".lock-card-container-4");

  if (
    lockButton4 &&
    lockDoors4 &&
    colorButtonsContent &&
    lockInfo4 &&
    lockCardContainer4
  ) {
    lockButton4.addEventListener("click", function () {
      // Add unlocking class to container
      lockCardContainer4.classList.add("unlocking");

      // Hide lock button
      lockInfo4.classList.add("hidden");

      // Open the doors
      lockDoors4.classList.add("opening");

      // Show color buttons content after doors open
      setTimeout(() => {
        colorButtonsContent.classList.add("visible");
      }, 300);
    });
  }

  /* Lock card-5 functionality */
  const lockButton5 = document.querySelector(".lock-info-5 .lock-button");
  const lockInfo5 = document.querySelector(".lock-info-5");
  const lockDoors5 = document.querySelector(".lock-doors-5");
  const yearsContent5 = document.querySelector(".years-content-5");
  const lockCardContainer5 = document.querySelector(".lock-card-container-5");

  if (
    lockButton5 &&
    lockDoors5 &&
    yearsContent5 &&
    lockInfo5 &&
    lockCardContainer5
  ) {
    lockButton5.addEventListener("click", function () {
      // Add unlocking class to container
      lockCardContainer5.classList.add("unlocking");

      // Hide lock button
      lockInfo5.classList.add("hidden");

      // Open the doors
      lockDoors5.classList.add("opening");

      // Show years content after doors open
      setTimeout(() => {
        yearsContent5.classList.add("visible");
      }, 300);
    });
  }

  /* Lock card-6 functionality */
  const lockButton6 = document.querySelector(".lock-info-6 .lock-button");
  const lockInfo6 = document.querySelector(".lock-info-6");
  const lockDoors6 = document.querySelector(".lock-doors-6");
  const sideProjectsContent = document.querySelector(".side-projects-content");
  const removablePanel = document.querySelector(".removable-panel");
  const lockCardContainer6 = document.querySelector(".lock-card-container-6");

  if (
    lockButton6 &&
    lockDoors6 &&
    sideProjectsContent &&
    lockInfo6 &&
    lockCardContainer6
  ) {
    lockButton6.addEventListener("click", function () {
      // Add unlocking class to container
      lockCardContainer6.classList.add("unlocking");

      // Hide lock button
      lockInfo6.classList.add("hidden");

      // Open the doors
      lockDoors6.classList.add("opening");

      // Show side projects content after doors open
      setTimeout(() => {
        sideProjectsContent.classList.add("visible");
      }, 300);
    });
  }

  /* Removable screws functionality */
  const removableScrews = document.querySelectorAll(".removable-screw");
  const removablePanelInner = document.querySelector(".removable-panel-inner");
  let unscrewedCount = 0;

  removableScrews.forEach((screw) => {
    screw.addEventListener("click", function () {
      if (!this.classList.contains("unscrewed")) {
        this.classList.add("unscrewed");
        unscrewedCount++;

        // Check if all screws are removed
        if (unscrewedCount === removableScrews.length) {
          setTimeout(() => {
            if (removablePanelInner) {
              removablePanelInner.classList.add("all-screws-removed");
            }
          }, 800);
        }
      }
    });
  });

  /* Color buttons functionality */
  const colorButtons = document.querySelectorAll(".color-button");

  colorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      colorButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Update selected color
      if (this.classList.contains("color-button-pink")) {
        selectedColor = 0;
      } else if (this.classList.contains("color-button-purple")) {
        selectedColor = 1;
      } else if (this.classList.contains("color-button-yellow")) {
        selectedColor = 2;
      } else if (this.classList.contains("color-button-cream")) {
        selectedColor = 3;
      }

      updateFaceImage();
    });
  });

  /* 6 Years click functionality */
  const yearsCircles = document.querySelectorAll(".years-circle");
  yearsCircles.forEach((yearsCircle) => {
    yearsCircle.addEventListener("click", function () {
      yearsClicked = yearsClicked === 0 ? 1 : 0;
      // Add visual feedback to all years circles
      yearsCircles.forEach((circle) => {
        circle.style.transform = yearsClicked === 1 ? "scale(0.95)" : "scale(1)";
      });
      updateFaceImage();
    });
  });

  /* Contact Popup Close functionality */
  const contactPopup = document.querySelector(".c-contact");
  const popupBgExit = document.querySelector(".popup__bg-exit");
  const popupExitButtons = document.querySelectorAll(".is--popup-exit");

  // Close popup when clicking on background
  if (popupBgExit && contactPopup) {
    popupBgExit.addEventListener("click", function () {
      contactPopup.classList.remove("active");
    });
  }

  // Close popup when clicking on exit button
  popupExitButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (contactPopup) {
        contactPopup.classList.remove("active");
      }
    });
  });

  /* Project Popup functionality */
  const projectPopup = document.querySelector(".project-popup");
  const projectPopupOverlay = document.querySelector(".project-popup-overlay");
  const projectPopupExit = document.querySelector(".project-popup-exit");
  const projectPopupIcon = document.querySelector(".project-popup-icon");
  const projectPopupTitle = document.querySelector(".project-popup-title");
  const projectPopupDescription = document.querySelector(".project-popup-description");
  const projectPopupBtn = document.querySelector(".project-popup-btn");
  const projectCards = document.querySelectorAll(".side-project-card");

  // Project data
  const projectData = {
    1: {
      title: "PROJECT ONE",
      description: "This is a detailed description of project one. It showcases my skills in web development and design.",
      link: "https://example.com/project1",
      icon: "🚀"
    },
    2: {
      title: "PROJECT TWO",
      description: "This is a detailed description of project two. A creative solution for modern web applications.",
      link: "https://example.com/project2",
      icon: "🎨"
    },
    3: {
      title: "PROJECT THREE",
      description: "This is a detailed description of project three. An innovative approach to user experience design.",
      link: "https://example.com/project3",
      icon: "💡"
    },
    4: {
      title: "PROJECT FOUR",
      description: "This is a detailed description of project four. A comprehensive digital solution for businesses.",
      link: "https://example.com/project4",
      icon: "🔥"
    }
  };

  // Function to open project popup
  function openProjectPopup(projectId) {
    const project = projectData[projectId];
    if (!project) return;

    // Populate popup content
    if (projectPopupIcon) projectPopupIcon.textContent = project.icon;
    if (projectPopupTitle) projectPopupTitle.textContent = project.title;
    if (projectPopupDescription) projectPopupDescription.textContent = project.description;
    if (projectPopupBtn) projectPopupBtn.href = project.link;

    // Show popup
    if (projectPopup) {
      projectPopup.classList.add("active");
      // Add transform animation class after popup is visible
      setTimeout(() => {
        const container = document.querySelector(".project-popup-container");
        if (container) {
          container.style.transform = "translateY(0)";
        }
      }, 10);
    }
  }

  // Function to close project popup
  function closeProjectPopup() {
    const container = document.querySelector(".project-popup-container");
    if (container) {
      container.style.transform = "translateY(30px)";
    }
    setTimeout(() => {
      if (projectPopup) {
        projectPopup.classList.remove("active");
      }
    }, 200);
  }

  // Add click event to project cards
  projectCards.forEach((card) => {
    card.addEventListener("click", function () {
      const projectId = this.getAttribute("data-project");
      if (projectId) {
        openProjectPopup(projectId);
      }
    });
  });

  // Close popup when clicking overlay
  if (projectPopupOverlay) {
    projectPopupOverlay.addEventListener("click", closeProjectPopup);
  }

  // Close popup when clicking exit button
  if (projectPopupExit) {
    projectPopupExit.addEventListener("click", closeProjectPopup);
  }

  // Close popup when pressing Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && projectPopup && projectPopup.classList.contains("active")) {
      closeProjectPopup();
    }
  });
});
