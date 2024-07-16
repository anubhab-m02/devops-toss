document.addEventListener('DOMContentLoaded', function() {
    var tossButton = document.getElementById('tossButton');
    var modal = document.getElementById('modal');
    var closeButton = document.getElementsByClassName('close')[0];
    var quantumNumberElement = document.getElementById('quantumNumber');
    var tossResultElement = document.getElementById('tossResult');

    tossButton.addEventListener('click', function() {
        var numShots = 1; // Perform a single coin toss
        fetch('/quantum_toss?shots=' + numShots)
            .then(response => response.json())
            .then(data => {
                // Update HTML elements with received data
                quantumNumberElement.textContent = 'Quantum Number: ' + ' | ' +data.toss_results[0]+ ' > '; // Display the quantum number
                tossResultElement.textContent = 'Toss Result: ' + (data.toss_results[0] === 0 ? 'Heads' : 'Tails'); // Display the toss result
                modal.style.display = 'block'; // Show modal
            })
            .catch(error => console.error('Error:', error));
    });

    closeButton.onclick = function() {
        modal.style.display = 'none'; // Hide modal when close button is clicked
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none'; // Hide modal when clicked outside of it
        }
    };
});
