document.addEventListener("DOMContentLoaded", function () {
    var toggleButtons = document.querySelectorAll("[id^='toggle']");
    toggleButtons.forEach(function (button) {
        var contentId = button.id.replace('toggle', '').toLowerCase() + '-content';
        var content = document.getElementById(contentId);
        button.addEventListener("click", function () {
            if (content.style.display === "none" || !content.style.display) {
                content.style.display = "block";
                button.classList.add("active");
            }
            else {
                content.style.display = "none";
                button.classList.remove("active");
            }
        });
    });
});
