
// document.addEventListener('DOMContentLoaded', () => {
//     const formData = {
//         businessDetails: {}, // Object to store business details
//         individuals: [] // Array to store data for multiple individuals
//     };

//     // Function to display form data in the preview step
//     function displayFormData(formData) {
//         const formDataOutput = document.getElementById('formDataOutput');
//         formDataOutput.innerHTML = ''; // Clear previous content

//         // Display the number of gowns booked
//         const gownsBooked = document.createElement('div');
//         gownsBooked.className = 'col-12 mb-4';
//         gownsBooked.innerHTML = `<h4>Total Gowns Booked: ${formData.individuals.length}</h4>`;
//         formDataOutput.appendChild(gownsBooked);

//         // Display Business Details in a single card
//         const businessCard = document.createElement('div');
//         businessCard.className = 'col-md-12 mb-4';

//         const card = document.createElement('div');
//         card.className = 'card h-100';

//         const cardBody = document.createElement('div');
//         cardBody.className = 'card-body';

//         const cardTitle = document.createElement('h5');
//         cardTitle.className = 'card-title';
//         cardTitle.textContent = 'Business Details';

//         const cardText = document.createElement('pre');
//         cardText.className = 'card-text';
//         cardText.textContent = JSON.stringify(formData.businessDetails, null, 2);

//         cardBody.appendChild(cardTitle);
//         cardBody.appendChild(cardText);
//         card.appendChild(cardBody);
//         businessCard.appendChild(card);
//         formDataOutput.appendChild(businessCard);

//         // Loop through the individuals and display their data
//         formData.individuals.forEach((individual, index) => {
//             const individualCard = document.createElement('div');
//             individualCard.className = 'col-md-6 mb-3';

//             const card = document.createElement('div');
//             card.className = 'card h-100';

//             const cardBody = document.createElement('div');
//             cardBody.className = 'card-body';

//             const cardTitle = document.createElement('h5');
//             cardTitle.className = 'card-title';
//             cardTitle.textContent = `Individual ${index + 1}`;

//             const cardText = document.createElement('pre');
//             cardText.className = 'card-text';
//             cardText.textContent = JSON.stringify(individual, null, 2);

//             cardBody.appendChild(cardTitle);
//             cardBody.appendChild(cardText);
//             card.appendChild(cardBody);
//             individualCard.appendChild(card);
//             formDataOutput.appendChild(individualCard);
//         });
//     }

//     // Function to show the specified step and hide others
//     function showStep(stepNumber) {
//         document.querySelectorAll('.step').forEach((step) => {
//             step.style.display = 'none';
//         });
//         const currentStep = document.getElementById(`step${stepNumber}`);
//         if (currentStep) {
//             currentStep.style.display = 'block';
//             setupRealTimeValidation(stepNumber);
//         }
//     }

//     // Function to save data from a specific step
//     function saveStepData(stepNumber) {
//         const step = document.getElementById(`step${stepNumber}`);
//         if (step) {
//             const inputs = step.querySelectorAll('input, select, textarea');
//             if (stepNumber === 1 || stepNumber === 2) {
//                 // Save business details for steps 1 and 2
//                 inputs.forEach((input) => {
//                     if (input.name) {
//                         formData.businessDetails[input.name] = input.value.trim();
//                     }
//                 });
//                 console.log('Business Details Saved:', formData.businessDetails);
//             } else if (stepNumber === 3) {
//                 // Save individual gown details for step 3
//                 const individualData = {};
//                 inputs.forEach((input) => {
//                     if (input.name) {
//                         individualData[input.name] = input.value.trim();
//                     }
//                 });
//                 formData.individuals.push(individualData);
//                 console.log('Individual Gown Details Saved:', individualData);
//             }
//         }
//     }

