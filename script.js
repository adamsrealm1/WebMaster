const contactForm = document.querySelector("#contact-form");

if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const statusMessage = contactForm.querySelector(".form-status");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const originalButtonText = submitButton.textContent;
    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    statusMessage.textContent = "";
    statusMessage.classList.remove("error");

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The message could not be sent.");
      }

      contactForm.reset();
      statusMessage.textContent = "Your project request was sent.";
    } catch (error) {
      statusMessage.textContent = "The message could not be sent. Please email arod69@gmail.com directly.";
      statusMessage.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}
