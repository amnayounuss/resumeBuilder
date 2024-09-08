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

    const downloadButton = document.getElementById("downloadResume") as HTMLButtonElement;
    downloadButton.addEventListener("click", () => {
        downloadResume();
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

    function downloadResume() {
        
        const resumeContainer = document.querySelector(".resume-container")?.cloneNode(true) as HTMLElement;

        if (resumeContainer) {
            resumeContainer.querySelectorAll(".toggle-btn").forEach(button => {
                (button as HTMLElement).style.display = "none"; 
            });

            const style = `
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
                    .resume-container { 
                        max-width: 700px; 
                        margin: 20px auto; 
                        padding: 20px; 
                        background: #fff; 
                        border: 1px solid #ddd; 
                        border-radius: 10px; 
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
                    }
                    .profile-pic { 
                        display: block; 
                        margin: 0 auto 20px; 
                        width: 150px; 
                        height: 150px; 
                        border-radius: 50%; 
                        object-fit: cover; 
                    }
                    .resume-header { 
                        text-align: center; 
                        margin-bottom: 20px; 
                    }
                    .resume-header h1, .resume-header p { 
                        margin: 0; 
                    }
                    .resume-header hr { 
                        border: 0; 
                        border-top: 1px solid #ddd; 
                        margin: 10px 0; 
                    }
                    .section-header { 
                        display: flex; 
                        justify-content: space-between; 
                        align-items: center; 
                        margin-bottom: 10px; 
                        padding-left: 5%; 
                    }
                    .icon-plus { 
                        font-size: 20px; 
                    }
                    .icon-cross { 
                        font-size: 22px; 
                        display: none; 
                    }
                    .toggle-btn.active .icon-plus { 
                        display: none; 
                    }
                    .toggle-btn.active .icon-cross { 
                        display: block; 
                    }
                    .content { 
                        margin-top: 10px; 
                        padding: 0 5%; 
                    }
                    .content p { 
                        margin: 0; 
                    }
                    .content ul { 
                        list-style: none; 
                        padding: 0; 
                    }
                    .content li { 
                        margin-bottom: 5px; 
                    }
                    .form-container, .resume-container { 
                        padding: 20px; 
                        background: #fff; 
                        border-radius: 10px; 
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
                    }
                    .resume-header { 
                        text-align: center; 
                    }
                    .resume-name, .resume-contact { 
                        text-align: center; 
                    }
                </style>
            `;

            const blob = new Blob([style + resumeContainer.outerHTML], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "resume.html";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
});
