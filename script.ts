document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm") as HTMLFormElement;
    const toggleButtons = document.querySelectorAll<HTMLButtonElement>(".toggle-btn");
    const profilePicInput = document.getElementById("profilePic") as HTMLInputElement;
    const profilePic = document.querySelector<HTMLImageElement>(".profile-pic");

    const educationFields = document.getElementById("educationFields") as HTMLElement;
    const addEducationButton = document.getElementById("addEducation") as HTMLButtonElement;

    const workExperienceFields = document.getElementById("workExperienceFields") as HTMLElement;
    const addExperienceButton = document.getElementById("addExperience") as HTMLButtonElement;

    addEducationButton.addEventListener("click", () => {
        const newEducationGroup = document.createElement("div");
        newEducationGroup.classList.add("education-group");
        newEducationGroup.innerHTML = `
            <input type="text" name="degree" placeholder="Degree" required>
            <input type="text" name="school" placeholder="School" required>
            <input type="text" name="gradYear" placeholder="Graduation Year" required>
        `;
        educationFields.appendChild(newEducationGroup);
    });

    addExperienceButton.addEventListener("click", () => {
        const newWorkGroup = document.createElement("div");
        newWorkGroup.classList.add("work-group");
        newWorkGroup.innerHTML = `
            <input type="text" name="jobTitle" placeholder="Job Title" required>
            <input type="text" name="company" placeholder="Company" required>
            <input type="text" name="workDates" placeholder="Employment Dates" required>
        `;
        workExperienceFields.appendChild(newWorkGroup);
    });

    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();
        updateResume();
    });

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const content = button.parentElement?.nextElementSibling as HTMLElement;
            if (content) {
                content.style.display = content.style.display === "none" || !content.style.display ? "block" : "none";
                button.classList.toggle("active");
            }
        });
    });

    profilePicInput.addEventListener("change", (e: Event) => {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (profilePic) {
                    profilePic.src = event.target?.result as string;
                    profilePic.classList.remove("hidden");
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    });

    function updateResume() {
        const formData = new FormData(form);

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        updateElement("resumeName", name);
        updateElement("resumeContact", `Email: ${email} | Phone: ${phone}`);

        const sections = document.querySelectorAll("section[data-editable='true']");
        sections.forEach(section => {
            const toggleButton = section.querySelector(".toggle-btn") as HTMLButtonElement;
            const content = section.querySelector(".content") as HTMLElement;
            if (toggleButton && content) {
                toggleButton.classList.add("active");
                content.style.display = "block";
            }
        });

        const educationContent = document.getElementById("education-content") as HTMLElement;
        if (educationContent) {
            educationContent.innerHTML = "";
            const educationGroups = educationFields.querySelectorAll(".education-group");
            educationGroups.forEach(group => {
                const degree = (group.querySelector("input[name='degree']") as HTMLInputElement).value;
                const school = (group.querySelector("input[name='school']") as HTMLInputElement).value;
                const gradYear = (group.querySelector("input[name='gradYear']") as HTMLInputElement).value;
                educationContent.innerHTML += `
                    <p><strong>${degree}</strong><br>${school}, ${gradYear}</p>
                `;
            });
        }

        const experienceContent = document.getElementById("experience-content") as HTMLElement;
        if (experienceContent) {
            experienceContent.innerHTML = "";
            const workGroups = workExperienceFields.querySelectorAll(".work-group");
            workGroups.forEach(group => {
                const jobTitle = (group.querySelector("input[name='jobTitle']") as HTMLInputElement).value;
                const company = (group.querySelector("input[name='company']") as HTMLInputElement).value;
                const workDates = (group.querySelector("input[name='workDates']") as HTMLInputElement).value;
                experienceContent.innerHTML += `
                    <p><strong>${jobTitle}</strong><br>${company}, ${workDates}</p>
                `;
            });
        }

        const skillsContent = document.getElementById("skills-content") as HTMLElement;
        if (skillsContent) {
            const skills = (formData.get("skills") as string).split(",").map(skill => skill.trim());
            skillsContent.innerHTML = "";
            skills.forEach(skill => {
                skillsContent.innerHTML += `<li>${skill}</li>`;
            });
        }
    }

    function updateElement(id: string, content: string) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = content;
        }
    }
});