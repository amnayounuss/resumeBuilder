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
});
