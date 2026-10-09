//  Light and Dark Mode
 var btn = document.getElementById("themeBtn");

        btn.onclick = function () {
            var body = document.body;

            if (body.classList.contains("light-mode")) {
                body.classList.remove("light-mode");
                btn.innerText = "Light mode";
            } else {
                body.classList.add("light-mode");
                btn.innerText = "Dark mode";
            }
        };


        // Explore Tab Feature
        var navItems = document.querySelectorAll(".nav-item");
        var explorePanel = document.getElementById("explorePanel");
        var rightWidgets = document.querySelectorAll(".widget, .footer-links, .footer-copy");

        function toggleExploreView(showExplore) {
            navItems.forEach(function (item) {
                item.classList.toggle("active", item.id === "exploreTab" && showExplore);
            });

            if (showExplore) {
                explorePanel.classList.add("active");
                rightWidgets.forEach(function (widget) {
                    widget.style.display = "none";
                });
                document.querySelector(".feed-header h1").textContent = "Explore";
            } else {
                explorePanel.classList.remove("active");
                rightWidgets.forEach(function (widget) {
                    widget.style.display = "block";
                });
                document.querySelector(".feed-header h1").textContent = "Home";
            }
        }

        navItems.forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.preventDefault();
                if (item.id === "exploreTab") {
                    toggleExploreView(true);
                    return;
                }

                toggleExploreView(false);
                item.classList.add("active");
                navItems.forEach(function (navItem) {
                    if (navItem !== item) navItem.classList.remove("active");
                });
            });
        });


        // Tweet Modal Feature
        var tweetModal = document.getElementById("tweetModal");
        var modalText = document.getElementById("modalTweetInput");
        var charCount = document.getElementById("tweetCharCount");
        var modalSubmit = document.getElementById("modalTweetBtn");
        var closeModalBtn = document.querySelector(".close-modal");
        var modalOpeners = document.querySelectorAll(".tweet-btn, .mobile-tweet-fab, .tweet-submit");

        function openTweetModal() {
            tweetModal.classList.add("show");
            tweetModal.setAttribute("aria-hidden", "false");
            setTimeout(function () {
                modalText.focus();
            }, 50);
        }

        function closeTweetModal() {
            tweetModal.classList.remove("show");
            tweetModal.setAttribute("aria-hidden", "true");
            modalText.value = "";
            updateCharCount();
        }

        function updateCharCount() {
            var remaining = 280 - modalText.value.length;
            charCount.textContent = remaining;
            charCount.classList.toggle("warning", remaining <= 25);
            modalSubmit.disabled = modalText.value.trim().length === 0 || modalText.value.length > 280;
        }

        modalText.addEventListener("input", updateCharCount);

        modalOpeners.forEach(function (button) {
            button.addEventListener("click", function () {
                openTweetModal();
            });
        });

        closeModalBtn.addEventListener("click", closeTweetModal);
        tweetModal.addEventListener("click", function (event) {
            if (event.target.dataset.close === "true" || event.target === tweetModal) {
                closeTweetModal();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && tweetModal.classList.contains("show")) {
                closeTweetModal();
            }
        });

        modalSubmit.addEventListener("click", function () {
            var text = modalText.value.trim();
            if (!text) return;

            var article = document.createElement("article");
            article.className = "tweet";
            article.innerHTML = `
                <div class="tweet-avatar">
                    <img src="assets/Profile1.png" alt="Me">
                </div>
                <div class="tweet-content">
                    <div class="tweet-top">
                        <span class="tweet-name">Nizaam Jeftha</span>
                        <span class="tweet-handle">@NJDEV</span>
                        <span class="tweet-time">· just now</span>
                    </div>
                    <p class="tweet-text">${text.replace(/\n/g, "<br>")}</p>
                    <div class="tweet-stats">
                        <span><i class="fa-regular fa-comment"></i> 0</span>
                        <span><i class="fa-solid fa-retweet"></i> 0</span>
                        <span class="liked"><i class="fa-regular fa-heart"></i> <span class="liked-count">0</span></span>
                        <span><i class="fa-solid fa-arrow-up-from-bracket"></i></span>
                    </div>
                </div>
            `;

            var feed = document.querySelector(".feed");
            var afterBox = document.querySelector(".tweet-box");
            feed.insertBefore(article, afterBox.nextElementSibling);
            closeTweetModal();
        });

        updateCharCount();