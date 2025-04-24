'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
//modalCloseBtn.addEventListener("click", testimonialsModalFunc);
//overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// Social Select 
const socialCategory = document.querySelector("[social-data-select]");
const socialSelectItems = document.querySelectorAll("[social-data-select-item]");
const socialSelectValue = document.querySelector("[social-data-selecct-value]");
const socialFilterBtn = document.querySelectorAll("[social-data-filter-btn]");

socialCategory.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < socialSelectItems.length; i++) {
  socialSelectItems[i].addEventListener("click", function () {

    let socialSelectedValue = this.innerText.toLowerCase();
    socialSelectValue.innerText = this.innerText;
    elementToggleFunc(socialCategory);
    socialFilterFunc(socialSelectedValue);

  });
}

// filter variables
const socialFilterItems = document.querySelectorAll("[social-data-filter-item]");

const socialFilterFunc = function (selectedValue) {
  if (selectedValue === "mastodon") {
    document.getElementById("mastodon-social-posts").classList.remove("hidden");
    document.getElementById("bluesky-social-posts").classList.add("hidden");
  }
  if (selectedValue === "bluesky") {
    document.getElementById("mastodon-social-posts").classList.add("hidden");
    document.getElementById("bluesky-social-posts").classList.remove("hidden");

  }
  for (let i = 0; i < socialFilterItems.length; i++) {

    if (selectedValue === "all") {
      socialFilterItems[i].classList.add("active");
    } else if (selectedValue === socialFilterItems[i].dataset.category) {
      socialFilterItems[i].classList.add("active");
      socialCategory.classList.remove("active");
    } else {
      socialFilterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let socialLastClickedBtn = socialFilterBtn[0];

for (let i = 0; i < socialFilterBtn.length; i++) {

  socialFilterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    socialSelectValue.innerText = this.innerText;
    socialFilterFunc(selectedValue);
    socialLastClickedBtn.classList.remove("active");
    this.classList.add("active");
    socialLastClickedBtn = this;

  });

}


// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

window.onload = async function () {
  let displayBanner = false;
  let checkMode = {
    action: "settings",
  }
  const settings = await fetch('https://api.rantk.com/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(checkMode)
  });
  const result = await settings.json();
  if(result?.settings?.maintenance_mode == true){
    displayBanner = true;
    const body = document.body;
    body.insertAdjacentHTML('afterbegin', result?.banner)
  }

  try {
    if (checkCookie('auth_token')) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('auth_token=')) {

          let data = {
            action: "content",
            token: cookie.split("=")[1]
          };
          const res = await fetch('https://api.rantk.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          const result = await res.json();
          if (result?.error == "Invalid or expired token") {
            throw new Error("Invalid or expired token");
          }
          if (result?.content) {
            const mainContent = document.querySelector('.main-content');
            const navBarList = document.querySelector('.navbar-list');
            const signOutBtn = document.querySelector('.sidebar-info');

            mainContent.insertAdjacentHTML('beforeend', result?.content?.adminContent)
            if(displayBanner){
              document.getElementById("show-maintenance-banner").checked = true;
            }
            navBarList.insertAdjacentHTML('beforeend', result?.content?.navBar);
            signOutBtn.insertAdjacentHTML('afterbegin', result?.content?.signOutBtn)
            document.getElementById('signOut').addEventListener("click", function () {
              deleteCookie("auth_token");
              location.reload();
            });
            document.getElementById("show-maintenance-banner").addEventListener("click", async function () {
              let updateBanner = {
                action: "updatesetting",
                token: cookie.split("=")[1],
                setting: "maintenance_mode",
                value: document.getElementById("show-maintenance-banner").checked ? "true" : "false"
              };
              const res = await fetch('https://api.rantk.com/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateBanner)
              });
              const result = await res.json();
              result?.success == true ? location.reload() : ""
            });

            try {
              const adminCategory = document.querySelector("[admin-data-select]");
              const adminSelectItems = document.querySelectorAll("[admin-data-select-item]");
              const adminSelectValue = document.querySelector("[admin-data-selecct-value]");
              const adminFilterBtn = document.querySelectorAll("[admin-data-filter-btn]");

              adminCategory.addEventListener("click", function () { elementToggleFunc(this); });

              for (let i = 0; i < adminSelectItems.length; i++) {
                adminSelectItems[i].addEventListener("click", function () {
                  let adminSelectedValue = this.innerText.toLowerCase();
                  adminSelectValue.innerText = this.innerText;
                  elementToggleFunc(adminCategory);
                  adminFilterFunc(adminSelectedValue);
                });
              }

              const adminFilterItems = document.querySelectorAll("[admin-data-filter-item]");

              const adminFilterFunc = function (selectedValue) {
                if (selectedValue === "messages") {
                  getMessages();
                  document.getElementById("admin-messages").classList.remove("hidden");
                  document.getElementById("admin-settings").classList.add("hidden");
                }
                if (selectedValue === "settings") {
                  document.getElementById("admin-messages").classList.add("hidden");
                  document.getElementById("admin-settings").classList.remove("hidden");
                }
                for (let i = 0; i < adminFilterItems.length; i++) {

                  if (selectedValue === "all") {
                    adminFilterItems[i].classList.add("active");
                  } else if (selectedValue === adminFilterItems[i].dataset.category) {
                    adminFilterItems[i].classList.add("active");
                    adminCategory.classList.remove("active");
                  } else {
                    adminFilterItems[i].classList.remove("active");
                  }

                }

              }

              // add event in all filter button items for large screen
              let adminLastClickedBtn = adminFilterBtn[0];

              for (let i = 0; i < adminFilterBtn.length; i++) {

                adminFilterBtn[i].addEventListener("click", function () {

                  let selectedValue = this.innerText.toLowerCase();
                  adminSelectValue.innerText = this.innerText;
                  socialFilterFunc(selectedValue);
                  adminLastClickedBtn.classList.remove("active");
                  this.classList.add("active");
                  adminLastClickedBtn = this;
                });
              }
            }
            catch (err) {

            }
          }
          let getMsgs = {
            action: "getmessages",
            token: cookie.split("=")[1]
          }
          const msgs = await fetch('https://api.rantk.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getMsgs)
          });

          const msgResult = await msgs.json();
          renderMessages(msgResult);
        }
      }
      // ✅ Now that DOM is updated, attach nav link event listeners
      const navigationLinks = document.querySelectorAll("[data-nav-link]");
      const pages = document.querySelectorAll("[data-page]");

      for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener("click", function () {
          for (let j = 0; j < pages.length; j++) {
            if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
              pages[j].classList.add("active");
              navigationLinks[j].classList.add("active");
              window.scrollTo(0, 0);
            } else {
              pages[j].classList.remove("active");
              navigationLinks[j].classList.remove("active");
            }
          }
        });
      };
    } else {
      console.log('Token not found!');
    }
  } catch (err) {
    deleteCookie("auth_token");
    showToast("Please sign in again.");
  }
};

