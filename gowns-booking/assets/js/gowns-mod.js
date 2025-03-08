document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".step"); // Each step container
    const nextButtons = document.querySelectorAll(".btn-next");
    const prevButtons = document.querySelectorAll(".btn-previous");
    const formData = {};
  
    let currentStep = 0;
  
    const validateStep = (stepIndex) => {
      const inputs = steps[stepIndex].querySelectorAll("input, select, textarea");
      let isValid = true;
  
      inputs.forEach((input) => {
        if (!input.checkValidity()) {
          isValid = false;
          input.classList.add("is-invalid");
        } else {
          input.classList.remove("is-invalid");
          input.classList.add("is-valid");
          formData[input.id] = input.value; // Collect data
        }
      });
  
      return isValid;
    };
  
    const showStep = (index) => {
      steps.forEach((step, i) => {
        step.style.display = i === index ? "block" : "none";
      });
    };
  
    nextButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        if (validateStep(currentStep)) {
          currentStep++;
          showStep(currentStep);
        }
      });
    });
  
    prevButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentStep--;
        showStep(currentStep);
      });
    });
  
    document.getElementById("publishButton").addEventListener("click", () => {
      if (validateStep(currentStep)) {
        console.log("Form Data Submitted:", formData);
        alert("Form successfully submitted!");
      }
    });
  
    showStep(currentStep); // Initialize the first step
  });
  