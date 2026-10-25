(function() {
    'use strict';

    function ensureToastContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    function showToast(message, type) {
        const container = ensureToastContainer();
        const labelMap = {
            success: 'Success',
            error: 'Error',
            warning: 'Warning',
            info: 'Info'
        };
        const iconMap = {
            success: '✓',
            error: '!' ,
            warning: '⚠',
            info: 'i'
        };

        const toast = document.createElement('div');
        const finalType = type || 'success';
        toast.className = 'toast toast-' + finalType;
        toast.innerHTML = [
            '<div class="toast-icon" aria-hidden="true">' + (iconMap[finalType] || 'i') + '</div>',
            '<div class="toast-message">',
            '<strong>' + (labelMap[finalType] || 'Info') + '</strong>',
            '<span>' + message + '</span>',
            '</div>',
            '<button class="toast-close" type="button" aria-label="Dismiss notification">×</button>'
        ].join('');

        const closeButton = toast.querySelector('.toast-close');
        closeButton.addEventListener('click', function() {
            toast.classList.remove('show');
            setTimeout(function() {
                toast.remove();
            }, 220);
        });

        container.appendChild(toast);
        requestAnimationFrame(function() {
            toast.classList.add('show');
        });

        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                toast.remove();
            }, 220);
        }, 3200);
    }

    function hideLoadingScreen() {
        const screen = document.querySelector('.loading-screen');
        if (!screen) {
            return;
        }

        screen.classList.add('is-hidden');
        setTimeout(function() {
            screen.remove();
        }, 400);
    }

    function matchesFilter(item, filter) {
        if (!item || !filter || filter === 'all') {
            return true;
        }

        const status = (item.dataset.status || '').trim().toLowerCase();
        const priority = (item.dataset.priority || '').trim().toLowerCase();
        const classes = (item.className || '').toLowerCase();

        if (filter === 'new' || filter === 'pending' || filter === 'resolved' || filter === 'rejected' || filter === 'in-progress') {
            return status === filter || (filter === 'in-progress' && status === 'in-progress');
        }

        if (filter === 'urgent' || filter === 'important' || filter === 'normal') {
            return priority === filter;
        }

        if (filter === 'high') {
            return priority === 'urgent' || classes.indexOf('high') !== -1;
        }

        return true;
    }

    function initFilters() {
        const filterButtons = document.querySelectorAll('.filter');
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                const filterRow = button.closest('.filter-row');
                if (!filterRow) {
                    return;
                }

                filterRow.querySelectorAll('.filter').forEach(function(btn) {
                    btn.classList.toggle('active', btn === button);
                });

                const filterValue = button.dataset.filter || 'all';
                const listContainers = document.querySelectorAll('.complaint-list, .warden-complaint-list, .announcement-list');

                listContainers.forEach(function(list) {
                    const items = Array.from(list.children).filter(function(item) {
                        return item.tagName && item.tagName.toLowerCase() === 'article';
                    });

                    items.forEach(function(item) {
                        const shouldShow = matchesFilter(item, filterValue);
                        item.hidden = !shouldShow;
                        item.setAttribute('aria-hidden', String(!shouldShow));
                    });
                });
            });
        });
    }

    function initComplaintReview() {
        const form = document.querySelector('.complaint-form');
        if (!form) {
            return;
        }

        const updateReview = function() {
            const category = form.querySelector('#category');
            const title = form.querySelector('#title');
            const hostel = form.querySelector('#hostel');
            const room = form.querySelector('#room');
            const priority = form.querySelector('input[name="priority"]:checked');

            const reviewMap = {
                category: category && category.value ? category.value : '—',
                title: title && title.value.trim() ? title.value.trim() : '—',
                location: (hostel && hostel.value ? hostel.value : 'Block B') + (room && room.value ? ' · ' + room.value : ''),
                priority: priority && priority.value ? priority.value.charAt(0).toUpperCase() + priority.value.slice(1) : 'Medium'
            };

            document.querySelectorAll('.review-value').forEach(function(value) {
                const key = value.dataset.review;
                if (key && reviewMap[key]) {
                    value.textContent = reviewMap[key];
                }
            });
        };

        form.querySelectorAll('input, select, textarea').forEach(function(field) {
            field.addEventListener('input', updateReview);
            field.addEventListener('change', updateReview);
        });

        updateReview();
    }

    function initComplaintForms() {
        const forms = document.querySelectorAll('.complaint-form');
        forms.forEach(function(form) {
            form.addEventListener('submit', function(event) {
                const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
                let hasEmpty = false;

                requiredFields.forEach(function(field) {
                    if (!field.value || !field.value.trim()) {
                        hasEmpty = true;
                        field.focus();
                    }
                });

                if (hasEmpty) {
                    event.preventDefault();
                    showToast('Please complete the required details before submitting.', 'error');
                    return;
                }

                const titleField = form.querySelector('#title');
                const complaintTitle = titleField && titleField.value.trim() ? titleField.value.trim() : 'Your complaint';
                event.preventDefault();

                const submitButton = form.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.disabled = true;
                    submitButton.textContent = 'Submitted';
                }

                showToast('"' + complaintTitle + '" has been submitted successfully.', 'success');
                setTimeout(function() {
                    window.location.href = 'complaint-details.html';
                }, 950);
            });
        });
    }

    function initAnimatedCards() {
        document.querySelectorAll('.dashboard-card, .student-complaint, .warden-complaint, .announcement').forEach(function(card) {
            card.addEventListener('mouseenter', function() {
                card.style.transform = 'translateY(-2px)';
            });
            card.addEventListener('mouseleave', function() {
                card.style.transform = '';
            });
        });
    }

    function initQuickActions() {
        document.querySelectorAll('[data-toast]').forEach(function(button) {
            button.addEventListener('click', function() {
                const message = button.dataset.toast || 'Action completed.';
                showToast(message, button.dataset.toastType || 'info');
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        initFilters();
        initComplaintReview();
        initComplaintForms();
        initQuickActions();
        initAnimatedCards();
        hideLoadingScreen();
    });
})();