document.addEventListener('keydown', function (event) {
  // Detect Ctrl + Shift + A key combination
  if (event.shiftKey && event.key === 'A') {
    // Open the admin login panel
    const modal = document.getElementById('admin-modal');
    if (!checkCookie('auth_token')) {
      modal.style.display === 'none' ? openAdminPanel() : closeAdminModal();
    }
    else {
      showToast("Already Logged in!")
    }
  }
});

function openAdminPanel() {
  // Display the login form for the admin panel
  const adminPanel = document.getElementById('admin-modal');
  adminPanel.style.display = 'block';  // Show the panel
}

function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("register-form");
  const toggleButton = document.getElementById("toggle-btn");

  if (loginForm.style.display === "none") {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    toggleButton.innerHTML = "Don't have an account?";
  } else {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    toggleButton.innerHTML = "Already have an account?";
  }
}

// Close the admin modal
function closeAdminModal() {
  const modal = document.getElementById('admin-modal');
  modal.style.display = 'none';  // Hide the modal
}


function checkCookie(cookieName) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim(); // Clean up any extra spaces
    if (cookie.startsWith(cookieName + '=')) {
      return true; // Cookie found
    }
  }
  return false; // Cookie not found
}

async function getMessages() {
  if (checkCookie('auth_token')) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('auth_token=')) {
        let getMsgs = {
          action: "getmessages",
          token: cookie.split("=")[1]
        }
        const msgs = await fetch('https://api.rantk.com/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getMsgs)
        });

        const msgResult = await msgs.json();
        renderMessages(msgResult);
      }
    }
  }
}

function renderMessages(response) {
  // const adminPage = document.querySelector("article.admin");
  const adminPage = document.getElementById("admin-messages");
  const modal = document.querySelector(".messageModal");

  if (!adminPage || !modal) return;

  // Clear old messages
  adminPage.querySelectorAll('.message-card').forEach(el => el.remove());

  response.messages.forEach(msg => {
    const div = document.createElement('div');
    div.classList.add('message-card', msg.viewed ? 'viewed' : 'unread');

    div.innerHTML = `
      <h3 class="message-name">${msg.name}</h3>
      <p class="message-email">&lt;${msg.email}&gt;</p>
      <span class="message-date">${msg.created_at}</span>
    `;

    div.addEventListener('click', async () => {
      modal.querySelector(".modal-name").innerText = msg.name;
      modal.querySelector(".modal-email").innerText = msg.email;
      modal.querySelector(".modal-message").innerText = msg.message;
      modal.querySelector(".modal-date").innerText = `Received on ${msg.created_at}`;
      var closeBtn = document.querySelector('.close');
      closeBtn.addEventListener('click', function () {
        modal.style.display = "none";
        getMessages();
      });
      modal.style.display = 'block';
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('auth_token=')) {
          let getMsgs = {
            action: "markread",
            token: cookie.split("=")[1],
            id: msg.id
          }
          const msgs = await fetch('https://api.rantk.com/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(getMsgs)
          });

          const msgResult = await msgs.json();
          if (!msgResult.success == true) {
            console.log("Error updating Message")
          }
        }
      }
    });

    adminPage.appendChild(div);
  });
}

function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;

  const container = document.getElementById('toast-container');
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  // Hide and remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300); // Allow transition time
  }, duration);
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}