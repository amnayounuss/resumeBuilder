document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resumeForm");
    var toggleButtons = document.querySelectorAll(".toggle-btn");
    var profilePicInput = document.getElementById("profilePic");
    var profilePic = document.querySelector(".profile-pic");
    var educationFields = document.getElementById("educationFields");
    var addEducationButton = document.getElementById("addEducation");
    var workExperienceFields = document.getElementById("workExperienceFields");
    var addExperienceButton = document.getElementById("addExperience");
    addEducationButton.addEventListener("click", function () {
        var newEducationGroup = document.createElement("div");
        newEducationGroup.classList.add("education-group");
        newEducationGroup.innerHTML = "\n            <input type=\"text\" name=\"degree\" placeholder=\"Degree\" required>\n            <input type=\"text\" name=\"school\" placeholder=\"School\" required>\n            <input type=\"text\" name=\"gradYear\" placeholder=\"Graduation Year\" required>\n        ";
        educationFields.appendChild(newEducationGroup);
    });
    addExperienceButton.addEventListener("click", function () {
        var newWorkGroup = document.createElement("div");
        newWorkGroup.classList.add("work-group");
        newWorkGroup.innerHTML = "\n            <input type=\"text\" name=\"jobTitle\" placeholder=\"Job Title\" required>\n            <input type=\"text\" name=\"company\" placeholder=\"Company\" required>\n            <input type=\"text\" name=\"workDates\" placeholder=\"Employment Dates\" required>\n        ";
        workExperienceFields.appendChild(newWorkGroup);
    });
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        updateResume();
    });
    var downloadButton = document.getElementById("downloadResume");
    downloadButton.addEventListener("click", function () {
        downloadResume();
    });
    toggleButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var _a;
            var content = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.nextElementSibling;
            if (content) {
                content.style.display = content.style.display === "none" || !content.style.display ? "block" : "none";
                button.classList.toggle("active");
            }
        });
    });
    profilePicInput.addEventListener("change", function (e) {
        var input = e.target;
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var _a;
                if (profilePic) {
                    profilePic.src = (_a = event.target) === null || _a === void 0 ? void 0 : _a.result;
                    profilePic.classList.remove("hidden");
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    });
    function updateResume() {
        var formData = new FormData(form);
        var name = formData.get("name");
        var email = formData.get("email");
        var phone = formData.get("phone");
        updateElement("resumeName", name);
        updateElement("resumeContact", "Email: ".concat(email, " | Phone: ").concat(phone));
        var sections = document.querySelectorAll("section[data-editable='true']");
        sections.forEach(function (section) {
            var toggleButton = section.querySelector(".toggle-btn");
            var content = section.querySelector(".content");
            if (toggleButton && content) {
                toggleButton.classList.add("active");
                content.style.display = "block";
            }
        });
        var educationContent = document.getElementById("education-content");
        if (educationContent) {
            educationContent.innerHTML = "";
            var educationGroups = educationFields.querySelectorAll(".education-group");
            educationGroups.forEach(function (group) {
                var degree = group.querySelector("input[name='degree']").value;
                var school = group.querySelector("input[name='school']").value;
                var gradYear = group.querySelector("input[name='gradYear']").value;
                educationContent.innerHTML += "\n                    <p><strong>".concat(degree, "</strong><br>").concat(school, ", ").concat(gradYear, "</p>\n                ");
            });
        }
        var experienceContent = document.getElementById("experience-content");
        if (experienceContent) {
            experienceContent.innerHTML = "";
            var workGroups = workExperienceFields.querySelectorAll(".work-group");
            workGroups.forEach(function (group) {
                var jobTitle = group.querySelector("input[name='jobTitle']").value;
                var company = group.querySelector("input[name='company']").value;
                var workDates = group.querySelector("input[name='workDates']").value;
                experienceContent.innerHTML += "\n                    <p><strong>".concat(jobTitle, "</strong><br>").concat(company, ", ").concat(workDates, "</p>\n                ");
            });
        }
        var skillsContent = document.getElementById("skills-content");
        if (skillsContent) {
            var skills = formData.get("skills").split(",").map(function (skill) { return skill.trim(); });
            skillsContent.innerHTML = "";
            skills.forEach(function (skill) {
                skillsContent.innerHTML += "<li>".concat(skill, "</li>");
            });
        }
    }
    function updateElement(id, content) {
        var element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }
    function downloadResume() {
        var _a;
        var resumeContainer = (_a = document.querySelector(".resume-container")) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
        if (resumeContainer) {
            resumeContainer.querySelectorAll(".toggle-btn").forEach(function (button) {
                button.style.display = "none";
            });
            var style = "\n                <style>\n                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }\n                    .resume-container { \n                        max-width: 700px; \n                        margin: 20px auto; \n                        padding: 20px; \n                        background: #fff; \n                        border: 1px solid #ddd; \n                        border-radius: 10px; \n                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); \n                    }\n                    .profile-pic { \n                        display: block; \n                        margin: 0 auto 20px; \n                        width: 150px; \n                        height: 150px; \n                        border-radius: 50%; \n                        object-fit: cover; \n                    }\n                    .resume-header { \n                        text-align: center; \n                        margin-bottom: 20px; \n                    }\n                    .resume-header h1, .resume-header p { \n                        margin: 0; \n                    }\n                    .resume-header hr { \n                        border: 0; \n                        border-top: 1px solid #ddd; \n                        margin: 10px 0; \n                    }\n                    .section-header { \n                        display: flex; \n                        justify-content: space-between; \n                        align-items: center; \n                        margin-bottom: 10px; \n                        padding-left: 5%; \n                    }\n                    .icon-plus { \n                        font-size: 20px; \n                    }\n                    .icon-cross { \n                        font-size: 22px; \n                        display: none; \n                    }\n                    .toggle-btn.active .icon-plus { \n                        display: none; \n                    }\n                    .toggle-btn.active .icon-cross { \n                        display: block; \n                    }\n                    .content { \n                        margin-top: 10px; \n                        padding: 0 5%; \n                    }\n                    .content p { \n                        margin: 0; \n                    }\n                    .content ul { \n                        list-style: none; \n                        padding: 0; \n                    }\n                    .content li { \n                        margin-bottom: 5px; \n                    }\n                    .form-container, .resume-container { \n                        padding: 20px; \n                        background: #fff; \n                        border-radius: 10px; \n                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); \n                    }\n                    .resume-header { \n                        text-align: center; \n                    }\n                    .resume-name, .resume-contact { \n                        text-align: center; \n                    }\n                </style>\n            ";
            var blob = new Blob([style + resumeContainer.outerHTML], { type: "text/html" });
            var url = URL.createObjectURL(blob);
            var link = document.createElement("a");
            link.href = url;
            link.download = "resume.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
});