//     // Function to reset the form
//     function resetForm() {
//         document.querySelectorAll('input, select, textarea').forEach((field) => {
//             if (field.type !== 'button' && field.type !== 'submit') {
//                 field.value = ''; // Clear all fields
//                 field.classList.remove('is-valid', 'is-invalid');
//             }
//         });
//         formData.businessDetails = {}; // Clear business details
//         formData.individuals = []; // Clear saved individuals
//         showStep(1); // Go back to the first step
//     }

//     // Function to validate a step
//     function validateStep(stepNumber) {
//         let isValid = true;
//         const step = document.getElementById(`step${stepNumber}`);
//         const requiredFields = step.querySelectorAll('[required]');

//         requiredFields.forEach((field) => {
//             field.classList.remove('is-invalid', 'is-valid');
//             const feedback = field.nextElementSibling;
//             if (feedback && feedback.classList.contains('invalid-feedback')) {
//                 feedback.remove();
//             }
//         });

//         requiredFields.forEach((field) => {
//             if (!field.value.trim()) {
//                 isValid = false;
//                 field.classList.add('is-invalid');

//                 let feedback = field.nextElementSibling;
//                 if (!feedback || !feedback.classList.contains('invalid-feedback')) {
//                     const errorMessage = document.createElement('div');
//                     errorMessage.className = 'invalid-feedback';
//                     errorMessage.textContent = 'This field is required.';
//                     field.parentNode.appendChild(errorMessage);
//                 }
//             } else {
//                 field.classList.add('is-valid');
//             }
//         });

//         if (!isValid) {
//             displayNotification('Please fill all required fields correctly.', 'danger');
//         } else {
//             const notification = document.getElementById('validation-notification');
//             if (notification) {
//                 notification.textContent = '';
//             }
//         }

//         return isValid;
//     }

//     // Function to set up real-time validation
//     function setupRealTimeValidation(stepNumber) {
//         const step = document.getElementById(`step${stepNumber}`);
//         if (!step) return;

//         const inputFields = step.querySelectorAll('input, select, textarea');

//         inputFields.forEach((field) => {
//             field.addEventListener('input', () => {
//                 if (field.value.trim()) {
//                     field.classList.remove('is-invalid');
//                     field.classList.add('is-valid');
//                     const feedback = field.nextElementSibling;
//                     if (feedback && feedback.classList.contains('invalid-feedback')) {
//                         feedback.remove();
//                     }
//                 }
//             });

//             if (field.tagName === 'SELECT') {
//                 field.addEventListener('change', () => {
//                     if (field.value.trim()) {
//                         field.classList.remove('is-invalid');
//                         field.classList.add('is-valid');
//                         const feedback = field.nextElementSibling;
//                         if (feedback && feedback.classList.contains('invalid-feedback')) {
//                             feedback.remove();
//                         }
//                     }
//                 });
//             }
//         });
//     }

//     // Set the initial step
//     showStep(1);

//     // Next and Previous buttons functionality
//     document.querySelectorAll('button, a').forEach((button) => {
//         button.addEventListener('click', (event) => {
//             const targetStep = event.target.getAttribute('onclick')?.match(/\d+/)?.[0];
//             if (targetStep) {
//                 event.preventDefault();
//                 const currentStepNumber = Array.from(document.querySelectorAll('.step')).findIndex(
//                     (step) => step.style.display === 'block'
//                 ) + 1;

//                 if (Number(targetStep) > currentStepNumber) {
//                     if (validateStep(currentStepNumber)) {
//                         saveStepData(currentStepNumber);
//                         displayFormData(formData);
//                         showStep(Number(targetStep));
//                     }
//                 } else {
//                     saveStepData(currentStepNumber);
//                     showStep(Number(targetStep));
//                 }
//             }
//         });
//     });

//     // Save and Add Another button functionality
//     document.getElementById('saveAndAddAnother')?.addEventListener('click', (event) => {
//         event.preventDefault();
//         if (validateStep(3)) { // Validate step 3 (gown details)
//             saveStepData(3); // Save current individual's data
//             resetStep3(); // Reset step 3 for the next individual
//             displayNotification('Gown details saved. You can add another individual.', 'success');
//         }
//     });

