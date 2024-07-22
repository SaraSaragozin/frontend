document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the submenu
    window.toggleMenu = function(menuId) {
        const menu = document.getElementById(menuId);
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    };

    // Function to load content based on service type
    window.loadContent = function(service) {
        const contentDiv = document.getElementById('content');
        let url = '';

        switch(service) {
            // Course services
            case 'course-list':
                url = 'http://localhost:3007/api/courses';
                break;
            case 'course-create':
                url = 'http://localhost:3004/api/courses';
                break;
            case 'course-update':
                url = 'http://localhost:3006/courses';
                break;
            case 'course-delete':
                url = 'http://localhost:3005/courses';
                break;

            // Task services
            case 'task-list':
                url = 'http://localhost:3011/tasks';
                break;
            case 'task-create':
                url = 'http://localhost:3008/api/tasks';
                break;
            case 'task-update':
                url = 'http://localhost:3011/tasks';
                break;
            case 'task-delete':
                url = 'http://localhost:3009/tasks';
                break;

            // User services
            case 'user-list':
                url = 'http://localhost:3003/api/users';
                break;
            case 'user-update':
                url = 'http://localhost:3002';
                break;
            case 'user-delete':
                url = 'http://localhost:3001';
                break;

            // Review service
            case 'review-create':
                url = 'http://localhost:3013/api/reviews';
                break;

            // Book service
            case 'book-list':
                url = 'http://localhost:3012/api/books';
                break;

            // Math services
            case 'math-problems':
                url = 'http://localhost:3020/api/math-problems';
                break;
            case 'equations':
                url = 'http://localhost:3021/api/equations';
                break;
            case 'formulas':
                url = 'http://localhost:3022/api/formulas';
                break;
            case 'concepts':
                url = 'http://localhost:3023/api/concepts';
                break;
            case 'theorems':
                url = 'http://localhost:3024/api/theorems';
                break;

            default:
                contentDiv.innerHTML = 'No content available for this service.';
                return;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let html = '<table border="1"><tr>';
                if (data.length > 0) {
                    // Generate table headers
                    Object.keys(data[0]).forEach(key => {
                        html += `<th>${key}</th>`;
                    });
                    html += '</tr>';

                    // Generate table rows
                    data.forEach(item => {
                        html += '<tr>';
                        Object.values(item).forEach(value => {
                            html += `<td>${value}</td>`;
                        });
                        html += '</tr>';
                    });
                } else {
                    html += '<tr><td>No data available</td></tr>';
                }
                html += '</table>';
                contentDiv.innerHTML = html;
            })
            .catch(error => {
                contentDiv.innerHTML = `Error fetching content: ${error.message}`;
            });
    };
});
