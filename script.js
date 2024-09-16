document.addEventListener("DOMContentLoaded", function() {
    const choices = document.querySelectorAll(".choices button");
    const userChoiceDisplay = document.getElementById("user-choice");
    const startButton = document.getElementById("start");
    const resultContainer = document.querySelector(".result");
    const resultText = document.getElementById("result-text");
    const themeToggle = document.getElementById("theme-toggle");
    let userScore = 0;
    let computerScore = 0;

    resultContainer.style.display = "none";
    disableButtons();

    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    themeToggle.addEventListener("click", function() {
        const newTheme =
            document.documentElement.getAttribute("data-theme") === "dark"
                ? "light"
                : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    });

    choices.forEach((choice) => {
        choice.addEventListener("click", function() {
            disableButtons();
            const userChoice = this.id;
            console.log("User chose:", userChoice);
            const computerChoice = getComputerChoice();
            console.log("Computer choice:", computerChoice);
            const result = getResult(userChoice, computerChoice);
            displayChoices(userChoice, computerChoice);
            displayResult(result);
            startButton.textContent = "Start again";
            startButton.disabled = false;
        });
    });

    startButton.addEventListener("click", function() {
        console.log("started");
        startButton.disabled = true;
        enableButtons();
        resultContainer.style.display = "none";
        resultText.innerText = "Choose Either rock paper scissor as your move:";
    });

    function disableButtons() {
        choices.forEach((choice) => {
            choice.disabled = true;
        });
    }

    function enableButtons() {
        choices.forEach((choice) => {
            choice.disabled = false;
        });
    }

    function getComputerChoice() {
        const choices = ["rock", "paper", "scissors"];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function getResult(user, computer) {
        if (user === computer) {
            return "draw";
        } else if (
            (user === "rock" && computer === "scissors") ||
            (user === "paper" && computer === "rock") ||
            (user === "scissors" && computer === "paper")
        ) {
            console.log("User won");
            return "win";
        } else {
            console.log("Computer won");
            return "lose";
        }
    }

    function displayChoices(user, computer) {
        userChoiceDisplay.textContent = `You chose: ${user}`;
        document.getElementById("users-choice").src = `${user}.webp`;
        document.getElementById("computers-choice").src =
            `${computer}.webp`;
    }

    function displayResult(result) {
        resultContainer.style.display = "flex";
        if (result === "win") {
            resultText.textContent = "You won!";
            userScore++;
        } else if (result === "lose") {
            resultText.textContent = "You lost!";
            computerScore++;
        } else {
            resultText.textContent = "It's a draw!";
        }
        document.getElementById("score").textContent =
            `${userScore} - ${computerScore}`;
    }
});
