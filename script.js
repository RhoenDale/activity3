// PHASE 2 & ACTIVITY 3 - JavaScript & DOM Manipulation
// Activity 2: Form Validation & DOM Interactivity
// Activity 3: Event-Driven Behaviors
document.addEventListener("DOMContentLoaded", () => {
  // ========================================
  // SETUP: Get form elements
  // ========================================
  const form = document.getElementById("registrationForm");
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const termsCheckbox = document.getElementById("terms");
  const submitButton = document.getElementById("submitBtn");
  const togglePassword = document.getElementById("togglePassword");

  // Array of all input fields for validation
  const allInputs = [firstNameInput, lastNameInput, emailInput, passwordInput];

  // ========================================
  // ACTIVITY 3: EVENT #1 - submit
  // ========================================
  /**
   * EVENT TYPE: submit
   * TRIGGERED: When user clicks the submit button
   * DESCRIPTION: Prevents default form submission and validates all fields
   * VISIBLE FEEDBACK: 
   *   - Red borders on empty fields
   *   - Alert message if validation fails
   *   - Success message if validation passes
   *   - Form resets after successful submission
   */
  form.addEventListener("submit", (event) => {
    // Prevent automatic form submission
    event.preventDefault();

    // Validate all fields
    let allFieldsValid = true;
    allInputs.forEach((input) => {
      if (input.value.trim() === "") {
        // Red border for empty fields
        input.style.borderColor = "red";
        allFieldsValid = false;
      } else {
        // Reset border color if valid
        input.style.borderColor = "#4a4a5a";
      }
    });

    if (!allFieldsValid) {
      // Display alert if validation fails
      alert("Please fill out all fields.");
    } else {
      // Create and display success message using DOM methods
      let successMessage = document.querySelector(".success-message");
      if (!successMessage) {
        successMessage = document.createElement("p");
        successMessage.classList.add("success-message");
        successMessage.style.color = "#4ade80";
        successMessage.style.marginTop = "15px";
        successMessage.style.fontWeight = "500";
        successMessage.style.textAlign = "center";
        form.appendChild(successMessage);
      }
      successMessage.textContent = "✓ Account created successfully!";

      // Reset form fields
      form.reset();

      // Reset button state
      submitButton.disabled = !termsCheckbox.checked;

      // Remove success message after 3 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
  });

  // ========================================
  // ACTIVITY 3: EVENT #2 & #3 - focus & blur
  // ========================================
  /**
   * EVENT TYPE: focus
   * TRIGGERED: When user clicks into an input field
   * DESCRIPTION: Changes input background and border when field is active
   * VISIBLE FEEDBACK: Background turns lighter gray, border turns purple
   */
  /**
   * EVENT TYPE: blur
   * TRIGGERED: When user clicks away from an input field
   * DESCRIPTION: Resets input styling when field is inactive
   * VISIBLE FEEDBACK: Background and border return to default dark gray
   */
  allInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.backgroundColor = "#4a4a5a";
      input.style.borderColor = "#8a2be2";
    });

    input.addEventListener("blur", () => {
      input.style.backgroundColor = "#3a3a4d";
      input.style.borderColor = "#4a4a5a";
    });
  });

  // ========================================
  // ACTIVITY 3: EVENT #4 - click
  // ========================================
  /**
   * EVENT TYPE: click
   * TRIGGERED: When user clicks the eye icon
   * DESCRIPTION: Toggles password visibility between hidden and visible
   * VISIBLE FEEDBACK: 
   *   - Icon changes from fa-eye to fa-eye-slash
   *   - Password text appears or disappears
   */
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.classList.toggle("fa-eye-slash");
  });

  // ========================================
  // ACTIVITY 3: EVENT #5 - change
  // ========================================
  /**
   * EVENT TYPE: change
   * TRIGGERED: When user checks or unchecks the terms checkbox
   * DESCRIPTION: Enables or disables submit button based on checkbox state
   * VISIBLE FEEDBACK: 
   *   - Button opacity changes (fully visible or faded)
   *   - Cursor changes (pointer or not-allowed)
   *   - Button becomes enabled or disabled
   */
  termsCheckbox.addEventListener("change", () => {
    submitButton.disabled = !termsCheckbox.checked;
    if (termsCheckbox.checked) {
      submitButton.style.opacity = "1";
      submitButton.style.cursor = "pointer";
    } else {
      submitButton.style.opacity = "0.5";
      submitButton.style.cursor = "not-allowed";
    }
  });

  // Initial button state
  if (!termsCheckbox.checked) {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
  }

  // ========================================
  // ACTIVITY 3: EVENT #6 - input (email)
  // ========================================
  /**
   * EVENT TYPE: input
   * TRIGGERED: As user types in the email field
   * DESCRIPTION: Validates email format in real-time
   * VISIBLE FEEDBACK: 
   *   - Border turns green when email is valid (contains @ and .)
   *   - Border turns red when email is invalid but has content
   *   - Border returns to default gray when field is empty
   */
  emailInput.addEventListener("input", () => {
    const email = emailInput.value.trim();
    if (email.includes("@") && email.includes(".")) {
      emailInput.style.borderColor = "#4ade80";
      emailInput.style.color = "#4ade80";
    } else if (email.length > 0) {
      emailInput.style.borderColor = "#ef4444";
      emailInput.style.color = "#ef4444";
    } else {
      emailInput.style.borderColor = "#4a4a5a";
      emailInput.style.color = "white";
    }
  });

  // ========================================
  // ACTIVITY 3: EVENT #7 - input (password)
  // ========================================
  /**
   * EVENT TYPE: input
   * TRIGGERED: As user types in the password field
   * DESCRIPTION: Shows password strength indicator
   * VISIBLE FEEDBACK: 
   *   - Border turns green when password is strong (8+ characters)
   *   - Border turns yellow when password is weak (< 8 characters)
   *   - Border returns to default gray when field is empty
   */
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    if (password.length >= 8) {
      passwordInput.style.borderColor = "#4ade80";
    } else if (password.length > 0) {
      passwordInput.style.borderColor = "#fbbf24";
    } else {
      passwordInput.style.borderColor = "#4a4a5a";
    }
  });

  // ========================================
  // BONUS: Auto-clear error styling
  // ========================================
  /**
   * EVENT TYPE: input
   * TRIGGERED: As user types in any input field
   * DESCRIPTION: Removes red error border when user starts typing
   * VISIBLE FEEDBACK: Red error border disappears when user begins typing
   */
  allInputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (input.style.borderColor === "red" && input.value.trim() !== "") {
        input.style.borderColor = "#4a4a5a";
      }
    });
  });

  // ========================================
  // ACTIVITY 3: EVENT #8 & #9 - mouseover & mouseout (NEW)
  // ========================================
  /**
   * EVENT TYPE: mouseover
   * TRIGGERED: When user hovers over the submit button
   * DESCRIPTION: Adds hover effect to make button more interactive
   * VISIBLE FEEDBACK: Button scales up slightly and adds shadow
   */
  /**
   * EVENT TYPE: mouseout
   * TRIGGERED: When user moves mouse away from button
   * DESCRIPTION: Resets button to normal state
   * VISIBLE FEEDBACK: Button returns to original size and removes shadow
   */
  submitButton.addEventListener("mouseover", () => {
    if (!submitButton.disabled) {
      submitButton.style.transform = "scale(1.05)";
      submitButton.style.transition = "transform 0.2s ease";
      submitButton.style.boxShadow = "0 5px 15px rgba(138, 43, 226, 0.4)";
    }
  });

  submitButton.addEventListener("mouseout", () => {
    submitButton.style.transform = "scale(1)";
    submitButton.style.boxShadow = "none";
  });

  // Social login buttons hover effect
  const socialButtons = document.querySelectorAll(".google-btn, .apple-btn");
  socialButtons.forEach((button) => {
    button.addEventListener("mouseover", function () {
      this.style.transform = "translateY(-2px)";
      this.style.transition = "transform 0.2s ease";
      this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    });

    button.addEventListener("mouseout", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });
});