//     // Function to reset step 3 (gown details)
//     function resetStep3() {
//         const step3 = document.getElementById('step3');
//         if (step3) {
//             step3.querySelectorAll('input, select, textarea').forEach((field) => {
//                 if (field.type !== 'button' && field.type !== 'submit') {
//                     field.value = ''; // Clear all fields
//                     field.classList.remove('is-valid', 'is-invalid');
//                 }
//             });
//         }
//     }

//     // Submit form functionality
//     document.getElementById('publish-btn')?.addEventListener('click', (event) => {
//         event.preventDefault();
//         if (validateStep(4)) { // Validate step 4 (review and publish)
//             submitForm(formData); // Submit the form data
//         }
//     });

//     // Function to submit form data
//     function submitForm(formData) {
//         console.log('Form Data:', formData);

//         // Validate form data before submission
//         if (
//             Object.keys(formData.businessDetails).length === 0 ||
//             formData.individuals.length === 0
//         ) {
//             displayNotification('Please fill in all required fields.', 'danger');
//             return;
//         }

//         // Send the form data to the server using fetch or AJAX
//         fetch('gowns.php', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData),
//         })
//             .then((response) => response.text())
//             .then((data) => {
//                 console.log('Server Response:', data);
//                 if (data === 'success') {
//                     displayNotification('Form submitted successfully!', 'success');
//                     resetForm(); // Reset the form after successful submission
//                 } else {
//                     displayNotification('Error: ' + data, 'danger');
//                 }
//             })
//             .catch((error) => {
//                 console.error('Error:', error);
//                 displayNotification('There was an error submitting the form.', 'danger');
//             });
//     }

//     // Function to display a notification
//     function displayNotification(message, type = 'danger') {
//         const alertContainer = document.getElementById('alert-container');
//         if (!alertContainer) return;

//         // Clear previous alerts
//         alertContainer.innerHTML = '';

//         // Create a new alert element
//         const alertDiv = document.createElement('div');
//         alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
//         alertDiv.setAttribute('role', 'alert');

//         // Add the message
//         const messageText = document.createElement('span');
//         messageText.textContent = message;
//         alertDiv.appendChild(messageText);

//         // Add a close button
//         const closeButton = document.createElement('button');
//         closeButton.type = 'button';
//         closeButton.className = 'btn-close';
//         closeButton.setAttribute('data-bs-dismiss', 'alert');
//         closeButton.setAttribute('aria-label', 'Close');
//         alertDiv.appendChild(closeButton);

//         // Append the alert to the container
//         alertContainer.appendChild(alertDiv);

