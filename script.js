document.addEventListener('DOMContentLoaded', () => {
    // 1. Done: Mobile Navigation Dropdown
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            if (navOverlay) {
                navOverlay.classList.toggle('active');
            }
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                if (navOverlay) {
                    navOverlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            });
        });
    }

    // 2. Done: Project Filter Dropdown
    const filterDropdownBtn = document.getElementById('filterDropdownBtn');
    const filterDropdown = document.getElementById('filterDropdown');
    const currentFilter = document.getElementById('currentFilter');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterDropdownBtn && filterDropdown) {
        filterDropdownBtn.addEventListener('click', () => {
            filterDropdownBtn.classList.toggle('active');
            filterDropdown.classList.toggle('active');
        });

        
        document.addEventListener('click', (e) => {
            if (!filterDropdownBtn.contains(e.target) && !filterDropdown.contains(e.target)) {
                filterDropdownBtn.classList.remove('active');
                filterDropdown.classList.remove('active');
            }
        });

        
        dropdownItems.forEach(item => {
            item.addEventListener('click', () => {
                const filterValue = item.dataset.filter;
                const filterText = item.textContent;

               
                dropdownItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                currentFilter.textContent = filterText;

                
                filterDropdownBtn.classList.remove('active');
                filterDropdown.classList.remove('active');

                
                projectCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        card.style.animation = 'fadeIn 0.3s ease';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 3. Done: Contact Form Validation and 4. Done: Modal
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (contactForm) {
        
        const formGroups = contactForm.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const errorMsg = document.createElement('div');
            errorMsg.className = 'error-message';
            group.appendChild(errorMsg);
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('userName');
            const emailInput = document.getElementById('userEmail');
            const projectTypeInput = document.getElementById('projectType');
            const messageInput = document.getElementById('userMessage');

            
            formGroups.forEach(group => {
                group.classList.remove('error');
                const errorMsg = group.querySelector('.error-message');
                if (errorMsg) errorMsg.textContent = '';
            });

            
            if (!nameInput.value.trim()) {
                showError(nameInput, 'Name is required');
                isValid = false;
            }

            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }

            
            if (!projectTypeInput.value) {
                showError(projectTypeInput, 'Please select a project type');
                isValid = false;
            }

            
            if (!messageInput.value.trim()) {
                showError(messageInput, 'Message is required');
                isValid = false;
            }

            if (isValid) {
                
                if (successModal) {
                    successModal.classList.add('active');
                }
                contactForm.reset();
            }
        });
    }

    function showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = message;
            }
        }
    }

    if (closeModalBtn && successModal) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
        
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }
});

    // 5. Done: Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Done: Copy Email to Clipboard
    const emailCopyBtn = document.getElementById('emailCopyBtn');
    const emailText = document.getElementById('emailText');
    const copyTooltip = document.getElementById('copyTooltip');
    if (emailCopyBtn && emailText && copyTooltip) {
        emailCopyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(emailText.textContent.trim());
                copyTooltip.textContent = 'Copied!';
                setTimeout(() => {
                    copyTooltip.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy email: ', err);
                copyTooltip.textContent = 'Failed';
                setTimeout(() => {
                    copyTooltip.textContent = 'Copy';
                }, 2000);
            }
        });
    }