//         // Auto-remove the alert after 4 seconds
//         setTimeout(() => {
//             alertDiv.remove();
//         }, 4000);
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const formData = {
        businessDetails: {}, // Object to store business details
        individuals: [] // Array to store data for multiple individuals
    };

    // Function to display form data in the preview step
    function displayFormData(formData) {
        const formDataOutput = document.getElementById('formDataOutput');
        formDataOutput.innerHTML = ''; // Clear previous content
    
        // Display the number of gowns booked
        const gownsBooked = document.createElement('div');
        gownsBooked.className = 'col-12 mb-4';
        gownsBooked.innerHTML = `<h4>Total Gowns Booked: ${formData.individuals.length}</h4>`;
        formDataOutput.appendChild(gownsBooked);
    
        // Display Business Details in a single card
        const businessCard = document.createElement('div');
        businessCard.className = 'col-md-12 mb-4';
    
        const card = document.createElement('div');
        card.className = 'card h-100';
    
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
    
        const cardTitle = document.createElement('h5');
        cardTitle.className = 'card-title';
        cardTitle.textContent = 'Business Details';
    
        // Format business details as plain text
        const businessDetailsText = Object.entries(formData.businessDetails)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
    
        const cardText = document.createElement('pre');
        cardText.className = 'card-text';
        cardText.textContent = businessDetailsText; // Display plain text instead of JSON
    
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        businessCard.appendChild(card);
        formDataOutput.appendChild(businessCard);
    
        // Loop through the individuals and display their data
        formData.individuals.forEach((individual, index) => {
            const individualCard = document.createElement('div');
            individualCard.className = 'col-md-6 mb-3';
    
            const card = document.createElement('div');
            card.className = 'card h-100';
    
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';
    
            const cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            cardTitle.textContent = `Individual ${index + 1}`;
    
            // Format individual details as plain text
            const individualDetailsText = Object.entries(individual)
                .map(([key, value]) => `${key}: ${value}`)
                .join('\n');
    
            const cardText = document.createElement('pre');
            cardText.className = 'card-text';
            cardText.textContent = individualDetailsText; // Display plain text instead of JSON
    
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            card.appendChild(cardBody);
            individualCard.appendChild(card);
            formDataOutput.appendChild(individualCard);
        });
    }

    // Function to show the specified step and hide others
    function showStep(stepNumber) {
        document.querySelectorAll('.step').forEach((step) => {
            step.style.display = 'none';
        });
        const currentStep = document.getElementById(`step${stepNumber}`);
        if (currentStep) {
            currentStep.style.display = 'block';
            setupRealTimeValidation(stepNumber);
        }
    }

    // Function to save data from a specific step
    function saveStepData(stepNumber) {
        const step = document.getElementById(`step${stepNumber}`);
        if (step) {
            const inputs = step.querySelectorAll('input, select, textarea');
            if (stepNumber === 1 || stepNumber === 2) {
                // Save business details for steps 1 and 2
                inputs.forEach((input) => {
                    if (input.name) {
                        formData.businessDetails[input.name] = input.value.trim();
                    }
                });
                console.log('Business Details Saved:', formData.businessDetails);
            } else if (stepNumber === 3) {
                // Save individual gown details for step 3
                const individualData = {};
                inputs.forEach((input) => {
                    if (input.name) {
                        individualData[input.name] = input.value.trim();
                    }
                });
                formData.individuals.push(individualData);
                console.log('Individual Gown Details Saved:', individualData);
            }
        }
    }

    // Function to reset the form
    function resetForm() {
        document.querySelectorAll('input, select, textarea').forEach((field) => {
            if (field.type !== 'button' && field.type !== 'submit') {
                field.value = ''; // Clear all fields
                field.classList.remove('is-valid', 'is-invalid');
            }
        });
        formData.businessDetails = {}; // Clear business details
        formData.individuals = []; // Clear saved individuals
        showStep(1); // Go back to the first step
    }

    // Function to validate a step
    function validateStep(stepNumber) {
        let isValid = true;
        const step = document.getElementById(`step${stepNumber}`);
        const requiredFields = step.querySelectorAll('[required]');

        requiredFields.forEach((field) => {
            field.classList.remove('is-invalid', 'is-valid');
            const feedback = field.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
        });

        requiredFields.forEach((field) => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('is-invalid');

                let feedback = field.nextElementSibling;
                if (!feedback || !feedback.classList.contains('invalid-feedback')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'invalid-feedback';
                    errorMessage.textContent = 'This field is required.';
                    field.parentNode.appendChild(errorMessage);
                }
            } else {
                field.classList.add('is-valid');
            }
        });

        if (!isValid) {
            displayNotification('Please fill all required fields correctly.', 'danger');
        } else {
            const notification = document.getElementById('validation-notification');
            if (notification) {
                notification.textContent = '';
            }
        }

        return isValid;
    }

    // Function to set up real-time validation
    function setupRealTimeValidation(stepNumber) {
        const step = document.getElementById(`step${stepNumber}`);
        if (!step) return;

        const inputFields = step.querySelectorAll('input, select, textarea');

        inputFields.forEach((field) => {
            field.addEventListener('input', () => {
                if (field.value.trim()) {
                    field.classList.remove('is-invalid');
                    field.classList.add('is-valid');
                    const feedback = field.nextElementSibling;
                    if (feedback && feedback.classList.contains('invalid-feedback')) {
                        feedback.remove();
                    }
                }
            });

            if (field.tagName === 'SELECT') {
                field.addEventListener('change', () => {
                    if (field.value.trim()) {
                        field.classList.remove('is-invalid');
                        field.classList.add('is-valid');
                        const feedback = field.nextElementSibling;
                        if (feedback && feedback.classList.contains('invalid-feedback')) {
                            feedback.remove();
                        }
                    }
                });
            }
        });
    }

    // Set the initial step
    showStep(1);

    // Next and Previous buttons functionality
    document.querySelectorAll('button, a').forEach((button) => {
        button.addEventListener('click', (event) => {
            const targetStep = event.target.getAttribute('onclick')?.match(/\d+/)?.[0];
            if (targetStep) {
                event.preventDefault();
                const currentStepNumber = Array.from(document.querySelectorAll('.step')).findIndex(
                    (step) => step.style.display === 'block'
                ) + 1;

                if (Number(targetStep) > currentStepNumber) {
                    if (validateStep(currentStepNumber)) {
                        saveStepData(currentStepNumber);
                        displayFormData(formData);
                        showStep(Number(targetStep));
                    }
                } else {
                    saveStepData(currentStepNumber);
                    showStep(Number(targetStep));
                }
            }
        });
    });

    // Save and Add Another button functionality
    document.getElementById('saveAndAddAnother')?.addEventListener('click', (event) => {
        event.preventDefault();
        if (validateStep(3)) { // Validate step 3 (gown details)
            saveStepData(3); // Save current individual's data
            resetStep3(); // Reset step 3 for the next individual
            displayNotification('Gown details saved. You can add another individual.', 'success');
        }
    });

    // Function to reset step 3 (gown details)
    function resetStep3() {
        const step3 = document.getElementById('step3');
        if (step3) {
            step3.querySelectorAll('input, select, textarea').forEach((field) => {
                if (field.type !== 'button' && field.type !== 'submit') {
                    field.value = ''; // Clear all fields
                    field.classList.remove('is-valid', 'is-invalid');
                }
            });
        }
    }

    // Submit form functionality
    document.getElementById('publish-btn')?.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default form submission
        if (validateStep(4)) { // Validate step 4 (review and publish)
            submitForm(formData); // Submit the form data
        }
    });

    // Function to submit form data
    function submitForm(formData) {
        console.log('Form Data:', formData);

        // Validate form data before submission
        if (
            Object.keys(formData.businessDetails).length === 0 ||
            formData.individuals.length === 0
        ) {
            displayNotification('Please fill in all required fields.', 'danger');
            return;
        }

        // Send the form data to the server using fetch or AJAX
        fetch('gowns.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log('Server Response:', data);
                if (data === 'success') {
                    displayNotification('Form submitted successfully!', 'success');
                    // Do not reset the form or navigate to step 1
                } else {
                    displayNotification('Error: ' + data, 'danger');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                displayNotification('There was an error submitting the form.', 'danger');
            });
    }

    // Function to display a notification
    function displayNotification(message, type = 'danger') {
        const alertContainer = document.getElementById('alert-container');
        if (!alertContainer) return;

        // Clear previous alerts
        alertContainer.innerHTML = '';

        // Create a new alert element
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.setAttribute('role', 'alert');

        // Add the message
        const messageText = document.createElement('span');
        messageText.textContent = message;
        alertDiv.appendChild(messageText);

        // Add a close button
        const closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.className = 'btn-close';
        closeButton.setAttribute('data-bs-dismiss', 'alert');
        closeButton.setAttribute('aria-label', 'Close');
        alertDiv.appendChild(closeButton);

        // Append the alert to the container
        alertContainer.appendChild(alertDiv);

        // Auto-remove the alert after 4 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 4000);
    }
});